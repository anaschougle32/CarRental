import { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import CarDetails from "@/components/car/CarDetails";
import CarFeatures from "@/components/car/CarFeatures";
import RelatedCars from "@/components/car/RelatedCars";
import BookingCTA from "@/components/car/BookingCTA";
import { Separator } from "@/components/ui/separator";
import { getCarBySlug, getCars, getBrands } from "@/lib/supabase";
import { Car as SupabaseCar } from "@/lib/supabase";
import { Car } from "@/lib/types";

// Dynamically import the client component
const CarGallery = dynamic(() => import("@/components/car/CarGallery"), { ssr: false });

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  try {
    const cars = await getCars();
    return cars.map((car) => ({
      slug: car.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const carData = await getCarBySlug(params.slug);
    
    if (!carData) {
      return {
        title: "Car Not Found",
      };
    }
    
    // Get brand info
    const brands = await getBrands();
    const brand = brands.find(b => b.id === carData.brand_id);
    const brandName = brand ? brand.name : "Unknown";
    
    return {
      title: `Rent ${brandName} ${carData.name} in Goa | Affordable Self Drive`,
      description: `Rent a ${brandName} ${carData.name} in Goa with unlimited kilometers starting at ₹${carData.price_per_day}/day. Book now!`,
      openGraph: {
        images: [carData.main_image],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Car Details",
      description: "View details about our car rental options",
    };
  }
}

// Helper function to convert Supabase car to our app's Car type
async function mapSupabaseCarToAppCar(carData: SupabaseCar): Promise<Car> {
  // Get brand info
  const brands = await getBrands();
  const brand = brands.find(b => b.id === carData.brand_id);
  const brandName = brand ? brand.name : "Unknown";
  
  return {
    id: carData.id,
    name: carData.name,
    brand: brandName,
    slug: carData.slug,
    price_per_day: carData.price_per_day,
    description: carData.description || "",
    features: (carData.features || []).map(feature => ({
      icon: "check",
      name: feature
    })),
    fuel_type: carData.fuel_type as any,
    transmission: carData.transmission as any,
    min_days: 1, // Default minimum days
    main_image: carData.main_image || "/images/car-placeholder.jpg",
    category: carData.seats <= 5 
      ? carData.seats <= 4 ? "Hatchback" : "Sedan" 
      : carData.seats <= 7 ? "SUV" : "Premium"
  };
}

export default async function CarPage({ params }: Props) {
  try {
    const carData = await getCarBySlug(params.slug);
    
    if (!carData) {
      notFound();
    }
    
    const car = await mapSupabaseCarToAppCar(carData);
    
    return (
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {car.brand} {car.name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Self Drive Rental in Goa
            </p>
            
            <CarGallery main_image={car.main_image} alt={`${car.brand} ${car.name}`} />
            
            <Separator className="my-8" />
            
            <CarDetails car={car} />
            
            <Separator className="my-8" />
            
            <CarFeatures features={car.features} />
          </div>
          
          <div className="lg:col-span-1">
            <BookingCTA car={car} />
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <RelatedCars currentSlug={car.slug} />
      </div>
    );
  } catch (error) {
    console.error("Error in car page:", error);
    throw error; // Let the error boundary handle this
  }
}