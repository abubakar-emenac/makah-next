import React from 'react';
import { BannerSkeleton, SliderSkeleton } from '../Components/CommonComponents/Skeleton';

/**
 * Global loading component for Next.js App Router.
 * This is automatically shown by Next.js when navigating between routes
 * that are not yet ready (e.g. still downloading the JS bundle).
 */
export default function Loading() {
  return (
    <div className="flex flex-col w-full space-y-10 pt-24 md:pt-32 pb-20">
      <BannerSkeleton />
      <div className="max-w-[1240px] mx-auto px-4 space-y-16 w-full">
        <SliderSkeleton count={4} />
        <SliderSkeleton count={4} />
      </div>
    </div>
  );
}
