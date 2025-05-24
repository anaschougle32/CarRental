import { getRelatedBlogs } from "@/lib/blogs";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface RelatedBlogsProps {
  currentSlug: string;
  category: string;
}

const RelatedBlogs = async ({ currentSlug, category }: RelatedBlogsProps) => {
  const relatedBlogs = await getRelatedBlogs(currentSlug, 3);

  if (relatedBlogs.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">
          <span className="border-b-4 border-blue-500 pb-1">Related</span> Articles
        </h2>
        <Link 
          href={`/blogs?category=${category}`} 
          className="text-blue-600 hover:text-blue-800 flex items-center text-sm md:text-base font-medium"
        >
          View all
          <ArrowRight size={16} className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedBlogs.map(blog => (
          <RelatedBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

const RelatedBlogCard = ({ blog }: { blog: BlogPost }) => {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image 
            src={blog.cover_image} 
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {blog.category && (
            <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {blog.category}
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
            {blog.description}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-gray-500 dark:text-gray-400 text-xs">{blog.date}</span>
            <span className="text-blue-600 font-medium text-sm group-hover:underline">Read more</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RelatedBlogs;