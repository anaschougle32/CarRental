import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/common/FloatingCTA';

// Configure Poppins font with basic settings
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

// Apply font family to HTML element
const fontClass = `${poppins.variable} font-sans`;

export const metadata: Metadata = {
  title: {
    default: 'ZioCarRentals - Self Drive Car Rentals in Goa | Unlimited KM',
    template: '%s | ZioCarRentals Goa',
  },
  description: 'Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance. Book online or call now!',
  keywords: 'car rental, self drive, Goa, rent a car, holiday car, unlimited km, airport pickup, car hire, SUV rental, budget car, affordable car rental',
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ziocarrentals.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZioCarRentals - Self Drive Car Rentals in Goa | Unlimited KM',
    description: 'Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance. Book online or call now!',
    url: 'https://ziocarrentals.com',
    siteName: 'ZioCarRentals',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&dpr=1',
        width: 1200,
        height: 630,
        alt: 'ZioCarRentals in Goa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZioCarRentals - Self Drive Car Rentals in Goa | Unlimited KM',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

// Add font class to the body instead of html
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://images.pexels.com" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://images.pexels.com" 
        />
        {/* Preload fonts */}
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
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