import Image from 'next/image';

import { useUserById } from '@/hooks/useUsers';

import ErrorMessage from '../error/ErrorMessage';

export default function FriendRequestItem({ userId }: { userId: string }) {
  const { data: user, isPending, error } = useUserById(userId);

  if (isPending) return <p>Loading...</p>;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center">
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full mr-4"
        />
        <span className="text-lg font-semibold">{user.name}</span>
      </div>
    </div>
  );
}
