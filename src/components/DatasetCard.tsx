/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Tag, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Dataset } from '../types';
import { motion } from 'motion/react';

interface DatasetCardProps {
  dataset: Dataset;
  variant?: 'compact' | 'full';
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, variant = 'full' }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border-2 border-orange-100 bg-white/90 p-6 shadow-sm transition-all hover:border-orange-300 hover:shadow-xl hover:shadow-orange-100"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 group-hover:from-orange-500 group-hover:to-amber-500 group-hover:text-white transition-all shadow-sm">
          <Tag size={22} />
        </div>
        <div className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 border border-orange-100">
          {dataset.industry}
        </div>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-600 transition-colors leading-snug">
          {dataset.title}
        </h3>
        {variant === 'full' && (
          <p className="mt-2 line-clamp-2 text-sm text-stone-500 leading-relaxed">
            {dataset.description}
          </p>
        )}
      </div>

      {/* Meta row */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-orange-50/60 p-3 border border-orange-100/50">
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <Users size={14} className="text-orange-400" />
          <span className="font-medium">{dataset.contactCount.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-stone-600">
          <MapPin size={14} className="text-orange-400" />
          <span className="truncate font-medium">{dataset.location}</span>
        </div>
      </div>

      {/* Trust badges */}
      <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-1">
          <ShieldCheck size={12} className="text-emerald-500" />
          <span>Verified</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} className="text-blue-400" />
          <span>Updated {dataset.lastUpdated}</span>
        </div>
      </div>

      {/* Price & CTA */}
      <div className="mt-5 flex items-center justify-between pt-4 border-t border-orange-100/60">
        <div>
          <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">Price</span>
          <div className="text-2xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ₹{dataset.price}
          </div>
        </div>
        <div className="flex gap-2">
          {dataset.link && (
            <a
              href={dataset.link}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-100"
              title="Download/Preview Link"
              onClick={(e) => e.stopPropagation()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
            </a>
          )}
          <Link
            to={`/datasets/${dataset.id}`}
            className="btn-orange flex items-center gap-2 px-5 py-2.5 text-sm rounded-xl"
          >
            {variant === 'full' ? 'View Details' : 'Buy Now'}
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DatasetCard;
