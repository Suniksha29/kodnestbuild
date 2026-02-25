import { Code2, ChevronRight, Star, Target } from 'lucide-react'
import { useState } from 'react'

export default function Practice() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const problems = {
    arrays: [
      { id: 1, title: 'Two Sum', difficulty: 'Easy', solved: 1245, rating: 4.8 },
      { id: 2, title: 'Container With Most Water', difficulty: 'Medium', solved: 892, rating: 4.6 },
      { id: 3, title: 'Trapping Rain Water', difficulty: 'Hard', solved: 567, rating: 4.9 },
      { id: 4, title: 'Merge Sorted Array', difficulty: 'Easy', solved: 2103, rating: 4.7 },
      { id: 5, title: 'Maximum Subarray', difficulty: 'Medium', solved: 1456, rating: 4.8 },
      { id: 6, title: 'Product of Array Except Self', difficulty: 'Medium', solved: 1089, rating: 4.7 },
    ],
    strings: [
      { id: 7, title: 'Longest Substring Without Repeating', difficulty: 'Medium', solved: 978, rating: 4.7 },
      { id: 8, title: 'Palindrome Check', difficulty: 'Easy', solved: 1876, rating: 4.5 },
      { id: 9, title: 'Longest Palindromic Substring', difficulty: 'Medium', solved: 745, rating: 4.8 },
      { id: 10, title: 'Regular Expression Matching', difficulty: 'Hard', solved: 423, rating: 4.9 },
      { id: 11, title: 'Anagram Groups', difficulty: 'Medium', solved: 834, rating: 4.6 },
    ],
    trees: [
      { id: 12, title: 'Binary Tree Level Order', difficulty: 'Medium', solved: 856, rating: 4.7 },
      { id: 13, title: 'Lowest Common Ancestor', difficulty: 'Medium', solved: 678, rating: 4.8 },
      { id: 14, title: 'Serialize and Deserialize BST', difficulty: 'Hard', solved: 412, rating: 4.9 },
      { id: 15, title: 'Path Sum', difficulty: 'Easy', solved: 1234, rating: 4.6 },
    ],
    graphs: [
      { id: 16, title: 'Number of Islands', difficulty: 'Medium', solved: 945, rating: 4.8 },
      { id: 17, title: 'Course Schedule', difficulty: 'Medium', solved: 823, rating: 4.7 },
      { id: 18, title: 'Word Ladder', difficulty: 'Hard', solved: 534, rating: 4.9 },
    ],
    dp: [
      { id: 19, title: 'Climbing Stairs', difficulty: 'Easy', solved: 2456, rating: 4.5 },
      { id: 20, title: 'Coin Change', difficulty: 'Medium', solved: 1289, rating: 4.8 },
      { id: 21, title: 'Edit Distance', difficulty: 'Hard', solved: 678, rating: 4.9 },
    ],
  }

  const categories = [
    { key: 'arrays', name: 'Arrays', icon: '[]', count: 6 },
    { key: 'strings', name: 'Strings', icon: '{}', count: 5 },
    { key: 'trees', name: 'Trees', icon: '🌳', count: 4 },
    { key: 'graphs', name: 'Graphs', icon: '◇', count: 3 },
    { key: 'dp', name: 'Dynamic Programming', icon: 'DP', count: 3 },
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-700'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700'
      case 'Hard':
        return 'bg-red-100 text-red-700'
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
            <Code2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Practice Problems</h1>
          </div>
          <p className="text-slate-600 text-lg">Master DSA with curated problems organized by topic and difficulty</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 lg:mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(selectedCategory === cat.key ? null : cat.key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedCategory === cat.key
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-blue-400'
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-sm sm:text-base text-slate-900">{cat.name}</div>
              <div className="text-xs text-slate-500 mt-1">{cat.count} problems</div>
            </button>
          ))}
        </div>

        {/* Problems List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left: All Problems or Selected Category */}
          <div className="lg:col-span-2">
            {selectedCategory ? (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 sm:mb-6 capitalize">
                  {selectedCategory} Problems
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {problems[selectedCategory].map((problem) => (
                    <div
                      key={problem.id}
                      className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all hover:border-blue-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-slate-900">{problem.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                            <span>👥 {problem.solved.toLocaleString()} solved</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                              <span>{problem.rating}</span>
                            </div>
                          </div>
                        </div>
                        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                          Solve <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4 sm:mb-6">All Problems</h2>
                <div className="space-y-3 sm:space-y-4">
                  {Object.values(problems)
                    .flat()
                    .slice(0, 12)
                    .map((problem) => (
                      <div
                        key={problem.id}
                        className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-all hover:border-blue-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-semibold text-slate-900">{problem.title}</h3>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                {problem.difficulty}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-600">
                              <span>👥 {problem.solved.toLocaleString()} solved</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                <span>{problem.rating}</span>
                              </div>
                            </div>
                          </div>
                          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                            Solve <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-blue-600">104+</div>
            <div className="text-slate-600 text-sm mt-1">Total Problems</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-green-600">32</div>
            <div className="text-slate-600 text-sm mt-1">Easy</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-yellow-600">48</div>
            <div className="text-slate-600 text-sm mt-1">Medium</div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200 text-center">
            <div className="text-3xl font-bold text-red-600">24</div>
            <div className="text-slate-600 text-sm mt-1">Hard</div>
          </div>
        </div>
      </div>
    </div>
  )
}
