import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | GoDrive Car Rentals",
  description: "Read GoDrive's privacy policy to understand how we collect, use, and protect your personal information when you use our car rental services in Goa.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-10 pt-24 md:pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Last Updated: June 1, 2023
          </p>
          
          <p>
            At GoDrive Car Rentals ("we," "our," or "us"), we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our car rental services, visit our website, or interact with us in any way.
          </p>
          
          <h2>Information We Collect</h2>
          
          <p>
            We may collect the following types of information:
          </p>
          
          <h3>Personal Information</h3>
          <ul>
            <li>Name, address, email address, phone number</li>
            <li>Date of birth and driver's license details</li>
            <li>Payment information (credit card details)</li>
            <li>Booking history and preferences</li>
            <li>Identity verification documents</li>
          </ul>
          
          <h3>Non-Personal Information</h3>
          <ul>
            <li>Browser type and device information</li>
            <li>IP address and usage data</li>
            <li>Location data (with your consent)</li>
            <li>Cookies and similar tracking technologies</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          
          <p>
            We use your information for the following purposes:
          </p>
          
          <ul>
            <li>Process and manage car rental bookings</li>
            <li>Verify your identity and driving credentials</li>
            <li>Process payments and provide receipts</li>
            <li>Communicate with you about your reservations</li>
            <li>Send promotional offers and updates (with your consent)</li>
            <li>Improve our services and website functionality</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
          
          <h2>Information Sharing and Disclosure</h2>
          
          <p>
            We may share your information with:
          </p>
          
          <ul>
            <li>Payment processors and financial institutions</li>
            <li>Insurance providers for rental coverage</li>
            <li>Government authorities when required by law</li>
            <li>Service providers who assist in our operations</li>
            <li>Emergency contacts you provide</li>
          </ul>
          
          <p>
            We do not sell your personal information to third parties.
          </p>
          
          <h2>Your Rights and Choices</h2>
          
          <p>
            Depending on your location, you may have rights regarding your personal information, including:
          </p>
          
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your information</li>
            <li>Restriction of processing</li>
            <li>Data portability</li>
            <li>Withdrawal of consent</li>
          </ul>
          
          <p>
            To exercise these rights, please contact us using the information provided at the end of this policy.
          </p>
          
          <h2>Security Measures</h2>
          
          <p>
            We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is completely secure, and we cannot guarantee the security of information transmitted to or from our services.
          </p>
          
          <h2>Changes to This Policy</h2>
          
          <p>
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-3">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="mb-1">Email: info@godrive.com</p>
          <p className="mb-4">Phone: +919867975473</p>
        </div>
      </div>
    </div>
  );
}