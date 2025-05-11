import BaseSkeleton from './BaseSkeleton';

export const FeedSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 p-5">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="flex flex-col gap-5">
        <div className="flex flex-row gap-3 items-center px-2">
          <BaseSkeleton className="w-8 h-8 rounded-full" />
          <BaseSkeleton className="w-30 h-6" />
        </div>
        <BaseSkeleton className="w-55 h-35" />
      </div>
    ))}
  </div>
);
