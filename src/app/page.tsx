'use client';

import { useUsers } from '@/hooks/useUsers';

import Navbar from '@/components/Navbar';
import Feed from '@/components/feed/Feed';
import ErrorMessage from '@/components/error/ErrorMessage';

import { FeedSkeleton } from '@/components/skeletons/FeedSkeleton';

const Home = () => {
  const { isPending, error, data: users } = useUsers();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        {isPending && <FeedSkeleton />}
        {error && <ErrorMessage message={error.message} />}
        {users && <Feed users={users} />}
      </main>
    </div>
  );
};

export default Home;
