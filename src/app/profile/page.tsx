'use client';

import { useSession } from 'next-auth/react';

import Navbar from '@/components/Navbar';
import SignInButton from '@/components/auth/SignInButton';
import Calendar from '@/components/calendar/Calendar';
import Stats from '@/components/profile/Stats';

export default function Profile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        {session ? (
          <>
            <Stats />
            <Calendar />
          </>
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
