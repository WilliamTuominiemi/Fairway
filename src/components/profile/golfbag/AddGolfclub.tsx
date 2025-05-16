import { useSession } from 'next-auth/react';

import { useAddGolfClubMutation } from '@/hooks/useGolfclubMutation';

import GolfclubForm from '@/components/profile/golfbag/GolfclubForm';

const AddGolfclub = () => {
  const { data: session } = useSession();

  const clubMutation = useAddGolfClubMutation();

  const handleSubmit = (formData: { name: string; type: string }) => {
    if (!session) {
      console.error('Please sign in to add golf clubs');
      return;
    }

    clubMutation.mutate(formData);
  };

  return (
    <div
      className="flex flex-col w-42 gap-4 p-5 bg-red-50 border-1 border-slate-500 rounded-lg text-black"
      data-testid="add-golfclub"
    >
      <GolfclubForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddGolfclub;
