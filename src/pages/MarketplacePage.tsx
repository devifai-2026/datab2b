/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MOCK_DATASETS } from '../constants';
import DatasetCard from '../components/DatasetCard';
import SearchBar from '../components/SearchBar';
import FilterSidebar, { FilterState } from '../components/FilterSidebar';
import { motion, AnimatePresence } from 'motion/react';
import { SlidersHorizontal, Grid3X3, List, X, Database } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dataService from '../services/dataService';
import { Dataset } from '../types';

const PRICE_RANGES: Record<string, [number, number]> = {
  'Under ₹1000 (Incl. GST)': [0, 999],
  '₹1000 - ₹2000 (Incl. GST)': [1000, 2000],
  '₹2000 - ₹5000 (Incl. GST)': [2001, 5000],
  'Above ₹5000 (Incl. GST)': [5001, Infinity],
};

const SORT_OPTIONS = ['Popularity', 'Newest', 'Price: Low to High', 'Price: High to Low'];

export default function MarketplacePage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialSearch = searchParams.get('search') || '';
  
  const [searchQuery, setSearchQuery] = React.useState(initialSearch);
  const [filters, setFilters] = React.useState<FilterState>({
    categories: initialCategory ? [initialCategory] : [],
    locations: [],
    priceRanges: [],
  });
  const [sortBy, setSortBy] = React.useState('Popularity');
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);
  const [datasets, setDatasets] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDatasets = async () => {
      setIsLoading(true);
      try {
        const params: any = {};
        if (filters.categories.length > 0) {
          params.categories = filters.categories.join(',');
        }
        if (searchQuery.trim().length > 0) {
          params.search = searchQuery.trim();
        }
        const data = await dataService.getAllData(params);
        setDatasets(data as any[]);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the call to prevent hitting the backend on every single keystroke.
    const delayDebounceFn = setTimeout(() => {
      fetchDatasets();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [filters.categories, searchQuery]);

  const filteredDatasets = React.useMemo(() => {
    let results = (datasets || []).filter((d) => {
      // Location filter
      if (filters.locations.length > 0 && !filters.locations.includes(d.location)) return false;
      // Price filter
      if (filters.priceRanges.length > 0) {
        const inRange = filters.priceRanges.some((r) => {
          const [min, max] = PRICE_RANGES[r];
          return d.price >= min && d.price <= max;
        });
        if (!inRange) return false;
      }
      return true;
    });

    // Sort
    switch (sortBy) {
      case 'Price: Low to High':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        results = [...results].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
        break;
      default:
        results = [...results].sort((a, b) => b.contactCount - a.contactCount);
    }

    return results;
  }, [searchQuery, filters, sortBy, datasets]);

  const totalActiveFilters =
    filters.categories.length + filters.locations.length + filters.priceRanges.length;

  return (
    <div className="min-h-screen bg-warm py-10">
      {/* Page Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white border-b border-orange-100 py-12 mb-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-200/20 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md">
                  <Database size={22} />
                </div>
                <h1 className="text-4xl font-extrabold text-stone-900" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  Dataset <span className="gradient-text">Marketplace</span>
                </h1>
              </div>
              <p className="text-stone-600 ml-13">Browse and discover high-quality verified B2B databases.</p>
            </div>
            <div className="w-full max-w-md">
              <SearchBar onSearch={setSearchQuery} initialValue={initialSearch} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile filter toggle */}
        <div className="mb-4 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition-all ${
              showMobileFilters
                ? 'border-orange-400 bg-orange-500 text-white shadow-md shadow-orange-200'
                : 'border-orange-200 bg-white text-orange-700 hover:border-orange-400'
            }`}
          >
            <SlidersHorizontal size={16} />
            Filters
            {totalActiveFilters > 0 && (
              <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-black ${
                showMobileFilters ? 'bg-white text-orange-600' : 'bg-orange-500 text-white'
              }`}>
                {totalActiveFilters}
              </span>
            )}
          </button>
          {totalActiveFilters > 0 && (
            <button
            onClick={() => setFilters({ categories: [], locations: [], priceRanges: [] })}
              className="flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              <X size={14} />
              Clear
            </button>
          )}
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className={`w-full lg:w-72 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <FilterSidebar onFilterChange={setFilters} activeFilters={filters} />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-stone-500">
                  <span className="text-orange-600 font-bold text-base">{filteredDatasets.length}</span> results
                  {searchQuery && <span className="ml-1">for "<span className="text-stone-700">{searchQuery}</span>"</span>}
                </span>
                {/* Active filter chips (desktop) */}
                <div className="hidden md:flex flex-wrap gap-2">
                  {Object.entries(filters).flatMap(([key, vals]) =>
                    (vals as string[]).map((v) => (
                      <button
                        key={`${key}-${v}`}
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            [key]: (prev[key as keyof FilterState] as string[]).filter((f) => f !== v),
                          }));
                        }}
                        className="flex items-center gap-1 rounded-full bg-orange-100 border border-orange-200 px-3 py-1 text-xs font-bold text-orange-700 hover:bg-orange-200 transition-all"
                      >
                        {v} <X size={10} />
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* View Toggle */}
                <div className="flex items-center rounded-xl border-2 border-orange-100 bg-white overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-all ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-stone-500 hover:text-orange-600'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-all ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-stone-500 hover:text-orange-600'}`}
                  >
                    <List size={16} />
                  </button>
                </div>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border-2 border-orange-100 bg-white px-3 py-2 text-sm font-semibold text-stone-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 cursor-pointer transition-all"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dataset Grid */}
            {filteredDatasets.length > 0 ? (
              <AnimatePresence mode="popLayout">
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 gap-6 sm:grid-cols-2' : 'flex flex-col gap-4'}>
                  {filteredDatasets.map((dataset, idx) => (
                    <motion.div
                      key={dataset.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                    >
                      <DatasetCard dataset={dataset} variant={viewMode === 'list' ? 'compact' : 'full'} />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-96 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-orange-200 bg-white/80 p-12 text-center"
              >
                <div className="rounded-full bg-orange-50 p-5 text-orange-300 mb-4">
                  <Database size={40} />
                </div>
                <h3 className="text-xl font-bold text-stone-900 mt-2">No datasets found</h3>
                <p className="mt-2 text-stone-500 max-w-sm">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ categories: [], locations: [], priceRanges: [] });
                  }}
                  className="btn-orange mt-6 px-6 py-3 text-sm rounded-xl"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
