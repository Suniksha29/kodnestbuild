import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Send } from 'lucide-react'
import Card, { CardHeader, CardContent } from '../components/Card'
import { analyzeJD } from '../utils/analyzerService'
import { saveAnalysis } from '../utils/storageService'

export default function Analyzer() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  })
  const [analyzing, setAnalyzing] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAnalyze = async (e) => {
    e.preventDefault()

    if (!formData.jdText.trim()) {
      alert('Please paste a job description to analyze')
      return
    }

    setAnalyzing(true)

    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 500))

      // Analyze JD
      const analysis = analyzeJD(
        formData.jdText,
        formData.company,
        formData.role
      )

      // Save to localStorage
      const saved = saveAnalysis(analysis)

      if (saved) {
        // Navigate to results with the ID
        navigate(`/results/${saved.id}`)
      }
    } catch (error) {
      console.error('Error analyzing:', error)
      alert('Error analyzing job description. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const sampleJD = `
We are looking for a Full Stack Software Engineer with 2+ years of experience.

Required Skills:
- Strong proficiency in DSA and OOP concepts
- 2+ years with JavaScript/TypeScript
- Experience with React and Node.js
- SQL and MongoDB databases
- REST API design
- Experience with AWS or cloud platforms
- Docker and basic Kubernetes

Nice to have:
- GraphQL experience
- Next.js knowledge
- PostgreSQL expertise
- CI/CD pipeline experience
- Testing with Cypress or Selenium

Responsibilities:
- Build scalable web applications
- Design and optimize databases
- Collaborate with product and design teams
- Write clean, maintainable code
- Mentor junior developers

We value problem-solving skills, communication, and ability to learn quickly.
  `

  return (
    <div className="p-lg bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-2">Job Analysis Engine</h2>
        <p className="text-secondary mb-lg">
          Paste a job description and we'll generate a personalized preparation plan with skill analysis
        </p>

        <form onSubmit={handleAnalyze} className="space-y-md">
          {/* Company & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <Card className="p-md">
              <label className="block text-sm font-semibold text-primary mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g., Google, Amazon, Startup XYZ"
                className="w-full px-md py-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <p className="text-xs text-secondary mt-2">Optional but helps with scoring</p>
            </Card>

            <Card className="p-md">
              <label className="block text-sm font-semibold text-primary mb-2">
                Job Role
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g., Full Stack Developer, Backend Engineer"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <p className="text-xs text-slate-500 mt-2">Optional but helps with scoring</p>
            </Card>
          </div>

          {/* Job Description */}
          <Card className="p-md">
            <label className="block text-sm font-semibold text-primary mb-2">
              Job Description *
            </label>
            <textarea
              name="jdText"
              value={formData.jdText}
              onChange={handleInputChange}
              placeholder="Paste the complete job description here..."
              className="w-full px-md py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              rows={12}
            />
            <p className="text-xs text-secondary mt-2">
              Paste the full job description. Longer JDs (800+ chars) score better.
            </p>

            {/* Quick Actions */}
            <div className="flex gap-md mt-md">
              <button
                type="button"
                onClick={() => setFormData(prev => ({
                  ...prev,
                  jdText: sampleJD,
                  company: 'Tech Startup',
                  role: 'Full Stack Developer'
                }))}
                className="px-md py-sm text-sm text-primary border border-primary rounded-lg hover:bg-primary/5 transition"
              >
                Load Sample JD
              </button>
              <button
                type="button"
                onClick={() => setFormData({ company: '', role: '', jdText: '' })}
                className="px-md py-sm text-sm text-secondary border border-border rounded-lg hover:bg-background transition"
              >
                Clear
              </button>
            </div>
          </Card>

          {/* Analyze Button */}
          <div className="flex gap-md">
            <button
              type="submit"
              disabled={analyzing}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-secondary text-surface font-semibold py-md px-lg rounded-lg transition flex-1 md:flex-none justify-center"
            >
              <Send className="w-5 h-5" />
              {analyzing ? 'Analyzing...' : 'Analyze Job Description'}
            </button>
          </div>
        </form>

        {/* Info Section */}
        <Card className="mt-xl p-md bg-primary/5 border-primary/20">
          <h3 className="text-lg font-semibold text-primary mb-md">What You'll Get:</h3>
          <ul className="space-y-sm text-sm text-secondary">
            <li>✓ Skill extraction across 6 categories (DSA, Web, Cloud, etc.)</li>
            <li>✓ Round-wise preparation checklist (4 rounds of interviews)</li>
            <li>✓ 7-day intensive preparation plan</li>
            <li>✓ 10 personalized interview questions based on detected skills</li>
            <li>✓ Readiness score (0-100) with breakdown</li>
            <li>✓ All analysis saved to history (localStorage, no external APIs)</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
