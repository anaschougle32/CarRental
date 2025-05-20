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
    description: "",
    features: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

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
      const { data, error } = await supabase.from("brands").select("*");
      
      if (error) throw error;
      
      if (data) {
        setBrands(data);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
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
      description: "",
      features: [],
    });
    setImageFile(null);
    setImagePreview("");
    setIsDialogOpen(true);
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
      const { error } = await supabase
        .from("cars")
        .delete()
        .eq("id", selectedCar.id);
      
      if (error) throw error;
      
      // Update the local state
      setCars(cars.filter(car => car.id !== selectedCar.id));
      showNotification("Car deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting car:", error);
      showNotification("Error deleting car", "error");
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "price_per_day" || name === "seats" || name === "luggage") {
      setFormData({
        ...formData,
        [name]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // Auto-generate slug from name
    if (name === "name") {
      setFormData({
        ...formData,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    
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
    
    // Create a unique filename
    const extension = imageFile.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${extension}`;
    const filePath = `cars/${filename}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("images")
      .upload(filePath, imageFile);
    
    if (error) throw error;
    
    // Return the public URL
    return `/images/cars/${filename}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = "";
      
      // Upload image if we have a file
      if (imageFile) {
        imageUrl = await uploadImage();
      } else if (selectedCar?.main_image) {
        imageUrl = selectedCar.main_image;
      } else {
        throw new Error("Image is required");
      }
      
      if (selectedCar) {
        // Update existing car
        const { error } = await supabase
          .from("cars")
          .update({
            ...formData,
            main_image: imageUrl,
          })
          .eq("id", selectedCar.id);
        
        if (error) throw error;
        
        // Update local state
        setCars(
          cars.map(car => 
            car.id === selectedCar.id 
              ? { ...car, ...formData, main_image: imageUrl } 
              : car
          )
        );
        
        showNotification("Car updated successfully", "success");
      } else {
        // Create new car
        const { data, error } = await supabase
          .from("cars")
          .insert({
            ...formData,
            main_image: imageUrl,
          })
          .select();
        
        if (error) throw error;
        
        // Update local state
        if (data && data.length > 0) {
          setCars([...cars, data[0]]);
          showNotification("Car added successfully", "success");
        }
      }
      
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error saving car:", error);
      showNotification(
        `Error ${selectedCar ? "updating" : "adding"} car`,
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
                              (e.target as HTMLImageElement).src = "/images/car-placeholder.jpg";
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