import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import BlogContent from "@/components/blog/BlogContent";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import CtaBanner from "@/components/home/CtaBanner";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, User, ArrowLeft, Tag, MessageCircle, Phone } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { Button } from "@/components/ui/button";

// This disables caching for this route
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }
  
  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      images: [blog.cover_image],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const blog = await getBlogBySlug(params.slug);
  
  if (!blog) {
    notFound();
  }
  
  // Get current date for real-time display
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const whatsappLink = "https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20renting%20a%20car.";
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back button and date */}
      <div className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-4">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/blogs" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft size={18} className="mr-2" />
            <span className="font-medium">Back to Blogs</span>
          </Link>
          <div className="text-gray-500 text-sm">
            {formattedDate}
          </div>
        </div>
      </div>
      
      {/* Hero Section with Cover Image */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
        <Image
          src={blog.cover_image}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12">
          <div className="container mx-auto px-4 md:px-6 text-white">
            <div className="max-w-4xl mx-auto">
              {blog.category && (
                <div className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  <div className="flex items-center">
                    <Tag size={14} className="mr-1" />
                    <span>{blog.category}</span>
                  </div>
                </div>
              )}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-md">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                {blog.author && (
                  <div className="flex items-center text-gray-200">
                    <User size={16} className="mr-2" />
                    <span>{blog.author}</span>
                  </div>
                )}
                {blog.date && (
                  <div className="flex items-center text-gray-200">
                    <CalendarDays size={16} className="mr-2" />
                    <span>{blog.date}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
          {/* Blog Content */}
          <BlogContent content={blog.content} />
          
          {/* Share and Contact */}
          <div className="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Share this article</h3>
                <div className="flex space-x-3">
                  <a href="#" className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
                  </a>
                  <a href="#" className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                  </a>
                  <a href={whatsappLink} className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="tel:+919082888912" className="flex items-center justify-center gap-2">
                    <Phone size={16} />
                    <span>+91 90828 88912</span>
                  </Link>
                </Button>
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" asChild>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <MessageCircle size={16} />
                    <span>+91 79-77288350</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        {/* Related Posts */}
        {blog.category && (
          <div className="max-w-6xl mx-auto">
            <RelatedBlogs currentSlug={blog.slug} category={blog.category || 'Travel'} />
          </div>
        )}
      </div>
      
      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}