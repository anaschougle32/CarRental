import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { formatDistance } from "date-fns";
import type { BlogPost } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost | null | undefined;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Handle loading/error state with skeleton
  if (!post) {
    return (
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse" />
        <CardContent className="flex-1 pt-6 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </CardContent>
      </Card>
    );
  }

  // Safely extract post data with fallbacks
  const { 
    created_at, 
    category = 'Travel', 
    excerpt = '', 
    title = 'Untitled Post', 
    slug = '', 
    cover_image 
  } = post;

  // Calculate how long ago the post was published
  const timeAgo = created_at 
    ? formatDistance(new Date(created_at), new Date(), { addSuffix: true })
    : 'Recently';
    
  const description = excerpt;
  const coverImage = cover_image || '/images/blog-placeholder.jpg';

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            // Fallback to placeholder if image fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/images/blog-placeholder.jpg';
          }}
        />
        {category && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
            {category}
          </span>
        )}
      </div>
      
      <CardContent className="flex-1 pt-6">
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
          <CalendarDays size={14} className="mr-2" />
          <span>{timeAgo}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Link href={`/blogs/${slug}`}>
            {title}
          </Link>
        </h3>
        
        {description && (
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {description}
          </p>
        )}
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link href={`/blogs/${slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;