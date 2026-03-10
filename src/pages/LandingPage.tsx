/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Zap, ShieldCheck, Download } from 'lucide-react';
import { MOCK_DATASETS, TESTIMONIALS } from '../constants';
import DatasetCard from '../components/DatasetCard';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(59,130,246,0.1)_0%,rgba(255,255,255,0)_100%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600"
            >
              <Zap size={16} />
              <span>The #1 B2B Data Marketplace</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-8 max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl"
            >
              Buy Verified <span className="text-blue-600">B2B Company Data</span> Instantly
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-slate-600 sm:text-xl"
            >
              Access thousands of verified company databases across industries.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-10 w-full max-w-xl"
            >
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search company data..."
                  className="block w-full rounded-2xl border border-slate-200 bg-white py-5 pl-12 pr-4 text-lg shadow-xl outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/datasets"
                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-105"
              >
                Browse Data
              </Link>
              <Link
                to="/categories"
                className="flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50"
              >
                View Categories
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <img
              src="https://picsum.photos/seed/dashboard/1600/900"
              alt="DataB2B Dashboard Preview"
              className="w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Featured Categories</h2>
            <p className="mt-4 text-lg text-slate-600">Explore datasets by industry and business type.</p>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'IT Companies', icon: '💻', count: '120+' },
              { name: 'Startups', icon: '🚀', count: '85+' },
              { name: 'Manufacturing', icon: '🏭', count: '64+' },
              { name: 'E-commerce', icon: '🛒', count: '92+' },
              { name: 'Healthcare', icon: '🏥', count: '45+' },
              { name: 'Marketing', icon: '📢', count: '78+' },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={`/datasets?category=${cat.name}`}
                className="group flex flex-col items-center rounded-3xl border border-slate-200 bg-white p-6 text-center transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="text-4xl group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h3 className="mt-4 text-sm font-bold text-slate-900">{cat.name}</h3>
                <p className="mt-1 text-xs text-slate-500">{cat.count} Datasets</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Databases Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-end justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Popular Databases</h2>
              <p className="mt-2 text-lg text-slate-600">Our most sought-after datasets this month.</p>
            </div>
            <Link to="/datasets" className="flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700">
              View all datasets
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_DATASETS.slice(0, 3).map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-slate-400">Get started in three simple steps.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { step: '01', title: 'Browse data categories', description: 'Search and filter through our extensive collection of B2B datasets by industry or location.' },
              { step: '02', title: 'Purchase dataset', description: 'Securely pay for the dataset that fits your business needs using our simple checkout.' },
              { step: '03', title: 'Receive download link via email', description: 'Access your data immediately via a secure download link sent directly to your inbox.' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="text-6xl font-black text-white/10">{item.step}</div>
                <div className="mt-[-2rem]">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="mt-4 text-slate-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Trusted by Sales Teams</h2>
            <p className="mt-4 text-lg text-slate-600">Join 1000+ companies growing with DataB2B.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="mt-6 text-lg italic text-slate-600">"{testimonial.content}"</p>
                <div className="mt-8 flex items-center gap-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[3rem] bg-blue-600 px-8 py-16 text-center text-white shadow-2xl">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">Start Growing Your Sales Today</h2>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-blue-100">
              Stop wasting time on cold leads. Get access to verified business contacts now.
            </p>
            <div className="mt-10">
              <Link
                to="/datasets"
                className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-5 text-lg font-bold text-blue-600 transition-all hover:bg-blue-50 hover:scale-105"
              >
                Browse Databases
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
