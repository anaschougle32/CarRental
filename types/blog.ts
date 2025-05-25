export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string | null;
  created_at: string;
  updated_at?: string;
  published: boolean;
  author: string | null;
  author_bio?: string;
  category: string | null;
  tags?: string[];
  views?: number;
  description?: string;
  featured?: boolean;
  reading_time?: number;
  // SEO fields
  meta_title?: string;
  meta_description?: string;
  // Social sharing
  social_image?: string | null;
}
