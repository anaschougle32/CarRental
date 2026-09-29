import { Metadata } from "next";
import ContactForm from "@/components/common/ContactForm";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Share2 } from "lucide-react";
import { Container, Section } from "@/components/common/LayoutComponents";
import { SOCIAL_LINKS } from "@/lib/social";

export const metadata: Metadata = {
  title: "Contact Us | ZioCarRentals in Goa",
  description: "Get in touch with ZioCarRentals. We're available 24/7 for bookings, queries, and roadside assistance. Call, WhatsApp, or visit us in Goa.",
};

export default function ContactPage() {
  return (
    <>
      {/* Contact Hero */}
      <section className="relative h-[30vh] min-h-[250px] flex items-center justify-center w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/4630296/pexels-photo-4630296.jpeg)",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <Container className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            We're available 24/7 to assist you with bookings and inquiries
          </p>
        </Container>
      </section>
      
      {/* Contact Info + Form */}
      <Section className="bg-white dark:bg-gray-900" size="lg">
        <Container>
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
                      Shop no. 1, Mini Max Apartment, <br /> ND Naik Rd, Madgaon, Goa 403601
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
                        href="tel:+919082888912"
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors font-medium text-base"
                      >
                        +91 90828 88912
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
                        href="mailto:info@ziocarrentals.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        info@ziocarrentals.com
                      </a>
                      <br />
                      <a
                        href="mailto:bookings@ziocarrentals.com"
                        className="hover:text-blue-600 transition-colors"
                      >
                        bookings@ziocarrentals.com
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

                <div className="flex items-start">
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-full mr-4">
                    <Share2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      Stay connected with us for deals, travel guides, and new cars.
                    </p>
                    <div className="flex items-center space-x-3">
                      <a
                        href={SOCIAL_LINKS.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Facebook"
                        title="Facebook"
                      >
                        <Facebook size={18} />
                      </a>
                      <a
                        href={SOCIAL_LINKS.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Instagram"
                        title="Instagram"
                      >
                        <Instagram size={18} />
                      </a>
                      <a
                        href={SOCIAL_LINKS.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-black hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                        aria-label="X (formerly Twitter)"
                        title="X"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                      <a
                        href={SOCIAL_LINKS.pinterest}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Pinterest"
                        title="Pinterest"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a
                        href={SOCIAL_LINKS.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                        aria-label="YouTube"
                        title="YouTube"
                      >
                        <Youtube size={18} />
                      </a>
                    </div>
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
        </Container>
      </Section>
    </>
  );
}