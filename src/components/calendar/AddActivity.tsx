'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddActivity() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
  });

  const activityMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', errorData);
        throw new Error(`Failed to add activity: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      setFormData({ date: '' });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('Error adding activity:', error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // This is crucial to prevent the default form submission

    if (!session) {
      console.error('Please sign in to add activities');
      return;
    }

    if (!formData.date) {
      console.error('Date is required');
      return;
    }

    setIsSubmitting(true);
    activityMutation.mutate();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-4 p-5 m-5 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black">
      <h1>Add activity</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <label htmlFor="date" className="text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter date"
          max={new Date().toISOString().split('T')[0]}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
        >
          {isSubmitting ? 'Adding...' : 'Add activity'}
        </button>
      </form>

      {activityMutation.isError && (
        <div className="text-red-500 mt-2">Failed</div>
      )}

      {activityMutation.isSuccess && (
        <div className="text-green-900 text-sm">Success</div>
      )}
    </div>
  );
}
