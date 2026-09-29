import { createClient } from './supabase/client';
import { BlogPost } from '@/types/blog';

/**
 * Supabase error objects have custom fields that don't serialize with
 * console.error('msg', error) — they print as {}. Use this helper.
 */
function logSupabaseError(context: string, error: { message?: string; code?: string; details?: string; hint?: string } | null) {
  if (!error) return;
  console.error(
    `[Supabase] ${context}\n`,
    `  message : ${error.message ?? '—'}\n`,
    `  code    : ${error.code ?? '—'}\n`,
    `  details : ${error.details ?? '—'}\n`,
    `  hint    : ${error.hint ?? '—'}`,
  );
}

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
  published_at?: string | null;
  author: string | null;
  category: string | null;
}

import { fallbackBlogs } from '@/data/fallback-blogs';

/**
 * Returns fallback blogs when database fetch fails
 */
function getEmptyBlogArray(): BlogPost[] {
  return fallbackBlogs;
}

/**
 * Fetch all blogs from the database (lightweight metadata for listing pages)
 */
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const supabase = createClient();
    
    // Select only columns needed for listing cards — omits multi-megabyte markdown 'content' column
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, slug, excerpt, cover_image, created_at, updated_at, published_at, author, category')
      .order('created_at', { ascending: false });
      
    // Only fall back on actual API/database error
    if (error) {
      logSupabaseError('getBlogs', error);
      console.warn('[Supabase Fallback] Using fallback blogs due to database error/restriction');
      return fallbackBlogs;
    }
    
    // Genuine database result: if there are 0 published blogs, return []
    if (!data || data.length === 0) {
      return [];
    }
    
    // Map the database fields to the BlogPost type with proper type safety
    return (data as any[]).map((blog) => {
      const updatedAt = blog.updated_at || blog.created_at || new Date().toISOString();
      const createdAt = blog.created_at || new Date().toISOString();
      const isPublished = blog.published_at !== undefined ? Boolean(blog.published_at) : (blog.published ?? true);
      
      return {
        id: blog.id,
        title: blog.title || 'Untitled Post',
        slug: blog.slug || `post-${Date.now()}`,
        description: blog.excerpt || '',
        excerpt: blog.excerpt || '',
        content: '', // content omitted for listings to minimize egress
        cover_image: blog.cover_image || '/images/blog-placeholder.jpg',
        created_at: createdAt,
        updated_at: updatedAt,
        published: isPublished,
        author: blog.author || null,
        category: blog.category || null,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching blogs, using fallback data:', error);
    return fallbackBlogs;
  }
}

/**
 * Fetch a single blog post by its slug from Supabase
 */
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = createClient();
    
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
        published_at?: string | null;
        author: string | null;
        category: string | null;
      }>();

    if (directError) {
      // PGRST116 means genuine 404 (0 rows matched)
      if (directError.code === 'PGRST116') {
        return null;
      }
      console.warn(`[Supabase Fallback] Error fetching blog ${slug}:`, directError.message);
      // Actual database failure: check fallback
      const fallback = fallbackBlogs.find(b => b.slug === slug);
      if (fallback) return fallback;
      return null;
    }
    
    if (!directData) {
      return null;
    }
    
    const updatedAt = directData.updated_at || directData.created_at || new Date().toISOString();
    const createdAt = directData.created_at || new Date().toISOString();
    const isPublished = (directData as any).published_at !== undefined
      ? Boolean((directData as any).published_at)
      : (directData.published ?? true);
    
    return {
      id: directData.id,
      title: directData.title || 'Untitled Post',
      slug: directData.slug || `post-${Date.now()}`,
      description: directData.excerpt || '',
      excerpt: directData.excerpt || '',
      content: directData.content || '',
      cover_image: directData.cover_image,
      created_at: createdAt,
      updated_at: updatedAt,
      published: isPublished,
      author: directData.author,
      category: directData.category,
    } as BlogPost;
  } catch (error) {
    const fallback = fallbackBlogs.find(b => b.slug === slug);
    if (fallback) return fallback;
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
      const isPublished = (blog as any).published_at !== undefined
        ? Boolean((blog as any).published_at)
        : ((blog as any).published ?? true);
      
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
        published: isPublished,
        author: blog.author || null,
        category: blog.category || null,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error in getRelatedBlogs:', error);
    return [];
  }
}
