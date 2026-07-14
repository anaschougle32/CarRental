import { Metadata } from "next";
import CarsGrid from "@/components/car/CarsGrid";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { Container, Section } from "@/components/common/LayoutComponents";

export const metadata: Metadata = {
  title: "Available Self Drive Cars in Goa – Book Online",
  description: "Browse our fleet of well-maintained cars for rent in Goa. From compact hatchbacks to premium SUVs, find the perfect car for your Goan adventure.",
  keywords: "car rental Goa, self drive cars, rent car Goa, SUV rental, budget cars Goa",
};

function LoadingCars() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
      <p className="text-lg text-gray-600">Loading available cars...</p>
    </div>
  );
}

export default function CarsPage() {
  return (
    <Section className="bg-white dark:bg-gray-900" size="lg">
      <Container>
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our Fleet of Rental Cars
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Choose from our wide selection of well-maintained vehicles. All cars come with unlimited kilometers and 24/7 roadside assistance.
          </p>
        </div>

        <Suspense fallback={<LoadingCars />}>
          <CarsGrid />
        </Suspense>
      </Container>
    </Section>
  );
}