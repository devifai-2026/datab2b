/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Datasets', href: '/datasets' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'About', href: '/#about' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Database size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">data.b2b</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/categories"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === "/categories" ? "text-blue-600" : "text-slate-600"
                )}
              >
                Categories
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-blue-600",
                    location.pathname === link.href ? "text-blue-600" : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-blue-600">
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="block rounded-md px-3 py-2 text-base font-medium text-slate-600 hover:bg-slate-50 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="mt-4 block rounded-md bg-blue-600 px-3 py-2 text-center text-base font-medium text-white"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
