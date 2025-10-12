/*
  # Admin Notifications System

  1. New Tables
    - `admin_notifications`
      - `id` (uuid, primary key)
      - `type` (text) - notification type: order, stock, customer, payment
      - `title` (text) - notification title
      - `message` (text) - notification message
      - `is_read` (boolean) - read status
      - `link` (text, nullable) - optional link to related resource
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `admin_notifications` table
    - Add policy for admin users to read all notifications
    - Add policy for system to create notifications
*/

CREATE TABLE IF NOT EXISTS admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('order', 'stock', 'customer', 'payment')),
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read all notifications"
  ON admin_notifications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "Admins can update notifications"
  ON admin_notifications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE POLICY "System can create notifications"
  ON admin_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_admin_notifications_created_at ON admin_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_notifications_is_read ON admin_notifications(is_read);

INSERT INTO admin_notifications (type, title, message, is_read, created_at) VALUES
  ('order', 'New Order Received', 'Order #ORD-001 from John Doe - ₹2,499', false, now() - interval '2 minutes'),
  ('stock', 'Low Stock Alert', 'Product "Classic Cotton T-Shirt" has only 5 items left', false, now() - interval '1 hour'),
  ('customer', 'New Customer Registered', 'Jane Smith just signed up (jane@example.com)', false, now() - interval '3 hours');
