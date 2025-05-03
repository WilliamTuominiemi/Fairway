'use client'

import Image from "next/image"
import { useSession } from "next-auth/react"
import SignInButton from './auth/SignInButton'
import SignOutButton from './auth/SignOutButton'

export default function AuthStatus() {
    const { data: session } = useSession()

    return (
        <header className="flex flex-row gap-5 h-20 items-center justify-between w-full p-4 bg-green-800 text-white">
            <h1 className="text-2xl font-bold">
                Fairway
            </h1>
            <div className="flex flex-row items-center justify-end w-full">
                {session ? (
                    <>
                        <SignOutButton />

                        <p>{session.user?.name}</p>

                        <Image
                            src={session.user?.image || ''}
                            alt="User Image"
                            width={35}
                            height={35}
                            className="rounded-full ml-2">
                        </Image>
                    </>
                ) : (
                    <>
                        <SignInButton />
                    </>
                )}
            </div>
            
        </header>
    )
}