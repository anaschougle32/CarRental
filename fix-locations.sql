-- SQL Script to fix locations in the database
-- This script will insert locations if they don't exist

-- Begin transaction
BEGIN;

-- First check if the locations table exists
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'locations') THEN
    -- Create the locations table if it doesn't exist
    CREATE TABLE locations (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      headline VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create index on slug for faster lookups
    CREATE INDEX IF NOT EXISTS locations_slug_idx ON locations(slug);
  END IF;
END
$$;

-- Insert basic locations if they don't exist
INSERT INTO locations (name, slug, headline, content, created_at, updated_at)
VALUES 
('Calangute', 'calangute', 'Premium Car Rental Service in Calangute, Goa', 'Find the best car rental deals in Calangute, Goa with ZoiCarRentals. We offer a wide range of vehicles from economy to luxury cars.', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO locations (name, slug, headline, content, created_at, updated_at)
VALUES 
('Anjuna', 'anjuna', 'Premium Car Rental Service in Anjuna, North Goa', 'Looking for a reliable car rental in Anjuna, Goa? ZoiCarRentals offers a wide range of vehicles to suit your needs.', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO locations (name, slug, headline, content, created_at, updated_at)
VALUES 
('Panjim', 'panjim', 'Reliable Car Rental Service in Panjim, Goa''s Capital', 'Explore Goa''s charming capital city with a car rental from ZoiCarRentals in Panjim.', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO locations (name, slug, headline, content, created_at, updated_at)
VALUES 
('Goa Airport', 'goa-airport', 'Convenient Car Rental Service at Dabolim Airport (GOI)', 'Start your Goa adventure right from the airport with ZoiCarRentals at Goa Airport (Dabolim).', NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- Commit the changes
COMMIT;
