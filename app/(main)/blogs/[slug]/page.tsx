import { createClient } from '@/lib/supabase/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ArrowLeft, Clock, MessageCircle } from 'lucide-react';
import BlogContent from '@/components/blog/BlogContent';
import ShareButtons from '@/components/blog/ShareButtons';
import ContactInfo from '@/components/blog/ContactInfo';
import RelatedArticles from '@/components/blog/RelatedArticles';
import type { BlogPost } from '@/types/blog';
import { calculateReadingTime } from '@/lib/utils/reading-time';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  
  // Fetch the blog post by slug
  const { data: postData, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', params.slug)
    .single<BlogPost>();

  if (error || !postData) {
    return notFound();
  }

  const post = postData as BlogPost;

  // Fetch all blog posts for related articles
  const { data: allPosts } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });
    
  const relatedPosts = (allPosts || []) as BlogPost[];

  // Update view count
  if (post.id) {
    await supabase
      .from('blogs')
      .update({ views: (post.views || 0) + 1 })
      .eq('id', post.id);
  }

  // Calculate reading time
  const readingTime = post.content ? calculateReadingTime(post.content) : 5;

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <div className="mb-8">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to all articles
          </Link>
        </div>

        {/* Article header */}
        <header className="mb-12 text-center">
          {post.category && (
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium dark:bg-blue-900/50 dark:text-blue-200">
                {post.category}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title || 'Untitled Post'}
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {post.excerpt || 'A detailed look at our latest insights and updates.'}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            {post.author && (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{post.author}</p>
                </div>
              </div>
            )}
            
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>
            
            <div className="flex items-center space-x-6">
              {post.created_at && (
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <time dateTime={new Date(post.created_at).toISOString()}>
                    {new Date(post.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              )}
              
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Cover image */}
        {post.cover_image && (
          <div className="relative w-full aspect-video mb-16 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={post.cover_image}
              alt={post.title || 'Blog post cover'}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 75vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        {/* Article content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <div className="prose lg:prose-lg xl:prose-xl dark:prose-invert max-w-none">
              <BlogContent content={post.content} />
            </div>
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">TAGS</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm font-medium dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Author bio */}
            {post.author && (
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-4">
                    <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{post.author}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {post.author_bio || 'Writer and content creator'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Comments section */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Comments</h3>
                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  <MessageCircle className="w-4 h-4 mr-1.5" />
                  Leave a comment
                </button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Sign in to leave a comment
                </p>
              </div>
            </div>
          </article>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Table of contents */}
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Table of Contents</h3>
                <div className="space-y-2 text-sm">
                  {/* This would be dynamically generated based on headings */}
                  <a href="#introduction" className="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">Introduction</a>
                  <a href="#features" className="block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Key Features</a>
                  <a href="#conclusion" className="block text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">Conclusion</a>
                </div>
              </div>
              
              {/* Share sidebar */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Share this article</h3>
                <ShareButtons 
                  url={`/blogs/${post.slug}`} 
                  title={post.title}
                  variant="vertical"
                />
              </div>
            </div>
          </aside>
        </div>
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">You might also like</h2>
            <RelatedArticles 
              currentPostId={post.id} 
              category={post.category || 'General'} 
              posts={relatedPosts} 
            />
          </div>
        )}
        
        {/* Newsletter signup */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay updated with our latest posts</h2>
            <p className="text-blue-100 mb-8">Subscribe to our newsletter and never miss our latest articles and updates.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-blue-200 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Contact information */}
        <div className="mt-24">
          <ContactInfo />
        </div>
      </div>
    </div>
  )
}
