import BaseSkeleton from './BaseSkeleton';

export const EventsSkeleton = () => (
  <div className="m-5">
    <BaseSkeleton className="w-25 h-14" />

    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="p-4 w-80 h-60 bg-emerald-50 border rounded-lg shadow justify-between flex flex-col"
        >
          <BaseSkeleton className="w-50 h-8 m-2" />
          <BaseSkeleton className="w-40 h-6 m-2" />
          <BaseSkeleton className="w-35 h-6 m-2" />
          <BaseSkeleton className="w-35 h-6 m-2" />
        </div>
      ))}
    </div>
  </div>
);
