import { Check, Shield, Clock, MapPin, Car, BadgeDollarSign } from "lucide-react";
import { Section, Container } from "../common/LayoutComponents";

const defaultFeatures = [
  {
    icon: <Car className="w-10 h-10 text-blue-600" />,
    title: "1. Wide Range of Vehicles",
    description: "Choose from hatchbacks, sedans, SUVs, MUVs, premium cars, and luxury vehicles to suit solo travellers, families, business professionals, and groups.",
  },
  {
    icon: <BadgeDollarSign className="w-10 h-10 text-blue-600" />,
    title: "2. Affordable & Transparent Pricing",
    description: "Enjoy competitive rental rates with clear pricing, no hidden charges, and flexible plans that fit your budget.",
  },
  {
    icon: <Shield className="w-10 h-10 text-blue-600" />,
    title: "3. Well-Maintained & Sanitized Cars",
    description: "Every vehicle is regularly serviced, thoroughly cleaned, and inspected to ensure safety, reliability, and a comfortable driving experience.",
  },
  {
    icon: <Clock className="w-10 h-10 text-blue-600" />,
    title: "4. Flexible Rental Plans",
    description: "Whether you need a car for a few hours, a day, a weekend, a week, or a month, we offer rental options designed to match your travel plans.",
  },
  {
    icon: <Check className="w-10 h-10 text-blue-600" />,
    title: "5. Easy Online Booking",
    description: "Book your preferred self-drive car quickly through our simple and secure reservation process with fast confirmation.",
  },
  {
    icon: <MapPin className="w-10 h-10 text-blue-600" />,
    title: "6. Convenient Pickup & Drop-Off",
    description: "We offer flexible vehicle pickup and return services at multiple locations, including airports, railway stations, hotels, and city centres where available.",
  },
  {
    icon: <Clock className="w-10 h-10 text-blue-600" />,
    title: "7. Reliable Customer Support",
    description: "Our experienced support team is available to assist you before, during, and after your rental, ensuring a smooth and worry-free experience.",
  },
];

interface WhyChooseUsProps {
  title?: string;
  subtitle?: string;
  items?: { icon?: React.ReactNode; title: string; description: string }[];
}

const WhyChooseUs = ({
  title = "Why Choose Us?",
  subtitle = "Finding the right self-drive car rental service is essential for a smooth and enjoyable journey. We are committed to delivering reliable vehicles, affordable pricing, and exceptional customer service, making every trip comfortable and hassle-free.",
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

        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm flex-grow-0 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-gray-100 dark:border-gray-800"
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