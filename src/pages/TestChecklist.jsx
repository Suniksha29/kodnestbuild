import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, RotateCcw, CheckCircle2, AlertCircle, Info } from 'lucide-react'
import Card, { CardHeader, CardContent } from '../components/Card'
import {
  getTests,
  toggleTest,
  getCompletedCount,
  areAllTestsCompleted,
  resetTests
} from '../utils/testChecklistService'

export default function TestChecklist() {
  const [tests, setTests] = useState([])
  const [completedCount, setCompletedCount] = useState(0)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    loadTests()
  }, [])

  const loadTests = () => {
    const loadedTests = getTests()
    setTests(loadedTests)
    setCompletedCount(loadedTests.filter(t => t.completed).length)
  }

  const handleToggleTest = (testId) => {
    toggleTest(testId)
    loadTests()
  }

  const handleReset = () => {
    resetTests()
    loadTests()
    setShowResetConfirm(false)
  }

  const isAllPassed = areAllTestsCompleted()
  const progressPercent = completedCount === 0 ? 0 : Math.round((completedCount / tests.length) * 100)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-lg transition"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Test Checklist</h1>
            </div>
            <div className="flex gap-2">
              {isAllPassed && (
                <button
                  onClick={() => navigate('/prp/08-ship')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Ready to Ship
                </button>
              )}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                title="Reset checklist"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Card */}
        <Card className={`p-6 mb-8 border-2 ${isAllPassed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
          <div className="flex items-start gap-4">
            {isAllPassed ? (
              <CheckCircle2 className="w-8 h-8 text-green-700 flex-shrink-0 mt-1" />
            ) : (
              <AlertCircle className="w-8 h-8 text-yellow-700 flex-shrink-0 mt-1" />
            )}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <h2 className={`text-2xl font-bold ${isAllPassed ? 'text-green-900' : 'text-yellow-900'}`}>
                  Tests Passed: {completedCount} / {tests.length}
                </h2>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${isAllPassed ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                  {progressPercent}%
                </span>
              </div>

              {!isAllPassed && (
                <p className={`text-sm ${isAllPassed ? 'text-green-800' : 'text-yellow-800'}`}>
                  🔒 <strong>Fix issues before shipping.</strong> Complete all 10 tests to unlock deployment.
                </p>
              )}
              {isAllPassed && (
                <p className="text-sm text-green-800">
                  ✅ <strong>All tests passed!</strong> Platform is ready for deployment. Click "Ready to Ship" to proceed.
                </p>
              )}

              {/* Progress Bar */}
              <div className="mt-4 bg-slate-300 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isAllPassed ? 'bg-green-600' : 'bg-yellow-600'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Tests List */}
        <div className="space-y-4">
          {tests.map((test, idx) => (
            <Card
              key={test.id}
              className={`p-4 sm:p-6 border-2 transition ${
                test.completed
                  ? 'border-green-200 bg-green-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Test Header */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <input
                    type="checkbox"
                    checked={test.completed}
                    onChange={() => handleToggleTest(test.id)}
                    className="mt-1 w-5 h-5 rounded border-2 border-slate-300 cursor-pointer accent-green-600"
                    title="Mark test as complete"
                  />
                  <div className="flex-1 cursor-pointer" onClick={() => handleToggleTest(test.id)}>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-bold text-slate-500 min-w-fit">
                        Test {idx + 1}
                      </span>
                      <div>
                        <h3 className={`font-semibold text-slate-900 ${test.completed ? 'line-through text-slate-600' : ''}`}>
                          {test.name}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">{test.description}</p>
                      </div>
                    </div>
                  </div>
                  {test.completed && (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  )}
                </div>

                {/* How to Test Hint */}
                <div className="ml-8 sm:ml-11 p-3 bg-white border border-slate-200 rounded-lg">
                  <div className="flex gap-2">
                    <Info className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700">
                      <span className="font-semibold text-slate-800">How to test:</span> {test.howToTest}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Reset Checklist?</h3>
              <p className="text-sm text-slate-600 mb-6">
                This will mark all tests as incomplete. Are you sure?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                >
                  Reset
                </button>
              </div>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">📋 About These Tests</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>✓ All tests check core functionality of the Placement Readiness Platform</li>
            <li>✓ Tests are manual but include clear step-by-step instructions</li>
            <li>✓ Each test must be verified before deployment</li>
            <li>✓ Checklist is saved automatically in browser localStorage</li>
            <li>✓ You can reset the checklist anytime to start over</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
