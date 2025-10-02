"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Car } from "@/lib/types";
import CarCard from "@/components/car/CarCard";
import { Loader2, AlertCircle } from "lucide-react";
import { getCars, getBrands } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CarsGrid = () => {
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Fetch all cars on component mount
  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch data from Supabase
        const carsData = await getCars();
        const brandsData = await getBrands();
        
        if (!carsData || carsData.length === 0) {
          setAllCars([]);
          setFilteredCars([]);
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
            brand_id: car.brand_id,
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
            mileage: car.mileage, // Add mileage field from database
            main_image: car.main_image || "/images/car-placeholder.jpg",
            category: car.seats <= 5 
              ? car.seats <= 4 ? "Hatchback" : "Sedan" 
              : car.seats <= 7 ? "SUV" : "Premium"
          } as unknown as Car;
        });
        
        setAllCars(enhancedCars);
        setFilteredCars(enhancedCars);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setError("Failed to load cars. Please try again later.");
        setAllCars([]);
        setFilteredCars([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, []);

  // Apply filters when search parameters change
  useEffect(() => {
    // Apply filters
    let filtered = [...allCars];
    
    if (!searchParams) {
      setFilteredCars(filtered);
      return;
    }
    
    // Get filter values from URL
    const category = searchParams.get("category");
    const fuelType = searchParams.get("fuel");
    const transmission = searchParams.get("transmission");
    const brand = searchParams.get("brand");
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");
    
    if (category && category !== "All") {
      filtered = filtered.filter(car => car.category === category);
    }
    
    if (fuelType && fuelType !== "All") {
      filtered = filtered.filter(car => car.fuel_type === fuelType);
    }
    
    if (transmission && transmission !== "All") {
      filtered = filtered.filter(car => car.transmission === transmission);
    }

    if (brand && brand !== "All") {
      filtered = filtered.filter(car => car.brand === brand);
    }
    
    if (minPrice) {
      filtered = filtered.filter(car => car.price_per_day >= parseInt(minPrice));
    }
    
    if (maxPrice) {
      filtered = filtered.filter(car => car.price_per_day <= parseInt(maxPrice));
    }
    
    setFilteredCars(filtered);
  }, [searchParams, allCars]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (filteredCars.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-semibold mb-2">No Cars Found</h3>
        <p className="text-gray-600">Please try adjusting your filters to find cars that match your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {filteredCars.map(car => (
        <CarCard key={car.id} car={car} showCategory={true} />
      ))}
    </div>
  );
};

export default CarsGrid;