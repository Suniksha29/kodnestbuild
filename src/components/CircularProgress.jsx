export default function CircularProgress({ score, max = 100 }) {
  const percentage = (score / max) * 100
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="140" height="140" className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="8"
        />
        {/* Progress Circle */}
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="hsl(245, 58%, 51%)"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-4xl font-bold text-slate-900">
          {score}
        </div>
        <div className="text-sm text-slate-600">
          Readiness Score
        </div>
      </div>
    </div>
  )
}
