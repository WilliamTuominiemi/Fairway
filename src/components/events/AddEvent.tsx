'use client';

import { useState } from 'react';

import { useEventMutation } from '@/hooks/useEventMutation';

import EventForm from '@/components/events/EventForm';

export default function AddEvent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  return (
    <div
      className="flex flex-col w-80 h-80 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black items-center justify-center"
      data-testid="add-event"
    >
      <EventForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isError={false}
        isSuccess={false}
      />
    </div>
  );
}
