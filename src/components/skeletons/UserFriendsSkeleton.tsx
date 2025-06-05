import BaseSkeleton from './BaseSkeleton';

export const UserFriendsSkeleton = () => (
  <div className="flex flex-col md:w-70 h-66 p-5 mb-0 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black items-center justify-start overflow-y-auto">
    {[...Array(5)].map((_, index) => (
      <BaseSkeleton
        key={index}
        className="w-full h-10 mb-2 bg-gray-200 rounded"
        data-testid="loading-skeleton"
      />
    ))}
  </div>
);
