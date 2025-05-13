import { useQuery } from '@tanstack/react-query';

import Golfclub from './Golfclub';
import AddGolfclub from './AddGolfclub';

import { GolfbagSkeleton } from '@/components/skeletons/GolfbagSkeleton';

interface Golfclub {
  id: string;
  userId: string;
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function Golfbag({ userId }: { userId?: string | null }) {
  const myProfile = !userId;

  const queryKey = ['golfclubs', userId ?? 'self'];

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () =>
      fetch(`/api/golfbag/club?userId=${userId ?? ''}`).then((res) =>
        res.json(),
      ),
  });

  if (isPending) return <GolfbagSkeleton />;
  if (error)
    return (
      <div className="flex gap-4 m-5 text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="grid md:grid-cols-4 m-10 gap-4">
      {myProfile && <AddGolfclub />}
      {data.map((club: Golfclub) => (
        <Golfclub
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
