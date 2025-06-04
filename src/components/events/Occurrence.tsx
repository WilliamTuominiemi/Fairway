import type { Event } from '@/types/index';

export default function Occurrence(event: Event) {
  return (
    <div className="p-4 w-80 h-80 border rounded-lg shadow">
      <h2 className="text-xl font-bold">{event.type}</h2>
      <p className="text-gray-600">{event.address}</p>
      <p className="text-gray-500">
        {new Date(event.date).toLocaleDateString()} at {event.time}
      </p>
      <p className="text-gray-500">Max Participants: {event.maxParticipants}</p>
    </div>
  );
}
