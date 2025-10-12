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
    search: '',
    minPrice: 0,
    maxPrice: 10000,
    sizes: [] as string[],
    colors: [] as string[],
    sortBy: 'newest',
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [filters]);

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
      .select('*')
      .eq('is_active', true);

    if (filters.category) {
      const category = categories.find(c => c.slug === filters.category);
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    query = query
      .gte('price', filters.minPrice)
      .lte('price', filters.maxPrice);

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
          <aside className="hidden lg:block w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  <Button
                    variant={filters.category === '' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setFilters({ ...filters, category: '' })}
                  >
                    All Products
                  </Button>
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={filters.category === category.slug ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setFilters({ ...filters, category: category.slug })}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Price Range</h3>
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
                  <div className="flex justify-between text-sm">
                    <span>₹{filters.minPrice}</span>
                    <span>₹{filters.maxPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Sizes</h3>
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
                      />
                      <Label htmlFor={`size-${size}`} className="ml-2 cursor-pointer">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Categories</h3>
                        <div className="space-y-2">
                          {categories.map((category) => (
                            <Button
                              key={category.id}
                              variant={filters.category === category.slug ? 'default' : 'ghost'}
                              className="w-full justify-start"
                              onClick={() => setFilters({ ...filters, category: category.slug })}
                            >
                              {category.name}
                            </Button>
                          ))}
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
