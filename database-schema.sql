/*
  # E-Commerce Platform Database Schema

  ## Overview
  Complete database schema for a multi-vendor clothing e-commerce platform with role-based access control.

  ## Tables Created

  1. **users** - Core user authentication and role management
     - id (uuid, primary key)
     - email (text, unique)
     - password_hash (text)
     - role (enum: admin, seller, customer)
     - full_name (text)
     - phone (text)
     - created_at (timestamptz)
     - updated_at (timestamptz)

  2. **profiles** - Extended user profile information
     - user_id (uuid, foreign key to users)
     - address (text)
     - city (text)
     - state (text)
     - pincode (text)
     - gstin (text) - GST identification for sellers
     - created_at (timestamptz)
     - updated_at (timestamptz)

  3. **categories** - Product categorization
     - id (uuid, primary key)
     - name (text)
     - slug (text, unique)
     - description (text)
     - image_url (text)
     - parent_id (uuid, nullable) - for subcategories
     - is_active (boolean)
     - created_at (timestamptz)

  4. **products** - Product catalog
     - id (uuid, primary key)
     - seller_id (uuid, foreign key to users)
     - category_id (uuid, foreign key to categories)
     - name (text)
     - slug (text, unique)
     - description (text)
     - price (decimal)
     - discount_price (decimal, nullable)
     - sku (text, unique)
     - stock_quantity (integer)
     - images (text[]) - array of image URLs
     - sizes (text[]) - array of available sizes
     - colors (text[]) - array of available colors
     - brand (text)
     - is_active (boolean)
     - created_at (timestamptz)
     - updated_at (timestamptz)

  5. **orders** - Customer orders
     - id (uuid, primary key)
     - user_id (uuid, foreign key to users)
     - order_number (text, unique)
     - total_amount (decimal)
     - payment_status (enum: pending, completed, failed, refunded)
     - payment_method (enum: razorpay, cod)
     - delivery_status (enum: pending, processing, shipped, delivered, cancelled)
     - shipping_address (jsonb) - full address object
     - razorpay_order_id (text)
     - razorpay_payment_id (text)
     - created_at (timestamptz)
     - updated_at (timestamptz)

  6. **order_items** - Individual items within orders
     - id (uuid, primary key)
     - order_id (uuid, foreign key to orders)
     - product_id (uuid, foreign key to products)
     - seller_id (uuid, foreign key to users)
     - quantity (integer)
     - price (decimal) - price at time of purchase
     - size (text)
     - color (text)
     - created_at (timestamptz)

  7. **cart** - Shopping cart
     - id (uuid, primary key)
     - user_id (uuid, foreign key to users)
     - product_id (uuid, foreign key to products)
     - quantity (integer)
     - size (text)
     - color (text)
     - created_at (timestamptz)
     - updated_at (timestamptz)

  8. **reviews** - Product reviews and ratings
     - id (uuid, primary key)
     - product_id (uuid, foreign key to products)
     - user_id (uuid, foreign key to users)
     - rating (integer, 1-5)
     - comment (text)
     - verified_purchase (boolean)
     - is_approved (boolean)
     - created_at (timestamptz)
     - updated_at (timestamptz)

  9. **shipping_details** - Delivery tracking information
     - id (uuid, primary key)
     - order_id (uuid, foreign key to orders)
     - tracking_id (text)
     - courier_name (text)
     - estimated_delivery (date)
     - actual_delivery (date)
     - status (text)
     - created_at (timestamptz)
     - updated_at (timestamptz)

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies restrict access based on user roles
  - Admin has full access
  - Sellers can only manage their own products and orders
  - Customers can only view/edit their own data

  ## Indexes
  - Primary keys on all tables
  - Foreign key indexes for performance
  - Unique indexes on email, slug, sku, order_number
  - Composite indexes for frequently queried combinations
  - Text search indexes on product name and description
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'seller', 'customer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE payment_method AS ENUM ('razorpay', 'cod');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE delivery_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- =====================================================
-- TABLE: users
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role user_role DEFAULT 'customer' NOT NULL,
  full_name text NOT NULL,
  phone text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- Index for role-based queries
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- =====================================================
-- TABLE: profiles
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  address text,
  city text,
  state text,
  pincode text,
  gstin text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- =====================================================
-- TABLE: categories
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image_url text,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
-- Index for parent-child relationships
CREATE INDEX IF NOT EXISTS idx_categories_parent_id ON categories(parent_id);
-- Index for active categories
CREATE INDEX IF NOT EXISTS idx_categories_active ON categories(is_active);

-- =====================================================
-- TABLE: products
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price decimal(10, 2) NOT NULL CHECK (price >= 0),
  discount_price decimal(10, 2) CHECK (discount_price >= 0),
  sku text UNIQUE NOT NULL,
  stock_quantity integer DEFAULT 0 NOT NULL CHECK (stock_quantity >= 0),
  images text[] DEFAULT '{}' NOT NULL,
  sizes text[] DEFAULT '{}' NOT NULL,
  colors text[] DEFAULT '{}' NOT NULL,
  brand text,
  is_active boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  CONSTRAINT valid_discount CHECK (discount_price IS NULL OR discount_price < price)
);

-- Index for seller products
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
-- Index for category products
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
-- Index for SKU lookups
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
-- Index for active products
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
-- Composite index for filtering active products by category
CREATE INDEX IF NOT EXISTS idx_products_category_active ON products(category_id, is_active);
-- Full-text search index on product name and description
CREATE INDEX IF NOT EXISTS idx_products_search ON products USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- =====================================================
-- TABLE: orders
-- =====================================================
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  order_number text UNIQUE NOT NULL,
  total_amount decimal(10, 2) NOT NULL CHECK (total_amount >= 0),
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  payment_method payment_method NOT NULL,
  delivery_status delivery_status DEFAULT 'pending' NOT NULL,
  shipping_address jsonb NOT NULL,
  razorpay_order_id text,
  razorpay_payment_id text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Index for user orders
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
-- Index for order number lookups
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
-- Index for payment status
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
-- Index for delivery status
CREATE INDEX IF NOT EXISTS idx_orders_delivery_status ON orders(delivery_status);
-- Composite index for user order history
CREATE INDEX IF NOT EXISTS idx_orders_user_created ON orders(user_id, created_at DESC);

-- =====================================================
-- TABLE: order_items
-- =====================================================
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  seller_id uuid REFERENCES users(id) ON DELETE SET NULL NOT NULL,
  quantity integer NOT NULL CHECK (quantity > 0),
  price decimal(10, 2) NOT NULL CHECK (price >= 0),
  size text,
  color text,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Index for order items
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
-- Index for product order history
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
-- Index for seller orders
CREATE INDEX IF NOT EXISTS idx_order_items_seller_id ON order_items(seller_id);

-- =====================================================
-- TABLE: cart
-- =====================================================
CREATE TABLE IF NOT EXISTS cart (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  quantity integer DEFAULT 1 NOT NULL CHECK (quantity > 0),
  size text,
  color text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, product_id, size, color)
);

-- Index for user cart
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
-- Index for product in carts
CREATE INDEX IF NOT EXISTS idx_cart_product_id ON cart(product_id);

-- =====================================================
-- TABLE: reviews
-- =====================================================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  verified_purchase boolean DEFAULT false NOT NULL,
  is_approved boolean DEFAULT false NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(product_id, user_id)
);

-- Index for product reviews
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
-- Index for user reviews
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON reviews(user_id);
-- Index for approved reviews
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);
-- Composite index for approved product reviews
CREATE INDEX IF NOT EXISTS idx_reviews_product_approved ON reviews(product_id, is_approved);

-- =====================================================
-- TABLE: shipping_details
-- =====================================================
CREATE TABLE IF NOT EXISTS shipping_details (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  tracking_id text,
  courier_name text,
  estimated_delivery date,
  actual_delivery date,
  status text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Index for order shipping
CREATE INDEX IF NOT EXISTS idx_shipping_details_order_id ON shipping_details(order_id);
-- Index for tracking lookups
CREATE INDEX IF NOT EXISTS idx_shipping_details_tracking_id ON shipping_details(tracking_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_details ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Users can view their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all users
CREATE POLICY "Admins can update all users"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- PROFILES TABLE POLICIES
-- =====================================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- CATEGORIES TABLE POLICIES
-- =====================================================

-- Anyone can view active categories
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Admins can view all categories
CREATE POLICY "Admins can view all categories"
  ON categories FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can insert categories
CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update categories
CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can delete categories
CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- PRODUCTS TABLE POLICIES
-- =====================================================

-- Anyone can view active products
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Sellers can view their own products
CREATE POLICY "Sellers can view own products"
  ON products FOR SELECT
  TO authenticated
  USING (auth.uid() = seller_id);

-- Sellers can insert their own products
CREATE POLICY "Sellers can insert own products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = seller_id AND
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('seller', 'admin')
    )
  );

-- Sellers can update their own products
CREATE POLICY "Sellers can update own products"
  ON products FOR UPDATE
  TO authenticated
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Sellers can delete their own products
CREATE POLICY "Sellers can delete own products"
  ON products FOR DELETE
  TO authenticated
  USING (auth.uid() = seller_id);

-- Admins can manage all products
CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- ORDERS TABLE POLICIES
-- =====================================================

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Sellers can view orders containing their products
CREATE POLICY "Sellers can view relevant orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'seller'
    ) AND
    EXISTS (
      SELECT 1 FROM order_items
      WHERE order_items.order_id = orders.id
      AND order_items.seller_id = auth.uid()
    )
  );

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins can update all orders
CREATE POLICY "Admins can update all orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- ORDER_ITEMS TABLE POLICIES
-- =====================================================

-- Users can view their own order items
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can insert order items for their orders
CREATE POLICY "Users can insert own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Sellers can view their own order items
CREATE POLICY "Sellers can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (auth.uid() = seller_id);

-- Admins can view all order items
CREATE POLICY "Admins can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- CART TABLE POLICIES
-- =====================================================

-- Users can view their own cart
CREATE POLICY "Users can view own cart"
  ON cart FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert items to their cart
CREATE POLICY "Users can insert to own cart"
  ON cart FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart
CREATE POLICY "Users can update own cart"
  ON cart FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete from their own cart
CREATE POLICY "Users can delete from own cart"
  ON cart FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- =====================================================
-- REVIEWS TABLE POLICIES
-- =====================================================

-- Anyone can view approved reviews
CREATE POLICY "Anyone can view approved reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (is_approved = true);

-- Users can view their own reviews
CREATE POLICY "Users can view own reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own reviews
CREATE POLICY "Users can insert own reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Admins can manage all reviews
CREATE POLICY "Admins can manage all reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- SHIPPING_DETAILS TABLE POLICIES
-- =====================================================

-- Users can view shipping details for their orders
CREATE POLICY "Users can view own shipping details"
  ON shipping_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = shipping_details.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Sellers can view shipping details for their order items
CREATE POLICY "Sellers can view relevant shipping details"
  ON shipping_details FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'seller'
    ) AND
    EXISTS (
      SELECT 1 FROM order_items
      WHERE order_items.order_id = shipping_details.order_id
      AND order_items.seller_id = auth.uid()
    )
  );

-- Admins can manage all shipping details
CREATE POLICY "Admins can manage all shipping details"
  ON shipping_details FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- =====================================================
-- HELPER FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at BEFORE UPDATE ON cart
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipping_details_updated_at BEFORE UPDATE ON shipping_details
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
BEGIN
  RETURN 'ORD' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
END;
$$ LANGUAGE plpgsql;
