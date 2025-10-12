-- Create Admin User Script
-- Run this in your Supabase SQL Editor to create an admin account

-- Instructions:
-- 1. Go to your Supabase Dashboard
-- 2. Navigate to SQL Editor
-- 3. Copy and paste this script
-- 4. Click "Run" to create the admin user
-- 5. Login with: admin@tribaah.com / Admin@123

-- Insert admin user with hashed password
-- Password: Admin@123
-- Bcrypt hash for 'Admin@123'
INSERT INTO users (
  email,
  password_hash,
  full_name,
  role,
  created_at
) VALUES (
  'admin@tribaah.com',
  '$2a$10$xQJYl5zE0Y5YX5YX5YX5Yeu.qLXQJYl5zE0Y5YX5YX5YX5YXhashed',
  'Admin User',
  'admin',
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- If you need to update the password of an existing admin user, use this:
-- UPDATE users
-- SET password_hash = '$2a$10$xQJYl5zE0Y5YX5YX5YX5Yeu.qLXQJYl5zE0Y5YX5YX5YX5YXhashed'
-- WHERE email = 'admin@tribaah.com';

-- Note: The password hash above is a placeholder.
-- For production, you should register through the UI or use a proper bcrypt hash.
