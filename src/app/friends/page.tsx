'use client';

import { useSession } from 'next-auth/react';

import { useFriendRequests } from '@/hooks/useFriendRequests';
import { useFriends } from '@/hooks/useFriends';

import Navbar from '@/components/Navbar';
import SignInButton from '@/components/auth/SignInButton';
import FriendRequestItem from '@/components/friends/FriendRequest';
import Friend from '@/components/friends/Friend';

import { FriendsSkeleton } from '@/components/skeletons/FriendsSkeleton';

export default function Friends() {
  const { data: session, status } = useSession();
  const { incoming, outgoing } = useFriendRequests();
  const { data: friends } = useFriends();

  const isLoading =
    status === 'loading' || incoming.isPending || outgoing.isPending;

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        {isLoading ? (
          <FriendsSkeleton />
        ) : session ? (
          <div>
            <div>
              {incoming.data && incoming.data.length > 0 && (
                <>
                  <h1 className="text-2xl p-2">
                    Incoming friend requests: {incoming.data?.length}
                  </h1>
                  {incoming.data.map((request, index) => (
                    <FriendRequestItem
                      userId={request.senderId}
                      type="incoming"
                      key={index}
                    />
                  ))}
                </>
              )}
            </div>

            <div>
              {outgoing.data && outgoing.data.length > 0 && (
                <>
                  <h1 className="text-2xl p-2">
                    Outgoing friend requests: {outgoing.data?.length}
                  </h1>
                  {outgoing.data.map((request, index) => (
                    <FriendRequestItem
                      userId={request.receiverId}
                      type="outgoing"
                      key={index}
                    />
                  ))}
                </>
              )}
            </div>
            <div>
              {friends && friends.length > 0 ? (
                <>
                  <h1 className="text-2xl p-2">Friends: {friends.length}</h1>
                  {friends.map((friend) => (
                    <Friend key={friend.id} userId={friend.id} />
                  ))}
                </>
              ) : (
                <p className="text-lg p-2">
                  You don&apos;t have any friends yet. Find some friends on the
                  feed!
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl p-5">Sign in to see your friends...</h1>
            <SignInButton />
          </>
        )}
      </main>
    </div>
  );
}
