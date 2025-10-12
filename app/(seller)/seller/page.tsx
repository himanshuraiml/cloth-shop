'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function SellerDashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      title: 'Total Products',
      value: '0',
      change: '+0%',
      trend: 'neutral',
      icon: Package,
      color: 'text-beige-700',
      bgColor: 'bg-beige-100',
    },
    {
      title: 'Pending Orders',
      value: '0',
      change: '+0%',
      trend: 'up',
      icon: Clock,
      color: 'text-coral-600',
      bgColor: 'bg-coral-100',
    },
    {
      title: 'Total Earnings',
      value: '₹0',
      change: '+0%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-sage-600',
      bgColor: 'bg-sage-100',
    },
    {
      title: 'Out of Stock',
      value: '0',
      change: '0',
      trend: 'neutral',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', product: 'Classic T-Shirt', amount: '₹899', status: 'Processing' },
    { id: 'ORD-002', product: 'Cotton Shirt', amount: '₹1,499', status: 'New' },
    { id: 'ORD-003', product: 'Denim Jeans', amount: '₹2,299', status: 'Shipped' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        {session?.user && (
          <p className="text-gray-600 mt-1">
            Welcome back, {session.user.name}!
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4 text-green-600" />
                      ) : stat.trend === 'down' ? (
                        <ArrowDownRight className="h-4 w-4 text-red-600" />
                      ) : null}
                      <span className={`text-sm ${
                        stat.trend === 'up' ? 'text-green-600' :
                        stat.trend === 'down' ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">from last month</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-beige-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      order.status === 'Shipped'
                        ? 'bg-green-100 text-green-700'
                        : order.status === 'New'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-beige-50 hover:bg-beige-100 rounded-lg transition-colors text-left">
                <Package className="h-6 w-6 text-beige-700 mb-2" />
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-xs text-gray-600">Create new listing</p>
              </button>
              <button className="p-4 bg-coral-50 hover:bg-coral-100 rounded-lg transition-colors text-left">
                <ShoppingCart className="h-6 w-6 text-coral-600 mb-2" />
                <p className="font-medium text-gray-900">View Orders</p>
                <p className="text-xs text-gray-600">Manage orders</p>
              </button>
              <button className="p-4 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors text-left">
                <DollarSign className="h-6 w-6 text-sage-600 mb-2" />
                <p className="font-medium text-gray-900">Earnings</p>
                <p className="text-xs text-gray-600">View payments</p>
              </button>
              <button className="p-4 bg-beige-50 hover:bg-beige-100 rounded-lg transition-colors text-left">
                <TrendingUp className="h-6 w-6 text-beige-700 mb-2" />
                <p className="font-medium text-gray-900">Reports</p>
                <p className="text-xs text-gray-600">View analytics</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
