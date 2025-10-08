import Link from "next/link";
import { Car } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps = {}) => {
  return (
    <div className="flex items-center space-x-2 group">
      <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
        <Car className={`h-6 w-6 text-white ${className || ''}`} />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-gray-900 dark:text-white">
          Zio<span className="text-blue-600">CarRentals</span>
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
          Goa Car Rentals
        </span>
      </div>
    </div>
  );
};

export default Logo; 