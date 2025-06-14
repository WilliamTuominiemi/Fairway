'use client';

import { useState } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
          <div className="relative">
            <button
              className="flex flex-row items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              data-testid="navbar-username"
            >
              <p>{session.user?.name}</p>
              <Image
                src={session.user?.image || ''}
                alt="User Image"
                width={35}
                height={35}
                className="rounded-full ml-2"
              ></Image>
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-7 m-3 p-2 w-30 bg-white text-black rounded-lg shadow-xl border-1 border-green-700 flex flex-col items-center gap-3 z-50"
                data-testid="dropdown-menu"
                style={{ zIndex: 9999 }}
              >
                <Link href="/profile">
                  <p className="text-xl hover:underline">Profile</p>
                </Link>
                <Link href="/friends">
                  <p className="text-xl hover:underline">Friends</p>
                </Link>
                <Link href="/profile/settings">
                  <p className="text-xl hover:underline">Settings</p>
                </Link>
                <SignOutButton />
              </div>
            )}
          </div>
        ) : (
          <>
            <SignInButton />
          </>
        )}
      </div>
    </header>
  );
}
