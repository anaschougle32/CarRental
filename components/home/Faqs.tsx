"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What documents are required to rent a self-drive car in Goa?",
    answer: "You typically need a valid driving licence, a government-issued photo ID, and any additional documents required by the rental agreement."
  },
  {
    question: "Can tourists rent a self-drive car in Goa?",
    answer: "Yes. Both domestic and international tourists can rent a self-drive car, provided they meet the driver's licence and identification requirements."
  },
  {
    question: "Is there a security deposit?",
    answer: "Yes. A refundable security deposit may be required depending on the vehicle category and rental duration."
  },
  {
    question: "Can I pick up the car at Goa Airport?",
    answer: "Yes. We offer convenient pickup and drop-off options at Goa Airport and selected locations across Goa."
  },
  {
    question: "Is there a daily kilometre limit?",
    answer: "Mileage limits depend on the rental plan you choose. The applicable terms will be shown before you confirm your booking."
  },
  {
    question: "How much does it cost to rent a car in Goa?",
    answer: "Car rental in Goa starts from INR 900 per day for hatchbacks, mini SUVs or SUVs start from INR 2000 per day, and luxury car rentals start from INR 15000 per day. Prices can vary according to season and demand."
  }
];

interface FaqsProps {
  items?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}

import { Section, Container } from "../common/LayoutComponents";

export default function Faqs({ 
  items, 
  title = "Frequently Asked Questions", 
  subtitle = "Find answers to common questions about renting a car in Goa" 
}: FaqsProps = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqList = items || faqs;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section className="bg-gray-50 dark:bg-gray-900">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto">
          {faqList.map((faq, index) => (
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
      </Container>
    </Section>
  );
}
