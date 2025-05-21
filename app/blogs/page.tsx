import { Metadata } from "next";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogs, Blog } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Travel Tips, Driving Guides & Rental Advice – Blog",
  description: "Read our travel blog for tips on exploring Goa, driving guides, and advice for making the most of your self-drive car rental experience.",
  keywords: "car rental blog, Goa travel tips, driving in Goa, self drive advice",
};

export default async function BlogsPage() {
  // Fetch blogs from Supabase
  const blogs = await getBlogs();
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Our Travel Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Discover travel tips, driving guides, and recommendations for making the most of your Goan adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}