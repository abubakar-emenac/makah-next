import React, { useEffect, useState } from 'react';
import { BannerSkeleton, SliderSkeleton } from './Skeleton';

/**
 * SkeletonLoaderShell is a hydration guard that prevents layout shifts.
 * It shows a deterministic skeleton UI until the React app is fully hydrated.
 */
export default function SkeletonLoaderShell({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Reveal content once hydrated
    setIsReady(true);
  }, []);

  return (
    <div className="skeleton-loader-shell min-h-[70vh]">
      {!isReady && (
        <div className="loading-skeleton-page overflow-hidden pt-24 md:pt-32 pb-20">
          <BannerSkeleton />
          <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto px-4 py-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-full h-64 skeleton-shimmer rounded-2xl" />
              ))}
            </div>
            <div className="space-y-8">
              <SliderSkeleton count={4} />
              <SliderSkeleton count={4} />
              <SliderSkeleton count={4} />
            </div>
          </div>
        </div>
      )}
      <div style={isReady ? {} : { display: 'none' }}>
        {children}
      </div>
    </div>
  );
}
