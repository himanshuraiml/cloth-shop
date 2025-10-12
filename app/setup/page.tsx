'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Loader2, UserCog } from 'lucide-react';
import { toast } from 'sonner';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@tribaah.com',
    password: 'Admin@123',
    fullName: 'Admin User',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch('/api/setup/create-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        toast.success('Admin user created successfully!');
      } else {
        toast.error(data.error || 'Failed to create admin user');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mb-4">
            <UserCog className="h-6 w-6 text-coral-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Setup Admin Account</CardTitle>
          <CardDescription>
            Create your first admin user to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Created!</h3>
                <p className="text-gray-600 mb-4">You can now login with your admin credentials</p>
                <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-mono text-sm font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Password:</span>
                    <p className="font-mono text-sm font-medium">{formData.password}</p>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full bg-coral-500 hover:bg-coral-600">
                <a href="/login">Go to Login</a>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Alert>
                <AlertDescription>
                  This will create an admin account. Keep these credentials safe!
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                  minLength={6}
                />
                <p className="text-xs text-gray-500">Minimum 6 characters</p>
              </div>

              <Button
                type="submit"
                className="w-full bg-coral-500 hover:bg-coral-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Admin...
                  </>
                ) : (
                  'Create Admin User'
                )}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-coral-600 hover:underline font-medium">
                  Sign in
                </a>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
