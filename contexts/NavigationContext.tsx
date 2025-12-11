"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { supabase } from '@/lib/supabase';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  parent_id?: string;
}

interface NavigationContextType {
  categories: Category[];
  loadingCategories: boolean;
  notificationCount: number;
  refreshCategories: () => Promise<void>;
  refreshNotificationCount: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, role } = useUser();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      loadNotificationCount();
      const interval = setInterval(loadNotificationCount, 60000);
      return () => clearInterval(interval);
    } else {
      setNotificationCount(0);
    }
  }, [isAuthenticated, user?.id, role]);

  const loadCategories = async () => {
    try {
      const cachedCategories = localStorage.getItem('categories');
      const cacheTimestamp = localStorage.getItem('categories_timestamp');
      const now = Date.now();
      const cacheExpiry = 1000 * 60 * 60;

      if (cachedCategories && cacheTimestamp && now - parseInt(cacheTimestamp) < cacheExpiry) {
        setCategories(JSON.parse(cachedCategories));
        setLoadingCategories(false);
        return;
      }

      setLoadingCategories(true);
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug, description, image_url, parent_id')
        .order('name');

      if (error) throw error;

      setCategories(data || []);
      localStorage.setItem('categories', JSON.stringify(data || []));
      localStorage.setItem('categories_timestamp', now.toString());
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadNotificationCount = async () => {
    if (!user?.id) return;

    try {
      let count = 0;

      if (role === 'admin') {
        const { count: adminCount, error } = await supabase
          .from('admin_notifications')
          .select('*', { count: 'exact', head: true })
          .eq('is_read', false);

        if (!error) count = adminCount || 0;
      } else if (role === 'seller') {
        const { count: sellerCount, error } = await supabase
          .from('seller_notifications')
          .select('*', { count: 'exact', head: true })
          .eq('seller_id', user.id)
          .eq('is_read', false);

        if (!error) count = sellerCount || 0;
      }

      setNotificationCount(count);
    } catch (error) {
      console.error('Error loading notification count:', error);
    }
  };

  const refreshCategories = async () => {
    localStorage.removeItem('categories');
    localStorage.removeItem('categories_timestamp');
    await loadCategories();
  };

  const refreshNotificationCount = async () => {
    await loadNotificationCount();
  };

  return (
    <NavigationContext.Provider
      value={{
        categories,
        loadingCategories,
        notificationCount,
        refreshCategories,
        refreshNotificationCount
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
