import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import BlogContent from "@/components/blog/BlogContent";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import CtaBanner from "@/components/home/CtaBanner";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, User } from "lucide-react";
import { BlogPost } from "@/lib/types";

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
  
  return (
    <div>
      {/* Hero Section with Cover Image */}
      <div className="relative h-[40vh] min-h-[300px] max-h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${blog.cover_image})` }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6 text-center text-white">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 max-w-4xl mx-auto">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <CalendarDays size={18} className="mr-2" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <User size={18} className="mr-2" />
              <span>{blog.author}</span>
            </div>
          </div>
          
          {/* Blog Content */}
          <BlogContent content={blog.content} />
          
          <Separator className="my-12" />
          
          {/* Related Posts */}
          {blog.category && (
            <RelatedBlogs currentSlug={blog.slug} category={blog.category || 'Travel'} />
          )}
        </div>
      </div>
      
      {/* CTA Banner */}
      <CtaBanner />
    </div>
  );
}