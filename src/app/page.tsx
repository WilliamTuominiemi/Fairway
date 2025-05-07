'use client';

import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
        <h1>Feed</h1>
      </main>
    </div>
  );
}
