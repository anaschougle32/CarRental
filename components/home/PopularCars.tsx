"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cars } from "@/data/cars";
import CarCard from "@/components/car/CarCard";
import { Button } from "@/components/ui/button";

const PopularCars = () => {
  // Get the first 4 cars to display
  const popularCars = cars.slice(0, 4);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
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