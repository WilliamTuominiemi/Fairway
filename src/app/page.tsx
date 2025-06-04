'use client';

import { useState } from 'react';

import { useUsers } from '@/hooks/useUsers';

import Navbar from '@/components/Navbar';
import Feed from '@/components/feed/Feed';
import Occurrences from '@/components/events/Occurrences';
import ErrorMessage from '@/components/error/ErrorMessage';
import FeedSelector from '@/components/common/FeedSelector';

import { FeedSkeleton } from '@/components/skeletons/FeedSkeleton';

const Home = () => {
  const { isPending, error, data: users } = useUsers();

  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen">
      <Navbar />
      <FeedSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex flex-col items-center sm:items-start">
        {isPending && <FeedSkeleton />}
        {error && <ErrorMessage message={error.message} />}
        {users && activeTab === 'users' && <Feed users={users} />}
        {activeTab === 'events' && <Occurrences />}
      </main>
    </div>
  );
};

export default Home;
