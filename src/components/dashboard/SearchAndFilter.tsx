
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FilterState {
  status: string;
  type: string;
  performance: string;
  dateRange: string;
}

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount?: number;
  totalCount?: number;
}

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  resultsCount = 0,
  totalCount = 0
}: SearchAndFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      status: "",
      type: "",
      performance: "",
      dateRange: ""
    });
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;
  const hasActiveFilters = activeFiltersCount > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            placeholder="Search experiments by name, metric, or tag..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/50 focus:border-blue-500/50"
          />
        </div>
        
        {/* Filters Popover */}
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={`border-white/10 text-white hover:bg-white/10 relative ${
                hasActiveFilters ? 'border-blue-500/50 bg-blue-500/10' : ''
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
              {hasActiveFilters && (
                <Badge className="ml-2 bg-blue-600 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-black/90 border-white/10 backdrop-blur-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-white">Filter Experiments</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-white/65 hover:text-white"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Status</label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="">All statuses</SelectItem>
                    <SelectItem value="running">Running</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Test Type</label>
                <Select value={filters.type} onValueChange={(value) => handleFilterChange('type', value)}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="">All types</SelectItem>
                    <SelectItem value="ab">A/B Test</SelectItem>
                    <SelectItem value="multivariate">Multivariate</SelectItem>
                    <SelectItem value="funnel">Funnel Test</SelectItem>
                    <SelectItem value="personalization">Personalization</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Performance Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Performance</label>
                <Select value={filters.performance} onValueChange={(value) => handleFilterChange('performance', value)}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white">
                    <SelectValue placeholder="All performance" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="">All performance</SelectItem>
                    <SelectItem value="winning">Winning (>10% lift)</SelectItem>
                    <SelectItem value="promising">Promising (5-10% lift)</SelectItem>
                    <SelectItem value="neutral">Neutral (±5%)</SelectItem>
                    <SelectItem value="losing">Losing (<-5% lift)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Date Range</label>
                <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                  <SelectTrigger className="bg-black/20 border-white/10 text-white">
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/90 border-white/10">
                    <SelectItem value="">All time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This week</SelectItem>
                    <SelectItem value="month">This month</SelectItem>
                    <SelectItem value="quarter">This quarter</SelectItem>
                    <SelectItem value="year">This year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-white/65">Active filters:</span>
          {filters.status && (
            <Badge variant="secondary" className="bg-blue-600/20 text-blue-400 border-blue-500/30">
              Status: {filters.status}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-blue-400 hover:text-blue-300"
                onClick={() => handleFilterChange('status', '')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.type && (
            <Badge variant="secondary" className="bg-purple-600/20 text-purple-400 border-purple-500/30">
              Type: {filters.type}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-purple-400 hover:text-purple-300"
                onClick={() => handleFilterChange('type', '')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.performance && (
            <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-500/30">
              Performance: {filters.performance}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-green-400 hover:text-green-300"
                onClick={() => handleFilterChange('performance', '')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
          {filters.dateRange && (
            <Badge variant="secondary" className="bg-orange-600/20 text-orange-400 border-orange-500/30">
              Date: {filters.dateRange}
              <Button
                variant="ghost"
                size="sm"
                className="ml-1 h-auto p-0 text-orange-400 hover:text-orange-300"
                onClick={() => handleFilterChange('dateRange', '')}
              >
                <X className="w-3 h-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      {/* Results Count */}
      {(searchQuery || hasActiveFilters) && (
        <div className="flex items-center justify-between text-sm text-white/65">
          <span>
            Showing {resultsCount} of {totalCount} experiments
          </span>
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSearchChange('')}
              className="text-white/65 hover:text-white"
            >
              Clear search
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
