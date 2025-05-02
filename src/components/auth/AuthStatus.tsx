'use client'

import { useSession } from 'next-auth/react'
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

export default function AuthStatus() {
    const { data: session, status } = useSession()

    if (status === 'loading') {
        return <div>Loading...</div>
    }

    return (
        <div>
            {session ? (
                <div>
                    <p>Welcome, {session.user?.name}</p>
                    <SignOutButton />
                </div>
            ) : (
                <SignInButton />
            )}
        </div>
    )
}