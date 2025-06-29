'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import FloatingCTA from '../common/FloatingCTA';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Check if current route is admin-related
  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/adminlogin');
  
  if (isAdminRoute) {
    // For admin routes, just render children without Header/Footer
    return <>{children}</>;
  }
  
  // For non-admin routes, render with Header/Footer
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-80px)]">{children}</main>
      <Footer />
      <FloatingCTA />
    </>
  );
} 