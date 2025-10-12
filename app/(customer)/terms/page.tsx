import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-lg text-gray-600">
          Last updated: October 12, 2025
        </p>
      </div>

      <Card>
        <CardContent className="p-8 prose prose-gray max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using the Tribaah website and services, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. User Account</h2>
              <p className="text-gray-700 mb-2">
                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms.
              </p>
              <p className="text-gray-700">
                You are responsible for safeguarding the password and for all activities that occur under your account. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Products and Services</h2>
              <p className="text-gray-700 mb-2">
                All products and services are subject to availability. We reserve the right to discontinue any product or service at any time.
              </p>
              <p className="text-gray-700 mb-2">
                Prices for our products are subject to change without notice. We reserve the right to modify or discontinue pricing at any time.
              </p>
              <p className="text-gray-700">
                We make every effort to display product colors and images as accurately as possible. However, we cannot guarantee that your device's display will accurately reflect the actual color of the product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Orders and Payment</h2>
              <p className="text-gray-700 mb-2">
                We reserve the right to refuse or cancel any order for any reason, including but not limited to: product availability, errors in pricing or product description, or suspected fraudulent activity.
              </p>
              <p className="text-gray-700">
                Payment must be received before your order is processed. We accept various payment methods as displayed at checkout. All transactions are processed securely through authorized payment gateways.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
              <p className="text-gray-700">
                Delivery times are estimates only and cannot be guaranteed. We are not responsible for delays beyond our control. Risk of loss and title for items pass to you upon delivery to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
              <p className="text-gray-700">
                Our return and refund policy is governed by our Return & Exchange Policy. Please review our policy before making a purchase. We reserve the right to refuse returns that do not meet our policy requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700">
                The Service and its original content, features, and functionality are owned by Tribaah and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Uses</h2>
              <p className="text-gray-700 mb-2">You may not use our services:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Tribaah shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless Tribaah and its affiliates from any claims, losses, damages, liabilities, including legal fees and expenses, arising out of your use or misuse of the service, violation of these Terms, or infringement of any intellectual property or other rights of any third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these terms will be subject to the exclusive jurisdiction of courts in Mumbai, India.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us at:
              </p>
              <div className="text-gray-700 mt-4">
                <p>Email: legal@tribaah.com</p>
                <p>Phone: +91 123 456 7890</p>
                <p>Address: 123 Fashion Street, Mumbai, Maharashtra 400001, India</p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
