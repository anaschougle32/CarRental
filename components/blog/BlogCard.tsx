import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatDistance } from "date-fns";
import type { BlogPost } from "@/types/blog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  // Calculate how long ago the post was published
  const timeAgo = formatDistance(
    new Date(post.created_at),
    new Date(),
    { addSuffix: true }
  );
  
  const category = post.category || 'Travel';
  const description = post.excerpt || '';

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.cover_image || '/images/blog-placeholder.jpg'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 text-xs rounded-full">
          {category}
        </span>
      </div>
      
      <CardContent className="flex-1 pt-6">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <CalendarDays size={14} className="mr-2" />
          <span>{timeAgo}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <Link href={`/blogs/${post.slug}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link href={`/blogs/${post.slug}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;