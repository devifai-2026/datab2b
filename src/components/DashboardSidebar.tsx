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
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 space-y-1 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "group flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-all",
                location.pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  location.pathname === item.href ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"
                )}
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t border-slate-200 p-4">
        <button className="group flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-red-600" />
          Logout
        </button>
      </div>
    </div>
  );
}
