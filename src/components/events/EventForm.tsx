'use client';

import { useForm } from '@/hooks/useForm';

import ErrorMessage from '@/components/error/ErrorMessage';

interface EventFormProps {
  onSubmit: (formData: {
    date: string;
    type: string;
    address: string;
    time: string;
    maxParticipants: number;
  }) => void;
  isSubmitting: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export default function EventForm({
  onSubmit,
  isSubmitting,
  isError,
  isSuccess,
}: EventFormProps) {
  const { formData, handleChange, handleReset } = useForm({
    date: '',
    type: '',
    address: '',
    time: '',
    maxParticipants: 1,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    handleReset();
  };

  return (
    <form
      className="flex flex-col gap-2"
      data-testid="event-form"
      onSubmit={handleSubmit}
    >
      <select
        id="type"
        value={formData.type}
        onChange={handleChange}
        className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        data-testid="type-select"
      >
        <option value="">Select type</option>
        <option value="18-hole round">18-hole round</option>
        <option value="9-hole round">9-hole round</option>
        <option value="driving range">Driving range</option>
        <option value="simulator">Simulator</option>
        <option value="putting practice">Putting practice</option>
        <option value="par-3 course">Par-3 course</option>
        <option value="mini golf">Mini golf</option>
        <option value="other">Other</option>
      </select>
      <input
        type="text"
        id="address"
        required
        value={formData.address}
        onChange={handleChange}
        className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter address"
        data-testid="address-input"
      />
      <input
        type="date"
        id="date"
        required
        value={formData.date}
        onChange={handleChange}
        className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter date"
        min={new Date().toISOString().split('T')[0]}
        data-testid="date-input"
      />
      <input
        type="time"
        id="time"
        value={formData.time}
        onChange={handleChange}
        className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter time"
        data-testid="time-input"
        required
      />
      <input
        type="number"
        id="maxParticipants"
        value={formData.maxParticipants}
        min="1"
        max="10"
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value)) {
            const validValue = Math.min(Math.max(value, 1), 10);
            e.target.value = validValue.toString();
          }
          handleChange(e);
        }}
        className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Max participants"
        data-testid="max-participants-input"
        required
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
        data-testid="add-event-button"
      >
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </button>

      {isError && (
        <ErrorMessage message="Failed to create event. Please try again."></ErrorMessage>
      )}
      {isSuccess && (
        <div className="text-green-900 text-sm" data-testid="success-message">
          Created succesfully
        </div>
      )}
    </form>
  );
}
