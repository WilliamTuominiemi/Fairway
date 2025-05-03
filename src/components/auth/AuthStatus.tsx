'use client'

import { useSession } from "next-auth/react"
import SignInButton from './SignInButton'
import SignOutButton from './SignOutButton'

export default function AuthStatus() {
    const { data: session } = useSession()

    return (
        <div>
            {session ? (
                <div>
                    <p>Signed in as {session.user?.email}</p>
                    <SignOutButton />
                </div>
            ) : (
                <div>
                    <p>Not signed in</p>
                    <SignInButton />
                </div>
            )}
        </div>
    )
}