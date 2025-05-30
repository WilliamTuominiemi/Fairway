import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import { useUserById } from '@/hooks/useUsers';

import { FriendSkeleton } from '@/components/skeletons/FriendSkeleton';

import {
  useAcceptFriendRequestMutation,
  useCancelFriendRequestMutation,
} from '@/hooks/useFriendRequestMutation';

export default function FriendRequestItem({
  userId,
  type,
}: {
  userId: string;
  type: 'incoming' | 'outgoing';
}) {
  const { data: user, isPending, error } = useUserById(userId);
  const acceptFriendRequestMutation = useAcceptFriendRequestMutation();
  const cancelFriendRequestMutation = useCancelFriendRequestMutation();

  const [buttonText, setButtonText] = useState(
    type === 'outgoing' ? 'Cancel' : 'Accept',
  );

  const handleAccept = () => {
    acceptFriendRequestMutation.mutate(userId, {
      onSuccess: () => {
        setButtonText('Accepted');
      },
    });
  };
  const handleCancel = () => {
    cancelFriendRequestMutation.mutate(userId, {
      onSuccess: () => {
        setButtonText('Cancelled');
      },
    });
  };

  if (isPending) return <FriendSkeleton />;
  if (error) return <p>Error loading user: {error.message}</p>;

  return (
    <div className="flex items-center justify-between p-4">
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
      {type === 'incoming' ? (
        <button
          className="w-25 self-end bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-700 disabled:active:scale-100"
          onClick={handleAccept}
          disabled={
            buttonText === 'Accepted' || acceptFriendRequestMutation.isPending
          }
        >
          {buttonText}
        </button>
      ) : (
        <button
          className="w-25 self-end bg-red-700 hover:bg-red-900 active:scale-95 ml-2 p-2 rounded-md text-emerald-50 transition-transform duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-700 disabled:active:scale-100"
          onClick={handleCancel}
          disabled={
            buttonText === 'Cancelled' || cancelFriendRequestMutation.isPending
          }
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
