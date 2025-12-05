'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingCTA from '../common/FloatingCTA';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Check if current route is admin-related
  const isAdminRoute = mounted && (pathname?.startsWith('/admin') || pathname?.startsWith('/adminlogin'));
  
  // Always render the same structure to prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        <Header />
        <main className="min-h-[calc(100vh-80px)]">{children}</main>
        <Footer />
        <FloatingCTA />
      </>
    );
  }
  
  if (isAdminRoute) {
    // For admin routes, just render children without Header/Footer
    return <>{children}</>;
  }
  
  // For non-admin routes, render with Header/Footer
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)]">
        <div className="w-full md:max-w-[80%] md:mx-auto">
          {children}
        </div>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
} 