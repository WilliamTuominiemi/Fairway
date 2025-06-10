'use client';

import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import { signOut } from 'next-auth/react';
import SignInButton from '@/components/auth/SignInButton';
import { useDeleteAccountMutation } from '@/hooks/useDeleteAccountMutation';

export default function Settings() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const deleteAccountMutation = useDeleteAccountMutation();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.',
    );
    if (!confirmed) return;

    try {
      signOut({ callbackUrl: '/' });
      await deleteAccountMutation.mutateAsync();
      alert('Your account has been deleted successfully.');
    } catch (error) {
      console.error('Failed to delete account:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        {isLoading ? (
          <h1 className="text-4xl p-5">Loading...</h1>
        ) : session ? (
          <div className="m-10">
            <h1 className="text-4xl">Settings</h1>

            <p className="text-lg mt-5">
              Delete your account, this will remove all data dependent on it
              (your activities, events, friendships, etc. ). This action is
              irreversible.
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="w-35 bg-amber-700 hover:bg-amber-900 active:scale-95 p-2 rounded-md text-red-50 transition-transform duration-75"
              data-testid="cancel-button"
            >
              Delete my account
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-4xl p-5">Sign in to access settings...</h1>
            <SignInButton />
          </>
        )}
      </main>
    </div>
  );
}
