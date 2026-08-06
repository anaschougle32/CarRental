import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ConditionalLayout } from '@/components/layout/ConditionalLayout';
import { Toaster } from '@/components/ui/sonner';

// Configure Poppins font (body text)
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

// Configure Satoshi font (headings & bold text) via Google Fonts CDN fallback
const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/Satoshi-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/Satoshi-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/Satoshi-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

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
    google: 'hxxJ81rt4J5g6CKbKIjrK__63B3fpdsv9LQbU0SA_GM',
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const identitySchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ziocarrentals.com/#organization",
        "name": "Zio Car Rentals",
        "url": "https://www.ziocarrentals.com",
        "logo": "https://www.ziocarrentals.com/favicon.png",
        "slogan": "Freedom to Explore",
        "description": "Premium self-drive car rentals in Goa with unlimited kilometers, airport pickup, and 24/7 roadside assistance.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop no. 1, Mini Max Apartment, ND Naik Rd",
          "addressLocality": "Madgaon",
          "addressRegion": "Goa",
          "postalCode": "403601",
          "addressCountry": "IN"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91 90828 88912",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          }
        ],
        "sameAs": [
          "https://www.ziocarrentals.com"
        ]
      },
      {
        "@type": "AutoRental",
        "@id": "https://www.ziocarrentals.com/#autorental",
        "name": "Zio Car Rentals",
        "url": "https://www.ziocarrentals.com",
        "logo": "https://www.ziocarrentals.com/favicon.png",
        "image": "https://www.ziocarrentals.com/favicon.png",
        "telephone": "+91 90828 88912",
        "email": "info@ziocarrentals.com",
        "priceRange": "₹999 - ₹15000",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop no. 1, Mini Max Apartment, ND Naik Rd",
          "addressLocality": "Madgaon",
          "addressRegion": "Goa",
          "postalCode": "403601",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "15.2736",
          "longitude": "73.9581"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#2563eb" />
        
        {/* Favicon references */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Preconnect to external domains for TTFB performance */}
        <link 
          rel="preconnect" 
          href="https://www.googletagmanager.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="dns-prefetch" 
          href="https://www.googletagmanager.com" 
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

        {/* Identity Schema Script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(identitySchema) }}
        />
      </head>
      <body className={`${poppins.variable} ${satoshi.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>

        {/* Google Ads Tag — loaded asynchronously after page becomes interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11098887425"
          strategy="lazyOnload"
        />
        <Script id="google-ads" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-11098887425');
            gtag('config', 'AW-11098887425/phone_conversion', {
              'phone_conversion_number': '+91 90828 88912'
            });
          `}
        </Script>
      </body>
    </html>
  );
}