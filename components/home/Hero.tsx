"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { submitBookingInquiry } from "@/lib/supabase/index";

// Optimize images by using smaller high-quality images
const heroImages = [
  "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  "https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  "https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
];

// Add structured data for SEO
export function HeroStructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RentalCarCompany",
          "name": "ZioCarRentals",
          "image": heroImages[0],
          "priceRange": "₹₹",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Beach Road, Calangute",
            "addressLocality": "North Goa",
            "postalCode": "403516",
            "addressCountry": "IN"
          },
          "telephone": "+918888888888",
          "description": "Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance."
        })
      }}
    />
  );
}

const Hero = () => {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
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
        router.push("/cars");
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
    <section className="relative min-h-[600px] md:h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Structured Data for SEO */}
      <HeroStructuredData />
      
      {/* Background Images with Fade Transition */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000",
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          )}
          aria-hidden="true"
        >
          <Image 
            src={image} 
            alt={`ZioCarRentals Car Rental in Goa - Image ${index + 1}`}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover"
            quality={index === 0 ? 85 : 75}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-0 text-center text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
          Freedom to Explore Goa,{" "}
          <span className="text-blue-400">Your Way</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 max-w-3xl mx-auto">
          Premium self-drive car rentals with unlimited kilometers,
          airport pickup, and 24/7 roadside assistance.
        </p>
        
        {/* Enhanced Booking Form */}
        <form onSubmit={handleFormSubmit} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 max-w-5xl mx-auto mt-6 md:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Name Field */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Label htmlFor="name" className="text-white mb-1 block text-sm">Name</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your full name" 
                className="bg-white/20 text-white placeholder:text-white/70 border-white/30 h-10 sm:h-11"
                required
              />
            </div>

            {/* Phone Number Field */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Label htmlFor="phone" className="text-white mb-1 block text-sm">Phone Number</Label>
              <Input 
                id="phone" 
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+91 98765 43210" 
                className="bg-white/20 text-white placeholder:text-white/70 border-white/30 h-10 sm:h-11"
                required
              />
            </div>
            
            {/* Pickup Location */}
            <div className="sm:col-span-1 lg:col-span-1">
              <Label htmlFor="pickup-location" className="text-white mb-1 block text-sm">Pickup Location</Label>
              <Input 
                id="pickup-location" 
                value={formData.pickupLocation}
                onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                placeholder="Airport, Calangute, Panjim..." 
                className="bg-white/20 text-white placeholder:text-white/70 border-white/30 h-10 sm:h-11"
                required
              />
            </div>

            {/* Drop Location */}
            <div className="sm:col-span-1 lg:col-span-1">
              <Label htmlFor="drop-location" className="text-white mb-1 block text-sm">Drop Location</Label>
              <Input 
                id="drop-location" 
                value={formData.dropLocation}
                onChange={(e) => handleInputChange("dropLocation", e.target.value)}
                placeholder="Same as pickup or different..." 
                className="bg-white/20 text-white placeholder:text-white/70 border-white/30 h-10 sm:h-11"
                required
              />
            </div>
            
            {/* Pickup Date & Time */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Label htmlFor="pickup-datetime" className="text-white mb-1 block text-sm">Pickup Date & Time</Label>
              <div className="flex gap-1 sm:gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      id="pickup-datetime"
                    variant="outline"
                      className="flex-1 bg-white/20 text-white border-white/30 justify-start text-left font-normal h-10 sm:h-11 text-xs sm:text-sm"
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
                  className="flex-1 bg-white/20 text-white border-white/30 h-10 sm:h-11 text-xs sm:text-sm"
                />
              </div>
            </div>
            
            {/* Drop Date & Time */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Label htmlFor="drop-datetime" className="text-white mb-1 block text-sm">Drop Date & Time</Label>
              <div className="flex gap-1 sm:gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      id="drop-datetime"
                    variant="outline"
                      className="flex-1 bg-white/20 text-white border-white/30 justify-start text-left font-normal h-10 sm:h-11 text-xs sm:text-sm"
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
                  className="flex-1 bg-white/20 text-white border-white/30 h-10 sm:h-11 text-xs sm:text-sm"
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
        
        {/* Added more spacing above the buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-12 sm:mt-16 md:mt-20">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto" asChild>
            <Link href="/cars" className="group">
              <span className="hidden sm:inline">Browse All Cars</span>
              <span className="sm:hidden">Browse Cars</span>
              <ChevronRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="border-white bg-black/80 text-white hover:bg-black hover:text-white w-full sm:w-auto" asChild>
            <Link href="tel:+919082888912">
              Call Us Now
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - Hide on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
        <div className="w-8 h-12 border-2 border-white rounded-full flex justify-center mb-2">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce" />
        </div>
        <span className="text-white text-sm">Scroll Down</span>
      </div>
    </section>
  );
};

export default Hero;