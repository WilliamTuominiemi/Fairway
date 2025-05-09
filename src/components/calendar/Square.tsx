'use client';

interface Activity {
  id: string;
  userId: string;
  type: string | null;
  details: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

interface SquareProps {
  activities?: Activity[];
  isFeed?: boolean;
}

export default function Square({ activities = [], isFeed }: SquareProps) {
  const getBackgroundColor = () => {
    const activityCount = activities.length;
    if (activityCount === 0) return 'bg-red-50';
    if (activityCount <= 1) return 'bg-emerald-300';
    if (activityCount <= 2) return 'bg-emerald-600';
    return 'bg-emerald-900';
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div
      className={`${
        isFeed ? 'h-5 w-5 md:h-7 md:w-7' : 'h-7 w-7 md:h-10 md:w-10'
      } rounded-sm border border-slate-500 ${backgroundColor}`}
    ></div>
  );
}
