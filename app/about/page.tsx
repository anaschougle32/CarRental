import { Metadata } from "next";
import Image from "next/image";
import { Check, Users, Award, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "About ZoiCarRentals | Leading Car Rental Service in Goa Since 2018",
  description: "Learn about ZoiCarRentals, Goa's premier car rental service. Discover our story, mission, and commitment to providing exceptional rental experiences across North and South Goa.",
  keywords: "car rental Goa, about ZoiCarRentals, car hire company Goa, best car rental service Goa, ZoiCarRentals history, car rental team Goa, reliable car rental Goa",
  openGraph: {
    title: "About ZoiCarRentals | Leading Car Rental Service in Goa",
    description: "Discover the story behind Goa's most trusted car rental service. Learn about our mission, values, and the team that makes your perfect Goa trip possible.",
    url: "https://zoicarrentals.com/about",
    siteName: "ZoiCarRentals",
    locale: "en_IN",
    type: "website",
    images: [{
      url: "/images/about/team-photo.jpg",
      width: 1200,
      height: 630,
      alt: "ZoiCarRentals Team - Car Rental Experts in Goa"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About ZoiCarRentals | Leading Car Rental Service in Goa",
    description: "Discover the story behind Goa's most trusted car rental service.",
    images: ["/images/about/team-photo.jpg"],
  },
  alternates: {
    canonical: "https://zoicarrentals.com/about",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumbs for SEO */}
      <nav className="container mx-auto px-4 md:px-6 pt-24 pb-2 text-sm" aria-label="Breadcrumb">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
            </svg>
          </li>
          <li>
            <span className="text-gray-500" aria-current="page">About Us</span>
          </li>
        </ol>
      </nav>
      
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/2382696/pexels-photo-2382696.jpeg)",
          }}
          role="img"
          aria-label="ZoiCarRentals fleet of cars in Goa"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ZoiCarRentals</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Goa's premier car rental service since 2018 | Serving North & South Goa
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900" id="our-story">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ZoiCarRentals was founded in 2018 with a simple mission: to provide travelers with the freedom to explore Goa on their own terms. We started with just 5 cars and a passion for service excellence in the beautiful coastal state of Goa.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                As locals who know every corner of Goa, from the bustling beaches of North Goa like Calangute and Anjuna to the serene shores of South Goa such as Palolem and Agonda, we understood that the true beauty of our state often lies off the beaten path, in places not easily accessible by public transport or traditional tours.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Today, we've grown to a fleet of over 50 well-maintained vehicles serving all major locations in Goa including Panjim, Madgaon, and both Dabolim and Mopa airports. Our core values remain the same - providing reliable, affordable, and hassle-free rental experiences to our customers throughout their Goa journey.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="https://images.pexels.com/photos/70912/pexels-photo-70912.jpeg"
                alt="ZoiCarRentals team with our fleet of cars in Goa"
                className="w-full h-full object-cover"
                loading="lazy"
                width="600"
                height="400"
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
      <section className="py-20 bg-gray-50 dark:bg-gray-800" id="our-team">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Meet Our Team</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            The dedicated professionals behind ZoiCarRentals who make your Goa car rental experience memorable
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
                With over 15 years in the Goa travel industry, Rahul brings a wealth of experience and a passion for authentic Goan hospitality to ZoiCarRentals.
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
      
      {/* FAQ Section for SEO */}
      <section className="py-20 bg-white dark:bg-gray-900" id="faqs">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Common questions about ZoiCarRentals and our services in Goa
          </p>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Where are your car rental locations in Goa?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We offer car rental services across all major locations in Goa including Calangute, Anjuna, Panjim, Madgaon, Candolim, 
                Baga, and both Dabolim and Mopa airports. We also provide free delivery to your hotel or accommodation anywhere in Goa.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">What types of cars do you offer for rent in Goa?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our fleet includes a wide range of vehicles to suit every need and budget - from economical hatchbacks like Swift and i10, 
                to comfortable sedans like Honda City and Hyundai Verna, and premium SUVs like Toyota Innova and Mahindra XUV. All our cars 
                are well-maintained and regularly serviced for a safe and comfortable journey throughout Goa.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">Do you offer airport pickup services in Goa?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Yes, we offer convenient pickup services at both Dabolim (GOI) and Mopa International Airports. Our team will be waiting 
                for you at the arrival terminal with your chosen vehicle, allowing you to start your Goa adventure immediately upon landing.
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-2">What makes ZoiCarRentals different from other car rental services in Goa?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                What sets us apart is our deep local knowledge of Goa, our commitment to customer service, and our well-maintained fleet. 
                We offer 24/7 roadside assistance, unlimited kilometers, flexible pickup and drop-off options, and personalized recommendations 
                for exploring Goa. Our team consists of Goa locals who can provide insider tips on the best beaches, restaurants, and attractions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials for Social Proof */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-4 text-center">What Our Customers Say</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto">
            Hear from travelers who have explored Goa with ZoiCarRentals
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "We rented a car from ZoiCarRentals for our week-long trip to Goa and it was the best decision. The car was in excellent condition, 
                and the team's recommendations for places to visit in South Goa were spot on. Will definitely use their services again!"
              </p>
              <div className="font-medium">Priya Sharma, Delhi</div>
              <div className="text-sm text-gray-500">Visited January 2025</div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The airport pickup service was seamless! Our flight was delayed but the ZoiCarRentals team waited patiently. The car was clean, 
                well-maintained and perfect for navigating the narrow roads of North Goa. Their 24/7 support gave us peace of mind."
              </p>
              <div className="font-medium">Raj Malhotra, Mumbai</div>
              <div className="text-sm text-gray-500">Visited March 2025</div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="text-yellow-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "As international tourists, we were initially nervous about renting a car in Goa, but ZoiCarRentals made it so easy. The unlimited 
                kilometers option allowed us to explore from Arambol in the north to Palolem in the south without worrying about extra charges."
              </p>
              <div className="font-medium">John & Sarah Williams, UK</div>
              <div className="text-sm text-gray-500">Visited February 2025</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}