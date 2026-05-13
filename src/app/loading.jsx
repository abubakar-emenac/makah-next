import React from 'react';
import { BannerSkeleton, SliderSkeleton } from '../Components/CommonComponents/Skeleton';

export default function Loading() {
  return (
    <div className="loading-skeleton-page overflow-hidden pt-24 md:pt-32 pb-20 min-h-[80vh]">
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
        </div>
      </div>
    </div>
  );
}
