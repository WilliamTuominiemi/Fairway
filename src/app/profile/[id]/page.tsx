'use client';

import Navbar from '@/components/Navbar';
import Calendar from '@/components/calendar/Calendar';
import Statistics from '@/components/profile/Statistics';
import Info from '@/components/profile/Info';

import { useParams } from 'next/navigation';
import Golfbag from '@/components/profile/golfbag/Golfbag';

export default function Profile() {
  const params = useParams<{ id: string }>();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        <div>
          <div className="flex flex-col m-10 gap-12 sm:flex-row">
            <Statistics userId={params?.id} />
            <Info userId={params?.id} />
          </div>
          <Calendar userId={params?.id} />
          <Golfbag userId={params?.id} />
        </div>
      </main>
    </div>
  );
}
