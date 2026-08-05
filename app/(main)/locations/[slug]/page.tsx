import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getCars, getBrands } from "@/lib/supabase";
import { Car as SupabaseCar } from "@/lib/supabase";
import { Car } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Check, Shield, Clock, MapPin, Car as CarIcon, BadgeDollarSign } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import BookingForm from "@/components/common/BookingForm";
import { Container, Section } from "@/components/common/LayoutComponents";
import Hero, { HeroStructuredData } from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Services from "@/components/home/Services";
import PopularCars from "@/components/home/PopularCars";
import Faqs from "@/components/home/Faqs";
import HowItWorks from "@/components/home/HowItWorks";
import { locationsData } from "@/lib/location-data";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;

    const configData = locationsData[slug];
    if (configData) {
      return {
        title: configData.metaTitle,
        description: configData.metaDescription,
        alternates: {
          canonical: configData.canonicalUrl,
        },
        openGraph: {
          title: configData.metaTitle,
          description: configData.metaDescription,
          url: configData.canonicalUrl,
          siteName: 'ZioCarRentals',
          locale: 'en_IN',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: configData.metaTitle,
          description: configData.metaDescription,
        },
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      };
    }

    // ── Special-case: high-priority Google Ads landing page ──
    if (slug === 'self-drive-car-rental-in-goa') {
      return {
        title: 'Best Self Drive Car Rental in Goa | Car Hire From ₹999',
        description:
          'Book self-drive cars in Goa for 2 days, weekly, or monthly rentals. Wide range of vehicles, competitive pricing, easy booking, and 24/7 customer support.',
        keywords:
          'self drive car rental in goa, self drive cars goa, car hire goa, rent a car goa, affordable car rental goa, goa car rental from 999, weekly car rental goa, monthly car rental goa',
        openGraph: {
          title: 'Best Self Drive Car Rental in Goa | Affordable Car Hire From ₹999',
          description:
            'Book self-drive cars in Goa for 2 days, weekly, or monthly rentals. Wide range of vehicles, competitive pricing, easy booking, and 24/7 customer support.',
          url: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-in-goa',
          siteName: 'ZioCarRentals',
          locale: 'en_IN',
          type: 'website',
          images: [{ url: '/images/locations/og-image.jpg', width: 1200, height: 630, alt: 'Self Drive Car Rental in Goa' }],
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Best Self Drive Car Rental in Goa | From ₹999/day | ZioCarRentals',
          description: 'Book self-drive cars in Goa for 2 days, weekly, or monthly rentals. Easy booking & 24/7 support.',
          images: ['/images/locations/og-image.jpg'],
        },
        alternates: {
          canonical: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-in-goa',
        },
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      };
    }

    // ── Special-case: Madgaon Landing Page ──
    if (slug === 'self-drive-car-rental-madgaon') {
      return {
        title: 'Best Self Drive Car Rental in Madgaon Railway Station | From ₹999',
        description: 'Hire a self-drive car at Madgaon Railway Station from ₹999/day. Explore Goa with affordable rates, multiple car options, easy booking, and hassle-free service.',
        keywords: 'self drive car rental madgaon, car rental madgaon railway station, rent a car margao, car hire madgaon, self drive cars margao goa',
        openGraph: {
          title: 'Best Self Drive Car Rental in Madgaon Railway Station | From ₹999',
          description: 'Hire a self-drive car at Madgaon Railway Station from ₹999/day. Explore Goa with affordable rates, multiple car options, easy booking, and hassle-free service.',
          url: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-madgaon',
          siteName: 'ZioCarRentals',
          locale: 'en_IN',
          type: 'website',
          images: [{ url: '/images/locations/og-image.jpg', width: 1200, height: 630, alt: 'Self Drive Car Rental Madgaon' }],
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Best Self Drive Car Rental in Madgaon Railway Station | From ₹999',
          description: 'Hire a self-drive car at Madgaon Railway Station from ₹999/day. Easy booking & 24/7 support.',
          images: ['/images/locations/og-image.jpg'],
        },
        alternates: {
          canonical: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-madgaon',
        },
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      };
    }

    // ── Special-case: Goa Airport Landing Page ──
    if (slug === 'self-drive-car-rental-goa-airport' || slug === 'goa-airport') {
      return {
        title: 'Self Drive Car Rental at Goa Airport | Hire from Dabolim & Mopa Airport',
        description: 'Book the best self drive car rental at Goa Airport. Pick up your car from Dabolim Airport (GOI) or Manohar International Airport (GOX). Affordable hatchbacks, sedans, SUVs, luxury cars, easy booking, airport pickup, and 24/7 customer support.',
        keywords: 'self drive car rental goa airport, car rental dabolim airport, car rental mopa airport, rent a car goa airport, airport car hire goa',
        openGraph: {
          title: 'Self Drive Car Rental at Goa Airport | Hire from Dabolim & Mopa Airport',
          description: 'Book the best self drive car rental at Goa Airport. Pick up your car from Dabolim Airport (GOI) or Manohar International Airport (GOX). Affordable hatchbacks, sedans, SUVs, luxury cars, easy booking, airport pickup, and 24/7 customer support.',
          url: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-goa-airport',
          siteName: 'ZioCarRentals',
          locale: 'en_IN',
          type: 'website',
          images: [{ url: '/images/locations/og-image.jpg', width: 1200, height: 630, alt: 'Self Drive Car Rental Goa Airport' }],
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Self Drive Car Rental at Goa Airport | Hire from Dabolim & Mopa Airport',
          description: 'Book the best self drive car rental at Goa Airport. Pick up your car from Dabolim Airport (GOI) or Mopa Airport (GOX). Easy booking & 24/7 support.',
          images: ['/images/locations/og-image.jpg'],
        },
        alternates: {
          canonical: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-goa-airport',
        },
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      };
    }

    // ── Special-case: Calangute Landing Page ──
    if (slug === 'self-drive-car-rental-calangute' || slug === 'calangute') {
      return {
        title: 'Self Drive Car Rental in Calangute | Car Hire Near Calangute Beach',
        description: 'Looking for the best self drive car rental in Calangute, Goa? Rent hatchbacks, sedans, SUVs, and luxury cars at affordable prices. Easy booking, sanitized vehicles, and 24/7 customer support near Calangute Beach.',
        keywords: 'self drive car rental calangute, car hire near calangute beach, rent a car calangute, calangute car rental goa',
        openGraph: {
          title: 'Self Drive Car Rental in Calangute | Car Hire Near Calangute Beach',
          description: 'Looking for the best self drive car rental in Calangute, Goa? Rent hatchbacks, sedans, SUVs, and luxury cars at affordable prices. Easy booking, sanitized vehicles, and 24/7 customer support near Calangute Beach.',
          url: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-calangute',
          siteName: 'ZioCarRentals',
          locale: 'en_IN',
          type: 'website',
          images: [{ url: '/images/locations/og-image.jpg', width: 1200, height: 630, alt: 'Self Drive Car Rental Calangute' }],
        },
        twitter: {
          card: 'summary_large_image',
          title: 'Self Drive Car Rental in Calangute | Car Hire Near Calangute Beach',
          description: 'Looking for the best self drive car rental in Calangute, Goa? Rent hatchbacks, sedans, SUVs, and luxury cars at affordable prices.',
          images: ['/images/locations/og-image.jpg'],
        },
        alternates: {
          canonical: 'https://www.ziocarrentals.com/locations/self-drive-car-rental-calangute',
        },
        robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
      };
    }

    const location = await getLocationBySlug(slug);
    
    if (!location) {
      return {
        title: "Location Not Found | ZioCarRentals",
        description: "The requested car rental location could not be found. Browse our other locations for car rentals in Goa."
      };
    }
    
    const title = `Car Rental in ${location.name}, Goa | Best Rates & Service | ZioCarRentals`;
    const description = `Find the best car rental deals in ${location.name}, Goa. ${location.headline} Book now for affordable rates, free delivery, and 24/7 roadside assistance. Explore Goa with our well-maintained vehicles.`;
    
    const keywords = [
      `car rental ${location.name}`,
      `rent a car ${location.name}`,
      `${location.name} car hire`,
      `cheap car rental ${location.name}`,
      `ZioCarRentals ${location.name}`,
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
        url: `https://www.ziocarrentals.com/locations/${slug}`,
        siteName: 'ZioCarRentals',
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
        title: `Car Rental in ${location.name} | ZioCarRentals`,
        description: location.headline,
        images: [`/images/locations/${slug}.jpg`, '/images/locations/default.jpg'],
      },
      alternates: {
        canonical: `https://www.ziocarrentals.com/locations/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Car Rental Locations in Goa | ZioCarRentals",
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
    main_image: carData.main_image || "/images/cars/car-placeholder.jpg",
    mileage: carData.mileage || undefined,
    category: carData.seats <= 5 
      ? carData.seats <= 4 ? "Hatchback" : "Sedan" 
      : carData.seats <= 7 ? "SUV" : "Premium"
  };
}

export default async function LocationPage({ params }: Props) {
  try {
    const { slug } = await params;

    const config = locationsData[slug];
    if (config) {
      const carsData = await getCars();
      const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));

      return (
        <>
          <HeroStructuredData />
          
          {/* 1. Hero Section (Contains Banner Booking Form) */}
          <Hero 
            title={config.h1.includes(',') ? config.h1.split(',')[0] + ',' : config.h1}
            titleAccent={config.h1.includes(',') ? config.h1.split(',')[1] : ''}
            subtitle={config.p1}
          />

          {/* 4. Car Listing (No Description in Car Listing, No Price) */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {config.h2}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  {config.p2}
                </p>
              </div>

              {cars.length > 0 ? (
                <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cars.map(car => (
                    <CarCard key={car.id} car={car} showCategory={true} showDescription={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-lg">
                  <p className="text-lg text-gray-500">No cars available currently. Please check back soon or contact us for assistance.</p>
                </div>
              )}
            </Container>
          </Section>

          {/* 5. Services */}
          <Services />

          {/* 6. Why Choose Us */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {config.whyChooseHeading}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.whyChooseItems.map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit">
                      <Shield className="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 7. How It Works */}
          <HowItWorks />

          {/* 8. FAQs */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
              </div>
              <div className="max-w-4xl mx-auto space-y-4">
                {config.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        </>
      );
    }

    // Attempt to get location from database
    let location = await getLocationBySlug(slug);
    
    // If location not found in database, use a default location
    if (!location) {
      console.log(`Location not found for slug: ${slug}, using fallback`);
      
      // Create a fallback location based on the slug
      const fallbackLocations = {
        // North Goa Locations
        'calangute': {
          id: 'default-calangute',
          name: 'Calangute',
          slug: 'calangute',
          headline: 'Premium Car Rental Service in Calangute, Goa',
          content: 'Find the best car rental deals in Calangute, Goa with ZioCarRentals. We offer a wide range of vehicles from economy to luxury cars. Calangute is the largest beach in North Goa and one of the most popular tourist destinations. With our car rental service, you can easily explore nearby attractions like Baga Beach, Fort Aguada, and Anjuna Flea Market. Our fleet includes economy cars, SUVs, and luxury vehicles to suit every budget and requirement. All our cars are well-maintained and come with 24/7 roadside assistance for a worry-free experience.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'anjuna': {
          id: 'default-anjuna',
          name: 'Anjuna',
          slug: 'anjuna',
          headline: 'Premium Car Rental Service in Anjuna, North Goa',
          content: 'Looking for a reliable car rental in Anjuna, Goa? ZioCarRentals offers a wide range of vehicles to suit your needs. Anjuna is famous for its trance parties, flea market, and beautiful beaches. With our car rental service, you can easily explore the vibrant nightlife, visit the famous Wednesday Flea Market, or drive to nearby beaches like Vagator and Baga. We offer competitive rates, flexible rental periods, and well-maintained vehicles to ensure a comfortable and enjoyable journey throughout your stay in Anjuna.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'baga': {
          id: 'default-baga',
          name: 'Baga',
          slug: 'baga',
          headline: 'Affordable Car Rental Service in Baga Beach, Goa',
          content: 'Explore the vibrant Baga Beach area with a reliable car rental from ZioCarRentals. Best rates guaranteed! Baga is one of the most popular beaches in North Goa, known for its nightlife, water sports, and shopping. With our car rental service, you can easily visit nearby attractions like Calangute Beach, Anjuna Beach, and the Saturday Night Market. We offer a wide range of vehicles from compact cars to SUVs, all at competitive prices with unlimited kilometers.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'candolim': {
          id: 'default-candolim',
          name: 'Candolim',
          slug: 'candolim',
          headline: 'Luxury Car Rental Service in Candolim, North Goa',
          content: 'Experience the beautiful beaches of Candolim with a premium car rental from ZioCarRentals. Wide selection of vehicles available. Candolim is a serene beach destination in North Goa, perfect for those seeking a more relaxed atmosphere. With our car rental service, you can easily explore nearby attractions like Fort Aguada, Sinquerim Beach, and the shipwreck of the MV River Princess. We offer luxury vehicles with professional drivers or self-drive options to make your Goa vacation truly memorable.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'panjim': {
          id: 'default-panjim',
          name: 'Panjim',
          slug: 'panjim',
          headline: 'Reliable Car Rental Service in Panjim, Goa\'s Capital',
          content: 'Explore Goa\'s charming capital city with a car rental from ZioCarRentals in Panjim. Panjim (Panaji) is the capital of Goa, known for its Portuguese architecture, beautiful churches, and vibrant cultural scene. With our car rental service, you can easily explore the Latin Quarter of Fontainhas, visit the iconic Our Lady of the Immaculate Conception Church, or take a cruise on the Mandovi River. We offer a wide range of vehicles from compact cars to premium sedans, all at competitive rates with excellent customer service.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'vagator': {
          id: 'default-vagator',
          name: 'Vagator',
          slug: 'vagator',
          headline: 'Self-Drive Car Rental in Vagator Beach, North Goa',
          content: 'Rent a car in Vagator and explore the beautiful beaches and nightlife at your own pace with ZioCarRentals. Vagator is known for its scenic cliffs, beautiful beaches, and vibrant nightlife. With our car rental service, you can easily visit the famous Chapora Fort, enjoy the sunset at Little Vagator Beach, or party at one of the many beach clubs. We offer reliable self-drive cars with unlimited kilometers and 24/7 roadside assistance for a worry-free experience.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'morjim': {
          id: 'default-morjim',
          name: 'Morjim',
          slug: 'morjim',
          headline: 'Car Rental Services in Morjim Beach, North Goa',
          content: 'Visit the turtle nesting beach of Morjim with a comfortable car rental from ZioCarRentals. Best rates guaranteed! Morjim is known as "Little Russia" due to its popularity among Russian tourists and is famous for being a nesting site for Olive Ridley turtles. With our car rental service, you can explore the serene beaches, enjoy water sports, or visit nearby attractions like Chapora Fort and Ashwem Beach. We offer a wide range of vehicles to suit your needs and budget.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'arambol': {
          id: 'default-arambol',
          name: 'Arambol',
          slug: 'arambol',
          headline: 'Budget Car Rental in Arambol Beach, North Goa',
          content: 'Explore the hippie paradise of Arambol with an affordable car rental from ZioCarRentals. Book now! Arambol is known for its bohemian vibe, drum circles, and alternative lifestyle. With our car rental service, you can easily explore the Sweet Water Lake, visit the nearby Keri Beach, or drive to the Teracol Fort. We offer budget-friendly car rentals with excellent customer service and well-maintained vehicles for a comfortable journey.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        
        // South Goa Locations
        'colva': {
          id: 'default-colva',
          name: 'Colva',
          slug: 'colva',
          headline: 'Premium Car Rental Service in Colva Beach, South Goa',
          content: 'Discover the serene beaches of Colva with a reliable car rental from ZioCarRentals. Wide range of vehicles available. Colva is one of the largest and most popular beaches in South Goa, known for its white sand and clear waters. With our car rental service, you can easily explore nearby attractions like Benaulim Beach, Margao city, and the Ancestral Goa Museum. We offer premium vehicles with professional drivers or self-drive options to make your South Goa exploration comfortable and convenient.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'palolem': {
          id: 'default-palolem',
          name: 'Palolem',
          slug: 'palolem',
          headline: 'Car Rental Services in Palolem Beach, South Goa',
          content: 'Explore the picturesque Palolem Beach with a comfortable car rental from ZioCarRentals. Best rates guaranteed! Palolem is often called "Paradise Beach" and is known for its crescent-shaped bay and calm waters. With our car rental service, you can easily visit nearby attractions like Butterfly Beach, Agonda Beach, and Cotigao Wildlife Sanctuary. We offer a wide range of vehicles from compact cars to SUVs, all at competitive prices with unlimited kilometers.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'benaulim': {
          id: 'default-benaulim',
          name: 'Benaulim',
          slug: 'benaulim',
          headline: 'Self-Drive Car Rental in Benaulim, South Goa',
          content: 'Rent a car in Benaulim and explore the beautiful beaches at your own pace with ZioCarRentals. Benaulim is a tranquil fishing village in South Goa, known for its clean beaches and authentic Goan culture. With our car rental service, you can easily explore nearby attractions like Colva Beach, Varca Beach, and the Church of St. John the Baptist. We offer reliable self-drive cars with unlimited kilometers and 24/7 roadside assistance for a worry-free experience.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'varca': {
          id: 'default-varca',
          name: 'Varca',
          slug: 'varca',
          headline: 'Luxury Car Rental in Varca Beach, South Goa',
          content: 'Experience the pristine beaches of Varca with a premium car rental from ZioCarRentals. Wide selection available. Varca is known for its pristine white sandy beaches, luxury resorts, and dolphin spotting opportunities. With our car rental service, you can easily explore nearby attractions like Cavelossim Beach, Mobor Beach, and the Zeebop by the Sea restaurant. We offer luxury vehicles with professional drivers or self-drive options to make your South Goa vacation truly memorable.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'margao': {
          id: 'default-margao',
          name: 'Margao',
          slug: 'margao',
          headline: 'Affordable Car Rental Service in Margao, South Goa',
          content: 'Explore the commercial hub of South Goa with a reliable car rental from ZioCarRentals. Best rates guaranteed! Margao is the commercial capital of Goa, known for its markets, churches, and cultural heritage. With our car rental service, you can easily visit the Municipal Garden, the Holy Spirit Church, or drive to nearby beaches like Colva and Benaulim. We offer budget-friendly car rentals with excellent customer service and well-maintained vehicles for a comfortable journey.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'agonda': {
          id: 'default-agonda',
          name: 'Agonda',
          slug: 'agonda',
          headline: 'Car Rental Services in Agonda Beach, South Goa',
          content: 'Visit the secluded Agonda Beach with a comfortable car rental from ZioCarRentals. Explore at your own pace! Agonda is a serene and less crowded beach in South Goa, perfect for those seeking peace and tranquility. With our car rental service, you can easily explore nearby attractions like Palolem Beach, Butterfly Beach, and the Cola Beach. We offer a wide range of vehicles from compact cars to SUVs, all at competitive prices with unlimited kilometers.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        
        // Airports and Transportation Hubs
        'goa-airport': {
          id: 'default-goa-airport',
          name: 'Goa Airport',
          slug: 'goa-airport',
          headline: 'Convenient Car Rental Service at Dabolim Airport (GOI)',
          content: 'Start your Goa adventure right from the airport with ZioCarRentals at Goa Airport (Dabolim). We offer convenient pickup and drop-off services at Dabolim Airport, allowing you to begin your Goa exploration as soon as you land. Our fleet includes economy cars, SUVs, and luxury vehicles to suit every budget and requirement. All our cars are well-maintained and come with 24/7 roadside assistance for a worry-free experience. Pre-book your car rental to avoid last-minute hassles and enjoy special airport pickup discounts.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'mopa-airport': {
          id: 'default-mopa-airport',
          name: 'Mopa Airport',
          slug: 'mopa-airport',
          headline: 'Car Rental at Manohar International Airport, North Goa',
          content: 'Rent a car directly from the new Mopa Airport with ZioCarRentals. Seamless pickup and drop-off service available. The Manohar International Airport (Mopa) is the newest airport in Goa, serving North Goa destinations. With our car rental service, you can easily begin your journey to popular North Goa beaches like Arambol, Morjim, and Vagator. We offer a wide range of vehicles from compact cars to premium sedans, all at competitive rates with excellent customer service.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'madgaon-railway': {
          id: 'default-madgaon-railway',
          name: 'Madgaon Railway Station',
          slug: 'madgaon-railway',
          headline: 'Car Rental Service at Madgaon Railway Station, Goa',
          content: 'Arriving by train? Pick up your rental car directly from Madgaon Railway Station with ZioCarRentals. Madgaon Railway Station is the main railway station in South Goa, connecting to major cities across India. With our car rental service, you can easily begin your journey to popular South Goa beaches like Colva, Palolem, and Benaulim. We offer convenient pickup and drop-off services at the station, allowing you to start your Goa exploration as soon as you arrive.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        'thivim-railway': {
          id: 'default-thivim-railway',
          name: 'Thivim Railway Station',
          slug: 'thivim-railway',
          headline: 'Car Rental at Thivim Railway Station, North Goa',
          content: 'Convenient car rental service at Thivim Railway Station with ZioCarRentals. Book in advance for best rates! Thivim Railway Station is the main railway station serving North Goa, connecting to major cities across India. With our car rental service, you can easily begin your journey to popular North Goa destinations like Calangute, Baga, and Anjuna. We offer a wide range of vehicles from compact cars to SUVs, all at competitive prices with unlimited kilometers.',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };
      
      // Use the fallback location if it exists, otherwise create a generic one
      location = fallbackLocations[slug as keyof typeof fallbackLocations] || {
        id: `default-${slug}`,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
        slug: slug,
        headline: `Car Rental Service in ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}, Goa`,
        content: `Find the best car rental deals in ${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')}, Goa with ZioCarRentals.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    }
    
    // Fetch all cars instead of just cars for this location
    const carsData = await getCars();
    const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));
    
    return (
      <>
        <HeroStructuredData />
        
        {/* 1. Hero Section */}
        <Hero 
          title={`Car Rental in ${location.name},`}
          titleAccent="Goa"
          subtitle={location.headline || `Book the best self-drive cars in ${location.name} with unlimited kilometers, zero hidden fees, and 24/7 support.`}
        />

        {/* 2. Car Listing */}
        <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
          <Container>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Find the Perfect Car on Rent in {location.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                Choose from our extensive fleet of well-maintained self-drive rental cars.
              </p>
            </div>

            {cars.length > 0 ? (
              <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarCard key={car.id} car={car} showCategory={true} showDescription={false} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg">
                <p className="text-lg text-gray-500">No cars available currently. Please check back soon or contact us for assistance.</p>
              </div>
            )}
          </Container>
        </Section>

        {/* 3. Services */}
        <Services />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. FAQs */}
        <Faqs />
      </>
    );
  } catch (error) {
    console.error("Error in location page:", error);
    throw error; // Let the error boundary handle this
  }
}
