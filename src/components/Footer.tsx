/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Database, Twitter, Linkedin, Github, Mail, Phone, MapPin } from 'lucide-react';
import { AiFillHeart } from 'react-icons/ai';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-orange-100 bg-gradient-to-br from-stone-900 via-orange-950 to-stone-900 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand — full width on mobile, 1 col on md */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-900/50 group-hover:shadow-orange-500/50 transition-all">
                <Database size={20} />
              </div>
              <span className="text-xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                <span className="text-white">data</span>
                <span className="gradient-text">.b2b</span>
              </span>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              The premium marketplace for verified B2B business databases. Power your sales engine with precision data.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2.5">
              <a href="mailto:hello@datab2b.in" className="flex items-center gap-2 text-sm text-stone-400 hover:text-orange-400 transition-colors">
                <Mail size={15} className="text-orange-500" /> hello@datab2b.in
              </a>
              <a href="tel:+918100537052" className="flex items-center gap-2 text-sm text-stone-400 hover:text-orange-400 transition-colors">
                <Phone size={15} className="text-orange-500" /> +91 81005 37052
              </a>
              <div className="flex items-start gap-2 text-sm text-stone-400">
                <MapPin size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Kolkata, West Bengal, India</span>
              </div>
            </div>

            {/* Social */}
            <div className="mt-6 flex space-x-3">
              {[
                { Icon: Twitter, href: '#' },
                { Icon: Linkedin, href: '#' },
                { Icon: Github, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-stone-400 hover:bg-orange-500 hover:text-white hover:border-orange-400 transition-all hover:scale-110"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-5">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: 'Browse Datasets', href: '/datasets' },
                { label: 'Categories', href: '/categories' },
                { label: 'How it Works', href: '/' },
              
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-stone-400 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-5">Company</h3>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/' },
                { label: 'Blog', href: '/' },
            
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-stone-400 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-5">Legal</h3>
            <ul className="space-y-3 mb-8">
              {[
                { label: 'Privacy Policy', href: '/privacy-policy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Refund Policy', href: '/refund-policy' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-stone-400 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter CTA */}
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs font-bold text-stone-300 mb-3">Get data updates in your inbox</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-xs text-white placeholder-stone-500 outline-none focus:border-orange-400 transition-colors"
                />
                <button className="btn-orange px-3 py-2 text-xs rounded-lg flex-shrink-0">
                  Go
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-stone-500 flex flex-wrap items-center justify-center sm:justify-start gap-x-1 gap-y-0.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()}</span>
            <span className="text-orange-400 font-semibold">DataB2B</span>
            <span>. All rights reserved. Made with</span>
            <span className="text-rose-400 flex-shrink-0 inline-flex"><AiFillHeart /></span>
            <span>in India.</span>
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-stone-500">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
