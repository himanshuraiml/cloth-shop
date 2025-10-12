# Test Users Guide

## How to Create Test Users

Since authentication is now working, you need to create test users in your database. Here are three methods:

### Method 1: Using the Registration Page (Recommended for Customers/Sellers)

1. Navigate to `/register` page
2. Fill in the form:
   - **Email**: your-email@example.com
   - **Password**: yourpassword123
   - **Full Name**: Your Name
   - **Role**: Select `customer` or `seller`
   - **Phone** (optional): +91 1234567890
3. Click "Create Account"
4. You can now login with these credentials

### Method 2: Create Admin User via API (For Admin Access)

Use the setup API endpoint to create an admin user:

```bash
curl -X POST http://localhost:3000/api/setup/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tribaah.com",
    "password": "admin123456",
    "fullName": "Admin User"
  }'
```

Or use Postman/Thunder Client with:
- **URL**: `http://localhost:3000/api/setup/create-admin`
- **Method**: POST
- **Body** (JSON):
```json
{
  "email": "admin@tribaah.com",
  "password": "admin123456",
  "fullName": "Admin User"
}
```

### Method 3: Direct Database Insert (Advanced)

If you have direct access to Supabase, run this SQL:

```sql
-- For Customer
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'customer@test.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lE3cGQS7a8W6', -- password: test123456
  'Test Customer',
  'customer'
);

-- For Seller
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'seller@test.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lE3cGQS7a8W6', -- password: test123456
  'Test Seller',
  'seller'
);

-- For Admin
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'admin@test.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5lE3cGQS7a8W6', -- password: test123456
  'Test Admin',
  'admin'
);
```

## Test Login Credentials

After creating users, you can login with:

### Customer Account
- **Email**: customer@test.com
- **Password**: test123456
- **Redirects to**: `/shop`

### Seller Account
- **Email**: seller@test.com
- **Password**: test123456
- **Redirects to**: `/seller` (Seller Dashboard)

### Admin Account
- **Email**: admin@test.com
- **Password**: test123456
- **Redirects to**: `/admin` (Admin Dashboard)

## Login Flow

1. Navigate to `/login`
2. Enter email and password
3. Click "Sign in"
4. You'll be automatically redirected based on your role:
   - **Admin** → `/admin`
   - **Seller** → `/seller`
   - **Customer** → `/shop`

## Troubleshooting

### "Invalid email or password" error
- Check that the user exists in the database
- Verify the password is correct
- Ensure the `users` table has the user record

### Login button doesn't work
- Check browser console for errors
- Verify NextAuth API route exists at `/api/auth/[...nextauth]`
- Ensure environment variables are set in `.env`

### Session not persisting
- Check that `NEXTAUTH_SECRET` is set in `.env`
- Clear browser cookies and try again
- Check browser console for cookie errors

### Role-based redirect not working
- Verify the user's `role` field in database
- Check middleware configuration
- Ensure the role is one of: `admin`, `seller`, `customer`

## Environment Variables Required

Make sure these are set in your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

## Quick Setup Script

Run this in your terminal to create all test users via API:

```bash
# Create Admin
curl -X POST http://localhost:3000/api/setup/create-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"test123456","fullName":"Test Admin"}'

# Create Seller (via registration)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"seller@test.com","password":"test123456","full_name":"Test Seller","role":"seller"}'

# Create Customer (via registration)
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"test123456","full_name":"Test Customer","role":"customer"}'
```

## Next Steps

1. Create test users using any method above
2. Login at `/login`
3. Explore the platform based on your role
4. For production, change all test passwords and NEXTAUTH_SECRET
