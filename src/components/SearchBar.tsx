/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search databases..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        className="block w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
