import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const results = {
    connection: { success: false, message: '' },
    tables: {
      brands: { exists: false, count: 0 },
      cars: { exists: false, count: 0 },
      testimonials: { exists: false, count: 0 },
      contact_messages: { exists: false, count: 0 },
    },
    sample_data: {
      car: null,
      brand: null,
    }
  };
  
  // Test connection
  try {
    const { data, error } = await supabase.from('cars').select('count');
    if (error) {
      results.connection = {
        success: false,
        message: `Error connecting to Supabase: ${error.message}`
      };
      return NextResponse.json(results);
    } else {
      results.connection = {
        success: true,
        message: 'Successfully connected to Supabase'
      };
    }
  } catch (error) {
    results.connection = {
      success: false,
      message: `Error testing Supabase connection: ${error instanceof Error ? error.message : String(error)}`
    };
    return NextResponse.json(results);
  }
  
  // Check tables and counts
  try {
    // Check brands table
    const { data: brandsCount, error: brandsError } = await supabase
      .from('brands')
      .select('count');
      
    if (!brandsError) {
      results.tables.brands.exists = true;
      results.tables.brands.count = brandsCount?.[0]?.count || 0;
    }
    
    // Check cars table
    const { data: carsCount, error: carsError } = await supabase
      .from('cars')
      .select('count');
      
    if (!carsError) {
      results.tables.cars.exists = true;
      results.tables.cars.count = carsCount?.[0]?.count || 0;
    }
    
    // Check testimonials table
    const { data: testimonialsCount, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('count');
      
    if (!testimonialsError) {
      results.tables.testimonials.exists = true;
      results.tables.testimonials.count = testimonialsCount?.[0]?.count || 0;
    }
    
    // Check contact_messages table
    const { data: contactMessagesCount, error: contactMessagesError } = await supabase
      .from('contact_messages')
      .select('count');
      
    if (!contactMessagesError) {
      results.tables.contact_messages.exists = true;
      results.tables.contact_messages.count = contactMessagesCount?.[0]?.count || 0;
    }
    
    // Get sample data
    if (results.tables.brands.count > 0) {
      const { data: brandSample } = await supabase
        .from('brands')
        .select('*')
        .limit(1)
        .single();
      
      results.sample_data.brand = brandSample;
    }
    
    if (results.tables.cars.count > 0) {
      const { data: carSample } = await supabase
        .from('cars')
        .select('*')
        .limit(1)
        .single();
      
      results.sample_data.car = carSample;
    }
  } catch (error) {
    // Just continue, we've gathered what we could
  }
  
  return NextResponse.json(results);
} 