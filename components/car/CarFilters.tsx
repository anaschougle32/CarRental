"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const CarFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [category, setCategory] = useState(searchParams?.get("category") || "All");
  const [fuelType, setFuelType] = useState(searchParams?.get("fuel") || "All");
  const [transmission, setTransmission] = useState(searchParams?.get("transmission") || "All");

  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (category !== "All") params.set("category", category);
    if (fuelType !== "All") params.set("fuel", fuelType);
    if (transmission !== "All") params.set("transmission", transmission);
    if (priceRange[0] > 0 || priceRange[1] < 5000) {
      params.set("min_price", priceRange[0].toString());
      params.set("max_price", priceRange[1].toString());
    }
    
    router.push(`/cars?${params.toString()}`);
  };

  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setCategory("All");
    setFuelType("All");
    setTransmission("All");
    router.push("/cars");
  };

  return (
    <Card className="p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-6">Filter Cars</h2>
      
      {/* Car Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Car Type</h3>
        <ToggleGroup type="single" value={category} onValueChange={(value) => value && setCategory(value)} className="flex flex-wrap gap-2">
          <ToggleGroupItem value="All" className="rounded-full text-xs">All</ToggleGroupItem>
          <ToggleGroupItem value="Hatchback" className="rounded-full text-xs">Hatchback</ToggleGroupItem>
          <ToggleGroupItem value="Sedan" className="rounded-full text-xs">Sedan</ToggleGroupItem>
          <ToggleGroupItem value="SUV" className="rounded-full text-xs">SUV</ToggleGroupItem>
          <ToggleGroupItem value="Luxury" className="rounded-full text-xs">Luxury</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Fuel Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Fuel Type</h3>
        <ToggleGroup type="single" value={fuelType} onValueChange={(value) => value && setFuelType(value)} className="flex flex-wrap gap-2">
          <ToggleGroupItem value="All" className="rounded-full text-xs">All</ToggleGroupItem>
          <ToggleGroupItem value="Petrol" className="rounded-full text-xs">Petrol</ToggleGroupItem>
          <ToggleGroupItem value="Diesel" className="rounded-full text-xs">Diesel</ToggleGroupItem>
          <ToggleGroupItem value="Electric" className="rounded-full text-xs">Electric</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Transmission */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3">Transmission</h3>
        <ToggleGroup type="single" value={transmission} onValueChange={(value) => value && setTransmission(value)} className="flex flex-wrap gap-2">
          <ToggleGroupItem value="All" className="rounded-full text-xs">All</ToggleGroupItem>
          <ToggleGroupItem value="Manual" className="rounded-full text-xs">Manual</ToggleGroupItem>
          <ToggleGroupItem value="Automatic" className="rounded-full text-xs">Automatic</ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {/* Price Range */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          <h3 className="text-sm font-medium">Price Range (₹/day)</h3>
          <span className="text-sm text-gray-500">
            ₹{priceRange[0]} - ₹{priceRange[1]}
          </span>
        </div>
        <Slider
          defaultValue={[0, 5000]}
          min={0}
          max={5000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-6"
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="flex-1">
          Apply Filters
        </Button>
        <Button variant="outline" onClick={resetFilters} className="flex-1">
          Reset
        </Button>
      </div>
    </Card>
  );
};

export default CarFilters;