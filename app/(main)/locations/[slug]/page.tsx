import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocationBySlug, getCars, getBrands } from "@/lib/supabase";
import { Car as SupabaseCar } from "@/lib/supabase";
import { Car } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { Check, Shield, Clock, MapPin, Car as CarIcon, BadgeDollarSign } from "lucide-react";
import CarCard from "@/components/car/CarCard";
import BookingForm from "@/components/common/BookingForm";
import Head from "next/head";
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

    // ── Dedicated High-Converting Landing Page for Google Ads / SEO ──
    if (slug === 'self-drive-car-rental-in-goa') {
      const carsData = await getCars();
      const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));

      const whyChooseItems = [
        {
          title: "Wide Range of Cars",
          description: "Choose from hatchbacks, sedans, SUVs, and premium cars to match your travel style, group size, and budget.",
          icon: <CarIcon className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Affordable Rental Plans",
          description: "Enjoy competitive pricing with transparent rates and no hidden charges, making your Goa trip budget-friendly.",
          icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Clean & Well-Maintained Vehicles",
          description: "Every car is thoroughly cleaned, regularly serviced, and safety-checked before every rental.",
          icon: <Shield className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Easy Online Booking",
          description: "Reserve your preferred vehicle in just a few simple steps with our quick and hassle-free booking process.",
          icon: <Check className="w-10 h-10 text-blue-600" />
        },
        {
          title: "24/7 Customer Support",
          description: "Our dedicated support team is available to assist you with bookings, roadside assistance, and any queries during your rental.",
          icon: <Clock className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Safe & Reliable Travel",
          description: "Drive with confidence knowing every vehicle is maintained to high safety standards for a smooth and comfortable journey.",
          icon: <Shield className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Convenient Pickup & Drop-off",
          description: "Pick up or return your car at Goa Airport, your hotel, or other selected locations across Goa.",
          icon: <MapPin className="w-10 h-10 text-blue-600" />
        }
      ];

      const customFaqs = [
        {
          question: "What documents are required to rent a self-drive car in Goa?",
          answer: "You typically need a valid driving licence, a government-issued photo ID, and any additional documents required by the rental agreement."
        },
        {
          question: "Can tourists rent a self-drive car in Goa?",
          answer: "Yes. Both domestic and international tourists can rent a self-drive car, provided they meet the driver's licence and identification requirements."
        },
        {
          question: "Is there a security deposit?",
          answer: "Yes. A refundable security deposit may be required depending on the vehicle category and rental duration."
        },
        {
          question: "Can I pick up the car at Goa Airport?",
          answer: "Yes. We offer convenient pickup and drop-off options at Goa Airport and selected locations across Goa."
        },
        {
          question: "Is there a daily kilometre limit?",
          answer: "Mileage limits depend on the rental plan you choose. The applicable terms will be shown before you confirm your booking."
        },
        {
          question: "How much does it cost to rent a car in Goa?",
          answer: "Car rental in Goa starts from INR 900 per day for hatchbacks, mini SUVs or SUVs start from INR 2000 per day, and luxury car rentals start from INR 15000 per day. Prices can vary according to season and demand."
        }
      ];

      return (
        <>
          <HeroStructuredData />
          
          {/* 1. Hero Section (Contains Banner Booking Form) */}
          <Hero 
            title="Explore Goa Your Way with the Best Self-Drive Car Rental in Goa"
            subtitle="Discover the beauty of Goa at your own pace with our reliable and affordable self-drive car rental service. Choose from a wide range of clean, well-maintained cars with flexible rental plans and transparent pricing."
          />

          {/* 4. Car Listing (No Description in Car Listing) */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Find the Perfect Car on Rent in Goa
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  Choose from our extensive fleet of self-drive rental cars designed to suit every travel style and budget. Whether you're planning a solo adventure, a romantic getaway, or a family vacation, we have the ideal vehicle waiting for you.Every vehicle is regularly serviced, fully sanitized, and thoroughly inspected to ensure a safe and comfortable drive across Goa.
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

          {/* 5. Services: Our Premium Service */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Premium Service
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Airport Transfer */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Airport Transfer</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Seamless airport pickup and drop-off services at Dabolim and Mopa airports. Start your Goa vacation the moment you land with our comfortable vehicles and professional drivers.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>On-time pickup</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flight tracking</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No waiting charges</li>
                  </ul>
                </div>

                {/* Pick and Drop */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Pick and Drop</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Flexible pick-up and drop-off services at your convenience. We'll meet you at your hotel, resort, or any location of your choice throughout Goa.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Door-to-door service</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flexible scheduling</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No hidden charges</li>
                  </ul>
                </div>

                {/* 24/7 Availability */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">24/7 Availability</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Our services are available round the clock. Whether it's an early morning flight or a late-night arrival, we've got you covered throughout your Goa trip.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Round-the-clock support</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Emergency assistance</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Immediate response</li>
                  </ul>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. Why Choose Our Self-Drive Car Rental in Goa? */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Our Self-Drive Car Rental in Goa?
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  We make every journey simple, comfortable, and memorable by providing reliable vehicles and exceptional customer service.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {whyChooseItems.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100 dark:border-gray-800"
                  >
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 5. How It Works? */}
          <HowItWorks 
            title="Rent a Car in Goa in 3 Easy Steps" 
          />

          {/* 6. Frequently Asked Questions */}
          <Faqs items={customFaqs} />
        </>
      );
    }

    // ── Dedicated High-Converting Landing Page for Madgaon ──
    if (slug === 'self-drive-car-rental-madgaon') {
      const carsData = await getCars();
      const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));

      const whyChooseItemsMadgaon = [
        {
          title: "Affordable Rental Plans",
          description: "We provide budget-friendly rental packages with no hidden charges, ensuring you get the best value for your money.",
          icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Wide Range of Vehicles",
          description: "Select from hatchbacks, sedans, SUVs, and premium cars to suit solo trips, family vacations, or business travel.",
          icon: <CarIcon className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Freedom to Explore Goa",
          description: "Drive at your own pace and visit popular destinations like Colva Beach, Benaulim Beach, Cabo de Rama Fort, and Palolem.",
          icon: <MapPin className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Easy Online Booking",
          description: "Book your preferred car within minutes through our simple booking process with instant confirmation.",
          icon: <Check className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Well-Maintained Car",
          description: "Every vehicle is regularly serviced, cleaned, and inspected to ensure safety, comfort, and reliability.",
          icon: <Shield className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Flexible Rental Duration",
          description: "Whether you need a car for a 2 day, hours, a day, or several weeks, we offer flexible rental options.",
          icon: <Clock className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Customer-Focused Service",
          description: "We aim to provide reliable vehicles, clear communication, and a smooth rental experience from booking to return.",
          icon: <Shield className="w-10 h-10 text-blue-600" />
        }
      ];

      const customFaqsMadgaon = [
        {
          question: "What documents are required to rent a self-drive car in Margao?",
          answer: "You generally need a valid driving license, a government-issued ID proof, and the required security deposit, depending on the rental policy."
        },
        {
          question: "Can I book a self-drive car online?",
          answer: "Yes, you can easily reserve your preferred vehicle online with instant booking confirmation."
        },
        {
          question: "Are fuel charges included in the rental price?",
          answer: "No. Fuel is typically not included, and the vehicle should usually be returned with the agreed fuel level as per the rental terms."
        },
        {
          question: "Is there a minimum rental duration?",
          answer: "Yes, the minimum rental duration depends on the vehicle and rental package. 2 days, and long-term options are available."
        },
        {
          question: "What types of cars are available for rent in Margao, Goa?",
          answer: "You can drive across most tourist destinations in Goa while following the rental agreement and local traffic regulations."
        },
        {
          question: "How much does it cost to rent a car in Goa?",
          answer: "Self Drive Car rental in Madgaon Goa starts from INR 900 per day for hatchbacks, mini SUVs or SUVs start from INR 2000 per day, and luxury car rentals start from INR 15000 per day. Prices can vary according to season and demand."
        }
      ];

      return (
        <>
          <HeroStructuredData />
          
          {/* 1. Hero Section */}
          <Hero 
            title="Self Drive Car Rental in Madgaon,"
            titleAccent="Goa"
            subtitle="Hire a self-drive car at Madgaon Railway Station from ₹999/day with unlimited kilometers and 24/7 support."
          />

          {/* 2. Booking Form Section */}
          <Section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-12 w-full" size="none">
            <Container>
              <BookingForm 
                title="Self Drive Car Rental in Margao"
                subtitle="Fill out the form to check availability and book your preferred self-drive car. Enjoy quick booking, affordable prices, and a hassle-free travel experience across Goa."
                className="bg-white rounded-lg shadow-lg"
              />
            </Container>
          </Section>

          {/* 3. Body: H1 Section */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="max-w-4xl mx-auto space-y-4 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  Best Self Drive Car Rental in Madgaon, Goa
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed pt-2">
                  Looking for a convenient and affordable self drive car rental in Madgaon? Whether you're visiting Goa for a vacation, business trip, or family holiday, renting a self-drive car gives you complete freedom to explore the city and nearby attractions at your own pace. Skip the hassle of waiting for taxis and enjoy a comfortable driving experience with a wide range of well-maintained vehicles.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Our self-drive cars are available for 2 Days, weekly, and long-term rentals, making them suitable for every travel requirement. From compact hatchbacks to spacious SUVs, we offer vehicles that fit your budget and travel needs.
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  With transparent pricing, easy online booking, and excellent customer service, we make car rentals in Margao simple, safe, and affordable.
                </p>
              </div>
            </Container>
          </Section>

          {/* 4. Car Listing (No Description in Car Listing) */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Find the Perfect Car on Rent in Margao
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  Browse our wide selection of well-maintained self-drive rental cars designed to suit every travel need and budget. From fuel-efficient hatchbacks for city drives to spacious SUVs for family trips and premium sedans for business travel, we have the perfect vehicle for your journey. Each car is regularly serviced, thoroughly cleaned, and equipped with modern features to ensure a safe, comfortable, and hassle-free driving experience. Choose your preferred car, select your rental dates, and book online in just a few simple steps.
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

          {/* 5. Services: Our Premium Service */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Premium Service
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Airport Transfer */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Airport Transfer</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Seamless airport pickup and drop-off services at Dabolim and Mopa airports. Start your Goa vacation the moment you land with our comfortable vehicles and professional drivers.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>On-time pickup</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flight tracking</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No waiting charges</li>
                  </ul>
                </div>

                {/* Pick and Drop */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Pick and Drop</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Flexible pick-up and drop-off services at your convenience. We'll meet you at your hotel, resort, or any location of your choice throughout Goa.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Door-to-door service</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flexible scheduling</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No hidden charges</li>
                  </ul>
                </div>

                {/* 24/7 Availability */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">24/7 Availability</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Our services are available round the clock. Whether it's an early morning flight or a late-night arrival, we've got you covered throughout your Goa trip.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Round-the-clock support</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Emergency assistance</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Immediate response</li>
                  </ul>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. What documents / Advantages section */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Self Drive Car Rental in Margao?
                </h3>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  Choosing a self-drive car rental in Margao offers several advantages for travelers and locals alike.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {whyChooseItemsMadgaon.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100 dark:border-gray-800"
                  >
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 7. How It Works? */}
          <HowItWorks 
            title="Rent a Car in Madgaon Goa in 3 Easy Steps" 
          />

          {/* 8. Frequently Asked Questions */}
          <Faqs items={customFaqsMadgaon} />
        </>
      );
    }

    // ── Dedicated High-Converting Landing Page for Goa Airport ──
    if (slug === 'self-drive-car-rental-goa-airport' || slug === 'goa-airport') {
      const carsData = await getCars();
      const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));

      const whyChooseItemsGoaAirport = [
        {
          title: "Airport Pickup & Drop",
          description: "Convenient pickup and return services from both Dabolim (GOI) and Mopa (GOX) airports.",
          icon: <MapPin className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Wide Range of Vehicles",
          description: "Choose from hatchbacks, sedans, SUVs, automatic, and luxury cars.",
          icon: <CarIcon className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Affordable & Transparent Pricing",
          description: "Competitive rates with no hidden charges.",
          icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Clean, Sanitized & Well-Maintained Cars",
          description: "Every vehicle is professionally cleaned, sanitized, and inspected before every booking.",
          icon: <Shield className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Fast Booking & Quick Documentation",
          description: "Easy booking process with minimal paperwork and quick confirmation.",
          icon: <Check className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Customer-Focused Service",
          description: "We aim to provide reliable vehicles, clear communication, and a smooth rental experience from booking to return.",
          icon: <Clock className="w-10 h-10 text-blue-600" />
        }
      ];

      const customFaqsGoaAirport = [
        {
          question: "Can I pick up my self-drive car directly from Goa Airport?",
          answer: "Yes. We offer pickup services from both Goa International Airport (Dabolim - GOI) and Manohar International Airport (Mopa - GOX)."
        },
        {
          question: "What documents are required to rent a self-drive car from goa airport?",
          answer: "You need a valid driving licence, a government-issued photo ID (such as Aadhaar or Passport), and any other documents required by the rental policy."
        },
        {
          question: "Is there a refundable security deposit?",
          answer: "Yes. A refundable security deposit is applicable depending on the vehicle category."
        },
        {
          question: "Can I return the car at a different location in Goa?",
          answer: "Depending on availability and rental terms, one-way drop-off may be available. Please confirm this at the time of booking."
        },
        {
          question: "Can I book the car before my flight arrives?",
          answer: "Yes. We recommend booking in advance so your vehicle is ready when you land."
        },
        {
          question: "How much does it cost to rent a car in Goa Airport?",
          answer: "Self Drive Car rental in Goa Airport starts from INR 900 per day for hatchbacks, mini SUVs or SUVs start from INR 2000 per day, and luxury car rentals start from INR 15000 per day. Prices can vary according to season and demand."
        }
      ];

      return (
        <>
          <HeroStructuredData />
          
          {/* 1. Hero Section */}
          <Hero 
            title="Self Drive Car Rental at Goa Airport,"
            titleAccent="Dabolim & Mopa"
            subtitle="Book self-drive cars directly at Dabolim (GOI) & Mopa (GOX) airports with unlimited kilometers and 24/7 assistance."
          />

          {/* 2. Booking Form Section */}
          <Section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-12 w-full" size="none">
            <Container>
              <BookingForm 
                title="Book Self Drive Car Rental at Goa Airport Today"
                subtitle="Fill out the form to check availability and book your preferred self-drive car. Enjoy quick booking, affordable prices, and a hassle-free travel experience across Goa."
                className="bg-white rounded-lg shadow-lg"
              />
            </Container>
          </Section>

          {/* 3. Body: H1 Section */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="max-w-4xl mx-auto space-y-4 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  Self Drive Car Rental at Goa Airport
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed pt-2">
                  Looking for a Self Drive Car Rental at Goa Airport? Start your Goa journey the moment you land with our reliable, affordable, and hassle-free airport car rental service. We provide self-drive cars directly from Goa International Airport (Dabolim - GOI) and Manohar International Airport (Mopa - GOX), making it easy for tourists, business travelers, families, and couples to explore Goa at their own pace. Whether you're heading to Calangute, Baga, Candolim, Panjim, Margao, Colva, Palolem, Anjuna, Vagator, or South Goa, our airport pickup service allows you to begin your trip without waiting for public transport.
                </p>
              </div>
            </Container>
          </Section>

          {/* 4. Car Listing (No Description in Car Listing) */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Find the Perfect Car on Rent in Goa Airport
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  We offer transparent pricing, flexible rental durations, quick documentation, and dedicated customer support to make your travel experience smooth and stress-free.
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

          {/* 5. Services: Our Premium Service */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Premium Service
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Airport Transfer */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Airport Transfer</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Seamless airport pickup and drop-off services at Dabolim and Mopa airports. Start your Goa vacation the moment you land with our comfortable vehicles and professional drivers.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>On-time pickup</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flight tracking</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No waiting charges</li>
                  </ul>
                </div>

                {/* Pick and Drop */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Pick and Drop</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Flexible pick-up and drop-off services at your convenience. We'll meet you at your hotel, resort, or any location of your choice throughout Goa.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Door-to-door service</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flexible scheduling</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No hidden charges</li>
                  </ul>
                </div>

                {/* 24/7 Availability */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">24/7 Availability</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Our services are available round the clock. Whether it's an early morning flight or a late-night arrival, we've got you covered throughout your Goa trip.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Round-the-clock support</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Emergency assistance</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Immediate response</li>
                  </ul>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. Why Choose section */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Our Goa Airport Car Rental?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {whyChooseItemsGoaAirport.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100 dark:border-gray-800"
                  >
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 7. How It Works? */}
          <HowItWorks 
            title="Rent a Car in Goa Airport in 3 Easy Steps" 
          />

          {/* 8. Frequently Asked Questions */}
          <Faqs items={customFaqsGoaAirport} />
        </>
      );
    }

    // ── Dedicated High-Converting Landing Page for Calangute ──
    if (slug === 'self-drive-car-rental-calangute' || slug === 'calangute') {
      const carsData = await getCars();
      const cars = await Promise.all(carsData.map(car => mapSupabaseCarToAppCar(car)));

      const whyChooseItemsCalangute = [
        {
          title: "Wide Selection of Cars",
          description: "Choose from hatchbacks, sedans, SUVs, automatic, and luxury cars to suit every travel style and budget.",
          icon: <CarIcon className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Close to Calangute Beach",
          description: "Convenient car pickup near Calangute Beach, making it easy to begin your Goa trip immediately.",
          icon: <MapPin className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Affordable & Transparent Pricing",
          description: "Enjoy competitive rental rates with no hidden charges and flexible rental packages.",
          icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Quick Booking & Easy Documentation",
          description: "Book your car in minutes with minimal paperwork and fast confirmation.",
          icon: <Check className="w-10 h-10 text-blue-600" />
        },
        {
          title: "Customer-Focused Service",
          description: "We aim to provide reliable vehicles, clear communication, and a smooth rental experience from booking to return.",
          icon: <Clock className="w-10 h-10 text-blue-600" />
        }
      ];

      const customFaqsCalangute = [
        {
          question: "What documents are required to rent a self-drive car in Calangute?",
          answer: "A valid driving licence, a government-issued photo ID (Aadhaar Card, Passport, or similar), and any additional documents required by the rental policy."
        },
        {
          question: "Can tourists rent a self-drive car in Calangute?",
          answer: "Yes. Both Indian and international tourists with a valid driving licence can rent self-drive cars."
        },
        {
          question: "Is there a refundable security deposit?",
          answer: "Yes. A refundable security deposit is applicable depending on the vehicle category."
        },
        {
          question: "Can I drive anywhere in Goa with the rental car?",
          answer: "Yes. You can explore North Goa and South Goa while following the rental agreement and local traffic rules."
        },
        {
          question: "Can you deliver the car to my hotel in Calangute?",
          answer: "Yes. Hotel and resort delivery is available in many areas of Calangute, subject to availability and prior confirmation."
        },
        {
          question: "How much does it cost to rent a car in Calangute ?",
          answer: "Self Drive Car rental in Calangute starts from INR 900 per day for hatchbacks, mini SUVs or SUVs start from INR 2000 per day, and luxury car rentals start from INR 15000 per day. Prices can vary according to season and demand."
        }
      ];

      return (
        <>
          <HeroStructuredData />
          
          {/* 1. Hero Section */}
          <Hero 
            title="Self Drive Car Rental in Calangute,"
            titleAccent="Goa"
            subtitle="Rent hatchbacks, sedans, SUVs & luxury cars near Calangute Beach from ₹999/day with unlimited kilometers."
          />

          {/* 2. Booking Form Section */}
          <Section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-12 w-full" size="none">
            <Container>
              <BookingForm 
                title="Self Drive Car Rental in Calangute Today"
                subtitle="Fill out the form to check availability and book your preferred self-drive car. Enjoy quick booking, affordable prices, and a hassle-free travel experience across Goa."
                className="bg-white rounded-lg shadow-lg"
              />
            </Container>
          </Section>

          {/* 3. Body: H1 Section */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="max-w-4xl mx-auto space-y-4 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  Best Self Drive Car Rental in Calangute, Goa
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed pt-2">
                  Planning a trip to Goa? Book the best Self Drive Car Rental in Calangute, Goa and enjoy the freedom to explore one of India's most popular beach destinations at your own pace. Whether you're on a family vacation, honeymoon, weekend getaway, or business trip, our reliable self-drive cars offer comfort, convenience, and complete privacy. Calangute, known as the "Queen of Beaches," is the perfect destination to begin your Goa adventure. With a self-drive car, you can easily visit Baga Beach, Candolim, Anjuna, Vagator, Fort Aguada, SinQ Night Club, Tito's Lane, Chapora Fort, and Panjim without depending on taxis or public transport.
                </p>
              </div>
            </Container>
          </Section>

          {/* 4. Car Listing (No Description in Car Listing) */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Find the Perfect Car on Rent in Calangute
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">
                  We provide a wide range of well-maintained rental cars, including hatchbacks, sedans, SUVs, automatic cars, and luxury vehicles. Every car is regularly serviced, professionally sanitized, and thoroughly inspected to ensure a safe and comfortable journey.
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

          {/* 5. Services: Our Premium Service */}
          <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Premium Service
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Airport Transfer */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Airport Transfer</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Seamless airport pickup and drop-off services at Dabolim and Mopa airports. Start your Goa vacation the moment you land with our comfortable vehicles and professional drivers.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>On-time pickup</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flight tracking</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No waiting charges</li>
                  </ul>
                </div>

                {/* Pick and Drop */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">Pick and Drop</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Flexible pick-up and drop-off services at your convenience. We'll meet you at your hotel, resort, or any location of your choice throughout Goa.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Door-to-door service</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Flexible scheduling</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>No hidden charges</li>
                  </ul>
                </div>

                {/* 24/7 Availability */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold ml-3 text-gray-900 dark:text-white">24/7 Availability</h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                      Our services are available round the clock. Whether it's an early morning flight or a late-night arrival, we've got you covered throughout your Goa trip.
                    </p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-gray-100 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Round-the-clock support</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Emergency assistance</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>Immediate response</li>
                  </ul>
                </div>
              </div>
            </Container>
          </Section>

          {/* 6. Why Choose section */}
          <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
            <Container>
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose Our Calangute Car Rental?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {whyChooseItemsCalangute.map((item, index) => (
                  <div 
                    key={index} 
                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100 dark:border-gray-800"
                  >
                    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </Section>

          {/* 7. How It Works? */}
          <HowItWorks 
            title="Rent a Car in Calangute in 3 Easy Steps" 
          />

          {/* 8. Frequently Asked Questions */}
          <Faqs items={customFaqsCalangute} />
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
        {/* Booking Form Section - At Top */}
        <Section className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-12 w-full" size="none">
          <Container>
            <BookingForm 
              title={`Book Your Car Rental in ${location.name}`}
              subtitle={`Get instant quotes and check availability for car rentals in ${location.name}. Fill out the form below to start your booking.`}
              className="bg-white rounded-lg shadow-lg"
            />
          </Container>
        </Section>
        
        <Section className="bg-white dark:bg-gray-900 py-10" size="sm">
          <Container>
        
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
            <div className="grid grid-cols-1 min-[375px]:grid-cols-2 lg:grid-cols-3 gap-4">
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
            With ZioCarRentals, you get competitive rates, well-maintained vehicles, and excellent customer service.
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
          </Container>
        </Section>
      </>
    );
  } catch (error) {
    console.error("Error in location page:", error);
    throw error; // Let the error boundary handle this
  }
}
