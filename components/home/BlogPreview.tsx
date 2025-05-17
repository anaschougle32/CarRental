import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { blogs } from "@/data/blogs";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/BlogCard";

const BlogPreview = () => {
  // Get the first 3 blogs to display
  const recentBlogs = blogs.slice(0, 3);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {recentBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

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