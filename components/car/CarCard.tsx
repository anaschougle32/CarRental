"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Car } from "@/lib/types";
import { Star, Fuel, Settings, Phone, MessageCircle } from "lucide-react";
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
  
  // Ensure we have at least one valid image
  const mainImage = car.images && car.images.length > 0 ? car.images[0] : null;
  
  // Create WhatsApp message with car details
  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in renting the ${car.brand} ${car.name}. Could you provide more information?`);
  const whatsappLink = `https://wa.me/918888888888?text=${whatsappMessage}`;
  
  return (
    <Card className="overflow-hidden group h-full flex flex-col transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        {mainImage && !hasImageError ? (
          <div className="relative w-full h-full">
            <Image
              src={mainImage}
              alt={`${car.brand} ${car.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
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
      
      <CardContent className="flex-1 pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg">{car.brand} {car.name}</h3>
          <div className="flex items-center text-amber-500">
            <Star size={16} fill="currentColor" className="mr-1" />
            <span className="text-sm">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {car.description?.split('.')[0] || `Experience the ${car.brand} ${car.name} for your next adventure.`}
        </p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center">
            <Fuel size={16} className="mr-1 text-blue-600" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center">
            <Settings size={16} className="mr-1 text-blue-600" />
            <span>{car.transmission}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t flex-col space-y-3 pt-4">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
            <p className="font-bold text-lg">
              ₹{car.price_per_day}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
          <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href={`/cars/${car.slug}`}>View Details</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-green-500 text-green-600 hover:bg-green-50 hover:border-green-600 dark:hover:bg-green-900/20 flex items-center justify-center"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={14} className="mr-1.5" />
              WhatsApp
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="border-blue-500 text-blue-600 hover:bg-blue-50 hover:border-blue-600 dark:hover:bg-blue-900/20 flex items-center justify-center"
            asChild
          >
            <Link href="tel:+918888888888">
              <Phone size={14} className="mr-1.5" />
              Call Now
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CarCard;