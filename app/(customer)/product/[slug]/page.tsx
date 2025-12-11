'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount_price: number | null;
  images: string[];
  brand: string;
  sizes: string[];
  colors: string[];
  stock_quantity: number;
  sku: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);

  const fetchProduct = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (data) {
      setProduct(data);
      if (data.sizes.length > 0) setSelectedSize(data.sizes[0]);
      if (data.colors.length > 0) setSelectedColor(data.colors[0]);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    if (product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    setAddingToCart(true);
    try {
      await addToCart(
        product.id,
        quantity,
        product.sizes.length > 0 ? selectedSize : undefined,
        product.colors.length > 0 ? selectedColor : undefined
      );

      setAddedToCart(true);
      toast.success('Added to cart successfully!');
      setTimeout(() => setAddedToCart(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;

    setAddingToWishlist(true);
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
        toast.success('Removed from wishlist');
      } else {
        await addToWishlist(product.id);
        toast.success('Added to wishlist');
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      toast.error('Failed to update wishlist');
    } finally {
      setAddingToWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <Link href="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const finalPrice = product.discount_price || product.price;
  const discount = product.discount_price
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/shop">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>

        {addedToCart && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Product added to cart successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-white">
              <Image
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-lg px-3 py-1">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                    selectedImage === index ? 'border-slate-900' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-lg text-slate-600">{product.brand}</p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-slate-600">(0 reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold">₹{finalPrice}</span>
              {product.discount_price && (
                <>
                  <span className="text-2xl text-slate-500 line-through">
                    ₹{product.price}
                  </span>
                  <Badge variant="destructive">{discount}% OFF</Badge>
                </>
              )}
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block font-semibold">Select Size</label>
                  <Link href="/size-guide" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                    Size Guide
                  </Link>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? 'default' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[60px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-3">Select Color</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? 'default' : 'outline'}
                      onClick={() => setSelectedColor(color)}
                      className="min-w-[80px]"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-3">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-slate-600 ml-2">
                    ({product.stock_quantity} available)
                  </span>
                </div>
              </div>

              {product.stock_quantity > 0 ? (
                <div className="flex items-center gap-2 text-green-600">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">In Stock</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <X className="w-5 h-5" />
                  <span className="font-medium">Out of Stock</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0 || addingToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleWishlist}
                  disabled={addingToWishlist}
                  className={isInWishlist(product.id) ? 'border-red-500 text-red-500 hover:bg-red-50' : ''}
                >
                  <Heart
                    className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`}
                  />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-slate-600" />
                <div>
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-sm text-slate-600">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-slate-600" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-sm text-slate-600">100% secure transactions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Product Description</h2>
                <p className="text-slate-700 leading-relaxed">{product.description}</p>

                <Separator className="my-6" />

                <h3 className="text-xl font-semibold mb-3">Product Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">SKU:</span>
                    <span className="ml-2 text-slate-600">{product.sku}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Brand:</span>
                    <span className="ml-2 text-slate-600">{product.brand}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Available Sizes:</span>
                    <span className="ml-2 text-slate-600">{product.sizes.join(', ')}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Available Colors:</span>
                    <span className="ml-2 text-slate-600">{product.colors.join(', ')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                <p className="text-slate-600">No reviews yet. Be the first to review this product!</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Delivery & Returns</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-slate-700">
                    <strong>Standard Delivery:</strong> 3-5 business days
                  </p>
                  <p className="text-slate-700">
                    <strong>Express Delivery:</strong> 1-2 business days
                  </p>
                  <p className="text-slate-700">
                    <strong>Free Returns:</strong> Within 30 days of purchase
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
