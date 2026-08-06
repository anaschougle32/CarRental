import Link from "next/link";

const LocationLinks = () => {
  // Static list of requested footer locations from website.txt
  const staticLocations = [
    { name: "Goa Airport", slug: "self-drive-car-rental-goa-airport" },
    { name: "Margao", slug: "self-drive-car-rental-madgaon" },
    { name: "Panjim", slug: "self-drive-car-rental-panjim" },
    { name: "Calangute", slug: "self-drive-car-rental-calangute" },
    { name: "Goa", slug: "self-drive-car-rental-in-goa" },
    { name: "Thivim Railway Station", slug: "self-drive-car-rental-thivim" },
    { name: "Karmali Railway Station", slug: "self-drive-car-rental-karmali" },
    { name: "South Goa", slug: "self-drive-car-rental-south-goa" },
    { name: "North Goa", slug: "self-drive-car-rental-north-goa" },
    { name: "Vasco da Gama", slug: "self-drive-car-rental-vasco" },
    { name: "Mumbai", slug: "self-drive-car-rental-mumbai" },
    { name: "Hyderabad", slug: "self-drive-car-rental-hyderabad" },
    { name: "Bangalore", slug: "self-drive-car-rental-bangalore" }
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
