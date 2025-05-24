import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";

// Critical section loaded immediately
import PopularCars from "@/components/home/PopularCars";

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
  title: "GoDrive - Self Drive Car Rentals in Goa | Unlimited KM",
  description:
    "Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance. Book online or call now!",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <PopularCars />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <BlogPreview />
      <Faqs />
      <CtaBanner />
    </div>
  );
}