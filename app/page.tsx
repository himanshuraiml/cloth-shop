import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Heart, Star, ShoppingBag, TrendingUp, Zap, Package, Percent } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import dynamic from 'next/dynamic';

const CustomerHeader = dynamic(() => import('@/components/navigation/CustomerHeader').then(mod => ({ default: mod.CustomerHeader })), {
  ssr: false,
});

const CustomerFooter = dynamic(() => import('@/components/navigation/CustomerFooter').then(mod => ({ default: mod.CustomerFooter })), {
  ssr: false,
});

async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .limit(8);
  return data || [];
}

async function getFeaturedProducts() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .not('discount_price', 'is', null)
    .limit(8);
  return data || [];
}

async function getNewArrivals() {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6);
  return data || [];
}

export default async function HomePage() {
  const [categories, featuredProducts, newArrivals] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getNewArrivals(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader />

      <main className="container mx-auto px-4 py-6 space-y-8">

        {/* Top Banner - Promotional */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 h-[200px] md:h-[240px]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-60"></div>
          <div className="relative h-full flex items-center justify-between px-8 md:px-16">
            <div className="text-white max-w-xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-3">WINTER SALE</h2>
              <p className="text-lg md:text-2xl mb-4 font-semibold">Discounts up to 80%</p>
              <Link href="/shop?filter=sale">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white rounded-full font-semibold px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="hidden md:flex items-center">
              <div className="relative">
                <div className="w-48 h-48 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Percent className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Large Hero Banner - Dark Theme with Product */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 h-[400px] md:h-[480px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="relative h-full grid md:grid-cols-2 gap-8 items-center px-8 md:px-16">
            <div className="text-white space-y-6">
              <div className="flex gap-4 text-sm font-semibold uppercase tracking-wider">
                <span className="text-blue-400">Premium</span>
                <span className="text-purple-400">Quality</span>
                <span className="text-pink-400">Comfort</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                New Season<br />
                Collection
              </h2>
              <p className="text-xl text-gray-300 max-w-md">
                Discover the latest trends in fashion with up to 30% off on selected items
              </p>
              <div className="flex gap-3">
                <Link href="/shop">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold px-8">
                    Explore Collection
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
                <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                  <Package className="w-full h-48 text-white/80" />
                  <div className="mt-6 text-center">
                    <p className="text-2xl font-bold text-white">Featured Products</p>
                    <p className="text-gray-400 mt-2">Premium quality assured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/shop?filter=new">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-blue-500">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900">New Arrivals</h3>
                <p className="text-sm text-gray-600 mt-1">Fresh styles</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop?filter=sale">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-red-500">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Percent className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900">Sale</h3>
                <p className="text-sm text-gray-600 mt-1">Up to 80% off</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop?filter=bestsellers">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-yellow-500">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-7 h-7 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900">Bestsellers</h3>
                <p className="text-sm text-gray-600 mt-1">Top rated</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/shop">
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer border-2 hover:border-green-500">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900">All Products</h3>
                <p className="text-sm text-gray-600 mt-1">Browse all</p>
              </CardContent>
            </Card>
          </Link>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Hot Deals</h2>
                <p className="text-gray-600 mt-1">Limited time offers you don't want to miss</p>
              </div>
              <Link href="/shop?filter=sale">
                <Button variant="ghost" className="hidden md:flex">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.map((product: any) => {
                const discount = product.discount_price
                  ? Math.round(((product.price - product.discount_price) / product.price) * 100)
                  : 0;
                const finalPrice = product.discount_price || product.price;

                return (
                  <Link key={product.id} href={`/product/${product.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-coral-500">
                      <CardContent className="p-0">
                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                          {product.images && product.images[0] ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <Package className="w-16 h-16 text-gray-400" />
                            </div>
                          )}

                          {discount > 0 && (
                            <Badge className="absolute top-3 left-3 bg-red-500 text-white font-bold px-3 py-1 text-sm">
                              -{discount}%
                            </Badge>
                          )}

                          <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-50">
                            <Heart className="w-5 h-5 text-gray-700 hover:text-red-500" />
                          </button>
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-coral-600 transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-xl font-bold text-coral-600">
                              ₹{finalPrice.toLocaleString()}
                            </span>
                            {discount > 0 && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.price.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-600">(128)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link href="/shop?filter=sale">
                <Button size="lg" variant="outline" className="w-full">
                  View All Deals
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        )}

        {/* Categories Banner */}
        {categories.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                <p className="text-gray-600 mt-1">Explore our diverse collection</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(0, 8).map((category: any) => (
                <Link key={category.id} href={`/shop?category=${category.slug}`}>
                  <Card className="group hover:shadow-xl transition-all hover:scale-105 cursor-pointer overflow-hidden border-2 hover:border-blue-500">
                    <CardContent className="p-0">
                      <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
                        {category.image_url ? (
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-20 h-20 text-gray-300 group-hover:text-blue-500 transition-colors" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                          <h3 className="text-white font-bold text-lg">{category.name}</h3>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
                <p className="text-gray-600 mt-1">Fresh styles just landed</p>
              </div>
              <Link href="/shop?filter=new">
                <Button variant="ghost" className="hidden md:flex">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {newArrivals.slice(0, 6).map((product: any) => (
                <Link key={product.id} href={`/product/${product.slug}`}>
                  <Card className="group hover:shadow-lg transition-all cursor-pointer border hover:border-gray-300">
                    <CardContent className="p-3">
                      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-12 h-12 text-gray-300" />
                          </div>
                        )}
                        <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold">
                          NEW
                        </Badge>
                      </div>
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-lg font-bold text-coral-600">
                        ₹{(product.discount_price || product.price).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-8 md:p-16">
          <div className="relative text-center text-white space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold">Join Our Community</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Get exclusive access to new arrivals, special offers, and insider news
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 rounded-full font-semibold px-8">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/shop">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full font-semibold px-8">
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <CustomerFooter />
    </div>
  );
}
