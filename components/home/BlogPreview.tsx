"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs } from "@/lib/blogs";
import { BlogPost } from "@/lib/types";
import { useEffect, useState } from "react";

const BlogPreview = () => {
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setLoading(true);
        const blogs = await getBlogs();
        // Get the first 3 blogs to display
        setRecentBlogs(blogs.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
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

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/blogs" className="inline-flex items-center gap-2">
              Read More Articles <ChevronRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;