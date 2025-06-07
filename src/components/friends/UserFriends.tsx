import { useUserFriends } from '@/hooks/useUserFriends';

import ErrorMessage from '@/components/error/ErrorMessage';
import { UserFriendsSkeleton } from '@/components/skeletons/UserFriendsSkeleton';
import Friend from '@/components/friends/Friend';

const UserFriends = ({ userId }: { userId: string }) => {
  const { isPending, error, data: friends } = useUserFriends(userId);
  if (isPending) {
    return <UserFriendsSkeleton />;
  }
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <h1 className="text-3xl m-2">Friends</h1>

      <div className="flex flex-col md:w-70 h-66 p-5 mb-0 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black justify-start overflow-y-auto">
        {friends && friends.length > 0 ? (
          friends.map((friend) => <Friend key={friend.id} userId={friend.id} />)
        ) : (
          <p className="text-center m-5">No friends yet</p>
        )}
      </div>
    </div>
  );
};

export default UserFriends;
