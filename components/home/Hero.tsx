"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Optimize images by using smaller high-quality images
const heroImages = [
  "https://images.pexels.com/photos/3608542/pexels-photo-3608542.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  "https://images.pexels.com/photos/3757052/pexels-photo-3757052.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  "https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
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
          "name": "GoDrive Car Rentals",
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[600px] md:h-screen flex items-center justify-center overflow-hidden">
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
            alt={`GoDrive Car Rental in Goa - Image ${index + 1}`}
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
        
        {/* Quick Search Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 max-w-4xl mx-auto mt-6 md:mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="location" className="text-white mb-1 block">Pickup Location</Label>
              <Input 
                id="location" 
                placeholder="Airport, Calangute, Panjim..." 
                className="bg-white/20 text-white placeholder:text-white/70 border-white/30"
              />
            </div>
            
            <div>
              <Label htmlFor="pickup-date" className="text-white mb-1 block">Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="pickup-date"
                    variant="outline"
                    className="w-full bg-white/20 text-white border-white/30 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
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
            </div>
            
            <div>
              <Label htmlFor="return-date" className="text-white mb-1 block">Return Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="return-date"
                    variant="outline"
                    className="w-full bg-white/20 text-white border-white/30 justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : <span>Pick a date</span>}
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
            </div>
          </div>
          
          <Button size="lg" className="w-full mt-4" asChild>
            <Link href="/cars">
              Search Available Cars <ChevronRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button size="lg" asChild>
            <Link href="/cars" className="group">
              Browse All Cars
              <ChevronRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900" asChild>
            <Link href="tel:+918888888888">
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