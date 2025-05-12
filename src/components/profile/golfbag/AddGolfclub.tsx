'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddGolfclub() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  const clubMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/golfbag/club', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server response:', errorData);
        throw new Error(`Failed to add golfclub: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['golfclubs'] });
      setFormData({
        name: '',
        type: '',
      });
      setIsSubmitting(false);
    },
    onError: (error) => {
      console.error('Error adding golfclub:', error);
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      console.error('Please sign in to add golfclubs');
      return;
    }

    setIsSubmitting(true);
    clubMutation.mutate();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col w-42 gap-4 p-5 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          id="name"
          type="text"
          placeholder="Golfclub Name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 border border-slate-500 rounded-lg"
        />
        <select
          id="type"
          className="p-2 border border-slate-500 rounded-lg"
          value={formData.type || ''}
          onChange={handleChange}
          required
        >
          <option value="">Select type</option>
          <option value="Driver">Driver</option>
          <option value="Wood">Wood</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Iron">Iron</option>
          <option value="Wedge">Wedge</option>
          <option value="Putter">Putter</option>
        </select>
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
        >
          {isSubmitting ? 'Adding...' : 'Add Golfclub'}
        </button>
      </form>
    </div>
  );
}
