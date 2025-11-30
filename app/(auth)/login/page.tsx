'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const callbackUrl = searchParams.get('callbackUrl');

      console.log('[Login] Attempting sign in for:', formData.email);

      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      console.log('[Login] Sign in result:', result);

      if (result?.error) {
        console.error('[Login] Sign in error:', result.error);
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        console.log('[Login] Sign in successful, fetching session...');

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
          const sessionRes = await fetch('/api/auth/session');

          if (!sessionRes.ok) {
            console.error('[Login] Failed to fetch session:', sessionRes.status);
            setError('Failed to establish session. Please try again.');
            setIsLoading(false);
            return;
          }

          const session = await sessionRes.json();
          console.log('[Login] Session fetched:', session);

          if (!session?.user) {
            console.error('[Login] No user in session');
            setError('Session creation failed. Please try again.');
            setIsLoading(false);
            return;
          }

          const redirectPath = callbackUrl || getRoleRedirectPath(session.user.role);
          console.log('[Login] Redirecting to:', redirectPath);

          window.location.href = redirectPath;
        } catch (fetchError) {
          console.error('[Login] Error fetching session:', fetchError);
          setError('Failed to verify session. Please try again.');
          setIsLoading(false);
        }
      }
    } catch (err: any) {
      console.error('[Login] Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const getRoleRedirectPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'seller':
        return '/seller';
      case 'customer':
      default:
        return '/shop';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Create account
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
