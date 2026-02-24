export default function ProgressBar({ current, total, label }) {
  const percentage = (current / total) * 100

  return (
    <div>
      {label && <p className="text-sm font-medium text-slate-700 mb-2">{label}</p>}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-slate-600 mt-1">{current} / {total}</p>
    </div>
  )
}
