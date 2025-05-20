"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PlaceholderImage from "@/components/ui/placeholder-image";

interface CarGalleryProps {
  main_image: string;
  alt: string;
}

const CarGallery = ({ main_image, alt }: CarGalleryProps) => {
  const [hasImageError, setHasImageError] = useState(false);
  
  // Use fallback if no valid image
  if (!main_image || hasImageError) {
    return (
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
        <PlaceholderImage text={`${alt} - Image Not Available`} />
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative h-64 md:h-96 bg-gray-100 dark:bg-gray-800">
        <div className="relative w-full h-full">
          <Image
            src={main_image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
            onError={() => setHasImageError(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default CarGallery;