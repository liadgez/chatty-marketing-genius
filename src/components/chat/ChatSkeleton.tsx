
import React from 'react';
import { SkeletonMessage } from '@/components/ui/skeleton-loading';

export const ChatSkeleton = () => {
  return (
    <div className="space-y-6 p-6">
      <SkeletonMessage />
      <SkeletonMessage />
      <SkeletonMessage />
    </div>
  );
};
