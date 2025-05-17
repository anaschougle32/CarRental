import { Car } from "@/lib/types";

export const cars: Car[] = [
  {
    id: "1",
    name: "Hyundai i20",
    brand: "Hyundai",
    slug: "hyundai-i20",
    price_per_day: 1200,
    description:
      "The Hyundai i20 is a perfect hatchback for exploring Goa's narrow streets and beaches. With excellent fuel efficiency, comfortable seating for 5, and ample boot space, it's ideal for couples or small families. Features include AC, power steering, and Bluetooth connectivity.",
    features: [
      { icon: "aircon", name: "Air Conditioning" },
      { icon: "bluetooth", name: "Bluetooth" },
      { icon: "fuel", name: "Fuel Efficient" },
      { icon: "luggage", name: "Boot Space: 285L" },
      { icon: "seats", name: "5 Seats" },
      { icon: "usb", name: "USB Charging" },
    ],
    fuel_type: "Petrol",
    transmission: "Manual",
    min_days: 1,
    images: [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
      "https://images.pexels.com/photos/1213294/pexels-photo-1213294.jpeg",
      "https://images.pexels.com/photos/248704/pexels-photo-248704.jpeg",
    ],
    category: "Hatchback",
  },
  {
    id: "2",
    name: "Maruti Swift",
    brand: "Maruti Suzuki",
    slug: "maruti-swift",
    price_per_day: 1100,
    description:
      "The evergreen Maruti Swift offers unbeatable fuel efficiency and reliability for your Goan adventure. Its compact size makes it easy to maneuver through crowded tourist spots and find parking, while its performance ensures a smooth ride on highways.",
    features: [
      { icon: "aircon", name: "Air Conditioning" },
      { icon: "bluetooth", name: "Bluetooth" },
      { icon: "fuel", name: "High Mileage" },
      { icon: "luggage", name: "Boot Space: 268L" },
      { icon: "seats", name: "5 Seats" },
      { icon: "power", name: "Power Windows" },
    ],
    fuel_type: "Petrol",
    transmission: "Manual",
    min_days: 1,
    images: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg",
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg",
      "https://images.pexels.com/photos/3689532/pexels-photo-3689532.jpeg",
    ],
    category: "Hatchback",
  },
  {
    id: "3",
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    slug: "toyota-innova-crysta",
    price_per_day: 2800,
    description:
      "The Toyota Innova Crysta is perfect for larger groups and families exploring Goa. This spacious 7-seater offers exceptional comfort for long-distance travel, with powerful AC, captain seats, and ample luggage space for all your beach gear and shopping.",
    features: [
      { icon: "aircon", name: "Climate Control" },
      { icon: "bluetooth", name: "Infotainment System" },
      { icon: "luggage", name: "Boot Space: 300L" },
      { icon: "seats", name: "7 Seats" },
      { icon: "camera", name: "Reverse Camera" },
      { icon: "cruise", name: "Cruise Control" },
    ],
    fuel_type: "Diesel",
    transmission: "Automatic",
    min_days: 2,
    images: [
      "https://images.pexels.com/photos/1638459/pexels-photo-1638459.jpeg",
      "https://images.pexels.com/photos/92615/pexels-photo-92615.jpeg",
      "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg",
    ],
    category: "SUV",
  },
  {
    id: "4",
    name: "Honda City",
    brand: "Honda",
    slug: "honda-city",
    price_per_day: 1800,
    description:
      "The Honda City sedan combines elegance with performance, offering a premium driving experience for your Goa vacation. Its refined interiors, smooth ride quality, and efficient engine make it ideal for both city exploration and coastal highway drives.",
    features: [
      { icon: "aircon", name: "Climate Control" },
      { icon: "bluetooth", name: "Touchscreen Display" },
      { icon: "seats", name: "Comfortable Seating" },
      { icon: "luggage", name: "Boot Space: 506L" },
      { icon: "safety", name: "Multiple Airbags" },
      { icon: "eco", name: "ECO Mode" },
    ],
    fuel_type: "Petrol",
    transmission: "Automatic",
    min_days: 2,
    images: [
      "https://images.pexels.com/photos/13161977/pexels-photo-13161977.jpeg",
      "https://images.pexels.com/photos/164654/pexels-photo-164654.jpeg",
      "https://images.pexels.com/photos/4090120/pexels-photo-4090120.jpeg",
    ],
    category: "Sedan",
  },
  {
    id: "5",
    name: "Mahindra Thar",
    brand: "Mahindra",
    slug: "mahindra-thar",
    price_per_day: 3000,
    description:
      "Experience Goa's adventurous side with the iconic Mahindra Thar, perfect for off-road beaches and exploring hidden trails. This 4x4 SUV combines rugged capabilities with modern comfort features, making it the ideal choice for thrill-seekers.",
    features: [
      { icon: "aircon", name: "Air Conditioning" },
      { icon: "bluetooth", name: "Infotainment System" },
      { icon: "fourwd", name: "4x4 Capability" },
      { icon: "seats", name: "4 Seats" },
      { icon: "luggage", name: "Boot Space: Limited" },
      { icon: "safety", name: "Roll Cage" },
    ],
    fuel_type: "Diesel",
    transmission: "Manual",
    min_days: 2,
    images: [
      "https://images.pexels.com/photos/2676333/pexels-photo-2676333.jpeg",
      "https://images.pexels.com/photos/13873851/pexels-photo-13873851.jpeg",
      "https://images.pexels.com/photos/5999880/pexels-photo-5999880.jpeg",
    ],
    category: "SUV",
  },
  {
    id: "6",
    name: "Kia Seltos",
    brand: "Kia",
    slug: "kia-seltos",
    price_per_day: 2200,
    description:
      "The Kia Seltos offers the perfect blend of style, comfort, and technology for your Goa trip. This feature-packed compact SUV provides elevated seating position for better views of Goa's scenic landscapes and comes with advanced features like panoramic sunroof and premium sound system.",
    features: [
      { icon: "aircon", name: "Climate Control" },
      { icon: "screen", name: "10.25\" Touchscreen" },
      { icon: "sunroof", name: "Panoramic Sunroof" },
      { icon: "seats", name: "5 Seats" },
      { icon: "luggage", name: "Boot Space: 433L" },
      { icon: "camera", name: "360° Camera" },
    ],
    fuel_type: "Petrol",
    transmission: "Automatic",
    min_days: 2,
    images: [
      "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
      "https://images.pexels.com/photos/4927868/pexels-photo-4927868.jpeg",
      "https://images.pexels.com/photos/15556644/pexels-photo-15556644.jpeg",
    ],
    category: "SUV",
  },
];

export const getCarBySlug = (slug: string): Car | undefined => {
  return cars.find((car) => car.slug === slug);
};

export const getRelatedCars = (currentSlug: string, count = 3): Car[] => {
  const current = getCarBySlug(currentSlug);
  if (!current) return cars.slice(0, count);
  
  return cars
    .filter(car => car.slug !== currentSlug && car.category === current.category)
    .slice(0, count);
};