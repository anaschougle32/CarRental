"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const standard7Faqs = [
  {
    question: "What types of vehicles are available?",
    answer: "Our fleet includes hatchbacks, sedans, SUVs, MUVs, premium cars, and luxury vehicles to suit different travel needs, budgets, and group sizes."
  },
  {
    question: "Are your vehicles regularly serviced and sanitized?",
    answer: "Yes. Every vehicle undergoes regular maintenance, safety inspections, professional cleaning, and sanitization before being delivered to customers."
  },
  {
    question: "Can I rent a car for both short-term and long-term use?",
    answer: "Absolutely. We offer flexible rental options including hourly, daily, weekend, weekly, monthly, and long-term rentals based on your travel requirements."
  },
  {
    question: "What documents are required to rent a self-drive car?",
    answer: "A valid driving licence and a government-issued photo ID are generally required. Additional verification may be requested depending on the booking and location."
  },
  {
    question: "Do you provide customer support during the rental period?",
    answer: "Yes. Our customer support team is available to assist you with bookings, vehicle-related queries, and any assistance you may need during your rental period."
  },
  {
    question: "Can I use the rental car for outstation travel?",
    answer: "Yes. Depending on the rental agreement and destination, many of our vehicles can be used for outstation trips, allowing you to enjoy flexible road travel."
  },
  {
    question: "What makes your company different from other car rental providers?",
    answer: "We focus on customer satisfaction by offering quality vehicles, transparent pricing, flexible rental plans, reliable service, convenient pickup and drop-off options, and a smooth booking experience, making every journey comfortable and stress-free."
  }
];

export const homeFaqs = [
  {
    question: "1. What documents are required to rent a self-drive car in India?",
    answer: "You need a valid driving licence, a government-issued photo ID (such as Aadhaar Card, Passport, or Voter ID), and any additional documents required by the rental provider."
  },
  {
    question: "2. Can tourists rent a self-drive car in India?",
    answer: "Yes. Indian residents and international tourists with a valid driving licence and the required documents can rent self-drive cars."
  },
  {
    question: "3. Is a security deposit required?",
    answer: "Yes. A refundable security deposit may be applicable depending on the vehicle category and rental policy."
  },
  {
    question: "4. Can I book a self-drive car online?",
    answer: "Yes. You can book your preferred vehicle online, by phone, or through WhatsApp for a quick and hassle-free reservation."
  },
  {
    question: "5. Why should I choose a self-drive car instead of a taxi?",
    answer: "A self-drive car gives you complete privacy, travel flexibility, better control over your schedule, and often proves more economical for sightseeing, business trips, and long-distance travel."
  }
];

const faqs = homeFaqs;

interface FaqsProps {
  items?: { question: string; answer: string }[];
  title?: string;
  subtitle?: string;
}

import { Section, Container } from "../common/LayoutComponents";

export default function Faqs({ 
  items, 
  title = "Frequently Asked Questions", 
  subtitle = "Find answers to common questions about our self-drive car rentals and booking services." 
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
