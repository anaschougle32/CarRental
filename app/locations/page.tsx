import { Metadata } from "next";
import Link from "next/link";
import { getLocations, Location } from "@/lib/supabase";
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
  // Default locations to use if database query fails
  const defaultLocations = [
    // North Goa Locations
    {
      id: 'default-calangute',
      name: 'Calangute',
      slug: 'calangute',
      headline: 'Premium Car Rental Service in Calangute, Goa',
      content: 'Find the best car rental deals in Calangute, Goa with ZoiCarRentals. We offer a wide range of vehicles from economy to luxury cars.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-anjuna',
      name: 'Anjuna',
      slug: 'anjuna',
      headline: 'Premium Car Rental Service in Anjuna, North Goa',
      content: 'Looking for a reliable car rental in Anjuna, Goa? ZoiCarRentals offers a wide range of vehicles to suit your needs.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-baga',
      name: 'Baga',
      slug: 'baga',
      headline: 'Affordable Car Rental Service in Baga Beach, Goa',
      content: 'Explore the vibrant Baga Beach area with a reliable car rental from ZoiCarRentals. Best rates guaranteed!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-candolim',
      name: 'Candolim',
      slug: 'candolim',
      headline: 'Luxury Car Rental Service in Candolim, North Goa',
      content: 'Experience the beautiful beaches of Candolim with a premium car rental from ZoiCarRentals. Wide selection of vehicles available.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-panjim',
      name: 'Panjim',
      slug: 'panjim',
      headline: 'Reliable Car Rental Service in Panjim, Goa\'s Capital',
      content: 'Explore Goa\'s charming capital city with a car rental from ZoiCarRentals in Panjim.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-vagator',
      name: 'Vagator',
      slug: 'vagator',
      headline: 'Self-Drive Car Rental in Vagator Beach, North Goa',
      content: 'Rent a car in Vagator and explore the beautiful beaches and nightlife at your own pace with ZoiCarRentals.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-morjim',
      name: 'Morjim',
      slug: 'morjim',
      headline: 'Car Rental Services in Morjim Beach, North Goa',
      content: 'Visit the turtle nesting beach of Morjim with a comfortable car rental from ZoiCarRentals. Best rates guaranteed!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-arambol',
      name: 'Arambol',
      slug: 'arambol',
      headline: 'Budget Car Rental in Arambol Beach, North Goa',
      content: 'Explore the hippie paradise of Arambol with an affordable car rental from ZoiCarRentals. Book now!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    
    // South Goa Locations
    {
      id: 'default-colva',
      name: 'Colva',
      slug: 'colva',
      headline: 'Premium Car Rental Service in Colva Beach, South Goa',
      content: 'Discover the serene beaches of Colva with a reliable car rental from ZoiCarRentals. Wide range of vehicles available.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-palolem',
      name: 'Palolem',
      slug: 'palolem',
      headline: 'Car Rental Services in Palolem Beach, South Goa',
      content: 'Explore the picturesque Palolem Beach with a comfortable car rental from ZoiCarRentals. Best rates guaranteed!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-benaulim',
      name: 'Benaulim',
      slug: 'benaulim',
      headline: 'Self-Drive Car Rental in Benaulim, South Goa',
      content: 'Rent a car in Benaulim and explore the beautiful beaches at your own pace with ZoiCarRentals.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-varca',
      name: 'Varca',
      slug: 'varca',
      headline: 'Luxury Car Rental in Varca Beach, South Goa',
      content: 'Experience the pristine beaches of Varca with a premium car rental from ZoiCarRentals. Wide selection available.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-margao',
      name: 'Margao',
      slug: 'margao',
      headline: 'Affordable Car Rental Service in Margao, South Goa',
      content: 'Explore the commercial hub of South Goa with a reliable car rental from ZoiCarRentals. Best rates guaranteed!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-agonda',
      name: 'Agonda',
      slug: 'agonda',
      headline: 'Car Rental Services in Agonda Beach, South Goa',
      content: 'Visit the secluded Agonda Beach with a comfortable car rental from ZoiCarRentals. Explore at your own pace!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    
    // Airports and Transportation Hubs
    {
      id: 'default-goa-airport',
      name: 'Goa Airport',
      slug: 'goa-airport',
      headline: 'Convenient Car Rental Service at Dabolim Airport (GOI)',
      content: 'Start your Goa adventure right from the airport with ZoiCarRentals at Goa Airport (Dabolim).',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-mopa-airport',
      name: 'Mopa Airport',
      slug: 'mopa-airport',
      headline: 'Car Rental at Manohar International Airport, North Goa',
      content: 'Rent a car directly from the new Mopa Airport with ZoiCarRentals. Seamless pickup and drop-off service available.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-madgaon-railway',
      name: 'Madgaon Railway Station',
      slug: 'madgaon-railway',
      headline: 'Car Rental Service at Madgaon Railway Station, Goa',
      content: 'Arriving by train? Pick up your rental car directly from Madgaon Railway Station with ZoiCarRentals.',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 'default-thivim-railway',
      name: 'Thivim Railway Station',
      slug: 'thivim-railway',
      headline: 'Car Rental at Thivim Railway Station, North Goa',
      content: 'Convenient car rental service at Thivim Railway Station with ZoiCarRentals. Book in advance for best rates!',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];
  
  // Fetch locations from the database
  let dbLocations: Location[] = [];
  try {
    dbLocations = await getLocations();
    console.log('Locations data from DB:', JSON.stringify(dbLocations));
  } catch (error) {
    console.error('Error fetching locations:', error);
  }
  
  // Determine which locations to display
  let displayLocations = [];
  
  // If we have locations from the database, use them
  if (dbLocations && Array.isArray(dbLocations) && dbLocations.length > 0) {
    displayLocations = [...dbLocations];
    console.log('Using database locations, count:', displayLocations.length);
  } else {
    // Otherwise use default locations
    displayLocations = defaultLocations;
    console.log('Using default locations, count:', displayLocations.length);
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
