import BaseSkeleton from './BaseSkeleton';

export const UserInfoSkeleton = () => (
  <div className="flex flex-col md:w-70 p-5 mb-0 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black items-center justify-center">
    <div className="flex flex-col items-center gap-5">
      <BaseSkeleton className="w-24 h-24 rounded-full" />
      <BaseSkeleton className="w-40 h-6" />
      <BaseSkeleton className="w-32 h-4" />
    </div>
  </div>
);
