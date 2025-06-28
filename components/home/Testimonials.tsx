"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { testimonials } from "@/data/testimonials";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what some of our happy customers have to say about their experience with ZioCarRentals.
        </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonials Slider */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
                    <div className="flex gap-4 items-center mb-6">
                      {testimonial.image && (
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                          {testimonial.city}
                        </p>
                        <div className="flex mt-1">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star
                              key={idx}
                              size={16}
                              className={cn(
                                "mr-1",
                                idx < testimonial.stars
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic">
                      "{testimonial.message}"
                    </blockquote>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white dark:bg-gray-900 shadow-md rounded-full"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white dark:bg-gray-900 shadow-md rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoplay(false);
                  setActiveIndex(idx);
                }}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-colors",
                  idx === activeIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;