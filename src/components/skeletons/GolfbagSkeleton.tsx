import BaseSkeleton from './BaseSkeleton';

export const GolfbagSkeleton = () => (
  <div className="grid md:grid-cols-4 m-10 gap-4">
    {[...Array(8)].map((_, index) => (
      <div
        key={index}
        className="flex flex-col w-42 gap-4 p-5 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black"
      >
        <BaseSkeleton className="w-15 h-4" />
        <BaseSkeleton className="w-22 h-5" />
        <BaseSkeleton className="w-25 h-5" />
      </div>
    ))}
  </div>
);
