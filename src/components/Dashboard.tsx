
import { useState } from "react";
import { MetricCards } from "./dashboard/MetricCards";
import { ChartsArea } from "./dashboard/ChartsArea";
import { ActionBar } from "./dashboard/ActionBar";
import { SearchAndFilter } from "./dashboard/SearchAndFilter";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";

// Mock data for demonstration
const mockExperiments = Array.from({ length: 156 }, (_, i) => ({
  id: `exp-${i + 1}`,
  title: `Experiment ${i + 1}`,
  status: ['running', 'paused', 'completed', 'draft'][Math.floor(Math.random() * 4)],
  type: ['ab', 'multivariate', 'funnel', 'personalization'][Math.floor(Math.random() * 4)],
  performance: ['winning', 'promising', 'neutral', 'losing'][Math.floor(Math.random() * 4)],
  tags: [`tag${i % 5 + 1}`, `category${i % 3 + 1}`],
  createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString()
}));

export function Dashboard() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    filteredItems,
    totalCount,
    resultsCount,
    hasActiveFilters
  } = useSearchAndFilter(mockExperiments);

  return (
    <div className="space-y-4 md:space-y-6 p-3 md:p-6 bg-transparent min-h-full">
      <ActionBar />
      
      {/* Search and Filter Section */}
      <div className="glass-effect border-white/20 bg-white/5 rounded-lg p-4 md:p-6">
        <SearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onFiltersChange={setFilters}
          resultsCount={resultsCount}
          totalCount={totalCount}
        />
      </div>

      <MetricCards />
      <ChartsArea />
      
      {/* Debug info - remove in production */}
      {hasActiveFilters && (
        <div className="glass-effect border-white/20 bg-white/5 rounded-lg p-4">
          <h3 className="text-white font-medium mb-2">Filtered Results ({resultsCount})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
            {filteredItems.slice(0, 12).map(item => (
              <div key={item.id} className="bg-white/5 rounded p-2 text-sm">
                <div className="text-white font-medium">{item.title}</div>
                <div className="text-white/65 text-xs">
                  {item.status} • {item.type} • {item.performance}
                </div>
              </div>
            ))}
            {filteredItems.length > 12 && (
              <div className="bg-white/5 rounded p-2 text-sm text-center text-white/65">
                +{filteredItems.length - 12} more...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
