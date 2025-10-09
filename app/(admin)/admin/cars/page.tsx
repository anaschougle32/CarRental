"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { 
  Edit, Trash2, Plus, Search, Upload, X, CheckCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
interface Brand {
  id: string;
  name: string;
  logo: string;
}

interface Car {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  price_per_day: number;
  transmission: string;
  fuel_type: string;
  seats: number;
  luggage: number;
  description: string;
  features: string[];
  main_image: string;
  mileage?: number;
}

export default function AdminCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Car>>({
    name: "",
    slug: "",
    brand_id: "",
    price_per_day: 0,
    transmission: "Manual",
    fuel_type: "Petrol",
    seats: 5,
    luggage: 2,
    mileage: 15,
    description: "",
    features: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [notificationQueue, setNotificationQueue] = useState<Array<{id: string, message: string, type: string}>>([]);

  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  // Fetch cars and brands on component mount
  useEffect(() => {
    fetchCars();
    fetchBrands();
  }, []);

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from("cars").select("*");
      
      if (error) throw error;
      
      if (data) {
        setCars(data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
      showNotification("Failed to load cars", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBrands = async () => {
    try {
      const { data, error } = await supabase.from("brands").select("*").order('name');
      
      if (error) throw error;
      
      if (data) {
        // Remove duplicates by name (case insensitive)
        const uniqueBrands = data.filter((brand, index, self) =>
          index === self.findIndex(b => b.name.toLowerCase() === brand.name.toLowerCase())
        );
        setBrands(uniqueBrands);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      showNotification("Error loading brands", "error");
    }
  };

  const handleAddCar = () => {
    setSelectedCar(null);
    setFormData({
      name: "",
      slug: "",
      brand_id: "",
      price_per_day: 0,
      transmission: "Manual",
      fuel_type: "Petrol",
      seats: 5,
      luggage: 2,
      mileage: 15,
      description: "",
      features: [],
    });
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const clearForm = () => {
    setFormData({
      name: "",
      slug: "",
      brand_id: "",
      price_per_day: 0,
      transmission: "Manual",
      fuel_type: "Petrol",
      seats: 5,
      luggage: 2,
      mileage: 15,
      description: "",
      features: [],
    });
    setImageFile(null);
    setImagePreview("");
    setSelectedCar(null);
  };

  const handleEditCar = (car: Car) => {
    setSelectedCar(car);
    setFormData({
      name: car.name,
      slug: car.slug,
      brand_id: car.brand_id,
      price_per_day: car.price_per_day,
      transmission: car.transmission,
      fuel_type: car.fuel_type,
      seats: car.seats,
      luggage: car.luggage,
      mileage: car.mileage || 15,
      description: car.description,
      features: car.features || [],
    });
    setImagePreview(car.main_image || "");
    setIsDialogOpen(true);
  };

  const handleDeleteCar = (car: Car) => {
    setSelectedCar(car);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCar) return;
    
    try {
      showNotification("Deleting car...", "info");
      console.log("Deleting car with ID:", selectedCar.id);
      
      // Check if the car has an image in Supabase Storage
      if (selectedCar.main_image && (selectedCar.main_image.includes('blog-images') || selectedCar.main_image.includes('car-images'))) {
        try {
          // Extract the filename from the URL
          const url = new URL(selectedCar.main_image);
          const pathParts = url.pathname.split('/');
          const filename = pathParts[pathParts.length - 1];
          
          console.log("Attempting to delete image:", filename);
          
          // Determine bucket name
          const bucketName = selectedCar.main_image.includes('blog-images') ? 'blog-images' : 'car-images';
          
          // Delete the image from storage
          const { error: storageError } = await supabase.storage
            .from(bucketName)
            .remove([filename]);
          
          if (storageError) {
            console.error("Error deleting image from storage:", storageError);
            // Continue with car deletion even if image deletion fails
          } else {
            console.log("Image deleted successfully");
          }
        } catch (imageError) {
          console.error("Error processing image deletion:", imageError);
          // Continue with car deletion even if image deletion fails
        }
      }
      
      // Delete the car from the database
      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", selectedCar.id);
      
      if (error) throw error;
      
      // Update local state
      setCars(cars.filter(car => car.id !== selectedCar.id));
      showNotification("Car deleted successfully", "success");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting car:", error);
      showNotification(
        `Error deleting car: ${error instanceof Error ? error.message : 'Unknown error'}`,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (name === "price_per_day" || name === "seats" || name === "luggage") {
      const numValue = value === "" ? 0 : parseFloat(value);
      setFormData(prev => ({
        ...prev,
        [name]: numValue
      }));
      return;
    }
    
    // Handle slug generation from name
    if (name === "name") {
      const slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      
      // Always auto-update slug when name changes
      setFormData(prev => ({
        ...prev,
        name: value,
        slug
      }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    
    // Check if feature already exists (case insensitive)
    const featureExists = formData.features?.some(
      feature => feature.toLowerCase() === featureInput.trim().toLowerCase()
    );
    
    if (featureExists) {
      showNotification("Feature already exists", "error");
      return;
    }
    
    setFormData({
      ...formData,
      features: [...(formData.features || []), featureInput.trim()],
    });
    
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...(formData.features || [])];
    updatedFeatures.splice(index, 1);
    
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) {
      // If editing and no new image selected, use the existing one
      if (selectedCar?.main_image) {
        return selectedCar.main_image;
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
      // Create a unique filename with timestamp and random string (same as blog images)
      const extension = imageFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(2, 10);
      const filename = `car_${timestamp}_${randomString}.${extension}`;
      
      console.log(`Uploading car image to 'blog-images/${filename}'`);
      
      // Upload to the existing blog-images bucket (since car-images bucket doesn't exist)
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filename, imageFile, {
          cacheControl: '3600',
          upsert: true,
          contentType: imageFile.type
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
      
      console.log("Successfully uploaded car image:", publicUrlData.publicUrl);
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
    
    console.log("Form submission started...");
    console.log("Form data:", formData);
    console.log("Image file:", imageFile);
    console.log("Selected car:", selectedCar);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.brand_id) {
        showNotification("Name and brand are required", "error");
        return;
      }
      
      // Always ensure slug is generated/updated from the name
      const slug = formData.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      
      // Convert numeric fields to numbers
      const numericFormData = {
        ...formData,
        slug,
        price_per_day: Number(formData.price_per_day),
        seats: Number(formData.seats),
        luggage: Number(formData.luggage),
        mileage: Number(formData.mileage)
      };
      
      let imageUrl = "";
      
      // Upload image if we have a file
      if (imageFile) {
        try {
          console.log("Starting image upload...");
          imageUrl = await uploadImage();
          console.log("Uploaded image URL:", imageUrl);
        } catch (error) {
          console.error("Image upload error:", error);
          showNotification(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`, "error");
          
          // Continue with the form submission even if image upload fails
          if (selectedCar?.main_image) {
            imageUrl = selectedCar.main_image;
            console.log("Using existing image URL after upload failure:", imageUrl);
            showNotification("Using existing image due to upload failure", "info");
          } else {
            showNotification("Image upload failed and no existing image available. Please try again.", "error");
            return;
          }
        }
      } else if (selectedCar?.main_image) {
        imageUrl = selectedCar.main_image;
        console.log("Using existing image URL (no new file):", imageUrl);
      } else {
        showNotification("Image is required", "error");
        return;
      }
      
      if (selectedCar) {
        // Show updating notification
        showNotification("Updating car...", "info");
        
        try {
          const updateData = {
            name: numericFormData.name,
            slug: numericFormData.slug,
            brand_id: numericFormData.brand_id,
            price_per_day: numericFormData.price_per_day,
            transmission: numericFormData.transmission,
            fuel_type: numericFormData.fuel_type,
            seats: numericFormData.seats,
            luggage: numericFormData.luggage,
            mileage: numericFormData.mileage,
            description: numericFormData.description,
            features: numericFormData.features,
            main_image: imageUrl
          };
          
          console.log("Updating car with data:", updateData);
          
          // Update existing car
          const { error } = await supabase
            .from("cars")
            .update(updateData)
            .eq("id", selectedCar.id);
          
          if (error) {
            console.error("Update error:", error);
            throw error;
          }
          
          // Fetch the updated car to ensure we have the latest data
          const { data: updatedCar, error: fetchError } = await supabase
            .from("cars")
            .select("*")
            .eq("id", selectedCar.id)
            .single();
          
          if (fetchError) {
            console.error("Error fetching updated car:", fetchError);
            // Still update local state with what we have
            setCars(
              cars.map(car => 
                car.id === selectedCar.id 
                  ? { ...car, ...numericFormData, main_image: imageUrl } 
                  : car
              )
            );
          } else if (updatedCar) {
            console.log("Updated car data:", updatedCar);
            // Update local state with the fetched data
            setCars(
              cars.map(car => 
                car.id === selectedCar.id ? updatedCar : car
              )
            );
          }
          
          // Show success notification
          showNotification("Car updated successfully", "success");
          
          // Close dialog and refresh data without page reload
          setIsDialogOpen(false);
          fetchCars(); // Refresh the cars list
        } catch (updateError) {
          console.error("Error updating car:", updateError);
          showNotification(
            `Error updating car: ${updateError instanceof Error ? updateError.message : 'Database error'}`,
            "error"
          );
        }
      } else {
        // Show creating notification
        showNotification("Adding new car...", "info");
        
        try {
          const insertData = {
            name: numericFormData.name,
            slug: numericFormData.slug,
            brand_id: numericFormData.brand_id,
            price_per_day: numericFormData.price_per_day,
            transmission: numericFormData.transmission,
            fuel_type: numericFormData.fuel_type,
            seats: numericFormData.seats,
            luggage: numericFormData.luggage,
            mileage: numericFormData.mileage,
            description: numericFormData.description,
            features: numericFormData.features,
            main_image: imageUrl
          };
          
          console.log("Adding new car with data:", insertData);
          
          // Create new car
          const { data, error } = await supabase
            .from("cars")
            .insert(insertData)
            .select();
          
          if (error) {
            console.error("Insert error:", error);
            throw error;
          }
          
          // Update local state
          if (data && data.length > 0) {
            console.log("New car data:", data[0]);
            setCars([...cars, data[0]]);
            showNotification("Car added successfully", "success");
            
            // Close dialog and refresh data without page reload
            setIsDialogOpen(false);
            fetchCars(); // Refresh the cars list
          }
        } catch (insertError) {
          console.error("Error adding car:", insertError);
          showNotification(
            `Error adding car: ${insertError instanceof Error ? insertError.message : 'Database error'}`,
            "error"
          );
        }
      }
    } catch (error) {
      console.error("Error saving car:", error);
      showNotification(
        `Error ${selectedCar ? "updating" : "adding"} car: ${error instanceof Error ? error.message : 'Unknown error'}`,
        "error"
      );
    } finally {
      // Reset form state
      clearForm();
    }
  };

  const showNotification = (message: string, type: "success" | "error" | "info") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newNotification = { id, message, type };
    
    setNotificationQueue(prev => [...prev, newNotification]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotificationQueue(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Filter cars based on search query
  const filteredCars = cars.filter(car => 
    car.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Cars</h1>
        <Button onClick={handleAddCar}>
          <Plus className="h-4 w-4 mr-2" /> Add New Car
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Queue - Stacked vertically */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notificationQueue.map((notification, index) => (
          <div
            key={notification.id}
            className={`p-4 rounded-md shadow-md transition-all duration-300 ${
              notification.type === "success" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : notification.type === "info"
                ? "bg-blue-100 text-blue-800 border border-blue-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
            style={{ 
              minWidth: '300px', 
              maxWidth: '500px',
              transform: `translateY(${index * 10}px)`,
              zIndex: 1000 - index
            }}
          >
            <div className="flex items-center">
              {notification.type === "success" ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : notification.type === "info" ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading cars...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price per day</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCars.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                    No cars found
                  </TableCell>
                </TableRow>
              ) : (
                filteredCars.map((car) => (
                  <TableRow key={car.id}>
                    <TableCell>
                      {car.main_image ? (
                        <div className="w-16 h-16 relative overflow-hidden rounded-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={car.main_image}
                            alt={car.name}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/cars/car-placeholder.jpg";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                          No image
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{car.name}</TableCell>
                    <TableCell>
                      {brands.find(b => b.id === car.brand_id)?.name || "Unknown"}
                    </TableCell>
                    <TableCell>₹{car.price_per_day}</TableCell>
                    <TableCell>{car.transmission} / {car.fuel_type}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditCar(car)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteCar(car)}>
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

      {/* Car Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCar ? "Edit Car" : "Add New Car"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Car Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
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
                <Label htmlFor="brand">Brand</Label>
                <Select
                  value={formData.brand_id}
                  onValueChange={(value) => handleSelectChange("brand_id", value)}
                >
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price_per_day">Price per day (₹)</Label>
                <Input
                  id="price_per_day"
                  name="price_per_day"
                  type="number"
                  min="0"
                  value={formData.price_per_day}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select
                  value={formData.transmission}
                  onValueChange={(value) => handleSelectChange("transmission", value)}
                >
                  <SelectTrigger id="transmission">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fuel_type">Fuel Type</Label>
                <Select
                  value={formData.fuel_type}
                  onValueChange={(value) => handleSelectChange("fuel_type", value)}
                >
                  <SelectTrigger id="fuel_type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seats">Seats</Label>
                <Input
                  id="seats"
                  name="seats"
                  type="number"
                  min="1"
                  max="12"
                  value={formData.seats}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="luggage">Luggage Capacity</Label>
                <Input
                  id="luggage"
                  name="luggage"
                  type="number"
                  min="0"
                  value={formData.luggage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage (km/l)</Label>
                <Input
                  id="mileage"
                  name="mileage"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Features</Label>
              <div className="flex space-x-2">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  placeholder="Add a feature"
                />
                <Button type="button" onClick={addFeature}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full flex items-center"
                  >
                    <span className="text-sm">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Car Image</Label>
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
                <div className="mt-4 relative w-48 h-48 overflow-hidden rounded-md border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedCar ? "Update Car" : "Add Car"}
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
              This action cannot be undone. This will permanently delete {selectedCar?.name} and remove it from our database.
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

