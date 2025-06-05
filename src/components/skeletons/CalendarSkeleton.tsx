import BaseSkeleton from './BaseSkeleton';

export const CalendarSkeleton = ({
  isFeed = false,
  myProfile = false,
}: {
  isFeed?: boolean;
  myProfile?: boolean;
}) => {
  // Use the same number of days (31) as in the Calendar component
  const days = 31;
  const weeksToShow = Math.ceil(days / 7);

  return (
    <div
      className={`flex flex-col md:flex-row ${
        isFeed ? 'gap-2 m-2' : 'gap-4'
      } align-middle text-center`}
    >
      {!isFeed && myProfile && (
        <div className="flex flex-col md:w-75 gap-4 p-5 bg-emerald-50 border-1 border-slate-500 rounded-lg items-center">
          <BaseSkeleton className="w-20 h-6" />
          <BaseSkeleton className="w-full h-10" />
          <BaseSkeleton className="w-full h-10" />
          <BaseSkeleton className="w-full h-10" />
        </div>
      )}
      <div
        className={`flex flex-col ${isFeed ? 'gap-1 m-2' : 'gap-2 md:gap-4'}`}
      >
        {Array.from({ length: weeksToShow }, (_, weekIndex) => (
          <div
            key={weekIndex}
            className={isFeed ? 'flex gap-1' : 'flex md:w-100 gap-2 md:gap-4'}
          >
            {Array.from(
              { length: Math.min(7, days - weekIndex * 7) },
              (_, dayIndex) => (
                <div key={dayIndex}>
                  <BaseSkeleton
                    className={`${
                      isFeed
                        ? 'h-5 w-5 md:h-7 md:w-7'
                        : 'h-7 w-7 md:h-10 md:w-10'
                    } rounded-sm border border-slate-500`}
                  />
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
