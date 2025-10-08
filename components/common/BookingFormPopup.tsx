"use client";

import { useState, useEffect } from "react";
import { X, Calendar, MapPin, User, Phone, Mail, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

interface BookingFormPopupProps {
  triggerText?: string;
  triggerClassName?: string;
}

export default function BookingFormPopup({ 
  triggerText = "Book Your Car Now", 
  triggerClassName = "bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
}: BookingFormPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    pickupDate: "",
    returnDate: "",
    carType: "",
    message: ""
  });

  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert booking inquiry into Supabase
      const { error } = await supabase
        .from('booking_inquiries')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            pickup_location: formData.pickupLocation,
            pickup_date: formData.pickupDate,
            return_date: formData.returnDate,
            car_type: formData.carType,
            message: formData.message,
            status: 'pending',
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error submitting booking:', error);
        toast.error("Failed to submit booking. Please try again.");
      } else {
        toast.success("Booking inquiry submitted successfully! We'll contact you soon.");
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          pickupLocation: "",
          pickupDate: "",
          returnDate: "",
          carType: "",
          message: ""
        });
        
        // Close popup
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Ensure component is mounted before using Date
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set default dates when component mounts
  useEffect(() => {
    if (!mounted) return;
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const returnDate = new Date(today);
    returnDate.setDate(returnDate.getDate() + 3);

    setFormData(prev => ({
      ...prev,
      pickupDate: tomorrow.toISOString().split('T')[0],
      returnDate: returnDate.toISOString().split('T')[0]
    }));
  }, [mounted]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Book Your Car Rental
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="popup-name" className="flex items-center gap-2 mb-2">
              <User size={16} />
              Full Name *
            </Label>
            <Input
              id="popup-name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="popup-email" className="flex items-center gap-2 mb-2">
              <Mail size={16} />
              Email Address *
            </Label>
            <Input
              id="popup-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="popup-phone" className="flex items-center gap-2 mb-2">
              <Phone size={16} />
              Phone Number *
            </Label>
            <Input
              id="popup-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Pickup Location */}
          <div>
            <Label htmlFor="popup-location" className="flex items-center gap-2 mb-2">
              <MapPin size={16} />
              Pickup Location *
            </Label>
            <Select value={formData.pickupLocation} onValueChange={(value) => handleInputChange("pickupLocation", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anjuna">Anjuna</SelectItem>
                <SelectItem value="baga">Baga</SelectItem>
                <SelectItem value="calangute">Calangute</SelectItem>
                <SelectItem value="candolim">Candolim</SelectItem>
                <SelectItem value="panaji">Panaji</SelectItem>
                <SelectItem value="margao">Margao</SelectItem>
                <SelectItem value="vasco">Vasco</SelectItem>
                <SelectItem value="airport">Goa Airport</SelectItem>
                <SelectItem value="other">Other Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="popup-pickup-date" className="flex items-center gap-2 mb-2">
                <Calendar size={16} />
                Pickup Date *
              </Label>
              <Input
                id="popup-pickup-date"
                type="date"
                value={formData.pickupDate}
                onChange={(e) => handleInputChange("pickupDate", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="popup-return-date" className="flex items-center gap-2 mb-2">
                <Calendar size={16} />
                Return Date *
              </Label>
              <Input
                id="popup-return-date"
                type="date"
                value={formData.returnDate}
                onChange={(e) => handleInputChange("returnDate", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Car Type */}
          <div>
            <Label htmlFor="popup-car-type" className="flex items-center gap-2 mb-2">
              <Car size={16} />
              Preferred Car Type
            </Label>
            <Select value={formData.carType} onValueChange={(value) => handleInputChange("carType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select car type (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hatchback">Hatchback</SelectItem>
                <SelectItem value="sedan">Sedan</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="any">Any Available</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="popup-message" className="mb-2 block">
              Additional Requirements
            </Label>
            <Textarea
              id="popup-message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Any special requirements or questions?"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Booking Request"}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>Or call us directly at <a href="tel:+919082888912" className="text-blue-600 font-semibold">+91 90828 88912</a></p>
        </div>
      </DialogContent>
    </Dialog>
  );
}