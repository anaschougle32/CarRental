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

export type Location = {
  id: string;
  name: string;
  slug: string;
  headline: string;
  content: string;
  created_at: string;
  updated_at: string;
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

// Location functions
export async function getLocations() {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
  
  return data as Location[];
}

export async function getLocationBySlug(slug: string) {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching location:', error);
    return null;
  }
  
  return data as Location;
}

export async function getCarsByLocation(locationName: string) {
  try {
    // First get the location ID by name
    const { data: locationData, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('name', locationName)
      .single();
    
    if (locationError) {
      console.error('Error fetching location ID:', locationError);
      return [];
    }
    
    if (!locationData) {
      console.error('Location not found:', locationName);
      return [];
    }
    
    // Then get all cars associated with this location through the junction table
    const { data: carLocationData, error: junctionError } = await supabase
      .from('car_locations')
      .select('car_id')
      .eq('location_id', locationData.id);
    
    if (junctionError) {
      console.error('Error fetching car-location relationships:', junctionError);
      return [];
    }
    
    if (!carLocationData || carLocationData.length === 0) {
      // No cars found for this location
      return [];
    }
    
    // Get the car IDs from the junction data
    const carIds = carLocationData.map(item => item.car_id);
    
    // Finally, get the actual car data
    const { data: carsData, error: carsError } = await supabase
      .from('cars')
      .select('*')
      .in('id', carIds)
      .order('created_at', { ascending: false });
    
    if (carsError) {
      console.error('Error fetching cars by IDs:', carsError);
      return [];
    }
    
    return carsData as Car[];
  } catch (error) {
    console.error('Error in getCarsByLocation:', error);
    return [];
  }
}

export async function getLocationById(id: string) {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching location by ID:', error);
    return null;
  }
  
  return data as Location;
}

export async function createLocation(locationData: Omit<Location, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('locations')
    .insert({
      ...locationData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select();
  
  if (error) {
    console.error('Error creating location:', error);
    throw error;
  }
  
  return data[0] as Location;
}

export async function updateLocation(id: string, locationData: Partial<Omit<Location, 'id' | 'created_at' | 'updated_at'>>) {
  const { data, error } = await supabase
    .from('locations')
    .update({
      ...locationData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating location:', error);
    throw error;
  }
  
  return data[0] as Location;
}

export async function deleteLocation(id: string) {
  const { error } = await supabase
    .from('locations')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting location:', error);
    throw error;
  }
  
  return { success: true };
}

// Functions for managing car-location relationships
export async function getCarLocations(carId: string) {
  const { data, error } = await supabase
    .from('car_locations')
    .select('location_id')
    .eq('car_id', carId);
  
  if (error) {
    console.error('Error fetching car locations:', error);
    return [];
  }
  
  if (!data || data.length === 0) {
    return [];
  }
  
  // Get the location IDs
  const locationIds = data.map(item => item.location_id);
  
  // Get the actual location data
  const { data: locationsData, error: locationsError } = await supabase
    .from('locations')
    .select('*')
    .in('id', locationIds);
  
  if (locationsError) {
    console.error('Error fetching locations by IDs:', locationsError);
    return [];
  }
  
  return locationsData as Location[];
}

export async function addCarToLocation(carId: string, locationId: string) {
  // Check if the relationship already exists
  const { data: existingData, error: checkError } = await supabase
    .from('car_locations')
    .select('id')
    .eq('car_id', carId)
    .eq('location_id', locationId)
    .maybeSingle();
  
  if (checkError) {
    console.error('Error checking existing car-location relationship:', checkError);
    throw checkError;
  }
  
  // If the relationship already exists, return it
  if (existingData) {
    return { success: true, id: existingData.id };
  }
  
  // Otherwise, create a new relationship
  const { data, error } = await supabase
    .from('car_locations')
    .insert({
      car_id: carId,
      location_id: locationId
    })
    .select();
  
  if (error) {
    console.error('Error adding car to location:', error);
    throw error;
  }
  
  return { success: true, id: data[0].id };
}

export async function removeCarFromLocation(carId: string, locationId: string) {
  const { error } = await supabase
    .from('car_locations')
    .delete()
    .eq('car_id', carId)
    .eq('location_id', locationId);
  
  if (error) {
    console.error('Error removing car from location:', error);
    throw error;
  }
  
  return { success: true };
}

export async function getLocationsByCarId(carId: string) {
  // First get all location IDs associated with this car
  const { data: carLocationData, error: junctionError } = await supabase
    .from('car_locations')
    .select('location_id')
    .eq('car_id', carId);
  
  if (junctionError) {
    console.error('Error fetching car-location relationships:', junctionError);
    return [];
  }
  
  if (!carLocationData || carLocationData.length === 0) {
    // No locations found for this car
    return [];
  }
  
  // Get the location IDs from the junction data
  const locationIds = carLocationData.map(item => item.location_id);
  
  // Get the actual location data
  const { data: locationsData, error: locationsError } = await supabase
    .from('locations')
    .select('*')
    .in('id', locationIds);
  
  if (locationsError) {
    console.error('Error fetching locations by IDs:', locationsError);
    return [];
  }
  
  return locationsData as Location[];
}