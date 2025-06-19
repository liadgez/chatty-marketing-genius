
import { useState, useEffect } from 'react';

interface UseLoadingStateOptions {
  initialLoading?: boolean;
  minLoadingTime?: number;
}

export const useLoadingState = (options: UseLoadingStateOptions = {}) => {
  const { initialLoading = false, minLoadingTime = 500 } = options;
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [loadingStartTime, setLoadingStartTime] = useState<number | null>(null);

  const startLoading = () => {
    setIsLoading(true);
    setLoadingStartTime(Date.now());
  };

  const stopLoading = () => {
    if (loadingStartTime) {
      const elapsed = Date.now() - loadingStartTime;
      const remaining = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        setIsLoading(false);
        setLoadingStartTime(null);
      }, remaining);
    } else {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    startLoading,
    stopLoading,
    setIsLoading: (loading: boolean) => {
      if (loading) {
        startLoading();
      } else {
        stopLoading();
      }
    }
  };
};
