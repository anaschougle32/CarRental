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

import { getCars, getBrands } from "@/lib/supabase";
import { getBlogs } from "@/lib/blogs";
import type { Car } from "@/lib/types";
import { getCarImageUrl } from "@/lib/car-images";

import type { BlogPost } from "@/types/blog";

// ISR: Cache homepage at the edge for 1 hour
export const revalidate = 3600;

export default async function Home() {
  let initialCars: Car[] = [];
  let initialBlogs: BlogPost[] = [];

  try {
    const [carsData, brandsData, blogsData] = await Promise.all([
      getCars(),
      getBrands(),
      getBlogs(),
    ]);

    const brandMap = new Map((brandsData || []).map((b) => [b.id, b.name]));

    initialCars = (carsData || []).slice(0, 8).map((car) => {
      const brandName = brandMap.get(car.brand_id) || "Unknown";
      return {
        id: car.id,
        name: car.name,
        brand: brandName,
        slug: car.slug,
        price_per_day: car.price_per_day,
        description: car.description || `Experience the comfort of ${car.name} for your Goa trip.`,
        features: (car.features || []).map((feature) => ({
          icon: "check",
          name: feature,
        })),
        fuel_type: car.fuel_type as any,
        transmission: car.transmission as any,
        min_days: 1,
        main_image: getCarImageUrl(car),
        mileage: car.mileage,
        category:
          car.seats <= 5
            ? car.seats <= 4
              ? "Hatchback"
              : "Sedan"
            : car.seats <= 7
            ? "SUV"
            : "Premium",
      } as unknown as Car;
    });

    initialBlogs = (blogsData || []).slice(0, 3);
  } catch (error) {
    console.error("Error pre-rendering homepage data:", error);
  }

  return <HomePageContent initialCars={initialCars} initialBlogs={initialBlogs} />;
}