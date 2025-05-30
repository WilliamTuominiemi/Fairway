import Image from 'next/image';
import Link from 'next/link';

import { useUserById } from '@/hooks/useUsers';

import ErrorMessage from '@/components/error/ErrorMessage';

import { FriendSkeleton } from '@/components/skeletons/FriendSkeleton';

export default function FriendRequestItem({ userId }: { userId: string }) {
  const { isPending, error, data: user } = useUserById(userId);

  if (isPending) return <FriendSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="flex items-center justify-between p-3 ">
      <Link
        href={`/profile/${userId}`}
        className="flex items-center hover:scale-105 transition-transform duration-75"
      >
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full mr-2"
        />
        <span className="text-lg font-semibold">{user.name}</span>
      </Link>
    </div>
  );
}
