import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-pulse">
          Our Fleet of Rental Cars
        </h1>
        <div className="h-6 w-full max-w-3xl mx-auto bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          {/* Placeholder for filter sidebar */}
          <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
        </div>
        <div className="lg:w-3/4 flex items-center justify-center h-96">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
            <p className="text-lg text-gray-600">Loading available cars...</p>
          </div>
        </div>
      </div>
    </div>
  );
} 