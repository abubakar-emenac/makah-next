import React, { useEffect, useState } from 'react';
import { BannerSkeleton, SliderSkeleton } from './Skeleton';

/**
 * SkeletonLoaderShell is a hydration guard that prevents layout shifts
 * and flicker on hard refresh. It shows a skeleton UI until the client
 * React app is fully hydrated.
 */
export default function SkeletonLoaderShell({ children }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Reveal content once hydrated
    setIsReady(true);
  }, []);

  return (
    <div className="skeleton-loader-shell">
      {!isReady && (
        <div className="loading-skeleton-page overflow-hidden pt-24 md:pt-32">
          <BannerSkeleton />
          <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto px-4 py-10 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full h-64 skeleton-shimmer rounded-2xl" />
                ))}
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
