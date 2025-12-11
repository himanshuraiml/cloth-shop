import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }

  const { data: userData } = await supabase
    .from('users')
    .select('id, email, full_name, role')
    .eq('id', user.id)
    .maybeSingle();

  return NextResponse.json({
    authenticated: true,
    user: userData ? {
      id: userData.id,
      email: userData.email,
      name: userData.full_name,
      role: userData.role,
    } : null,
  });
}
