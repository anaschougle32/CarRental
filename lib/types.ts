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
  content: string;
  cover_image: string;
  date: string;
  author: string;
  category: string;
}