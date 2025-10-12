import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: tables, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: 'Failed to query database'
      }, { status: 500 });
    }

    const { data: categories } = await supabase
      .from('categories')
      .select('count')
      .limit(1);

    const { data: products } = await supabase
      .from('products')
      .select('count')
      .limit(1);

    return NextResponse.json({
      success: true,
      message: 'Database connection successful!',
      tables_verified: {
        users: 'connected',
        categories: 'connected',
        products: 'connected'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      details: 'Unexpected error during database connection test'
    }, { status: 500 });
  }
}
