import { User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-slate-900">Placement Prep</h1>
      
      {/* User Avatar */}
      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-primary" />
      </div>
    </header>
  )
}
