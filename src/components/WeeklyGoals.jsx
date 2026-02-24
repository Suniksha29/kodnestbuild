import ProgressBar from './ProgressBar'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const activityDays = [0, 1, 2, 4, 5] // Days with activity (indices)

export default function WeeklyGoals() {
  return (
    <div className="space-y-4">
      <ProgressBar 
        current={12} 
        total={20} 
        label="Problems Solved This Week"
      />
      
      <div className="flex justify-between gap-2">
        {days.map((day, index) => (
          <div key={day} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold transition ${
                activityDays.includes(index)
                  ? 'bg-primary text-white'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {day[0]}
            </div>
            <span className="text-xs text-slate-600">{day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
