import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Download, Copy, CheckCircle, AlertCircle } from 'lucide-react'
import Card, { CardHeader, CardContent } from '../components/Card'
import { getAnalysisById, updateAnalysis } from '../utils/storageService'

function SkillTagsInteractive({ detectedSkills, skillConfidenceMap, onConfidenceChange }) {
  return (
    <div className="space-y-4">
      {Object.entries(detectedSkills).map(([category, skills]) => (
        <div key={category}>
          <h4 className="text-sm font-semibold text-primary mb-2">{category}</h4>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => {
              const confidence = skillConfidenceMap[skill] || 'practice'
              const isKnown = confidence === 'know'
              
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full font-medium text-sm transition cursor-pointer ${
                    isKnown
                      ? 'bg-opacity-10 bg-accent text-accent border-2 border-accent'
                      : 'bg-opacity-5 bg-warning text-warning border-2 border-warning'
                  }`}
                >
                  <span>{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                  <button
                    onClick={() => onConfidenceChange(skill, isKnown ? 'practice' : 'know')}
                    className="text-xs opacity-70 hover:opacity-100 transition ml-1"
                    title={isKnown ? 'Mark as need practice' : 'Mark as know'}
                  >
                    {isKnown ? '✓' : '○'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReadinessScore({ score }) {
  const percentage = (score / 100) * 100
  const getColor = (s) => {
    if (s >= 80) return 'bg-success'
    if (s >= 60) return 'bg-primary'
    if (s >= 40) return 'bg-warning'
    return 'bg-accent'
  }

  return (
    <div className="text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <svg width="140" height="140" className="transform -rotate-90 mx-auto">
          <circle cx="70" cy="70" r="60" fill="none" stroke="#E8E7E4" strokeWidth="8" />
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="#8B0000"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 60}`}
            strokeDashoffset={`${2 * Math.PI * 60 * (1 - percentage / 100)}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <div className="text-3xl font-bold text-primary">{score}</div>
          <div className="text-xs text-secondary">/ 100</div>
        </div>
      </div>
      <p className="text-sm font-semibold text-primary">Readiness Score</p>
      <p className="text-xs text-secondary mt-2">
        {score >= 80 ? 'Excellent! Ready to apply' :
         score >= 60 ? 'Good. Continue preparation' :
         score >= 40 ? 'Fair. More practice needed' :
         'Get started with basics'}
      </p>
    </div>
  )
}

function PreparationChecklist({ checklist }) {
  const [completedItems, setCompletedItems] = useState({})

  const handleToggle = (round, index) => {
    const key = `${round}-${index}`
    setCompletedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="space-y-6">
      {Object.entries(checklist).map(([round, items]) => {
        const completed = items.filter((_, idx) => completedItems[`${round}-${idx}`]).length
        return (
          <div key={round}>
            <h4 className="font-semibold text-primary mb-3">{round}</h4>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <label key={idx} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                  <input
                    type="checkbox"
                    checked={completedItems[`${round}-${idx}`] || false}
                    onChange={() => handleToggle(round, idx)}
                    className="mt-1 w-4 h-4 text-primary cursor-pointer accent-primary"
                  />
                  <span className="text-slate-700 text-sm">{item.text}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-slate-600 mt-2">{completed} of {items.length} completed</p>
          </div>
        )
      })}
    </div>
  )
}

function InterviewQuestions({ questions }) {
  const [expandedIdx, setExpandedIdx] = useState(null)

  return (
    <div className="space-y-3">
      {questions.map((q, idx) => (
        <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            className="w-full flex items-start justify-between p-4 hover:bg-slate-50 transition text-left"
          >
            <div className="flex-1">
              <p className="font-medium text-slate-900">{idx + 1}. {q.question}</p>
              <span className="text-xs text-slate-500 mt-1 inline-block">
                Category: {q.category}
              </span>
            </div>
            <span className="text-primary ml-2">{expandedIdx === idx ? '−' : '+'}</span>
          </button>
          {expandedIdx === idx && (
            <div className="px-4 pb-4 bg-slate-50 border-t border-slate-200">
              <p className="text-sm text-slate-700">
                Think about key concepts, provide examples from your experience, and explain your approach clearly.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Results() {
  const { analysisId } = useParams()
  const navigate = useNavigate()
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [skillConfidenceMap, setSkillConfidenceMap] = useState({})
  const [liveScore, setLiveScore] = useState(0)
  const [copied, setCopied] = useState(null)

  useEffect(() => {
    if (analysisId) {
      const data = getAnalysisById(analysisId)
      setAnalysis(data)
      setSkillConfidenceMap(data?.skillConfidenceMap || {})
      setLiveScore(data?.readinessScore || 0)
      setLoading(false)
    }
  }, [analysisId])

  // Calculate live score based on skill confidence
  useEffect(() => {
    if (analysis && skillConfidenceMap) {
      let newScore = analysis.readinessScore
      
      // Count skills marked as "know" and "practice"
      let knowCount = 0
      let practiceCount = 0
      
      Object.values(skillConfidenceMap).forEach(confidence => {
        if (confidence === 'know') knowCount++
        else if (confidence === 'practice') practiceCount++
      })
      
      newScore += (knowCount * 2) - (practiceCount * 2)
      newScore = Math.max(0, Math.min(100, newScore))
      
      setLiveScore(newScore)
    }
  }, [skillConfidenceMap, analysis])

  const handleConfidenceChange = (skill, confidence) => {
    const updated = { ...skillConfidenceMap, [skill]: confidence }
    setSkillConfidenceMap(updated)
    
    // Persist to history entry
    if (analysisId) {
      updateAnalysis(analysisId, { skillConfidenceMap: updated, readinessScore: liveScore })
    }
  }

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const get7DayPlanText = () => {
    return Object.entries(analysis.sevenDayPlan)
      .map(([day, config]) => `${day}\n${config.tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}`)
      .join('\n\n')
  }

  const getChecklistText = () => {
    return Object.entries(analysis.preparationChecklist)
      .map(([round, items]) => `${round}\n${items.map(item => `☐ ${item.text}`).join('\n')}`)
      .join('\n\n')
  }

  const getQuestionsText = () => {
    return analysis.interviewQuestions
      .map((q, i) => `${i + 1}. ${q.question}\nCategory: ${q.category}`)
      .join('\n\n')
  }

  const downloadAsText = () => {
    const content = `JOB ANALYSIS REPORT
Company: ${analysis.company}
Role: ${analysis.role}
Date: ${new Date(analysis.createdAt).toLocaleDateString()}

READINESS SCORE: ${liveScore}/100

7-DAY PREPARATION PLAN
${get7DayPlanText()}

INTERVIEW PREPARATION CHECKLIST
${getChecklistText()}

10 INTERVIEW QUESTIONS
${getQuestionsText()}

SKILL CONFIDENCE MAP
${Object.entries(skillConfidenceMap).map(([skill, conf]) => `${skill}: ${conf}`).join('\n')}
    `

    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${analysis.company}-${analysis.role}-analysis.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getWeakSkills = () => {
    return Object.entries(skillConfidenceMap)
      .filter(([_, conf]) => conf === 'practice')
      .slice(0, 3)
      .map(([skill]) => skill)
  }

  if (loading) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen flex items-center justify-center">
        <p className="text-slate-600">Loading analysis...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="p-8 bg-slate-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/analyzer')}
            className="flex items-center gap-2 text-primary hover:text-primary-dark mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Analyzer
          </button>
          <Card className="p-12 text-center">
            <p className="text-slate-600 mb-4">Analysis not found</p>
            <button
              onClick={() => navigate('/analyzer')}
              className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              New Analysis
            </button>
          </Card>
        </div>
      </div>
    )
  }

  const weakSkills = getWeakSkills()

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/history')}
              className="flex items-center gap-2 text-primary hover:text-primary-dark mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </button>
            <h1 className="text-4xl font-bold text-slate-900">
              {analysis.company} - {analysis.role}
            </h1>
            <p className="text-slate-600 mt-2">
              Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <button
              onClick={() => copyToClipboard(get7DayPlanText(), 'plan')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition text-sm"
              title="Copy 7-day plan to clipboard"
            >
              <Copy className="w-4 h-4" />
              {copied === 'plan' ? 'Copied!' : 'Copy Plan'}
            </button>
            <button
              onClick={() => copyToClipboard(getChecklistText(), 'checklist')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition text-sm"
              title="Copy checklist to clipboard"
            >
              <Copy className="w-4 h-4" />
              {copied === 'checklist' ? 'Copied!' : 'Copy Checklist'}
            </button>
            <button
              onClick={() => copyToClipboard(getQuestionsText(), 'questions')}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition text-sm"
              title="Copy interview questions to clipboard"
            >
              <Copy className="w-4 h-4" />
              {copied === 'questions' ? 'Copied!' : 'Copy Questions'}
            </button>
            <button
              onClick={downloadAsText}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition text-sm"
              title="Download everything as text file"
            >
              <Download className="w-4 h-4" />
              Download TXT
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Readiness Score */}
          <Card className="p-6">
            <ReadinessScore score={liveScore} />
            <p className="text-xs text-slate-600 mt-4 text-center">
              Base: {analysis.readinessScore} → Current: {liveScore}
            </p>
          </Card>

          {/* Skills Detected */}
          <Card className="lg:col-span-3 p-6">
            <CardHeader className="border-0 px-0 pt-0 mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Skills Detected ({analysis.detectedCategories.length})
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Click ✓ or ○ to toggle confidence level
              </p>
            </CardHeader>
            <CardContent className="px-0">
              {Object.keys(analysis.detectedSkills).length > 0 ? (
                <SkillTagsInteractive
                  detectedSkills={analysis.detectedSkills}
                  skillConfidenceMap={skillConfidenceMap}
                  onConfidenceChange={handleConfidenceChange}
                />
              ) : (
                <p className="text-slate-600">No specific skills detected. This is a general fresher position.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 7-Day Plan */}
        <Card className="p-6 mb-8">
          <CardHeader className="border-0 px-0 pt-0 mb-6">
            <h3 className="text-2xl font-bold text-slate-900">7-Day Preparation Plan</h3>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-6">
              {Object.entries(analysis.sevenDayPlan).map(([day, config]) => (
                <div key={day}>
                  <h4 className="font-semibold text-slate-900 mb-3">{day}</h4>
                  <ul className="space-y-2 ml-4">
                    {config.tasks.map((task, idx) => (
                      <li key={idx} className="text-slate-700 text-sm flex gap-3">
                        <span className="text-primary font-semibold">{idx + 1}.</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preparation Checklist */}
        <Card className="p-6 mb-8">
          <CardHeader className="border-0 px-0 pt-0 mb-6">
            <h3 className="text-2xl font-bold text-slate-900">Interview Preparation Checklist</h3>
          </CardHeader>
          <CardContent className="px-0">
            <PreparationChecklist checklist={analysis.preparationChecklist} />
          </CardContent>
        </Card>

        {/* Interview Questions */}
        <Card className="p-6 mb-8">
          <CardHeader className="border-0 px-0 pt-0 mb-6">
            <h3 className="text-2xl font-bold text-slate-900">10 Interview Questions</h3>
            <p className="text-sm text-slate-600 mt-2">Practice these questions commonly asked for this role</p>
          </CardHeader>
          <CardContent className="px-0">
            <InterviewQuestions questions={analysis.interviewQuestions} />
          </CardContent>
        </Card>

        {/* Action Next Box */}
        {weakSkills.length > 0 && (
          <Card className="p-6 mb-8 border-2 border-yellow-200 bg-yellow-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">Action Next</h3>
                <p className="text-sm text-slate-700 mb-3">
                  Focus on these {weakSkills.length} weak skill{weakSkills.length > 1 ? 's' : ''} marked for practice:
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {weakSkills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => {
                    window.scrollTo(0, 0)
                    setTimeout(() => document.querySelector('h3')?.scrollIntoView(), 100)
                  }}
                  className="text-sm bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded transition"
                >
                  Start Day 1 Plan Now
                </button>
              </div>
            </div>
          </Card>
        )}

        {/* Original JD */}
        <Card className="p-6">
          <CardHeader className="border-0 px-0 pt-0 mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Original Job Description</h3>
          </CardHeader>
          <CardContent className="px-0">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 max-h-40 overflow-y-auto">
              <p className="text-sm text-slate-700 whitespace-pre-wrap">{analysis.jdText}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
