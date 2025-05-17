import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | GoDrive Car Rentals",
  description: "Read the terms and conditions for renting cars from GoDrive in Goa, including booking policies, rental requirements, and usage guidelines.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms and Conditions</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Last Updated: June 1, 2023
          </p>
          
          <p>
            These Terms and Conditions ("Terms") govern your use of GoDrive Car Rentals' services, including car rentals, reservations, and related services. By making a reservation or renting a vehicle from GoDrive, you agree to these Terms.
          </p>
          
          <h2>1. Rental Eligibility</h2>
          
          <p>
            To rent a vehicle from GoDrive, you must:
          </p>
          
          <ul>
            <li>Be at least 21 years of age</li>
            <li>Possess a valid driver's license that has been held for at least one year</li>
            <li>Present a valid credit or debit card in your name for the security deposit</li>
            <li>Meet our insurance requirements</li>
            <li>Pass our verification process</li>
          </ul>
          
          <h2>2. Reservations and Cancellations</h2>
          
          <h3>Reservations</h3>
          <p>
            Reservations can be made online, by phone, or in person. A valid credit card is required to secure your reservation. Rental rates are determined based on the vehicle category, rental period, and additional services requested.
          </p>
          
          <h3>Cancellations</h3>
          <ul>
            <li>Cancellations made 48+ hours before pickup: Full refund</li>
            <li>Cancellations made 24-48 hours before pickup: 80% refund</li>
            <li>Cancellations made less than 24 hours before pickup: 50% refund</li>
            <li>No-shows: No refund</li>
          </ul>
          
          <h2>3. Security Deposit</h2>
          
          <p>
            A security deposit of ₹5,000-₹15,000 (depending on vehicle category) will be authorized on your credit card at the time of rental. This amount will be released upon return of the vehicle in acceptable condition.
          </p>
          
          <h2>4. Vehicle Usage</h2>
          
          <p>
            When renting a vehicle from GoDrive, you agree to:
          </p>
          
          <ul>
            <li>Use the vehicle only for personal transportation within the state of Goa</li>
            <li>Not drive the vehicle outside Goa without prior written consent</li>
            <li>Not use the vehicle for any illegal purpose</li>
            <li>Not use the vehicle for commercial purposes or sub-renting</li>
            <li>Not drive under the influence of alcohol, drugs, or any intoxicating substance</li>
            <li>Not drive on beaches, off-road areas, or any other prohibited locations</li>
            <li>Not smoke in the vehicle</li>
            <li>Return the vehicle with the same amount of fuel as at pickup</li>
          </ul>
          
          <h2>5. Insurance and Liability</h2>
          
          <p>
            Basic insurance coverage is included in your rental fee, covering:
          </p>
          
          <ul>
            <li>Third-party liability as required by Indian law</li>
            <li>Basic collision damage with a deductible of ₹5,000</li>
          </ul>
          
          <p>
            You are responsible for:
          </p>
          
          <ul>
            <li>The deductible amount in case of damage</li>
            <li>Damage caused by negligence or violation of these Terms</li>
            <li>Damage to tires, windshields, or undercarriage not covered by basic insurance</li>
            <li>Traffic violations, fines, and penalties during your rental period</li>
          </ul>
          
          <h2>6. Vehicle Return</h2>
          
          <p>
            You must return the vehicle:
          </p>
          
          <ul>
            <li>On the date and time specified in your rental agreement</li>
            <li>In the same condition as when rented, except for normal wear and tear</li>
            <li>With the same amount of fuel as at pickup</li>
            <li>With all provided accessories and documents</li>
          </ul>
          
          <p>
            Late returns will incur additional charges at hourly rates. If you need to extend your rental, please contact us at least 6 hours before your scheduled return time.
          </p>
          
          <h2>7. Changes to Terms</h2>
          
          <p>
            We reserve the right to modify these Terms at any time. Changes will take effect immediately upon posting to our website. Your continued use of our services after any changes indicates your acceptance of the revised Terms.
          </p>
          
          <h2>8. Contact Information</h2>
          
          <p>
            If you have questions about these Terms, please contact us at:
          </p>
          
          <p>
            GoDrive Car Rentals<br />
            123 Beach Road, Calangute<br />
            North Goa, 403516<br />
            Email: info@godrive.com<br />
            Phone: +91 8888 888 888
          </p>
        </div>
      </div>
    </div>
  );
}