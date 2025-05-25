"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLocations } from "@/lib/supabase";
import { Location } from "@/lib/supabase";

const LocationLinks = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsData = await getLocations();
        setLocations(locationsData);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Comprehensive list of locations for SEO
  const additionalLocations = [
    // North Goa Locations
    { name: "Anjuna", slug: "anjuna" },
    { name: "Calangute", slug: "calangute" },
    { name: "Baga", slug: "baga" },
    { name: "Candolim", slug: "candolim" },
    { name: "Panjim", slug: "panjim" },
    { name: "Vagator", slug: "vagator" },
    { name: "Morjim", slug: "morjim" },
    { name: "Arambol", slug: "arambol" },
    { name: "Mandrem", slug: "mandrem" },
    { name: "Ashwem", slug: "ashwem" },
    { name: "Sinquerim", slug: "sinquerim" },
    { name: "Dona Paula", slug: "dona-paula" },
    { name: "Arpora", slug: "arpora" },
    { name: "Chapora", slug: "chapora" },
    { name: "Siolim", slug: "siolim" },
    { name: "Assagao", slug: "assagao" },
    { name: "North Goa", slug: "north-goa" },
    
    // South Goa Locations
    { name: "Colva", slug: "colva" },
    { name: "Palolem", slug: "palolem" },
    { name: "Benaulim", slug: "benaulim" },
    { name: "Varca", slug: "varca" },
    { name: "Margao", slug: "margao" },
    { name: "Agonda", slug: "agonda" },
    { name: "Cavelossim", slug: "cavelossim" },
    { name: "Mobor", slug: "mobor" },
    { name: "Majorda", slug: "majorda" },
    { name: "Betalbatim", slug: "betalbatim" },
    { name: "Canacona", slug: "canacona" },
    { name: "Bogmalo", slug: "bogmalo" },
    { name: "Vasco Da Gama", slug: "vasco-da-gama" },
    { name: "Cansaulim", slug: "cansaulim" },
    { name: "Arossim", slug: "arossim" },
    { name: "South Goa", slug: "south-goa" },
    
    // Transportation Hubs
    { name: "Goa Airport", slug: "goa-airport" },
    { name: "Mopa Airport", slug: "mopa-airport" },
    { name: "Madgaon Railway Station", slug: "madgaon-railway" },
    { name: "Thivim Railway Station", slug: "thivim-railway" },
    { name: "Karmali Railway Station", slug: "karmali-railway" },
    { name: "Vasco Railway Station", slug: "vasco-railway" },
    
    // Cities and Towns
    { name: "Madgaon", slug: "madgaon" },
    { name: "Mapusa", slug: "mapusa" },
    { name: "Porvorim", slug: "porvorim" },
    { name: "Bicholim", slug: "bicholim" },
    { name: "Ponda", slug: "ponda" },
    { name: "Curchorem", slug: "curchorem" },
    { name: "Sanquelim", slug: "sanquelim" },
    { name: "Quepem", slug: "quepem" },
    { name: "Cuncolim", slug: "cuncolim" },
    { name: "Sanguem", slug: "sanguem" }
  ];

  // Combine database locations with additional static locations
  // Filter out duplicates by slug
  const allLocations = [...locations];
  
  // Add static locations that don't exist in the database
  additionalLocations.forEach(loc => {
    if (!allLocations.some(dbLoc => dbLoc.slug === loc.slug)) {
      allLocations.push({
        id: `static-${loc.slug}`,
        name: loc.name,
        slug: loc.slug,
        headline: `Car Rental in ${loc.name}, Goa`,
        content: `Find the best car rental deals in ${loc.name}, Goa with ZoiCarRentals.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  });

  return (
    <div className="w-full bg-gray-900 text-white py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-xl font-bold mb-4 text-white relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-red-600">
          LOCATION
        </h3>
        <div className="flex flex-wrap gap-y-1 mt-4">
          {allLocations.map((location, index) => (
            <Link
              key={location.id}
              href={`/locations/${location.slug}`}
              className="text-gray-300 hover:text-blue-400 transition-colors text-sm md:text-base"
            >
              <span className="mx-1 text-gray-600">|</span>
              Car Rental in {location.name}
            </Link>
          ))}
          <Link
            href="/locations"
            className="text-gray-300 hover:text-blue-400 transition-colors text-sm md:text-base"
          >
            <span className="mx-1 text-gray-600">|</span>
            Car on Rent in Goa
          </Link>
          <span className="mx-1 text-gray-600">|</span>
        </div>
      </div>
    </div>
  );
};

export default LocationLinks;
