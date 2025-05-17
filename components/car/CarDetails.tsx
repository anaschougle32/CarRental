import { Fuel, Settings, Calendar, Users } from "lucide-react";
import { Car } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface CarDetailsProps {
  car: Car;
}

const CarDetails = ({ car }: CarDetailsProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Car Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Fuel className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fuel Type</p>
            <p className="font-medium">{car.fuel_type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Settings className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Transmission</p>
            <p className="font-medium">{car.transmission}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Minimum Rental</p>
            <p className="font-medium">{car.min_days} day{car.min_days > 1 ? 's' : ''}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
            <p className="font-medium">{car.category}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="font-semibold mb-2">Description</h3>
        <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">What's Included</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Unlimited Kilometers
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Insurance
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            24x7 Roadside Support
          </Badge>
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Sanitized Vehicle
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;