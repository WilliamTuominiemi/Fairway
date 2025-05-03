
"use client"

import { signOut } from "next-auth/react"
 
export default function SignOut() {
  return <button onClick={() => signOut()} className="pr-5">Sign out</button>
}
