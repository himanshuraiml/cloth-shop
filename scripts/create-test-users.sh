#!/bin/bash

# Script to create test users for Tribaah E-commerce Platform
# Usage: ./scripts/create-test-users.sh

BASE_URL="${1:-http://localhost:3000}"

echo "Creating test users on $BASE_URL..."
echo ""

# Create Admin User
echo "Creating Admin user..."
ADMIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/setup/create-admin" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@tribaah.com",
    "password": "admin123456",
    "fullName": "Admin User"
  }')

if echo "$ADMIN_RESPONSE" | grep -q "success"; then
  echo "✓ Admin created successfully"
  echo "  Email: admin@tribaah.com"
  echo "  Password: admin123456"
else
  echo "✗ Admin creation failed or already exists"
  echo "  Response: $ADMIN_RESPONSE"
fi
echo ""

# Create Seller User
echo "Creating Seller user..."
SELLER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@tribaah.com",
    "password": "seller123456",
    "full_name": "Test Seller",
    "role": "seller",
    "phone": "+91 9876543210"
  }')

if echo "$SELLER_RESPONSE" | grep -q "registered successfully"; then
  echo "✓ Seller created successfully"
  echo "  Email: seller@tribaah.com"
  echo "  Password: seller123456"
else
  echo "✗ Seller creation failed or already exists"
  echo "  Response: $SELLER_RESPONSE"
fi
echo ""

# Create Customer User
echo "Creating Customer user..."
CUSTOMER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@tribaah.com",
    "password": "customer123456",
    "full_name": "Test Customer",
    "role": "customer",
    "phone": "+91 9876543211"
  }')

if echo "$CUSTOMER_RESPONSE" | grep -q "registered successfully"; then
  echo "✓ Customer created successfully"
  echo "  Email: customer@tribaah.com"
  echo "  Password: customer123456"
else
  echo "✗ Customer creation failed or already exists"
  echo "  Response: $CUSTOMER_RESPONSE"
fi
echo ""

echo "=========================================="
echo "Test Users Summary"
echo "=========================================="
echo ""
echo "Admin Login:"
echo "  URL: $BASE_URL/login"
echo "  Email: admin@tribaah.com"
echo "  Password: admin123456"
echo "  Dashboard: $BASE_URL/admin"
echo ""
echo "Seller Login:"
echo "  URL: $BASE_URL/login"
echo "  Email: seller@tribaah.com"
echo "  Password: seller123456"
echo "  Dashboard: $BASE_URL/seller"
echo ""
echo "Customer Login:"
echo "  URL: $BASE_URL/login"
echo "  Email: customer@tribaah.com"
echo "  Password: customer123456"
echo "  Shop: $BASE_URL/shop"
echo ""
echo "=========================================="
