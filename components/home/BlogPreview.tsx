"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs } from "@/lib/blogs";
import { BlogPost } from "@/lib/types";
import { useEffect, useState } from "react";

// Fallback blog data for when database is empty
const fallbackBlogs: BlogPost[] = [
  {
    id: "fallback-1",
    title: "10 Hidden Beaches in Goa You Can Only Reach With a Car",
    slug: "hidden-beaches-in-goa",
    description: "Discover secluded beaches in Goa that are away from the tourist crowds.",
    content: "# 10 Hidden Beaches in Goa\n\nGoa is famous for its beautiful beaches...",
    cover_image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg",
    date: "2023-04-15",
    created_at: "2023-04-15T10:30:00Z",
    author: "Priya Nayak",
    category: "Travel"
  },
  {
    id: "fallback-2",
    title: "The Complete Guide to Driving in Goa",
    slug: "guide-to-driving-in-goa",
    description: "Everything you need to know about road rules and navigation in Goa.",
    content: "# The Complete Guide to Driving in Goa\n\nExploring Goa with your own vehicle...",
    cover_image: "https://images.pexels.com/photos/7876379/pexels-photo-7876379.jpeg",
    date: "2023-07-05",
    created_at: "2023-07-05T14:15:00Z",
    author: "Anjali Menon",
    category: "Travel Tips"
  },
  {
    id: "fallback-3",
    title: "5 Scenic Drives in Goa You Shouldn't Miss",
    slug: "scenic-drives-in-goa",
    description: "Explore the most beautiful routes for a road trip in Goa.",
    content: "# 5 Scenic Drives in Goa\n\nWith its winding coastal roads and lush landscapes...",
    cover_image: "https://images.pexels.com/photos/1252500/pexels-photo-1252500.jpeg",
    date: "2023-08-12",
    created_at: "2023-08-12T09:45:00Z",
    author: "Rahul Sharma",
    category: "Travel"
  }
];

const BlogPreview = () => {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Add a small delay to prevent immediate state updates that might cause issues
        await new Promise((resolve) => setTimeout(resolve, 100));
        
        const blogs = await getBlogs();
        
        // Only update state if component is still mounted
        if (isMounted) {
          // If no blogs are returned, use fallback static data
          if (blogs && blogs.length > 0) {
            // Get the first 3 blogs to display
            setRecentBlogs(blogs.slice(0, 3));
          } else {
            // Use fallback blogs if no blogs are available from the database
            console.log('No blogs found in database, using fallback data');
            setRecentBlogs(fallbackBlogs);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        if (isMounted) {
          // Use fallback blogs on error
          console.log('Error fetching blogs, using fallback data');
          setRecentBlogs(fallbackBlogs);
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    
    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Travel Tips & Guides
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Discover Goa through our blog. From hidden beaches to driving tips, we've got you covered.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : recentBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {recentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400">
              No blogs available at the moment. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" className="group">
              View All Blog Posts
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
