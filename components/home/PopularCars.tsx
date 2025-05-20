"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Loader2 } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import { Button } from "@/components/ui/button";
import { getCars, getBrands } from "@/lib/supabase";
import { Car } from "@/lib/types";

const PopularCars = () => {
  const [popularCars, setPopularCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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
            main_image: car.main_image || "/images/car-placeholder.jpg",
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
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Most Popular Cars
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our most-booked vehicles - perfectly maintained, fully insured, and ready for your Goan adventure.
            </p>
          </div>
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Most Popular Cars
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover our most-booked vehicles - perfectly maintained, fully insured, and ready for your Goan adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {popularCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/cars" className="inline-flex items-center gap-2">
              View All Cars <ChevronRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PopularCars;