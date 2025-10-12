/*
  # Add Baby & Kids Categories

  1. Purpose
    - Add baby and kids clothing categories
    - Enable product categorization for children's clothing

  2. Categories Added
    - Baby Clothing (Bodysuits, Rompers, Sleepwear, etc.)
    - Kids Clothing (T-Shirts, Jeans, Dresses, Shoes, etc.)

  3. Important Notes
    - Uses ON CONFLICT to prevent duplicate insertions
    - All categories are active by default
    - Slugs are URL-friendly for navigation
*/

-- Insert Baby & Kids Categories
INSERT INTO categories (name, slug, description, is_active) VALUES
  ('Baby Bodysuits', 'baby-bodysuits', 'Comfortable bodysuits for babies', true),
  ('Baby Rompers', 'baby-rompers', 'Cute rompers for babies', true),
  ('Baby Sleepwear', 'baby-sleepwear', 'Cozy sleepwear for babies', true),
  ('Baby Shoes', 'baby-shoes', 'First shoes for babies', true),
  ('Baby Accessories', 'baby-accessories', 'Essential baby accessories', true),
  ('Kids T-Shirts', 'kids-tshirts', 'Fun t-shirts for kids', true),
  ('Kids Jeans', 'kids-jeans', 'Durable jeans for kids', true),
  ('Kids Dresses', 'kids-dresses', 'Pretty dresses for girls', true),
  ('Kids Shirts', 'kids-shirts', 'Stylish shirts for kids', true),
  ('Kids Shorts', 'kids-shorts', 'Comfortable shorts for kids', true),
  ('Kids Shoes', 'kids-shoes', 'Footwear for kids', true),
  ('Kids Jackets', 'kids-jackets', 'Warm jackets for kids', true),
  ('Kids Sportswear', 'kids-sportswear', 'Active wear for kids', true)
ON CONFLICT (slug) DO NOTHING;