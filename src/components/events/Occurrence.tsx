import type { Event } from '@/types/index';

import Participants from '@/components/events/Participants';

export default function Occurrence(event: Event) {
  return (
    <div className="p-4 w-80 h-80 border rounded-lg shadow justify-between flex flex-col">
      <div>
        <h2 className="text-xl font-bold">{event.type}</h2>
        <p className="text-gray-600">{event.address}</p>
        <p className="text-gray-500">
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </p>
        <p className="text-gray-500">
          Max Participants: {event.maxParticipants}
        </p>
      </div>
      <Participants
        eventId={event.id}
        maxParticipants={event.maxParticipants}
      />
    </div>
  );
}
