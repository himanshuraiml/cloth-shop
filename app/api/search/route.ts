import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';

    if (!query || query.length < 2) {
      return NextResponse.json({
        products: [],
        categories: [],
        message: 'Query must be at least 2 characters',
      });
    }

    const searchTerm = `%${query.toLowerCase()}%`;

    if (type === 'products' || type === 'all') {
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
          id,
          name,
          slug,
          description,
          price,
          images,
          stock_quantity,
          categories (
            id,
            name,
            slug
          )
        `)
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .eq('is_active', true)
        .limit(10);

      if (productsError) {
        console.error('Error searching products:', productsError);
      }

      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('id, name, slug, description')
        .ilike('name', searchTerm)
        .limit(5);

      if (categoriesError) {
        console.error('Error searching categories:', categoriesError);
      }

      return NextResponse.json({
        products: products || [],
        categories: categories || [],
        query,
      });
    }

    return NextResponse.json({
      products: [],
      categories: [],
      query,
    });
  } catch (error) {
    console.error('Error in search API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
