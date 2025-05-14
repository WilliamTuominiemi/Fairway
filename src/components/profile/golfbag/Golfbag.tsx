import { useGolfclubs } from '@/hooks/useGolfclubs';

import GolfclubInBag from '@/components/profile/golfbag/GolfclubInBag';
import AddGolfclub from '@/components/profile/golfbag//AddGolfclub';

import { GolfbagSkeleton } from '@/components/skeletons/GolfbagSkeleton';

import { Golfclub } from '@/types/index';

export default function Golfbag({ userId }: { userId?: string | null }) {
  const myProfile = !userId;

  const { isPending, error, data } = useGolfclubs(userId || '');

  if (isPending) return <GolfbagSkeleton />;
  if (error)
    return (
      <div className="flex gap-4 m-5 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="grid md:grid-cols-4 m-10 gap-4">
      {myProfile && <AddGolfclub />}
      {data.map((club: Golfclub) => (
        <GolfclubInBag
          key={club.id}
          id={club.id}
          type={club.type}
          name={club.name}
          myprofile={myProfile}
        />
      ))}
    </div>
  );
}
