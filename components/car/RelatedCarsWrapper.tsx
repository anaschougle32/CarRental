"use client";

import dynamic from "next/dynamic";
import { Car } from "@/lib/types";

// Dynamically import the CarCard component with ssr: false
const CarCard = dynamic(() => import("@/components/car/CarCard"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading car...</div>
    </div>
  )
});

interface RelatedCarsWrapperProps {
  relatedCars: Car[];
}

export default function RelatedCarsWrapper({ relatedCars }: RelatedCarsWrapperProps) {
  if (!relatedCars || relatedCars.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Similar Cars You Might Like</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedCars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
