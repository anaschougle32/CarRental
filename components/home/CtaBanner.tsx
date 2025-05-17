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
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" asChild>
            <Link href="/cars" className="inline-flex items-center gap-2">
              <MapPin size={20} />
              Browse Our Cars
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20" asChild>
            <Link href="tel:+918888888888" className="inline-flex items-center gap-2">
              <PhoneCall size={20} />
              Call Us Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;