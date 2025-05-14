import { useForm } from '@/hooks/useForm';

interface ActivityFormProps {
  onSubmit: (formData: { date: string; type: string }) => void;
  isSubmitting: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const ActivityForm = ({
  onSubmit,
  isSubmitting,
  isError,
  isSuccess,
}: ActivityFormProps) => {
  const { formData, handleChange, handleReset } = useForm({
    date: '',
    type: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    handleReset();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        type="date"
        id="date"
        required
        value={formData.date}
        onChange={handleChange}
        className="border bg-white border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter date"
        max={new Date().toISOString().split('T')[0]}
        data-testid="date-input"
      />
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
        <option value="pitch & putt">Pitch & putt</option>
        <option value="par-3 course">Par-3 course</option>
        <option value="mini golf">Mini golf</option>
        <option value="other">Other</option>
      </select>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
        data-testid="add-activity-button"
      >
        {isSubmitting ? 'Adding...' : 'Add activity'}
      </button>

      {isError && (
        <div className="text-red-500 mt-2" data-testid="error-message">
          Failed to add
        </div>
      )}
      {isSuccess && (
        <div className="text-green-900 text-sm" data-testid="success-message">
          Added succesfully
        </div>
      )}
    </form>
  );
};

export default ActivityForm;
