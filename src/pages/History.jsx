import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Eye, Plus, AlertTriangle } from 'lucide-react'
import Card from '../components/Card'
import { getHistory, deleteAnalysis } from '../utils/storageService'

export default function History() {
  const [history, setHistory] = useState([])
  const [corruptedCount, setCorruptedCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const result = getHistory()
    setHistory(result.entries || [])
    setCorruptedCount(result.corruptedCount || 0)
    setLoading(false)
  }, [])

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this analysis?')) {
      deleteAnalysis(id)
      setHistory(history.filter(item => item.id !== id))
    }
  }

  const handleView = (id) => {
    navigate(`/results/${id}`)
  }

  if (loading) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading history...</p>
      </div>
    )
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Analysis History</h2>
            <p className="text-slate-600 mt-2">View and manage your previous job analyses</p>
          </div>
          <button
            onClick={() => navigate('/analyzer')}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
            New Analysis
          </button>
        </div>

        {/* Corruption Warning */}
        {corruptedCount > 0 && (
          <Card className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-700 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-900">⚠️ Corrupted Entries Detected</p>
              <p className="text-sm text-orange-800 mt-1">
                {corruptedCount} saved {corruptedCount === 1 ? 'entry could' : 'entries could'} not be loaded. These entries have been skipped. Create a new analysis to continue.
              </p>
            </div>
          </Card>
        )}

        {/* History List */}
        {history.length === 0 ? (
          <Card className="p-12 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">No analyses yet</h3>
            <p className="text-slate-600 mb-6">
              Start by analyzing a job description to begin your preparation journey
            </p>
            <button
              onClick={() => navigate('/analyzer')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Create First Analysis
            </button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => {
              // Support both old (readinessScore) and new (finalScore) formats
              const score = item.finalScore !== undefined ? item.finalScore : item.readinessScore
              const getScoreColor = (s) => {
                if (s >= 80) return 'bg-green-50 border-green-200'
                if (s >= 60) return 'bg-blue-50 border-blue-200'
                if (s >= 40) return 'bg-yellow-50 border-yellow-200'
                return 'bg-orange-50 border-orange-200'
              }

              const getScoreBadgeColor = (s) => {
                if (s >= 80) return 'bg-green-100 text-green-800'
                if (s >= 60) return 'bg-blue-100 text-blue-800'
                if (s >= 40) return 'bg-yellow-100 text-yellow-800'
                return 'bg-orange-100 text-orange-800'
              }

              return (
                <Card
                  key={item.id}
                  className={`p-6 border-2 transition ${getScoreColor(score)} hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">
                          {item.company}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBadgeColor(score)}`}>
                          Score: {score}
                        </span>
                      </div>
                      <p className="text-slate-700 font-medium mb-2">{item.role}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>
                          📅 {new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <span>
                          🎯 {item.detectedCategories.length} skill categories detected
                        </span>
                        <span>
                          📝 {Math.ceil(item.jdText.length / 100)} × 100 chars
                        </span>
                      </div>

                      {/* Skills Preview */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.detectedCategories.slice(0, 4).map(cat => (
                          <span
                            key={cat}
                            className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded font-medium"
                          >
                            {cat}
                          </span>
                        ))}
                        {item.detectedCategories.length > 4 && (
                          <span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded font-medium">
                            +{item.detectedCategories.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleView(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition font-medium text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition font-medium text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}

        {/* Stats */}
        {history.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mt-12">
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">{history.length}</p>
              <p className="text-slate-600 text-sm">Total Analyses</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">
                {Math.round(history.reduce((sum, h) => sum + h.readinessScore, 0) / history.length)}
              </p>
              <p className="text-slate-600 text-sm">Average Score</p>
            </Card>
            <Card className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-2">
                {new Set(history.flatMap(h => h.detectedCategories)).size}
              </p>
              <p className="text-slate-600 text-sm">Unique Skills</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
