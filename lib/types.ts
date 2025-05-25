// Car Types
export interface CarFeature {
  icon: string;
  name: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  slug: string;
  price_per_day: number;
  description: string;
  features: CarFeature[];
  fuel_type: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  min_days: number;
  main_image?: string;
  images?: string[];
  category: 'Hatchback' | 'Sedan' | 'SUV' | 'Luxury' | 'Premium';
  mileage?: number; // Vehicle mileage in kilometers per liter
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  city: string;
  message: string;
  stars: number;
  image?: string;
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  excerpt?: string; // Short excerpt for previews
  content: string;
  cover_image: string;
  date?: string; // Legacy date field
  created_at: string; // ISO date string when the blog was created
  updated_at?: string; // ISO date string when the blog was last updated
  published?: boolean; // Whether the blog is published
  author?: string; // Author name
  category?: string; // Blog category
}