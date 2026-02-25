import { ChevronRight, CheckCircle2 } from 'lucide-react'
import Card, { CardHeader, CardContent } from './Card'

export default function RoundMapping({ rounds }) {
  const getRoundColor = (index) => {
    const colors = [
      'bg-blue-50 border-blue-200 text-blue-900',
      'bg-purple-50 border-purple-200 text-purple-900',
      'bg-indigo-50 border-indigo-200 text-indigo-900',
      'bg-slate-50 border-slate-200 text-slate-900'
    ]
    return colors[index % colors.length]
  }

  const getRoundBadgeColor = (index) => {
    const colors = [
      'bg-blue-100 text-blue-700 border-blue-300',
      'bg-purple-100 text-purple-700 border-purple-300',
      'bg-indigo-100 text-indigo-700 border-indigo-300',
      'bg-slate-100 text-slate-700 border-slate-300'
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="p-6 mb-8">
      <CardHeader className="border-0 px-0 pt-0 mb-6">
        <h3 className="text-2xl font-bold text-slate-900">Interview Round Mapping</h3>
        <p className="text-sm text-slate-600 mt-2">
          Typical interview progression tailored to company size and detected skills
        </p>
      </CardHeader>

      <CardContent className="px-0">
        <div className="space-y-0">
          {rounds.map((round, idx) => (
            <div key={idx} className="relative">
              {/* Timeline connector */}
              {idx < rounds.length - 1 && (
                <div className="absolute left-6 top-24 w-0.5 h-12 bg-slate-300" />
              )}

              {/* Round card */}
              <div className={`border-2 rounded-lg p-5 mb-6 ${getRoundColor(idx)}`}>
                <div className="flex gap-4">
                  {/* Round number badge */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-2 ${getRoundBadgeColor(idx)}`}>
                    {round.number}
                  </div>

                  {/* Round details */}
                  <div className="flex-1">
                    <div className="mb-2">
                      <h4 className="font-bold text-lg text-slate-900">{round.title}</h4>
                      <p className="text-sm text-slate-700 mt-1">{round.description}</p>
                    </div>

                    {/* Why this round matters */}
                    <div className="mt-3 p-3 bg-white bg-opacity-60 border border-slate-200 border-opacity-50 rounded">
                      <p className="text-xs font-semibold text-slate-600 mb-1">💡 Why this round matters</p>
                      <p className="text-sm text-slate-700">{round.why}</p>
                    </div>

                    {/* Focus areas and duration */}
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2">Focus Areas:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {round.focus.map((area, fidx) => (
                            <span
                              key={fidx}
                              className="text-xs px-2 py-1 bg-white bg-opacity-70 rounded font-medium border border-slate-300 border-opacity-50"
                            >
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 mb-2">Duration:</p>
                        <p className="text-sm font-bold text-slate-900 bg-white bg-opacity-70 px-3 py-1 rounded inline-block border border-slate-300 border-opacity-50">
                          ⏱️ {round.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  {idx < rounds.length - 1 && (
                    <div className="flex-shrink-0 flex items-center">
                      <ChevronRight className="w-6 h-6 text-slate-400" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Final success message */}
          <div className="mt-8 p-4 border-2 border-green-200 rounded-lg bg-green-50 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">Interview Journey Complete</p>
              <p className="text-sm text-green-800 mt-1">
                Successfully completing this interview pipeline means aligned culture fit, technical capability, and readiness for the role.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
