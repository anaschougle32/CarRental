import { Metadata } from "next";
import { notFound } from "next/navigation";
import CarDetails from "@/components/car/CarDetails";
import CarFeatures from "@/components/car/CarFeatures";
import RelatedCars from "@/components/car/RelatedCars";
import BookingCTA from "@/components/car/BookingCTA";
import CarGalleryWrapper from "@/components/car/CarGalleryWrapper";
import { Separator } from "@/components/ui/separator";
import { getCarBySlug, getCars, getBrands } from "@/lib/supabase";
import { Car as SupabaseCar } from "@/lib/supabase";
import { Car } from "@/lib/types";

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  // Return empty array to disable static generation for car pages
  // This ensures all car pages are generated dynamically at request time
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const carData = await getCarBySlug(slug);
    
    if (!carData) {
      return {
        title: "Car Not Found | ZoiCarRentals Goa",
        description: "The requested car model is currently unavailable. Browse our other car rental options in Goa with unlimited kilometers and 24/7 support."
      };
    }
    
    // Get brand info
    const brands = await getBrands();
    const brand = brands.find(b => b.id === carData.brand_id);
    const brandName = brand ? brand.name : "Unknown";
    
    // Get car category for keywords
    const category = carData.seats <= 5 
      ? carData.seats <= 4 ? "Hatchback" : "Sedan" 
      : carData.seats <= 7 ? "SUV" : "Premium";
    
    // Ensure we have a valid image URL for OpenGraph
    const imageUrl = carData.main_image || '/images/cars/car-placeholder.jpg';
    
    // Create SEO-optimized title and description
    const title = `Rent ${brandName} ${carData.name} in Goa | ₹${carData.price_per_day}/day | ZoiCarRentals`;
    const description = `Rent a ${brandName} ${carData.name} in Goa with unlimited kilometers starting at ₹${carData.price_per_day}/day. ${category} with ${carData.fuel_type} fuel and ${carData.transmission} transmission. Free delivery across Goa. Book now!`;
    
    // Create comprehensive keywords
    const keywords = [
      `rent ${brandName} ${carData.name} Goa`,
      `${brandName} ${carData.name} car rental`,
      `${category} car rental Goa`,
      `${carData.fuel_type} car rental`,
      `${carData.transmission} car rental Goa`,
      `self drive ${brandName} Goa`,
      `cheap ${category} rental Goa`,
      `ZoiCarRentals ${brandName}`,
      `${brandName} car hire Goa`,
      `rent ${category} Goa`,
      `best car rental deals Goa`,
      `${brandName} ${carData.name} price per day`
    ].join(', ');
    
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://zoicarrentals.com/cars/${slug}`,
        siteName: 'ZoiCarRentals',
        locale: 'en_IN',
        type: 'website',
        images: [{
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${brandName} ${carData.name} Car Rental in Goa`
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Rent ${brandName} ${carData.name} in Goa | ZoiCarRentals`,
        description: `${category} with ${carData.fuel_type} fuel and ${carData.transmission} transmission. Book now from ₹${carData.price_per_day}/day!`,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://zoicarrentals.com/cars/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Car Rental Options in Goa | ZoiCarRentals",
      description: "Explore our wide range of car rental options in Goa. From economy hatchbacks to premium SUVs, find the perfect vehicle for your Goa trip.",
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
    main_image: carData.main_image || "/images/cars/car-placeholder.jpg",
    mileage: carData.mileage || undefined,
    category: carData.seats <= 5 
      ? carData.seats <= 4 ? "Hatchback" : "Sedan" 
      : carData.seats <= 7 ? "SUV" : "Premium"
  };
}

export default async function CarPage({ params }: Props) {
  try {
    const { slug } = await params;
    const carData = await getCarBySlug(slug);
    
    if (!carData) {
      notFound();
    }
    
    const car = await mapSupabaseCarToAppCar(carData);
    
    return (
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {car.brand} {car.name} Car Rental in Goa
            </h1>
            <p className="text-lg text-blue-600 font-medium mb-4">
              Self Drive {car.category} | {car.fuel_type} | {car.transmission} | ₹{car.price_per_day}/day
            </p>
            
            <CarGalleryWrapper main_image={car.main_image || "/images/cars/car-placeholder.jpg"} alt={`${car.brand} ${car.name} Car Rental in Goa`} />
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About {car.brand} {car.name}</h2>
              <p className="text-gray-700 mb-4">
                The {car.brand} {car.name} is a {car.category.toLowerCase()} car perfect for exploring Goa's beautiful beaches and scenic roads. 
                With its {car.fuel_type.toLowerCase()} engine and {car.transmission.toLowerCase()} transmission, this vehicle offers {car.transmission === 'Automatic' ? 'effortless driving' : 'complete control'} and excellent fuel efficiency.
              </p>
              <p className="text-gray-700">
                Rent the {car.brand} {car.name} from ZoiCarRentals for a comfortable and reliable driving experience in Goa. 
                Our rental includes unlimited kilometers, 24/7 roadside assistance, and free delivery to your location.
              </p>
            </div>
            
            <CarDetails car={car} />
            
            <Separator className="my-8" />
            
            <CarFeatures features={car.features} />
            
            {/* FAQ Section for SEO */}
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg">What documents do I need to rent the {car.brand} {car.name}?</h3>
                  <p className="mt-2 text-gray-600">To rent this car, you need a valid driving license, a government-issued ID proof, and a credit/debit card for security deposit.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg">Is there a kilometer limit for the {car.brand} {car.name}?</h3>
                  <p className="mt-2 text-gray-600">No, we offer unlimited kilometers with all our car rentals, including the {car.brand} {car.name}.</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-lg">Can I get the {car.brand} {car.name} delivered to my hotel?</h3>
                  <p className="mt-2 text-gray-600">Yes, we offer free delivery and pickup services to hotels, resorts, and other locations across Goa.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <BookingCTA car={car} />
            
            {/* Location Availability Section */}
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Available in These Locations</h3>
              <ul className="space-y-1">
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <a href="/locations/calangute" className="text-blue-600 hover:underline">Calangute</a>
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <a href="/locations/anjuna" className="text-blue-600 hover:underline">Anjuna</a>
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <a href="/locations/panjim" className="text-blue-600 hover:underline">Panjim</a>
                </li>
                <li className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <a href="/locations/goa-airport" className="text-blue-600 hover:underline">Goa Airport</a>
                </li>
              </ul>
            </div>
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