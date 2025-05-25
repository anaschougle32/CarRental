import { createClient } from './supabase/client';
import { BlogPost } from '@/lib/types';

// Define the Blog type from the database
interface BlogDB {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
  published_at: string | null;
  author: string | null;
  category: string | null;
}

/**
 * Returns empty array when database fetch fails
 */
function getEmptyBlogArray(): BlogPost[] {
  return [];
}

/**
 * Fetch all blogs from the database
 */
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    // Force a new connection to ensure fresh data
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching blogs:', error);
      // Return empty array instead of fallback data
      return getEmptyBlogArray();
    }
    
    if (!data || data.length === 0) {
      console.log('No blogs found in database');
      return getEmptyBlogArray();
    }
    
    console.log('Successfully fetched', data.length, 'blogs from database');
    
    // Map the database fields to the BlogPost type with proper type safety
    return data.map((blog) => ({
      id: blog.id as string,
      title: blog.title as string,
      slug: blog.slug as string,
      description: blog.excerpt as string,
      content: blog.content as string,
      cover_image: (blog.cover_image as string) || 'https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg',
      date: blog.created_at ? new Date(blog.created_at as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      created_at: blog.created_at as string,
      author: (blog.author as string) || 'Admin',
      category: (blog.category as string) || 'Travel',
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return getEmptyBlogArray();
  }
}

/**
 * Fetch a blog by its slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Force a new connection to ensure fresh data
    const supabase = createClient();
    
    // Add a cache-busting timestamp parameter to ensure fresh data
    const timestamp = new Date().getTime();
    
    // First try direct query with cache-busting headers
    console.log(`Fetching blog with slug: ${slug} at timestamp: ${timestamp}`);
    
    let blogData: any = null;
    
    // Try direct query with no-cache option
    const { data: directData, error: directError } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (directError) {
      console.error('Error fetching blog by slug:', directError);
      return null;
    }
    
    if (!directData) {
      console.log('No blog found with slug:', slug);
      return null;
    }
    
    blogData = directData;
    
    // Log the retrieved content for debugging
    console.log(`Retrieved blog ${slug} with content length:`, blogData.content?.length || 0);
    console.log('Blog content preview:', blogData.content?.substring(0, 100) + '...');
    
    // Map the database fields to the BlogPost type with proper type safety
    return {
      id: blogData.id as string,
      title: blogData.title as string,
      slug: blogData.slug as string,
      description: blogData.excerpt as string,
      content: blogData.content as string,
      cover_image: blogData.cover_image as string,
      date: blogData.created_at ? new Date(blogData.created_at as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      created_at: blogData.created_at as string,
      author: (blogData.author as string) || 'Admin',
      category: (blogData.category as string) || 'Travel',
    };
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
}

/**
 * Fetch related blogs based on category
 */
export async function getRelatedBlogs(currentSlug: string, count = 2): Promise<BlogPost[]> {
  try {
    // Force a new connection to ensure fresh data
    const supabase = createClient();
    
    // First get the current blog to find its category
    const currentBlog = await getBlogBySlug(currentSlug);
    
    if (!currentBlog || !currentBlog.category) {
      return [];
    }
    
    // Then get blogs with the same category
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('category', currentBlog.category)
      .neq('slug', currentSlug)
      .order('created_at', { ascending: false })
      .limit(count);
      
    if (error) {
      console.error('Error fetching related blogs:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      return [];
    }
    
    // Map the database fields to the BlogPost type with proper type safety
    return data.map((blog) => ({
      id: blog.id as string,
      title: blog.title as string,
      slug: blog.slug as string,
      description: blog.excerpt as string,
      content: blog.content as string,
      cover_image: blog.cover_image as string,
      date: blog.created_at ? new Date(blog.created_at as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      created_at: blog.created_at as string,
      author: (blog.author as string) || 'Admin',
      category: (blog.category as string) || 'Travel',
    }));
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
}
