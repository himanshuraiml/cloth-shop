import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('[Auth] Missing credentials');
            return null;
          }

          console.log('[Auth] Attempting login for:', credentials.email);

          // Use Supabase Auth to verify credentials
          const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (authError || !authData.user) {
            console.error('[Auth] Authentication failed:', authError?.message);
            return null;
          }

          console.log('[Auth] Auth successful, fetching user data...');

          // Fetch user data from public.users table
          const { data: user, error: userError } = await supabase
            .from('users')
            .select('id, email, role, full_name')
            .eq('id', authData.user.id)
            .maybeSingle();

          if (userError || !user) {
            console.error('[Auth] Failed to fetch user data:', userError);
            return null;
          }

          console.log('[Auth] Login successful:', user.email, 'Role:', user.role);

          // Sign out from Supabase since we're using NextAuth for session management
          await supabase.auth.signOut();

          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
            role: user.role,
          };
        } catch (error) {
          console.error('[Auth] Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        console.log('[JWT Callback] Token created with role:', user.role);
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        console.log('[Session Callback] Session created for:', session.user.email, 'with role:', session.user.role);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('[Redirect Callback] URL:', url, 'BaseURL:', baseUrl);

      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }

      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
