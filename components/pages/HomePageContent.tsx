"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/home/Hero";
import PopularCars from "@/components/home/PopularCars";
import Services from "@/components/home/Services";

// Non-critical sections loaded dynamically with error boundaries
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

const Testimonials = dynamic(() => import("@/components/home/Testimonials"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

const BlogPreview = dynamic(() => import("@/components/home/BlogPreview"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

const CtaBanner = dynamic(() => import("@/components/home/CtaBanner"), {
  loading: () => <div className="h-40 bg-blue-50 dark:bg-blue-900/20 animate-pulse"></div>,
  ssr: false,
});

const Faqs = dynamic(() => import("@/components/home/Faqs"), {
  loading: () => <div className="h-96 bg-gray-50 dark:bg-gray-900 animate-pulse"></div>,
  ssr: false,
});

export default function HomePageContent() {
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
