'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Grid, List } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price: number | null;
  images: string[];
  brand: string;
  sizes: string[];
  colors: string[];
  stock_quantity: number;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function ShopPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: searchParams.get('gender') || '',
    filter: searchParams.get('filter') || '',
    search: '',
    minPrice: 0,
    maxPrice: 10000,
    sizes: [] as string[],
    colors: [] as string[],
    sortBy: 'newest',
  });

  const [expandedCategories, setExpandedCategories] = useState<{
    men: boolean;
    women: boolean;
    kids: boolean;
  }>({
    men: false,
    women: false,
    kids: false,
  });

  useEffect(() => {
    const categoryParam = searchParams.get('category') || '';
    const genderParam = searchParams.get('gender') || '';
    const filterParam = searchParams.get('filter') || '';

    setFilters(prev => ({
      ...prev,
      category: categoryParam,
      gender: genderParam,
      filter: filterParam,
    }));
  }, [searchParams]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      fetchProducts();
    }
  }, [filters, categories]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name, slug')
      .eq('is_active', true);
    if (data) setCategories(data);
  };

  const fetchProducts = async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('is_active', true);

    if (filters.category) {
      const category = categories.find(c => c.slug === filters.category);
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    if (filters.gender) {
      let genderPrefix = '';
      if (filters.gender === 'men') {
        genderPrefix = 'mens-';
      } else if (filters.gender === 'women') {
        genderPrefix = 'womens-';
      } else if (filters.gender === 'kids') {
        const genderCategories = categories
          .filter(c => c.slug.startsWith('baby-') || c.slug.startsWith('kids-'))
          .map(c => c.id);

        if (genderCategories.length > 0) {
          query = query.in('category_id', genderCategories);
        }
      }

      if (genderPrefix) {
        const genderCategories = categories
          .filter(c => c.slug.startsWith(genderPrefix))
          .map(c => c.id);

        if (genderCategories.length > 0) {
          query = query.in('category_id', genderCategories);
        }
      }
    }

    if (filters.filter) {
      switch (filters.filter) {
        case 'new':
          query = query.gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());
          break;
        case 'bestsellers':
          query = query.order('stock_quantity', { ascending: false });
          break;
        case 'sale':
          query = query.not('discount_price', 'is', null);
          break;
      }
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    query = query
      .gte('price', filters.minPrice)
      .lte('price', filters.maxPrice);

    if (!filters.filter || filters.filter !== 'bestsellers') {
      switch (filters.sortBy) {
        case 'price-low':
          query = query.order('price', { ascending: true });
          break;
        case 'price-high':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
        default:
          query = query.order('created_at', { ascending: false });
          break;
      }
    }

    const { data } = await query;
    if (data) setProducts(data);
    setLoading(false);
  };

  const allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36'];
  const allColors = ['Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Navy', 'Brown'];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="hidden lg:block w-64">
            <div className="bg-white shadow-sm">
              <div className="border-b border-gray-200 p-4">
                <h2 className="text-base font-semibold text-gray-900">Filters</h2>
              </div>

              <div className="border-b border-gray-200">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Categories</h3>
                  <div className="space-y-1">
                    <button
                      onClick={() => setFilters({ ...filters, category: '', gender: '' })}
                      className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                        filters.category === '' && filters.gender === ''
                          ? 'bg-gray-900 text-white font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      All Products
                    </button>

                    <div>
                      <button
                        onClick={() => setExpandedCategories({ ...expandedCategories, men: !expandedCategories.men })}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                          filters.gender === 'men'
                            ? 'bg-gray-900 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>Men&apos;s Clothing</span>
                        <span className="text-xs">{expandedCategories.men ? '−' : '+'}</span>
                      </button>
                      {expandedCategories.men && (
                        <div className="ml-4 mt-1 space-y-1">
                          {categories
                            .filter(c => c.slug.startsWith('mens-'))
                            .map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setFilters({ ...filters, category: category.slug, gender: 'men' })}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                                  filters.category === category.slug
                                    ? 'bg-gray-900 text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {category.name.replace("Men's ", '')}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        onClick={() => setExpandedCategories({ ...expandedCategories, women: !expandedCategories.women })}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                          filters.gender === 'women'
                            ? 'bg-gray-900 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>Women&apos;s Clothing</span>
                        <span className="text-xs">{expandedCategories.women ? '−' : '+'}</span>
                      </button>
                      {expandedCategories.women && (
                        <div className="ml-4 mt-1 space-y-1">
                          {categories
                            .filter(c => c.slug.startsWith('womens-'))
                            .map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setFilters({ ...filters, category: category.slug, gender: 'women' })}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                                  filters.category === category.slug
                                    ? 'bg-gray-900 text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {category.name.replace("Women's ", '')}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        onClick={() => setExpandedCategories({ ...expandedCategories, kids: !expandedCategories.kids })}
                        className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                          filters.gender === 'kids'
                            ? 'bg-gray-900 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span>Baby &amp; Kids</span>
                        <span className="text-xs">{expandedCategories.kids ? '−' : '+'}</span>
                      </button>
                      {expandedCategories.kids && (
                        <div className="ml-4 mt-1 space-y-1">
                          {categories
                            .filter(c => c.slug.startsWith('baby-') || c.slug.startsWith('kids-'))
                            .map((category) => (
                              <button
                                key={category.id}
                                onClick={() => setFilters({ ...filters, category: category.slug, gender: 'kids' })}
                                className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                                  filters.category === category.slug
                                    ? 'bg-gray-900 text-white font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                              >
                                {category.name.replace('Baby ', '').replace('Kids ', '')}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Price</h3>
                  <div className="space-y-4">
                    <Slider
                      value={[filters.minPrice, filters.maxPrice]}
                      min={0}
                      max={10000}
                      step={100}
                      onValueChange={([min, max]) =>
                        setFilters({ ...filters, minPrice: min, maxPrice: max })
                      }
                      className="w-full"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Min</span>
                        <span className="text-sm font-medium text-gray-900">₹{filters.minPrice}</span>
                      </div>
                      <span className="text-gray-400">-</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-600">Max</span>
                        <span className="text-sm font-medium text-gray-900">₹{filters.maxPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Size</h3>
                  <div className="space-y-2">
                    {allSizes.map((size) => (
                      <div key={size} className="flex items-center">
                        <Checkbox
                          id={`size-${size}`}
                          checked={filters.sizes.includes(size)}
                          onCheckedChange={(checked) => {
                            setFilters({
                              ...filters,
                              sizes: checked
                                ? [...filters.sizes, size]
                                : filters.sizes.filter((s) => s !== size),
                            });
                          }}
                          className="rounded-sm border-gray-300"
                        />
                        <Label htmlFor={`size-${size}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-200">
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Color</h3>
                  <div className="space-y-2">
                    {allColors.map((color) => (
                      <div key={color} className="flex items-center">
                        <Checkbox
                          id={`color-${color}`}
                          checked={filters.colors.includes(color)}
                          onCheckedChange={(checked) => {
                            setFilters({
                              ...filters,
                              colors: checked
                                ? [...filters.colors, color]
                                : filters.colors.filter((c) => c !== color),
                            });
                          }}
                          className="rounded-sm border-gray-300"
                        />
                        <Label htmlFor={`color-${color}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                          {color}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <SheetHeader className="border-b border-gray-200 p-4">
                      <SheetTitle className="text-base font-semibold">Filters</SheetTitle>
                    </SheetHeader>
                    <div className="overflow-y-auto h-[calc(100vh-70px)]">
                      <div className="border-b border-gray-200">
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Categories</h3>
                          <div className="space-y-1">
                            <button
                              onClick={() => setFilters({ ...filters, category: '', gender: '' })}
                              className={`w-full text-left px-3 py-2 text-sm rounded transition-colors ${
                                filters.category === '' && filters.gender === ''
                                  ? 'bg-gray-900 text-white font-medium'
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              All Products
                            </button>

                            <div>
                              <button
                                onClick={() => setExpandedCategories({ ...expandedCategories, men: !expandedCategories.men })}
                                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                                  filters.gender === 'men'
                                    ? 'bg-gray-900 text-white font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <span>Men&apos;s Clothing</span>
                                <span className="text-xs">{expandedCategories.men ? '−' : '+'}</span>
                              </button>
                              {expandedCategories.men && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {categories
                                    .filter(c => c.slug.startsWith('mens-'))
                                    .map((category) => (
                                      <button
                                        key={category.id}
                                        onClick={() => setFilters({ ...filters, category: category.slug, gender: 'men' })}
                                        className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                                          filters.category === category.slug
                                            ? 'bg-gray-900 text-white font-medium'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                      >
                                        {category.name.replace("Men's ", '')}
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>

                            <div>
                              <button
                                onClick={() => setExpandedCategories({ ...expandedCategories, women: !expandedCategories.women })}
                                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                                  filters.gender === 'women'
                                    ? 'bg-gray-900 text-white font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <span>Women&apos;s Clothing</span>
                                <span className="text-xs">{expandedCategories.women ? '−' : '+'}</span>
                              </button>
                              {expandedCategories.women && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {categories
                                    .filter(c => c.slug.startsWith('womens-'))
                                    .map((category) => (
                                      <button
                                        key={category.id}
                                        onClick={() => setFilters({ ...filters, category: category.slug, gender: 'women' })}
                                        className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                                          filters.category === category.slug
                                            ? 'bg-gray-900 text-white font-medium'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                      >
                                        {category.name.replace("Women's ", '')}
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>

                            <div>
                              <button
                                onClick={() => setExpandedCategories({ ...expandedCategories, kids: !expandedCategories.kids })}
                                className={`w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center justify-between ${
                                  filters.gender === 'kids'
                                    ? 'bg-gray-900 text-white font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                <span>Baby &amp; Kids</span>
                                <span className="text-xs">{expandedCategories.kids ? '−' : '+'}</span>
                              </button>
                              {expandedCategories.kids && (
                                <div className="ml-4 mt-1 space-y-1">
                                  {categories
                                    .filter(c => c.slug.startsWith('baby-') || c.slug.startsWith('kids-'))
                                    .map((category) => (
                                      <button
                                        key={category.id}
                                        onClick={() => setFilters({ ...filters, category: category.slug, gender: 'kids' })}
                                        className={`w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${
                                          filters.category === category.slug
                                            ? 'bg-gray-900 text-white font-medium'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                      >
                                        {category.name.replace('Baby ', '').replace('Kids ', '')}
                                      </button>
                                    ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-200">
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Price</h3>
                          <div className="space-y-4">
                            <Slider
                              value={[filters.minPrice, filters.maxPrice]}
                              min={0}
                              max={10000}
                              step={100}
                              onValueChange={([min, max]) =>
                                setFilters({ ...filters, minPrice: min, maxPrice: max })
                              }
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Min</span>
                                <span className="text-sm font-medium text-gray-900">₹{filters.minPrice}</span>
                              </div>
                              <span className="text-gray-400">-</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Max</span>
                                <span className="text-sm font-medium text-gray-900">₹{filters.maxPrice}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-200">
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Size</h3>
                          <div className="space-y-2">
                            {allSizes.map((size) => (
                              <div key={size} className="flex items-center">
                                <Checkbox
                                  id={`mobile-size-${size}`}
                                  checked={filters.sizes.includes(size)}
                                  onCheckedChange={(checked) => {
                                    setFilters({
                                      ...filters,
                                      sizes: checked
                                        ? [...filters.sizes, size]
                                        : filters.sizes.filter((s) => s !== size),
                                    });
                                  }}
                                  className="rounded-sm border-gray-300"
                                />
                                <Label htmlFor={`mobile-size-${size}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                  {size}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-b border-gray-200">
                        <div className="p-4">
                          <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Color</h3>
                          <div className="space-y-2">
                            {allColors.map((color) => (
                              <div key={color} className="flex items-center">
                                <Checkbox
                                  id={`mobile-color-${color}`}
                                  checked={filters.colors.includes(color)}
                                  onCheckedChange={(checked) => {
                                    setFilters({
                                      ...filters,
                                      colors: checked
                                        ? [...filters.colors, color]
                                        : filters.colors.filter((c) => c !== color),
                                    });
                                  }}
                                  className="rounded-sm border-gray-300"
                                />
                                <Label htmlFor={`mobile-color-${color}`} className="ml-2 text-sm text-gray-700 cursor-pointer">
                                  {color}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                <p className="text-sm text-slate-600">
                  {products.length} products found
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => setFilters({ ...filters, sortBy: value })}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No products found</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((product) => (
                  <Link key={product.id} href={`/product/${product.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                      {viewMode === 'grid' ? (
                        <>
                          <div className="relative aspect-square overflow-hidden bg-slate-100">
                            <Image
                              src={product.images[0] || '/placeholder.jpg'}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {product.discount_price && (
                              <Badge className="absolute top-3 right-3 bg-red-500">
                                {Math.round(((product.price - product.discount_price) / product.price) * 100)}% OFF
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-1 line-clamp-1">
                              {product.name}
                            </h3>
                            <p className="text-sm text-slate-600 mb-2">{product.brand}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">
                                ₹{product.discount_price || product.price}
                              </span>
                              {product.discount_price && (
                                <span className="text-sm text-slate-500 line-through">
                                  ₹{product.price}
                                </span>
                              )}
                            </div>
                            {product.stock_quantity <= 5 && (
                              <p className="text-xs text-orange-600 mt-2">
                                Only {product.stock_quantity} left!
                              </p>
                            )}
                          </CardContent>
                        </>
                      ) : (
                        <div className="flex gap-4 p-4">
                          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                            <Image
                              src={product.images[0] || '/placeholder.jpg'}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">{product.name}</h3>
                            <p className="text-sm text-slate-600 mb-2">{product.brand}</p>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-2">
                              {product.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">
                                ₹{product.discount_price || product.price}
                              </span>
                              {product.discount_price && (
                                <span className="text-sm text-slate-500 line-through">
                                  ₹{product.price}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
