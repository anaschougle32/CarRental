import { Metadata } from "next";
import HomePageContent from "@/components/pages/HomePageContent";

export const metadata: Metadata = {
  title: "Self Drive Car Rental in India |Hire Hatchback, Sedan, SUV & Luxury Cars",
  description:
    "Book the best self drive car rental in India with affordable pricing and flexible rental plans. Choose from hatchbacks, sedans, SUVs, automatic, and luxury cars. Enjoy easy booking, well-maintained vehicles, transparent pricing, and 24/7 customer support.",
  keywords: "self drive car rental in india, car rental india, hire hatchback sedan suv luxury cars, rent a car india, affordable car rental",
  alternates: {
    canonical: 'https://www.ziocarrentals.com',
  },
  openGraph: {
    title: "Self Drive Car Rental in India |Hire Hatchback, Sedan, SUV & Luxury Cars",
    description: "Book the best self drive car rental in India with affordable pricing and flexible rental plans. Choose from hatchbacks, sedans, SUVs, automatic, and luxury cars.",
    url: 'https://www.ziocarrentals.com',
    siteName: 'ZioCarRentals',
    images: ['/images/og-image.jpg'],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Self Drive Car Rental in India |Hire Hatchback, Sedan, SUV & Luxury Cars",
    description: "Book the best self drive car rental in India with affordable pricing and flexible rental plans.",
    images: ['/images/twitter-image.jpg'],
  },
};

export default function Home() {
  return <HomePageContent />;
}