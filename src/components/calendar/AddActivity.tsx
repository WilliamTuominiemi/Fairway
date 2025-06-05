import { useState } from 'react';

import { useActivityMutation } from '@/hooks/useActivityMutation';

import ActivityForm from '@/components/calendar/ActivityForm';

const AddActivity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = () => {
    setIsSubmitting(false);
  };

  const handleError = () => {
    setIsSubmitting(false);
  };

  const activityMutation = useActivityMutation(handleSuccess, handleError);

  const handleSubmit = (formData: { date: string; type: string }) => {
    setIsSubmitting(true);
    activityMutation.mutate(formData);
  };

  return (
    <div
      className="flex flex-col w-full md:w-75 gap-4 p-5 mr-7 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black"
      data-testid="add-activity"
    >
      <h1>Add activity</h1>
      <ActivityForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isError={activityMutation.isError}
        isSuccess={activityMutation.isSuccess}
      />
    </div>
  );
};

export default AddActivity;
