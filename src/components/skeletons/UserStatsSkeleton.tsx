import BaseSkeleton from './BaseSkeleton';

export const UserStatsSkeleton = () => (
  <div className="flex flex-col md:w-100 p-5 gap-5 mb-0 bg-red-50 border-1 border-slate-500 rounded-lg text-black">
    <div className="flex flex-col gap-5">
      <BaseSkeleton className="w-full h-6" />
      <BaseSkeleton className="w-full h-6" />
      <BaseSkeleton className="w-full h-6" />
      <BaseSkeleton className="w-full h-6" />
      <BaseSkeleton className="w-full h-6" />
    </div>
    <BaseSkeleton className="w-25 h-10 self-end" />
  </div>
);
