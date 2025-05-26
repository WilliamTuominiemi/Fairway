import { useFriendRequestMutation } from '@/hooks/useFriendRequestMutation';
import { useFriendRequestButton } from '@/hooks/useFriendRequests';

import ErrorMessage from '../error/ErrorMessage';

import { AddFriendButtonSkeleton } from '@/components/skeletons/AddFriendButtonSkeleton';

export default function AddFriendButton({ userId }: { userId: string }) {
  const {
    data: button,
    isPending,
    error,
    refetch,
  } = useFriendRequestButton(userId);

  const friendRequestMutation = useFriendRequestMutation();

  if (isPending) return <AddFriendButtonSkeleton />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleAddFriend = () => {
    friendRequestMutation.mutate(userId, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <>
      {button !== 'own profile' && button !== 'friends' && (
        <button
          className="w-35 bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
          onClick={handleAddFriend}
        >
          {button === 'add'
            ? 'Add Friend'
            : button === 'cancel'
              ? 'Cancel Request'
              : button === 'accept'
                ? 'Accept Request'
                : ''}
        </button>
      )}
      {button === 'friends' && <span>You are friends</span>}
    </>
  );
}
