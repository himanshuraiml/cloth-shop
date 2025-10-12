/*
  # Seller Notifications System

  1. New Tables
    - `seller_notifications`
      - `id` (uuid, primary key)
      - `seller_id` (uuid, foreign key to users)
      - `type` (text) - notification type: order, stock, payment, system
      - `title` (text) - notification title
      - `message` (text) - notification message
      - `is_read` (boolean) - read status
      - `link` (text, nullable) - optional link to related resource
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `seller_notifications` table
    - Add policy for sellers to read only their own notifications
    - Add policy for system to create notifications
*/

CREATE TABLE IF NOT EXISTS seller_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('order', 'stock', 'payment', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE seller_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Sellers can read own notifications"
  ON seller_notifications
  FOR SELECT
  TO authenticated
  USING (seller_id = auth.uid());

CREATE POLICY "Sellers can update own notifications"
  ON seller_notifications
  FOR UPDATE
  TO authenticated
  USING (seller_id = auth.uid())
  WITH CHECK (seller_id = auth.uid());

CREATE POLICY "System can create seller notifications"
  ON seller_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_seller_notifications_seller_id ON seller_notifications(seller_id);
CREATE INDEX IF NOT EXISTS idx_seller_notifications_created_at ON seller_notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_seller_notifications_is_read ON seller_notifications(is_read);
