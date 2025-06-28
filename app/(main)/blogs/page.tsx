import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/blogs";
import { BlogPost } from "@/types/blog";

// Disable caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Goa Travel Tips, Driving Guides & Car Rental Advice | ZioCarRentals Blog",
  description: "Discover expert travel tips for Goa, driving guides, beach recommendations, and car rental advice to make the most of your Goa vacation. Updated regularly with local insights.",
  keywords: "car rental blog Goa, Goa travel tips, driving in Goa, self drive advice, Goa beaches, Goa attractions, best places to visit in Goa, North Goa guide, South Goa guide, car rental tips, Goa road trips, Goa travel blog",
  openGraph: {
    title: "Goa Travel Tips & Car Rental Advice | ZioCarRentals Blog",
    description: "Expert travel guides, driving tips, and local recommendations for your perfect Goa vacation. Find the best beaches, attractions, and car rental advice.",
    url: "https://ziocarrentals.com/blogs",
    siteName: "ZioCarRentals",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/images/blog/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "ZioCarRentals Blog - Goa Travel Tips and Guides"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Goa Travel Tips & Car Rental Advice | ZioCarRentals",
    description: "Expert travel guides and local recommendations for your perfect Goa vacation.",
    images: ["/images/blog/twitter-image.jpg"],
  },
  alternates: {
    canonical: "https://ziocarrentals.com/blogs",
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
  const blogsResponse = await getBlogs();
  const blogs: BlogPost[] = Array.isArray(blogsResponse) ? blogsResponse : [];
  
  // Get first blog as featured (since we don't have a featured flag)
  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  // Get remaining blogs (exclude the first one)
  const remainingBlogs = blogs.length > 1 ? blogs.slice(1) : [];
  
  // Categories for filtering
  const categories = ['All', 'Travel Tips', 'Driving Guides', 'Goa Attractions', 'Car Maintenance'];
  
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
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The ZioCarRentals Blog</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover the best travel tips, driving guides, and local insights for your perfect Goa vacation.
          </p>
          <div className="mt-8 max-w-2xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Search articles..." 
              aria-label="Search blog articles"
              className="w-full px-6 py-4 rounded-full border-0 shadow-lg focus:ring-2 focus:ring-blue-400 text-gray-800"
            />
            <button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button 
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'All' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Featured Post */}
        {featuredBlog && (
          <div className="mb-16 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="relative">
              <div className="absolute top-6 left-6 z-10">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white">
                  FEATURED
                </span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-[400px]">
                  <Image 
                    src={featuredBlog.cover_image || '/images/placeholder-blog.jpg'}
                    alt={featuredBlog.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/30 lg:to-transparent" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white dark:bg-gray-800">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs font-medium px-3 py-1 rounded-full">
                      {featuredBlog.category || 'Travel Guide'}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    <Link href={`/blogs/${featuredBlog.slug}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {featuredBlog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 line-clamp-3">
                    {featuredBlog.excerpt || featuredBlog.description}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                        {(featuredBlog.author || 'ZT').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {featuredBlog.author || 'ZioCarRentals Team'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {featuredBlog.created_at ? new Date(featuredBlog.created_at).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'Recent'}
                        </p>
                      </div>
                    </div>
                    <Link 
                      href={`/blogs/${featuredBlog.slug}`}
                      className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      aria-label={`Read full article: ${featuredBlog.title}`}
                    >
                      Read Full Story
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Section Title */}
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Latest Articles</h2>
        
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
  const formattedDate = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <article className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
      <Link href={`/blogs/${blog.slug}`} className="block h-full">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={blog.cover_image || '/images/placeholder-blog.jpg'}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {blog.category && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">
              {blog.category}
            </span>
          )}
        </div>
        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span>{formattedDate}</span>
            <span className="mx-2">•</span>
            <span>{Math.ceil((blog.content?.length || 0) / 1000 * 4)} min read</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
            {blog.excerpt || blog.description}
          </p>
          <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 overflow-hidden">
              {blog.author && (
                <div className="w-full h-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-medium">
                  {blog.author.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {blog.author || 'ZioCarRentals Team'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {blog.author ? 'Author' : 'Team Member'}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}