/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MOCK_DATASETS } from '../constants';
import DatasetCard from '../components/DatasetCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar from '../components/FilterSidebar';
import { motion } from 'motion/react';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredDatasets = MOCK_DATASETS.filter(dataset => 
    dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Dataset Marketplace</h1>
              <p className="text-slate-600">Browse and discover high-quality B2B databases.</p>
            </div>
            <div className="w-full max-w-md">
              <SearchBar onSearch={setSearchQuery} />
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Sidebar */}
            <aside className="w-full lg:w-80">
              <FilterSidebar />
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">
                  Showing {filteredDatasets.length} results
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">Sort by:</span>
                  <select className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-900 outline-none focus:border-blue-500">
                    <option>Popularity</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>

              {filteredDatasets.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {filteredDatasets.map((dataset, idx) => (
                    <motion.div
                      key={dataset.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                      <DatasetCard dataset={dataset} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-white p-12 text-center">
                  <div className="rounded-full bg-slate-100 p-4 text-slate-400">
                    <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">No datasets found</h3>
                  <p className="mt-2 text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-6 rounded-xl bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
