"use client";

import React, { useState, useRef } from "react";
import { 
  Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, 
  Quote, Code, Link as LinkIcon, Image as ImageIcon, Eye, Edit3, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your blog content here..."
}) => {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertTag = (startTag: string, endTag: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || defaultText;
    const replacement = `${startTag}${selectedText}${endTag}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length,
        start + startTag.length + selectedText.length
      );
    }, 50);
  };

  const handleAddLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      insertTag(`<a href="${url}" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">`, "</a>", "link text");
    }
  };

  const handleAddImage = () => {
    const url = prompt("Enter Image URL:", "https://");
    if (url) {
      const alt = prompt("Enter Image Alt Text:", "Blog Image") || "Blog Image";
      insertTag(`<img src="${url}" alt="${alt}" className="w-full rounded-xl my-4 object-cover" />\n`);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
      {/* Editor Header / Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag("<strong>", "</strong>", "bold text")}
            title="Bold"
            className="h-8 w-8 p-0"
          >
            <Bold size={16} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag("<em>", "</em>", "italic text")}
            title="Italic"
            className="h-8 w-8 p-0"
          >
            <Italic size={16} />
          </Button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag('<h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white">', "</h2>\n", "Heading 2")}
            title="Heading 2"
            className="h-8 px-2 text-xs font-semibold"
          >
            H2
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag('<h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">', "</h3>\n", "Heading 3")}
            title="Heading 3"
            className="h-8 px-2 text-xs font-semibold"
          >
            H3
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag('<p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">', "</p>\n", "Paragraph text...")}
            title="Paragraph"
            className="h-8 px-2 text-xs font-semibold"
          >
            P
          </Button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag('<ul className="list-disc list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300">\n  <li>', "</li>\n  <li>Second item</li>\n</ul>\n", "First item")}
            title="Bullet List"
            className="h-8 w-8 p-0"
          >
            <List size={16} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag('<ol className="list-decimal list-inside my-4 space-y-2 text-gray-700 dark:text-gray-300">\n  <li>', "</li>\n  <li>Second item</li>\n</ol>\n", "First item")}
            title="Numbered List"
            className="h-8 w-8 p-0"
          >
            <ListOrdered size={16} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertTag('<blockquote className="border-l-4 border-blue-600 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400 bg-blue-50/50 dark:bg-blue-950/20 rounded-r-lg">', "</blockquote>\n", "Quote text")}
            title="Blockquote"
            className="h-8 w-8 p-0"
          >
            <Quote size={16} />
          </Button>

          <div className="w-px h-5 bg-gray-300 dark:bg-gray-700 mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddLink}
            title="Insert Link"
            className="h-8 w-8 p-0"
          >
            <LinkIcon size={16} />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddImage}
            title="Insert Image"
            className="h-8 w-8 p-0"
          >
            <ImageIcon size={16} />
          </Button>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 p-0.5 rounded-lg text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              activeTab === "edit"
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
            }`}
          >
            <Edit3 size={13} />
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all font-medium ${
              activeTab === "preview"
                ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
            }`}
          >
            <Eye size={13} />
            Preview
          </button>
        </div>
      </div>

      {/* Editor Body */}
      {activeTab === "edit" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[350px] p-4 text-sm font-mono bg-transparent text-gray-900 dark:text-gray-100 outline-none resize-y leading-relaxed"
        />
      ) : (
        <div className="p-6 min-h-[350px] max-h-[500px] overflow-y-auto prose dark:prose-invert max-w-none bg-white dark:bg-gray-900">
          {value ? (
            <div dangerouslySetInnerHTML={{ __html: value }} />
          ) : (
            <p className="text-gray-400 italic">Nothing to preview yet...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
