"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Edit, Trash2, Plus, Search, CheckCircle, AlertCircle
} from "lucide-react";
import { getLocations, createLocation, updateLocation, deleteLocation, Location } from "@/lib/supabase";
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

// Using Location type from @/lib/supabase

export default function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Location>>({
    name: "",
    slug: "",
    headline: "",
    content: "",
  });
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  const router = useRouter();

  // Fetch locations on component mount
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setIsLoading(true);
      const data = await getLocations();
      setLocations(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      showNotification("Failed to load locations", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddLocation = () => {
    setSelectedLocation(null);
    setFormData({
      name: "",
      slug: "",
      headline: "",
      content: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setFormData({
      name: location.name,
      slug: location.slug,
      headline: location.headline,
      content: location.content,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLocation) return;
    
    try {
      showNotification("Deleting location...", "info");
      
      await deleteLocation(selectedLocation.id);
      
      // Update local state
      setLocations(locations.filter(loc => loc.id !== selectedLocation.id));
      showNotification("Location deleted successfully", "success");
      
      // Close dialog
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting location:", error);
      showNotification(
        `Error deleting location: ${error instanceof Error ? error.message : 'Unknown error'}`,
        "error"
      );
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // If name field is changed, auto-generate slug (unless it's being edited)
    if (name === "name" && (!selectedLocation || (selectedLocation && selectedLocation.slug === formData.slug))) {
      const slug = value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      setFormData({
        ...formData,
        name: value,
        slug,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.slug || !formData.headline || !formData.content) {
      showNotification("Please fill in all required fields", "error");
      return;
    }
    
    try {
      showNotification("Saving location...", "info");
      
      // Check if slug is unique (except for the current location being edited)
      const existingLocations = await getLocations();
      
      // If editing, filter out the current location from the check
      const slugExists = selectedLocation
        ? existingLocations.some(loc => loc.id !== selectedLocation.id && loc.slug === formData.slug)
        : existingLocations.some(loc => loc.slug === formData.slug);
      
      if (slugExists) {
        showNotification("A location with this slug already exists", "error");
        return;
      }
      
      if (selectedLocation) {
        // Update existing location
        const updatedLocation = await updateLocation(selectedLocation.id, {
          name: formData.name,
          slug: formData.slug,
          headline: formData.headline,
          content: formData.content
        });
        
        // Update local state
        setLocations(locations.map(loc => 
          loc.id === selectedLocation.id ? updatedLocation : loc
        ));
        
        showNotification("Location updated successfully", "success");
      } else {
        // Create new location
        const newLocation = await createLocation({
          name: formData.name || "",
          slug: formData.slug || "",
          headline: formData.headline || "",
          content: formData.content || ""
        });
        
        // Update local state with the new location
        setLocations([...locations, newLocation]);
        
        showNotification("Location added successfully", "success");
      }
      
      // Close dialog and reset form
      setIsDialogOpen(false);
      setFormData({
        name: "",
        slug: "",
        headline: "",
        content: "",
      });
    } catch (error) {
      console.error("Error saving location:", error);
      showNotification(
        `Error ${selectedLocation ? "updating" : "adding"} location: ${error instanceof Error ? error.message : 'Unknown error'}`,
        "error"
      );
    }
  };

  const showNotification = (message: string, type: string) => {
    // Set notification state
    setNotification({ show: true, message, type });
    
    // Create a toast-like notification that appears at the top-right corner of the screen
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${type === 'success' ? 'bg-green-100 text-green-800' : type === 'error' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`;
    toast.style.minWidth = '300px';
    toast.style.maxWidth = '500px';
    
    const content = document.createElement('div');
    content.className = 'flex items-center';
    content.innerHTML = `
      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        ${type === 'success' 
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
          : type === 'error'
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
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

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Locations</h1>
        <Button onClick={handleAddLocation}>
          <Plus className="h-4 w-4 mr-2" /> Add New Location
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search locations..."
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
            : notification.type === "info"
            ? "bg-blue-50 text-blue-700 border border-blue-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
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
            <p>{notification.message}</p>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-10">Loading locations...</div>
      ) : (
        !isLoading && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Headline</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {locations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                      No locations found. Add your first location to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  locations
                    .filter((location) => 
                      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      location.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      location.headline.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((location) => (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.name}</TableCell>
                        <TableCell>{location.slug}</TableCell>
                        <TableCell className="truncate max-w-xs">{location.headline}</TableCell>
                        <TableCell className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => handleEditLocation(location)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDeleteLocation(location)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </div>
        )
      )}

      {/* Location Form Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedLocation ? "Edit Location" : "Add New Location"}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Location Name</Label>
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
              <p className="text-sm text-gray-500">
                This will be used in the URL: /locations/{formData.slug}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                name="headline"
                value={formData.headline}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={8}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {selectedLocation ? "Update Location" : "Add Location"}
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
              This action cannot be undone. This will permanently delete {selectedLocation?.name} and remove it from our database.
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
