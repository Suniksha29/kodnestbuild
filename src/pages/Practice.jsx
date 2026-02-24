import { Code2 } from 'lucide-react'

export default function Practice() {
  return (
    <div className="p-8">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Practice Problems</h2>
        
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">No problems yet</h3>
              <p className="text-slate-600">Problems will be available soon</p>
            </div>
          </div>
          <p className="text-slate-600">
            This section will display coding problems organized by difficulty level and topic. 
            Practice problems help you strengthen your technical skills.
          </p>
        </div>
      </div>
    </div>
  )
}
