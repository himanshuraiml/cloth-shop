import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    console.log('[Middleware] Path:', path, 'Token role:', token?.role);

    if (!token) {
      console.log('[Middleware] No token found for protected route:', path);
      return NextResponse.next();
    }

    if (path.startsWith('/admin')) {
      if (token.role !== 'admin') {
        console.log('[Middleware] Unauthorized admin access attempt by role:', token.role);
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    if (path.startsWith('/seller')) {
      if (token.role !== 'seller') {
        console.log('[Middleware] Unauthorized seller access attempt by role:', token.role);
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    console.log('[Middleware] Access granted for:', path);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (path.startsWith('/admin')) {
          const isAuthorized = token?.role === 'admin';
          console.log('[Middleware Auth] Admin check:', isAuthorized);
          return isAuthorized;
        }

        if (path.startsWith('/seller')) {
          const isAuthorized = token?.role === 'seller';
          console.log('[Middleware Auth] Seller check:', isAuthorized);
          return isAuthorized;
        }

        if (path.startsWith('/profile') || path.startsWith('/checkout') || path.startsWith('/orders')) {
          const isAuthorized = !!token;
          console.log('[Middleware Auth] Protected route check:', isAuthorized);
          return isAuthorized;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/profile/:path*', '/checkout/:path*', '/orders/:path*'],
};
