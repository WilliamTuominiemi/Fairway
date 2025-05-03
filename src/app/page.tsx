'use client'

import { useSession } from "next-auth/react"

import Navbar from "@/components/Navbar";
import AddActivity from "@/components/calendar/AddActivity";
import Calendar from "@/components/calendar/Calendar";

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex flex-col items-center sm:items-start">
          <h1 className="text-4xl">Fairway</h1>
          <p className="text-lg">Golf activity tracker</p>
        {session ? (
          <>
            <AddActivity />
            <Calendar />
          </>
        ) : (
          <>
              Sign in to see your activities...
          </>
      )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        William Tuominiemi 2025
      </footer>
    </div>
  );
}
