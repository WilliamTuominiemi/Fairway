'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import SignInButton from './auth/SignInButton';
import SignOutButton from './auth/SignOutButton';

export default function AuthStatus() {
  const { data: session } = useSession();

  return (
    <header className="flex flex-row gap-5 h-20 items-center justify-between w-full p-4 bg-green-800 text-white">
      <Link href="/" className="text-2xl font-bold">
        Fairway
      </Link>
      <div className="flex flex-row items-center justify-end w-full">
        {session ? (
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
