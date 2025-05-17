"use client";

import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Phone, Home, Car, FileText, Info, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const whatsappLink = "https://wa.me/918888888888?text=Hi,%20I'm%20interested%20in%20renting%20a%20car.";

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-white/98 dark:bg-gray-900/98 transition-transform duration-300 ease-in-out transform md:hidden",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      <div className="flex flex-col h-full pt-20 pb-6 px-6">
        <nav className="flex-1 space-y-6 mt-8">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Home size={20} className="text-blue-600" />
            <span className="font-medium">Home</span>
          </Link>
          <Link
            href="/cars"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Car size={20} className="text-blue-600" />
            <span className="font-medium">Cars</span>
          </Link>
          <Link
            href="/blogs"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <FileText size={20} className="text-blue-600" />
            <span className="font-medium">Blog</span>
          </Link>
          <Link
            href="/about"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Info size={20} className="text-blue-600" />
            <span className="font-medium">About</span>
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center space-x-3 text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Mail size={20} className="text-blue-600" />
            <span className="font-medium">Contact</span>
          </Link>
        </nav>

        <div className="mt-auto space-y-3">
          <Button variant="default" className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="tel:+918888888888" className="flex items-center justify-center gap-2">
              <Phone size={18} />
              <span>Call Us Now</span>
            </Link>
          </Button>

          <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              <MessageCircle size={18} />
              <span>WhatsApp Us</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;