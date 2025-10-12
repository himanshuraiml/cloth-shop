"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export function ShopMegaMenu() {
  const categories = [
    {
      title: "Men's Clothing",
      icon: "👔",
      link: "/shop?gender=men",
      items: [
        { name: "Shirts", link: "/shop?category=mens-shirts" },
        { name: "T-Shirts", link: "/shop?category=mens-tshirts" },
        { name: "Jeans", link: "/shop?category=mens-jeans" },
        { name: "Trousers", link: "/shop?category=mens-trousers" },
        { name: "Jackets", link: "/shop?category=mens-jackets" },
        { name: "Shoes", link: "/shop?category=mens-shoes" },
      ]
    },
    {
      title: "Women's Clothing",
      icon: "👗",
      link: "/shop?gender=women",
      items: [
        { name: "Dresses", link: "/shop?category=womens-dresses" },
        { name: "Tops", link: "/shop?category=womens-tops" },
        { name: "Jeans", link: "/shop?category=womens-jeans" },
        { name: "Skirts", link: "/shop?category=womens-skirts" },
        { name: "Jackets", link: "/shop?category=womens-jackets" },
        { name: "Shoes", link: "/shop?category=womens-shoes" },
      ]
    },
    {
      title: "T-Shirts",
      icon: "👕",
      link: "/shop?category=tshirts",
      items: [
        { name: "Men's T-Shirts", link: "/shop?category=mens-tshirts" },
        { name: "Women's T-Shirts", link: "/shop?category=womens-tshirts" },
        { name: "Graphic Tees", link: "/shop?category=graphic-tees" },
        { name: "Plain Tees", link: "/shop?category=plain-tees" },
        { name: "Polo Shirts", link: "/shop?category=polo-shirts" },
      ]
    },
    {
      title: "Jeans",
      icon: "👖",
      link: "/shop?category=jeans",
      items: [
        { name: "Men's Jeans", link: "/shop?category=mens-jeans" },
        { name: "Women's Jeans", link: "/shop?category=womens-jeans" },
        { name: "Skinny Fit", link: "/shop?style=skinny" },
        { name: "Regular Fit", link: "/shop?style=regular" },
        { name: "Loose Fit", link: "/shop?style=loose" },
      ]
    },
    {
      title: "Dresses",
      icon: "💃",
      link: "/shop?category=dresses",
      items: [
        { name: "Casual Dresses", link: "/shop?category=casual-dresses" },
        { name: "Formal Dresses", link: "/shop?category=formal-dresses" },
        { name: "Party Dresses", link: "/shop?category=party-dresses" },
        { name: "Summer Dresses", link: "/shop?category=summer-dresses" },
        { name: "Maxi Dresses", link: "/shop?category=maxi-dresses" },
      ]
    },
    {
      title: "Jackets",
      icon: "🧥",
      link: "/shop?category=jackets",
      items: [
        { name: "Leather Jackets", link: "/shop?category=leather-jackets" },
        { name: "Denim Jackets", link: "/shop?category=denim-jackets" },
        { name: "Bomber Jackets", link: "/shop?category=bomber-jackets" },
        { name: "Winter Jackets", link: "/shop?category=winter-jackets" },
        { name: "Blazers", link: "/shop?category=blazers" },
      ]
    },
  ];

  return (
    <div className="w-[800px] bg-white shadow-xl rounded-lg border border-gray-200">
      <div className="grid grid-cols-3 gap-0">
        {categories.map((category, index) => (
          <div
            key={index}
            className="p-4 hover:bg-gray-50 transition-colors border-r border-b border-gray-100 last:border-r-0"
          >
            <Link
              href={category.link}
              className="flex items-center gap-2 mb-3 group"
            >
              <span className="text-2xl">{category.icon}</span>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors ml-auto" />
            </Link>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    href={item.link}
                    className="text-sm text-gray-600 hover:text-blue-600 hover:translate-x-1 transition-all inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
        <Link
          href="/shop"
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm inline-flex items-center gap-2"
        >
          View All Categories
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
