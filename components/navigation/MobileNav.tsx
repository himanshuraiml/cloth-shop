"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/useUser';
import { createClient } from '@/lib/supabase/client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Menu,
  Home,
  Store,
  Sparkles,
  TrendingUp,
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronDown,
  Package
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function MobileNav() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const { getCartCount } = useCart();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .is('parent_id', null);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-1">
          {isAuthenticated && user ? (
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Welcome back,</p>
              <p className="font-semibold text-gray-900">{user.name}</p>
            </div>
          ) : (
            <div className="mb-4 space-y-2">
              <Link href="/login" onClick={handleLinkClick}>
                <Button className="w-full">Login</Button>
              </Link>
              <Link href="/register" onClick={handleLinkClick}>
                <Button variant="outline" className="w-full">Register</Button>
              </Link>
            </div>
          )}

          <Separator className="my-4" />

          <Link href="/" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-3 h-5 w-5" />
              Home
            </Button>
          </Link>

          <Collapsible open={categoriesOpen} onOpenChange={setCategoriesOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Store className="mr-3 h-5 w-5" />
                  Shop by Category
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="ml-8 mt-1 space-y-1">
              <Link href="/shop" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  All Products
                </Button>
              </Link>
              {categories.map((category) => (
                <Link key={category.id} href={`/shop?category=${category.slug}`} onClick={handleLinkClick}>
                  <Button variant="ghost" className="w-full justify-start text-sm">
                    {category.name}
                  </Button>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Link href="/shop?filter=new" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start">
              <Sparkles className="mr-3 h-5 w-5" />
              New Arrivals
            </Button>
          </Link>

          <Link href="/shop?filter=bestsellers" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start">
              <TrendingUp className="mr-3 h-5 w-5" />
              Best Sellers
            </Button>
          </Link>

          <Link href="/shop?filter=sale" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start text-red-600">
              <TrendingUp className="mr-3 h-5 w-5" />
              Sale
            </Button>
          </Link>

          <Separator className="my-4" />

          <Link href="/cart" onClick={handleLinkClick}>
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingBag className="mr-3 h-5 w-5" />
              <span className="flex-1 text-left">Cart</span>
              {getCartCount() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {getCartCount()}
                </span>
              )}
            </Button>
          </Link>

          {isAuthenticated && (
            <>
              <Separator className="my-4" />

              <Link href="/account" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-3 h-5 w-5" />
                  My Account
                </Button>
              </Link>

              <Link href="/orders" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  <Package className="mr-3 h-5 w-5" />
                  My Orders
                </Button>
              </Link>

              <Link href="/wishlist" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="mr-3 h-5 w-5" />
                  Wishlist
                </Button>
              </Link>

              <Link href="/addresses" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  <MapPin className="mr-3 h-5 w-5" />
                  Address Book
                </Button>
              </Link>

              <Link href="/settings" onClick={handleLinkClick}>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-3 h-5 w-5" />
                  Settings
                </Button>
              </Link>

              <Separator className="my-4" />

              <Button
                variant="ghost"
                className="w-full justify-start text-red-600"
                onClick={handleSignOut}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
