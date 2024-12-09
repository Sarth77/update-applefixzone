import React from "react";

const Loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Products Title Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 h-[400px] flex flex-col gap-4"
            >
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-200 rounded-lg animate-pulse"></div>

              {/* Title Skeleton */}
              <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>

              {/* Price Skeleton */}
              <div className="h-6 w-1/4 bg-gray-200 rounded animate-pulse"></div>

              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Add to Cart Button Skeleton */}
              <div className="mt-auto flex justify-between items-center">
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
