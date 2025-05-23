'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SignInButton from '@/components/auth/SignInButton';
import SignOutButton from '@/components/auth/SignOutButton';

import favicon from '@/../public/inlinesvg/favicon.svg';

import { NavbarSkeleton } from '@/components/skeletons/NavbarSkeleton';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <header
      className="flex flex-row gap-5 h-20 items-center justify-between w-full p-4 bg-green-800 text-white"
      data-testid="navbar"
    >
      <Link href="/" className="text-2xl font-bold flex flex-row">
        <Image
          src={favicon}
          alt="Fairway Logo"
          width={25}
          height={25}
          className="rounded-full mr-2"
        />
        Fairway
      </Link>
      <div className="flex flex-row items-center justify-end w-full">
        {isLoading ? (
          <NavbarSkeleton />
        ) : session ? (
          <>
            <SignOutButton />
            <Link href="/profile" className="flex flex-row items-center">
              <p>{session.user?.name}</p>
              <Image
                src={session.user?.image || ''}
                alt="User Image"
                width={35}
                height={35}
                className="rounded-full ml-2"
              ></Image>
            </Link>
          </>
        ) : (
          <>
            <SignInButton />
          </>
        )}
      </div>
    </header>
  );
}
