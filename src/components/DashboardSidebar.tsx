/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Download, User, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '../lib/utils';

export default function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'My Purchases', icon: ShoppingBag, href: '/dashboard/purchases' },
    { name: 'Downloads', icon: Download, href: '/dashboard/downloads' },
    { name: 'Profile', icon: User, href: '/dashboard/profile' },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r-2 border-orange-100 bg-white shadow-sm">
      {/* Brand strip */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-orange-100">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-md">
          <LayoutDashboard size={18} className="text-white" />
        </div>
        <div>
          <div className="text-sm font-extrabold text-stone-900">My Dashboard</div>
          <div className="text-xs text-stone-400">data.b2b</div>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto py-4">
        <nav className="flex-1 space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-2xl px-4 py-3 text-sm font-semibold transition-all",
                location.pathname === item.href
                  ? "bg-orange-50 text-orange-700 shadow-sm border border-orange-100"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-800"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
                  location.pathname === item.href
                    ? "text-orange-500"
                    : "text-stone-400 group-hover:text-stone-600"
                )}
              />
              {item.name}
              {location.pathname === item.href && (
                <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="flex flex-shrink-0 border-t border-orange-100 p-3">
        <button className="group flex w-full items-center rounded-2xl px-4 py-3 text-sm font-semibold text-stone-500 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut className="mr-3 h-5 w-5 text-stone-400 group-hover:text-red-500 transition-colors" />
          Logout
        </button>
      </div>
    </div>
  );
}
