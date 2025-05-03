import { useQuery } from '@tanstack/react-query';
import Square from "./Square"
import AddActivity from './AddActivity';

interface Activity {
  id: string
  userId: string
  type: string | null
  details: string | null
  date: string
  createdAt: string
  updatedAt: string
}

export default function Calendar() {
  const { isPending, error, data } = useQuery({
    queryKey: ['activities'],
    queryFn: () => fetch('/api/activities').then((res) => res.json()),
  });

  
  const getDays = () => {
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      days.push(date)
    }
    return days.reverse()
  }
  
  const days = getDays()
  
  const getActivitiesForDay = (day: Date) => {
    const dayStr = day.toISOString().split('T')[0]
    
    return data.filter((activity: Activity) => {
      const activityDate = new Date(activity.date).toISOString().split('T')[0]
      return activityDate === dayStr
    })
  }
  
  if (isPending) return <div className="flex gap-4 m-5">Loading activities...</div>
  if (error) return <div className="flex gap-4 m-5 text-red-500">Error: {error.message}</div>
  
  return (
    <>
      <AddActivity />
      <div className="flex gap-4 m-5">
        {days.map((day, index) => (
          <Square 
            key={index} 
            activities={getActivitiesForDay(day)}
          />
        ))}
      </div>
    </>
   
  )
}