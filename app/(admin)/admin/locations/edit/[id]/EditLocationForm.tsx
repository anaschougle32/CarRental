"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateLocation } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Location {
  id: string;
  name: string;
  slug: string;
  headline: string;
  content: string;
}

interface EditLocationFormProps {
  location: Location;
}

export default function EditLocationForm({ location }: EditLocationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: location.name,
    slug: location.slug,
    headline: location.headline,
    content: location.content,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.name || !formData.slug || !formData.headline || !formData.content) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Update location
      await updateLocation(location.id, {
        name: formData.name,
        slug: formData.slug,
        headline: formData.headline,
        content: formData.content,
      });

      toast.success("Location updated successfully");
      router.push("/admin/locations");
    } catch (error) {
      console.error("Error updating location:", error);
      toast.error("Failed to update location. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin/locations" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Location</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="name">Location Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Calangute"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="e.g. calangute"
            required
          />
          <p className="text-sm text-gray-500">
            This will be used in the URL: /locations/{formData.slug || "example"}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="headline">Headline</Label>
          <Input
            id="headline"
            name="headline"
            value={formData.headline}
            onChange={handleChange}
            placeholder="Short description of the location"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Detailed information about the location"
            rows={8}
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Location"}
        </Button>
      </form>
    </div>
  );
}
