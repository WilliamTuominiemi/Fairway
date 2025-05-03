import { signOut } from "next-auth/react"
 
export default function SignOut() {
  return <button onClick={() => signOut()} 
    className="mr-5 bg-emerald-50 hover:bg-emerald-100 active:scale-95 p-2 rounded-md text-green-900 transition-transform duration-75">Sign out</button>
}
