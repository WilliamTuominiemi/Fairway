import { signOut } from 'next-auth/react';

const SignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-emerald-50 hover:bg-emerald-100 border-1 border-green-900 active:scale-95 p-2 rounded-md text-green-900 transition-transform duration-75"
      data-testid="sign-out-button"
    >
      Sign out
    </button>
  );
};

export default SignOut;
