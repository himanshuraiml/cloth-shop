/*
  # Fix All Security Issues - Version 2

  ## Changes Made

  ### 1. RLS Performance Optimization
  - Optimized all RLS policies to use `(SELECT auth.uid())` instead of `auth.uid()`
  - This prevents re-evaluation of auth functions for each row, improving query performance at scale

  ### 2. Enable RLS on All Tables
  - Ensured RLS is enabled on all public tables

  ### 3. Fix Function Search Paths
  - Updated helper functions to have immutable search paths for security

  ## Security Improvements
  - All tables now have RLS properly enabled
  - All policies optimized for performance
  - Functions secured with proper search path settings
*/

-- =====================================================
-- 1. DROP AND RECREATE RLS POLICIES WITH OPTIMIZATION
-- =====================================================

-- Drop all existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- =====================================================
-- USERS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own data" 
  ON users FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update own data" 
  ON users FOR UPDATE 
  TO authenticated 
  USING ((SELECT auth.uid()) = id) 
  WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Admins can view all users" 
  ON users FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all users" 
  ON users FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can register" 
  ON users FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- =====================================================
-- PROFILES TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id) 
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

CREATE POLICY "Anyone can insert profile during registration" 
  ON profiles FOR INSERT 
  TO anon, authenticated 
  WITH CHECK (true);

-- =====================================================
-- CATEGORIES TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active categories" 
  ON categories FOR SELECT 
  TO authenticated, anon 
  USING (is_active = true);

CREATE POLICY "Admins can manage categories" 
  ON categories FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

-- =====================================================
-- PRODUCTS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products" 
  ON products FOR SELECT 
  TO authenticated, anon 
  USING (is_active = true);

CREATE POLICY "Sellers can view own products" 
  ON products FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = seller_id);

CREATE POLICY "Sellers can insert own products" 
  ON products FOR INSERT 
  TO authenticated 
  WITH CHECK (
    (SELECT auth.uid()) = seller_id 
    AND EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role IN ('seller', 'admin')
    )
  );

CREATE POLICY "Sellers can update own products" 
  ON products FOR UPDATE 
  TO authenticated 
  USING ((SELECT auth.uid()) = seller_id) 
  WITH CHECK ((SELECT auth.uid()) = seller_id);

CREATE POLICY "Sellers can delete own products" 
  ON products FOR DELETE 
  TO authenticated 
  USING ((SELECT auth.uid()) = seller_id);

CREATE POLICY "Admins can manage all products" 
  ON products FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

-- =====================================================
-- ORDERS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own orders" 
  ON orders FOR INSERT 
  TO authenticated 
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Sellers can view relevant orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'seller'
    ) 
    AND EXISTS (
      SELECT 1 FROM order_items 
      WHERE order_items.order_id = orders.id 
      AND order_items.seller_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can view all orders" 
  ON orders FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all orders" 
  ON orders FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

-- =====================================================
-- ORDER_ITEMS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Users can insert own order items" 
  ON order_items FOR INSERT 
  TO authenticated 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Sellers can view own order items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = seller_id);

CREATE POLICY "Admins can view all order items" 
  ON order_items FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

-- =====================================================
-- CART TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE cart ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cart" 
  ON cart FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert to own cart" 
  ON cart FOR INSERT 
  TO authenticated 
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own cart" 
  ON cart FOR UPDATE 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id) 
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete from own cart" 
  ON cart FOR DELETE 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

-- =====================================================
-- REVIEWS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved reviews" 
  ON reviews FOR SELECT 
  TO authenticated, anon 
  USING (is_approved = true);

CREATE POLICY "Users can view own reviews" 
  ON reviews FOR SELECT 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can insert own reviews" 
  ON reviews FOR INSERT 
  TO authenticated 
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can update own reviews" 
  ON reviews FOR UPDATE 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id) 
  WITH CHECK ((SELECT auth.uid()) = user_id);

CREATE POLICY "Users can delete own reviews" 
  ON reviews FOR DELETE 
  TO authenticated 
  USING ((SELECT auth.uid()) = user_id);

CREATE POLICY "Admins can manage all reviews" 
  ON reviews FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

-- =====================================================
-- SHIPPING_DETAILS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE shipping_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own shipping details" 
  ON shipping_details FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = shipping_details.order_id 
      AND orders.user_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Sellers can view relevant shipping details" 
  ON shipping_details FOR SELECT 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'seller'
    ) 
    AND EXISTS (
      SELECT 1 FROM order_items 
      WHERE order_items.order_id = shipping_details.order_id 
      AND order_items.seller_id = (SELECT auth.uid())
    )
  );

CREATE POLICY "Admins can manage all shipping details" 
  ON shipping_details FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = (SELECT auth.uid()) 
      AND role = 'admin'
    )
  );

-- =====================================================
-- WISHLIST TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own wishlist"
  ON wishlist FOR SELECT
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can add to own wishlist"
  ON wishlist FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can remove from own wishlist"
  ON wishlist FOR DELETE
  TO authenticated
  USING (user_id = (SELECT auth.uid()));

-- =====================================================
-- ADMIN_NOTIFICATIONS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all notifications"
  ON admin_notifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update notifications"
  ON admin_notifications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

CREATE POLICY "System can create notifications"
  ON admin_notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- SELLER_NOTIFICATIONS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE seller_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sellers can read own notifications"
  ON seller_notifications FOR SELECT
  TO authenticated
  USING (seller_id = (SELECT auth.uid()));

CREATE POLICY "Sellers can update own notifications"
  ON seller_notifications FOR UPDATE
  TO authenticated
  USING (seller_id = (SELECT auth.uid()))
  WITH CHECK (seller_id = (SELECT auth.uid()));

CREATE POLICY "System can create seller notifications"
  ON seller_notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- =====================================================
-- NEWSLETTER_SUBSCRIPTIONS TABLE POLICIES (Optimized)
-- =====================================================
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all newsletter subscriptions"
  ON newsletter_subscriptions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = (SELECT auth.uid())
      AND users.role = 'admin'
    )
  );

-- =====================================================
-- 2. FIX FUNCTION SEARCH PATHS
-- =====================================================

-- Drop and recreate functions with CASCADE to handle dependencies
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate all triggers that were dropped by CASCADE
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at 
  BEFORE UPDATE ON profiles 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON products 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_updated_at 
  BEFORE UPDATE ON cart 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at 
  BEFORE UPDATE ON reviews 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shipping_details_updated_at 
  BEFORE UPDATE ON shipping_details 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Update generate_order_number function
DROP FUNCTION IF EXISTS generate_order_number() CASCADE;
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'ORD' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::text, 4, '0');
END;
$$;