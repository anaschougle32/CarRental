import { Metadata } from "next";
import HomePageContent from "@/components/pages/HomePageContent";

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
  return <HomePageContent />;
}