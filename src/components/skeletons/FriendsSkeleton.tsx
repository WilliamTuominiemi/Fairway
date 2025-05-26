import BaseSkeleton from './BaseSkeleton';

export const FriendsSkeleton = () => (
  <div className="grid grid-cols-1 gap-10 p-3">
    {[...Array(2)].map((_, index) => (
      <div key={index} className="flex flex-col gap-5">
        <BaseSkeleton className="w-70 h-8" />
        <div className="flex flex-row gap-3 items-center">
          <BaseSkeleton className="w-10 h-10 rounded-full" />
          <BaseSkeleton className="w-50 h-6" />
        </div>
        <div className="flex flex-row gap-3 items-center">
          <BaseSkeleton className="w-10 h-10 rounded-full" />
          <BaseSkeleton className="w-50 h-6" />
        </div>
      </div>
    ))}
  </div>
);
