import { Link } from 'react-router-dom'
import { Code2, Video, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">PP</span>
            </div>
            <span className="text-xl font-bold text-slate-900">PlacePrepare</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 mb-6">
          Ace Your Placement
        </h1>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform
        </p>
        <Link
          to="/dashboard"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition duration-200"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Practice Problems Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Practice Problems
            </h3>
            <p className="text-slate-600">
              Solve curated coding problems to strengthen your technical skills
            </p>
          </div>

          {/* Mock Interviews Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
              <Video className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Mock Interviews
            </h3>
            <p className="text-slate-600">
              Simulate real interview experiences with AI-powered mock sessions
            </p>
          </div>

          {/* Track Progress Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 hover:shadow-lg transition">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Track Progress
            </h3>
            <p className="text-slate-600">
              Monitor your improvement with detailed analytics and insights
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p>&copy; 2026 Placement Readiness Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
