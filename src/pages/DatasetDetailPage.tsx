/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import { MOCK_DATASETS } from '../constants';
import { CheckCircle2, ArrowLeft, Download, ShieldCheck, Clock, Tag, MapPin, Users, FileSpreadsheet, Star, Zap, FileText } from 'lucide-react';
import { motion } from 'motion/react';

import dataService from '../services/dataService';
import React from 'react';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const [dataset, setDataset] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDataset = async () => {
      if (!id) return;
      try {
        const data = await dataService.getDataById(id);
        setDataset(data);
      } catch (error) {
        console.error('Error fetching dataset detail:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDataset();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-warm">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
        <p className="mt-4 text-stone-600 font-bold">Loading dataset details...</p>
      </div>
    );
  }

  if (!dataset) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-warm">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-stone-900">Dataset not found</h1>
        <Link to="/datasets" className="mt-4 btn-orange px-6 py-3 text-sm rounded-xl">
          Back to marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/datasets"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-orange-100 bg-white px-4 py-2 text-sm font-semibold text-stone-600 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm"
          >
            <ArrowLeft size={16} />
            Back to Marketplace
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl border-2 border-orange-100 bg-white/90 p-8 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="rounded-full bg-gradient-to-r from-orange-100 to-amber-100 px-4 py-1.5 text-xs font-bold text-orange-700 uppercase tracking-wider border border-orange-200">
                  {dataset.industry}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-stone-400 bg-stone-50 rounded-full px-3 py-1.5 border border-stone-100">
                  <Clock size={13} />
                  Last updated: {dataset.lastUpdated}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-full px-3 py-1.5 border border-emerald-100">
                  <ShieldCheck size={13} />
                  Verified Data
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-stone-900 sm:text-4xl leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {dataset.title}
              </h1>
              <p className="mt-5 text-lg text-stone-600 leading-relaxed">{dataset.description}</p>

              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Users, label: 'Contacts', value: dataset.contactCount.toLocaleString(), color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
                  { icon: ShieldCheck, label: 'Accuracy', value: '95%+', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
                  { icon: FileSpreadsheet, label: 'Format', value: 'Excel/CSV', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
                ].map((stat) => (
                  <div key={stat.label} className={`flex items-center gap-3 rounded-2xl border-2 ${stat.border} ${stat.bg} p-4`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm ${stat.color}`}>
                      <stat.icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-stone-500">{stat.label}</div>
                      <div className="text-sm font-bold text-stone-900 truncate">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fields Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-3xl border-2 border-orange-100 bg-white/90 p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                  <Tag size={18} />
                </div>
                <h2 className="text-xl font-bold text-stone-900">Contact Fields Included</h2>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {dataset.fields.map((field) => (
                  <div
                    key={field}
                    className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 border border-orange-100"
                  >
                    <CheckCircle2 size={17} className="text-orange-500 flex-shrink-0" />
                    <span className="text-sm font-semibold text-stone-700">{field}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Purchase Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="sticky top-24 rounded-3xl border-2 border-orange-200 bg-white/95 p-8 shadow-xl shadow-orange-100"
            >
              {/* Price */}
              <div className="mb-6 pb-6 border-b border-orange-100">
                <div className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Total Price</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    ₹{dataset.price}
                  </span>
                  <span className="text-sm text-stone-400 font-medium">One-time</span>
                </div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                  <Star size={12} fill="currentColor" className="text-amber-400" />
                  4.9/5 rating · 120+ purchases
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <Link
                  to={`/checkout/${dataset.id}`}
                  className="btn-orange flex w-full items-center justify-center gap-2 px-6 py-4 text-lg rounded-2xl glow-orange"
                >
                  <Zap size={20} />
                  Buy Now
                </Link>
                {dataset.link && (
                  <a 
                    href={dataset.link}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-blue-200 bg-blue-50 py-4 text-base font-bold text-blue-700 transition-all hover:bg-blue-100 hover:border-blue-300"
                  >
                    <FileText size={20} />
                    Download/Preview Link
                  </a>
                )}
              </div>

              {/* Trust features */}
              <div className="space-y-3 border-t border-orange-100 pt-5">
                {[
                  { icon: Download, label: 'Instant CSV/Excel Download', color: 'text-orange-500' },
                  { icon: ShieldCheck, label: '100% Secure Payment via Razorpay', color: 'text-emerald-500' },
                  { icon: Tag, label: 'Lifetime Access to this version', color: 'text-blue-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-stone-50 ${item.color}`}>
                      <item.icon size={15} />
                    </div>
                    <span className="text-stone-600 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Money back */}
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 p-4 text-center">
                <p className="text-xs font-bold text-emerald-700">🛡️ 7-Day Money Back Guarantee</p>
                <p className="text-xs text-emerald-600 mt-1">Not satisfied? Get a full refund, no questions asked.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
