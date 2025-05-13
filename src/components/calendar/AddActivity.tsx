import { useState } from 'react';
import { useSession } from 'next-auth/react';

import { useActivityMutation } from '@/hooks/useActivityMutation';

import ActivityForm from '@/components/calendar/ActivityForm';

const AddActivity = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = () => {
    setIsSubmitting(false);
  };

  const handleError = () => {
    setIsSubmitting(false);
  };

  const activityMutation = useActivityMutation(handleSuccess, handleError);

  const handleSubmit = (formData: { date: string; type: string }) => {
    if (!session) {
      console.error('Please sign in to add activities');
      return;
    }

    setIsSubmitting(true);
    activityMutation.mutate(formData);
  };

  return (
    <div className="flex flex-col md:w-75 gap-4 p-5 m-5 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black">
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
