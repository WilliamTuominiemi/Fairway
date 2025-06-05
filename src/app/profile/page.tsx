'use client';

import { useSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import SignInButton from '@/components/auth/SignInButton';
import Calendar from '@/components/calendar/Calendar';
import Statistics from '@/components/profile/Statistics';
import Info from '@/components/profile/Info';
import Golfbag from '@/components/profile/golfbag/Golfbag';

import { UserStatsSkeleton } from '@/components/skeletons/UserStatsSkeleton';
import { UserInfoSkeleton } from '@/components/skeletons/UserInfoSkeleton';
import { CalendarSkeleton } from '@/components/skeletons/CalendarSkeleton';

export default function Profile() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        {isLoading ? (
          <div>
            <div className="flex flex-col m-10 gap-12 sm:flex-row">
              <UserStatsSkeleton />
              <UserInfoSkeleton />
            </div>
            <CalendarSkeleton />
          </div>
        ) : session ? (
          <div>
            <div className="flex flex-col m-10 gap-12 sm:flex-row">
              <Statistics />
              <Info />
            </div>
            <div className="m-10">
              <Calendar />
            </div>
            <Golfbag />
          </div>
        ) : (
          <>
            <h1 className="text-4xl p-5">Sign in to see your activities...</h1>
            <SignInButton />
          </>
        )}
      </main>
    </div>
  );
}
