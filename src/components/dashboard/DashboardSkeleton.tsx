
import React from 'react';
import { SkeletonMetric, SkeletonChart, SkeletonCard } from '@/components/ui/skeleton-loading';

export const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen w-full px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-10 xl:px-16 xl:py-12 2xl:px-20 2xl:py-14 space-y-6 md:space-y-8 lg:space-y-10">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        {/* Action Bar Skeleton */}
        <SkeletonCard />
        
        {/* Search and Filter Skeleton */}
        <SkeletonCard />
        
        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <SkeletonMetric />
          <SkeletonMetric />
          <SkeletonMetric />
          <SkeletonMetric />
        </div>
        
        {/* Charts Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
      </div>
    </div>
  );
};
