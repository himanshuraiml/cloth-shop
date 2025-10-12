"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { NewsletterForm } from './NewsletterForm';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function CustomerFooter() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .is('parent_id', null)
        .limit(8);

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <footer className="bg-sage-800 text-beige-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/Trendy Minimalist Logo for Tribaah Clothing Store.png"
                alt="Tribaah Logo"
                className="h-12 w-12 object-contain"
              />
              <span className="text-2xl font-bold text-white">Tribaah</span>
            </div>
            <p className="text-sm text-beige-200 mb-4 leading-relaxed">
              Discover unique, handcrafted clothing that tells your story.
              Quality fabrics, authentic designs, made with love.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-700 flex items-center justify-center hover:bg-coral-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-700 flex items-center justify-center hover:bg-coral-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sage-700 flex items-center justify-center hover:bg-coral-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-coral-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-coral-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm hover:text-coral-300 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm hover:text-coral-300 transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:text-coral-300 transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm hover:text-coral-300 transition-colors">
                  Return & Exchange Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-coral-300 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-coral-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Shop Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/shop?category=${category.slug}`}
                    className="text-sm hover:text-coral-300 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/shop" className="text-sm hover:text-coral-300 transition-colors font-medium">
                  View All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact & Newsletter</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <div className="text-sm">
                  <p>+91 1234567890</p>
                  <p className="text-beige-300">Mon-Sat, 10AM-7PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href="mailto:support@tribaah.com" className="text-sm hover:text-coral-300 transition-colors">
                  support@tribaah.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  123 Fashion Street<br />
                  Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm mb-3 text-white">Subscribe to get updates</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="border-t border-sage-700 pt-8 pb-6">
          <div className="mb-6">
            <p className="text-sm text-beige-200 mb-3">We Accept</p>
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">Razorpay</div>
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">UPI</div>
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">Cards</div>
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">COD</div>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm text-beige-200 mb-3">Shipping Partners</p>
            <div className="flex flex-wrap gap-3">
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">Shiprocket</div>
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">Delhivery</div>
              <div className="px-3 py-2 bg-sage-700 rounded text-xs font-medium">Blue Dart</div>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-beige-200">
              © 2025 Tribaah. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="/privacy" className="hover:text-coral-300 transition-colors">
                Privacy Policy
              </Link>
              <span className="text-sage-600">|</span>
              <Link href="/terms" className="hover:text-coral-300 transition-colors">
                Terms of Service
              </Link>
              <span className="text-sage-600">|</span>
              <Link href="/sitemap" className="hover:text-coral-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
