'use client';

import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering on the client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
