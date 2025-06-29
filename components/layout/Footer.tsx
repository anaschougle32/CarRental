"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Youtube } from "lucide-react";
import { FaWhatsapp, FaPinterest } from "react-icons/fa";
import LocationLinks from "./LocationLinks";

const Footer = () => {
  // Get current date for real-time display
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const formattedDate = currentDate.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const whatsappLink = "https://wa.me/917977288350?text=Hi,%20I'm%20interested%20in%20renting%20a%20car.";

  return (
    <>
    <LocationLinks />
    <footer className="bg-gray-900 text-white pt-12 md:pt-16 pb-6 md:pb-8 w-full">
      <div className="container mx-auto px-4 md:px-6">
        {/* Date display */}
        <div className="text-right text-gray-400 text-sm mb-6">
          <p>{formattedDate}</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              Zio<span className="text-blue-500">CarRentals</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-xs text-sm md:text-base">
              Premium self-drive car rentals in Goa with unlimited kilometers,
              airport pickup, and 24/7 roadside assistance.
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
                <FaPinterest size={18} />
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
                  href="/cars"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Our Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-blue-400 transition-colors block py-1"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-lg font-bold mb-4 text-blue-400">Legal</h3>
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
                  Terms & Conditions
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

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-blue-400">Contact Us</h3>
            <div className="space-y-4 text-sm md:text-base">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-500 mt-1 flex-shrink-0" size={18} />
                <p className="text-gray-300">
                  123 Beach Road, Calangute, <br /> North Goa, 403516
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
                <FaWhatsapp className="text-green-500 flex-shrink-0" size={18} />
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25155.870809170843!2d73.95091347875199!3d15.266892013288974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfb3f4b670aaed%3A0xbf05105f66003bfe!2sZio%20Car%20Rentals!5e0!3m2!1sen!2sin!4v1749562513743!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of ZioCarRentals, Goa"
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