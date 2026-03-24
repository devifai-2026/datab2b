/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search databases...", initialValue = "" }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <Search className="h-5 w-5 text-orange-400" />
      </div>
      <input
        type="text"
        defaultValue={initialValue}
        className="block w-full rounded-2xl border-2 border-orange-100 bg-white/90 py-3.5 pl-12 pr-4 text-stone-900 shadow-sm transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none placeholder-stone-400 font-medium"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
