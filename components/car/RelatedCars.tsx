import dynamic from "next/dynamic";
import { getCars, getBrands } from "@/lib/supabase";
import { Car } from "@/lib/types";

// Dynamically import the client component
const CarCard = dynamic(() => import("@/components/car/CarCard"), { ssr: false });

interface RelatedCarsProps {
  currentSlug: string;
}

async function getRelatedCarsFromSupabase(currentSlug: string) {
  try {
    const allCars = await getCars();
    const allBrands = await getBrands();
    
    // Filter out current car and limit to 3 related cars
    const filteredCars = allCars
      .filter(car => car.slug !== currentSlug)
      .slice(0, 3);
    
    if (filteredCars.length === 0) {
      return [];
    }
    
    // Transform Supabase car data to match our Car type
    const mappedCars: Car[] = filteredCars.map(car => {
      // Find the brand for this car
      const brand = allBrands.find(b => b.id === car.brand_id);
      const brandName = brand ? brand.name : "Unknown";
      
      return {
        id: car.id,
        name: car.name,
        brand: brandName,
        slug: car.slug,
        price_per_day: car.price_per_day,
        description: car.description || "Experience premium car rental with our fleet.",
        features: (car.features || []).map(feature => ({
          icon: "check",
          name: feature
        })),
        fuel_type: car.fuel_type as any,
        transmission: car.transmission as any,
        min_days: 1, // Default value
        main_image: car.main_image || "/images/car-placeholder.jpg",
        category: car.seats <= 5 
          ? car.seats <= 4 ? "Hatchback" : "Sedan" 
          : car.seats <= 7 ? "SUV" : "Premium"
      };
    });
    
    return mappedCars;
  } catch (error) {
    console.error("Error fetching related cars:", error);
    return [];
  }
}

export default async function RelatedCars({ currentSlug }: RelatedCarsProps) {
  const relatedCars = await getRelatedCarsFromSupabase(currentSlug);

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