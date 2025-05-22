-- Create blogs table with the correct schema (will not affect existing data)
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  author TEXT DEFAULT 'Admin',
  category TEXT DEFAULT 'Travel'
);

-- Create storage bucket for blog images if it doesn't exist
-- Note: This assumes the storage API is available and you have permissions
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Add sample blogs if none exist
INSERT INTO blogs (title, slug, content, excerpt, cover_image, published_at, author, category)
SELECT 
  'Road Trip Essentials',
  'road-trip-essentials',
  'Planning a road trip? Here are the essentials you need to pack...',
  'Everything you need for your next adventure on the road',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  NOW(),
  'Admin',
  'Travel'
WHERE NOT EXISTS (SELECT 1 FROM blogs LIMIT 1);

INSERT INTO blogs (title, slug, content, excerpt, cover_image, published_at, author, category)
SELECT 
  'Best Family Cars of 2025',
  'best-family-cars-2025',
  'Looking for a family car? Here are our top picks for 2025...',
  'The ultimate guide to family-friendly vehicles',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
  NOW(),
  'Admin',
  'Reviews'
WHERE NOT EXISTS (SELECT 1 FROM blogs LIMIT 1);
