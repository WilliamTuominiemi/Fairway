
"use client"

interface Activity {
  id: string
  userId: string
  type: string | null
  details: string | null
  date: string
  createdAt: string
  updatedAt: string
}

interface SquareProps {
  activities?: Activity[]
}

export default function Square({ activities = [] }: SquareProps) {
  const getBackgroundColor = () => {
    const activityCount = activities.length
    if (activityCount === 0) return "bg-red-50"
    if (activityCount <= 1) return "bg-emerald-300"
    if (activityCount <= 2) return "bg-emerald-600"
    return "bg-emerald-900"
  }

  const backgroundColor = getBackgroundColor()

  return <div className={`h-10 w-10 rounded-sm ${backgroundColor}`}></div>
}
