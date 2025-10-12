import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Truck className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Shipping & Delivery</h1>
        <p className="text-lg text-gray-600">
          Fast, reliable delivery right to your doorstep
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Standard Delivery</h3>
            <p className="text-gray-700 mb-3">5-7 business days</p>
            <p className="text-sm text-gray-600">Free shipping on orders above ₹999</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Express Delivery</h3>
            <p className="text-gray-700 mb-3">2-3 business days</p>
            <p className="text-sm text-gray-600">Additional charges apply</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Time</h3>
              <p className="text-gray-700">
                Orders are processed within 1-2 business days. You will receive a confirmation email once your order has been shipped with tracking information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Shipping Charges</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Free shipping on orders above ₹999</li>
                <li>₹99 flat shipping charge for orders below ₹999</li>
                <li>Express delivery: Additional ₹199</li>
                <li>COD orders: Additional ₹50 handling fee</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Tracking</h3>
              <p className="text-gray-700">
                Once your order ships, you'll receive a tracking number via email and SMS. You can track your order status in the "My Orders" section of your account.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Areas</h3>
              <p className="text-gray-700">
                We currently deliver pan-India. Some remote locations may require additional delivery time. You can check serviceability by entering your PIN code at checkout.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed Delivery Attempts</h3>
              <p className="text-gray-700">
                If delivery fails due to incorrect address or recipient unavailability, our courier partner will make up to 3 delivery attempts. After that, the order will be returned to us, and a refund will be processed after deducting shipping charges.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">International Shipping</h3>
              <p className="text-gray-700">
                Currently, we only ship within India. We're working on expanding to international locations. Subscribe to our newsletter for updates.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 rounded-2xl p-8 text-center">
        <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Track Your Order</h2>
        <p className="text-gray-700 mb-6">
          Stay updated with real-time tracking of your order from our warehouse to your doorstep.
        </p>
        <a href="/orders" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
          View My Orders
        </a>
      </div>
    </div>
  );
}
