import Image from 'next/image';

import { useInfo } from '@/hooks/useInfo';

import { UserInfoSkeleton } from '@/components/skeletons/UserInfoSkeleton';

import ErrorMessage from '@/components/error/ErrorMessage';
import AddFriendButton from '../friends/AddFriendButton';

export default function Info({ userId }: { userId?: string | null }) {
  const { isPending, error, data } = useInfo(userId || '');
  const myProfile = !userId;

  const daysSince = (date: string) => {
    const today = new Date();
    const createdDate = new Date(date);
    const timeDiff = today.getTime() - createdDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  if (isPending) return <UserInfoSkeleton />;

  return (
    <div className="flex flex-col md:w-70 p-5 mb-0 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black items-center justify-center">
      {error && <ErrorMessage message={error.message} />}
      {data && (
        <div className="flex flex-col items-center gap-5">
          <Image
            src={data.image}
            alt="User Image"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h1 className="text-2xl">{data.name}</h1>
          <p>Member for {daysSince(data.createdAt)} days</p>
          {!myProfile && <AddFriendButton userId={data.id} />}
        </div>
      )}
    </div>
  );
}
