import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <RotateCcw className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Return & Exchange Policy</h1>
        <p className="text-lg text-gray-600">
          Shop with confidence - Easy returns and exchanges
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7-Day Return Policy</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Return Window</h3>
              <p className="text-gray-700">
                You can return most items within 7 days of delivery for a full refund or exchange. The 7-day period is calculated from the date you receive your item.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Return Conditions</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Items must be unused, unwashed, and in original condition</li>
                <li>All tags and labels must be intact</li>
                <li>Original packaging should be retained</li>
                <li>Invoice/receipt must be included with the return</li>
                <li>Items should not be damaged or altered in any way</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How to Initiate a Return</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Log in to your account and go to "My Orders"</li>
                <li>Select the item you wish to return</li>
                <li>Choose a reason for return and submit the request</li>
                <li>Our team will review and approve your request within 24 hours</li>
                <li>Pack the item securely with all tags and invoice</li>
                <li>Schedule a pickup or drop at nearest courier center</li>
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Exchange Policy</h3>
              <p className="text-gray-700 mb-2">
                We offer exchanges for size and color variations within 7 days of delivery. The same conditions as returns apply.
              </p>
              <p className="text-gray-700">
                Exchange shipping may be charged based on your location. If the exchanged item has a price difference, you'll be required to pay or will be refunded accordingly.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Refund Processing</h3>
              <p className="text-gray-700 mb-2">
                Once we receive and inspect your returned item:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Amount will be credited to original payment method</li>
                <li>For COD orders, bank account details will be required</li>
                <li>You'll receive email confirmation once refund is initiated</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Returnable Items</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Clothing & Apparel</li>
              <li>Footwear</li>
              <li>Accessories</li>
              <li>Home & Lifestyle</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <XCircle className="w-10 h-10 text-red-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Non-Returnable Items</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Innerwear & Lingerie</li>
              <li>Cosmetics & Beauty</li>
              <li>Fragrances</li>
              <li>Masks & PPE</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <AlertCircle className="w-10 h-10 text-yellow-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Special Cases</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Damaged items</li>
              <li>Wrong item delivered</li>
              <li>Defective products</li>
              <li>Missing items</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Defective or Damaged Items</h2>
          <p className="text-gray-700 mb-4">
            If you receive a defective or damaged item, please contact us within 48 hours of delivery with photos of the product and packaging. We'll arrange for immediate replacement or refund at no additional cost.
          </p>
          <p className="text-gray-700">
            For damaged shipments, please refuse delivery and inform our customer support immediately.
          </p>
        </CardContent>
      </Card>

      <div className="mt-8 bg-blue-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Returns?</h2>
        <p className="text-gray-700 mb-6">
          Our customer support team is here to assist you with any return or exchange queries.
        </p>
        <a href="/contact" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          Contact Support
        </a>
      </div>
    </div>
  );
}
