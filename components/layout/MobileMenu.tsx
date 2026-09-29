"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, Facebook, Instagram, Youtube } from "lucide-react";
import Logo from "./Logo";
import { SOCIAL_LINKS } from "@/lib/social";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  // Track if the header is scrolled to match its styling
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before using browser APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update scrolled state to match header
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted]);
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (!mounted) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, mounted]);

  return (
    <>
      {/* Fixed Navbar */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-sm md:hidden",
          isScrolled ? "bg-white dark:bg-gray-900 py-2" : "bg-white dark:bg-gray-900 py-3"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" onClick={onClose}>
            <Logo />
          </Link>
          
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
                { name: "About Us", href: "/about-us" },
                { name: "Cars", href: "/cars" },
                { name: "Listing", href: "/locations" },
                { name: "Blogs", href: "/blogs" },
                { name: "Contact Us", href: "/contact-us" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    onClose();
                    // Small delay to ensure menu closes before navigation
                    if (mounted) {
                      setTimeout(() => {
                        if (item.href.startsWith('tel:') || item.href.startsWith('mailto:')) {
                          window.location.href = item.href;
                        }
                      }, 100);
                    }
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

              {/* Social Media Links */}
              <div className="mt-4 flex items-center justify-center space-x-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={SOCIAL_LINKS.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  aria-label="X (formerly Twitter)"
                  title="X"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="Pinterest"
                  title="Pinterest"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label="YouTube"
                  title="YouTube"
                >
                  <Youtube size={18} />
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