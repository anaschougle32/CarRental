"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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
        <FaWhatsapp size={26} className="flex-shrink-0" />
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