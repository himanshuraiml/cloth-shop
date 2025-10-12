"use client";

import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

export function CartIcon() {
  const { getCartCount } = useCart();
  const itemCount = getCartCount();

  return (
    <Link href="/cart">
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </Button>
    </Link>
  );
}
