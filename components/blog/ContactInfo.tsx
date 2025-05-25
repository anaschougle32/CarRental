import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContactInfo() {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg my-8 border-l-4 border-blue-500">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Need Help? Contact Us</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FaPhone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Call us</p>
            <div className="mt-1 space-y-1">
              <a href="tel:+919876543210" className="text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                +91 98765 43210
              </a>
              <a href="tel:+911234567890" className="block text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                +91 12345 67890
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FaEnvelope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email us</p>
            <a href="mailto:support@yourcarrental.com" className="block mt-1 text-base font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              support@yourcarrental.com
            </a>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FaMapMarkerAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visit us</p>
            <p className="mt-1 text-base font-medium text-gray-900 dark:text-white">
              123 Car Rental Street, Mumbai, Maharashtra 400001
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <FaClock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
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
