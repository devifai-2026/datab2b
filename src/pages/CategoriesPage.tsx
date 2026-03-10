/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { motion } from 'motion/react';
import * as LucideIcons from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Data Categories</h1>
          <p className="mt-4 text-lg text-slate-600">Browse our extensive collection of B2B datasets by industry.</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category, idx) => {
            // Dynamically get icon component
            const IconComponent = (LucideIcons as any)[category.icon] || LucideIcons.Database;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <IconComponent size={28} />
                  </div>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {category.datasetCount} Datasets
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Access verified company data for {category.name.toLowerCase()} including contact details, revenue, and more.
                </p>
                <div className="mt-8">
                  <Link
                    to={`/datasets?category=${category.name}`}
                    className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-700"
                  >
                    View Datasets
                    <LucideIcons.ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
