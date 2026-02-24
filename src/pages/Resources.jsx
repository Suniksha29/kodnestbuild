import { BookOpen } from 'lucide-react'

export default function Resources() {
  return (
    <div className="p-8">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Resources</h2>
        
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">No resources yet</h3>
              <p className="text-slate-600">Resources will be available soon</p>
            </div>
          </div>
          <p className="text-slate-600">
            This section will provide study materials, articles, tutorials, and best practices 
            to help you prepare for your placement journey.
          </p>
        </div>
      </div>
    </div>
  )
}
