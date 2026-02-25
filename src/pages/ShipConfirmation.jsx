import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Lock, Rocket, ArrowRight } from 'lucide-react'
import Card, { CardHeader, CardContent } from '../components/Card'
import { areAllTestsCompleted, getCompletedCount } from '../utils/testChecklistService'

export default function ShipConfirmation() {
  const [testsComplete, setTestsComplete] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const checkStatus = () => {
      const allPassed = areAllTestsCompleted()
      setTestsComplete(allPassed)
      setCompletedCount(getCompletedCount())
    }

    checkStatus()
    // Re-check every second for real-time updates
    const interval = setInterval(checkStatus, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Ship Confirmation</h1>
            <div className="w-16" /> {/* Spacer for alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {testsComplete ? (
          <>
            {/* Success State */}
            <Card className="p-8 sm:p-12 text-center border-2 border-green-200 bg-green-50 mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-green-200 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-700" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
                ✅ Ready to Ship!
              </h2>
              <p className="text-lg text-green-800 mb-8">
                All 10 tests have been completed successfully. The Placement Readiness Platform is ready for deployment.
              </p>

              {/* Deployment Checklist */}
              <div className="bg-white p-6 rounded-lg border border-green-200 text-left mb-8">
                <h3 className="font-semibold text-slate-900 mb-4">✓ Deployment Ready</h3>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Input validation working</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Skills extraction functional</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>Score calculation stable</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>History persistence verified</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>No console errors detected</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Rocket className="w-5 h-5" />
                  <span>Go to Dashboard</span>
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  View Analysis History
                </button>
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-4">📌 Available Pages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/analyzer')}
                  className="p-3 border border-slate-300 rounded-lg hover:bg-white transition text-left text-sm font-medium text-slate-700"
                >
                  Job Analysis <ArrowRight className="w-4 h-4 inline ml-1" />
                </button>
                <button
                  onClick={() => navigate('/history')}
                  className="p-3 border border-slate-300 rounded-lg hover:bg-white transition text-left text-sm font-medium text-slate-700"
                >
                  History <ArrowRight className="w-4 h-4 inline ml-1" />
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-3 border border-slate-300 rounded-lg hover:bg-white transition text-left text-sm font-medium text-slate-700"
                >
                  Dashboard <ArrowRight className="w-4 h-4 inline ml-1" />
                </button>
                <button
                  onClick={() => navigate('/prp/07-test')}
                  className="p-3 border border-slate-300 rounded-lg hover:bg-white transition text-left text-sm font-medium text-slate-700"
                >
                  Test Checklist <ArrowRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </Card>
          </>
        ) : (
          <>
            {/* Locked State */}
            <Card className="p-8 sm:p-12 text-center border-2 border-red-200 bg-red-50 mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-red-200 flex items-center justify-center">
                  <Lock className="w-12 h-12 text-red-700" />
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-red-900 mb-4">
                🔒 Deployment Locked
              </h2>
              <p className="text-lg text-red-800 mb-8">
                All 10 tests must be passed before you can ship. You currently have {completedCount}/10 tests completed.
              </p>

              {/* Lock Reason */}
              <div className="bg-white p-6 rounded-lg border border-red-200 text-left mb-8">
                <h3 className="font-semibold text-slate-900 mb-4">✓ Why This Lock Exists</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>🛡️ Ensures platform stability before deployment</li>
                  <li>✅ Verifies all core features are working</li>
                  <li>🔍 Catches configuration and integration issues</li>
                  <li>📊 Validates data persistence and consistency</li>
                  <li>🎯 Provides confidence in released version</li>
                </ul>
              </div>

              <button
                onClick={() => navigate('/prp/07-test')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
              >
                <span>Complete Tests to Unlock</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-sm text-red-700 mt-6">
                Progress: <strong>{completedCount}/10 tests completed</strong>
              </p>
              <div className="mt-3 bg-slate-300 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-300"
                  style={{ width: `${(completedCount / 10) * 100}%` }}
                />
              </div>
            </Card>

            {/* Info */}
            <Card className="p-6 bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-4">📋 What's Being Tested?</h3>
              <p className="text-sm text-slate-700 mb-4">
                The test checklist verifies:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• Input validation and error handling</li>
                <li>• Data extraction and categorization</li>
                <li>• Score calculations and updates</li>
                <li>• Component responsiveness</li>
                <li>• Data persistence and history management</li>
                <li>• Export functionality</li>
                <li>• Browser compatibility and console health</li>
              </ul>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
