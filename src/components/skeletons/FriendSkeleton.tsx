import BaseSkeleton from './BaseSkeleton';

export const FriendSkeleton = () => (
  <div className="flex flex-row gap-3 items-center p-4">
    <BaseSkeleton className="w-10 h-10 rounded-full" />
    <BaseSkeleton className="w-50 h-6" />
  </div>
);
