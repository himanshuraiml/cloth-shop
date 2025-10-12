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
  Phone,
  Mail,
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
import { CategoryDropdown } from './CategoryDropdown';
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
        <div className="hidden lg:block bg-gray-100 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-10 text-sm">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+91 1234567890</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>support@tribaah.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/track-order" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Track Order
                </Link>
                {session?.user ? (
                  <span className="text-gray-600 font-medium">
                    Hi, {session.user.name ? session.user.name.split(' ')[0] : 'User'}
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Login
                    </Link>
                    <span className="text-gray-400">/</span>
                    <Link href="/register" className="text-gray-600 hover:text-gray-900 transition-colors">
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <CategoryDropdown />
                  </NavigationMenuContent>
                </NavigationMenuItem>

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
                  <NavigationMenuTrigger>Men</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4">
                      <div className="space-y-2">
                        <Link href="/shop?category=mens-shirts" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Shirts
                        </Link>
                        <Link href="/shop?category=mens-tshirts" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          T-Shirts
                        </Link>
                        <Link href="/shop?category=mens-jeans" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Jeans
                        </Link>
                        <Link href="/shop?category=mens-shoes" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Shoes
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Women</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4">
                      <div className="space-y-2">
                        <Link href="/shop?category=womens-dresses" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Dresses
                        </Link>
                        <Link href="/shop?category=womens-tops" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Tops
                        </Link>
                        <Link href="/shop?category=womens-jeans" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Jeans
                        </Link>
                        <Link href="/shop?category=womens-shoes" className="block px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                          Shoes
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/shop?filter=sale" legacyBehavior passHref>
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 text-red-600 hover:text-red-700 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50">
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
