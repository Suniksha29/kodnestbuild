import { User } from 'lucide-react'

export default function Profile() {
  return (
    <div className="p-8">
      <div className="max-w-5xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Profile</h2>
        
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">User Profile</h3>
              <p className="text-slate-600 mb-4">
                Manage your profile information, preferences, and account settings.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
