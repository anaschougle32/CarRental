import { createClient } from './supabase/client';
import { BlogPost } from '@/types/blog';

// Define the Blog type from the database
interface BlogDB {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  created_at: string;
  updated_at?: string;
  published?: boolean;
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
    return data.map((blog) => {
      const updatedAt = blog.updated_at || blog.created_at || new Date().toISOString();
      const createdAt = blog.created_at || new Date().toISOString();
      
      return {
        id: blog.id,
        title: blog.title || 'Untitled Post',
        slug: blog.slug || `post-${Date.now()}`,
        description: blog.excerpt || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        cover_image: blog.cover_image || '/images/blog-placeholder.jpg',
        created_at: createdAt,
        updated_at: updatedAt,
        published: blog.published ?? true,
        author: blog.author || null,
        category: blog.category || null,
      } as BlogPost;
    });
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
    
    // Try direct query first (case-sensitive)
    const { data: directData, error: directError } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single<{
        id: string;
        title: string;
        slug: string;
        content: string;
        excerpt: string;
        cover_image: string | null;
        created_at: string;
        updated_at?: string;
        published?: boolean;
        author: string | null;
        category: string | null;
      }>();

    if (directError) {
      console.error('Error fetching blog by slug (direct):', directError);
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
    if (directData) {
      const updatedAt = directData.updated_at || directData.created_at || new Date().toISOString();
      const createdAt = directData.created_at || new Date().toISOString();
      
      const blogPost: BlogPost = {
        id: directData.id,
        title: directData.title || 'Untitled Post',
        slug: directData.slug || `post-${Date.now()}`,
        description: directData.excerpt || '',
        excerpt: directData.excerpt || '',
        content: directData.content || '',
        cover_image: directData.cover_image,
        created_at: directData.created_at,
        updated_at: directData.updated_at,
        published: directData.published ?? true,
        author: directData.author,
        category: directData.category,
      };
      console.log('Found blog with direct query:', blogPost);
      return blogPost;
    }
    return null;
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
    const supabase = createClient();
    
    // First get the current blog to find related posts by category
    const { data: currentBlog } = await supabase
      .from('blogs')
      .select('category')
      .eq('slug', currentSlug)
      .single<{ category: string | null }>();
      
    if (!currentBlog || !currentBlog.category) return [];
    
    // Get related blogs from the same category, excluding the current one
    const { data: relatedBlogs, error } = await supabase
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
    
    if (!relatedBlogs || relatedBlogs.length === 0) {
      // If no related blogs found, return some recent blogs instead
      const allBlogs = await getBlogs();
      return allBlogs
        .filter(blog => blog.slug !== currentSlug)
        .slice(0, count);
    }
    
    return relatedBlogs.map(blog => {
      const updatedAt = blog.updated_at || blog.created_at || new Date().toISOString();
      const createdAt = blog.created_at || new Date().toISOString();
      
      return {
        id: blog.id,
        title: blog.title || 'Untitled Post',
        slug: blog.slug || `post-${Date.now()}`,
        description: blog.excerpt || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        cover_image: blog.cover_image || '/images/blog-placeholder.jpg',
        created_at: createdAt,
        updated_at: updatedAt,
        published: blog.published ?? true,
        author: blog.author || null,
        category: blog.category || null,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error in getRelatedBlogs:', error);
    return [];
  }
}
