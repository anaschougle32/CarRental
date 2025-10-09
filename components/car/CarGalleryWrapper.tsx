"use client";

import dynamic from "next/dynamic";

// Dynamically import the CarGallery component with ssr: false
const CarGallery = dynamic(() => import("@/components/car/CarGallery"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading gallery...</div>
    </div>
  )
});

interface CarGalleryWrapperProps {
  main_image: string;
  alt: string;
}

export default function CarGalleryWrapper({ main_image, alt }: CarGalleryWrapperProps) {
  return <CarGallery main_image={main_image} alt={alt} />;
}
