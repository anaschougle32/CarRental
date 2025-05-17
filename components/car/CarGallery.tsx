"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PlaceholderImage from "@/components/ui/placeholder-image";

interface CarGalleryProps {
  images: string[];
  alt: string;
}

const CarGallery = ({ images, alt }: CarGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Ensure we have valid images
  const validImages = images.filter(img => img && typeof img === 'string' && img.trim() !== '');

  // Use fallback if no valid images
  if (validImages.length === 0) {
    return (
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
        <PlaceholderImage text={`${alt} - Image Not Available`} />
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + validImages.length) % validImages.length);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % validImages.length);
  };

  const handleImageError = (idx: number) => {
    setImageErrors(prev => ({...prev, [idx]: true}));
  };

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative h-64 md:h-96 bg-gray-100 dark:bg-gray-800">
        {validImages.map((image, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              idx === activeIndex ? "opacity-100" : "opacity-0"
            )}
          >
            {imageErrors[idx] ? (
              <PlaceholderImage text={`${alt} - Image ${idx + 1}`} />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={image}
                  alt={`${alt} - Image ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority={idx === 0}
                  onError={() => handleImageError(idx)}
                />
              </div>
            )}
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 shadow-md rounded-full z-10"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 dark:bg-gray-900/80 shadow-md rounded-full z-10"
          onClick={handleNext}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
        {validImages.map((image, idx) => (
          <button
            key={idx}
            className={cn(
              "h-16 w-24 flex-shrink-0 rounded overflow-hidden border-2 transition-all relative",
              idx === activeIndex
                ? "border-blue-600 opacity-100"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
            onClick={() => setActiveIndex(idx)}
          >
            {imageErrors[idx] ? (
              <div className="bg-blue-700 text-white text-xs flex items-center justify-center w-full h-full">No Image</div>
            ) : (
              <Image
                src={image}
                alt={`${alt} thumbnail ${idx + 1}`}
                fill
                sizes="96px"
                className="object-cover"
                onError={() => handleImageError(idx)}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;