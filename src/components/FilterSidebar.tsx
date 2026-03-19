/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import categoryService from '../services/categoryService';
import { Category } from '../types';

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  activeFilters?: FilterState;
}

export interface FilterState {
  categories: string[];
  locations: string[];
  priceRanges: string[];
}

export default function FilterSidebar({ onFilterChange, activeFilters }: FilterSidebarProps) {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    Categories: true,
    // Location: true,
    'Price Range': true,
  });

  const [filters, setFilters] = React.useState<FilterState>(
    activeFilters ?? { categories: [], locations: [], priceRanges: [] }
  );

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data.map((c: Category) => c.name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const filterGroups = [
    {
      name: 'Categories',
      key: 'categories' as keyof FilterState,
      options: categories,
      icon: FaBuilding,
      iconColor: 'text-orange-500 bg-orange-50',
    },
    /* {
      name: 'Location',
      key: 'locations' as keyof FilterState,
      options: ['Kolkata', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'],
      icon: FaMapMarkerAlt,
      iconColor: 'text-rose-500 bg-rose-50',
    }, */
    {
      name: 'Price Range',
      key: 'priceRanges' as keyof FilterState,
      options: ['Under ₹1000', '₹1000 - ₹2000', '₹2000 - ₹5000', 'Above ₹5000'],
      icon: FaMoneyBillWave,
      iconColor: 'text-emerald-600 bg-emerald-50',
    },
  ];

  const toggleOption = (key: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const arr = prev[key] as string[];
      const updated = arr.includes(value)
        ? arr.filter((v) => v !== value)
        : [...arr, value];
      const next = { ...prev, [key]: updated };
      onFilterChange?.(next);
      return next;
    });
  };

  const clearAll = () => {
    const reset: FilterState = { categories: [], locations: [], priceRanges: [] };
    setFilters(reset);
    onFilterChange?.(reset);
  };

  const totalActive = filters.categories.length + /* filters.locations.length + */ filters.priceRanges.length;

  return (
    <div className="w-full space-y-1 rounded-2xl border-2 border-orange-100 bg-white/90 p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-orange-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
            <Filter size={16} />
          </div>
          <h2 className="text-base font-bold text-stone-900">Filters</h2>
          {totalActive > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
              {totalActive}
            </span>
          )}
        </div>
        {totalActive > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      {filterGroups.map((filter) => {
        const isExpanded = expanded[filter.name];
        const activeInGroup = (filters[filter.key] as string[]).length;

        return (
          <div key={filter.name} className="rounded-xl overflow-hidden mb-2">
            <button
              onClick={() => setExpanded((prev) => ({ ...prev, [filter.name]: !prev[filter.name] }))}
              className="flex w-full items-center justify-between py-3 px-1 hover:text-orange-600 transition-colors"
            >
              <div className="flex items-center gap-2">
              <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg ${filter.iconColor}`}>
                <filter.icon size={13} />
              </div>
                <span className="text-sm font-bold text-stone-800">{filter.name}</span>
                {activeInGroup > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500/10 text-[10px] font-bold text-orange-600">
                    {activeInGroup}
                  </span>
                )}
              </div>
              {isExpanded ? (
                <ChevronUp size={16} className="text-stone-400" />
              ) : (
                <ChevronDown size={16} className="text-stone-400" />
              )}
            </button>

            {isExpanded && (
              <div className="space-y-1 pb-3 pl-1">
                {filter.options.map((option) => {
                  const isChecked = (filters[filter.key] as string[]).includes(option);
                  return (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer group rounded-xl px-2 py-2 hover:bg-orange-50 transition-all"
                    >
                      <div
                        onClick={() => toggleOption(filter.key, option)}
                        className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border-2 transition-all cursor-pointer ${
                          isChecked
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-stone-300 bg-white group-hover:border-orange-400'
                        }`}
                      >
                        {isChecked && (
                          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 12 12">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <span
                        onClick={() => toggleOption(filter.key, option)}
                        className={`text-sm font-medium transition-colors cursor-pointer ${
                          isChecked ? 'text-orange-700 font-semibold' : 'text-stone-600 group-hover:text-orange-600'
                        }`}
                      >
                        {option}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Active filters chips */}
      {totalActive > 0 && (
        <div className="pt-3 border-t border-orange-100">
          <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Active Filters</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).flatMap(([key, vals]) =>
              (vals as string[]).map((v) => (
                <button
                  key={`${key}-${v}`}
                  onClick={() => toggleOption(key as keyof FilterState, v)}
                  className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700 hover:bg-orange-200 transition-all border border-orange-200"
                >
                  {v}
                  <X size={10} />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <button
        onClick={clearAll}
        className="mt-4 w-full rounded-xl border-2 border-orange-100 bg-white py-2.5 text-sm font-bold text-stone-700 transition-all hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700"
      >
        Reset All Filters
      </button>
    </div>
  );
}
