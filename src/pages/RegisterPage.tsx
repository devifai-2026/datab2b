/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Database, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Database size={24} />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">DataB2B</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Create your account</h2>
          <p className="mt-2 text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="••••••••"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Must be at least 8 characters long.
              </p>
            </div>

            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="text-slate-600">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
