import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

interface RelatedArticlesProps {
  currentPostId: string;
  category: string;
  posts: BlogPost[];
}

export default function RelatedArticles({ currentPostId, category, posts }: RelatedArticlesProps) {
  // Filter out the current post and get related posts from the same category
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">You might also like</h2>
        <Link 
          href="/blogs" 
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
        >
          View all articles →
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
