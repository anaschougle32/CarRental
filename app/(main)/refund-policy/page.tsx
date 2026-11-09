import { Metadata } from "next";
import { Container, Section } from "@/components/common/LayoutComponents";

export const metadata: Metadata = {
  title: "Refund Policy | ZioCarRentals",
  description: "Read ZioCarRentals' refund and cancellation policy for self-drive car rentals.",
  alternates: {
    canonical: "https://www.ziocarrentals.com/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <Section className="bg-white dark:bg-gray-900" size="lg">
      <Container className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Refund & Cancellation Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-6">
          <p>
            At ZioCarRentals, we strive to make car rental simple, flexible, and convenient for every customer. We understand that travel plans can change unexpectedly. This Refund & Cancellation Policy outlines the conditions under which cancellations, refunds, and security deposit returns are processed.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Cancellation Policy</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cancellation 24 hours or more before scheduled pickup:</strong> 100% refund of any advance booking payment made, minus nominal processing/banking fees.</li>
            <li><strong>Cancellation between 12 to 24 hours before pickup:</strong> 50% refund of the advance booking amount.</li>
            <li><strong>Cancellation less than 12 hours before pickup or No-Show:</strong> No refund on the advance booking deposit.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Refundable Security Deposit</h2>
          <p>
            Security deposits collected at the time of vehicle handover are 100% refundable. Following vehicle inspection at the end of the rental period and clearance of any unpaid tolls, traffic violations, fuel discrepancies, or damages:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Deposits paid via UPI/Bank Transfer/Cash are returned immediately or within 24 to 48 hours of vehicle return.</li>
            <li>Credit card pre-authorizations are typically released within 3 to 7 business days according to your card-issuing bank.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">3. Early Returns & Booking Modifications</h2>
          <p>
            If you choose to return the vehicle earlier than the agreed rental duration, refund of unused rental charges is subject to the specific rental terms and minimum rental durations. Please notify our customer support team as early as possible for any adjustments.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">4. Refund Processing Time</h2>
          <p>
            Approved refunds will be processed back to the original payment method used during booking. While we initiate refunds within 24-48 business hours, please allow 5-7 working days for the credit to reflect in your bank account or card statement.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white">5. Contact Us</h2>
          <p>
            For any queries or assistance regarding cancellations and refunds, please reach out to us:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Phone:</strong> +91 90828 88912</li>
            <li><strong>WhatsApp:</strong> +91 79-77288350</li>
            <li><strong>Email:</strong> info@ziocarrentals.com</li>
            <li><strong>Address:</strong> Shop no. 1, Mini Max Apartment, ND Naik Rd, Madgaon, Goa 403601</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}

