"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { 
  Search, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Loader2,
  PhoneCall,
  Download,
  Filter,
  ArrowUpDown,
  Bell,
  Eye,
  FileText,
  CheckCircle2,
  Shield,
  Clock3,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Car,
  User,
  Info,
  ArrowRight,
  Layers
} from "lucide-react";
import { getBookingInquiries, updateBookingInquiryStatus } from "@/lib/supabase/index";
import { format, differenceInDays } from "date-fns";
import { toast } from "sonner";

interface BookingInquiry {
  id: string;
  name: string;
  phone: string;
  pickup_location: string;
  drop_location: string;
  pickup_date: string;
  pickup_time: string;
  drop_date: string;
  drop_time: string;
  status: 'pending' | 'contacted' | 'booked' | 'cancelled' | 'blocked';
  created_at: string;
}

// Status styling mapping to match exact screenshot design
const statusBadgeStyles: Record<string, { bg: string; text: string; label: string; icon: any }> = {
  booked: { bg: "bg-emerald-100/80 dark:bg-emerald-950/60", text: "text-emerald-700 dark:text-emerald-400", label: "Booked", icon: CheckCircle2 },
  blocked: { bg: "bg-orange-100/80 dark:bg-orange-950/60", text: "text-orange-700 dark:text-orange-400", label: "Blocked", icon: Shield },
  pending: { bg: "bg-amber-100/80 dark:bg-amber-950/60", text: "text-amber-700 dark:text-amber-400", label: "Pending", icon: Clock3 },
  contacted: { bg: "bg-blue-100/80 dark:bg-blue-950/60", text: "text-blue-700 dark:text-blue-400", label: "Contacted", icon: PhoneCall },
  cancelled: { bg: "bg-rose-100/80 dark:bg-rose-950/60", text: "text-rose-700 dark:text-rose-400", label: "Cancelled", icon: Shield },
};

