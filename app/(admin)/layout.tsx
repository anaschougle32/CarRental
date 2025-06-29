import './admin.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: {
    default: 'ZioCarRentals Admin Panel',
    template: '%s | ZioCarRentals Admin',
  },
  description: 'Admin panel for ZioCarRentals management',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {children}
      <Toaster />
    </div>
  );
}
