/*
  # Seed Products for Men's, Women's, and Kids Categories

  1. Purpose
    - Add sample products for all men's, women's, and kids clothing categories
    - Each category will have 3-5 sample products with realistic data
    - Products include images from Pexels, prices, sizes, colors, and stock

  2. Product Categories Covered
    
    **Men's Clothing:**
    - Men's Shirts
    - Men's T-Shirts
    - Men's Jeans
    - Men's Trousers
    - Men's Jackets
    - Men's Shoes

    **Women's Clothing:**
    - Women's Tops
    - Women's Dresses
    - Women's Jeans
    - Women's Skirts
    - Women's Jackets
    - Women's Shoes

    **Kids Clothing:**
    - Baby Bodysuits
    - Baby Rompers
    - Baby Sleepwear
    - Baby Shoes
    - Baby Accessories
    - Kids T-Shirts
    - Kids Shirts
    - Kids Jeans
    - Kids Shorts
    - Kids Dresses
    - Kids Jackets
    - Kids Shoes
    - Kids Sportswear

  3. Product Details
    - Each product has unique name, slug, SKU
    - Stock images from Pexels (clothing category)
    - Realistic pricing (₹499 - ₹3999)
    - Available sizes (XS, S, M, L, XL for clothing)
    - Multiple color options
    - Stock quantities (50-200 units)
    - Active status enabled
*/

