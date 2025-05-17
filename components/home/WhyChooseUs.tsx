import { Check, Shield, Clock, MapPin, Car, BadgeDollarSign } from "lucide-react";

const features = [
  {
    icon: <Car className="w-10 h-10 text-blue-600" />,
    title: "Well-Maintained Fleet",
    description: "All our vehicles undergo rigorous maintenance checks before each rental.",
  },
  {
    icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />,
    title: "No Hidden Charges",
    description: "What you see is what you pay. Transparent pricing with no surprise fees.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "Comprehensive Insurance",
    description: "Drive with peace of mind knowing you're covered by our insurance policy.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-blue-600" />,
    title: "Unlimited Kilometers",
    description: "Explore all of Goa without worrying about distance restrictions.",
  },
  {
    icon: <Clock className="w-10 h-10 text-blue-600" />,
    title: "24/7 Roadside Assistance",
    description: "Help is always just a phone call away, anywhere in Goa.",
  },
  {
    icon: <Check className="w-10 h-10 text-blue-600" />,
    title: "Airport Pickup & Drop",
    description: "Convenient pickup and drop service at Dabolim Airport and Manohar Airport.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose GoDrive?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're committed to providing you with the best self-drive car rental experience in Goa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;