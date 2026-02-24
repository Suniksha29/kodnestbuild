import { FileText } from 'lucide-react'

export default function Assessments() {
  return (
    <div className="p-8">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Assessments</h2>
        
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">No assessments yet</h3>
              <p className="text-slate-600">Assessments will be available soon</p>
            </div>
          </div>
          <p className="text-slate-600">
            This section will display mock interviews and technical assessments. 
            Complete assessments to evaluate your readiness for placements and get detailed feedback.
          </p>
        </div>
      </div>
    </div>
  )
}
