import { createClient } from './client';
import { createAdminClient } from './admin-client';
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
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No cars found in database');
      return [];
    }
    
    console.log('Successfully fetched', data.length, 'cars from database');
    return data;
  } catch (error) {
    console.error('Error fetching cars:', error);
    return [];
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
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('No brands found in database');
      return [];
    }
    
    console.log('Successfully fetched', data.length, 'brands from database');
    return data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}





/**
 * Submit contact form data to database
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    const supabase = createClient();
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
      }]);
      
    if (error) {
      console.error('Error submitting contact form:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}

/**
 * Submit booking inquiry from hero form
 */
export async function submitBookingInquiry(data: {
  name: string;
  phone: string;
  pickup_location: string;
  drop_location: string;
  pickup_date: string;
  pickup_time: string;
  drop_date: string;
  drop_time: string;
}) {
  try {
    const supabase = createClient();
    
    const { data: insertedData, error } = await supabase
      .from('booking_inquiries')
      .insert([{
        name: data.name,
        phone: data.phone,
        pickup_location: data.pickup_location,
        drop_location: data.drop_location,
        pickup_date: data.pickup_date,
        pickup_time: data.pickup_time,
        drop_date: data.drop_date,
        drop_time: data.drop_time
      }])
      .select();
      
    if (error) {
      console.error('Error submitting booking inquiry:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Error submitting booking inquiry:', error);
    return { success: false, error: 'Failed to submit booking inquiry' };
  }
}

/**
 * Fetch all contact messages for admin
 */
export async function getContactMessages() {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    return [];
  }
}

/**
 * Fetch all booking inquiries for admin
 */
export async function getBookingInquiries() {
  try {
    const supabase = createAdminClient();
    
    const { data, error } = await supabase
      .from('booking_inquiries')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching booking inquiries:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching booking inquiries:', error);
    return [];
  }
}

/**
 * Update booking inquiry status
 */
export async function updateBookingInquiryStatus(id: string, status: 'pending' | 'contacted' | 'booked' | 'cancelled') {
  try {
    const supabase = createAdminClient();
    
    const { error } = await supabase
      .from('booking_inquiries')
      .update({ status })
      .eq('id', id);
      
    if (error) {
      console.error('Error updating booking inquiry status:', error);
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error updating booking inquiry status:', error);
    return { success: false, error: 'Failed to update status' };
  }
}

// Export all functions from blogs.ts
export * from '../blogs';
