import { Metadata } from "next";
import ContactForm from "@/components/common/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | GoDrive Car Rentals in Goa",
  description: "Get in touch with GoDrive Car Rentals. We're available 24/7 for bookings, queries, and roadside assistance. Call, WhatsApp, or visit us in Goa.",
};

export default function ContactPage() {
  return (
    <>
      {/* Contact Hero */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/4630296/pexels-photo-4630296.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're available 24/7 to assist you with bookings and inquiries
          </p>
        </div>
      </section>
      
      {/* Contact Info + Form */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-8">
                Have questions or need assistance? Contact us through any of the methods below and we'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      123 Beach Road, Calangute, <br /> North Goa, 403516
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Call or WhatsApp</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <Phone className="text-blue-600 flex-shrink-0" size={20} />
                      <a
                        href="tel:+919867975473"
                        className="text-gray-700 hover:text-blue-600 transition-colors"
                      >
                        +919867975473
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      <a
                        href="mailto:info@godrive.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        info@godrive.com
                      </a>
                      <br />
                      <a
                        href="mailto:bookings@godrive.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        bookings@godrive.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Monday - Sunday: 8:00 AM - 10:00 PM
                      <br />
                      <span className="text-blue-600 font-medium">
                        24/7 Roadside Assistance for Customers
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Find Us Here</h2>
          
          <div className="h-96 rounded-lg overflow-hidden shadow-md">
            <img
              src="https://images.pexels.com/photos/4450334/pexels-photo-4450334.jpeg"
              alt="Map location of GoDrive office in Calangute, Goa"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}