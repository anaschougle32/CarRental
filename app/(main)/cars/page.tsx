import { Metadata } from "next";
import CarsGrid from "@/components/car/CarsGrid";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Container, Section } from "@/components/common/LayoutComponents";

export const metadata: Metadata = {
  title: "Available Self Drive Cars in Goa – Book Online | ZioCarRentals",
  description: "Browse our fleet of well-maintained self-drive cars in Goa. From compact hatchbacks to premium SUVs, find the perfect car with unlimited km and 24/7 support.",
  keywords: "car rental Goa, self drive cars, rent car Goa, SUV rental, budget cars Goa",
  alternates: {
    canonical: "https://www.ziocarrentals.com/cars",
  },
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
import { getCarImageUrl } from "@/lib/car-images";

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
        main_image: getCarImageUrl(car),
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

        {/* SEO Category Content from Content Specification */}
        <div className="mt-16 pt-12 border-t border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">
            Choose the Right Car for Your Goa Trip
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Hatchback Cars</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                Compact, fuel-efficient, and easy to drive, hatchbacks are ideal for solo travellers, couples, and short city trips. They are perfect for navigating Goa's narrow roads while offering excellent mileage and affordable rental rates.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Sedan Cars</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                If you're looking for extra comfort and luggage space, our sedan cars are an excellent choice. They are perfect for business travellers, couples, and families planning longer drives across North Goa and South Goa.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">SUV Cars</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                Travel comfortably with family or friends by choosing one of our spacious SUVs. These vehicles provide ample seating, generous luggage capacity, and a smooth driving experience for beach hopping, sightseeing, and outstation trips.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/60 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Premium & Luxury Cars</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                Make your Goa vacation even more memorable with our premium and luxury car collection. These vehicles offer advanced features, superior comfort, and stylish interiors, making them perfect for special occasions, corporate travel, and premium holiday experiences.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}