"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react";
import LocationLinks from "./LocationLinks";

const Footer = () => {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();
  
  const whatsappLink = "https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20renting%20a%20car.";

  return (
    <>
    <LocationLinks />
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6 md:pb-8 w-full">
      <div className="w-full max-w-[var(--container-max)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              Zio<span className="text-blue-500">CarRentals</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-xs text-sm md:text-base">
              Your trusted destination for self-drive car rentals, offering hatchbacks, sedans, SUVs, and luxury cars with flexible rental plans, transparent pricing, and reliable customer support.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/ziocarrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors bg-gray-800/50 p-2 rounded-full"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/zio_car_rental_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors bg-gray-800/50 p-2 rounded-full"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://twitter.com/ziocarrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors bg-gray-800/50 p-2 rounded-full"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.pinterest.com/ziocarrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors bg-gray-800/50 p-2 rounded-full"
                aria-label="Pinterest"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@ziocarrentals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors bg-gray-800/50 p-2 rounded-full"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-blue-400">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/locations"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Car Listing
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-blue-400">Policies</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Term and Condition
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Contact Info</h3>
            <div className="space-y-3 text-sm md:text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-300">
                  Shop no. 1, Mini Max Apartment, <br /> ND Naik Rd, Madgaon, Goa 403601
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-500 flex-shrink-0" size={18} />
                <a
                  href="tel:+919082888912"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  +91 90828 88912
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l.135.215-1.002 3.661 3.755-.985.201.119z"/>
                </svg>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  +91 79-77288350
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-500 flex-shrink-0" size={18} />
                <a
                  href="mailto:info@ziocarrentals.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  info@ziocarrentals.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="mt-10 md:mt-12 rounded-lg overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3483.0556040277565!2d73.9706294745849!3d15.27314771025846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb3d41dfadb93%3A0x575b1e5b00c0ea93!2sZio%20Car%20%26%20Bike%20Rentals!5e1!3m2!1sen!2sin!4v1764955984518!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Zio Car & Bike Rentals - Shop no. 1, Mini Max Apartment, ND Naik Rd, Madgaon, Goa 403601"
            className="w-full md:h-[300px]"
          ></iframe>
        </div>

        <div className="border-t border-gray-800 mt-10 md:mt-12 pt-6 md:pt-8">
          <p className="text-gray-400 text-center text-xs md:text-sm">
            © {currentYear} ZioCarRentals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;