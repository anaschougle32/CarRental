"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Car } from "@/lib/types";
import { Star, Fuel, Settings, Phone, Gauge } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PlaceholderImage from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  showCategory?: boolean;
}

const CarCard = ({ car, showCategory = false }: CarCardProps) => {
  // State to track if image has error
  const [hasImageError, setHasImageError] = useState(false);
  
  // Create WhatsApp message with car details
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in renting the ${car.brand} ${car.name}. Could you provide more information?`);
  const whatsappLink = `https://wa.me/917977288350?text=${whatsappMessage}`;
  
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all hover:shadow-lg">
      <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
        {car.main_image && !hasImageError ? (
          <div className="relative w-full h-full">
            <Image
              src={car.main_image}
              alt={`${car.brand} ${car.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-right transition-transform duration-500 group-hover:scale-105"
              onError={() => setHasImageError(true)}
            />
          </div>
        ) : (
          <PlaceholderImage text={`${car.brand} ${car.name}`} />
        )}
        
        {showCategory && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-xs rounded-full z-10">
            {car.category}
          </span>
        )}
      </div>
      
      <CardContent className="flex-1 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">{car.brand}</p>
            <h3 className="font-bold text-sm sm:text-base md:text-lg">{car.name}</h3>
          </div>
          <div className="flex items-center text-amber-500">
            <Star size={14} fill="currentColor" className="mr-1" />
            <span className="text-xs sm:text-sm">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 hidden sm:block">
          {car.description?.split('.')[0] || `Experience the ${car.name} for your next adventure.`}
        </p>
        
        <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
          <div className="flex items-center">
            <Fuel size={14} className="mr-1 text-blue-600" />
            <span className="truncate">{car.fuel_type}</span>
          </div>
          <div className="flex items-center">
            <Settings size={14} className="mr-1 text-blue-600" />
            <span className="truncate">{car.transmission}</span>
          </div>
          {car.mileage && (
            <div className="flex items-center hidden sm:flex">
              <Gauge size={14} className="mr-1 text-blue-600" />
              <span>{car.mileage} km/l</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
        <div className="w-full">
          <div className="flex justify-between items-center mb-2 sm:mb-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Price per day</p>
              <p className="text-lg sm:text-xl font-bold">₹{car.price_per_day}</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/cars/${car.slug}`} className="text-xs sm:text-sm">View Details</Link>
            </Button>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm px-2 sm:px-3" asChild>
              <a href={`tel:+919082888912`}>
                <Phone size={14} className="mr-1 sm:mr-2" />
                <span>Call</span>
              </a>
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-xs sm:text-sm px-2 sm:px-3" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={14} className="mr-1 sm:mr-2" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;