/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Database, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Database size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">data.b2b</span>
            </Link>
            <p className="mt-4 text-sm text-slate-500">
              The premium marketplace for verified B2B business databases. Grow your sales with precision.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-blue-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-600">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/datasets" className="text-sm text-slate-600 hover:text-blue-600">
                  Browse Datasets
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  How it Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-slate-600 hover:text-blue-600">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-200 pt-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} DataB2B. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
