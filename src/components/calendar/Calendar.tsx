import { useQuery } from '@tanstack/react-query';
import Square from './Square';
import AddActivity from './AddActivity';

interface Activity {
  id: string;
  userId: string;
  type: string | null;
  details: string | null;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export default function Calendar({ userId }: { userId?: string | null }) {
  const queryKey = ['activities', userId ?? 'self'];
  const isFeed = !!userId;

  const { isPending, error, data } = useQuery({
    queryKey,
    queryFn: () =>
      fetch(`/api/activities?userId=${userId ?? ''}`).then((res) => res.json()),
  });

  const getDays = () => {
    const days = [];
    for (let i = 0; i < 31; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days.reverse();
  };

  const days = getDays();

  const getActivitiesForDay = (day: Date) => {
    const dayStr = day.toISOString().split('T')[0];

    return data.filter((activity: Activity) => {
      const activityDate = new Date(activity.date).toISOString().split('T')[0];
      return activityDate === dayStr;
    });
  };

  if (isPending)
    return <div className="flex gap-4 m-5">Loading activities...</div>;
  if (error)
    return (
      <div className="flex gap-4 m-5 text-red-500">Error: {error.message}</div>
    );

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isFeed ? 'gap-2 m-2' : 'gap-4 m-5'
      } align-middle text-center`}
    >
      {!isFeed && <AddActivity />}
      <div
        className={`flex flex-col ${isFeed ? 'gap-1 m-2' : 'gap-2 md:gap-4 m-5'}`}
      >
        {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
          <div
            key={weekIndex}
            className={isFeed ? 'flex gap-1' : 'flex gap-2 md:gap-4'}
          >
            {days
              .slice(weekIndex * 7, weekIndex * 7 + 7)
              .map((day, dayIndex) => (
                <Square
                  key={dayIndex}
                  activities={getActivitiesForDay(day)}
                  isFeed={isFeed}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
