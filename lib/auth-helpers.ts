import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth();

  if (!allowedRoles.includes(user.role)) {
    redirect('/unauthorized');
  }

  return user;
}

export async function requireAdmin() {
  return requireRole(['admin']);
}

export async function requireSeller() {
  return requireRole(['seller', 'admin']);
}

export async function requireCustomer() {
  return requireRole(['customer', 'seller', 'admin']);
}

export function getRoleRedirectPath(role: string): string {
  switch (role) {
    case 'admin':
      return '/admin';
    case 'seller':
      return '/seller';
    case 'customer':
    default:
      return '/shop';
  }
}
