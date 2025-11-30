export function validateEnvironmentVariables() {
  const requiredVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };

  const missingVars: string[] = [];
  const warnings: string[] = [];

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      missingVars.push(key);
    }
  }

  if (requiredVars.NEXTAUTH_SECRET === 'your-secret-key-change-this-in-production') {
    warnings.push('NEXTAUTH_SECRET is using the default placeholder value. Please generate a secure secret.');
  }

  if (missingVars.length > 0) {
    console.error('[Environment Check] Missing required environment variables:');
    missingVars.forEach(varName => console.error(`  - ${varName}`));
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  if (warnings.length > 0) {
    console.warn('[Environment Check] Warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }

  console.log('[Environment Check] All required environment variables are set');
  return true;
}

export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV,
    nextAuthUrl: process.env.NEXTAUTH_URL,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}
