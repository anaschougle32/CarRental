"use client";

import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Check, Link, LinkIcon } from "lucide-react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

interface BlogOption {
  id: string;
  title: string;
  slug: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = 400
}) => {
  const [blogs, setBlogs] = useState<BlogOption[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogOption[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<{ start: number; end: number } | null>(null);

  // Fetch blogs for backlinks
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("blogs")
          .select("id, title, slug")
          .order("title", { ascending: true });

        if (error) {
          console.error("Error fetching blogs for backlinks:", error);
          return;
        }

        if (data) {
          // Explicitly cast the data to the correct type
          const typedData: BlogOption[] = data.map(item => ({
            id: String(item.id),
            title: String(item.title),
            slug: String(item.slug)
          }));
          
          setBlogs(typedData);
          setFilteredBlogs(typedData);
        }
      } catch (error) {
        console.error("Error in blogs fetch:", error);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => 
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  }, [search, blogs]);

  // Insert backlink at cursor position
  const insertBacklink = (blog: BlogOption) => {
    if (!editorRef.current) return;
    
    const linkText = `[${blog.title}](/blogs/${blog.slug})`;
    
    if (selectionRef.current) {
      const newValue = 
        value.substring(0, selectionRef.current.start) + 
        linkText + 
        value.substring(selectionRef.current.end);
      
      onChange(newValue);
      selectionRef.current = null;
    } else {
      // If no selection, just append to the end
      onChange(value + linkText);
    }
    
    setOpen(false);
  };

  // Store selection position when editor is clicked
  const handleEditorClick = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      
      if (editorRef.current) {
        preSelectionRange.selectNodeContents(editorRef.current);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        const start = preSelectionRange.toString().length;
        
        selectionRef.current = {
          start,
          end: start + range.toString().length
        };
      }
    }
  };

  return (
    <div className="w-full" ref={editorRef} onClick={handleEditorClick}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-500">
          Use Markdown for formatting
        </div>
        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <LinkIcon size={16} />
                <span>Add Backlink</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]" align="end" side="bottom" sideOffset={5} alignOffset={0}>
              <Command>
                <CommandInput 
                  placeholder="Search blogs..." 
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandList>
                  <CommandEmpty>No blogs found</CommandEmpty>
                  <CommandGroup heading="Available Blogs">
                    {filteredBlogs.map((blog) => (
                      <CommandItem
                        key={blog.id}
                        onSelect={() => insertBacklink(blog)}
                        className="flex items-center justify-between"
                      >
                        <span>{blog.title}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        height={height}
        preview="edit"
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        textareaProps={{
          placeholder,
        }}
      />
      
      <div className="mt-2 text-xs text-gray-500">
        <p>
          <strong>Tip:</strong> Use # for headings, ** for bold, * for italic, 
          [text](url) for links, and ![alt](image-url) for images.
        </p>
      </div>
    </div>
  );
};

export default MarkdownEditor;
