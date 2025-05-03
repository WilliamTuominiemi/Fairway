
import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button onClick={() => signIn("google")} className="ml-5 bg-emerald-50 hover:bg-emerald-100 active:scale-95 p-2 rounded-md text-green-900 transition-transform duration-75">Sign in with Google</button>
}
