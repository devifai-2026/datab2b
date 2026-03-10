/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useParams, Link } from 'react-router-dom';
import { MOCK_DATASETS } from '../constants';
import { CheckCircle2, ArrowLeft, Download, ShieldCheck, Clock, Tag, MapPin, Users, FileSpreadsheet } from 'lucide-react';
import { motion } from 'motion/react';

export default function DatasetDetailPage() {
  const { id } = useParams();
  const dataset = MOCK_DATASETS.find((d) => d.id === id);

  if (!dataset) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Dataset not found</h1>
        <Link to="/datasets" className="mt-4 text-blue-600 hover:underline">
          Back to marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/datasets" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600">
          <ArrowLeft size={16} />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {dataset.industry}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                  <Clock size={14} />
                  Last updated: {dataset.lastUpdated}
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">{dataset.title}</h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed">{dataset.description}</p>

              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Contacts</div>
                    <div className="text-lg font-bold text-slate-900">{dataset.contactCount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Accuracy</div>
                    <div className="text-lg font-bold text-slate-900">95%+</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <FileSpreadsheet size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-500">Format</div>
                    <div className="text-lg font-bold text-slate-900">Excel / CSV</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Contact Fields Included</h2>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {dataset.fields.map((field) => (
                  <div key={field} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={18} className="text-emerald-500" />
                    <span className="text-sm font-medium">{field}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm overflow-hidden">
              <h2 className="text-xl font-bold text-slate-900">Sample Preview</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {dataset.fields.map((field) => (
                        <th key={field} className="px-4 py-3 font-semibold text-slate-900">
                          {field}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((row) => (
                      <tr key={row} className="border-b border-slate-50 last:border-0">
                        {dataset.fields.map((field) => (
                          <th key={field} className="px-4 py-3 font-normal text-slate-500">
                            <div className="h-4 w-20 animate-pulse rounded bg-slate-100" />
                          </th>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center text-xs text-slate-400">
                Purchase the dataset to unlock all records and view full details.
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
              <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Price</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900">₹{dataset.price}</span>
                <span className="text-sm text-slate-400">One-time payment</span>
              </div>

              <div className="mt-8 space-y-4">
                <Link
                  to={`/checkout/${dataset.id}`}
                  className="flex w-full items-center justify-center rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-[1.02]"
                >
                  Buy Now
                </Link>
                <button className="w-full rounded-2xl border border-slate-200 bg-white py-4 text-lg font-bold text-slate-900 transition-all hover:bg-slate-50">
                  Preview Sample
                </button>
              </div>

              <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Download size={18} className="text-blue-600" />
                  <span>Instant CSV/Excel Download</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <ShieldCheck size={18} className="text-blue-600" />
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Tag size={18} className="text-blue-600" />
                  <span>Lifetime Access to this version</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
