-- Create blogs table with the correct schema
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
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policy to allow public access to blog images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

-- Set up storage policy to allow authenticated users to insert/update/delete blog images
CREATE POLICY "Authenticated Users Can Upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Can Update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated Users Can Delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
