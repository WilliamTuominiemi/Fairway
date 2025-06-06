import BaseSkeleton from './BaseSkeleton';

export const ParticipantsSkeleton = () => (
  <div className="flex flex-row flex-wrap gap-2">
    <BaseSkeleton className="w-12 h-12 rounded-full" />
    <BaseSkeleton className="w-12 h-12 rounded-full" />
    <BaseSkeleton className="w-12 h-12 rounded-full" />
    <BaseSkeleton className="w-12 h-12 rounded-full" />
  </div>
);
