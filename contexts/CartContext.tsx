"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  size?: string;
  color?: string;
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

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (productId: string, quantity: number, size?: string, color?: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      loadCartFromDB();
    } else {
      loadCartFromLocalStorage();
    }
  }, [session]);

  const loadCartFromDB = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart')
        .select(`
          id,
          product_id,
          quantity,
          size,
          color,
          products!cart_product_id_fkey (
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

      setCart(formattedData as CartItem[]);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromLocalStorage = () => {
    try {
      setLoading(true);
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToLocalStorage = (cartData: CartItem[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartData));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  };

  const addToCart = async (productId: string, quantity: number, size?: string, color?: string) => {
    if (session?.user?.id) {
      try {
        const existingItem = cart.find(
          item => item.product_id === productId && item.size === size && item.color === color
        );

        if (existingItem) {
          await updateQuantity(existingItem.id, existingItem.quantity + quantity);
        } else {
          const { data: product } = await supabase
            .from('products')
            .select('id, name, slug, price, discount_price, images, stock_quantity')
            .eq('id', productId)
            .single();

          const { data, error } = await supabase
            .from('cart')
            .insert({
              user_id: session.user.id,
              product_id: productId,
              quantity,
              size,
              color
            })
            .select(`
              id,
              product_id,
              quantity,
              size,
              color
            `)
            .single();

          if (error) throw error;

          if (data && product) {
            setCart([...cart, { ...data, product }]);
          }
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    } else {
      try {
        const { data: product } = await supabase
          .from('products')
          .select('id, name, slug, price, discount_price, images, stock_quantity')
          .eq('id', productId)
          .single();

        if (!product) throw new Error('Product not found');

        const existingItem = cart.find(
          item => item.product_id === productId && item.size === size && item.color === color
        );

        let newCart: CartItem[];
        if (existingItem) {
          newCart = cart.map(item =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: `local-${Date.now()}-${Math.random()}`,
            product_id: productId,
            quantity,
            size,
            color,
            product
          };
          newCart = [...cart, newItem];
        }

        setCart(newCart);
        saveCartToLocalStorage(newCart);
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
      }
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(cartItemId);
      return;
    }

    if (session?.user?.id) {
      try {
        const { error } = await supabase
          .from('cart')
          .update({ quantity })
          .eq('id', cartItemId);

        if (error) throw error;

        setCart(cart.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        ));
      } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
      }
    } else {
      const newCart = cart.map(item =>
        item.id === cartItemId ? { ...item, quantity } : item
      );
      setCart(newCart);
      saveCartToLocalStorage(newCart);
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    if (session?.user?.id) {
      try {
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('id', cartItemId);

        if (error) throw error;

        setCart(cart.filter(item => item.id !== cartItemId));
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
      }
    } else {
      const newCart = cart.filter(item => item.id !== cartItemId);
      setCart(newCart);
      saveCartToLocalStorage(newCart);
    }
  };

  const clearCart = async () => {
    if (session?.user?.id) {
      try {
        const { error } = await supabase
          .from('cart')
          .delete()
          .eq('user_id', session.user.id);

        if (error) throw error;

        setCart([]);
      } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
      }
    } else {
      setCart([]);
      localStorage.removeItem('cart');
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = item.product.discount_price || item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
