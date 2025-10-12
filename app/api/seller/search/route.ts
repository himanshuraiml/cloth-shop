import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user || session.user.role !== 'seller') {
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

    const [productsResponse, ordersResponse] = await Promise.all([
      supabase
        .from('products')
        .select('id, name, slug, price, stock')
        .eq('seller_id', session.user.id)
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(5),

      supabase
        .from('orders')
        .select('id, order_number, total_amount, status')
        .eq('seller_id', session.user.id)
        .or(`order_number.ilike.${searchTerm}`)
        .limit(5),
    ]);

    if (productsResponse.data) {
      results.push(
        ...productsResponse.data.map((product) => ({
          id: product.id,
          type: 'product',
          title: product.name,
          subtitle: `₹${product.price.toLocaleString()} - Stock: ${product.stock}`,
          href: `/seller/products/${product.id}`,
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
          href: `/seller/orders/${order.id}`,
        }))
      );
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error('Error in seller search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
