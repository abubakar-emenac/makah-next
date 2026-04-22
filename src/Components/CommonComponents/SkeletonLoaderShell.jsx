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
        <div className="loading-skeleton-page overflow-hidden">
          <BannerSkeleton />
          <div className="max-w-[1240px] mx-auto px-4 py-10 space-y-16">
            <SliderSkeleton count={4} />
            <SliderSkeleton count={4} />
            {/* Generic content block */}
            <div className="w-full h-[400px] bg-gray-50 rounded-3xl animate-pulse" />
          </div>
        </div>
      )}
      <div style={isReady ? {} : { display: 'none' }}>
        {children}
      </div>
    </div>
  );
}
