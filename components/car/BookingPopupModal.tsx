"use client";

import { useState, useEffect } from "react";
import { Car } from "@/lib/types";
import { X, MessageSquare, PhoneCall, Sparkles, Clock } from "lucide-react";

interface BookingPopupModalProps {
  car: Car;
}

export default function BookingPopupModal({ car }: BookingPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup 6 seconds after user opens the car details page
    const timer = setTimeout(() => {
      const hasDismissed = sessionStorage.getItem(`dismissed_popup_${car.slug}`);
      if (!hasDismissed) {
        setIsOpen(true);
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [car.slug]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(`dismissed_popup_${car.slug}`, "true");
  };

  if (!isOpen) return null;

  const whatsappText = `Hi, I'm interested in renting the ${car.brand} ${car.name}. Please confirm availability and rates.`;
  const whatsappLink = `https://wa.me/917977288350?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all duration-300 scale-100">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white text-center relative">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={14} className="text-yellow-300" /> Special Offer Available
          </div>
          <h3 className="text-xl font-bold">Rent {car.brand} {car.name}</h3>
          <p className="text-sm text-blue-100 mt-1">Unlimited KM • Free Delivery • Zero Hidden Fees</p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-5 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex-1">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">{car.category}</span>
              <h4 className="font-bold text-gray-900 dark:text-white text-base">{car.name}</h4>
              <p className="text-xs text-gray-500">{car.fuel_type} • {car.transmission}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 block">Starting from</span>
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">₹{car.price_per_day}</span>
              <span className="text-xs text-gray-500">/day</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200/50 dark:border-amber-800/30">
            <Clock size={14} className="text-amber-600 flex-shrink-0" />
            <span>High demand vehicle! Reserve early to guarantee your dates.</span>
          </div>

          <div className="space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <MessageSquare size={18} />
              Book via WhatsApp Instantly
            </a>

            <a
              href="tel:+919082888912"
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm border border-gray-200 dark:border-gray-700"
            >
              <PhoneCall size={18} className="text-blue-600" />
              Call Customer Support Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
