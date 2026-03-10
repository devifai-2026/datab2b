/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Download, ExternalLink, ShoppingBag, Clock, History, Link as LinkIcon } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import { MOCK_DATASETS } from '../constants';
import { motion } from 'motion/react';
import React from 'react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<'purchased' | 'links' | 'history'>('purchased');
  const purchasedDatasets = MOCK_DATASETS.slice(0, 2);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto p-8">
        <div className="mx-auto max-w-5xl">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">User Dashboard</h1>
              <p className="text-slate-500">Manage your B2B data assets and downloads.</p>
            </div>
          </header>

          <div className="mb-8 flex gap-4 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('purchased')}
              className={`pb-4 text-sm font-bold transition-all ${activeTab === 'purchased' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Purchased Datasets
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`pb-4 text-sm font-bold transition-all ${activeTab === 'links' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Download Links
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-4 text-sm font-bold transition-all ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Order History
            </button>
          </div>

          <section>
            {activeTab === 'purchased' && (
              <div className="space-y-4">
                {purchasedDatasets.map((dataset, idx) => (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">{dataset.title}</h3>
                        <p className="text-sm text-slate-500">{dataset.contactCount.toLocaleString()} Records • Excel Format</p>
                      </div>
                    </div>
                    <button className="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700">
                      View Details
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'links' && (
              <div className="space-y-4">
                {purchasedDatasets.map((dataset, idx) => (
                  <motion.div
                    key={dataset.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <LinkIcon size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Download Link: {dataset.title}</h3>
                        <p className="text-sm text-slate-500">Expires in 7 days • Secure Link</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-600">
                        <Download size={16} />
                        Download
                      </button>
                      <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
                        Copy Link
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Dataset</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {purchasedDatasets.map((dataset, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-medium text-slate-900">#ORD-00{idx + 1}</td>
                        <td className="px-6 py-4 text-slate-600">{dataset.title}</td>
                        <td className="px-6 py-4 text-slate-600">Mar 0{idx + 5}, 2024</td>
                        <td className="px-6 py-4 font-bold text-slate-900">₹{dataset.price}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-600">
                            Completed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
