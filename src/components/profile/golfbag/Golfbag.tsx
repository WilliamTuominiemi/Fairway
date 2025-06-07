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
    <div className="m-10">
      <h1 className="text-3xl m-2">Golfbag</h1>
      <div
        className="grid md:grid-cols-4 grid-cols-1 justify-items-center gap-4"
        data-testid="golfbag"
      >
        {myProfile && <AddGolfclub />}
        {data.length === 0 ? (
          <div className="my-4">
            <p className="text-lg text-gray-500">Empty bag</p>
          </div>
        ) : (
          data.map((club: Golfclub) => (
            <GolfclubInBag
              key={club.id}
              id={club.id}
              type={club.type}
              name={club.name}
              myprofile={myProfile}
            />
          ))
        )}
      </div>
    </div>
  );
}
