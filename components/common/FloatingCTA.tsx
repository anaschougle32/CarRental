"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingCTA = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappLink = "https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20renting%20a%20car.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3">
      {/* WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center justify-center"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <svg className="w-6.5 h-6.5 fill-current flex-shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.135.215-1.002 3.661 3.755-.985.201.119z"/>
        </svg>
        <span className={cn(
          "absolute right-12 bg-black/80 text-white whitespace-nowrap rounded-lg px-3 py-1 text-sm",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "pointer-events-none"
        )}>
          WhatsApp Us
        </span>
      </a>

      {/* Call Button */}
      <Link
        href="tel:+919082888912"
        className="group relative bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center animate-pulse"
        aria-label="Call us"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Phone size={26} className="flex-shrink-0" />
        <span className={cn(
          "absolute right-12 bg-black/80 text-white whitespace-nowrap rounded-lg px-3 py-1 text-sm",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "pointer-events-none"
        )}>
          Call Us Now
        </span>
      </Link>
    </div>
  );
};

export default FloatingCTA;