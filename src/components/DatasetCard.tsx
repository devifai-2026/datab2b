/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Dataset } from '../types';
import { motion } from 'motion/react';

interface DatasetCardProps {
  dataset: Dataset;
  variant?: 'compact' | 'full';
}

const DatasetCard: React.FC<DatasetCardProps> = ({ dataset, variant = 'full' }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <Tag size={24} />
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {dataset.industry}
        </div>
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
          {dataset.title}
        </h3>
        {variant === 'full' && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-500">
            {dataset.description}
          </p>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Users size={16} className="text-slate-400" />
          <span>{dataset.contactCount.toLocaleString()} Contacts</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <MapPin size={16} className="text-slate-400" />
          <span className="truncate">{dataset.location}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Price</span>
          <div className="text-2xl font-bold text-slate-900">₹{dataset.price}</div>
        </div>
        <Link
          to={`/datasets/${dataset.id}`}
          className="flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-600"
        >
          {variant === 'full' ? 'View Details' : 'Buy Now'}
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default DatasetCard;
