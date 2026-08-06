-- ==============================================================================
-- SUPABASE SQL FIX FOR BLOGS TABLE (RLS POLICIES & STORED PROCEDURES)
-- Run this script in your Supabase SQL Editor: https://supabase.com/dashboard/project/hpernuejiftklvowsxve/sql
-- ==============================================================================

-- 1. Enable RLS on the blogs table (if not already enabled)
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing restrictive policies on the blogs table if any
DROP POLICY IF EXISTS "Allow public read access" ON public.blogs;
DROP POLICY IF EXISTS "Allow public insert access" ON public.blogs;
DROP POLICY IF EXISTS "Allow public update access" ON public.blogs;
DROP POLICY IF EXISTS "Allow public delete access" ON public.blogs;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.blogs;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.blogs;
DROP POLICY IF EXISTS "Enable update for all users" ON public.blogs;
DROP POLICY IF EXISTS "Enable delete for all users" ON public.blogs;

-- 3. Create full permission RLS policies for anonymous and public access
CREATE POLICY "Allow public read access" ON public.blogs
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON public.blogs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON public.blogs
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete access" ON public.blogs
  FOR DELETE USING (true);

-- 4. Grant table permissions to anon and authenticated roles
GRANT ALL ON TABLE public.blogs TO anon;
GRANT ALL ON TABLE public.blogs TO authenticated;
GRANT ALL ON TABLE public.blogs TO service_role;

-- 5. Stored Procedure: insert_blog (SECURITY DEFINER to bypass all RLS checks)
CREATE OR REPLACE FUNCTION public.insert_blog(
  blog_title text,
  blog_slug text,
  blog_content text,
  blog_excerpt text DEFAULT '',
  blog_cover_image text DEFAULT '',
  blog_published_at timestamp with time zone DEFAULT NULL,
  blog_created_at timestamp with time zone DEFAULT now(),
  blog_author text DEFAULT 'Admin',
  blog_category text DEFAULT 'Travel'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.blogs (
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
END;
$$;

-- 6. Stored Procedure: update_blog (SECURITY DEFINER to bypass all RLS checks)
CREATE OR REPLACE FUNCTION public.update_blog(
  blog_id text,
  blog_title text,
  blog_slug text,
  blog_content text,
  blog_excerpt text DEFAULT '',
  blog_cover_image text DEFAULT '',
  blog_published_at timestamp with time zone DEFAULT NULL,
  blog_author text DEFAULT 'Admin',
  blog_category text DEFAULT 'Travel'
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.blogs
  SET
    title = blog_title,
    slug = blog_slug,
    content = blog_content,
    excerpt = blog_excerpt,
    cover_image = blog_cover_image,
    published_at = blog_published_at,
    author = blog_author,
    category = blog_category,
    updated_at = now()
  WHERE id::text = blog_id OR slug = blog_slug;
END;
$$;

-- 7. Stored Procedure: delete_blog (SECURITY DEFINER to bypass all RLS checks)
CREATE OR REPLACE FUNCTION public.delete_blog(
  blog_id text
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM public.blogs
  WHERE id::text = blog_id;
END;
$$;

-- 8. Grant execute permissions on functions to anon and authenticated users
GRANT EXECUTE ON FUNCTION public.insert_blog TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.update_blog TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.delete_blog TO anon, authenticated, service_role;
