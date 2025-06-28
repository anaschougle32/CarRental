"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Car,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  PhoneCall
} from "lucide-react";
import { getBookingInquiries, updateBookingInquiryStatus } from "@/lib/supabase/index";
import { format } from "date-fns";
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
  status: 'pending' | 'contacted' | 'booked' | 'cancelled';
  created_at: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800", 
  booked: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
};

const statusIcons = {
  pending: AlertCircle,
  contacted: PhoneCall,
  booked: CheckCircle,
  cancelled: XCircle
};

export default function BookingInquiriesPage() {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [filteredInquiries, setFilteredInquiries] = useState<BookingInquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    let filtered = inquiries;

    if (searchTerm) {
      filtered = filtered.filter(
        (inquiry) =>
          inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.phone.includes(searchTerm) ||
          inquiry.pickup_location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inquiry.drop_location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((inquiry) => inquiry.status === statusFilter);
    }

    setFilteredInquiries(filtered);
  }, [searchTerm, statusFilter, inquiries]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const data = await getBookingInquiries();
      setInquiries(data);
      setFilteredInquiries(data);
    } catch (error) {
      console.error("Error fetching booking inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: 'pending' | 'contacted' | 'booked' | 'cancelled') => {
    setUpdatingStatus(id);
    try {
      const result = await updateBookingInquiryStatus(id, newStatus);
      if (result.success) {
        setInquiries(prev => 
          prev.map(inquiry => 
            inquiry.id === id ? { ...inquiry, status: newStatus } : inquiry
          )
        );
        toast.success("Status updated successfully");
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading booking inquiries...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Booking Inquiries</h1>
          <p className="text-muted-foreground">
            Manage customer booking requests from the hero form
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-3 py-1">
          {filteredInquiries.length} Inquiries
        </Badge>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center space-x-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Inquiries Found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "No inquiries match your search criteria."
                  : "No booking inquiries have been submitted yet."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredInquiries.map((inquiry) => {
            const StatusIcon = statusIcons[inquiry.status];
            return (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {inquiry.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <a 
                          href={`tel:${inquiry.phone}`}
                          className="hover:text-primary hover:underline"
                        >
                          {inquiry.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={statusColors[inquiry.status]}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(inquiry.created_at), "MMM dd, yyyy")}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Separator />
                    
                    {/* Booking Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Pickup Details:
                        </Label>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          {inquiry.pickup_location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(inquiry.pickup_date), "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          {inquiry.pickup_time}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-muted-foreground">
                          Drop Details:
                        </Label>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3" />
                          {inquiry.drop_location}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(inquiry.drop_date), "MMM dd, yyyy")}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          {inquiry.drop_time}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button size="sm" asChild>
                        <a href={`tel:${inquiry.phone}`}>
                          Call Customer
                        </a>
                      </Button>
                      
                      <Select
                        value={inquiry.status}
                        onValueChange={(value) => handleStatusUpdate(inquiry.id, value as any)}
                        disabled={updatingStatus === inquiry.id}
                      >
                        <SelectTrigger className="w-[140px] h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="booked">Booked</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {updatingStatus === inquiry.id && (
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
} 