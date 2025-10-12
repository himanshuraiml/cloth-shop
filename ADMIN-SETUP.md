# Admin Panel Setup Guide

## Quick Start - Create Admin User

### Option 1: Using the Setup Page (Easiest)

1. **Visit the setup page:**
   ```
   http://localhost:3000/setup
   ```

2. **Fill in the admin details:**
   - Full Name: `Admin User`
   - Email: `admin@tribaah.com`
   - Password: `Admin@123` (or your preferred password)

3. **Click "Create Admin User"**

4. **Login with your credentials:**
   - Go to: `http://localhost:3000/login`
   - Use the email and password you just created

---

### Option 2: Using Supabase SQL Editor

1. **Go to your Supabase Dashboard**
   - Navigate to: SQL Editor

2. **Copy and paste this SQL:**

```sql
INSERT INTO users (email, password_hash, full_name, role, created_at)
VALUES (
  'admin@tribaah.com',
  '$2b$10$Xr9jjKqIpZ9XJKf/hJryY.VOod3w21FC8tVUtSxv3048iYhiKgEoK',
  'Admin User',
  'admin',
  NOW()
) ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash;
```

3. **Click "Run"**

4. **Login Credentials:**
   - Email: `admin@tribaah.com`
   - Password: `Admin@123`

---

### Option 3: Using API Endpoint

**POST Request to:**
```
http://localhost:3000/api/setup/create-admin
```

**Body:**
```json
{
  "email": "admin@tribaah.com",
  "password": "Admin@123",
  "fullName": "Admin User"
}
```

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/setup/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tribaah.com",
    "password": "Admin@123",
    "fullName": "Admin User"
  }'
```

---

## Accessing the Admin Panel

1. **Login:** Go to `http://localhost:3000/login`
2. **Enter credentials:**
   - Email: `admin@tribaah.com`
   - Password: `Admin@123`
3. **You'll be redirected to:** `http://localhost:3000/admin`

---

## User Roles

The system supports three roles:

1. **admin** - Full access to admin panel
   - Access: `/admin/*`
   - Can manage everything

2. **seller** - Access to seller dashboard
   - Access: `/seller/*`
   - Can manage their products and orders

3. **customer** - Regular customer access
   - Access: `/shop`, `/profile`, `/orders`, `/cart`, `/checkout`
   - Can browse and purchase products

---

## Creating Additional Users

### Create a Seller:
```sql
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
  'seller@tribaah.com',
  '$2b$10$Xr9jjKqIpZ9XJKf/hJryY.VOod3w21FC8tVUtSxv3048iYhiKgEoK',
  'Seller User',
  'seller'
);
```
Password: `Admin@123`

### Create a Customer:
Use the registration page: `http://localhost:3000/register`

---

## Troubleshooting

### "404 Error after login"
- Make sure you're logging in with the correct role
- Admin users go to `/admin`
- Seller users go to `/seller`
- Customer users go to `/shop`

### "Unauthorized" message
- Check that your user has the correct role in the database
- Verify the user exists: `SELECT * FROM users WHERE email = 'your@email.com';`

### "Invalid credentials"
- Double-check the email and password
- Make sure the password hash is correct in the database

---

## Default Credentials

**Admin:**
- Email: `admin@tribaah.com`
- Password: `Admin@123`

**Note:** Change the default password after first login for security!
