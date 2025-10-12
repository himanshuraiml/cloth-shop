import { Package, Users, Heart, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Tribaah</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your trusted destination for quality fashion and lifestyle products
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Founded with a vision to bring quality fashion to everyone, Tribaah has grown into a trusted name in online retail. We believe that great style should be accessible to all, which is why we curate a diverse collection of clothing and accessories for men, women, and children.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our journey began with a simple idea: to create a shopping experience that combines quality, affordability, and convenience. Today, we serve thousands of happy customers across the country, delivering not just products, but confidence and style.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            At Tribaah, our mission is to empower individuals through fashion. We strive to offer a carefully curated selection of products that cater to diverse tastes and preferences, ensuring that every customer finds something they love.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We are committed to providing exceptional customer service, competitive prices, and a seamless shopping experience that keeps our customers coming back.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Products</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50,000+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Customer Satisfaction</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardContent className="pt-8 pb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">5+ Years</h3>
            <p className="text-gray-600">of Excellence</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Choose Tribaah?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
            <p className="text-gray-700">
              Every product is carefully selected and quality-checked to ensure you receive only the best.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Affordable Prices</h3>
            <p className="text-gray-700">
              We believe great fashion should be accessible. Enjoy competitive prices without compromising on quality.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Delivery</h3>
            <p className="text-gray-700">
              Quick and reliable shipping ensures your orders reach you in perfect condition, on time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
