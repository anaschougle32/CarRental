"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import { Button } from "@/components/ui/button";
import { getCars, getBrands } from "@/lib/supabase";
import { Car } from "@/lib/types";
import { getCarImageUrl } from "@/lib/car-images";

import { Section, Container } from "../common/LayoutComponents";

interface PopularCarsProps {
  initialCars?: Car[];
}

const PopularCars = ({ initialCars = [] }: PopularCarsProps) => {
  const [popularCars, setPopularCars] = useState<Car[]>(initialCars);
  const [loading, setLoading] = useState(initialCars.length === 0);
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before making API calls
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    // If we already have server-rendered / ISR cars, do NOT make a client-side Supabase request
    if (!mounted || initialCars.length > 0) return;
    
    const fetchCars = async () => {
      try {
        setLoading(true);
        
        // Fetch data from Supabase
        const carsData = await getCars();
        const brandsData = await getBrands();
        
        if (!carsData || carsData.length === 0) {
          setPopularCars([]);
          setLoading(false);
          return;
        }
        
        // Combine car data with brand names for display
        const enhancedCars = carsData.map(car => {
          const brand = brandsData.find(b => b.id === car.brand_id);
          const brandName = brand ? brand.name : "Unknown";
          
          return {
            id: car.id,
            name: car.name,
            brand: brandName,
            slug: car.slug,
            price_per_day: car.price_per_day,
            description: car.description || `Experience the comfort of ${car.name} for your Goa trip.`,
            features: (car.features || []).map(feature => ({
              icon: "check",
              name: feature
            })),
            fuel_type: car.fuel_type as any,
            transmission: car.transmission as any,
            min_days: 1,
            main_image: getCarImageUrl(car),
            category: car.seats <= 5 
              ? car.seats <= 4 ? "Hatchback" : "Sedan" 
              : car.seats <= 7 ? "SUV" : "Premium"
          } as unknown as Car;
        });
        
        // Get the first 8 cars to display
        setPopularCars(enhancedCars.slice(0, 8));
      } catch (error) {
        console.error("Error fetching cars:", error);
        setPopularCars([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, [mounted]);

  if (loading) {
    return (
      <Section className="bg-white dark:bg-gray-900">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Best Self Drive Car Rental in India
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              Looking for a trusted Self Drive Car Rental in India? Whether you're planning a family vacation, business trip, weekend getaway, road trip, or daily commute, our self-drive car rental service offers the perfect combination of comfort, convenience, and affordability.
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              Find the Perfect Car on Rent in India
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We provide a wide range of rental vehicles across India, including hatchbacks, sedans, SUVs, MUVs, automatic cars, and luxury vehicles. Our cars are regularly serviced, professionally cleaned, and thoroughly inspected to ensure a safe, reliable, and enjoyable driving experience.
            </p>
          </div>
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-white dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Best Self Drive Car Rental in India
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
            Looking for a trusted Self Drive Car Rental in India? Whether you're planning a family vacation, business trip, weekend getaway, road trip, or daily commute, our self-drive car rental service offers the perfect combination of comfort, convenience, and affordability.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white">
            Find the Perfect Car on Rent in India
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We provide a wide range of rental vehicles across India, including hatchbacks, sedans, SUVs, MUVs, automatic cars, and luxury vehicles. Our cars are regularly serviced, professionally cleaned, and thoroughly inspected to ensure a safe, reliable, and enjoyable driving experience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {popularCars.map((car) => (
            <div key={car.id} className="w-full min-[375px]:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.67rem)] lg:w-[calc(25%-0.75rem)] max-w-sm flex-grow-0 flex-shrink-0">
              <CarCard car={car} showCategory={true} />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/cars" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2">
            View All Cars <ChevronRight size={16} />
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default PopularCars;