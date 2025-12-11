'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface UserData {
  id: string;
  email: string;
  full_name: string;
  role: string;
  phone?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        setUser(authUser);

        if (authUser) {
          const { data: profile } = await supabase
            .from('users')
            .select('id, email, full_name, role, phone')
            .eq('id', authUser.id)
            .maybeSingle();

          setUserData(profile);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: profile } = await supabase
            .from('users')
            .select('id, email, full_name, role, phone')
            .eq('id', session.user.id)
            .maybeSingle();

          setUserData(profile);
        } else {
          setUserData(null);
        }

        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;
  const role = userData?.role || 'customer';
  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const isCustomer = role === 'customer';

  return {
    user: user ? {
      id: user.id,
      email: user.email || userData?.email || '',
      name: userData?.full_name || user.user_metadata?.full_name || '',
      role: role,
      phone: userData?.phone || ''
    } : null,
    role,
    isAuthenticated,
    isLoading,
    isAdmin,
    isSeller,
    isCustomer,
    canAccessAdmin: isAdmin,
    canAccessSeller: isSeller || isAdmin,
    canAccessCustomer: isAuthenticated
  };
}
