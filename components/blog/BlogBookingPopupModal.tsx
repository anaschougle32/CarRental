"use client";

import { useState, useEffect } from "react";
import { X, PhoneCall, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";

interface BlogBookingPopupModalProps {
  blogTitle: string;
}

export default function BlogBookingPopupModal({ blogTitle }: BlogBookingPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [returnDate, setReturnDate] = useState<string>(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );

  useEffect(() => {
    // Trigger popup 2 seconds after reading the blog post
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [blogTitle]);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const formattedPickup = pickupDate
    ? format(new Date(pickupDate), "PPP")
    : "Select Pickup Date";
  const formattedReturn = returnDate
    ? format(new Date(returnDate), "PPP")
    : "Select Return Date";

  const whatsappText = `Hi, I read your article "${blogTitle}" and I want to rent a car in Goa from ${formattedPickup} to ${formattedReturn}. Please share available cars and prices.`;
  const whatsappLink = `https://wa.me/917977288350?text=${encodeURIComponent(whatsappText)}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white text-center relative">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles size={14} className="text-yellow-300" /> Plan Your Goa Roadtrip
          </div>
          <h3 className="text-2xl font-bold">Need a Car in Goa?</h3>
          <p className="text-xs text-blue-100 mt-1.5 leading-relaxed">
            Rent self-drive hatchbacks, SUVs & luxury cars with unlimited kilometers and zero hidden fees.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Date Pickers */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="blog-popup-pickup-date" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Pickup Date
              </label>
              <div className="relative flex items-center">
                <CalendarIcon className="absolute left-3 text-blue-600 pointer-events-none" size={18} />
                <input
                  id="blog-popup-pickup-date"
                  type="date"
                  value={pickupDate}
                  min={format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => {
                    const newPickup = e.target.value;
                    setPickupDate(newPickup);
                    if (new Date(returnDate) < new Date(newPickup)) {
                      setReturnDate(format(addDays(new Date(newPickup), 1), "yyyy-MM-dd"));
                    }
                  }}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="blog-popup-return-date" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Return Date
              </label>
              <div className="relative flex items-center">
                <CalendarIcon className="absolute left-3 text-blue-600 pointer-events-none" size={18} />
                <input
                  id="blog-popup-return-date"
                  type="date"
                  value={returnDate}
                  min={pickupDate || format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons: WhatsApp & Call */}
          <div className="space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" /> Book on WhatsApp
            </a>

            <a
              href="tel:+917977288350"
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <PhoneCall size={18} /> Call Now
            </a>
          </div>

          <p className="text-[11px] text-center text-gray-400 dark:text-gray-500 mt-4">
            Instant booking confirmation • 24/7 roadside assistance
          </p>
        </div>
      </div>
    </div>
  );
}
