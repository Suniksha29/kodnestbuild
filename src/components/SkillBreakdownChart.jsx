import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

const data = [
  { subject: 'DSA', value: 75 },
  { subject: 'System Design', value: 60 },
  { subject: 'Communication', value: 80 },
  { subject: 'Resume', value: 85 },
  { subject: 'Aptitude', value: 70 },
]

export default function SkillBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="#E2E8F0" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
        <Radar 
          name="Score" 
          dataKey="value" 
          stroke="hsl(245, 58%, 51%)" 
          fill="hsl(245, 58%, 51%)" 
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
