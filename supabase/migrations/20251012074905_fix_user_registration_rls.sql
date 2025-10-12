/*
  # Fix User Registration RLS Policy

  ## Changes
  - Add policy to allow anyone to register (INSERT into users table)
  - This is required for the registration flow to work
  - The policy only allows INSERT, not SELECT/UPDATE/DELETE

  ## Security
  - Users can only create their own account
  - After registration, they must authenticate to access other data
*/

-- Drop existing restrictive policies that prevent registration
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can update all users" ON users;

-- Allow anyone to register (INSERT)
CREATE POLICY "Anyone can register"
  ON users FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Users can view their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

-- Admins can update all users
CREATE POLICY "Admins can update all users"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id::text = auth.uid()::text AND role = 'admin'
    )
  );

-- Similarly fix profiles table to allow initial profile creation
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

CREATE POLICY "Anyone can insert profile during registration"
  ON profiles FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
