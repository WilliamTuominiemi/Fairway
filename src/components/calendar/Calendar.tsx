import { useActivities } from '@/hooks/useActivities';

import Square from '@/components/calendar/Square';
import AddActivity from '@/components/calendar/AddActivity';

import { CalendarSkeleton } from '@/components/skeletons/CalendarSkeleton';
import ErrorMessage from '@/components/error/ErrorMessage';

import { Activity } from '@/types/index';

const Calendar = ({
  userId,
  isFeed = false,
}: {
  userId?: string | null;
  isFeed?: boolean;
}) => {
  const myProfile = !userId;

  const { isPending, error, data: activities } = useActivities(userId || '');

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

    return (
      activities?.filter((activity: Activity) => {
        const activityDate = new Date(activity.date)
          .toISOString()
          .split('T')[0];
        return activityDate === dayStr;
      }) || []
    );
  };

  if (isPending)
    return <CalendarSkeleton isFeed={isFeed} myProfile={myProfile} />;
  if (error) return <ErrorMessage message={error.message}></ErrorMessage>;

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isFeed ? 'gap-2 m-2' : 'gap-4'
      } align-middle text-center`}
      data-testid="calendar"
    >
      {!isFeed && myProfile && <AddActivity />}
      <div
        className={`flex flex-col ${isFeed ? 'gap-2 m-2' : 'gap-2 md:gap-4'}`}
      >
        {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
          <div
            key={weekIndex}
            className={isFeed ? 'flex gap-2' : 'flex md:w-100 gap-2 md:gap-4'}
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
};

export default Calendar;
