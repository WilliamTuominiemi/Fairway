
"use client"

import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button onClick={() => signIn("google")} className="pl-5">Sign in with google</button>
}
