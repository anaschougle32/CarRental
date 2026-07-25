import Link from "next/link";

const LocationLinks = () => {
  // Static list of requested footer locations for SEO
  const staticLocations = [
    { name: "Calangute", slug: "calangute" },
    { name: "Panjim", slug: "panjim" },
    { name: "Goa Airport", slug: "goa-airport" },
    { name: "Vasco Da Gama", slug: "vasco-da-gama" },
    { name: "Madgaon Railway Station", slug: "madgaon-railway" },
    { name: "Thivim Railway Station", slug: "thivim-railway" },
    { name: "Karmali Railway Station", slug: "karmali-railway" },
    { name: "South Goa", slug: "south-goa" },
    { name: "North Goa", slug: "north-goa" },
    { name: "Mumbai", slug: "mumbai" },
    { name: "Hyderabad", slug: "hyderabad" },
    { name: "Bangalore", slug: "bangalore" }
  ];

  // Use static locations to prevent hydration issues
  const allLocations = staticLocations;

  return (
    <div className="w-full bg-gray-900 text-white py-6 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <h3 className="text-xl font-bold mb-4 text-white relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-red-600">
          LOCATION
        </h3>
        <div className="flex flex-wrap gap-y-1 mt-4">
          {allLocations.map((location, index) => (
            <Link
              key={location.slug}
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
