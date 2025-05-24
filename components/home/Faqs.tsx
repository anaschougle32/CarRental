"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How much does it cost to rent a car in Goa?",
    answer: "Car rental in Goa starts from INR 900 per day for hatchbacks, mini SUVs or SUVs start from INR 2000 per day, and luxury car rentals start from INR 15000 per day. Prices can vary according to season and demand."
  },
  {
    question: "Why should I rent a car in Goa instead of using taxis?",
    answer: "As taxi fares are very expensive in Goa, renting a car becomes a better option. There are various types of cars for rent, like hatchback, sedan, mini SUV, SUV, depending on your choice or on the number of people in a group."
  },
  {
    question: "Can I get the rental car delivered to my location?",
    answer: "Yes, you can pay the minimum fee that will be charged for delivery, and our team will be available with the car at your desired location."
  },
  {
    question: "Is renting a car in Goa worth it?",
    answer: "Renting a car in Goa is the best option to have more fun within a short interval. If you depend on public transport, you will end up wasting a lot of time and spending more than required."
  },
  {
    question: "Is it cheaper to rent a car for a week?",
    answer: "Yes, it is cheaper to rent a car for a week. Because there are many car rental companies that offer weekly rates with significant discounts, the weekly rate is less expensive than the per-day rate."
  },
  {
    question: "Is it safe to drive a rental car in Goa?",
    answer: "Hiring a car is a simple way to explore Goa and its surrounding area while at the same time giving you a feeling of being protected and secure, particularly for individuals who are new to Goa."
  },
  {
    question: "What is the minimum age requirement to rent a car?",
    answer: "The minimum age requirement to rent a car is 18 years with a valid driving license."
  },
  {
    question: "Do you offer unlimited kilometers with your car rentals?",
    answer: "Yes, we offer unlimited kilometers with most of our rental packages, allowing you to explore Goa without worrying about extra charges for distance traveled."
  }
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about renting a car in Goa
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={cn(
                "mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200",
                openIndex === index ? "shadow-md" : ""
              )}
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                onClick={() => toggleFaq(index)}
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <span className="ml-6 flex-shrink-0 text-blue-600 dark:text-blue-400">
                  {openIndex === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </span>
              </button>
              <div 
                className={cn(
                  "transition-all duration-300 ease-in-out overflow-hidden bg-white dark:bg-gray-800",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
