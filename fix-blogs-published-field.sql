-- SQL script to fix the blogs table schema issue with published vs published_at
-- This addresses the core issue where the code is using published_at but the database might have published

-- First, check if the published column exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'published'
  ) THEN
    -- If published exists but published_at doesn't, add published_at
    IF NOT EXISTS (
      SELECT 1 
      FROM information_schema.columns 
      WHERE table_name = 'blogs' AND column_name = 'published_at'
    ) THEN
      -- Add published_at column
      ALTER TABLE blogs ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
      
      -- Copy data from published to published_at
      UPDATE blogs 
      SET published_at = CASE 
        WHEN published = true THEN NOW() 
        ELSE NULL 
      END;
    END IF;
  ELSE
    -- If published doesn't exist but we need it, add it
    IF NOT EXISTS (
      SELECT 1 
      FROM information_schema.columns 
      WHERE table_name = 'blogs' AND column_name = 'published_at'
    ) THEN
      ALTER TABLE blogs ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;
  END IF;
END $$;

-- Make sure cover_image exists (it should be used instead of main_image)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'cover_image'
  ) THEN
    ALTER TABLE blogs ADD COLUMN cover_image TEXT;
  END IF;
  
  -- If main_image exists, copy data to cover_image
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'main_image'
  ) THEN
    UPDATE blogs 
    SET cover_image = main_image 
    WHERE cover_image IS NULL OR cover_image = '';
  END IF;
END $$;

-- Make sure author and category exist
ALTER TABLE blogs 
ADD COLUMN IF NOT EXISTS author TEXT DEFAULT 'Admin',
ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Travel';

-- Update any blogs with null or empty cover_image to use a placeholder
UPDATE blogs
SET cover_image = 'https://placehold.co/600x400/png?text=Blog+Image'
WHERE cover_image IS NULL OR cover_image = '';

-- Set published_at for any blogs that don't have it set
UPDATE blogs
SET published_at = NOW()
WHERE published_at IS NULL;
