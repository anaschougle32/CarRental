"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Car } from "@/lib/types";
import { Star, Fuel, Settings, Phone, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PlaceholderImage from "@/components/ui/placeholder-image";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: Car;
  showCategory?: boolean;
  showDescription?: boolean;
}

const CarCard = ({ car, showCategory = false, showDescription = true }: CarCardProps) => {
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
        
        {showDescription && (
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 hidden sm:block">
            {car.description?.split('.')[0] || `Experience the ${car.name} for your next adventure.`}
          </p>
        )}
        
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
          <div className="flex justify-end items-center mb-2 sm:mb-4">
            <Link href={`/cars/${car.slug}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full sm:w-auto">
              View Details
            </Link>
          </div>
          
          <div className="flex gap-1 sm:gap-2">
            <a href={`tel:+919082888912`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-2 sm:px-3 flex-1">
              <Phone size={14} className="mr-1 sm:mr-2" />
              <span>Call</span>
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs sm:text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-2 sm:px-3 flex-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mr-1 sm:mr-2 text-green-500">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;