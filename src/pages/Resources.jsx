import { BookOpen, ExternalLink, Play, FileText, Users, Lightbulb } from 'lucide-react'
import { useState } from 'react'

export default function Resources() {
  const [activeTab, setActiveTab] = useState('all')

  const resources = {
    tutorials: [
      {
        id: 1,
        title: 'Complete DSA Masterclass',
        description: 'Learn Data Structures and Algorithms from scratch with real interview examples',
        category: 'Video',
        icon: Play,
        duration: '42 hours',
        difficulty: 'Beginner to Advanced',
        link: '#',
      },
      {
        id: 2,
        title: 'System Design for Interviews',
        description: 'Master scalable system design patterns used at top tech companies',
        category: 'Video',
        icon: Play,
        duration: '28 hours',
        difficulty: 'Advanced',
        link: '#',
      },
      {
        id: 3,
        title: 'Operating Systems Essentials',
        description: 'Deep dive into OS concepts that are frequently asked in interviews',
        category: 'Video',
        icon: Play,
        duration: '18 hours',
        difficulty: 'Intermediate',
        link: '#',
      },
    ],
    articles: [
      {
        id: 4,
        title: 'Binary Search Complete Guide',
        description: 'Master all variations of binary search with problem solutions',
        category: 'Article',
        icon: FileText,
        readTime: '15 min',
        difficulty: 'Easy',
        link: '#',
      },
      {
        id: 5,
        title: 'Graph Algorithms Explained',
        description: 'BFS, DFS, Dijkstra, and more with visual explanations',
        category: 'Article',
        icon: FileText,
        readTime: '25 min',
        difficulty: 'Hard',
        link: '#',
      },
      {
        id: 6,
        title: 'Dynamic Programming Patterns',
        description: 'Learn 7 essential DP patterns to solve any recursion problem',
        category: 'Article',
        icon: FileText,
        readTime: '20 min',
        difficulty: 'Intermediate',
        link: '#',
      },
      {
        id: 7,
        title: 'Interview Prep Checklist',
        description: 'Complete roadmap for 3-month placement preparation',
        category: 'Article',
        icon: FileText,
        readTime: '10 min',
        difficulty: 'Easy',
        link: '#',
      },
    ],
    courses: [
      {
        id: 8,
        title: 'LeetCode Premium',
        description: 'Access to 2000+ coding problems with detailed solutions and discuss forums',
        category: 'Course',
        icon: BookOpen,
        price: '$159/year',
        rating: 4.8,
        link: '#',
      },
      {
        id: 9,
        title: 'GeeksforGeeks Premium',
        description: 'Comprehensive tutorials, interview questions, and practice problems',
        category: 'Course',
        icon: BookOpen,
        price: 'Free + Premium',
        rating: 4.6,
        link: '#',
      },
      {
        id: 10,
        title: 'Educative.io - Coding Interview Path',
        description: 'Interactive lessons for interview preparation with live code execution',
        category: 'Course',
        icon: BookOpen,
        price: '$49/month',
        rating: 4.7,
        link: '#',
      },
    ],
    tips: [
      {
        id: 11,
        title: '10 Tips for Better Interview Performance',
        description: 'Expert advice on how to approach technical interviews confidently',
        category: 'Tips',
        icon: Lightbulb,
        tips: ['Think aloud', 'Ask clarifying questions', 'Write pseudocode first'],
        link: '#',
      },
      {
        id: 12,
        title: 'How to Solve Coding Problems Faster',
        description: 'Proven strategies to optimize your problem-solving approach',
        category: 'Tips',
        icon: Lightbulb,
        tips: ['Pattern recognition', 'Time/Space analysis', 'Test cases'],
        link: '#',
      },
      {
        id: 13,
        title: 'Mock Interview Best Practices',
        description: 'Tips for doing mock interviews effectively to prepare for real ones',
        category: 'Tips',
        icon: Lightbulb,
        tips: ['Record yourself', 'Get feedback', 'Focus on weak areas'],
        link: '#',
      },
    ],
  }

  const allResources = [...resources.tutorials, ...resources.articles, ...resources.courses, ...resources.tips]

  const filteredResources = activeTab === 'all' ? allResources : resources[activeTab]

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Video':
        return 'bg-red-100 text-red-700'
      case 'Article':
        return 'bg-blue-100 text-blue-700'
      case 'Course':
        return 'bg-purple-100 text-purple-700'
      case 'Tips':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Learning Resources</h1>
          </div>
          <p className="text-slate-600 text-lg">Curated collection of tutorials, articles, and courses for placement readiness</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2 sm:gap-4 border-b border-slate-200">
          {[
            { id: 'all', label: 'All Resources' },
            { id: 'tutorials', label: 'Videos' },
            { id: 'articles', label: 'Articles' },
            { id: 'courses', label: 'Courses' },
            { id: 'tips', label: 'Tips' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm sm:text-base transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {filteredResources.map((resource) => {
            const IconComponent = resource.icon
            return (
              <div
                key={resource.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${getCategoryColor(resource.category)}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                      {resource.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{resource.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{resource.description}</p>

                  {/* Meta Info */}
                  <div className="space-y-2 text-sm text-slate-600 mb-4">
                    {resource.duration && <div>⏱️ {resource.duration}</div>}
                    {resource.readTime && <div>📖 {resource.readTime} read</div>}
                    {resource.price && <div>💰 {resource.price}</div>}
                    {resource.difficulty && <div>📊 {resource.difficulty}</div>}
                    {resource.tips && (
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <div className="font-medium text-slate-900 mb-2">Key Points:</div>
                        <ul className="list-disc list-inside space-y-1">
                          {resource.tips.map((tip, idx) => (
                            <li key={idx} className="text-slate-600">{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {resource.rating && (
                      <div>⭐ {resource.rating} rating ({Math.floor(Math.random() * 5000) + 150} reviews)</div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                    Access <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Featured Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Study Plan */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 lg:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📅 12-Week Study Plan</h3>
            <div className="space-y-3">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">1</div>
                <div>
                  <div className="font-semibold text-slate-900">Week 1-2: Foundations</div>
                  <div className="text-sm text-slate-600">Arrays, Strings, Linked Lists basics</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">2</div>
                <div>
                  <div className="font-semibold text-slate-900">Week 3-5: Core DSA</div>
                  <div className="text-sm text-slate-600">Trees, Graphs, Sorting, Searching</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">3</div>
                <div>
                  <div className="font-semibold text-slate-900">Week 6-8: Advanced Topics</div>
                  <div className="text-sm text-slate-600">Dynamic Programming, Greedy, Backtracking</div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">4</div>
                <div>
                  <div className="font-semibold text-slate-900">Week 9-12: System Design & Mock</div>
                  <div className="text-sm text-slate-600">Design patterns, mock interviews</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Download PDF Plan
            </button>
          </div>

          {/* Recommended Path */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 lg:p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 Recommended Learning Path</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start">
                <div className="text-xl">✅</div>
                <div>
                  <div className="font-semibold text-slate-900">Step 1: Complete DSA Masterclass</div>
                  <div className="text-sm text-slate-600">All fundamentals in 42 hours</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-xl">✅</div>
                <div>
                  <div className="font-semibold text-slate-900">Step 2: Solve LeetCode Problems</div>
                  <div className="text-sm text-slate-600">Easy → Medium → Hard progression</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-xl">✅</div>
                <div>
                  <div className="font-semibold text-slate-900">Step 3: Study System Design</div>
                  <div className="text-sm text-slate-600">For mid to senior level roles</div>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="text-xl">✅</div>
                <div>
                  <div className="font-semibold text-slate-900">Step 4: Do Mock Interviews</div>
                  <div className="text-sm text-slate-600">Practice with real interview conditions</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
              Start Learning Path
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-purple-600">50+</div>
            <div className="text-slate-600 text-sm mt-1">Resources</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-blue-600">180+</div>
            <div className="text-slate-600 text-sm mt-1">Hours Content</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-green-600">95%</div>
            <div className="text-slate-600 text-sm mt-1">Success Rate</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-yellow-600">4.8★</div>
            <div className="text-slate-600 text-sm mt-1">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  )
}
