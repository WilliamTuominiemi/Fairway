'use client';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Entry from '@/components/feed/Entry';
import { User } from '@/types/index';

import { FeedSkeleton } from '@/components/skeletons/FeedSkeleton';

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch(`/api/users/`).then((res) => res.json()),
  });

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        {isPending ? (
          <FeedSkeleton />
        ) : error ? (
          <h1 className="text-4xl p-5 text-red-500">Error: {error.message}</h1>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {data &&
              data.map((user: User) => (
                <div key={user.id}>
                  <Entry user={user} />
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
