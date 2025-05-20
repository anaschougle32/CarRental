"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { 
  Edit, Trash2, Plus, Search, Upload, X, CheckCircle, AlertCircle, Calendar
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Simple type definitions
interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  main_image: string;
  created_at: string;
  published: boolean;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Blog>>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    published: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const router = useRouter();
  // Initialize Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showNotification("Failed to load blogs", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBlog = () => {
    setSelectedBlog(null);
    setFormData({
      title: "",
      slug: "",
      content: "",
      excerpt: "",
      published: true,
    });
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const handleEditBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      excerpt: blog.excerpt,
      published: blog.published,
    });
    setImagePreview(blog.main_image || "");
    setIsDialogOpen(true);
  };

  const handleDeleteBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlog) return;
    
    try {
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", selectedBlog.id);
      
      if (error) throw error;
      
      // Update the local state
      setBlogs(blogs.filter(blog => blog.id !== selectedBlog.id));
      showNotification("Blog deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting blog:", error);
      showNotification("Error deleting blog", "error");
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Auto-generate slug from title
    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
        slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      });
    }

    // Auto-generate excerpt from content if it's not already set
    if (name === "content" && !formData.excerpt) {
      const excerpt = value.substring(0, 150) + (value.length > 150 ? "..." : "");
      setFormData({
        ...formData,
        content: value,
        excerpt,
      });
    }
  };

  const handleTogglePublished = () => {
    setFormData({
      ...formData,
      published: !formData.published,
    });
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      // If editing and no new image selected, use the existing one
      if (selectedBlog?.main_image) {
        return selectedBlog.main_image;
      }
      throw new Error("No image selected");
    }
    
    // Create a unique filename
    const extension = imageFile.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`;
    const filePath = `blogs/${filename}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile);
    
    if (error) throw error;
    
    // Return the public URL
    return `/images/blogs/${filename}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = "";
      
      // Upload image if we have a file
      if (imageFile) {
        imageUrl = await uploadImage();
      } else if (selectedBlog?.main_image) {
        imageUrl = selectedBlog.main_image;
      } else {
        throw new Error("Image is required");
      }
      
      if (selectedBlog) {
        // Update existing blog
        const { error } = await supabase
          .from("blogs")
          .update({
            ...formData,
            main_image: imageUrl,
          })
          .eq("id", selectedBlog.id);
        
        if (error) throw error;
        
        // Update local state
        setBlogs(
          blogs.map(blog => 
            blog.id === selectedBlog.id 
              ? { ...blog, ...formData, main_image: imageUrl } 
              : blog
          )
        );
        
        showNotification("Blog updated successfully", "success");
      } else {
        // Create new blog
        const now = new Date().toISOString();
        
        const { data, error } = await supabase
          .from("blogs")
          .insert({
            ...formData,
            main_image: imageUrl,
            created_at: now,
          })
          .select();
        
        if (error) throw error;
        
        // Update local state
        if (data && data.length > 0) {
          setBlogs([data[0], ...blogs]);
          showNotification("Blog added successfully", "success");
        }
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving blog:", error);
      showNotification(
        `Error ${selectedBlog ? "updating" : "adding"} blog`,
        "error"
      );
    }
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Button onClick={handleAddBlog}>
          <Plus className="h-4 w-4 mr-2" /> Add New Blog
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {notification.show && (
        <div className={`p-4 mb-4 rounded-md ${
          notification.type === "success" 
            ? "bg-green-50 text-green-700 border border-green-200" 
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          <div className="flex items-center">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            <p>{notification.message}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">Loading blogs...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                    No blogs found
                  </TableCell>
                </TableRow>
              ) : (
                filteredBlogs.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell>
                      {blog.main_image ? (
                        <div className="w-16 h-16 relative overflow-hidden rounded-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blog.main_image}
                            alt={blog.title}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/blog-placeholder.jpg";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                          No image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{blog.title}</span>
                        <span className="text-xs text-gray-500 truncate max-w-[300px]">
                          {blog.excerpt}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        {format(new Date(blog.created_at), "MMM d, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        blog.published 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditBlog(blog)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteBlog(blog)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Blog Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedBlog ? "Edit Blog" : "Add New Blog"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="content">Content</Label>
                <div className="text-xs text-gray-500">Markdown supported</div>
              </div>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={12}
                className="font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={3}
                placeholder="Brief summary of the blog post"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Blog Image</Label>
              <div className="flex items-center space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="text-sm text-gray-500">
                  {imageFile ? imageFile.name : imagePreview ? "Current image" : "No image selected"}
                </span>
              </div>
              {imagePreview && (
                <div className="mt-4 relative w-48 h-32 overflow-hidden rounded-md border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={handleTogglePublished}
                className="rounded"
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedBlog ? "Update Blog" : "Add Blog"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete "{selectedBlog?.title}" and remove it from our database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 