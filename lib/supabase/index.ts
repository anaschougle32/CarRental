import { createClient } from './client';
import { Car } from '@/lib/types';

// Create a Supabase client
const supabase = createClient();

/**
 * Fetch all cars from the database
 */
export async function getCars() {
  try {
    // Force a new connection to ensure fresh data
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching cars:', error);
      return getFallbackCars();
    }
    
    if (!data || data.length === 0) {
      console.log('No cars found in database, using fallback data');
      return getFallbackCars();
    }
    
    console.log('Successfully fetched', data.length, 'cars from database');
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return getFallbackCars();
  }
}

/**
 * Fetch all brands from the database
 */
export async function getBrands() {
  try {
    // Force a new connection to ensure fresh data
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('name', { ascending: true });
      
    if (error) {
      console.error('Error fetching brands:', error);
      return getFallbackBrands();
    }
    
    if (!data || data.length === 0) {
      console.log('No brands found in database, using fallback data');
      return getFallbackBrands();
    }
    
    console.log('Successfully fetched', data.length, 'brands from database');
    return data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return getFallbackBrands();
  }
}

/**
 * Returns fallback car data when database fetch fails
 */
function getFallbackCars() {
  return [
    {
      id: "fallback-1",
      name: "Swift",
      brand_id: "fallback-brand-1",
      slug: "maruti-swift",
      price_per_day: 1500,
      description: "Compact and fuel-efficient hatchback perfect for city driving.",
      features: ["AC", "Bluetooth", "Power Steering", "Central Locking"],
      fuel_type: "Petrol",
      transmission: "Manual",
      seats: 5,
      min_days: 1,
      main_image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      created_at: new Date().toISOString()
    },
    {
      id: "fallback-2",
      name: "i20",
      brand_id: "fallback-brand-2",
      slug: "hyundai-i20",
      price_per_day: 1800,
      description: "Stylish hatchback with premium features and comfortable interiors.",
      features: ["AC", "Bluetooth", "Power Steering", "Central Locking", "Airbags"],
      fuel_type: "Petrol",
      transmission: "Manual",
      seats: 5,
      min_days: 1,
      main_image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      created_at: new Date().toISOString()
    },
    {
      id: "fallback-3",
      name: "Creta",
      brand_id: "fallback-brand-2",
      slug: "hyundai-creta",
      price_per_day: 2500,
      description: "Spacious SUV with powerful engine and advanced features.",
      features: ["AC", "Bluetooth", "Power Steering", "Central Locking", "Airbags", "Reverse Camera"],
      fuel_type: "Diesel",
      transmission: "Automatic",
      seats: 5,
      min_days: 1,
      main_image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      created_at: new Date().toISOString()
    }
  ];
}

/**
 * Returns fallback brand data when database fetch fails
 */
function getFallbackBrands() {
  return [
    {
      id: "fallback-brand-1",
      name: "Maruti Suzuki",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Maruti_Suzuki_Logo.svg/1200px-Maruti_Suzuki_Logo.svg.png",
      created_at: new Date().toISOString()
    },
    {
      id: "fallback-brand-2",
      name: "Hyundai",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Hyundai_Motor_Company_logo.svg/2560px-Hyundai_Motor_Company_logo.svg.png",
      created_at: new Date().toISOString()
    },
    {
      id: "fallback-brand-3",
      name: "Toyota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png",
      created_at: new Date().toISOString()
    },
    {
      id: "fallback-brand-4",
      name: "Honda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda.svg/2560px-Honda.svg.png",
      created_at: new Date().toISOString()
    }
  ];
}

// Export all functions from blogs.ts
export * from '../blogs';
