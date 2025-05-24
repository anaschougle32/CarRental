import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing in environment variables');
}

// Create Supabase client with minimal configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
  },
  global: {
    fetch: (...args) => fetch(...args),
  },
});

// Database types
export type Car = {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  price_per_day: number;
  transmission: string;
  fuel_type: string;
  seats: number;
  luggage: number;
  description: string;
  features: string[];
  main_image?: string;
  images?: string[];
  mileage?: number;
  created_at: string;
};

export type Brand = {
  id: string;
  name: string;
  logo: string;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
  published_at: string;
  author?: string;
  category?: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
};

// Helper functions for database operations
export async function getCars() {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching cars:', error);
    return [];
  }
  
  return data as Car[];
}

export async function getCarBySlug(slug: string) {
  const { data, error } = await supabase
    .from('cars')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching car:', error);
    return null;
  }
  
  return data as Car;
}

export async function getBrands() {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
  
  return data as Brand[];
}

export async function getTestimonials() {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*');
  
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  
  return data as Testimonial[];
}

export async function submitContactForm(contactData: Omit<ContactMessage, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('contact_messages')
    .insert(contactData)
    .select();
  
  if (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
  
  return { success: true, data };
}

// Blog functions
export async function getBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .not('published_at', 'is', null)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
  
  return data as Blog[];
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .single();
  
  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
  
  return data as Blog;
}

export async function getRelatedBlogs(currentSlug: string, category: string, count = 2) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .not('published_at', 'is', null)
    .eq('category', category)
    .neq('slug', currentSlug)
    .limit(count);
  
  if (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
  
  return data as Blog[];
}