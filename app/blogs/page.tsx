import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/blogs";
import { BlogPost } from "@/lib/types";

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Travel Tips, Driving Guides & Rental Advice – Blog",
  description: "Read our travel blog for tips on exploring Goa, driving guides, and advice for making the most of your self-drive car rental experience.",
  keywords: "car rental blog, Goa travel tips, driving in Goa, self drive advice",
};

export default async function BlogsPage() {
  // Fetch blogs from Supabase
  const blogs = await getBlogs();
  
  // Get current date for display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[400px]">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: `url('/images/blog-banner.jpg')` }}
        />
        <div className="absolute inset-0 bg-blue-900/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
              Our Travel Blog
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto drop-shadow-md">
              Discover travel tips, driving guides, and recommendations for making the most of your Goan adventure.
            </p>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Date Display */}
        <div className="text-right text-gray-500 mb-8">
          <p>{formattedDate}</p>
        </div>
        
        {/* Blog Grid */}
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
    </div>
  );
}

function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          <Image 
            src={blog.cover_image} 
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {blog.category}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {blog.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-sm">{blog.date}</span>
            <span className="text-blue-600 font-medium text-sm group-hover:underline">Read More</span>
          </div>
        </div>
      </div>
    </Link>
  );
}