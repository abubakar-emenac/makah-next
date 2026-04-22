import React from "react";

export const Skeleton = ({ className, style }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    style={style}
  />
);

export const BannerSkeleton = () => (
    <div className="w-full h-[300px] md:h-[500px] relative overflow-hidden bg-gray-100">
        <Skeleton className="w-full h-full" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <Skeleton className="h-10 w-64 md:w-96" />
            <Skeleton className="h-6 w-48 md:w-64" />
        </div>
    </div>
);

export const SliderSkeleton = ({ count = 3 }) => (
  <div className="flex gap-6 overflow-hidden py-10 px-4 max-w-[1240px] mx-auto">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="min-w-[300px] flex-1 flex flex-col gap-4">
        <Skeleton className="w-full h-[200px] rounded-2xl" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between mt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

export const PackageDetailSkeleton = () => (
  <div className="flex flex-col w-full max-w-[95%] md:max-w-[85%] lg:max-w-[80%] mx-auto px-4 mt-24 space-y-10">
    <div className="flex flex-col md:flex-row justify-between gap-6">
      <div className="w-full md:w-2/3 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <Skeleton className="h-16 w-32 hidden md:block" />
    </div>
    <div className="flex flex-col lg:flex-row gap-8">
      <Skeleton className="w-full lg:w-2/3 h-[400px] rounded-3xl" />
      <div className="w-full lg:w-1/3 space-y-6">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <Skeleton className="w-12 h-12 rounded" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  </div>
);

export const BlogDetailSkeleton = () => (
  <div className="w-full space-y-10">
    <Skeleton className="w-full h-[400px]" />
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row gap-10">
      <div className="w-full md:w-2/3 space-y-6">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="w-full md:w-1/3 space-y-4">
        <Skeleton className="h-6 w-1/2 mb-4" />
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="w-24 h-24 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
