"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
}

export function CategoryDropdown() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, image_url')
        .eq('is_active', true)
        .is('parent_id', null)
        .limit(8);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        Loading categories...
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500">
        No categories available
      </div>
    );
  }

  return (
    <div className="w-[600px] p-6">
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group flex flex-col items-center text-center hover:bg-gray-50 rounded-lg p-3 transition-colors"
          >
            <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden bg-gray-100">
              {category.image_url ? (
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <Link
          href="/shop"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center"
        >
          View All Categories
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}
