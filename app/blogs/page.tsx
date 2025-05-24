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
  
  // Get featured blog (first blog)
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  // Get remaining blogs
  const remainingBlogs = blogs.length > 0 ? blogs.slice(1) : [];
  
  // Get current date for display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header with search */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 pt-24 pb-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              GoDrive Blog
            </h1>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Featured Post */}
        {featuredBlog && (
          <div className="mb-16">
            <div className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">
              <span className="mr-2">✦</span>
              <span>FEATURED POST</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
                <Image 
                  src={featuredBlog.cover_image} 
                  alt={featuredBlog.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col">
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                    {featuredBlog.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                  {featuredBlog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                  {featuredBlog.description}
                </p>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{featuredBlog.author}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{featuredBlog.date}</p>
                  </div>
                </div>
                <Link 
                  href={`/blogs/${featuredBlog.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Read Article
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Category Tabs */}
        <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide">
          <button className="px-4 py-2 mr-2 text-sm font-medium text-white bg-blue-600 rounded-full whitespace-nowrap">
            All Posts
          </button>
          <button className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
            Travel Tips
          </button>
          <button className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
            Driving Guides
          </button>
          <button className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
            Goa Attractions
          </button>
          <button className="px-4 py-2 mr-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 whitespace-nowrap">
            Car Maintenance
          </button>
        </div>
        
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingBlogs.length > 0 ? (
            remainingBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} />
            ))
          ) : (
            featuredBlog ? null : (
              <div className="col-span-3 text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function BlogCard({ blog }: { blog: BlogPost }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Image 
            src={blog.cover_image} 
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {blog.category}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {blog.description}
          </p>
          <div className="mt-auto flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{blog.author}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{blog.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}