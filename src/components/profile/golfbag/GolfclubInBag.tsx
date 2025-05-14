import { useEffect, useState } from 'react';

import { useForm } from '@/hooks/useForm';
import { useUpdateGolfClubMutation } from '@/hooks/useGolfclubMutation';

interface GolfclubProps {
  id: string;
  type: string;
  name: string;
  myprofile?: boolean;
}

export default function GolfclubInBag({
  id,
  type,
  name,
  myprofile,
}: GolfclubProps) {
  const [editing, setEditing] = useState(false);
  const { formData, handleChange, setFormData } = useForm({
    name: name,
    type: type,
  });

  const updateMutation = useUpdateGolfClubMutation();

  const toggleEdit = () => {
    setEditing(!editing);
    if (editing) {
      updateMutation.mutate({ id, data: formData });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    setFormData({
      name: name,
      type: type,
    });
  }, [name, type, setFormData]);

  return (
    <div
      className={`group flex flex-col w-42 h-45 p-4 ${editing ? 'bg-emerald-200' : 'bg-emerald-50'} border border-slate-500 rounded-lg text-black hover:bg-emerald-100 transition-colors duration-200`}
    >
      {editing ? (
        <form onSubmit={handleSubmit} className="flex-1 space-y-2 min-h-0">
          <select
            id="type"
            className="p-2 w-full border bg-white border-slate-500 rounded-lg"
            value={formData.type}
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
          <input
            id="name"
            type="text"
            placeholder="Golfclub Name"
            value={formData.name}
            maxLength={50}
            onChange={handleChange}
            className="p-2 w-full text-sm border bg-white border-slate-500 rounded-lg"
          />
        </form>
      ) : (
        <div className="flex-1 space-y-2 min-h-0">
          <h1 className="text-xl font-medium truncate">{formData.type}</h1>
          <p className="text-sm text-gray-700">{formData.name}</p>
        </div>
      )}

      {myprofile && (
        <div
          className={`mt-2 flex justify-end ${editing ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-150`}
        >
          <button
            type="button"
            className="w-25 self-end bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
            onClick={toggleEdit}
          >
            {editing ? 'Done' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
}