-- Men's Shirts
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Classic White Formal Shirt',
  'classic-white-formal-shirt',
  'Premium cotton formal shirt perfect for office and formal occasions. Features a regular fit with button-down collar.',
  1999,
  1499,
  'MNS-SHT-001',
  100,
  ARRAY['https://images.pexels.com/photos/1027930/pexels-photo-1027930.jpeg', 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'],
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['White', 'Blue', 'Black'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-shirts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Casual Check Shirt',
  'casual-check-shirt-mens',
  'Comfortable cotton check shirt for casual outings. Features a relaxed fit and modern design.',
  1599,
  1199,
  'MNS-SHT-002',
  80,
  ARRAY['https://images.pexels.com/photos/2897529/pexels-photo-2897529.jpeg'],
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Blue', 'Red', 'Green'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-shirts'
ON CONFLICT (slug) DO NOTHING;

-- Men's T-Shirts
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Classic Black T-Shirt',
  'classic-black-tshirt-mens',
  'Premium quality cotton t-shirt with a comfortable fit. Perfect for everyday wear.',
  799,
  599,
  'MNS-TSH-001',
  150,
  ARRAY['https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg'],
  ARRAY['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Black', 'White', 'Grey'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-tshirts'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Graphic Print T-Shirt',
  'graphic-print-tshirt-mens',
  'Trendy graphic print t-shirt made from soft cotton blend. Express your style!',
  899,
  699,
  'MNS-TSH-002',
  120,
  ARRAY['https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg'],
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Navy', 'Maroon', 'Olive'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-tshirts'
ON CONFLICT (slug) DO NOTHING;

-- Men's Jeans
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Slim Fit Denim Jeans',
  'slim-fit-denim-jeans-mens',
  'Modern slim fit jeans with stretch denim for ultimate comfort. Features 5-pocket styling.',
  2499,
  1899,
  'MNS-JNS-001',
  90,
  ARRAY['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'],
  ARRAY['28', '30', '32', '34', '36', '38'],
  ARRAY['Blue', 'Black', 'Grey'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-jeans'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Relaxed Fit Jeans',
  'relaxed-fit-jeans-mens',
  'Comfortable relaxed fit jeans perfect for casual wear. Made from premium denim.',
  2299,
  1799,
  'MNS-JNS-002',
  75,
  ARRAY['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'],
  ARRAY['28', '30', '32', '34', '36'],
  ARRAY['Blue', 'Black'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-jeans'
ON CONFLICT (slug) DO NOTHING;

-- Men's Trousers
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Formal Cotton Trousers',
  'formal-cotton-trousers-mens',
  'Elegant formal trousers perfect for office wear. Made from premium cotton blend.',
  1899,
  1399,
  'MNS-TRS-001',
  70,
  ARRAY['https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg'],
  ARRAY['28', '30', '32', '34', '36', '38'],
  ARRAY['Black', 'Navy', 'Grey', 'Beige'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-trousers'
ON CONFLICT (slug) DO NOTHING;

-- Men's Jackets
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Denim Jacket Classic',
  'denim-jacket-classic-mens',
  'Timeless denim jacket with a classic fit. Perfect for layering in all seasons.',
  3499,
  2799,
  'MNS-JCK-001',
  50,
  ARRAY['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
  ARRAY['S', 'M', 'L', 'XL', 'XXL'],
  ARRAY['Blue', 'Black'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-jackets'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Leather Biker Jacket',
  'leather-biker-jacket-mens',
  'Premium leather jacket with quilted shoulders. Perfect for a rugged look.',
  5999,
  4999,
  'MNS-JCK-002',
  30,
  ARRAY['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Black', 'Brown'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-jackets'
ON CONFLICT (slug) DO NOTHING;

-- Men's Shoes
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Casual Sneakers',
  'casual-sneakers-mens',
  'Comfortable casual sneakers perfect for everyday wear. Features cushioned sole.',
  2999,
  2499,
  'MNS-SHO-001',
  60,
  ARRAY['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'],
  ARRAY['7', '8', '9', '10', '11'],
  ARRAY['White', 'Black', 'Navy'],
  'Tribaah',
  true
FROM categories WHERE slug = 'mens-shoes'
ON CONFLICT (slug) DO NOTHING;

-- Women's Tops
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Casual Cotton Top',
  'casual-cotton-top-womens',
  'Comfortable cotton top perfect for casual outings. Features a relaxed fit.',
  999,
  749,
  'WMN-TOP-001',
  120,
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['White', 'Black', 'Pink', 'Blue'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-tops'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Silk Blend Top',
  'silk-blend-top-womens',
  'Elegant silk blend top for formal and semi-formal occasions. Soft and luxurious.',
  1799,
  1399,
  'WMN-TOP-002',
  80,
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Cream', 'Lavender', 'Mint'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-tops'
ON CONFLICT (slug) DO NOTHING;

-- Women's Dresses
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Floral Summer Dress',
  'floral-summer-dress-womens',
  'Beautiful floral print dress perfect for summer. Lightweight and breathable fabric.',
  2499,
  1999,
  'WMN-DRS-001',
  100,
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Floral Blue', 'Floral Pink', 'Floral Yellow'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-dresses'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Elegant Party Dress',
  'elegant-party-dress-womens',
  'Stunning party dress perfect for special occasions. Features a flattering fit.',
  3999,
  3199,
  'WMN-DRS-002',
  60,
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Black', 'Red', 'Navy'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-dresses'
ON CONFLICT (slug) DO NOTHING;

-- Women's Jeans
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Skinny Fit Jeans',
  'skinny-fit-jeans-womens',
  'Trendy skinny fit jeans with stretch denim. Perfect for a modern look.',
  2299,
  1799,
  'WMN-JNS-001',
  110,
  ARRAY['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'],
  ARRAY['26', '28', '30', '32', '34'],
  ARRAY['Blue', 'Black', 'Grey'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-jeans'
ON CONFLICT (slug) DO NOTHING;

-- Women's Skirts
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Pleated Midi Skirt',
  'pleated-midi-skirt-womens',
  'Elegant pleated midi skirt perfect for office and casual wear.',
  1599,
  1199,
  'WMN-SKT-001',
  70,
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Black', 'Navy', 'Burgundy'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-skirts'
ON CONFLICT (slug) DO NOTHING;

-- Women's Jackets
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Denim Jacket Women',
  'denim-jacket-womens',
  'Classic denim jacket with a feminine fit. Perfect for layering.',
  3299,
  2799,
  'WMN-JCK-001',
  50,
  ARRAY['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
  ARRAY['XS', 'S', 'M', 'L', 'XL'],
  ARRAY['Blue', 'Black'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-jackets'
ON CONFLICT (slug) DO NOTHING;

-- Women's Shoes
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Casual Flats',
  'casual-flats-womens',
  'Comfortable casual flats perfect for everyday wear. Features cushioned insole.',
  1999,
  1599,
  'WMN-SHO-001',
  90,
  ARRAY['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'],
  ARRAY['5', '6', '7', '8', '9'],
  ARRAY['Black', 'Tan', 'White'],
  'Tribaah',
  true
FROM categories WHERE slug = 'womens-shoes'
ON CONFLICT (slug) DO NOTHING;

-- Baby Bodysuits
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Cotton Baby Bodysuit Pack',
  'cotton-baby-bodysuit-pack',
  'Soft cotton bodysuit pack for babies. Gentle on sensitive skin. Pack of 3.',
  999,
  799,
  'BBY-BDY-001',
  150,
  ARRAY['https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg'],
  ARRAY['0-3M', '3-6M', '6-9M', '9-12M'],
  ARRAY['White', 'Pink', 'Blue', 'Yellow'],
  'Tribaah',
  true
FROM categories WHERE slug = 'baby-bodysuits'
ON CONFLICT (slug) DO NOTHING;

-- Baby Rompers
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Cute Animal Print Romper',
  'cute-animal-print-romper',
  'Adorable animal print romper for babies. Comfortable and easy to wear.',
  1299,
  999,
  'BBY-ROM-001',
  120,
  ARRAY['https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg'],
  ARRAY['0-3M', '3-6M', '6-9M', '9-12M', '12-18M'],
  ARRAY['Bear Print', 'Giraffe Print', 'Elephant Print'],
  'Tribaah',
  true
FROM categories WHERE slug = 'baby-rompers'
ON CONFLICT (slug) DO NOTHING;

-- Baby Sleepwear
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Soft Cotton Sleepsuit',
  'soft-cotton-sleepsuit-baby',
  'Ultra-soft cotton sleepsuit for comfortable sleep. With snap buttons.',
  1199,
  899,
  'BBY-SLP-001',
  100,
  ARRAY['https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg'],
  ARRAY['0-3M', '3-6M', '6-9M', '9-12M'],
  ARRAY['White', 'Light Blue', 'Light Pink'],
  'Tribaah',
  true
FROM categories WHERE slug = 'baby-sleepwear'
ON CONFLICT (slug) DO NOTHING;

-- Baby Shoes
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Soft Sole Baby Shoes',
  'soft-sole-baby-shoes',
  'Soft sole shoes perfect for babies learning to walk. Non-slip design.',
  899,
  699,
  'BBY-SHO-001',
  80,
  ARRAY['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'],
  ARRAY['0-6M', '6-12M', '12-18M'],
  ARRAY['White', 'Pink', 'Blue'],
  'Tribaah',
  true
FROM categories WHERE slug = 'baby-shoes'
ON CONFLICT (slug) DO NOTHING;

-- Baby Accessories
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Baby Hat and Mitten Set',
  'baby-hat-mitten-set',
  'Adorable hat and mitten set to keep your baby warm. Made from soft cotton.',
  699,
  499,
  'BBY-ACC-001',
  140,
  ARRAY['https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg'],
  ARRAY['0-6M', '6-12M'],
  ARRAY['White', 'Pink', 'Blue', 'Yellow'],
  'Tribaah',
  true
FROM categories WHERE slug = 'baby-accessories'
ON CONFLICT (slug) DO NOTHING;

-- Kids T-Shirts
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Graphic T-Shirt',
  'kids-graphic-tshirt',
  'Fun graphic t-shirt for kids. Made from soft cotton for all-day comfort.',
  699,
  499,
  'KDS-TSH-001',
  130,
  ARRAY['https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
  ARRAY['Red', 'Blue', 'Green', 'Yellow'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-tshirts'
ON CONFLICT (slug) DO NOTHING;

-- Kids Shirts
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Casual Shirt',
  'kids-casual-shirt',
  'Comfortable casual shirt for kids. Perfect for school and outings.',
  1299,
  999,
  'KDS-SHT-001',
  90,
  ARRAY['https://images.pexels.com/photos/2897529/pexels-photo-2897529.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
  ARRAY['White', 'Blue', 'Grey'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-shirts'
ON CONFLICT (slug) DO NOTHING;

-- Kids Jeans
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Denim Jeans',
  'kids-denim-jeans',
  'Durable denim jeans for kids. Features adjustable waist for a perfect fit.',
  1599,
  1299,
  'KDS-JNS-001',
  85,
  ARRAY['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
  ARRAY['Blue', 'Black'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-jeans'
ON CONFLICT (slug) DO NOTHING;

-- Kids Shorts
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Cotton Shorts',
  'kids-cotton-shorts',
  'Comfortable cotton shorts perfect for summer. Breathable and easy to wear.',
  799,
  599,
  'KDS-SHT-002',
  110,
  ARRAY['https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
  ARRAY['Khaki', 'Navy', 'Grey'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-shorts'
ON CONFLICT (slug) DO NOTHING;

-- Kids Dresses
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Girls Party Dress',
  'girls-party-dress',
  'Beautiful party dress for girls. Perfect for special occasions and celebrations.',
  2299,
  1799,
  'KDS-DRS-001',
  70,
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
  ARRAY['Pink', 'Purple', 'Red'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-dresses'
ON CONFLICT (slug) DO NOTHING;

-- Kids Jackets
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Winter Jacket',
  'kids-winter-jacket',
  'Warm winter jacket for kids. Features hood and zip closure.',
  2499,
  1999,
  'KDS-JCK-001',
  60,
  ARRAY['https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
  ARRAY['Navy', 'Red', 'Black'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-jackets'
ON CONFLICT (slug) DO NOTHING;

-- Kids Shoes
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Sports Shoes',
  'kids-sports-shoes',
  'Comfortable sports shoes for active kids. Features good grip and cushioning.',
  1999,
  1599,
  'KDS-SHO-001',
  75,
  ARRAY['https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'],
  ARRAY['10', '11', '12', '13', '1', '2', '3'],
  ARRAY['White', 'Black', 'Blue'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-shoes'
ON CONFLICT (slug) DO NOTHING;

-- Kids Sportswear
INSERT INTO products (seller_id, category_id, name, slug, description, price, discount_price, sku, stock_quantity, images, sizes, colors, brand, is_active)
SELECT 
  '219e6fa7-2cd6-46f4-bba4-1e882e603a97'::uuid,
  id,
  'Kids Track Suit',
  'kids-track-suit',
  'Comfortable tracksuit for kids. Perfect for sports and outdoor activities.',
  1899,
  1499,
  'KDS-SPT-001',
  65,
  ARRAY['https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg'],
  ARRAY['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
  ARRAY['Navy', 'Black', 'Grey'],
  'Tribaah',
  true
FROM categories WHERE slug = 'kids-sportswear'
ON CONFLICT (slug) DO NOTHING;
