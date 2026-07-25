import { Check, Shield, Clock, MapPin, Car, BadgeDollarSign } from "lucide-react";
import { Section, Container } from "../common/LayoutComponents";

const defaultFeatures = [
  {
    icon: <Car className="w-10 h-10 text-blue-600" />,
    title: "Wide Range of Cars",
    description: "Choose from hatchbacks, sedans, SUVs, and premium cars to match your travel style, group size, and budget.",
  },
  {
    icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />,
    title: "Affordable Rental Plans",
    description: "Enjoy competitive pricing with transparent rates and no hidden charges, making your Goa trip budget-friendly.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "Clean & Well-Maintained Vehicles",
    description: "Every car is thoroughly cleaned, regularly serviced, and safety-checked before every rental.",
  },
  {
    icon: <Check className="w-10 h-10 text-blue-600" />,
    title: "Easy Online Booking",
    description: "Reserve your preferred vehicle in just a few simple steps with our quick and hassle-free booking process.",
  },
  {
    icon: <Clock className="w-10 h-10 text-blue-600" />,
    title: "24/7 Customer Support",
    description: "Our dedicated support team is available to assist you with bookings, roadside assistance, and any queries during your rental.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "Safe & Reliable Travel",
    description: "Drive with confidence knowing every vehicle is maintained to high safety standards for a smooth and comfortable journey.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-blue-600" />,
    title: "Convenient Pickup & Drop-off",
    description: "Pick up or return your car at Goa Airport, your hotel, or other selected locations across Goa.",
  },
];

interface WhyChooseUsProps {
  title?: string;
  subtitle?: string;
  items?: { icon?: React.ReactNode; title: string; description: string }[];
}

const WhyChooseUs = ({
  title = "Why Choose Our Self-Drive Car Rental in Goa?",
  subtitle = "We make every journey simple, comfortable, and memorable by providing reliable vehicles and exceptional customer service.",
  items,
}: WhyChooseUsProps = {}) => {
  const featureList = items || defaultFeatures;

  return (
    <Section className="bg-gray-50 dark:bg-gray-800">
      <Container>
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100 dark:border-gray-800"
            >
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                {feature.icon || <Shield className="w-10 h-10 text-blue-600" />}
              </div>
              <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;