import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/common/FloatingCTA';

// Optimize font loading
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap', // Ensure text remains visible during font loading
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: 'GoDrive - Self Drive Car Rentals in Goa | Unlimited KM',
    template: '%s | GoDrive Car Rentals Goa',
  },
  description: 'Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance. Book online or call now!',
  keywords: 'car rental, self drive, Goa, rent a car, holiday car, unlimited km, airport pickup, car hire, SUV rental, budget car, affordable car rental',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://godrive.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GoDrive - Self Drive Car Rentals in Goa | Unlimited KM',
    description: 'Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance. Book online or call now!',
    url: 'https://godrive.com',
    siteName: 'GoDrive Car Rentals',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1',
        width: 1200,
        height: 630,
        alt: 'GoDrive Car Rentals in Goa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GoDrive - Self Drive Car Rentals in Goa | Unlimited KM',
    description: 'Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance. Book online or call now!',
    images: ['https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'travel',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={poppins.variable}
    >
      <head>
        {/* Preload critical assets */}
        <link 
          rel="preconnect" 
          href="https://images.pexels.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://images.pexels.com" 
        />
      </head>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-[calc(100vh-80px)]">{children}</main>
          <Footer />
          <FloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}