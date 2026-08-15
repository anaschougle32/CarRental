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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
  ChevronDown,
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
  X
} from "lucide-react";
import { getBookingInquiries, updateBookingInquiryStatus } from "@/lib/supabase/index";
import { format, differenceInDays, parseISO } from "date-fns";
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
const statusBadgeStyles: Record<string, { bg: string; text: string; label: string }> = {
  booked: { bg: "bg-emerald-100 dark:bg-emerald-950/60", text: "text-emerald-700 dark:text-emerald-400", label: "Booked" },
  blocked: { bg: "bg-orange-100 dark:bg-orange-950/60", text: "text-orange-700 dark:text-orange-400", label: "Blocked" },
  pending: { bg: "bg-amber-100 dark:bg-amber-950/60", text: "text-amber-700 dark:text-amber-400", label: "Pending" },
  contacted: { bg: "bg-blue-100 dark:bg-blue-950/60", text: "text-blue-700 dark:text-blue-400", label: "Contacted" },
  cancelled: { bg: "bg-rose-100 dark:bg-rose-950/60", text: "text-rose-700 dark:text-rose-400", label: "Cancelled" },
};

export default function BookingInquiriesPage() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<BookingInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [selectedInquiry, setSelectedInquiry] = useState<BookingInquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    let result = [...inquiries];

    // Apply Search Filter
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

    // Apply Status Filter
    if (statusFilter !== "all") {
      result = result.filter((inquiry) => inquiry.status === statusFilter);
    }

    // Apply Sorting
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
  }, [searchTerm, statusFilter, sortBy, inquiries]);

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

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full py-1.5 px-3 shadow-sm hover:border-gray-300 dark:hover:border-gray-700 transition-colors cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                A
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Admin</span>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* ─── Search, Filter, Sort & Export Toolbar ─────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-3 sm:p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative w-full md:flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              placeholder="Search by name, phone, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-11 bg-gray-50/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-xl focus-visible:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="flex-1 sm:flex-initial">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-900 gap-2 min-w-[130px]">
                  <Filter size={15} className="text-gray-500 shrink-0" />
                  <SelectValue placeholder="Filter Status" />
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
            </div>

            {/* Sort Dropdown */}
            <div className="flex-1 sm:flex-initial">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-11 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-900 gap-2 min-w-[150px]">
                  <ArrowUpDown size={15} className="text-gray-500 shrink-0" />
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="newest">Sort by: Newest</SelectItem>
                  <SelectItem value="oldest">Sort by: Oldest</SelectItem>
                  <SelectItem value="name">Sort by: Name (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExportCSV}
              className="h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-5 font-semibold shadow-sm transition-colors shrink-0 flex items-center gap-2"
            >
              <Download size={16} />
              <span>Export</span>
            </Button>
          </div>
        </div>

        {/* ─── Summary Stat Cards Row ────────────────────────────────────── */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800 gap-4 md:gap-0">
          
          {/* Card 1: Total Inquiries */}
          <div className="flex items-center justify-between pr-0 md:pr-6 pb-4 md:pb-0">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {totalCount}
              </span>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                Total Inquiries
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <FileText size={22} />
            </div>
          </div>

          {/* Card 2: Booked */}
          <div className="flex items-center justify-between pt-4 md:pt-0 pl-0 md:pl-6 pr-0 md:pr-6">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {bookedCount}
              </span>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                Booked
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 size={22} />
            </div>
          </div>

          {/* Card 3: Blocked */}
          <div className="flex items-center justify-between pt-4 md:pt-0 pl-0 md:pl-6 pr-0 md:pr-6">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {blockedCount}
              </span>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                Blocked
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
              <Shield size={22} />
            </div>
          </div>

          {/* Card 4: Pending */}
          <div className="flex items-center justify-between pt-4 md:pt-0 pl-0 md:pl-6">
            <div>
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                {pendingCount}
              </span>
              <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                Pending
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock3 size={22} />
            </div>
          </div>

        </div>

        {/* ─── Inquiries Card List ───────────────────────────────────────── */}
        <div className="space-y-4">
          {paginatedInquiries.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4">
                <Car size={32} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                No Inquiries Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                {searchTerm || statusFilter !== "all"
                  ? "No booking inquiries match your search criteria. Try clearing filters."
                  : "No booking inquiries have been submitted yet."}
              </p>
            </div>
          ) : (
            paginatedInquiries.map((inquiry) => {
              const statusStyle = statusBadgeStyles[inquiry.status] || statusBadgeStyles.pending;
              const formattedCreatedDate = format(new Date(inquiry.created_at), "MMM dd, yyyy");
              const formattedCreatedTime = format(new Date(inquiry.created_at), "hh:mm a");

              return (
                <div 
                  key={inquiry.id} 
                  className="bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-5"
                >
                  {/* Top Card Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Customer Info */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300 font-bold text-sm flex items-center justify-center shrink-0">
                        {getInitials(inquiry.name)}
                      </div>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white leading-tight">
                          {inquiry.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                          <Phone size={14} className="text-gray-400 shrink-0" />
                          <a 
                            href={`tel:${inquiry.phone}`} 
                            className="hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                          >
                            {inquiry.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Metadata & Menu */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-5 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 dark:border-gray-800">
                      {/* Status Badge Pill */}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text} capitalize tracking-wide`}>
                        {statusStyle.label}
                      </span>

                      {/* Created Timestamp */}
                      <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="text-gray-400" />
                          <span>{formattedCreatedDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="text-gray-400" />
                          <span>{formattedCreatedTime}</span>
                        </div>
                      </div>

                      {/* Three-dots Menu */}
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                      >
                        <MoreVertical size={16} />
                      </Button>
                    </div>

                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-gray-100 dark:border-gray-800" />

                  {/* Pickup / Drop / Actions Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    
                    {/* Pickup Details (Cols 4) */}
                    <div className="lg:col-span-4 space-y-2">
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                        PICKUP DETAILS
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                          <MapPin size={15} className="text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-900 dark:text-white">{inquiry.pickup_location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar size={15} className="text-gray-400 shrink-0" />
                          <span>{inquiry.pickup_date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Clock size={15} className="text-gray-400 shrink-0" />
                          <span>{inquiry.pickup_time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Drop Details (Cols 4) */}
                    <div className="lg:col-span-4 space-y-2">
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
                        DROP DETAILS
                      </span>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
                          <MapPin size={15} className="text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-900 dark:text-white">{inquiry.drop_location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar size={15} className="text-gray-400 shrink-0" />
                          <span>{inquiry.drop_date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Clock size={15} className="text-gray-400 shrink-0" />
                          <span>{inquiry.drop_time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions Panel (Cols 4) */}
                    <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end gap-2.5">
                      
                      {/* Call Customer Button */}
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="w-full sm:w-48 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2.5 px-4 text-sm font-semibold flex items-center justify-center gap-2 shadow-sm shadow-blue-200 dark:shadow-none transition-colors"
                      >
                        <PhoneCall size={16} />
                        <span>Call Customer</span>
                      </a>

                      {/* View Details Button */}
                      <Button
                        variant="outline"
                        onClick={() => setSelectedInquiry(inquiry)}
                        className="w-full sm:w-48 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors h-10"
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </Button>

                      {/* Status Update Selector Dropdown */}
                      <div className="w-full sm:w-48">
                        <Select
                          value={inquiry.status}
                          onValueChange={(val) => handleStatusUpdate(inquiry.id, val as any)}
                          disabled={updatingStatus === inquiry.id}
                        >
                          <SelectTrigger className="w-full h-10 border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold capitalize bg-white dark:bg-gray-900">
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

                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* ─── Bottom Pagination Bar ────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 pb-8 text-sm text-gray-500 dark:text-gray-400">
          <div>
            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredInquiries.length === 0 ? 0 : startIndex + 1}</span> to{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.min(startIndex + itemsPerPage, filteredInquiries.length)}
            </span>{" "}
            of <span className="font-semibold text-gray-900 dark:text-white">{filteredInquiries.length}</span> inquiries
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              className="h-9 w-9 rounded-xl border-gray-200 dark:border-gray-800"
            >
              <ChevronLeft size={16} />
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className={`h-9 w-9 rounded-xl text-xs font-bold ${
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
              className="h-9 w-9 rounded-xl border-gray-200 dark:border-gray-800"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>

      </div>

      {/* ─── View Details Modal Dialog ─────────────────────────────────── */}
      <Dialog open={!!selectedInquiry} onOpenChange={(open) => !open && setSelectedInquiry(null)}>
        <DialogContent className="max-w-xl rounded-2xl p-6 sm:p-8 border-gray-200 dark:border-gray-800">
          {selectedInquiry && (
            <div className="space-y-6">
              
              {/* Header */}
              <DialogHeader className="space-y-1 text-left">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    {selectedInquiry.name}
                  </DialogTitle>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadgeStyles[selectedInquiry.status]?.bg} ${statusBadgeStyles[selectedInquiry.status]?.text} capitalize`}>
                    {selectedInquiry.status}
                  </span>
                </div>
                <DialogDescription className="text-sm text-gray-500">
                  Submitted on {format(new Date(selectedInquiry.created_at), "MMMM dd, yyyy 'at' hh:mm a")}
                </DialogDescription>
              </DialogHeader>

              {/* Customer Contact */}
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl flex items-center justify-between border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-medium block">Phone Number</span>
                    <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-gray-900 dark:text-white hover:text-blue-600">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-3 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <PhoneCall size={14} />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Trip Information Grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
                <div className="space-y-2">
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

                <div className="space-y-2">
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

              {/* Status Update Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Update Inquiry Status
                </label>
                <Select
                  value={selectedInquiry.status}
                  onValueChange={(val) => handleStatusUpdate(selectedInquiry.id, val as any)}
                >
                  <SelectTrigger className="w-full h-11 rounded-xl">
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
        </DialogContent>
      </Dialog>
    </div>
  );
}