import { ArrowRight } from 'lucide-react'
import ProgressBar from './ProgressBar'

export default function ContinuePractice() {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-slate-900">Dynamic Programming</h4>
        <p className="text-sm text-slate-600 mt-1">You were on problem 4 of 10</p>
      </div>

      <ProgressBar 
        current={3} 
        total={10} 
        label="Progress"
      />

      <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition">
        Continue Practice
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  )
}
