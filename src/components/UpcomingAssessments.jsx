import { Calendar, Clock } from 'lucide-react'

const assessments = [
  {
    id: 1,
    title: 'DSA Mock Test',
    date: 'Tomorrow',
    time: '10:00 AM',
  },
  {
    id: 2,
    title: 'System Design Review',
    date: 'Wednesday',
    time: '2:00 PM',
  },
  {
    id: 3,
    title: 'HR Interview Prep',
    date: 'Friday',
    time: '11:00 AM',
  },
]

export default function UpcomingAssessments() {
  return (
    <div className="space-y-3">
      {assessments.map((assessment) => (
        <div
          key={assessment.id}
          className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <div className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-slate-900">{assessment.title}</h4>
            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{assessment.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{assessment.time}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 text-primary border border-primary rounded-lg hover:bg-primary/5 transition font-medium flex-shrink-0">
            Schedule
          </button>
        </div>
      ))}
    </div>
  )
}
