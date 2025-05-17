"use client";

import { useState } from "react";
import Link from "next/link";
import { Car } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { CalendarIcon, PhoneCall, MessageSquare } from "lucide-react";

interface BookingCTAProps {
  car: Car;
}

const BookingCTA = ({ car }: BookingCTAProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(addDays(new Date(), car.min_days));
  const [totalDays, setTotalDays] = useState(car.min_days);
  const [totalPrice, setTotalPrice] = useState(car.price_per_day * car.min_days);

  const handleStartDateChange = (date: Date | undefined) => {
    if (!date) return;
    
    setStartDate(date);
    
    // Ensure end date is at least min_days after start date
    const minEndDate = addDays(date, car.min_days - 1);
    if (!endDate || endDate < minEndDate) {
      setEndDate(minEndDate);
      setTotalDays(car.min_days);
      setTotalPrice(car.price_per_day * car.min_days);
    } else {
      // Recalculate days and price
      const diffTime = endDate.getTime() - date.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
      setTotalPrice(car.price_per_day * diffDays);
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    if (!date || !startDate) return;
    
    // Ensure end date is not before start date
    if (date < startDate) {
      date = addDays(startDate, car.min_days - 1);
    }
    
    setEndDate(date);
    
    // Calculate days and price
    const diffTime = date.getTime() - startDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Ensure minimum days requirement is met
    if (diffDays < car.min_days) {
      setEndDate(addDays(startDate, car.min_days - 1));
      setTotalDays(car.min_days);
      setTotalPrice(car.price_per_day * car.min_days);
    } else {
      setTotalDays(diffDays);
      setTotalPrice(car.price_per_day * diffDays);
    }
  };

  const whatsappText = `Hi, I'm interested in renting the ${car.brand} ${car.name} from ${startDate ? format(startDate, 'dd MMM yyyy') : ''} to ${endDate ? format(endDate, 'dd MMM yyyy') : ''}. Please provide more information.`;
  const whatsappLink = `https://wa.me/918888888888?text=${encodeURIComponent(whatsappText)}`;

  return (
    <Card className="sticky top-24">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
            <p className="text-3xl font-bold">
              ₹{car.price_per_day}
              <span className="text-sm font-normal text-gray-500">/day</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Min. rental</p>
            <p className="font-medium">{car.min_days} days</p>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          {/* Start Date */}
          <div>
            <p className="text-sm font-medium mb-1.5">Pickup Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-10"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartDateChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* End Date */}
          <div>
            <p className="text-sm font-medium mb-1.5">Return Date</p>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left h-10"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndDateChange}
                  disabled={(date) => date < addDays(startDate || new Date(), car.min_days - 1)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Price Calculation */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <span>₹{car.price_per_day} x {totalDays} days</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between mb-2 text-sm text-gray-500">
            <span>Security Deposit (Refundable)</span>
            <span>₹5,000</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice + 5000}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full" asChild>
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            <MessageSquare size={18} />
            Book on WhatsApp
          </Link>
        </Button>
        
        <Button variant="outline" className="w-full" asChild>
          <Link href="tel:+918888888888" className="flex items-center justify-center gap-2">
            <PhoneCall size={18} />
            Call to Book
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingCTA;