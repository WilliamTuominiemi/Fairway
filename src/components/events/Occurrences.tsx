'use client';

import { useSession } from 'next-auth/react';
import { useEvents } from '@/hooks/useEvents';

import AddEvent from '@/components/events/AddEvent';
import Occurrence from '@/components/events/Occurrence';
import ErrorMessage from '@/components/error/ErrorMessage';

export default function Occurrences() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const { isPending, error, data: events } = useEvents();
  if (isPending || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Loading events...</p>
      </div>
    );
  }
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-5 gap-5">
      {session && <AddEvent />}
      {events && events.length > 0 ? (
        events.map((event) => <Occurrence key={event.id} {...event} />)
      ) : (
        <p className="text-center col-span-2">No events found.</p>
      )}
    </div>
  );
}
