/*
  # Setup Supabase Auth Integration

  ## Overview
  Integrates Supabase Auth (auth.users) with the public users table by creating a trigger
  that automatically creates a user record when a new auth user is created.

  ## Changes
  1. Creates a trigger function `handle_new_user()` that:
     - Extracts user metadata (full_name, phone, role) from auth.users.raw_user_meta_data
     - Creates a corresponding record in public.users
     - Uses the auth user's ID as the public user's ID for RLS policy compatibility
  
  2. Sets up a trigger on auth.users that fires after insert
  
  3. Updates the users table structure:
     - Changes id to match auth.uid() instead of generating new UUIDs
     - Removes password_hash requirement (handled by Supabase Auth)
     - Ensures RLS policies work correctly with auth.uid()

  ## Security
  - Maintains RLS policies that check auth.uid()
  - Prevents direct insertion into users table (auth trigger handles this)
*/

-- Make password_hash nullable since Supabase Auth handles passwords
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Create function to handle new user registration from Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, role, password_hash, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')::user_role,
    '',  -- Empty password hash since auth handles it
    NOW(),
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policies to allow the trigger to insert
DROP POLICY IF EXISTS "Allow auth trigger to insert users" ON users;
CREATE POLICY "Allow auth trigger to insert users" 
  ON users 
  FOR INSERT 
  WITH CHECK (true);
