import React from "react";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  // Function to safely render HTML content
  const renderHtmlContent = () => {
    return { __html: content };
  };

  // Check if content is HTML (contains HTML tags)
  const isHtmlContent = content.includes('<') && content.includes('>');

  if (isHtmlContent) {
    // Render as HTML if it contains HTML tags
    return (
      <article className={cn("blog-content prose dark:prose-invert max-w-none")}>
        <div dangerouslySetInnerHTML={renderHtmlContent()} />
      </article>
    );
  } else {
    // Simple Markdown parser for basic formatting (fallback for old content)
    const formatMarkdown = (text: string) => {
      // Process the content as sections
      const sections = text.split('\n\n').map((section, index) => {
        // Headers (# Header)
        if (section.startsWith('# ')) {
          return <h1 key={index} className="text-3xl font-bold my-6">{section.replace('# ', '')}</h1>;
        }
        
        // Subheaders (## Subheader)
        if (section.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-semibold my-5">{section.replace('## ', '')}</h2>;
        }
        
        // Smaller headers (### Header)
        if (section.startsWith('### ')) {
          return <h3 key={index} className="text-xl font-semibold my-4">{section.replace('### ', '')}</h3>;
        }
        
        // Regular paragraphs
        return <p key={index} className="text-gray-700 dark:text-gray-300 my-4 leading-relaxed">{section}</p>;
      });

      return <div className="prose dark:prose-invert max-w-none">{sections}</div>;
    };

    return (
      <article className={cn("blog-content")}>
        {formatMarkdown(content)}
      </article>
    );
  }
};

export default BlogContent;