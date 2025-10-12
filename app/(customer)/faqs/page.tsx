import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function FAQsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about shopping with Tribaah
        </p>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left">
                How do I place an order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or log in, provide shipping details, and select your payment method. Once confirmed, your order will be processed.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                We accept multiple payment methods including Razorpay (Credit/Debit Cards, UPI, Net Banking, Wallets) and Cash on Delivery (COD) for eligible locations. All transactions are secure and encrypted.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left">
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Standard delivery typically takes 5-7 business days. Express delivery options are available for select locations and take 2-3 business days. Delivery times may vary based on your location and product availability.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                We offer a 7-day return policy for most items. Products must be unused, unwashed, and in their original packaging with tags attached. To initiate a return, contact our customer support or visit your order details page.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left">
                How do I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Once your order is shipped, you'll receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the 'My Orders' section.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left">
                Can I change or cancel my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                You can cancel or modify your order within 24 hours of placing it, provided it hasn't been shipped. Please contact our customer support immediately if you need to make changes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-left">
                What if I receive a defective or wrong item?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                If you receive a defective or incorrect item, please contact our customer support within 48 hours of delivery. We'll arrange for a replacement or refund at no additional cost to you.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger className="text-left">
                Do you offer exchanges?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes, we offer exchanges for size or color variations within 7 days of delivery. The product must be in original condition with tags attached. Exchange shipping may apply based on your location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger className="text-left">
                How do I find the right size?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Each product page includes a detailed size guide. You can also refer to our comprehensive Size Guide page in the footer for measurements and fitting tips for different categories.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger className="text-left">
                Is Cash on Delivery available?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Yes, Cash on Delivery (COD) is available for select locations. You can check COD availability by entering your PIN code at checkout. A nominal COD fee may apply.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11">
              <AccordionTrigger className="text-left">
                Do you ship internationally?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                Currently, we only ship within India. We're working on expanding to international locations. Subscribe to our newsletter to stay updated on new shipping destinations.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12">
              <AccordionTrigger className="text-left">
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700">
                You can reach our customer support team via email at support@tribaah.com, call us at +91 123 456 7890 (Mon-Sat, 9am-7pm), or use the contact form on our Contact Us page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="mt-12 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
        <p className="text-gray-700 mb-6">
          Can't find the answer you're looking for? Our customer support team is here to help!
        </p>
        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          Contact Support
        </a>
      </div>
    </div>
  );
}
