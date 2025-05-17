import { Check } from "lucide-react";
import { CarFeature } from "@/lib/types";

interface CarFeaturesProps {
  features: CarFeature[];
}

const featureIcons: Record<string, string> = {
  aircon: "❄️",
  bluetooth: "🎵",
  fuel: "⛽",
  luggage: "🧳",
  seats: "👥",
  usb: "🔌",
  power: "⚡",
  sunroof: "☀️",
  screen: "📺",
  camera: "📷",
  safety: "🛡️",
  eco: "🌱",
  cruise: "🚘",
  fourwd: "🚙",
};

const CarFeatures = ({ features }: CarFeaturesProps) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Features & Amenities</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="mr-3 text-xl">
              {featureIcons[feature.icon] || "✓"}
            </span>
            <span>{feature.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarFeatures;