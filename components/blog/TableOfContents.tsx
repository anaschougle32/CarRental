"use client";

import { useEffect, useState } from "react";
import { List, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!content) return;

    const headings: TocItem[] = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Extract H2 and H3 headings
    const elements = Array.from(doc.querySelectorAll("h2, h3"));

    elements.forEach((el, index) => {
      const text = el.textContent?.trim() || "";
      if (text) {
        const slug = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
        const id = slug || `section-${index}`;

        headings.push({
          id,
          text,
          level: el.tagName === "H2" ? 2 : 3,
        });

        // Also inject id into DOM element if found on page
        const pageEl = document.getElementById(id);
        if (!pageEl) {
          const domHeadings = document.querySelectorAll(`article h2, article h3`);
          if (domHeadings[index]) {
            domHeadings[index].setAttribute("id", id);
          }
        }
      }
    });

    setItems(headings);

    // ScrollSpy observer
    const handleScroll = () => {
      const headingElements = headings
        .map((h) => document.getElementById(h.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 120;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveId(el.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [content]);

  if (items.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4 text-gray-900 dark:text-white font-bold text-base border-b border-gray-100 dark:border-gray-700/80 pb-3">
        <List size={18} className="text-blue-600 dark:text-blue-400" />
        <span>Table of Contents</span>
      </div>

      <nav className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`w-full text-left transition-all flex items-start gap-1.5 py-1.5 px-2 rounded-lg text-xs leading-relaxed ${
                item.level === 3 ? "pl-5" : ""
              } ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold shadow-2xs"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <ChevronRight
                size={14}
                className={`mt-0.5 flex-shrink-0 transition-transform ${
                  isActive ? "text-blue-600 dark:text-blue-400 rotate-90" : "text-gray-400 opacity-60"
                }`}
              />
              <span className="line-clamp-2">{item.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
