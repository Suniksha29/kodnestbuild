import { Building2, Briefcase, Users } from 'lucide-react'
import Card, { CardHeader, CardContent } from './Card'

export default function CompanyIntel({ company, industry, size, hiringFocus }) {
  const getSizeColor = (sizeLabel) => {
    if (sizeLabel === 'Enterprise') return 'bg-red-50 border-red-200 text-red-900'
    if (sizeLabel === 'Mid-size') return 'bg-blue-50 border-blue-200 text-blue-900'
    return 'bg-green-50 border-green-200 text-green-900'
  }

  const getSizeIcon = (sizeLabel) => {
    if (sizeLabel === 'Enterprise') return <Building2 className="w-5 h-5" />
    if (sizeLabel === 'Mid-size') return <Briefcase className="w-5 h-5" />
    return <Users className="w-5 h-5" />
  }

  return (
    <Card className="p-6 mb-8 border-2 border-slate-200">
      <CardHeader className="border-0 px-0 pt-0 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">Company Intel</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            Demo Mode: Heuristic Analysis
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="space-y-6">
          {/* Company Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Company Name */}
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-600 font-semibold mb-2">COMPANY NAME</p>
              <p className="text-lg font-bold text-slate-900">{company || 'Unknown'}</p>
            </div>

            {/* Industry */}
            <div className="p-4 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-600 font-semibold mb-2">INDUSTRY</p>
              <p className="text-lg font-bold text-slate-900">{industry}</p>
            </div>

            {/* Company Size */}
            <div className={`p-4 border-2 rounded-lg ${getSizeColor(size)}`}>
              <p className="text-xs font-semibold mb-2">COMPANY SIZE</p>
              <div className="flex items-center gap-2">
                {getSizeIcon(size)}
                <div>
                  <p className="font-bold">{size}</p>
                  <p className="text-xs opacity-75">Employees: {
                    size === 'Enterprise' ? '2,000+' :
                    size === 'Mid-size' ? '200–2,000' :
                    '< 200'
                  }</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hiring Focus */}
          <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
            <h4 className="font-semibold text-slate-900 mb-3">
              Typical Hiring Focus for {size}
            </h4>
            <p className="text-sm text-slate-700 mb-4">
              {hiringFocus.description}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600">Key Focus Areas:</p>
              <div className="flex flex-wrap gap-2">
                {hiringFocus.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-white text-slate-700 border border-slate-300 text-sm rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800">
              <span className="font-semibold">ℹ️ Note:</span> Company intel is generated heuristically based on job description analysis. Size classification uses known company lists and keyword patterns for unknown organizations.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
