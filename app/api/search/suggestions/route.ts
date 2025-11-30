import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    const searchTerm = `${query.toLowerCase()}%`;

    const { data: productSuggestions } = await supabase
      .from('products')
      .select('name')
      .ilike('name', searchTerm)
      .eq('is_active', true)
      .limit(5);

    const { data: categorySuggestions } = await supabase
      .from('categories')
      .select('name')
      .ilike('name', searchTerm)
      .limit(3);

    const suggestions = [
      ...(productSuggestions?.map((p) => p.name) || []),
      ...(categorySuggestions?.map((c) => c.name) || []),
    ];

    const uniqueSuggestions = Array.from(new Set(suggestions)).slice(0, 8);

    return NextResponse.json({ suggestions: uniqueSuggestions });
  } catch (error) {
    console.error('Error in suggestions API:', error);
    return NextResponse.json({ suggestions: [] });
  }
}
