import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-20 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-6" />
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
        We couldn't find the page you're looking for. It may have been moved, deleted, or never existed.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="default" asChild>
          <Link href="/">
            Return to Home
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/cars">
            Browse Cars
          </Link>
        </Button>
      </div>
    </div>
  );
}