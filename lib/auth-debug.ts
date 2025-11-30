import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function debugSession() {
  const session = await getServerSession(authOptions);

  console.log('[Auth Debug] Session:', {
    authenticated: !!session,
    user: session?.user ? {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role,
    } : null,
  });

  return session;
}

export function logAuthAttempt(email: string, success: boolean, role?: string) {
  console.log('[Auth Debug] Login attempt:', {
    email,
    success,
    role: role || 'N/A',
    timestamp: new Date().toISOString(),
  });
}

export function logRoleCheck(path: string, requiredRole: string, userRole?: string) {
  const hasAccess = userRole === requiredRole;

  console.log('[Auth Debug] Role check:', {
    path,
    requiredRole,
    userRole: userRole || 'none',
    hasAccess,
  });

  return hasAccess;
}

export function getAuthStatus() {
  return {
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    nodeEnv: process.env.NODE_ENV,
  };
}
