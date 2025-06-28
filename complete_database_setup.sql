-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. Create Tables
-- =============================================

-- Brands table
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cars table
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  price_per_day INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  fuel_type TEXT NOT NULL,
  seats INTEGER NOT NULL,
  luggage INTEGER NOT NULL,
  description TEXT,
  features TEXT[] DEFAULT '{}',
  main_image TEXT,
  images TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  headline VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Car-Locations junction table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS car_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  location_id UUID NOT NULL REFERENCES locations(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(car_id, location_id)
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT NOT NULL,
  category TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. Create Indexes
-- =============================================

-- Index for car locations
CREATE INDEX IF NOT EXISTS car_locations_car_id_idx ON car_locations(car_id);
CREATE INDEX IF NOT EXISTS car_locations_location_id_idx ON car_locations(location_id);

-- Index for blogs
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs(slug);
CREATE INDEX IF NOT EXISTS blogs_published_idx ON blogs(published);

-- Index for locations
CREATE INDEX IF NOT EXISTS locations_slug_idx ON locations(slug);

-- =============================================
-- 3. Enable Row Level Security (RLS)
-- =============================================
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE car_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. Create Security Policies
-- =============================================

-- Public read access policies
CREATE POLICY "Allow public read access for brands" 
  ON brands FOR SELECT USING (true);

CREATE POLICY "Allow public read access for cars" 
  ON cars FOR SELECT USING (true);

CREATE POLICY "Allow public read access for locations" 
  ON locations FOR SELECT USING (true);

CREATE POLICY "Allow public read access for car_locations" 
  ON car_locations FOR SELECT USING (true);

CREATE POLICY "Allow public read access for testimonials" 
  ON testimonials FOR SELECT USING (true);

CREATE POLICY "Allow public read access for blogs" 
  ON blogs FOR SELECT USING (published = true);

-- Contact form submission policy
CREATE POLICY "Allow public to insert contact messages" 
  ON contact_messages FOR INSERT WITH CHECK (true);

-- Admin access policies (using Supabase auth)
CREATE POLICY "Enable all for admin users"
  ON ALL TABLES
  FOR ALL
  TO service_role;

-- =============================================
-- 5. Create Storage Buckets
-- =============================================

-- Create blog-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for blog-images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

CREATE POLICY "Users can update their own blog images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

CREATE POLICY "Users can delete their own blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images' AND
    (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  );

-- =============================================
-- 6. Create Helper Functions
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_locations_updated_at
BEFORE UPDATE ON locations
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 7. Add Comments
-- =============================================

COMMENT ON TABLE brands IS 'Car brands/manufacturers';
COMMENT ON TABLE cars IS 'Available cars for rent';
COMMENT ON TABLE locations IS 'Car rental service locations';
COMMENT ON TABLE car_locations IS 'Junction table for cars available at specific locations';
COMMENT ON TABLE testimonials IS 'Customer testimonials and reviews';
COMMENT ON TABLE contact_messages IS 'Messages submitted through the contact form';
COMMENT ON TABLE blogs IS 'Blog posts for the car rental website';

-- =============================================
-- 8. Insert Sample Data (Optional)
-- =============================================

-- Uncomment and modify the following section to include sample data
/*
-- Sample brands
INSERT INTO brands (name, logo) VALUES
  ('Hyundai', 'https://example.com/logos/hyundai.png'),
  ('Maruti Suzuki', 'https://example.com/logos/maruti.png'),
  ('Toyota', 'https://example.com/logos/toyota.png'),
  ('Honda', 'https://example.com/logos/honda.png'),
  ('Tata', 'https://example.com/logos/tata.png'),
  ('Mahindra', 'https://example.com/logos/mahindra.png'),
  ('BMW', 'https://example.com/logos/bmw.png'),
  ('Jeep', 'https://example.com/logos/jeep.png')
ON CONFLICT (name) DO NOTHING;
*/

-- =============================================
-- 9. Grant Permissions
-- =============================================

-- Grant necessary permissions to the anon and authenticated roles
GRANTANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON contact_messages TO anon, authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Grant storage permissions
GRANT SELECT ON storage.objects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON storage.objects TO authenticated;

-- =============================================
-- 10. Enable Realtime (if needed)
-- =============================================
-- Uncomment to enable realtime for specific tables
/*
ALTER PUBLICATION supabase_realtime ADD TABLE blogs;
ALTER PUBLICATION supabase_realtime ADD TABLE cars;
*/
