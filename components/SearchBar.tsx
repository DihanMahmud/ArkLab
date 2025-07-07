'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSearch } from '@/store/slices/filtersSlice';

export function SearchBar() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(state => state.filters.search);

  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search agents..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="pl-10 bg-white/60 backdrop-blur-sm border-white/30 focus:bg-white/80 transition-all duration-200"
      />
    </div>
  );
}