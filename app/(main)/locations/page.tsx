import { Metadata } from "next";
import { getLocations, Location as LocationType } from "@/lib/supabase";
import LocationsPageContent from "@/components/pages/LocationsPageContent";

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
  let dbLocations: LocationType[] = [];
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

  return <LocationsPageContent initialLocations={displayLocations} />;
}
