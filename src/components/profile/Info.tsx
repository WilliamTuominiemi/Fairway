import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

export default function Info({ userId }: { userId?: string | null }) {
  const queryKey = ['info', 'self'];
  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () =>
      fetch(`/api/user?userId=${userId ?? ''}`).then((res) => res.json()),
  });

  const daysSince = (date: string) => {
    const today = new Date();
    const createdDate = new Date(date);
    const timeDiff = today.getTime() - createdDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="flex flex-col md:w-70 p-5 mb-0 bg-emerald-50 border-1 border-slate-500 rounded-lg text-black items-center justify-center">
      {isPending && <h1>Loading...</h1>}
      {error && <h1>Error: {error.message}</h1>}
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
        </div>
      )}
    </div>
  );
}
