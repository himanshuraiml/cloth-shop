import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ results: [] });
    }

    const searchTerm = `%${query.trim()}%`;
    const results: any[] = [];

    const [productsResponse, ordersResponse, customersResponse] = await Promise.all([
      supabase
        .from('products')
        .select('id, name, slug, price')
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5),

      supabase
        .from('orders')
        .select('id, order_number, total_amount, status')
        .or(`order_number.ilike.${searchTerm}`)
        .limit(5),

      supabase
        .from('users')
        .select('id, name, email')
        .eq('role', 'customer')
        .or(`name.ilike.${searchTerm},email.ilike.${searchTerm}`)
        .limit(5),
    ]);

    if (productsResponse.data) {
      results.push(
        ...productsResponse.data.map((product) => ({
          id: product.id,
          type: 'product',
          title: product.name,
          subtitle: `₹${product.price.toLocaleString()}`,
          href: `/admin/products/${product.id}`,
        }))
      );
    }

    if (ordersResponse.data) {
      results.push(
        ...ordersResponse.data.map((order) => ({
          id: order.id,
          type: 'order',
          title: order.order_number,
          subtitle: `₹${order.total_amount.toLocaleString()} - ${order.status}`,
          href: `/admin/orders/${order.id}`,
        }))
      );
    }

    if (customersResponse.data) {
      results.push(
        ...customersResponse.data.map((customer) => ({
          id: customer.id,
          type: 'customer',
          title: customer.name || 'Unknown',
          subtitle: customer.email,
          href: `/admin/users/customers/${customer.id}`,
        }))
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
