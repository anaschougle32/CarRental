import { Metadata } from "next";
import CarsGrid from "@/components/car/CarsGrid";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Container, Section } from "@/components/common/LayoutComponents";

export const metadata: Metadata = {
  title: "Available Self Drive Cars in Goa – Book Online",
  description: "Browse our fleet of well-maintained cars for rent in Goa. From compact hatchbacks to premium SUVs, find the perfect car for your Goan adventure.",
  keywords: "car rental Goa, self drive cars, rent car Goa, SUV rental, budget cars Goa",
};

function LoadingCars() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
      <p className="text-lg text-gray-600">Loading available cars...</p>
    </div>
  );
}

import { getCars, getBrands } from "@/lib/supabase";
import type { Car } from "@/lib/types";

// ISR: Cache cars fleet page at the edge for 1 hour
export const revalidate = 3600;

export default async function CarsPage() {
  let initialCars: Car[] = [];

  try {
    const [carsData, brandsData] = await Promise.all([
      getCars(),
      getBrands(),
    ]);

    const brandMap = new Map((brandsData || []).map((b) => [b.id, b.name]));

    initialCars = (carsData || []).map((car) => {
      const brandName = brandMap.get(car.brand_id) || "Unknown";
      return {
        id: car.id,
        name: car.name,
        brand: brandName,
        brand_id: car.brand_id,
        slug: car.slug,
        price_per_day: car.price_per_day,
        description: car.description || `Experience the comfort of ${car.name} for your Goa trip.`,
        features: (car.features || []).map((feature) => ({
          icon: "check",
          name: feature,
        })),
        fuel_type: car.fuel_type as any,
        transmission: car.transmission as any,
        min_days: 1,
        mileage: car.mileage,
        main_image: car.main_image || "/images/cars/car-placeholder.jpg",
        category:
          car.seats <= 5
            ? car.seats <= 4
              ? "Hatchback"
              : "Sedan"
            : car.seats <= 7
            ? "SUV"
            : "Premium",
      } as unknown as Car;
    });
  } catch (err) {
    console.error("Error pre-fetching cars on server:", err);
  }

  return (
    <Section className="bg-white dark:bg-gray-900" size="lg">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our Fleet of Rental Cars
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose from our wide selection of well-maintained vehicles. All cars come with unlimited kilometers and 24/7 roadside assistance.
          </p>
        </div>

        <Suspense fallback={<LoadingCars />}>
          <CarsGrid initialCars={initialCars} />
        </Suspense>
      </Container>
    </Section>
  );
}