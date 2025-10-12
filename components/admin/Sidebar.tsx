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
  Users,
  DollarSign,
  Truck,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Menu,
  X,
  Plus,
  List,
  FolderTree,
  Archive,
  Clock,
  CheckCircle,
  XCircle,
  UserCircle,
  UserCog,
  CreditCard,
  RotateCcw,
  PackageSearch,
  MapPin,
  FileText,
  Mail,
  Zap,
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
    href: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: 'Products',
    icon: <Package className="h-5 w-5" />,
    subItems: [
      { label: 'All Products', href: '/admin/products', icon: <List className="h-4 w-4" /> },
      { label: 'Add New Product', href: '/admin/products/new', icon: <Plus className="h-4 w-4" /> },
      { label: 'Categories', href: '/admin/categories', icon: <FolderTree className="h-4 w-4" /> },
      { label: 'Inventory', href: '/admin/inventory', icon: <Archive className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Orders',
    icon: <ShoppingCart className="h-5 w-5" />,
    subItems: [
      { label: 'All Orders', href: '/admin/orders', icon: <List className="h-4 w-4" /> },
      { label: 'Pending Orders', href: '/admin/orders/pending', icon: <Clock className="h-4 w-4" /> },
      { label: 'Completed Orders', href: '/admin/orders/completed', icon: <CheckCircle className="h-4 w-4" /> },
      { label: 'Cancelled Orders', href: '/admin/orders/cancelled', icon: <XCircle className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Users',
    icon: <Users className="h-5 w-5" />,
    subItems: [
      { label: 'Customers', href: '/admin/users/customers', icon: <UserCircle className="h-4 w-4" /> },
      { label: 'Sellers', href: '/admin/users/sellers', icon: <User className="h-4 w-4" /> },
      { label: 'Manage Roles', href: '/admin/users/roles', icon: <UserCog className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Payments',
    icon: <DollarSign className="h-5 w-5" />,
    subItems: [
      { label: 'Transactions', href: '/admin/payments/transactions', icon: <CreditCard className="h-4 w-4" /> },
      { label: 'Refunds', href: '/admin/payments/refunds', icon: <RotateCcw className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Shipping',
    icon: <Truck className="h-5 w-5" />,
    subItems: [
      { label: 'Shipments', href: '/admin/shipping/shipments', icon: <PackageSearch className="h-4 w-4" /> },
      { label: 'Tracking', href: '/admin/shipping/tracking', icon: <MapPin className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Reports',
    icon: <BarChart3 className="h-5 w-5" />,
    subItems: [
      { label: 'Sales Report', href: '/admin/reports/sales', icon: <FileText className="h-4 w-4" /> },
      { label: 'Product Report', href: '/admin/reports/products', icon: <Package className="h-4 w-4" /> },
      { label: 'Customer Report', href: '/admin/reports/customers', icon: <UserCircle className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    subItems: [
      { label: 'General Settings', href: '/admin/settings/general', icon: <Zap className="h-4 w-4" /> },
      { label: 'Payment Settings', href: '/admin/settings/payments', icon: <CreditCard className="h-4 w-4" /> },
      { label: 'Shipping Settings', href: '/admin/settings/shipping', icon: <Truck className="h-4 w-4" /> },
      { label: 'Email Templates', href: '/admin/settings/emails', icon: <Mail className="h-4 w-4" /> },
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
    const savedState = localStorage.getItem('admin-sidebar-collapsed');
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
    localStorage.setItem('admin-sidebar-collapsed', JSON.stringify(newState));
  };

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === '/admin') {
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
          "fixed top-0 left-0 h-screen bg-sage-900 text-beige-50 z-50 transition-all duration-300 flex flex-col",
          collapsed ? "w-20" : "w-80",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-sage-800">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-3">
              <img
                src="/Trendy Minimalist Logo for Tribaah Clothing Store.png"
                alt="Tribaah"
                className="h-8 w-8 object-contain"
              />
              <div>
                <h1 className="font-bold text-lg text-white">Tribaah</h1>
                <p className="text-xs text-beige-300">Admin Panel</p>
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
            className="hidden lg:flex text-beige-200 hover:text-white hover:bg-sage-800"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden text-beige-200 hover:text-white hover:bg-sage-800"
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
                        "hover:bg-sage-800 hover:text-white",
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
                      <div className="mt-1 ml-4 space-y-1 border-l border-sage-800 pl-4">
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
                                : "text-beige-200 hover:bg-sage-800 hover:text-white"
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
                        : "text-beige-200 hover:bg-sage-800 hover:text-white",
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

        <div className="border-t border-sage-800 p-4">
          {!collapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-coral-500 text-white">
                    {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {session?.user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-beige-300 truncate">
                    {session?.user?.email || 'admin@tribaah.com'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full justify-start gap-3 text-beige-200 hover:text-white hover:bg-sage-800"
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
              className="w-full text-beige-200 hover:text-white hover:bg-sage-800"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          )}
        </div>
      </aside>
    </>
  );
}
