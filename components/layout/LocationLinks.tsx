import Link from "next/link";

const LocationLinks = () => {
  // Comprehensive list of all 36 requested locations from website.txt
  const allLocations = [
    // ─── Goa Locations (29) ──────────────────────────────
    { name: "Goa", slug: "self-drive-car-rental-in-goa" },
    { name: "Goa Airport", slug: "self-drive-car-rental-goa-airport" },
    { name: "North Goa", slug: "self-drive-car-rental-north-goa" },
    { name: "South Goa", slug: "self-drive-car-rental-south-goa" },
    { name: "Madgaon", slug: "self-drive-car-rental-madgaon" },
    { name: "Panjim", slug: "self-drive-car-rental-panjim" },
    { name: "Calangute", slug: "self-drive-car-rental-calangute" },
    { name: "Candolim", slug: "self-drive-car-rental-candolim" },
    { name: "Anjuna", slug: "self-drive-car-rental-anjuna" },
    { name: "Vagator", slug: "self-drive-car-rental-vagator" },
    { name: "Arambol", slug: "self-drive-car-rental-arambol" },
    { name: "Mandrem", slug: "self-drive-car-rental-mandrem" },
    { name: "Morjim", slug: "self-drive-car-rental-morjim" },
    { name: "Assagao", slug: "self-drive-car-rental-assagao" },
    { name: "Siolim", slug: "self-drive-car-rental-siolim" },
    { name: "Arpora", slug: "self-drive-car-rental-arpora" },
    { name: "Mapusa", slug: "self-drive-car-rental-mapusa" },
    { name: "Ponda", slug: "self-drive-car-rental-ponda" },
    { name: "Vasco da Gama", slug: "self-drive-car-rental-vasco" },
    { name: "Thivim", slug: "self-drive-car-rental-thivim" },
    { name: "Karmali", slug: "self-drive-car-rental-karmali" },
    { name: "Bambolim", slug: "self-drive-car-rental-bambolim" },
    { name: "Bogmalo", slug: "self-drive-car-rental-bogmalo" },
    { name: "Majorda", slug: "self-drive-car-rental-majorda" },
    { name: "Colva", slug: "self-drive-car-rental-colva" },
    { name: "Benaulim", slug: "self-drive-car-rental-benaulim" },
    { name: "Varca", slug: "self-drive-car-rental-varca" },
    { name: "Canacona", slug: "self-drive-car-rental-canacona" },
    { name: "Agonda", slug: "self-drive-car-rental-agonda" },

    // ─── Mumbai Region (4) ───────────────────────────────
    { name: "Mumbai", slug: "mumbai" },
    { name: "Navi Mumbai", slug: "navi-mumbai" },
    { name: "Thane", slug: "thane" },
    { name: "Mumbra", slug: "mumbra" },

    // ─── Outstation & Major Cities (3) ───────────────────
    { name: "Bangalore", slug: "bangalore" },
    { name: "Delhi", slug: "delhi" },
    { name: "Hyderabad", slug: "hyderabad" },
  ];

  return (
    <div className="w-full bg-gray-900 text-white py-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 space-y-4">
        <h3 className="text-xl font-bold text-white relative inline-block after:absolute after:-bottom-1 after:left-0 after:w-12 after:h-1 after:bg-blue-600">
          POPULAR CAR RENTAL LOCATIONS
        </h3>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs md:text-sm text-gray-300 pt-2">
          {allLocations.map((location, index) => (
            <span key={location.slug} className="inline-flex items-center gap-2">
              <Link
                href={`/locations/${location.slug}`}
                className="hover:text-blue-400 transition-colors font-medium"
              >
                Car Rental in {location.name}
              </Link>
              {index < allLocations.length - 1 && (
                <span className="text-gray-600 font-bold">|</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationLinks;
