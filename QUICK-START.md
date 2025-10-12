# Quick Start Guide - Login Instructions

## ✅ Authentication is NOW Working!

The login issue has been fixed. You can now login with existing user accounts.

---

## 🔑 Existing User Accounts

Your database already has 5 users. Here are the accounts:

### Admin Account
- **Email**: `admin@tribaah.com`
- **Password**: Use the password you set when creating this admin
- **Dashboard**: `/admin`

### Seller Accounts
1. **Email**: `himanshurairai560@gmail.com`
   - **Role**: Seller
   - **Dashboard**: `/seller`

2. **Email**: `seller@test.com`
   - **Role**: Seller
   - **Password**: `test123456` (if created with test script)
   - **Dashboard**: `/seller`

### Customer Accounts
1. **Email**: `jyotiverma1492@gmail.com`
   - **Role**: Customer
   - **Redirects to**: `/shop`

2. **Email**: `rechardsonrone@gmail.com`
   - **Role**: Customer
   - **Redirects to**: `/shop`

---

## 🚀 How to Login

1. **Navigate to**: `http://localhost:3000/login`

2. **Enter your credentials**:
   - Email address
   - Password

3. **Click "Sign in"**

4. **You'll be automatically redirected** based on your role:
   - **Admin** → `/admin` (Admin Dashboard)
   - **Seller** → `/seller` (Seller Dashboard)
   - **Customer** → `/shop` (Shop Page)

---

## 🔧 What Was Fixed

### Issues Resolved:
1. ✅ **Missing NextAuth API Route** - Created `/api/auth/[...nextauth]/route.ts`
2. ✅ **Auth Configuration** - Added debug logging and better error handling
3. ✅ **Database Schema** - Fixed `categories.image` → `categories.image_url`
4. ✅ **Error Redirect** - Errors now redirect to `/login` instead of error page
5. ✅ **Role-based Redirect** - Automatic redirect after successful login

---

## 🎯 Testing Login

### Test with Admin Account:
```
Go to: http://localhost:3000/login

Email: admin@tribaah.com
Password: [your admin password]

Should redirect to: /admin
```

### Test with Seller Account:
```
Go to: http://localhost:3000/login

Email: seller@test.com
Password: test123456

Should redirect to: /seller
```

---

## 🆕 Create New Test Accounts

If you need to create more test accounts:

### Use Registration Page
1. Go to `/register`
2. Fill in the form
3. Select role (customer, seller)
4. Create account

---

## 🔍 Troubleshooting

### "Invalid email or password"
- Verify the email exists in database
- Check password is correct
- Try creating new test account

### Login button does nothing
- Open browser console (F12) for errors
- Verify NextAuth route exists
- Check .env variables
- Restart dev server

### Redirects to error page
- Now fixed! Errors redirect to /login
- Check server console logs
- Verify database connection

---

## 📞 Server Logs

When you attempt login, check your terminal for logs like:
```
[Auth] Attempting login for: user@example.com
[Auth] User found, verifying password...
[Auth] Login successful: user@example.com Role: customer
```

If login fails, you'll see:
```
[Auth] User not found: user@example.com
```
or
```
[Auth] Invalid password for: user@example.com
```

---

**Authentication is fully functional! You can now login and test all features.** 🚀
