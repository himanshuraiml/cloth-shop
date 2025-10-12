'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Search,
  Clock,
  TrendingUp,
  X,
  ArrowRight,
  Loader2,
  Package,
  Tag,
} from 'lucide-react';
import {
  getRecentSearches,
  addRecentSearch,
  clearRecentSearches,
  popularSearches,
  debounce,
  sortByRelevance,
} from '@/lib/search-utils';

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  categories?: {
    name: string;
    slug: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface SearchResults {
  products: Product[];
  categories: Category[];
  query: string;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults>({
    products: [],
    categories: [],
    query: '',
  });
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    if (open) {
      setRecentSearches(getRecentSearches().map((s) => s.query));
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults({ products: [], categories: [], query: '' });
      setSelectedIndex(-1);
    }
  }, [open]);

  const searchProducts = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setResults({ products: [], categories: [], query: '' });
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}&type=all`
        );
        const data = await response.json();

        const sortedProducts = sortByRelevance(data.products || [], searchQuery);

        setResults({
          products: sortedProducts,
          categories: data.categories || [],
          query: searchQuery,
        });
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const debouncedSearch = useCallback(debounce(searchProducts, 300), [searchProducts]);

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    } else {
      setResults({ products: [], categories: [], query: '' });
    }
  }, [query, debouncedSearch]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      addRecentSearch(searchQuery.trim());
      onOpenChange(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQueryClick = (clickedQuery: string) => {
    setQuery(clickedQuery);
    handleSearch(clickedQuery);
  };

  const handleProductClick = (slug: string) => {
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
    onOpenChange(false);
    router.push(`/product/${slug}`);
  };

  const handleCategoryClick = (slug: string) => {
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
    onOpenChange(false);
    router.push(`/shop?category=${slug}`);
  };

  const handleClearRecent = () => {
    clearRecentSearches();
    setRecentSearches([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const totalResults = results.products.length + results.categories.length;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalResults - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex === -1) {
        handleSearch(query);
      } else if (selectedIndex < results.products.length) {
        handleProductClick(results.products[selectedIndex].slug);
      } else {
        const categoryIndex = selectedIndex - results.products.length;
        handleCategoryClick(results.categories[categoryIndex].slug);
      }
    }
  };

  const showResults = query.length >= 2 && (results.products.length > 0 || results.categories.length > 0);
  const showEmpty = query.length >= 2 && !loading && results.products.length === 0 && results.categories.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products, categories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 h-12 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
            )}
            {query && !loading && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        <Separator />

        <div className="max-h-[500px] overflow-y-auto p-4">
          {!query && recentSearches.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearRecent}
                  className="text-xs h-auto py-1 px-2"
                >
                  Clear
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-gray-100 py-1.5"
                    onClick={() => handleQueryClick(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {!query && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4" />
                Popular Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-coral-100 hover:text-coral-700 py-1.5"
                    onClick={() => handleQueryClick(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {showResults && (
            <div className="space-y-6">
              {results.products.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Products
                    </h3>
                    <Button
                      variant="link"
                      size="sm"
                      className="text-xs h-auto py-0 text-coral-600"
                      onClick={() => handleSearch(query)}
                    >
                      View all
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {results.products.slice(0, 5).map((product, index) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product.slug)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                          selectedIndex === index ? 'bg-gray-50' : ''
                        }`}
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          {product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-sm text-gray-600">₹{product.price.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4" />
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {results.categories.map((category, index) => {
                      const itemIndex = results.products.length + index;
                      return (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.slug)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left ${
                            selectedIndex === itemIndex ? 'bg-gray-50' : ''
                          }`}
                        >
                          <div>
                            <p className="font-medium text-gray-900">{category.name}</p>
                            {category.description && (
                              <p className="text-sm text-gray-600 truncate">{category.description}</p>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {showEmpty && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">
                Try searching with different keywords
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/shop')}
              >
                Browse all products
              </Button>
            </div>
          )}
        </div>

        <Separator />

        <div className="p-3 bg-gray-50 text-xs text-gray-600 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">↑</kbd>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Enter</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Esc</kbd>
              Close
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
