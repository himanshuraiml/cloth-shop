# 🚀 Quick Start Guide

## Step 1: Create Admin Account

### Visit Setup Page
```
http://localhost:3000/setup
```

Click "Create Admin User" with default credentials:
- Email: `admin@tribaah.com`
- Password: `Admin@123`

---

## Step 2: Login

### Visit Login Page
```
http://localhost:3000/login
```

Enter the credentials you just created.

---

## Step 3: Access Different Dashboards

### Admin Panel
After login as admin, you'll be at:
```
http://localhost:3000/admin
```

### Seller Dashboard
For seller accounts:
```
http://localhost:3000/seller
```

### Customer Shop
For customers:
```
http://localhost:3000/shop
```

### Customer Profile
```
http://localhost:3000/profile
```

### Customer Orders
```
http://localhost:3000/orders
```

---

## User Roles & Access

| Role | Access Pages | Redirect After Login |
|------|--------------|---------------------|
| **Admin** | `/admin/*` | `/admin` |
| **Seller** | `/seller/*` | `/seller` |
| **Customer** | `/shop`, `/profile`, `/orders`, `/cart`, `/checkout` | `/shop` |

---

## Protected Routes

The following routes require authentication:
- `/admin/*` - Admin only
- `/seller/*` - Seller only
- `/profile/*` - Any authenticated user
- `/checkout/*` - Any authenticated user
- `/orders/*` - Any authenticated user

If not authenticated, you'll be redirected to `/login` with a callback URL.

---

## Quick Commands

### Create Admin (using script)
```bash
node scripts/create-admin.js
```
Then copy the SQL output to Supabase SQL Editor.

### Build Project
```bash
npm run build
```

### Start Dev Server
```bash
npm run devn
```

---

## Testing Flow

1. ✅ Visit `/setup` and create admin
2. ✅ Login at `/login` with admin credentials
3. ✅ Verify redirect to `/shop` (default for all users)
4. ✅ Manually navigate to `/admin` (only works for admin role)
5. ✅ Try `/seller` (should show unauthorized for admin)
6. ✅ Visit `/profile` to edit profile
7. ✅ Visit `/orders` to see order history
8. ✅ Logout and try accessing protected pages

---

## Troubleshooting

### 404 Error After Login
✅ **Fixed!** The login now redirects to `/shop` by default.

### Cannot Access Admin Panel
- Verify user role in database: `SELECT email, role FROM users;`
- Admin role must be exactly `'admin'`
- Navigate directly to: `http://localhost:3000/admin`

### Unauthorized Page
- Check you're logged in with the correct role
- Admin users → `/admin`
- Seller users → `/seller`
- Customers → `/shop`, `/profile`, `/orders`

---

## Database Check

### Verify User Exists
```sql
SELECT id, email, full_name, role, created_at
FROM users
WHERE email = 'admin@tribaah.com';
```

### Check All Users
```sql
SELECT email, role, created_at FROM users;
```

### Update User Role
```sql
UPDATE users
SET role = 'admin'
WHERE email = 'your@email.com';
```

---

## Next Steps

1. ✅ Create admin account via `/setup`
2. ✅ Login and verify access
3. ✅ Create some test products (in admin panel)
4. ✅ Create seller account (via SQL or register page with role='seller')
5. ✅ Create customer account (via `/register`)
6. ✅ Test the complete shopping flow

---

## Support

For detailed setup instructions, see: **ADMIN-SETUP.md**

For database schema, see: **database-schema.sql**
