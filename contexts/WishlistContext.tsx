"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';

export interface WishlistItem {
  id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    discount_price?: number;
    images: string[];
    stock_quantity: number;
  };
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  loading: boolean;
  addToWishlist: (productId: string) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
  getWishlistCount: () => number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      loadWishlistFromDB();
    } else {
      loadWishlistFromLocalStorage();
    }
  }, [session]);

  const loadWishlistFromDB = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('wishlist')
        .select(`
          id,
          product_id,
          products!wishlist_product_id_fkey (
            id,
            name,
            slug,
            price,
            discount_price,
            images,
            stock_quantity
          )
        `)
        .eq('user_id', session?.user?.id);

      if (error) throw error;

      const formattedData = data?.map(item => ({
        ...item,
        product: Array.isArray(item.products) ? item.products[0] : item.products
      })) || [];

      setWishlist(formattedData as WishlistItem[]);
    } catch (error) {
      console.error('Error loading wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlistFromLocalStorage = () => {
    try {
      setLoading(true);
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWishlistToLocalStorage = (wishlistData: WishlistItem[]) => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(wishlistData));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  };

  const addToWishlist = async (productId: string) => {
    if (session?.user?.id) {
      try {
        const existingItem = wishlist.find(item => item.product_id === productId);
        if (existingItem) return;

        const { data: product } = await supabase
          .from('products')
          .select('id, name, slug, price, discount_price, images, stock_quantity')
          .eq('id', productId)
          .single();

        const { data, error } = await supabase
          .from('wishlist')
          .insert({
            user_id: session.user.id,
            product_id: productId
          })
          .select('id, product_id')
          .single();

        if (error) throw error;

        if (data && product) {
          setWishlist([...wishlist, { ...data, product }]);
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
      }
    } else {
      try {
        const existingItem = wishlist.find(item => item.product_id === productId);
        if (existingItem) return;

        const { data: product } = await supabase
          .from('products')
          .select('id, name, slug, price, discount_price, images, stock_quantity')
          .eq('id', productId)
          .single();

        if (!product) throw new Error('Product not found');

        const newItem: WishlistItem = {
          id: `local-${Date.now()}-${Math.random()}`,
          product_id: productId,
          product
        };

        const newWishlist = [...wishlist, newItem];
        setWishlist(newWishlist);
        saveWishlistToLocalStorage(newWishlist);
      } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
      }
    }
  };

  const removeFromWishlist = async (productId: string) => {
    if (session?.user?.id) {
      try {
        const { error } = await supabase
          .from('wishlist')
          .delete()
          .eq('user_id', session.user.id)
          .eq('product_id', productId);

        if (error) throw error;

        setWishlist(wishlist.filter(item => item.product_id !== productId));
      } catch (error) {
        console.error('Error removing from wishlist:', error);
        throw error;
      }
    } else {
      const newWishlist = wishlist.filter(item => item.product_id !== productId);
      setWishlist(newWishlist);
      saveWishlistToLocalStorage(newWishlist);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.product_id === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getWishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
