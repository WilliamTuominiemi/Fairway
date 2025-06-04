import BaseSkeleton from './BaseSkeleton';

export const EventsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 m-5 gap-5">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="p-4 w-80 h-80 border rounded-lg shadow">
        <BaseSkeleton className="w-50 h-8 m-2" />
        <BaseSkeleton className="w-40 h-6 m-2" />
        <BaseSkeleton className="w-35 h-6 m-2" />
        <BaseSkeleton className="w-35 h-6 m-2" />
      </div>
    ))}
  </div>
);
