# Car Rental Website Project Requirements

## Tech Stack

- **Framework**: Next.js (App Router + File-Based Routing)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Backend/Database**: Supabase (PostgreSQL DB + Auth + File Storage)

## General Development Requirements

- Fully SEO-optimized pages (Title, Meta, OpenGraph, Schema Markup)
- Fast load times, image optimization using Next.js Image component
- Responsive Design (Mobile, Tablet, Desktop)
- Accessibility-friendly (use semantic HTML and aria-tags)
- Clean, maintainable code structure
- Use Layouts for reusable parts (navbar, footer, meta tags)
- Use app/ directory routing system of Next.js
- Use Supabase for car data, user contact messages, and file storage (e.g. car images)

## Pages Required

### 1. Homepage
- Hero Section: Background image + Headline + CTA ("Book Now")
- Search Cars form (with car name, pickup location, date)
- About section
- Metrics section (Happy Customers, Cars Available, Years of Experience)
- Process Steps (Search -> Book -> Pickup -> Drop)
- Fleet Highlights (Car cards in categories)
- Why Choose Us (Icons + text)
- Testimonials (Slider)
- CTA Banner (e.g. Chauffeur car rental)
- Blog Highlights (3 latest blogs)
- Footer with contact, links, social

### 2. Car Fleet Listing Page (/cars)
- Filters (Brand, Type, Transmission, Price)
- Grid of cars with basic info (name, image, price, CTA to view more)
- Pagination / Infinite scroll (Optional)

### 3. Single Car Details Page (/cars/[slug])
- Car images (carousel)
- Features (transmission, luggage, fuel, etc.)
- Booking CTA (WhatsApp or Call)
- Price breakdown
- Minimum booking info
- Related cars section

### 4. About Page (/about)
- Company story, mission, and unique value proposition
- Team or photos (if applicable)

### 5. Contact Page (/contact)
- Contact Form (Name, Email, Phone, Message) -> Store in Supabase
- Company contact info
- Embedded map (optional)

### 6. Blog Listing Page (/blogs)
- Hard-coded blog posts in MDX or JSX format
- Thumbnail + title + short description + read more

### 7. Single Blog Page (/blogs/[slug])
- Rich content support (Headings, Images, Code blocks, Tables)
- SEO optimized with proper schema and OpenGraph data

### 8. 404 Not Found Page
- Custom design for a better user experience

## Supabase Usage
- **Tables**: Cars, Brands, Testimonials, ContactMessages
- **Storage Buckets**: Car Images, Optional Blog Images

## Components to Be Reused
- Navbar
- Footer
- CarCard
- CarFilter
- BookingCTA
- TestimonialCard
- SectionWrapper
- BlogCard

## SEO & Performance Practices
- Use next/head or metadata API for SEO tags
- Use robots.txt and sitemap.xml
- Use Image from next/image for optimization
- Lazy load sections when necessary
- Clean URL structure with readable slugs
- Open Graph & Twitter card setup

## Project Priorities
- Mobile responsive design
- SEO optimization (highest priority) 