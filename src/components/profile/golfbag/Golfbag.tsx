import { useGolfclubs } from '@/hooks/useGolfclubs';

import GolfclubInBag from '@/components/profile/golfbag/GolfclubInBag';
import AddGolfclub from '@/components/profile/golfbag//AddGolfclub';
import ErrorMessage from '@/components/error/ErrorMessage';

import { GolfbagSkeleton } from '@/components/skeletons/GolfbagSkeleton';

import { Golfclub } from '@/types/index';

export default function Golfbag({ userId }: { userId?: string | null }) {
  const myProfile = !userId;

  const { isPending, error, data } = useGolfclubs(userId || '');

  if (isPending) return <GolfbagSkeleton />;
  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;

  return (
    <div className="grid md:grid-cols-4 m-10 gap-4" data-testid="golfbag">
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
