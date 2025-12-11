"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Download,
  MapPin,
  CreditCard,
  Loader2
} from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
  };
}

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  payment_status: string;
  payment_method: string;
  status: string;
  shipping_address: any;
  tracking_number?: string;
  created_at: string;
  order_items: OrderItem[];
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (isAuthenticated && user) {
      fetchOrder();
    }
  }, [isAuthenticated, isLoading, user, params.id]);

  const fetchOrder = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            size,
            color,
            product:products (
              id,
              name,
              slug,
              images
            )
          )
        `)
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Order not found</h1>
        <Link href="/shop">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const getStatusConfig = (status: string) => {
    const configs: Record<string, { label: string; icon: any; color: string; bgColor: string }> = {
      pending: {
        label: 'Pending',
        icon: Clock,
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-100',
      },
      processing: {
        label: 'Processing',
        icon: Package,
        color: 'text-blue-700',
        bgColor: 'bg-blue-100',
      },
      shipped: {
        label: 'Shipped',
        icon: Truck,
        color: 'text-indigo-700',
        bgColor: 'bg-indigo-100',
      },
      delivered: {
        label: 'Delivered',
        icon: CheckCircle,
        color: 'text-green-700',
        bgColor: 'bg-green-100',
      },
      cancelled: {
        label: 'Cancelled',
        icon: XCircle,
        color: 'text-red-700',
        bgColor: 'bg-red-100',
      },
    };
    return configs[status] || configs.pending;
  };

  const handleDownloadInvoice = () => {
    toast.info('Invoice download feature coming soon');
  };

  const handleTrackOrder = () => {
    if (order?.tracking_number) {
      toast.info('Tracking feature coming soon');
    } else {
      toast.error('Tracking number not available yet');
    }
  };

  const statusInfo = getStatusConfig(order?.status || 'pending');
  const StatusIcon = statusInfo.icon;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" asChild>
            <Link href="/orders">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Link>
          </Button>
          <div className="flex gap-2">
            {order?.tracking_number && (
              <Button variant="outline" size="sm" onClick={handleTrackOrder}>
                <Truck className="mr-2 h-4 w-4" />
                Track Order
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleDownloadInvoice}>
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <CardTitle className="text-2xl">Order #{order.order_number}</CardTitle>
                    <p className="text-sm text-gray-600 mt-2">
                      Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <Badge className={`${statusInfo.bgColor} ${statusInfo.color} border-0 text-sm px-3 py-1`}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>
              </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      {item.product.images && item.product.images.length > 0 ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-semibold hover:text-blue-600 transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                      {item.color && <p className="text-sm text-gray-600">Color: {item.color}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-beige-50 rounded-lg p-4 space-y-1">
                  <p className="font-semibold text-gray-900">{order.shipping_address.fullName}</p>
                  <p className="text-gray-600">{order.shipping_address.phone}</p>
                  <p className="text-gray-600">{order.shipping_address.address}</p>
                  <p className="text-gray-600">
                    {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                  </p>
                </div>
              </CardContent>
            </Card>

            {order.tracking_number && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-gray-600" />
                    Tracking Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                    <p className="font-mono font-semibold text-lg text-gray-900">{order.tracking_number}</p>
                    <Button variant="link" className="px-0 mt-2 text-indigo-600" onClick={handleTrackOrder}>
                      Track Shipment →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{(order.total_amount - 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹100.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-coral-600">₹{order.total_amount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Method</span>
                  <span className="font-medium">
                    {order.payment_method === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Payment Status</span>
                  <Badge className={order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'} variant="outline">
                    {order.payment_status.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${order.status !== 'cancelled' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Order Placed</p>
                      <p className="text-xs text-gray-600">Your order has been confirmed</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Processing</p>
                      <p className="text-xs text-gray-600">Order is being prepared</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${['shipped', 'delivered'].includes(order.status) ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Shipped</p>
                      <p className="text-xs text-gray-600">Package is on the way</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'}`} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">Delivered</p>
                      <p className="text-xs text-gray-600">Order has been delivered</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-coral-200 bg-coral-50">
              <CardContent className="pt-6">
                <p className="text-sm text-gray-700 mb-3">Need help with your order?</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
