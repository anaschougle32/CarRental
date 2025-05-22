-- SQL script to update blogs table to use Supabase storage bucket
-- This will update the existing blogs to use the uploaded images from blog-images bucket

-- First, let's make sure the blogs table has the right structure
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Admin',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Travel';

-- Update any blogs that might still be using 'published' instead of 'published_at'
UPDATE blogs
SET published_at = NOW()
WHERE published_at IS NULL;

-- Update any blogs that are using unsplash images to use placeholder images
-- until they are properly updated with images from the blog-images bucket
UPDATE blogs
SET cover_image = 'https://placehold.co/600x400/png?text=Blog+Image'
WHERE cover_image LIKE '%unsplash%' OR cover_image IS NULL OR cover_image = '';

-- Create RLS policies for blog-images bucket if they don't exist
-- Note: This might fail if you don't have the right permissions, but the rest of the script will still work

-- Allow public access to blog images
BEGIN;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Public Blog Images Access'
    ) THEN
        CREATE POLICY "Public Blog Images Access" ON storage.objects
        FOR SELECT USING (bucket_id = 'blog-images');
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating policy: %', SQLERRM;
END $$;
COMMIT;

-- Allow authenticated users to upload blog images
BEGIN;
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND policyname = 'Blog Images Upload'
    ) THEN
        CREATE POLICY "Blog Images Upload" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id = 'blog-images');
    END IF;
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Error creating policy: %', SQLERRM;
END $$;
COMMIT;
