"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight } from "lucide-react";
import Logo from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Track if the header is scrolled to match its styling
  const [isScrolled, setIsScrolled] = useState(false);

  // Update scrolled state to match header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Fixed Navbar */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm md:hidden",
          isScrolled ? "bg-white dark:bg-gray-900 py-2" : "bg-white dark:bg-gray-900 py-3"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Logo />
          
          <button
            className="text-gray-900 dark:text-white p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 mobile-menu-button shadow-sm"
            onClick={onClose}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      
      {/* Dropdown Menu */}
      <div
        className={cn(
          "fixed top-[60px] left-0 right-0 z-40 transition-all duration-300 ease-in-out md:hidden overflow-hidden mobile-menu-container",
          isOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div 
          className={cn(
            "w-full rounded-b-xl shadow-lg transition-all duration-300",
            "bg-white dark:bg-gray-900"
          )}
        >
          <nav className="container mx-auto px-4 py-2">
            <div className="space-y-1">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Cars", href: "/cars" },
                { name: "Locations", href: "/locations" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    onClose();
                    // Small delay to ensure menu closes before navigation
                    setTimeout(() => {
                      if (item.href.startsWith('tel:') || item.href.startsWith('mailto:')) {
                        window.location.href = item.href;
                      }
                    }, 100);
                  }}
                  className="flex items-center justify-between w-full p-3 rounded-lg text-gray-900 dark:text-white font-medium hover:bg-white/40 dark:hover:bg-gray-800/40 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
                >
                  <span>{item.name}</span>
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col space-y-2">
                <a 
                  href="tel:+919082888912"
                  className="flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200 shadow-md"
                  onClick={onClose}
                >
                  Call Us Now: +91 90828 88912
                </a>
                <a 
                  href="https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20renting%20a%20car."
                  className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200 shadow-md"
                  onClick={onClose}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: +91 79-77288350
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-[3px] md:hidden" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default MobileMenu;