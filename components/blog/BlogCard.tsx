import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { formatDistance } from "date-fns";
import { BlogPost } from "@/lib/types";
import { Blog } from "@/lib/supabase";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  blog: BlogPost | Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  // Determine the date to use for time calculation
  let dateString = new Date().toISOString(); // Default fallback
  
  if ('date' in blog && typeof blog.date === 'string') {
    dateString = blog.date;
  } else if ('created_at' in blog && typeof blog.created_at === 'string') {
    dateString = blog.created_at;
  }
  
  // Calculate how long ago the post was published
  const timeAgo = formatDistance(
    new Date(dateString),
    new Date(),
    { addSuffix: true }
  );
  
  // Handle different data structures between BlogPost and Blog
  const category = 'category' in blog ? blog.category : 'Travel';
  const description = 'description' in blog ? blog.description : blog.excerpt;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.cover_image}
          alt={blog.title}
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
        
        <h3 className="font-bold text-xl mb-2 line-clamp-2">
          <Link href={`/blogs/${blog.slug}`} className="hover:text-blue-600 transition-colors">
            {blog.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-2">
        <Button variant="link" className="p-0 h-auto" asChild>
          <Link href={`/blogs/${blog.slug}`} className="text-blue-600 dark:text-blue-400">
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;