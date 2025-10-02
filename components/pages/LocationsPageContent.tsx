"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

// Dynamic imports with proper error handling
const Services = dynamic(() => import("@/components/home/Services"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg"></div>,
});

const PopularCars = dynamic(() => import("@/components/home/PopularCars"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg"></div>,
});

const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg"></div>,
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg"></div>,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg"></div>,
});

const CtaBanner = dynamic(() => import("@/components/home/CtaBanner"), {
  ssr: false,
  loading: () => <div className="h-40 bg-blue-50 dark:bg-blue-900/20 animate-pulse rounded-lg"></div>,
});

const Faqs = dynamic(() => import("@/components/home/Faqs"), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse rounded-lg"></div>,
});

interface Location {
  id: string;
  name: string;
  slug: string;
  headline: string;
  content?: string;
  created_at: string;
  updated_at: string;
}

interface LocationsPageContentProps {
  initialLocations: Location[];
}

const LocationsPageContent = ({ initialLocations }: LocationsPageContentProps) => {
  const [mounted, setMounted] = useState(false);
  const [locations] = useState<Location[]>(initialLocations);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
          <div className="text-center mb-12">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse max-w-2xl mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Car Rental Locations in Goa
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Find our convenient pickup and drop locations across North Goa, South Goa, and major airports. 
            We're here to serve you wherever you are in Goa.
          </p>
        </div>
      </div>

      {/* Locations Grid */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Service Locations</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from our wide network of locations for convenient car pickup and drop-off services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-blue-600 mr-2 flex-shrink-0" />
                    <h3 className="text-xl font-semibold">{location.name}</h3>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {location.headline}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/locations/${location.slug}`}>
                    View Cars & Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Cars Section */}
      <PopularCars />

      {/* Services Section */}
      <Services />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <Faqs />

      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
};

export default LocationsPageContent;
