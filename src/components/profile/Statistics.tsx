'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { useStats } from '@/hooks/useStats';
import { useStatsMutation } from '@/hooks/useStatsMutation';

import { UserStatsSkeleton } from '@/components/skeletons/UserStatsSkeleton';

const Statistics = ({ userId }: { userId?: string | null }) => {
  const { data: session } = useSession();

  const { isPending, error, data } = useStats(userId || '');
  const statsMutation = useStatsMutation();

  const myProfile = !userId;
  const [editing, setEditing] = useState(false);
  const [statsData, setStatsData] = useState({
    handicap: 0,
    averageScore: 0,
    drivingAccuracy: 0,
    greensInRegulation: 0,
    puttsPerRound: 0,
  });

  const toggleEdit = () => {
    setEditing(!editing);

    if (editing) {
      statsMutation.mutate(statsData);
    }
  };

  useEffect(() => {
    if (data) {
      setStatsData({
        handicap: data.handicap,
        averageScore: data.averageScore,
        drivingAccuracy: data.drivingAccuracy,
        greensInRegulation: data.greensInRegulation,
        puttsPerRound: data.puttsPerRound,
      });
    }
  }, [data]);

  if (isPending) return <UserStatsSkeleton myProfile={myProfile} />;

  return (
    <div className="flex flex-col md:w-100 p-5 gap-5 mb-0 bg-red-50 border-1 border-slate-500 rounded-lg text-black">
      {error ? (
        <div className="flex gap-4 m-5 text-red-500">
          Error: {error.message}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-5 h-9 justify-between items-center">
            <p>Handicap</p>
            {editing ? (
              <input
                type="number"
                min="0"
                max="54"
                value={statsData.handicap}
                onChange={(e) =>
                  setStatsData({
                    ...statsData,
                    handicap: Math.min(parseInt(e.target.value), 54) || 0,
                  })
                }
                className="w-15 border bg-white border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="p-1">{statsData.handicap}</p>
            )}
          </div>
          <div className="flex flex-row gap-5 h-9 justify-between items-center">
            <p>Average score</p>
            {editing ? (
              <input
                type="number"
                min="0"
                max="200"
                value={statsData.averageScore}
                onChange={(e) =>
                  setStatsData({
                    ...statsData,
                    averageScore: Math.min(parseInt(e.target.value), 200) || 0,
                  })
                }
                className="w-15 border bg-white border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="p-1">{statsData.averageScore}</p>
            )}
          </div>
          <div className="flex flex-row gap-5 h-9 justify-between items-center">
            <p>Driving Accuracy (%)</p>
            {editing ? (
              <input
                type="number"
                min="0"
                max="100"
                value={statsData.drivingAccuracy}
                onChange={(e) =>
                  setStatsData({
                    ...statsData,
                    drivingAccuracy:
                      Math.min(parseInt(e.target.value), 100) || 0,
                  })
                }
                className="w-15 border bg-white border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="p-1">{statsData.drivingAccuracy}%</p>
            )}
          </div>
          <div className="flex flex-row gap-5 h-9 justify-between items-center">
            <p>Greens in Regulation (%)</p>
            {editing ? (
              <input
                type="number"
                min="0"
                max="100"
                value={statsData.greensInRegulation}
                onChange={(e) =>
                  setStatsData({
                    ...statsData,
                    greensInRegulation:
                      Math.min(parseInt(e.target.value), 100) || 0,
                  })
                }
                className="w-15 border bg-white border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="p-1">{statsData.greensInRegulation}%</p>
            )}
          </div>
          <div className="flex flex-row gap-5 h-9 justify-between items-center">
            <p>Putts per Round</p>
            {editing ? (
              <input
                type="number"
                min="0"
                max="100"
                value={statsData.puttsPerRound}
                onChange={(e) =>
                  setStatsData({
                    ...statsData,
                    puttsPerRound: Math.min(parseInt(e.target.value), 100) || 0,
                  })
                }
                className="w-15 border bg-white border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            ) : (
              <p className="p-1">{statsData.puttsPerRound}</p>
            )}
          </div>

          {session && myProfile && (
            <button
              type="button"
              className="w-25 self-end bg-green-700 hover:bg-green-900 active:scale-95 p-2 rounded-md text-emerald-50 transition-transform duration-75"
              onClick={toggleEdit}
            >
              {editing ? 'Done' : 'Edit'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Statistics;
