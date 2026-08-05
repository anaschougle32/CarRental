import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-8 border-l-4 border-blue-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Need Help? Contact Us</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Call us</p>
            <div className="mt-1 space-y-1">
              <a href="tel:+919082888912" className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                +91 90828 88912
              </a>
              <a href="tel:+917977288350" className="block text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                +91 79-77288350
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email us</p>
            <a href="mailto:info@ziocarrentals.com" className="block mt-1 text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              info@ziocarrentals.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visit us</p>
            <p className="mt-1 text-base font-medium text-gray-900 dark:text-white">
              Shop no. 1, Mini Max Apartment, ND Naik Rd, Madgaon, Goa 403601
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Working hours</p>
            <p className="mt-1 text-base font-medium text-gray-900 dark:text-white">
              Monday - Sunday: 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
