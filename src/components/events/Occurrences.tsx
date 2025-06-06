'use client';

import { useSession } from 'next-auth/react';
import { useEvents } from '@/hooks/useEvents';

import AddEvent from '@/components/events/AddEvent';
import Occurrence from '@/components/events/Occurrence';
import ErrorMessage from '@/components/error/ErrorMessage';

import { EventsSkeleton } from '@/components/skeletons/EventsSkeleton';

export default function Occurrences() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const { isPending, error, data: events } = useEvents();
  if (isPending || isLoading) {
    return <EventsSkeleton />;
  }
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="m-5 ">
      {session && <AddEvent />}

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {events && events.length > 0 ? (
          events.map((event) => <Occurrence key={event.id} {...event} />)
        ) : (
          <p className="text-center col-span-2">No events found.</p>
        )}
      </div>
    </div>
  );
}
