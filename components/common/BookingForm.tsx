"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { submitBookingInquiry } from "@/lib/supabase/index";

interface BookingFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const BookingForm = ({ 
  title = "Book Your Car Rental", 
  subtitle = "Fill out the form below to check availability and get instant quotes",
  className = ""
}: BookingFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    pickupTime: "10:00",
    dropTime: "10:00"
  });
  
  const [pickupDate, setPickupDate] = useState<Date | undefined>(undefined);
  const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);
  
  // Initialize dates on client side only
  useEffect(() => {
    setPickupDate(new Date());
    setReturnDate(new Date(new Date().setDate(new Date().getDate() + 3)));
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    
    if (!formData.pickupLocation.trim()) {
      toast.error("Please enter pickup location");
      return;
    }
    
    if (!formData.dropLocation.trim()) {
      toast.error("Please enter drop location");
      return;
    }
    
    if (!pickupDate) {
      toast.error("Please select pickup date");
      return;
    }
    
    if (!returnDate) {
      toast.error("Please select drop date");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitBookingInquiry({
        name: formData.name,
        phone: formData.phone,
        pickup_location: formData.pickupLocation,
        drop_location: formData.dropLocation,
        pickup_date: format(pickupDate, "yyyy-MM-dd"),
        pickup_time: formData.pickupTime,
        drop_date: format(returnDate, "yyyy-MM-dd"),
        drop_time: formData.dropTime
      });

      if (result.success) {
        toast.success("Booking inquiry submitted! Redirecting to available cars...");
        // Redirect to cars page after successful submission
        setTimeout(() => {
          router.push("/cars");
        }, 1500);
      } else {
        toast.error("Failed to submit booking inquiry. Please try again.");
        console.error("Booking submission error:", result.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error("Booking submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={`py-12 bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-900 rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Name Field */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="booking-name" className="mb-1 block text-sm">Name</Label>
                <Input 
                  id="booking-name" 
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your full name" 
                  className="h-10 sm:h-11"
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="booking-phone" className="mb-1 block text-sm">Phone Number</Label>
                <Input 
                  id="booking-phone" 
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+91 98765 43210" 
                  className="h-10 sm:h-11"
                  required
                />
              </div>
              
              {/* Pickup Location */}
              <div className="sm:col-span-1 lg:col-span-1">
                <Label htmlFor="booking-pickup-location" className="mb-1 block text-sm">Pickup Location</Label>
                <Input 
                  id="booking-pickup-location" 
                  value={formData.pickupLocation}
                  onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                  placeholder="Airport, Calangute, Panjim..." 
                  className="h-10 sm:h-11"
                  required
                />
              </div>

              {/* Drop Location */}
              <div className="sm:col-span-1 lg:col-span-1">
                <Label htmlFor="booking-drop-location" className="mb-1 block text-sm">Drop Location</Label>
                <Input 
                  id="booking-drop-location" 
                  value={formData.dropLocation}
                  onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                  placeholder="Same as pickup or different..." 
                  className="h-10 sm:h-11"
                  required
                />
              </div>
              
              {/* Pickup Date & Time */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="booking-pickup-datetime" className="mb-1 block text-sm">Pickup Date & Time</Label>
                <div className="flex gap-1 sm:gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        id="booking-pickup-datetime"
                      variant="outline"
                        className="flex-1 justify-start text-left font-normal h-10 sm:h-11 text-xs sm:text-sm"
                    >
                      <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        {pickupDate ? format(pickupDate, "dd/MM") : <span>Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                  <Input 
                    type="time"
                    value={formData.pickupTime}
                    onChange={(e) => handleInputChange("pickupTime", e.target.value)}
                    className="flex-1 h-10 sm:h-11 text-xs sm:text-sm"
                  />
                </div>
              </div>
              
              {/* Drop Date & Time */}
              <div className="sm:col-span-2 lg:col-span-1">
                <Label htmlFor="booking-drop-datetime" className="mb-1 block text-sm">Drop Date & Time</Label>
                <div className="flex gap-1 sm:gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        id="booking-drop-datetime"
                      variant="outline"
                        className="flex-1 justify-start text-left font-normal h-10 sm:h-11 text-xs sm:text-sm"
                    >
                      <CalendarIcon className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        {returnDate ? format(returnDate, "dd/MM") : <span>Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      initialFocus
                      disabled={(date: Date) => date < (pickupDate || new Date())}
                    />
                  </PopoverContent>
                </Popover>
                  <Input 
                    type="time"
                    value={formData.dropTime}
                    onChange={(e) => handleInputChange("dropTime", e.target.value)}
                    className="flex-1 h-10 sm:h-11 text-xs sm:text-sm"
                  />
                </div>
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full mt-4 sm:mt-6 h-11 sm:h-12 text-sm sm:text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Submitting...</span>
                  <span className="sm:hidden">Loading...</span>
                </>
              ) : (
                <>
                <span className="hidden sm:inline">Search Available Cars</span>
                <span className="sm:hidden">Search Cars</span>
                <ChevronRight size={16} className="ml-2" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
