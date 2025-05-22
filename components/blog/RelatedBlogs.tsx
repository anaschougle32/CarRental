import { getRelatedBlogs } from "@/lib/blogs";
import BlogCard from "@/components/blog/BlogCard";
import { BlogPost } from "@/lib/types";

interface RelatedBlogsProps {
  currentSlug: string;
  category: string;
}

const RelatedBlogs = async ({ currentSlug }: RelatedBlogsProps) => {
  const relatedBlogs = await getRelatedBlogs(currentSlug, 2);

  if (relatedBlogs.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedBlogs.map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;