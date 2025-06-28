"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, Phone, MessageCircle } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const whatsappLink = "https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20renting%20a%20car.";

  // No longer using time display

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle closing the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        // Close the menu when clicking outside
        const target = event.target as HTMLElement;
        if (!target.closest('.mobile-menu-container') && !target.closest('.mobile-menu-button')) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/90 shadow-md py-2"
          : "bg-white/50 dark:bg-gray-900/60 py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-primary">
          <Logo className="h-8 w-8 md:h-10 md:w-10" />
          <span className="font-satoshi font-bold text-xl md:text-2xl">
            Zio<span className="text-blue-600">CarRentals</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            href="/"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors text-sm lg:text-base"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors text-sm lg:text-base"
          >
            About
          </Link>
          <Link
            href="/cars"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors text-sm lg:text-base"
          >
            Cars
          </Link>
          <Link
            href="/locations"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors text-sm lg:text-base"
          >
            Locations
          </Link>
          <Link
            href="/blogs"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors text-sm lg:text-base"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors text-sm lg:text-base"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center">
          <Button 
            variant="default" 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-3 lg:px-4 shadow-md text-xs lg:text-sm" 
            asChild
          >
            <Link href="tel:+919082888912" className="flex items-center gap-1 lg:gap-2">
              <Phone size={14} />
              <span className="hidden lg:inline">+91 90828 88912</span>
              <span className="lg:hidden">Call</span>
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden text-gray-900 dark:text-white p-2 rounded-lg bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 mobile-menu-button shadow-sm"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
}

export default Header;