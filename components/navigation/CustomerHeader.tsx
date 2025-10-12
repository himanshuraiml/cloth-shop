"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Package,
  MapPin,
  Settings,
  LogOut,
  Store,
  Gift,
  Award,
  CreditCard
} from 'lucide-react';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchModal';
import { ShopMegaMenu } from './ShopMegaMenu';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { cn } from '@/lib/utils';

export function CustomerHeader() {
  const { data: session } = useSession();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow duration-300",
        isScrolled ? "shadow-md" : "shadow-sm"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-6">
              <MobileNav />

              <Link href="/" className="flex items-center gap-3">
                <img
                  src="/Trendy Minimalist Logo for Tribaah Clothing Store.png"
                  alt="Tribaah Logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-2xl font-bold text-gray-900">
                  Tribaah
                </span>
              </Link>
            </div>

            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList className="gap-1">
                <NavigationMenuItem>
                  <Link href="/shop?filter=new" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      New Arrivals
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/shop?filter=bestsellers" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Best Sellers
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Men
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6 bg-white shadow-lg border border-gray-200">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Top Wear
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=mens-tshirts" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              T-Shirts
                            </Link>
                            <Link href="/shop?category=mens-shirts" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Casual Shirts
                            </Link>
                            <Link href="/shop?category=mens-jackets" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Jackets
                            </Link>
                            <Link href="/shop?category=blazers" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Blazers
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Bottom Wear
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=mens-jeans" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Jeans
                            </Link>
                            <Link href="/shop?category=mens-trousers" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Trousers
                            </Link>
                          </div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 mt-6">
                            Footwear
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=mens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Casual Shoes
                            </Link>
                            <Link href="/shop?category=mens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Formal Shoes
                            </Link>
                            <Link href="/shop?category=mens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Sports Shoes
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Shop By
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?gender=men&filter=new" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              New Arrivals
                            </Link>
                            <Link href="/shop?gender=men&filter=bestsellers" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Best Sellers
                            </Link>
                            <Link href="/shop?gender=men&filter=sale" className="block text-sm text-red-600 hover:text-red-700 hover:font-medium transition-colors">
                              Sale Items
                            </Link>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link href="/shop?gender=men" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                              View All Men&apos;s Products →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Women
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6 bg-white shadow-lg border border-gray-200">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Western Wear
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=womens-dresses" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Dresses
                            </Link>
                            <Link href="/shop?category=womens-tops" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Tops
                            </Link>
                            <Link href="/shop?category=womens-jeans" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Jeans
                            </Link>
                            <Link href="/shop?category=womens-skirts" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Skirts
                            </Link>
                            <Link href="/shop?category=womens-jackets" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Jackets
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Footwear
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=womens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Flats
                            </Link>
                            <Link href="/shop?category=womens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Heels
                            </Link>
                            <Link href="/shop?category=womens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Sneakers
                            </Link>
                            <Link href="/shop?category=womens-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Sandals
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Shop By
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?gender=women&filter=new" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              New Arrivals
                            </Link>
                            <Link href="/shop?gender=women&filter=bestsellers" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Best Sellers
                            </Link>
                            <Link href="/shop?gender=women&filter=sale" className="block text-sm text-red-600 hover:text-red-700 hover:font-medium transition-colors">
                              Sale Items
                            </Link>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link href="/shop?gender=women" className="text-sm text-pink-600 hover:text-pink-700 font-semibold">
                              View All Women&apos;s Products →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium">
                    Baby & Kids
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-6 bg-white shadow-lg border border-gray-200">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Baby (0-2 Years)
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=baby-bodysuits" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Bodysuits
                            </Link>
                            <Link href="/shop?category=baby-rompers" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Rompers
                            </Link>
                            <Link href="/shop?category=baby-sleepwear" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Sleepwear
                            </Link>
                            <Link href="/shop?category=baby-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Baby Shoes
                            </Link>
                            <Link href="/shop?category=baby-accessories" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Accessories
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            Kids (2-12 Years)
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=kids-tshirts" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              T-Shirts
                            </Link>
                            <Link href="/shop?category=kids-shirts" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Shirts
                            </Link>
                            <Link href="/shop?category=kids-jeans" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Jeans
                            </Link>
                            <Link href="/shop?category=kids-shorts" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Shorts
                            </Link>
                            <Link href="/shop?category=kids-dresses" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Dresses
                            </Link>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                            More
                          </h3>
                          <div className="space-y-2">
                            <Link href="/shop?category=kids-jackets" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Jackets
                            </Link>
                            <Link href="/shop?category=kids-shoes" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Footwear
                            </Link>
                            <Link href="/shop?category=kids-sportswear" className="block text-sm text-gray-700 hover:text-gray-900 hover:font-medium transition-colors">
                              Sportswear
                            </Link>
                          </div>
                          <div className="mt-6 pt-6 border-t border-gray-200">
                            <Link href="/shop?gender=kids" className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                              View All Kids Products →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/shop?filter=sale" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-red-50 text-red-600 hover:text-red-700 focus:bg-red-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Sale
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="hidden sm:flex relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {wishlistCount > 9 ? '9+' : wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden lg:flex gap-1 font-semibold hover:bg-blue-50">
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <div className="px-4 py-3 border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {session.user.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <User className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">My Profile</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Package className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Orders</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Heart className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Wishlist</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/rewards" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Award className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Rewards</span>
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/gift-cards" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Gift className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Gift Cards</span>
                        </Link>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator />
                    <div className="py-2">
                      <DropdownMenuItem
                        className="cursor-pointer px-4 py-2.5 flex items-center gap-3 text-red-600 hover:bg-red-50"
                        onClick={() => signOut({ callbackUrl: '/' })}
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Logout</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hidden lg:flex gap-1 font-semibold hover:bg-blue-50">
                      <User className="h-5 w-5" />
                      <span>Login</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64">
                    <div className="p-6 text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        To access your profile and orders
                      </p>
                      <Link href="/login">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 mb-3">
                          Login
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="py-2">
                      <DropdownMenuItem asChild>
                        <Link href="/orders" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Package className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Heart className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Wishlist</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/gift-cards" className="cursor-pointer px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                          <Gift className="h-5 w-5 text-gray-600" />
                          <span className="font-medium">Gift Cards</span>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
