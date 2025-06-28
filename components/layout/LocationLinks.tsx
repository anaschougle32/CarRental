import Link from "next/link";

const LocationLinks = () => {
  // Static list of locations for SEO (prevents hydration issues)
  const staticLocations = [
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
