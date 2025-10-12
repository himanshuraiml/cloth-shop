'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useWishlist } from '@/contexts/WishlistContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Trash2, Loader2, Package } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemove = async (productId: string, productName: string) => {
    try {
      await removeFromWishlist(productId);
      toast.success(`${productName} removed from wishlist`);
    } catch (error) {
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleMoveToCart = async (item: any) => {
    try {
      await addToCart(item.product.id, 1);
      await removeFromWishlist(item.product_id);
      toast.success(`${item.product.name} moved to cart`);
    } catch (error) {
      toast.error('Failed to move to cart');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-coral-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
        </p>
      </div>

      {wishlist.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 text-center mb-6">
              Save items you love to your wishlist and shop them later
            </p>
            <Button asChild className="bg-coral-500 hover:bg-coral-600">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Link href={`/product/${item.product.slug}`} className="block mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-900 hover:text-coral-600 transition-colors mb-2 line-clamp-2">
                    {item.product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    {item.product.discount_price ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-coral-600">
                          ₹{item.product.discount_price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ₹{item.product.price.toLocaleString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-coral-600">
                        ₹{item.product.price.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {item.product.stock_quantity > 0 ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      Out of Stock
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-coral-500 hover:bg-coral-600"
                    onClick={() => handleMoveToCart(item)}
                    disabled={item.product.stock_quantity === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemove(item.product_id, item.product.name)}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {wishlist.length > 0 && (
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
          <Button
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={async () => {
              if (confirm('Are you sure you want to clear your entire wishlist?')) {
                try {
                  await Promise.all(
                    wishlist.map((item) => removeFromWishlist(item.product_id))
                  );
                  toast.success('Wishlist cleared');
                } catch (error) {
                  toast.error('Failed to clear wishlist');
                }
              }
            }}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
