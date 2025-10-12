/*
  # Seed Categories for E-commerce Store

  1. Purpose
    - Insert predefined clothing categories for the store
    - Enable proper product categorization and filtering

  2. Categories Added
    - Men's Clothing Categories (Shirts, T-Shirts, Jeans, Trousers, Jackets, Shoes)
    - Women's Clothing Categories (Dresses, Tops, Jeans, Skirts, Jackets, Shoes)
    - General Categories (T-Shirts, Jeans, Jackets, Dresses)

  3. Important Notes
    - Uses ON CONFLICT to prevent duplicate insertions
    - All categories are active by default
    - Slugs are URL-friendly for navigation
*/

-- Insert Men's Categories
INSERT INTO categories (name, slug, description, is_active) VALUES
  ('Men''s Shirts', 'mens-shirts', 'Formal and casual shirts for men', true),
  ('Men''s T-Shirts', 'mens-tshirts', 'Comfortable t-shirts for men', true),
  ('Men''s Jeans', 'mens-jeans', 'Denim jeans for men', true),
  ('Men''s Trousers', 'mens-trousers', 'Formal and casual trousers for men', true),
  ('Men''s Jackets', 'mens-jackets', 'Jackets and outerwear for men', true),
  ('Men''s Shoes', 'mens-shoes', 'Footwear for men', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert Women's Categories
INSERT INTO categories (name, slug, description, is_active) VALUES
  ('Women''s Dresses', 'womens-dresses', 'Stylish dresses for women', true),
  ('Women''s Tops', 'womens-tops', 'Trendy tops for women', true),
  ('Women''s Jeans', 'womens-jeans', 'Denim jeans for women', true),
  ('Women''s Skirts', 'womens-skirts', 'Fashionable skirts for women', true),
  ('Women''s Jackets', 'womens-jackets', 'Jackets and outerwear for women', true),
  ('Women''s Shoes', 'womens-shoes', 'Footwear for women', true)
ON CONFLICT (slug) DO NOTHING;

-- Insert General Categories
INSERT INTO categories (name, slug, description, is_active) VALUES
  ('T-Shirts', 'tshirts', 'T-shirts for all', true),
  ('Jeans', 'jeans', 'Denim jeans collection', true),
  ('Jackets', 'jackets', 'Jackets and outerwear', true),
  ('Dresses', 'dresses', 'Dress collection', true),
  ('Casual Dresses', 'casual-dresses', 'Casual dresses for everyday wear', true),
  ('Formal Dresses', 'formal-dresses', 'Elegant formal dresses', true),
  ('Party Dresses', 'party-dresses', 'Party and evening dresses', true),
  ('Summer Dresses', 'summer-dresses', 'Light summer dresses', true),
  ('Maxi Dresses', 'maxi-dresses', 'Long maxi dresses', true),
  ('Leather Jackets', 'leather-jackets', 'Leather jacket collection', true),
  ('Denim Jackets', 'denim-jackets', 'Denim jacket styles', true),
  ('Bomber Jackets', 'bomber-jackets', 'Bomber style jackets', true),
  ('Winter Jackets', 'winter-jackets', 'Warm winter jackets', true),
  ('Blazers', 'blazers', 'Formal blazers', true),
  ('Graphic Tees', 'graphic-tees', 'T-shirts with graphics', true),
  ('Plain Tees', 'plain-tees', 'Plain solid color t-shirts', true),
  ('Polo Shirts', 'polo-shirts', 'Polo style shirts', true)
ON CONFLICT (slug) DO NOTHING;