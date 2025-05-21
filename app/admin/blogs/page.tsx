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
  cover_image: string;
  created_at: string;
  published_at: string | null;
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
    published_at: new Date().toISOString(),
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
      published_at: new Date().toISOString(),
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
      published_at: blog.published_at,
    });
    setImagePreview(blog.cover_image || "");
    setIsDialogOpen(true);
  };

  const handleDeleteBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBlog) return;
    
    try {
      showNotification("Deleting blog...", "info");
      console.log("Deleting blog with ID:", selectedBlog.id);
      
      // Check if the blog has an image in Supabase Storage
      if (selectedBlog.cover_image && selectedBlog.cover_image.includes('blog-images')) {
        try {
          // Extract the filename from the URL
          const url = new URL(selectedBlog.cover_image);
          const pathParts = url.pathname.split('/');
          const filename = pathParts[pathParts.length - 1];
          
          console.log("Attempting to delete blog image:", filename);
          
          // Delete the image from storage
          const { error: storageError } = await supabase.storage
            .from('blog-images')
            .remove([filename]);
          
          if (storageError) {
            console.error("Error deleting image from storage:", storageError);
            // Continue with blog deletion even if image deletion fails
          } else {
            console.log("Blog image deleted successfully");
          }
        } catch (imageError) {
          console.error("Error processing image deletion:", imageError);
          // Continue with blog deletion even if image deletion fails
        }
      }
      
      // Delete the blog from the database
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", selectedBlog.id);
      
      if (error) throw error;
      
      // Update local state
      setBlogs(blogs.filter(blog => blog.id !== selectedBlog.id));
      showNotification("Blog deleted successfully", "success");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
      showNotification(
        `Error deleting blog: ${error instanceof Error ? error.message : 'Unknown error'}`,
        "error"
      );
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
    
    // Auto-generate slug from title
    if (name === "title") {
      const generatedSlug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: generatedSlug,
      }));
    } else if (name === "published") {
      // Handle checkbox
      setFormData(prev => ({
        ...prev,
        published: (e.target as HTMLInputElement).checked,
      }));
    } else {
      // Handle all other inputs
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTogglePublished = () => {
    setFormData({
      ...formData,
      published_at: formData.published_at ? null : new Date().toISOString(),
    });
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      // If editing and no new image selected, use the existing one
      if (selectedBlog?.cover_image) {
        return selectedBlog.cover_image;
      }
      throw new Error("No image selected");
    }
    
    // Validate file type
    const fileType = imageFile.type.toLowerCase();
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!validTypes.includes(fileType)) {
      showNotification("Invalid file type. Please upload JPG, JPEG, PNG, or WEBP images only.", "error");
      throw new Error("Invalid file type");
    }
    
    // Show uploading notification
    showNotification("Uploading image to storage...", "info");
    
    try {
      // First, check if the bucket exists and create it if it doesn't
      try {
        const { data: buckets } = await supabase.storage.listBuckets();
        const blogBucketExists = buckets?.some(bucket => bucket.name === 'blog-images');
        
        if (!blogBucketExists) {
          console.log("Blog images bucket doesn't exist, creating it...");
          const { error: createBucketError } = await supabase.storage.createBucket('blog-images', {
            public: true
          });
          
          if (createBucketError) {
            console.error("Error creating bucket:", createBucketError);
            // Continue anyway, the bucket might exist but not be visible to the current user
          }
        }
      } catch (bucketError) {
        console.error("Error checking/creating bucket:", bucketError);
        // Continue anyway, the upload might still work
      }
      
      // Create a unique filename with timestamp and random string
      const extension = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 10);
      const filename = `blog_${timestamp}_${randomString}.${extension}`;
      
      console.log("Uploading blog image with filename:", filename);
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filename, imageFile, {
          cacheControl: '3600',
          upsert: true // Use upsert to overwrite if file exists
        });
      
      if (error) {
        console.error("Storage upload error:", error);
        throw error;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filename);
      
      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to get public URL for uploaded image");
      }
      
      console.log("Blog image uploaded successfully, URL:", publicUrlData.publicUrl);
      showNotification("Image uploaded successfully", "success");
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Image upload error:", error);
      showNotification(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate required fields
      if (!formData.title) {
        showNotification("Title is required", "error");
        return;
      }
      
      // Always ensure slug is generated/updated from the title
      const slug = formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      
      // Create a clean form data object
      const cleanFormData = {
        ...formData,
        slug,
        published_at: formData.published_at
      };
      
      console.log("Form data for blog:", cleanFormData);
      
      let blogImageUrl = "";
      
      // Upload image if we have a file
      if (imageFile) {
        try {
          blogImageUrl = await uploadImage();
          console.log("Uploaded blog image URL:", blogImageUrl);
        } catch (error) {
          console.error("Image upload error:", error);
          // Continue with the form submission even if image upload fails
          if (selectedBlog?.cover_image) {
            blogImageUrl = selectedBlog.cover_image;
            console.log("Using existing blog image URL:", blogImageUrl);
          } else {
            showNotification("Image upload failed. Please try again.", "error");
            return;
          }
        }
      } else if (selectedBlog?.cover_image) {
        blogImageUrl = selectedBlog.cover_image;
        console.log("Using existing blog image URL (no new file):", blogImageUrl);
      } else {
        showNotification("Image is required", "error");
        return;
      }
      
      if (selectedBlog) {
        // Show updating notification
        showNotification("Updating blog...", "info");
        
        try {
          // Make sure published is a boolean
          const updateData = {
            title: cleanFormData.title,
            slug: cleanFormData.slug,
            content: cleanFormData.content || '',
            excerpt: cleanFormData.excerpt || '',
            published_at: cleanFormData.published_at,
            cover_image: blogImageUrl,
            // Add author and category if they don't exist
            author: selectedBlog.author || 'Admin',
            category: selectedBlog.category || 'Travel'
          };
          
          console.log("Updating blog with data:", updateData);
          
          // Update existing blog
          const { error } = await supabase
            .from("blogs")
            .update(updateData)
            .eq("id", selectedBlog.id);
          
          if (error) {
            console.error("Update error:", error);
            throw error;
          }
          
          // Fetch the updated blog to ensure we have the latest data
          const { data: updatedBlog, error: fetchError } = await supabase
            .from("blogs")
            .select("*")
            .eq("id", selectedBlog.id)
            .single();
          
          if (fetchError) {
            console.error("Error fetching updated blog:", fetchError);
            // Still update local state with what we have
            setBlogs(
              blogs.map(blog => 
                blog.id === selectedBlog.id 
                  ? { ...blog, ...cleanFormData, cover_image: blogImageUrl } 
                  : blog
              )
            );
          } else if (updatedBlog) {
            console.log("Updated blog data:", updatedBlog);
            // Update local state with the fetched data
            setBlogs(
              blogs.map(blog => 
                blog.id === selectedBlog.id ? updatedBlog : blog
              )
            );
          }
          
          // Show success notification and redirect to blogs list
          showNotification("Blog updated successfully", "success");
          
          // Close dialog and redirect after a short delay
          setIsDialogOpen(false);
          setTimeout(() => {
            // Refresh the page to show updated data
            window.location.reload();
          }, 1500);
        } catch (updateError) {
          console.error("Error updating blog:", updateError);
          showNotification(
            `Error updating blog: ${updateError instanceof Error ? updateError.message : 'Database error'}`,
            "error"
          );
        }
      } else {
        // Show creating notification
        showNotification("Adding new blog...", "info");
        
        try {
          // Create new blog with all fields explicitly listed
          const now = new Date().toISOString();
          
          const insertData = {
            title: cleanFormData.title,
            slug: cleanFormData.slug,
            content: cleanFormData.content || '',
            excerpt: cleanFormData.excerpt || '',
            published_at: cleanFormData.published_at,
            cover_image: blogImageUrl,
            created_at: now,
            author: 'Admin', // Default author
            category: 'Travel' // Default category
          };
          
          console.log("Adding new blog with data:", insertData);
          
          const { data, error } = await supabase
            .from("blogs")
            .insert(insertData)
            .select();
          
          if (error) {
            console.error("Insert error:", error);
            throw error;
          }
          
          // Update local state
          if (data && data.length > 0) {
            console.log("New blog data:", data[0]);
            setBlogs([data[0], ...blogs]);
            showNotification("Blog added successfully", "success");
            
            // Close dialog and redirect after a short delay
            setIsDialogOpen(false);
            setTimeout(() => {
              // Refresh the page to show updated data
              window.location.reload();
            }, 1500);
          }
        } catch (insertError) {
          console.error("Error adding blog:", insertError);
          showNotification(
            `Error adding blog: ${insertError instanceof Error ? insertError.message : 'Database error'}`,
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      showNotification(
        `Error ${selectedBlog ? "updating" : "adding"} blog: ${error instanceof Error ? error.message : 'Unknown error'}`,
        "error"
      );
    }
  };

  const showNotification = (message: string, type: string) => {
    // Set notification state
    setNotification({ show: true, message, type });
    
    // Create a toast-like notification that appears at the top of the screen
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
    toast.style.minWidth = '300px';
    toast.style.maxWidth = '500px';
    
    const content = document.createElement('div');
    content.className = 'flex items-center';
    content.innerHTML = `
      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        ${type === 'success' 
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
        }
      </svg>
      <p>${message}</p>
    `;
    
    toast.appendChild(content);
    document.body.appendChild(toast);
    
    // Animate in
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-20px)';
    toast.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-20px)';
      
      setTimeout(() => {
        document.body.removeChild(toast);
        setNotification({ show: false, message: "", type: "" });
      }, 300);
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
                      {blog.cover_image ? (
                        <div className="w-16 h-16 relative overflow-hidden rounded-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              // Fallback for broken images
                              e.currentTarget.src = "/images/placeholder.jpg";
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
                        blog.published_at 
                          ? "bg-green-100 text-green-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {blog.published_at ? "Published" : "Draft"}
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
                checked={!!formData.published_at}
                onChange={handleTogglePublished}
                className="rounded"
              />
              <Label htmlFor="published" className="cursor-pointer">
                Publish immediately
              </Label>
            </div>
            
            <DialogFooter className="flex justify-between">
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    // Open preview in new tab
                    const previewWindow = window.open('', '_blank');
                    if (previewWindow) {
                      previewWindow.document.write(`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <title>${formData.title || 'Blog Preview'}</title>
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
                            img { max-width: 100%; height: auto; border-radius: 8px; }
                            h1 { margin-top: 40px; }
                            .blog-content { margin-top: 30px; }
                            .blog-image { margin-bottom: 30px; }
                            .blog-meta { color: #666; font-size: 0.9rem; margin-bottom: 20px; }
                          </style>
                        </head>
                        <body>
                          <h1>${formData.title || 'Blog Title'}</h1>
                          <div class="blog-meta">
                            ${new Date().toLocaleDateString()} · ${formData.published_at ? 'Published' : 'Draft'}
                          </div>
                          ${imagePreview ? `<div class="blog-image"><img src="${imagePreview}" alt="${formData.title}"></div>` : ''}
                          <div class="blog-content">
                            ${formData.content?.replace(/\n/g, '<br>') || 'No content'}
                          </div>
                        </body>
                        </html>
                      `);
                      previewWindow.document.close();
                    }
                  }}
                >
                  Preview
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedBlog ? "Update Blog" : "Add Blog"}
                </Button>
              </div>
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


