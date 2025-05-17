import { MousePointer, CalendarCheck, Car } from "lucide-react";

const steps = [
  {
    icon: <MousePointer className="w-12 h-12 text-blue-600" />,
    title: "Choose Your Car",
    description:
      "Browse our selection of cars and choose the one that best fits your needs and budget.",
  },
  {
    icon: <CalendarCheck className="w-12 h-12 text-blue-600" />,
    title: "Book & Confirm",
    description:
      "Select your dates, provide your details, and confirm your booking with a small deposit.",
  },
  {
    icon: <Car className="w-12 h-12 text-blue-600" />,
    title: "Enjoy Your Drive",
    description:
      "Pick up your car at your preferred location and enjoy exploring Goa at your own pace.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Renting a car with GoDrive is quick and easy. Follow these simple steps:
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg w-full md:w-1/3 text-center relative"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-block">
                  {step.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>

              {/* Connector (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <svg
                    width="40"
                    height="20"
                    viewBox="0 0 40 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 10H30M30 10L20 2M30 10L20 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-blue-600"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;