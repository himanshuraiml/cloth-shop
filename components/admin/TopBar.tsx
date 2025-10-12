"use client";

import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Menu, ExternalLink, LogOut, User as UserIcon, Settings as SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Breadcrumbs } from './Breadcrumbs';
import { GlobalSearch } from './GlobalSearch';
import { NotificationsPanel } from './NotificationsPanel';

interface TopBarProps {
  onMenuClick: () => void;
}

const pathNameMap: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/products': 'All Products',
  '/admin/products/new': 'Add New Product',
  '/admin/categories': 'Categories',
  '/admin/inventory': 'Inventory',
  '/admin/orders': 'All Orders',
  '/admin/orders/pending': 'Pending Orders',
  '/admin/orders/completed': 'Completed Orders',
  '/admin/orders/cancelled': 'Cancelled Orders',
  '/admin/users/customers': 'Customers',
  '/admin/users/sellers': 'Sellers',
  '/admin/users/roles': 'Manage Roles',
  '/admin/payments/transactions': 'Transactions',
  '/admin/payments/refunds': 'Refunds',
  '/admin/shipping/shipments': 'Shipments',
  '/admin/shipping/tracking': 'Tracking',
  '/admin/reports/sales': 'Sales Report',
  '/admin/reports/products': 'Product Report',
  '/admin/reports/customers': 'Customer Report',
  '/admin/settings/general': 'General Settings',
  '/admin/settings/payments': 'Payment Settings',
  '/admin/settings/shipping': 'Shipping Settings',
  '/admin/settings/emails': 'Email Templates',
};

function getBreadcrumbItems(pathname: string) {
  const segments = pathname.split('/').filter(Boolean);
  const items: { label: string; href: string }[] = [];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    if (currentPath !== '/admin') {
      const label = pathNameMap[currentPath] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      items.push({ label, href: currentPath });
    }
  });

  return items;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const breadcrumbItems = getBreadcrumbItems(pathname);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden flex-shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:block flex-shrink-0">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          <h1 className="md:hidden text-lg font-semibold text-gray-900 truncate">
            {breadcrumbItems.length > 0 ? breadcrumbItems[breadcrumbItems.length - 1].label : 'Dashboard'}
          </h1>
        </div>

        <div className="flex items-center gap-2 lg:gap-3">
          <div className="hidden lg:block">
            <GlobalSearch />
          </div>

          <NotificationsPanel />

          <Button
            variant="outline"
            size="sm"
            asChild
            className="hidden md:flex items-center gap-2"
          >
            <Link href="/" target="_blank">
              <ExternalLink className="h-4 w-4" />
              <span className="hidden lg:inline">View Website</span>
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-coral-500 text-white text-sm">
                    {session?.user?.name?.[0]?.toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline text-sm font-medium">
                  {session?.user?.name || 'Admin'}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium">{session?.user?.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 font-normal">
                    {session?.user?.email || 'admin@tribaah.com'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/admin/profile" className="cursor-pointer">
                  <UserIcon className="h-4 w-4 mr-2" />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings/general" className="cursor-pointer">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank" className="cursor-pointer text-sage-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Website
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="cursor-pointer text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
