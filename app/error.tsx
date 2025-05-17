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
    // Log the error
    console.error('Root level error:', error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
      <h2 className="text-3xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-lg">
        An unexpected error occurred. We've been notified and are working to fix the issue.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
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