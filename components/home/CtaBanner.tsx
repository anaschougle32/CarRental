import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, PhoneCall } from "lucide-react";

const CtaBanner = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg)",
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Explore Goa on Your Terms?
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Book your self-drive car today and experience the freedom of exploring Goa at your own pace.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
          <Link href="/cars" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-blue-900 hover:bg-gray-100 h-11 px-8 gap-2">
            <MapPin size={20} />
            Browse Our Cars
          </Link>
          
          <a href="tel:+918888888888" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white text-white hover:bg-white/20 h-11 px-8 gap-2">
            <PhoneCall size={20} />
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;