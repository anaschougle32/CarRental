"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, Phone, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 backdrop-blur-md",
        isScrolled
          ? "bg-white/70 dark:bg-gray-900/80 shadow-md py-2"
          : "bg-white/40 dark:bg-gray-900/50 py-3"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-primary">
          <Logo className="h-10 w-10" />
          <span className="font-satoshi font-bold text-2xl">
            Go<span className="text-blue-600">Drive</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/cars"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            Cars
          </Link>
          <Link
            href="/blogs"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="nav-link font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:block">
          <Button 
            variant="default" 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-4 shadow-md" 
            asChild
          >
            <Link href="tel:+919867975473" className="flex items-center gap-2">
              <Phone size={16} />
              <span>+919867975473</span>
            </Link>
          </Button>
        </div>

        <button
          className="md:hidden text-gray-900 dark:text-white p-2 rounded-md bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-gray-800/50"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

export default Header;