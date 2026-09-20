import React from 'react';

export const ViewSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse pb-16">
      {/* Header skeleton */}
      <div className="space-y-3 border-b border-[#E2DDD3] pb-6">
        <div className="h-4 w-36 bg-[#E2DDD3]/60 rounded" />
        <div className="h-10 w-72 bg-[#E2DDD3] rounded-lg" />
        <div className="h-4 w-96 bg-[#E2DDD3]/50 rounded" />
      </div>

      {/* Grid cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div
            key={i}
            className="h-48 rounded-2xl bg-[#EFEAE0]/50 border border-[#E2DDD3] p-6 space-y-4"
          >
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-[#E2DDD3] rounded" />
              <div className="h-4 w-16 bg-[#E2DDD3]/60 rounded" />
            </div>
            <div className="h-6 w-3/4 bg-[#E2DDD3] rounded" />
            <div className="h-12 w-full bg-[#E2DDD3]/40 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
