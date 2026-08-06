"use client";

import { useState, useEffect } from "react";
import { Car } from "@/lib/types";
import { X, PhoneCall, Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { format, addDays } from "date-fns";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";

interface BookingPopupModalProps {
  car: Car;
}

export default function BookingPopupModal({ car }: BookingPopupModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [returnDate, setReturnDate] = useState<string>(
    format(addDays(new Date(), Math.max(1, car.min_days || 1)), "yyyy-MM-dd")
  );

  useEffect(() => {
    // Show popup 2 seconds after user opens the car details page
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [car.slug]);

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

  const whatsappText = `Hi, I'm interested in renting the ${car.brand} ${car.name} from ${formattedPickup} to ${formattedReturn}. Please confirm availability.`;
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
            <Sparkles size={14} className="text-yellow-300" /> Reserve Your Car
          </div>
          <h3 className="text-xl font-bold">{car.brand} {car.name}</h3>
          <p className="text-xs text-blue-100 mt-1">{car.category} • {car.fuel_type} • {car.transmission}</p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Pickup and Drop Date Selection */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="popup-pickup-date" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Pickup Date
              </label>
              <div className="relative flex items-center">
                <CalendarIcon className="absolute left-3 text-blue-600 pointer-events-none" size={18} />
                <input
                  id="popup-pickup-date"
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
              <label htmlFor="popup-return-date" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-1.5">
                Return Date
              </label>
              <div className="relative flex items-center">
                <CalendarIcon className="absolute left-3 text-blue-600 pointer-events-none" size={18} />
                <input
                  id="popup-return-date"
                  type="date"
                  value={returnDate}
                  min={pickupDate || format(new Date(), "yyyy-MM-dd")}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-sm"
            >
              <WhatsAppIcon className="w-5 h-5 fill-current" />
              Book on WhatsApp
            </a>

            <a
              href="tel:+919082888912"
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm border border-gray-200 dark:border-gray-700"
            >
              <PhoneCall size={18} className="text-blue-600" />
              Call to Book
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
