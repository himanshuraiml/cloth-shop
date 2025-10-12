"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Menu,
  X,
  Plus,
  List,
  AlertCircle,
  Clock,
  Truck,
  CheckCircle,
  History,
  Wallet,
  FileText,
  TrendingUp,
  Store,
  User,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SubMenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    href: '/seller',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'My Products',
    icon: <Package className="h-5 w-5" />,
    subItems: [
      { label: 'All Products', href: '/seller/products', icon: <List className="h-4 w-4" /> },
      { label: 'Add New Product', href: '/seller/products/new', icon: <Plus className="h-4 w-4" /> },
      { label: 'Out of Stock', href: '/seller/products/out-of-stock', icon: <AlertCircle className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Orders',
    icon: <ShoppingCart className="h-5 w-5" />,
    subItems: [
      { label: 'New Orders', href: '/seller/orders/new', icon: <Clock className="h-4 w-4" /> },
      { label: 'Processing', href: '/seller/orders/processing', icon: <Package className="h-4 w-4" /> },
      { label: 'Shipped', href: '/seller/orders/shipped', icon: <Truck className="h-4 w-4" /> },
      { label: 'Completed', href: '/seller/orders/completed', icon: <CheckCircle className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Earnings',
    icon: <DollarSign className="h-5 w-5" />,
    subItems: [
      { label: 'Payment History', href: '/seller/earnings/history', icon: <History className="h-4 w-4" /> },
      { label: 'Withdrawals', href: '/seller/earnings/withdrawals', icon: <Wallet className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Reports',
    icon: <BarChart3 className="h-5 w-5" />,
    subItems: [
      { label: 'Sales Report', href: '/seller/reports/sales', icon: <FileText className="h-4 w-4" /> },
      { label: 'Product Performance', href: '/seller/reports/products', icon: <TrendingUp className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    subItems: [
      { label: 'Shop Settings', href: '/seller/settings/shop', icon: <Store className="h-4 w-4" /> },
      { label: 'Profile', href: '/seller/settings/profile', icon: <User className="h-4 w-4" /> },
      { label: 'Bank Details', href: '/seller/settings/bank', icon: <CreditCard className="h-4 w-4" /> },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    const savedState = localStorage.getItem('seller-sidebar-collapsed');
    if (savedState) {
      setCollapsed(JSON.parse(savedState));
    }

    const activeMenuItem = menuItems.find(item =>
      item.subItems?.some(subItem => pathname === subItem.href)
    );
    if (activeMenuItem) {
      setExpandedItems([activeMenuItem.label]);
    }
  }, [pathname]);

  const toggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('seller-sidebar-collapsed', JSON.stringify(newState));
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '/seller') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isExpanded = (label: string) => expandedItems.includes(label);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-gradient-to-b from-beige-900 to-beige-800 text-white z-50 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-80",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-beige-700">
          {!collapsed && (
            <Link href="/seller" className="flex items-center gap-3">
              <img
                src="/Trendy Minimalist Logo for Tribaah Clothing Store.png"
                alt="Tribaah"
                className="h-8 w-8 object-contain"
              />
              <div>
                <h1 className="font-bold text-lg text-white">Tribaah</h1>
                <p className="text-xs text-beige-200">Seller Dashboard</p>
              </div>
            </Link>
          )}
          {collapsed && (
            <img
              src="/Trendy Minimalist Logo for Tribaah Clothing Store.png"
              alt="Tribaah"
              className="h-8 w-8 object-contain mx-auto"
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="hidden lg:flex text-beige-100 hover:text-white hover:bg-beige-700"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-beige-100 hover:text-white hover:bg-beige-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                        "hover:bg-beige-700 hover:text-white",
                        collapsed ? "justify-center" : "justify-between"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon}
                        {!collapsed && <span>{item.label}</span>}
                      </div>
                      {!collapsed && (
                        isExpanded(item.label) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )
                      )}
                    </button>
                    {!collapsed && isExpanded(item.label) && (
                      <div className="mt-1 ml-4 space-y-1 border-l border-beige-700 pl-4">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                onClose();
                              }
                            }}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                              isActive(subItem.href)
                                ? "bg-coral-500 text-white font-medium"
                                : "text-beige-100 hover:bg-beige-700 hover:text-white"
                            )}
                          >
                            {subItem.icon}
                            <span>{subItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive(item.href!)
                        ? "bg-coral-500 text-white"
                        : "text-beige-100 hover:bg-beige-700 hover:text-white",
                      collapsed && "justify-center"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t border-beige-700 p-4">
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-coral-500 text-white">
                    {session?.user?.name?.[0]?.toUpperCase() || 'S'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session?.user?.name || 'Seller User'}
                  </p>
                  <p className="text-xs text-beige-200 truncate">
                    {session?.user?.email || 'seller@tribaah.com'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full justify-start gap-3 text-beige-100 hover:text-white hover:bg-beige-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="w-full text-beige-100 hover:text-white hover:bg-beige-700"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
