import { Metadata } from "next";
import { Check, Shield, Car, BadgeDollarSign, Clock, Users, MapPin, Headphones } from "lucide-react";
import { Container, Section } from "@/components/common/LayoutComponents";

export const metadata: Metadata = {
  title: "About Us | Zio Car Rentals - Freedom to Explore",
  description: "Learn about Zio Car Rentals. Trusted self-drive car rental company offering affordable, reliable, and well-maintained vehicles for local travel, business trips, vacations, airport transfers, and outstation journeys.",
  keywords: "about zio car rentals, self drive car rental company, car rental about us, trusted car hire goa",
  openGraph: {
    title: "About Us | Zio Car Rentals - Freedom to Explore",
    description: "Learn about Zio Car Rentals. Trusted self-drive car rental company offering affordable, reliable, and well-maintained vehicles across India.",
    url: "https://www.ziocarrentals.com/about",
    siteName: "ZioCarRentals",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Zio Car Rentals - Freedom to Explore",
    description: "Learn about Zio Car Rentals. Trusted self-drive car rental company offering affordable, reliable, and well-maintained vehicles.",
  },
  alternates: {
    canonical: "https://www.ziocarrentals.com/about",
  },
};

const whyChooseItems = [
  {
    title: "1. Wide Range of Vehicles",
    description: "Choose from hatchbacks, sedans, SUVs, MUVs, premium cars, and luxury vehicles to suit solo travellers, families, business professionals, and groups.",
    icon: <Car className="w-8 h-8 text-blue-600" />
  },
  {
    title: "2. Affordable & Transparent Pricing",
    description: "Enjoy competitive rental rates with clear pricing, no hidden charges, and flexible plans that fit your budget.",
    icon: <BadgeDollarSign className="w-8 h-8 text-blue-600" />
  },
  {
    title: "3. Well-Maintained & Sanitized Cars",
    description: "Every vehicle is regularly serviced, thoroughly cleaned, and inspected to ensure safety, reliability, and a comfortable driving experience.",
    icon: <Shield className="w-8 h-8 text-blue-600" />
  },
  {
    title: "4. Flexible Rental Plans",
    description: "Whether you need a car for a few hours, a day, a weekend, a week, or a month, we offer rental options designed to match your travel plans.",
    icon: <Clock className="w-8 h-8 text-blue-600" />
  },
  {
    title: "5. Easy Online Booking",
    description: "Book your preferred self-drive car quickly through our simple and secure reservation process with fast confirmation.",
    icon: <Check className="w-8 h-8 text-blue-600" />
  },
  {
    title: "6. Convenient Pickup & Drop-Off",
    description: "We offer flexible vehicle pickup and return services at multiple locations, including airports, railway stations, hotels, and city centres where available.",
    icon: <MapPin className="w-8 h-8 text-blue-600" />
  },
  {
    title: "7. Reliable Customer Support",
    description: "Our experienced support team is available to assist you before, during, and after your rental, ensuring a smooth and worry-free experience.",
    icon: <Headphones className="w-8 h-8 text-blue-600" />
  }
];

const aboutFaqs = [
  {
    question: "Q. What types of vehicles are available?",
    answer: "Our fleet includes hatchbacks, sedans, SUVs, MUVs, premium cars, and luxury vehicles to suit different travel needs, budgets, and group sizes."
  },
  {
    question: "Q. Are your vehicles regularly serviced and sanitized?",
    answer: "Yes. Every vehicle undergoes regular maintenance, safety inspections, professional cleaning, and sanitization before being delivered to customers."
  },
  {
    question: "Q. Can I rent a car for both short-term and long-term use?",
    answer: "Absolutely. We offer flexible rental options including hourly, daily, weekend, weekly, monthly, and long-term rentals based on your travel requirements."
  },
  {
    question: "Q. What documents are required to rent a self-drive car?",
    answer: "A valid driving licence and a government-issued photo ID are generally required. Additional verification may be requested depending on the booking and location."
  },
  {
    question: "Q. Do you provide customer support during the rental period?",
    answer: "Yes. Our customer support team is available to assist you with bookings, vehicle-related queries, and any assistance you may need during your rental period."
  },
  {
    question: "Q. Can I use the rental car for outstation travel?",
    answer: "Yes. Depending on the rental agreement and destination, many of our vehicles can be used for outstation trips, allowing you to enjoy flexible road travel."
  },
  {
    question: "Q. What makes your company different from other car rental providers?",
    answer: "We focus on customer satisfaction by offering quality vehicles, transparent pricing, flexible rental plans, reliable service, convenient pickup and drop-off options, and a smooth booking experience, making every journey comfortable and stress-free."
  }
];

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumbs for SEO */}
      <Container className="py-4 text-sm" as="nav" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
            <svg className="fill-current w-3 h-3 mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </li>
          <li>
            <span className="text-gray-500" aria-current="page">About Us</span>
          </li>
        </ol>
      </Container>
      
      {/* Hero Header */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-20 w-full">
        <Container className="text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4">About Zio Car Rentals</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            Freedom to Explore — Simple, Flexible, and Convenient Car Rentals
          </p>
        </Container>
      </section>

      {/* Who We Are & Overview */}
      <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Who We Are?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                We are a trusted self-drive car rental company offering affordable, reliable, and well-maintained vehicles for local travel, business trips, vacations, airport transfers, and outstation journeys. Our goal is to make car rental simple, flexible, and convenient for every customer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                What Services Do You Provide?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                We provide self-drive car rentals, airport car rentals, daily and weekly rentals, long-term car rentals, outstation car rentals, luxury car rentals, and corporate car rental solutions across multiple cities.
              </p>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                Why Should I Choose Your Self-Drive Car Rental Service?
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                We offer transparent pricing, a wide range of vehicles, flexible rental plans, easy online booking, well-maintained cars, and dedicated customer support to ensure a hassle-free rental experience.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-gray-50 dark:bg-gray-800 py-12" size="sm">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              Finding the right self-drive car rental service is essential for a smooth and enjoyable journey. We are committed to delivering reliable vehicles, affordable pricing, and exceptional customer service, making every trip comfortable and hassle-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-start"
              >
                <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full w-fit">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-white dark:bg-gray-900 py-12" size="sm">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">
              Find answers to commonly asked questions about our self-drive car rentals, booking requirements, and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {aboutFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-bold text-lg md:text-xl text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}