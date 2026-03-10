/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { Database, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function LoginPage() {
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
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">Welcome back</h2>
          <p className="mt-2 text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
              Create one for free
            </Link>
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <form className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-slate-900 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700"
            >
              Login to Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="mr-2 h-5 w-5" alt="Google" />
                Google
              </button>
              <button className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="mr-2 h-5 w-5" alt="GitHub" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
