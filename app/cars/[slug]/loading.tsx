import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6" />
          
          <div className="relative h-64 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-6" />
          
          <Separator className="my-8" />
          
          {/* Car Details Skeleton */}
          <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
                <div>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
                  <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
          
          <Separator className="my-8" />
          
          {/* Features Skeleton */}
          <div className="h-8 w-1/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Booking CTA Skeleton */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 animate-pulse">
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
            
            <div className="h-12 bg-blue-200 dark:bg-blue-800 rounded mb-3" />
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
      
      <Separator className="my-12" />
      
      {/* Related Cars Skeleton */}
      <div className="h-8 w-1/3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-80 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
} 