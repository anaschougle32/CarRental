"use client";

import React, { useEffect, useRef } from "react";

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Inject IDs into h2 and h3 elements for table of contents navigation
    const headings = containerRef.current.querySelectorAll("h2, h3");
    headings.forEach((heading, index) => {
      const text = heading.textContent?.trim() || "";
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-") || `heading-${index}`;
      heading.setAttribute("id", id);
    });
  }, [content]);

  return (
    <article className="blog-article-body relative">
      <div 
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: content }} 
      />

      <style jsx global>{`
        .blog-article-body {
          font-size: 1.0625rem;
          line-height: 1.85;
          color: #334155;
        }

        .dark .blog-article-body {
          color: #cbd5e1;
        }

        .blog-article-body h1 {
          font-family: var(--font-satoshi), sans-serif;
          font-size: 2.25rem;
          font-weight: 800;
          line-height: 1.25;
          margin-top: 2.5rem;
          margin-bottom: 1.25rem;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .dark .blog-article-body h1 {
          color: #f8fafc;
        }

        .blog-article-body h2 {
          font-family: var(--font-satoshi), sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.35;
          margin-top: 2.25rem;
          margin-bottom: 1rem;
          color: #1e293b;
          border-bottom: 2px solid #e2e8f0;
          padding-bottom: 0.5rem;
          letter-spacing: -0.015em;
        }

        .dark .blog-article-body h2 {
          color: #f1f5f9;
          border-bottom-color: #334155;
        }

        .blog-article-body h3 {
          font-family: var(--font-satoshi), sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          line-height: 1.4;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          color: #2563eb;
        }

        .dark .blog-article-body h3 {
          color: #60a5fa;
        }

        .blog-article-body p {
          margin-bottom: 1.35rem;
        }

        .blog-article-body strong, 
        .blog-article-body b {
          font-weight: 700;
          color: #0f172a;
        }

        .dark .blog-article-body strong,
        .dark .blog-article-body b {
          color: #f8fafc;
        }

        .blog-article-body ul {
          list-style-type: disc;
          padding-left: 1.75rem;
          margin-top: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .blog-article-body ol {
          list-style-type: decimal;
          padding-left: 1.75rem;
          margin-top: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .blog-article-body li {
          margin-bottom: 0.65rem;
          line-height: 1.75;
        }

        .blog-article-body li::marker {
          color: #2563eb;
          font-weight: bold;
        }

        .dark .blog-article-body li::marker {
          color: #60a5fa;
        }

        .blog-article-body blockquote {
          border-left: 4px solid #2563eb;
          background: #f8fafc;
          padding: 1rem 1.25rem;
          margin: 1.75rem 0;
          border-radius: 0 0.75rem 0.75rem 0;
          font-style: italic;
          color: #475569;
        }

        .dark .blog-article-body blockquote {
          border-left-color: #3b82f6;
          background: rgba(30, 41, 59, 0.5);
          color: #94a3b8;
        }

        .blog-article-body img {
          width: 100%;
          border-radius: 1rem;
          margin: 2rem 0;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
          object-fit: cover;
        }

        .blog-article-body a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 4px;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .blog-article-body a:hover {
          color: #1d4ed8;
        }

        .dark .blog-article-body a {
          color: #60a5fa;
        }

        .dark .blog-article-body a:hover {
          color: #93c5fd;
        }

        .blog-article-body code {
          background: #f1f5f9;
          color: #0f172a;
          padding: 0.2rem 0.4rem;
          border-radius: 0.375rem;
          font-size: 0.9em;
          font-family: monospace;
        }

        .dark .blog-article-body code {
          background: #1e293b;
          color: #f8fafc;
        }

        .blog-article-body hr {
          border: 0;
          height: 1px;
          background: #e2e8f0;
          margin: 2.5rem 0;
        }

        .dark .blog-article-body hr {
          background: #334155;
        }
      `}</style>
    </article>
  );
};

export default BlogContent;