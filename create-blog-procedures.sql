-- SQL script to create stored procedures for blog operations
-- These procedures will help bypass any RLS issues and ensure consistent operations

-- Create procedure for updating a blog
CREATE OR REPLACE FUNCTION update_blog(
  blog_id UUID,
  blog_title TEXT,
  blog_slug TEXT,
  blog_content TEXT,
  blog_excerpt TEXT,
  blog_cover_image TEXT,
  blog_published_at TIMESTAMPTZ,
  blog_author TEXT,
  blog_category TEXT
) RETURNS VOID AS $$
BEGIN
  -- First check if the blog exists
  IF EXISTS (SELECT 1 FROM blogs WHERE id = blog_id) THEN
    -- Update the blog
    UPDATE blogs
    SET 
      title = blog_title,
      slug = blog_slug,
      content = blog_content,
      excerpt = blog_excerpt,
      cover_image = blog_cover_image,
      published_at = blog_published_at,
      author = blog_author,
      category = blog_category,
      updated_at = NOW()
    WHERE id = blog_id;
  ELSE
    RAISE EXCEPTION 'Blog with ID % not found', blog_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create procedure for inserting a new blog
CREATE OR REPLACE FUNCTION insert_blog(
  blog_title TEXT,
  blog_slug TEXT,
  blog_content TEXT,
  blog_excerpt TEXT,
  blog_cover_image TEXT,
  blog_published_at TIMESTAMPTZ,
  blog_created_at TIMESTAMPTZ,
  blog_author TEXT,
  blog_category TEXT
) RETURNS UUID AS $$
DECLARE
  new_blog_id UUID;
BEGIN
  -- Generate a new UUID
  new_blog_id := gen_random_uuid();
  
  -- Insert the new blog
  INSERT INTO blogs (
    id,
    title,
    slug,
    content,
    excerpt,
    cover_image,
    published_at,
    created_at,
    author,
    category
  ) VALUES (
    new_blog_id,
    blog_title,
    blog_slug,
    blog_content,
    blog_excerpt,
    blog_cover_image,
    blog_published_at,
    blog_created_at,
    blog_author,
    blog_category
  );
  
  RETURN new_blog_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure the blogs table has an updated_at column
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'blogs' AND column_name = 'updated_at'
  ) THEN
    ALTER TABLE blogs ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE;
  END IF;
END $$;

-- Create a trigger to automatically update the updated_at field
CREATE OR REPLACE FUNCTION update_blogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS set_blogs_updated_at ON blogs;

-- Create the trigger
CREATE TRIGGER set_blogs_updated_at
BEFORE UPDATE ON blogs
FOR EACH ROW
EXECUTE FUNCTION update_blogs_updated_at();

-- Grant execute permissions on the functions
GRANT EXECUTE ON FUNCTION update_blog TO service_role;
GRANT EXECUTE ON FUNCTION insert_blog TO service_role;
GRANT EXECUTE ON FUNCTION update_blogs_updated_at TO service_role;
