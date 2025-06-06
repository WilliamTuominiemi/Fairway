import Image from 'next/image';
import Link from 'next/link';

import { User } from '@/types/index';

import { useSession } from 'next-auth/react';
import { useParticipants } from '@/hooks/useParticipants';
import { useJoinMutation } from '@/hooks/useJoinMutation';

import ErrorMessage from '@/components/error/ErrorMessage';
import { ParticipantsSkeleton } from '@/components/skeletons/ParticipantsSkeleton';

interface ParticipantsProps {
  maxParticipants: number;
  eventId: string;
}

const Participants = ({ maxParticipants, eventId }: ParticipantsProps) => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const { isPending, error, data: Participants } = useParticipants(eventId);
  const joinMutation = useJoinMutation(eventId);

  const spotsLeft = maxParticipants - (Participants ? Participants.length : 0);

  const addParticipant = () => {
    joinMutation.mutate();
  };

  if (isPending || isLoading) {
    return <ParticipantsSkeleton />;
  }
  if (error) {
    return <ErrorMessage message="Failed to load participants" />;
  }

  return (
    <div className="flex flex-row flex-wrap gap-2" data-testid="participants">
      {Participants &&
        Participants.length > 0 &&
        Participants.map((participant: User) => (
          <Link key={participant.id} href={`/profile/${participant.id}`}>
            <Image
              className="rounded-full"
              key={participant.id}
              src={participant.image}
              alt={participant.name}
              width={48}
              height={48}
              data-testid={`participant-${participant.id}`}
            ></Image>
          </Link>
        ))}
      {spotsLeft &&
        spotsLeft > 0 &&
        Array.from({ length: spotsLeft }, (_, index) => (
          <div
            className="w-12 h-12 border-4 border-r-6 border-dashed rounded-full border-gray-500 flex items-center justify-center"
            key={index}
            data-testid="empty-participant"
          >
            {index === 0 && session && (
              <button
                onClick={addParticipant}
                className="text-2xl font-bold text-gray-500"
                data-testid="add-participant-button"
              >
                +
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Participants;
