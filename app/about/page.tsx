import { Metadata } from "next";
import Image from "next/image";
import { Check, Users, Award, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | GoDrive Car Rentals in Goa",
  description: "Learn about GoDrive, Goa's premier self-drive car rental service. Our story, mission, and commitment to providing exceptional rental experiences.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2382696/pexels-photo-2382696.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About GoDrive</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Goa's premier self-drive car rental service since 2018
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                GoDrive was founded in 2018 with a simple mission: to provide travelers with the freedom to explore Goa on their own terms. We started with just 5 cars and a passion for service excellence.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                As locals who know every corner of Goa, we understood that the true beauty of our state often lies off the beaten path, in places not easily accessible by public transport or traditional tours.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Today, we've grown to a fleet of over 50 well-maintained vehicles, but our core values remain the same - providing reliable, affordable, and hassle-free rental experiences to our customers.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg"
                alt="GoDrive team with our fleet"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Our Values</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            These core principles guide everything we do at GoDrive
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-block mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer First</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our customers' satisfaction is our top priority. We go above and beyond to ensure you have a memorable and worry-free experience in Goa.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-block mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality & Safety</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We maintain our vehicles to the highest standards, ensuring your safety and comfort throughout your journey in Goa.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full inline-block mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reliability</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We understand that your time is valuable, which is why we ensure punctual service and 24/7 support throughout your rental period.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg"
                alt="Happy customers with rental car"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6">Why Choose GoDrive?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Local Expertise</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      As Goa locals, we provide insider tips and recommendations to enhance your travel experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Flexible Rental Options</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      From hourly rentals to long-term leases, we offer options that suit your specific needs and budget.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Transparent Pricing</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      No hidden charges or surprise fees. What you see is what you pay, with all taxes and basic insurance included.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Personalized Service</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      We take the time to understand your requirements and provide tailored recommendations for your perfect Goa experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Team</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            The dedicated people behind GoDrive who make your self-drive experience memorable
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                  alt="Rahul Naik - Founder & CEO"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Rahul Naik</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-2">Founder & CEO</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                With over 15 years in the travel industry, Rahul brings a wealth of experience and a passion for Goan hospitality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                  alt="Priya Verma - Operations Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Priya Verma</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-2">Operations Manager</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Priya ensures smooth day-to-day operations and is dedicated to maintaining our high service standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Vikram Desai - Fleet Manager"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Vikram Desai</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-2">Fleet Manager</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                With his automotive expertise, Vikram ensures our entire fleet is maintained to the highest standards.
              </p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden h-40 w-40 mx-auto">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                  alt="Anjali Menon - Customer Relations"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg">Anjali Menon</h3>
              <p className="text-blue-600 dark:text-blue-400 mb-2">Customer Relations</p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Anjali's friendly demeanor and problem-solving skills ensure all customer queries are handled promptly and effectively.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}