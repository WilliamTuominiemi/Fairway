import { signIn } from 'next-auth/react';

const SignIn = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className="ml-5 bg-emerald-50 hover:bg-emerald-100 border-1 border-green-900 active:scale-95 p-2 rounded-md text-green-900 transition-transform duration-75"
    >
      Sign in with Google
    </button>
  );
};

export default SignIn;
