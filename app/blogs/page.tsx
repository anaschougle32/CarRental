import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/blogs";
import { BlogPost } from "@/lib/types";

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Goa Travel Tips, Driving Guides & Car Rental Advice | ZoiCarRentals Blog",
  description: "Discover expert travel tips for Goa, driving guides, beach recommendations, and car rental advice to make the most of your Goa vacation. Updated regularly with local insights.",
  keywords: "car rental blog Goa, Goa travel tips, driving in Goa, self drive advice, Goa beaches, Goa attractions, best places to visit in Goa, North Goa guide, South Goa guide, car rental tips, Goa road trips, Goa travel blog",
  openGraph: {
    title: "Goa Travel Tips & Car Rental Advice | ZoiCarRentals Blog",
    description: "Expert travel guides, driving tips, and local recommendations for your perfect Goa vacation. Find the best beaches, attractions, and car rental advice.",
    url: "https://zoicarrentals.com/blogs",
    siteName: "ZoiCarRentals",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/images/blog/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "ZoiCarRentals Blog - Goa Travel Tips and Guides"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Goa Travel Tips & Car Rental Advice | ZoiCarRentals",
    description: "Expert travel guides and local recommendations for your perfect Goa vacation.",
    images: ["/images/blog/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://zoicarrentals.com/blogs",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      {/* Breadcrumbs for SEO */}
      <nav className="container mx-auto px-4 md:px-6 pt-24 pb-2 text-sm" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </li>
          <li>
            <span className="text-gray-500" aria-current="page">Blog</span>
          </li>
        </ol>
      </nav>
      
      {/* Header with search */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 pt-4 pb-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              ZoiCarRentals Blog: Goa Travel Tips & Guides
            </h1>
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search articles..." 
                aria-label="Search blog articles"
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Introduction for SEO */}
        <div className="mb-8">
          <p className="text-gray-700 dark:text-gray-300">
            Welcome to the ZoiCarRentals blog, your ultimate guide to exploring Goa. Discover expert travel tips, driving guides, 
            beach recommendations, and car rental advice to make the most of your Goa vacation. Our local experts regularly update 
            this blog with insider knowledge about the best places to visit, hidden gems, and practical information for your trip.
          </p>
        </div>
        
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
                  alt={`${featuredBlog.title} - Goa Travel Guide by ZoiCarRentals`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
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
                  {featuredBlog.excerpt || featuredBlog.description}
                </p>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{featuredBlog.author || 'ZoiCarRentals Team'}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {featuredBlog.created_at ? new Date(featuredBlog.created_at).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : new Date().toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <Link 
                  href={`/blogs/${featuredBlog.slug}`}
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  aria-label={`Read full article about ${featuredBlog.title}`}
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
  // Format the date properly for SEO
  const formattedDate = blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';
  
  return (
    <Link href={`/blogs/${blog.slug}`} className="group block" aria-label={`Read article: ${blog.title}`}>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Image 
            src={blog.cover_image} 
            alt={`${blog.title} - Goa Travel Guide by ZoiCarRentals`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-3">
            <span className="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {blog.category || 'Goa Travel Guide'}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {blog.excerpt || blog.description}
          </p>
          <div className="mt-auto flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{blog.author || 'ZoiCarRentals Team'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}