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
