/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Filter, ChevronDown } from 'lucide-react';

export default function FilterSidebar() {
  const filters = [
    {
      name: 'Industry',
      options: ['Technology', 'Healthcare', 'Food & Beverage', 'Real Estate', 'Manufacturing', 'Retail'],
    },
    {
      name: 'Location',
      options: ['Kolkata', 'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'],
    },
    {
      name: 'Price Range',
      options: ['Under ₹1000', '₹1000 - ₹2000', '₹2000 - ₹5000', 'Above ₹5000'],
    },
  ];

  return (
    <div className="w-full space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
        <Filter size={20} className="text-blue-600" />
        <h2 className="text-lg font-bold text-slate-900">Filters</h2>
      </div>

      {filters.map((filter) => (
        <div key={filter.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">
              {filter.name}
            </h3>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
          <div className="space-y-2">
            {filter.options.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <button className="w-full rounded-xl bg-slate-100 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-200">
        Clear All Filters
      </button>
    </div>
  );
}
