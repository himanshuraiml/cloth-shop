'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  ShoppingBag
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  products: {
    id: string;
    name: string;
    slug: string;
    images: string[];
  };
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  payment_status: string;
  created_at: string;
  shipping_address: any;
  tracking_number?: string;
  order_items: OrderItem[];
}

const statusConfig: Record<string, { label: string; icon: any; color: string; bgColor: string }> = {
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

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?callbackUrl=/orders');
    } else if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/customer/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-coral-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600 text-center mb-6">
                Start shopping to see your orders here
              </p>
              <Button asChild className="bg-coral-500 hover:bg-coral-600">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const statusInfo = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = statusInfo.icon;

              return (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.order_number}
                          </h3>
                          <Badge className={`${statusInfo.bgColor} ${statusInfo.color} border-0`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Placed {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-xl font-bold text-gray-900">
                            ₹{order.total_amount.toLocaleString()}
                          </p>
                        </div>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/orders/${order.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <Package className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {order.order_items.length} {order.order_items.length === 1 ? 'item' : 'items'}
                          </p>
                          <p className="text-xs text-gray-600">
                            {order.order_items.slice(0, 2).map(item => item.products.name).join(', ')}
                            {order.order_items.length > 2 && ` +${order.order_items.length - 2} more`}
                          </p>
                        </div>
                      </div>

                      {order.tracking_number && (
                        <div className="flex items-start gap-3">
                          <Truck className="h-5 w-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Tracking Number</p>
                            <p className="text-xs text-gray-600 font-mono">{order.tracking_number}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                      {order.order_items.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={item.products.images[0] || '/placeholder.png'}
                            alt={item.products.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {order.order_items.length > 4 && (
                        <div className="w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center bg-gray-50">
                          <span className="text-xs font-medium text-gray-600">
                            +{order.order_items.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
