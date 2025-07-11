
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
    <div className="min-h-screen w-full px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 xl:px-16 xl:py-12 2xl:px-20 2xl:py-14 space-y-6 md:space-y-8 lg:space-y-10">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        <ActionBar />
        
        {/* Search and Filter Section */}
        <div className="glass-effect border-white/10 bg-white/10 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/20">
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
          <div className="glass-effect border-white/10 bg-white/10 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg backdrop-blur-md transition-all duration-300">
            <h3 className="text-white font-semibold text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8">Filtered Results ({resultsCount})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8 max-h-80 overflow-y-auto">
              {filteredItems.slice(0, 12).map(item => (
                <div key={item.id} className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-5 text-sm transition-all duration-200 hover:bg-white/10 hover:border-white/20">
                  <div className="text-white font-medium mb-2 text-sm md:text-base">{item.title}</div>
                  <div className="text-white/65 text-xs md:text-sm">
                    {item.status} • {item.type} • {item.performance}
                  </div>
                </div>
              ))}
              {filteredItems.length > 12 && (
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 md:p-5 text-sm text-center text-white/65 flex items-center justify-center">
                  +{filteredItems.length - 12} more...
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
