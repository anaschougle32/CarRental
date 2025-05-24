"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { 
  Edit, Trash2, Plus, Search, Upload, X, CheckCircle, AlertCircle, Calendar
} from "lucide-react";
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
  author?: string;
  category?: string;
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
    author: "Admin",
    category: "Travel"
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

  // Add Google Fonts for Poppins
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Add global style for Poppins
    const style = document.createElement('style');
    style.innerHTML = `
      body, html {
        font-family: 'Poppins', sans-serif;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
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
        // Ensure data is properly typed
        const typedData = data.map(item => ({
          id: String(item.id),
          title: String(item.title || ''),
          slug: String(item.slug || ''),
          content: String(item.content || ''),
          excerpt: String(item.excerpt || ''),
          cover_image: String(item.cover_image || ''),
          created_at: String(item.created_at || ''),
          published_at: item.published_at ? String(item.published_at) : null,
          author: item.author ? String(item.author) : undefined,
          category: item.category ? String(item.category) : undefined
        }));
        
        setBlogs(typedData);
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
      author: "Admin",
      category: "Travel"
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
      author: blog.author || "Admin",
      category: blog.category || "Travel"
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
          
          console.log("Attempting to delete image:", filename);
          
          // Delete the image from storage
          const { error: storageError } = await supabase
            .storage
            .from('blog-images')
            .remove([filename]);
          
          if (storageError) {
            console.error("Error deleting image:", storageError);
            // Continue with blog deletion even if image deletion fails
          } else {
            console.log("Image deleted successfully");
          }
        } catch (imageError) {
          console.error("Error parsing image URL or deleting image:", imageError);
          // Continue with blog deletion even if image deletion fails
        }
      }
      
      // Delete the blog from the database
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", selectedBlog.id);
      
      if (error) {
        console.error("Error deleting blog:", error);
        throw error;
      }
      
      // Update local state
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== selectedBlog.id));
      
      // Close dialog and show success message
      setIsDeleteDialogOpen(false);
      showNotification("Blog deleted successfully", "success");
    } catch (error: any) {
      console.error("Error in delete operation:", error);
      showNotification(
        `Error deleting blog: ${error?.message || 'Database error'}`,
        "error"
      );
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const fileType = file.type.toLowerCase();
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(fileType)) {
      showNotification("Please select a valid image file (JPEG, PNG, WebP)", "error");
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showNotification("Image is too large. Maximum size is 5MB", "error");
      return;
    }
    
    // Set the file for upload
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
    
    setFormData(prev => {
      // If the title is being changed, also update the slug
      if (name === "title") {
        const newSlug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        return { ...prev, [name]: value, slug: newSlug };
      }
      
      return { ...prev, [name]: value };
    });
  };

  const handleTogglePublished = () => {
    setFormData(prev => ({
      ...prev,
      published_at: prev.published_at ? null : new Date().toISOString()
    }));
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      throw new Error("No image selected");
    }
    
    // Validate file type
    const fileType = imageFile.type.toLowerCase();
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(fileType)) {
      throw new Error("Invalid file type. Please use JPEG, PNG or WebP images.");
    }
    
    try {
      // Generate a unique filename with timestamp to avoid conflicts
      const timestamp = new Date().getTime();
      const fileExt = imageFile.name.split('.').pop();
      const safeFileName = `${timestamp}-${imageFile.name.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase()}`;
      
      console.log("Uploading image with filename:", safeFileName);
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(safeFileName, imageFile, { 
          upsert: true,
          contentType: imageFile.type 
        });
      
      if (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
      
      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(safeFileName);
      
      console.log("Image uploaded successfully. URL:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error in uploadImage:", error);
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
      
      // Generate slug from title
      const slug = formData.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      
      let blogImageUrl = "";
      
      // Handle image upload
      if (imageFile) {
        try {
          blogImageUrl = await uploadImage();
          console.log("Successfully uploaded image:", blogImageUrl);
        } catch (error) {
          console.error("Image upload failed:", error);
          if (selectedBlog?.cover_image) {
            // Use existing image if available
            blogImageUrl = selectedBlog.cover_image;
            console.log("Using existing image:", blogImageUrl);
          } else {
            showNotification("Image upload failed. Please try again.", "error");
            return;
          }
        }
      } else if (selectedBlog?.cover_image) {
        // Keep existing image if no new one was uploaded
        blogImageUrl = selectedBlog.cover_image;
        console.log("Keeping existing image:", blogImageUrl);
      } else {
        showNotification("Please upload an image for the blog", "error");
        return;
      }
      
      if (selectedBlog) {
        // UPDATING EXISTING BLOG
        showNotification("Updating blog...", "info");
        
        const updateData = {
          title: formData.title,
          slug: slug,
          content: formData.content || '',
          excerpt: formData.excerpt || '',
          published_at: formData.published_at ? new Date().toISOString() : null,
          cover_image: blogImageUrl,
          author: formData.author || selectedBlog.author || 'Admin',
          category: formData.category || selectedBlog.category || 'Travel'
        };
        
        console.log("Updating blog with ID:", selectedBlog.id);
        console.log("Update data:", updateData);
        
        const { error } = await supabase
          .from("blogs")
          .update(updateData)
          .eq("id", selectedBlog.id);
        
        if (error) {
          console.error("Error updating blog:", error);
          showNotification(`Error updating blog: ${error.message}`, "error");
          return;
        }
        
        // Update local state
        setBlogs(prevBlogs => 
          prevBlogs.map(blog => 
            blog.id === selectedBlog.id 
              ? { ...blog, ...updateData } 
              : blog
          )
        );
        
        showNotification("Blog updated successfully!", "success");
        setIsDialogOpen(false);
        
        // Refresh data
        setTimeout(() => fetchBlogs(), 500);
      } else {
        // ADDING NEW BLOG
        showNotification("Adding new blog...", "info");
        
        const now = new Date().toISOString();
        const insertData = {
          title: formData.title,
          slug: slug,
          content: formData.content || '',
          excerpt: formData.excerpt || '',
          published_at: formData.published_at ? now : null,
          cover_image: blogImageUrl,
          created_at: now,
          author: formData.author || 'Admin',
          category: formData.category || 'Travel'
        };
        
        console.log("Adding new blog with data:", insertData);
        
        const { data, error } = await supabase
          .from("blogs")
          .insert(insertData)
          .select();
        
        if (error) {
          console.error("Error adding blog:", error);
          showNotification(`Error adding blog: ${error.message}`, "error");
          return;
        }
        
        if (data && data.length > 0) {
          // Update local state
          setBlogs(prevBlogs => [data[0], ...prevBlogs]);
          showNotification("Blog added successfully!", "success");
          setIsDialogOpen(false);
          
          // Refresh data
          setTimeout(() => fetchBlogs(), 500);
        }
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      showNotification(
        `Error: ${error?.message || 'Something went wrong'}`,
        "error"
      );
    }
  };

  const showNotification = (message: string, type: string) => {
    // Set notification state
    setNotification({ show: true, message, type });
    
    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md transition-opacity duration-300 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 
          notification.type === 'error' ? 'bg-red-100 text-red-800' : 
          'bg-blue-100 text-blue-800'
        }`} style={{ minWidth: '300px', maxWidth: '500px' }}>
          <div className="flex items-center">
            {notification.type === 'success' && (
              <CheckCircle className="h-5 w-5 mr-2" />
            )}
            {notification.type === 'error' && (
              <AlertCircle className="h-5 w-5 mr-2" />
            )}
            {notification.type === 'info' && (
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}
      
      <h1 className="text-2xl font-bold mb-6">Blog Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search blogs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddBlog}>
          <Plus className="h-4 w-4 mr-2" /> Add New Blog
        </Button>
      </div>
      
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
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                        {blog.cover_image ? (
                          <img
                            src={blog.cover_image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Set a fallback image on error
                              (e.target as HTMLImageElement).src = "https://via.placeholder.com/150?text=No+Image";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {blog.excerpt || blog.content.substring(0, 100)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {blog.created_at ? (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                        </div>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          blog.published_at
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {blog.published_at ? "Published" : "Draft"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBlog(blog)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteBlog(blog)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Blog Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedBlog ? "Edit Blog" : "Add New Blog"}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Blog title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="blog-title"
                disabled
              />
              <p className="text-xs text-gray-500">
                Auto-generated from title. Used in the URL.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief summary of the blog post"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Blog content"
                rows={10}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Blog Image</Label>
              <div className="flex items-center space-x-4">
                <div className="relative h-32 w-full border rounded-md overflow-hidden bg-gray-50">
                  <input
                    type="file"
                    id="cover_image"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                  />
                  {!imagePreview ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-1">Upload Cover Image</span>
                      <span className="text-xs text-gray-400 mt-1">(JPEG, PNG, WebP - Max 5MB)</span>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview('');
                          setImageFile(null);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {imageFile ? imageFile.name : imagePreview ? "Current image" : "No image selected"}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author || ""}
                onChange={handleInputChange}
                placeholder="Author name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category || ""}
                onChange={handleInputChange}
                placeholder="Blog category"
              />
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
                          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                          <style>
                            body { 
                              font-family: 'Poppins', system-ui, -apple-system, sans-serif; 
                              line-height: 1.6; 
                              max-width: 800px; 
                              margin: 0 auto; 
                              padding: 20px; 
                            }
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
