'use client';

import { CartProvider } from '@/contexts/CartContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { NavigationProvider } from '@/contexts/NavigationContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NavigationProvider>
      <CartProvider>
        <WishlistProvider>
          {children}
        </WishlistProvider>
      </CartProvider>
    </NavigationProvider>
  );
}
