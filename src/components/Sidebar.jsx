import { Link, useLocation } from 'react-router-dom'
import { BarChart3, Code2, FileText, BookOpen, User, Zap, ClipboardList } from 'lucide-react'

export default function Sidebar() {
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/practice', label: 'Practice', icon: Code2 },
    { path: '/assessments', label: 'Assessments', icon: FileText },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/analyzer', label: 'Analyzer', icon: Zap },
    { path: '/history', label: 'History', icon: ClipboardList },
    { path: '/profile', label: 'Profile', icon: User },
  ]

  return (
    <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col border-r border-slate-800">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">PP</span>
          </div>
          <span className="font-bold text-lg">PlacePrepare</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-center text-sm text-slate-400">
        <p>© 2026 PlacePrepare</p>
      </div>
    </aside>
  )
}
