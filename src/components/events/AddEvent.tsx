'use client';

import { useState } from 'react';

import { useEventMutation } from '@/hooks/useEventMutation';

import EventForm from '@/components/events/EventForm';

import Icon from '@/components/common/svgIcon';

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
        <button
          className="w-35 flex flex-row justify-between bg-green-700 hover:bg-green-900 active:scale-95 p-4 rounded-md text-emerald-50 transition-transform duration-75"
          onClick={() => handleNewEventButtonClick()}
          data-testid="add-event-button"
        >
          New Event
          <Icon iconName="golf"></Icon>
        </button>
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
