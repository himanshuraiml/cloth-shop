/*
  # Newsletter Subscriptions Table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required) - Subscriber email address
      - `status` (text) - Subscription status: 'active', 'unsubscribed'
      - `subscribed_at` (timestamptz) - When they subscribed
      - `unsubscribed_at` (timestamptz) - When they unsubscribed (if applicable)
      - `source` (text) - Where they subscribed from (e.g., 'footer', 'checkout')
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for inserting newsletter subscriptions (public can subscribe)
    - Add policy for admin to view all subscriptions

  3. Indexes
    - Index on email for fast lookups
    - Index on status for filtering active subscribers
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  source text DEFAULT 'footer',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view all newsletter subscriptions"
  ON newsletter_subscriptions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role = 'admin'
    )
  );

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);
