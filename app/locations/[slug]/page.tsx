import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getCars, getBrands } from "@/lib/supabase";
import { Car as SupabaseCar } from "@/lib/supabase";
import { Car } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { MapPin } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import Head from "next/head";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const location = await getLocationBySlug(params.slug);
    
    if (!location) {
      return {
        title: "Location Not Found | ZoiCarRentals",
        description: "The requested car rental location could not be found. Browse our other locations for car rentals in Goa."
      };
    }
    
    // Create a more comprehensive SEO-friendly title and description
    const title = `Car Rental in ${location.name}, Goa | Best Rates & Service | ZoiCarRentals`;
    const description = `Find the best car rental deals in ${location.name}, Goa. ${location.headline} Book now for affordable rates, free delivery, and 24/7 roadside assistance. Explore Goa with our well-maintained vehicles.`;
    
    // Create a rich set of keywords specific to this location
    const keywords = [
      `car rental ${location.name}`,
      `rent a car ${location.name}`,
      `${location.name} car hire`,
      `cheap car rental ${location.name}`,
      `ZoiCarRentals ${location.name}`,
      `self drive cars ${location.name}`,
      `car rental service ${location.name} Goa`,
      `${location.name} airport pickup`,
      `luxury car rental ${location.name}`,
      `budget car rental ${location.name}`,
      `${location.name} car rental prices`,
      `best car rental in ${location.name}`
    ].join(', ');
    
    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://zoicarrentals.com/locations/${params.slug}`,
        siteName: 'ZoiCarRentals',
        locale: 'en_IN',
        type: 'website',
        images: [
          {
            url: '/images/locations/og-image.jpg',
            width: 1200,
            height: 630,
            alt: `Car Rental in ${location.name}, Goa`
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: `Car Rental in ${location.name} | ZoiCarRentals`,
        description: location.headline,
        images: [`/images/locations/${params.slug}.jpg`, '/images/locations/default.jpg'],
      },
      alternates: {
        canonical: `https://zoicarrentals.com/locations/${params.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Car Rental Locations in Goa | ZoiCarRentals",
      description: "Explore our car rental locations across Goa. Find the perfect vehicle for your trip with competitive rates and excellent service.",
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
    mileage: carData.mileage || undefined,
    category: carData.seats <= 5 
      ? carData.seats <= 4 ? "Hatchback" : "Sedan" 
      : carData.seats <= 7 ? "SUV" : "Premium"
  };
}

export default async function LocationPage({ params }: Props) {
  try {
    const location = await getLocationBySlug(params.slug);
    
    if (!location) {
      notFound();
    }
    
    // Fetch all cars instead of just cars for this location
    const carsData = await getCars();
    const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));
    
    return (
      <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
        {/* Breadcrumbs for SEO and navigation */}
        <nav className="text-sm mb-6" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
              <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </li>
            <li className="flex items-center">
              <a href="/locations" className="text-blue-600 hover:text-blue-800">Locations</a>
              <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </li>
            <li>
              <span className="text-gray-500" aria-current="page">{location.name}</span>
            </li>
          </ol>
        </nav>
        
        <div className="mb-10">
          <div className="flex items-center mb-2">
            <MapPin className="h-5 w-5 text-blue-600 mr-2" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Car Rental in {location.name}, Goa
            </h1>
          </div>
          
          {/* SEO-optimized subheading */}
          <div className="text-lg text-blue-600 font-medium mb-4">
            Best Car Rental Service in {location.name} | Affordable Rates | 24/7 Support
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">
            {location.headline}
          </h2>
          
          <div className="prose prose-blue max-w-none">
            {location.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-600">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Services Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Our Services in {location.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <h3 className="text-xl font-semibold ml-3">Airport Transfer</h3>
                </div>
                <p className="text-gray-600">Convenient airport pickup and drop-off services from {location.name} to Dabolim and Mopa airports.</p>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  <h3 className="text-xl font-semibold ml-3">Pick and Drop</h3>
                </div>
                <p className="text-gray-600">Flexible pick-up and drop-off services in {location.name} at your convenience.</p>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold ml-3">24/7 Availability</h3>
                </div>
                <p className="text-gray-600">Our services in {location.name} are available round the clock for your convenience.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Cars Available for Rent in {location.name}, Goa</h2>
          
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map(car => (
                <CarCard key={car.id} car={car} showCategory={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-500">No cars available at this location currently. Please check back soon or contact us for assistance.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Why Rent a Car in {location.name}, Goa?</h3>
          <p className="mb-4">
            Renting a car in {location.name} gives you the freedom to explore Goa at your own pace. 
            With ZoiCarRentals, you get competitive rates, well-maintained vehicles, and excellent customer service.
          </p>
          <p className="mb-4">
            Whether you need a car for business or leisure, our fleet has options for every budget and requirement. 
            Book your car rental in {location.name} today and enjoy a hassle-free experience.
          </p>
          <p>
            Our {location.name} car rental service includes free delivery, unlimited kilometers, and 24/7 roadside assistance 
            to ensure your Goa trip is comfortable and worry-free.
          </p>
        </div>
        
        {/* FAQ Section for SEO */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions about Car Rental in {location.name}</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg">What documents do I need to rent a car in {location.name}?</h4>
              <p className="mt-2 text-gray-600">To rent a car in {location.name}, you need a valid driving license, a government-issued ID proof, and a credit/debit card for security deposit.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg">Do you offer unlimited kilometers for car rentals in {location.name}?</h4>
              <p className="mt-2 text-gray-600">Yes, most of our car rental packages in {location.name} come with unlimited kilometers, allowing you to explore Goa without worrying about extra charges.</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-lg">Can I get a car delivered to my hotel in {location.name}?</h4>
              <p className="mt-2 text-gray-600">Absolutely! We offer free car delivery and pickup services to hotels, resorts, and other locations in {location.name} for your convenience.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error in location page:", error);
    throw error; // Let the error boundary handle this
  }
}
