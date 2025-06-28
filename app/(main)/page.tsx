import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

// Critical sections loaded immediately
import PopularCars from "@/components/home/PopularCars";
import Services from "@/components/home/Services";

// Non-critical sections loaded dynamically
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
});

const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
});

const CtaBanner = dynamic(() => import("@/components/home/CtaBanner"), {
  loading: () => <div className="h-40 bg-blue-50 dark:bg-blue-900/20 animate-pulse"></div>,
});

const Faqs = dynamic(() => import("@/components/home/Faqs"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
});

export const metadata: Metadata = {
  title: "ZioCarRentals - Best Car Rental Service in Goa | Airport Pickup | 24/7 Support",
  description:
    "Premium car rentals in Goa with airport transfers, unlimited kilometers, and 24/7 roadside assistance. Explore North & South Goa with our reliable vehicles. Book online or call now!",
  keywords: "car rental Goa, self drive cars Goa, airport pickup Goa, car hire Calangute, Anjuna car rental, Baga car rental, North Goa car rental, South Goa car rental",
  openGraph: {
    title: "ZioCarRentals - Best Car Rental Service in Goa | Airport Pickup | 24/7 Support",
    description: "Premium car rentals in Goa with airport transfers, unlimited kilometers, and 24/7 roadside assistance. Explore North & South Goa with our reliable vehicles.",
    images: ['/images/og-image.jpg'],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ZioCarRentals - Best Car Rental Service in Goa",
    description: "Premium car rentals in Goa with airport transfers and 24/7 support",
    images: ['/images/twitter-image.jpg'],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PopularCars />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <Faqs />
      <CtaBanner />
    </div>
  );
}