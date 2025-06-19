
import React from 'react';

export const SkeletonCard = () => (
  <div className="glass-effect border border-white/10 rounded-xl p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-4 bg-white/20 rounded w-3/4"></div>
      <div className="h-8 bg-white/20 rounded w-full"></div>
      <div className="h-4 bg-white/20 rounded w-1/2"></div>
    </div>
  </div>
);

export const SkeletonMetric = () => (
  <div className="glass-effect border border-white/10 rounded-xl p-6 animate-pulse">
    <div className="space-y-3">
      <div className="h-4 bg-white/20 rounded w-1/3"></div>
      <div className="h-8 bg-white/20 rounded w-2/3"></div>
      <div className="h-3 bg-white/20 rounded w-1/2"></div>
    </div>
  </div>
);

export const SkeletonChart = () => (
  <div className="glass-effect border border-white/10 rounded-xl p-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-white/20 rounded w-1/3"></div>
      <div className="h-64 bg-white/20 rounded w-full"></div>
    </div>
  </div>
);

export const SkeletonMessage = () => (
  <div className="flex space-x-3 animate-pulse">
    <div className="w-8 h-8 bg-white/20 rounded-full shrink-0"></div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-white/20 rounded w-1/4"></div>
      <div className="space-y-1">
        <div className="h-3 bg-white/20 rounded w-full"></div>
        <div className="h-3 bg-white/20 rounded w-3/4"></div>
        <div className="h-3 bg-white/20 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-16 bg-white/20 rounded-lg"></div>
      </div>
    ))}
  </div>
);
