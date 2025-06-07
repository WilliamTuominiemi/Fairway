'use client';

import { useState } from 'react';

import { useEventMutation } from '@/hooks/useEventMutation';

import EventForm from '@/components/events/EventForm';

import NewEventButton from '@/components/events/NewEventButton';

export default function AddEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newEventMenuOpen, setNewEventMenuOpen] = useState(false);

  const handleSuccess = () => {
    setIsSubmitting(false);
  };

  const handleError = () => {
    setIsSubmitting(false);
  };

  const eventMutation = useEventMutation(handleSuccess, handleError);

  const handleSubmit = (formData: {
    date: string;
    type: string;
    address: string;
    time: string;
    maxParticipants: number;
  }) => {
    setIsSubmitting(true);
    eventMutation.mutate(formData);
    setNewEventMenuOpen(false);
  };

  const handleNewEventButtonClick = () => {
    setNewEventMenuOpen(!newEventMenuOpen);
  };

  return (
    <>
      {!newEventMenuOpen ? (
        <NewEventButton handleNewEventButtonClick={handleNewEventButtonClick} />
      ) : (
        <div
          className="flex flex-col md:w-90 h-90 bg-red-50 border-1 border-slate-500 rounded-lg text-black items-center justify-center"
          data-testid="add-event"
        >
          <EventForm
            onSubmit={handleSubmit}
            onCancel={handleNewEventButtonClick}
            isSubmitting={isSubmitting}
            isError={false}
            isSuccess={false}
          />
        </div>
      )}
    </>
  );
}
