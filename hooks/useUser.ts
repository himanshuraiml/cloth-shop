import { useSession } from 'next-auth/react';

export function useUser() {
  const { data: session, status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = session?.user;
  const role = session?.user?.role;

  const isAdmin = role === 'admin';
  const isSeller = role === 'seller';
  const isCustomer = role === 'customer';

  const canAccessAdmin = isAdmin;
  const canAccessSeller = isSeller;
  const canAccessCustomer = isAuthenticated;

  return {
    user,
    role,
    isAuthenticated,
    isLoading,
    isAdmin,
    isSeller,
    isCustomer,
    canAccessAdmin,
    canAccessSeller,
    canAccessCustomer
  };
}
