import React from 'react';

export const Skeleton = ({ className = '', ...props }) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-neutral-200 dark:bg-neutral-800 ${className}`}
      {...props}
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-3xl border border-neutral-200 dark:border-neutral-800 p-4 gap-3 bg-white dark:bg-neutral-900">
      <Skeleton className="w-full h-56 rounded-2xl" />
      <div className="flex justify-between items-center mt-1">
        <Skeleton className="w-20 h-4 rounded-lg" />
        <Skeleton className="w-12 h-4 rounded-lg" />
      </div>
      <Skeleton className="w-3/4 h-5 rounded-lg" />
      <div className="flex justify-between items-center mt-2">
        <Skeleton className="w-24 h-6 rounded-lg" />
        <Skeleton className="w-10 h-8 rounded-full" />
      </div>
    </div>
  );
};
