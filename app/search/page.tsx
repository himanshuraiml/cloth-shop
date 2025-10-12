'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Search,
  SlidersHorizontal,
  X,
  Loader2,
  Package,
  AlertCircle,
  Grid3x3,
  List,
} from 'lucide-react';
import { toast } from 'sonner';
import { addRecentSearch } from '@/lib/search-utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  stock_quantity: number;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    categories: [] as string[],
    inStock: false,
  });

  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (query) {
      fetchResults();
      addRecentSearch(query);
    }
  }, [query]);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}&type=all`);
      const data = await response.json();

      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      toast.error('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      if (product.price < filters.minPrice || product.price > filters.maxPrice) return false;
      if (filters.inStock && product.stock_quantity <= 0) return false;
      if (filters.categories.length > 0 && product.categories) {
        return filters.categories.includes(product.categories.slug);
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  const handleCategoryFilter = (categorySlug: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categorySlug)
        ? prev.categories.filter((c) => c !== categorySlug)
        : [...prev.categories, categorySlug],
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 10000,
      categories: [],
      inStock: false,
    });
    setSortBy('relevance');
  };

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Searching</h2>
          <p className="text-gray-600 mb-6">Enter a search term to find products</p>
          <Button asChild>
            <Link href="/shop">Browse All Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Related Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                asChild
              >
                <Link href={`/shop?category=${category.slug}`}>
                  {category.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </h3>
                {(filters.categories.length > 0 || filters.inStock || sortBy !== 'relevance') && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto py-1 px-2 text-xs">
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Price Range</Label>
                  <div className="px-2">
                    <Slider
                      min={0}
                      max={10000}
                      step={100}
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={([min, max]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
                      className="mb-4"
                    />
                    <div className="flex items-center gap-2 text-sm">
                      <Input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                        className="h-8"
                        min={0}
                      />
                      <span>-</span>
                      <Input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                        className="h-8"
                        min={0}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium mb-3 block">Availability</Label>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={filters.inStock}
                      onCheckedChange={(checked) =>
                        setFilters({ ...filters, inStock: checked as boolean })
                      }
                    />
                    <Label htmlFor="inStock" className="text-sm font-normal cursor-pointer">
                      In Stock Only
                    </Label>
                  </div>
                </div>

                {categories.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <Label className="text-sm font-medium mb-3 block">Categories</Label>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.slug}
                              checked={filters.categories.includes(category.slug)}
                              onCheckedChange={() => handleCategoryFilter(category.slug)}
                            />
                            <Label
                              htmlFor={category.slug}
                              className="text-sm font-normal cursor-pointer"
                            >
                              {category.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>

        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name-asc">Name: A to Z</SelectItem>
                <SelectItem value="name-desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3x3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-coral-500" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <AlertCircle className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 text-center mb-6">
                  Try adjusting your filters or search query
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Button asChild>
                    <Link href="/shop">Browse All Products</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className={viewMode === 'grid' ? 'p-4' : 'p-4 flex gap-4'}>
                    <Link
                      href={`/product/${product.slug}`}
                      className={viewMode === 'grid' ? 'block' : 'flex-shrink-0'}
                    >
                      <div
                        className={
                          viewMode === 'grid'
                            ? 'aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden'
                            : 'w-32 h-32 bg-gray-100 rounded-lg overflow-hidden'
                        }
                      >
                        {product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="flex-1">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-coral-600 transition-colors mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-coral-600">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.stock_quantity > 0 ? (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            In Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-coral-500" />
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
