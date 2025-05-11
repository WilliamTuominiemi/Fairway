import BaseSkeleton from './BaseSkeleton';

export const NavbarSkeleton = () => (
  <div className="flex flex-row items-center gap-2 m-2">
    <BaseSkeleton className="w-15 h-7" />
    <BaseSkeleton className="w-25 h-7" />
    <BaseSkeleton className="w-8 h-8 rounded-full" />
  </div>
);
