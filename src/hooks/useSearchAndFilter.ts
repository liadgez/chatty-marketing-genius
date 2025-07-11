
import { useState, useMemo } from 'react';

interface FilterState {
  status: string;
  type: string;
  performance: string;
  dateRange: string;
}

interface SearchableItem {
  id: string;
  title: string;
  status?: string;
  type?: string;
  performance?: string;
  tags?: string[];
  createdAt?: string;
  [key: string]: any;
}

export function useSearchAndFilter<T extends SearchableItem>(items: T[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    status: '',
    type: '',
    performance: '',
    dateRange: ''
  });

  const filteredItems = useMemo(() => {
    let filtered = items;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status);
    }

    // Apply type filter
    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    // Apply performance filter
    if (filters.performance) {
      filtered = filtered.filter(item => item.performance === filters.performance);
    }

    // Apply date range filter
    if (filters.dateRange) {
      const now = new Date();
      
      filtered = filtered.filter(item => {
        if (!item.createdAt) return false;
        
        const itemDate = new Date(item.createdAt);
        
        switch (filters.dateRange) {
          case 'today':
            return itemDate.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
            return itemDate >= monthAgo;
          case 'quarter':
            const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
            return itemDate >= quarterAgo;
          case 'year':
            const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
            return itemDate >= yearAgo;
          default:
            return true;
        }
      });
    }

    return filtered;
  }, [items, searchQuery, filters]);

  return {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
    totalCount: items.length,
    resultsCount: filteredItems.length,
    hasActiveFilters: Object.values(filters).some(Boolean) || !!searchQuery.trim()
  };
}
