import { Metadata } from "next";
import Link from "next/link";
import { getLocations } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Car Rental Locations in Goa | ZoiCarRentals",
  description: "Find our car rental services across Goa. We offer convenient pickup and drop locations in North Goa, South Goa, and major airports. Book your car rental today!",
  keywords: "car rental locations Goa, car hire Goa, rent a car Goa, Calangute car rental, Panjim car rental, Madgaon car rental, Mopa Airport car rental, Dabolim Airport car rental, North Goa car rental, South Goa car rental",
  openGraph: {
    title: "Car Rental Locations in Goa | ZoiCarRentals",
    description: "Find our car rental services across Goa. We offer convenient pickup and drop locations in North Goa, South Goa, and major airports.",
    url: "https://zoicarrentals.com/locations",
    siteName: "ZoiCarRentals",
    locale: "en_US",
    type: "website",
  },
};

export default async function LocationsPage() {
  // Fetch locations from the database
  const locations = await getLocations();
  
  // Debug: Log locations to server console
  console.log('Locations data:', JSON.stringify(locations));

  // Always show locations, even if none are found in the database
  // This ensures the page is never empty
  let displayLocations = [];
  
  // If we have locations from the database, use them
  if (locations && Array.isArray(locations) && locations.length > 0) {
    displayLocations = [...locations];
  } else {
    // Otherwise use default locations
    displayLocations = [
      {
        id: 'dummy-calangute',
        name: 'Calangute',
        slug: 'calangute',
        headline: 'Best car rental service in Calangute',
        content: 'Find the best car rental deals in Calangute, Goa.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: 'dummy-anjuna',
        name: 'Anjuna',
        slug: 'anjuna',
        headline: 'Premium Car Rental Service in Anjuna',
        content: 'Find the best car rental deals in Anjuna, Goa.',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
  }
  
  // Sort locations alphabetically
  displayLocations.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Car Rental Locations in Goa
        </h1>
        <div className="text-lg text-blue-600 font-medium mb-4">
          Find the Best Car Rental Services Across Goa | ZoiCarRentals
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover our convenient car rental locations throughout Goa. We offer pickup and drop services in North Goa, South Goa, and all major airports with flexible rental options to suit your travel needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <h2 className="text-xl font-bold">Car Rental in {location.name}</h2>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {location.headline}
              </p>
              <Link href={`/locations/${location.slug}`}>
                <Button variant="outline" className="w-full">
                  View Cars & Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-red-600">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                <h3 className="text-xl font-semibold ml-3">Airport Transfer</h3>
              </div>
              <p className="text-gray-600">Convenient and reliable airport pickup and drop-off services. Start your vacation the moment you land with our comfortable vehicles.</p>
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
              <p className="text-gray-600">Flexible pick-up and drop-off services at your convenience. We'll meet you at your hotel, resort, or any location of your choice.</p>
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
              <p className="text-gray-600">Our services are available round the clock. Whether it's an early morning flight or a late-night arrival, we've got you covered.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Why Choose ZoiCarRentals in Goa?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Convenient Locations</h3>
            <p className="text-gray-600">
              Our strategically located rental points across Goa make it easy to pick up and drop off your rental car. Whether you're arriving at Dabolim Airport, Mopa Airport, or staying in popular tourist areas like Calangute or Panjim, we've got you covered.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Flexible Rental Options</h3>
            <p className="text-gray-600">
              Choose from our wide range of vehicles, from economical hatchbacks to premium SUVs. Our flexible rental periods and competitive rates ensure you get the best value for your money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
