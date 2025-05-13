import { useState } from 'react';

interface GolfClubformProps {
  onSubmit: (formData: { name: string; type: string }) => void;
}

const GolfclubForm = ({ onSubmit }: GolfClubformProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);

    setFormData({ name: '', type: '' });
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <input
        id="name"
        type="text"
        placeholder="Golf Club Name"
        value={formData.name}
        maxLength={50}
        onChange={handleChange}
        className="p-2 border bg-white border-slate-500 rounded-lg"
        required
      />
      <select
        id="type"
        className="p-2 border bg-white border-slate-500 rounded-lg"
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
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
      >
        Add Golfclub
      </button>
    </form>
  );
};

export default GolfclubForm;
