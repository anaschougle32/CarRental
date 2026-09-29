"use client";

import { useState } from "react";
import Image from "next/image";
import PlaceholderImage from "@/components/ui/placeholder-image";
import { 
  getCarImageUrl, 
  getCarGitHubImageUrl, 
  getCarLocalImageUrl, 
  getCarImageFilename 
} from "@/lib/car-images";

interface CarGalleryProps {
  main_image?: string;
  alt: string;
}

const CarGallery = ({ main_image, alt }: CarGalleryProps) => {
  const initialImage = getCarImageUrl({ name: alt, slug: alt, main_image });
  const [imgSrc, setImgSrc] = useState<string>(initialImage);
  const [hasImageError, setHasImageError] = useState(false);

  const handleImageError = () => {
    const filename = getCarImageFilename(alt);
    const githubUrl = getCarGitHubImageUrl(filename);
    const localUrl = getCarLocalImageUrl(filename);

    if (imgSrc !== githubUrl && imgSrc !== localUrl) {
      setImgSrc(githubUrl);
    } else if (imgSrc === githubUrl) {
      setImgSrc(localUrl);
    } else {
      setHasImageError(true);
    }
  };
  
  // Use fallback placeholder if all sources fail
  if (hasImageError || !imgSrc) {
    return (
      <div className="relative rounded-lg overflow-hidden h-64 md:h-96">
        <PlaceholderImage text={`${alt} - Image Not Available`} />
      </div>
    );
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      {/* Main Image */}
      <div className="relative h-64 md:h-96 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <Image
            src={imgSrc}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            priority
            onError={handleImageError}
          />
        </div>
      </div>
    </div>
  );
};

export default CarGallery;