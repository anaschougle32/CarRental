import { createClient } from '@/lib/supabase/client';
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

// Create a Supabase client
const supabase = createClient();

/**
 * Fetch all blogs from the database
 */
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching blogs:', error);
      return [];
    }
    
    // Map the database fields to the BlogPost type
    return data.map((blog: BlogDB) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      description: blog.excerpt,
      content: blog.content,
      cover_image: blog.cover_image,
      date: new Date(blog.created_at).toISOString().split('T')[0],
      author: blog.author || 'Admin',
      category: blog.category || 'Travel',
    }));
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

/**
 * Fetch a blog by its slug
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error fetching blog by slug:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    // Map the database fields to the BlogPost type
    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.excerpt,
      content: data.content,
      cover_image: data.cover_image,
      date: new Date(data.created_at).toISOString().split('T')[0],
      author: data.author || 'Admin',
      category: data.category || 'Travel',
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
    // First get the current blog to find its category
    const currentBlog = await getBlogBySlug(currentSlug);
    
    if (!currentBlog) {
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
    
    // Map the database fields to the BlogPost type
    return data.map((blog: BlogDB) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      description: blog.excerpt,
      content: blog.content,
      cover_image: blog.cover_image,
      date: new Date(blog.created_at).toISOString().split('T')[0],
      author: blog.author || 'Admin',
      category: blog.category || 'Travel',
    }));
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    return [];
  }
}
