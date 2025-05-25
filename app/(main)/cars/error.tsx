'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center text-center">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
        We couldn't load the cars listing. This could be due to a temporary connectivity issue or server error.
      </p>
      <div className="flex gap-4">
        <Button variant="default" onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" onClick={() => window.location.href = '/'}>
          Return to Home
        </Button>
      </div>
    </div>
  );
} 