export default function BookingInquiriesPage() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<BookingInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<BookingInquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    let result = [...inquiries];

    // Search Filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(term) ||
          inquiry.phone.includes(term) ||
          inquiry.pickup_location.toLowerCase().includes(term) ||
          inquiry.drop_location.toLowerCase().includes(term)
      );
    }

    // Status Filter
    if (statusFilter !== "all") {
      result = result.filter((inquiry) => inquiry.status === statusFilter);
    }

    // Location Filter
    if (locationFilter !== "all") {
      const loc = locationFilter.toLowerCase();
      result = result.filter(
        (inquiry) =>
          inquiry.pickup_location.toLowerCase().includes(loc) ||
          inquiry.drop_location.toLowerCase().includes(loc)
      );
    }

    // Date Range Filter
    if (dateRange.from) {
      result = result.filter((inquiry) => {
        const created = new Date(inquiry.created_at);
        if (dateRange.to) {
          return created >= dateRange.from! && created <= dateRange.to!;
        }
        return created >= dateRange.from!;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    setFilteredInquiries(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, locationFilter, sortBy, dateRange, inquiries]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await getBookingInquiries();
      setInquiries(data);
      setFilteredInquiries(data);
    } catch (error) {
      console.error("Error fetching booking inquiries:", error);
      toast.error("Failed to load booking inquiries");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: BookingInquiry['status']) => {
    setUpdatingStatus(id);
    try {
      const result = await updateBookingInquiryStatus(id, newStatus as any);
      if (result.success) {
        setInquiries(prev => 
          prev.map(inquiry => 
            inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
          )
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
        }
        toast.success(`Status updated to ${newStatus.toUpperCase()}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error("Error updating status:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) {
      toast.error("No inquiries available to export");
      return;
    }

    const headers = ["Name", "Phone", "Pickup Location", "Pickup Date", "Pickup Time", "Drop Location", "Drop Date", "Drop Time", "Status", "Submitted At"];
    const rows = filteredInquiries.map(i => [
      `"${i.name.replace(/"/g, '""')}"`,
      `"${i.phone}"`,
      `"${i.pickup_location.replace(/"/g, '""')}"`,
      `"${i.pickup_date}"`,
      `"${i.pickup_time}"`,
      `"${i.drop_location.replace(/"/g, '""')}"`,
      `"${i.drop_date}"`,
      `"${i.drop_time}"`,
      `"${i.status}"`,
      `"${format(new Date(i.created_at), "yyyy-MM-dd HH:mm:ss")}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `booking_inquiries_${format(new Date(), "yyyyMMdd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inquiries exported successfully");
  };

  // Extract Unique Locations for Filter
  const uniqueLocations = Array.from(
    new Set([
      ...inquiries.map(i => i.pickup_location),
      ...inquiries.map(i => i.drop_location)
    ])
  ).filter(Boolean);

  // Metrics Calculations
  const totalCount = inquiries.length;
  const bookedCount = inquiries.filter(i => i.status === 'booked').length;
  const blockedCount = inquiries.filter(i => i.status === 'blocked' || i.status === 'cancelled').length;
  const pendingCount = inquiries.filter(i => i.status === 'pending').length;

  // Pagination Logic
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedInquiries = filteredInquiries.slice(startIndex, startIndex + itemsPerPage);

  // Helper for Initials
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px]">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-3" />
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading booking inquiries...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 p-4 sm:p-6 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ─── Top Header Bar ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Booking Inquiries
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage and respond to customer booking requests
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Bell Notification */}
            <div className="relative">
              <button 
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-gray-950 shadow-sm">
                3
              </span>
            </div>

            {/* Date Range Selector */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="h-10 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 rounded-xl px-3 text-xs sm:text-sm font-medium gap-2 text-gray-700 dark:text-gray-200"
                >
                  <Calendar size={15} className="text-gray-500" />
                  <span>
                    {dateRange.from ? (
                      dateRange.to ? (
                        `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd, yyyy")}`
                      ) : (
                        format(dateRange.from, "MMM dd, yyyy")
                      )
                    ) : (
                      "Aug 11 - Aug 16, 2026"
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-2xl" align="end">
                <CalendarComponent
                  mode="range"
                  selected={dateRange as any}
                  onSelect={(range: any) => setDateRange(range || { from: undefined, to: undefined })}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* ─── 4 Summary Stat Cards Row ─────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Card 1: Total Inquiries */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FileText size={22} />
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {totalCount}
              </span>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                Total Inquiries
              </p>
            </div>
          </div>

          {/* Card 2: Booked */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {bookedCount}
              </span>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                Booked
              </p>
            </div>
          </div>

          {/* Card 3: Blocked */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Shield size={22} />
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {blockedCount}
              </span>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                Blocked
              </p>
            </div>
          </div>

          {/* Card 4: Pending */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock3 size={22} />
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {pendingCount}
              </span>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                Pending
              </p>
            </div>
          </div>

        </div>

        {/* ─── Search, Filter, Sort & Export Toolbar ─────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 sm:gap-4">
          
          {/* Search Input */}
          <div className="relative w-full lg:max-w-md flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search by name, phone, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl focus-visible:ring-blue-500 text-sm w-full"
            />
          </div>

          {/* Controls Container */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row items-center gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
            
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-900 gap-1.5 sm:gap-2 flex-1 sm:w-36">
                <Filter size={15} className="text-gray-500 shrink-0" />
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-900 gap-1.5 sm:gap-2 flex-1 sm:w-36">
                <MapPin size={15} className="text-gray-500 shrink-0" />
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Locations</SelectItem>
                {uniqueLocations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Selector */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 rounded-xl text-xs sm:text-sm bg-white dark:bg-gray-900 gap-1.5 sm:gap-2 flex-1 sm:w-36">
                <ArrowUpDown size={15} className="text-gray-500 shrink-0" />
                <SelectValue placeholder="Sort: Newest" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="newest">Sort: Newest</SelectItem>
                <SelectItem value="oldest">Sort: Oldest</SelectItem>
                <SelectItem value="name">Sort: Name (A-Z)</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
            <Button
              onClick={handleExportCSV}
              className="h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 sm:px-5 font-semibold shadow-sm transition-colors shrink-0 flex items-center justify-center gap-2 col-span-2 sm:col-span-1"
            >
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* ─── Structured Data Table Layout ──────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              
              {/* Table Column Headers */}
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-[11px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                  <th className="py-4 px-6">Customer Details</th>
                  <th className="py-4 px-6">Pickup Details</th>
                  <th className="py-4 px-6">Drop Details</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Date & Time</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              {/* Table Data Rows */}
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {paginatedInquiries.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center">
                      <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
                        <Car size={28} />
                      </div>
                      <p className="text-base font-bold text-gray-900 dark:text-white">No Inquiries Found</p>
                      <p className="text-xs text-gray-500 mt-1">Try adjusting your search or filters.</p>
                    </td>
                  </tr>
                ) : (
                  paginatedInquiries.map((inquiry) => {
                    const statusStyle = statusBadgeStyles[inquiry.status] || statusBadgeStyles.pending;
                    const StatusIcon = statusStyle.icon;
                    const formattedCreatedDate = format(new Date(inquiry.created_at), "MMM dd, yyyy");
                    const formattedCreatedTime = format(new Date(inquiry.created_at), "hh:mm a");

                    return (
                      <tr 
                        key={inquiry.id} 
                        className="hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition-colors group"
                      >
                        {/* Customer Details Column */}
                        <td className="py-4 px-6 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                              {getInitials(inquiry.name)}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                {inquiry.name}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                <Phone size={12} className="text-gray-400 shrink-0" />
                                <a href={`tel:${inquiry.phone}`} className="hover:underline">
                                  {inquiry.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Pickup Details Column */}
                        <td className="py-4 px-6 align-middle">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                              <MapPin size={13} className="text-gray-400 shrink-0" />
                              <span>{inquiry.pickup_location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Calendar size={13} className="text-gray-400 shrink-0" />
                              <span>{inquiry.pickup_date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Clock size={13} className="text-gray-400 shrink-0" />
                              <span>{inquiry.pickup_time}</span>
                            </div>
                          </div>
                        </td>

                        {/* Drop Details Column */}
                        <td className="py-4 px-6 align-middle">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                              <MapPin size={13} className="text-gray-400 shrink-0" />
                              <span>{inquiry.drop_location}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Calendar size={13} className="text-gray-400 shrink-0" />
                              <span>{inquiry.drop_date}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Clock size={13} className="text-gray-400 shrink-0" />
                              <span>{inquiry.drop_time}</span>
                            </div>
                          </div>
                        </td>

                        {/* Status Column */}
                        <td className="py-4 px-6 align-middle">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
                            <StatusIcon size={13} />
                            <span>{statusStyle.label}</span>
                          </span>
                        </td>

                        {/* Date & Time Column */}
                        <td className="py-4 px-6 align-middle">
                          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1.5 font-medium">
                              <Calendar size={13} className="text-gray-400 shrink-0" />
                              <span>{formattedCreatedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                              <Clock size={13} className="text-gray-400 shrink-0" />
                              <span>{formattedCreatedTime}</span>
                            </div>
                          </div>
                        </td>

                        {/* Action Column */}
                        <td className="py-4 px-6 align-middle text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedInquiry(inquiry)}
                              className="h-8 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium px-3 flex items-center gap-1.5"
                            >
                              <Eye size={13} />
                              <span>View</span>
                            </Button>

                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                            >
                              <MoreVertical size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Bottom Info Note Banner ──────────────────────────────────── */}
        <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold">
              <Info size={18} />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">Note:</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Click on <span className="font-semibold text-blue-600 dark:text-blue-400">&quot;View&quot;</span> button to open inquiry details in a right side drawer with full information and any actions.
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ArrowRight size={22} className="text-blue-500 animate-pulse" />
            <div className="w-24 h-14 bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-800 rounded-xl p-2 flex flex-col justify-between shadow-sm">
              <div className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-full" />
              <div className="w-3/4 h-2 bg-gray-100 dark:bg-gray-800 rounded-full" />
              <div className="w-full h-3 bg-blue-600 rounded-md" />
            </div>
          </div>
        </div>

        {/* ─── Pagination Bar ───────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-8 text-sm text-gray-500 dark:text-gray-400">
          <div>
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredInquiries.length === 0 ? 0 : startIndex + 1}</span> to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(startIndex + itemsPerPage, filteredInquiries.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-900 dark:text-white">{filteredInquiries.length}</span> inquiries
          </div>

          <div className="flex items-center gap-4">
            {/* Rows Per Page Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span>Rows per page:</span>
              <Select value={String(itemsPerPage)} onValueChange={(val) => setItemsPerPage(Number(val))}>
                <SelectTrigger className="h-8 border-gray-200 dark:border-gray-800 rounded-lg text-xs w-[65px] bg-white dark:bg-gray-900">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                className="h-8 w-8 rounded-lg border-gray-200 dark:border-gray-800"
              >
                <ChevronLeft size={15} />
              </Button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-8 w-8 rounded-lg text-xs font-bold ${
                    currentPage === i + 1 
                      ? "bg-blue-600 text-white hover:bg-blue-700" 
                      : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                className="h-8 w-8 rounded-lg border-gray-200 dark:border-gray-800"
              >
                <ChevronRight size={15} />
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* ─── Slide-Over Right Side Drawer (`Sheet`) ──────────────────────── */}
      <Sheet open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <SheetContent side="right" className="sm:max-w-md md:max-w-lg p-6 sm:p-8 space-y-6 overflow-y-auto">
          {selectedInquiry && (
            <div className="space-y-6">
              
              {/* Header */}
              <SheetHeader className="space-y-1 text-left border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    {selectedInquiry.name}
                  </SheetTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeStyles[selectedInquiry.status]?.bg} ${statusBadgeStyles[selectedInquiry.status]?.text} capitalize`}>
                    {selectedInquiry.status}
                  </span>
                </div>
                <SheetDescription className="text-xs text-gray-500">
                  Inquiry ID: #{selectedInquiry.id.slice(0, 8)} • Submitted {format(new Date(selectedInquiry.created_at), "MMM dd, yyyy 'at' hh:mm a")}
                </SheetDescription>
              </SheetHeader>

              {/* Customer Contact Call Card */}
              <div className="bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold uppercase block">Customer Phone</span>
                    <a href={`tel:${selectedInquiry.phone}`} className="font-extrabold text-base text-gray-900 dark:text-white hover:text-blue-600">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <PhoneCall size={15} />
                  <span>Call Customer</span>
                </a>
              </div>

              {/* Trip Information Summary */}
              <div className="space-y-4 bg-gray-50/80 dark:bg-gray-900/80 p-5 rounded-2xl border border-gray-200/80 dark:border-gray-800">
                <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800 pb-3">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trip Summary</span>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950 px-2.5 py-0.5 rounded-full">
                    {Math.max(1, differenceInDays(new Date(selectedInquiry.drop_date), new Date(selectedInquiry.pickup_date)))} Days Rental
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1">
                  {/* Pickup */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block">
                      PICKUP DETAILS
                    </span>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span>{selectedInquiry.pickup_location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Calendar size={14} className="text-gray-400 shrink-0" />
                        <span>{selectedInquiry.pickup_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Clock size={14} className="text-gray-400 shrink-0" />
                        <span>{selectedInquiry.pickup_time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Drop */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase block">
                      DROP DETAILS
                    </span>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                        <MapPin size={14} className="text-gray-400 shrink-0" />
                        <span>{selectedInquiry.drop_location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Calendar size={14} className="text-gray-400 shrink-0" />
                        <span>{selectedInquiry.drop_date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                        <Clock size={14} className="text-gray-400 shrink-0" />
                        <span>{selectedInquiry.drop_time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update Controls */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Update Inquiry Status
                </label>
                <Select
                  value={selectedInquiry.status}
                  onValueChange={(val) => handleStatusUpdate(selectedInquiry.id, val as any)}
                  disabled={updatingStatus === selectedInquiry.id}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl text-sm bg-white dark:bg-gray-900 font-semibold">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

            </div>
          )}
        </SheetContent>
      </Sheet>

    </div>
  );
}