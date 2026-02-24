import CircularProgress from '../components/CircularProgress'
import SkillBreakdownChart from '../components/SkillBreakdownChart'
import ContinuePractice from '../components/ContinuePractice'
import WeeklyGoals from '../components/WeeklyGoals'
import UpcomingAssessments from '../components/UpcomingAssessments'
import Card, { CardHeader, CardContent } from '../components/Card'
import ProgressBar from '../components/ProgressBar'

export default function Dashboard() {
  return (
    <div className="p-lg bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-lg">Dashboard</h2>

        {/* Main Grid - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Overall Readiness */}
            <Card className="p-lg">
              <CardHeader className="border-0 px-0 pt-0">
                <h3 className="text-xl font-semibold text-primary">Overall Readiness</h3>
              </CardHeader>
              <CardContent className="px-0">
                <div className="flex justify-center py-lg">
                  <div className="relative w-40 h-40">
                    <CircularProgress score={72} max={100} />
                  </div>
                </div>
                <p className="text-center text-sm text-secondary mt-lg">
                  You're performing well! Keep practicing to improve further.
                </p>
              </CardContent>
            </Card>

            {/* Continue Practice */}
            <Card className="p-md">
              <CardHeader className="border-0 px-0 pt-0">
                <h3 className="text-lg font-semibold text-primary">Continue Practice</h3>
              </CardHeader>
              <CardContent className="px-0">
                <ContinuePractice />
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-lg">
            {/* Skill Breakdown */}
            <Card className="p-md">
              <CardHeader className="border-0 px-0 pt-0 mb-md">
                <h3 className="text-xl font-semibold text-primary">Skill Breakdown</h3>
              </CardHeader>
              <CardContent className="px-0">
                <SkillBreakdownChart />
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card className="p-md">
              <CardHeader className="border-0 px-0 pt-0 mb-md">
                <h3 className="text-lg font-semibold text-primary">Weekly Goals</h3>
              </CardHeader>
              <CardContent className="px-0">
                <WeeklyGoals />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Full Width Bottom Section */}
        <div className="mt-lg grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* Quick Stats */}
          <div className="space-y-md">
            <div className="bg-surface rounded-lg border border-border p-md">
              <p className="text-secondary text-sm mb-2">Total Problems Solved</p>
              <p className="text-3xl font-bold text-primary">142</p>
            </div>
            <div className="bg-surface rounded-lg border border-border p-md">
              <p className="text-secondary text-sm mb-2">Mock Interviews</p>
              <p className="text-3xl font-bold text-primary">8</p>
            </div>
            <div className="bg-surface rounded-lg border border-border p-md">
              <p className="text-secondary text-sm mb-2">Accuracy Rate</p>
              <p className="text-3xl font-bold text-primary">78%</p>
            </div>
          </div>

          {/* Upcoming Assessments - spans 2 columns on large screens */}
          <Card className="lg:col-span-2 p-md">
            <CardHeader className="border-0 px-0 pt-0 mb-md">
              <h3 className="text-xl font-semibold text-primary">Upcoming Assessments</h3>
            </CardHeader>
            <CardContent className="px-0">
              <UpcomingAssessments />
            </CardContent>
          </Card>
        </div>

        {/* Learning Path Progress */}
        <div className="mt-lg bg-surface rounded-lg border border-border p-md">
          <h3 className="text-xl font-semibold text-primary mb-md">Learning Path Progress</h3>
          <div className="space-y-md">
            <div>
              <h4 className="font-medium text-primary mb-2">Data Structures & Algorithms</h4>
              <ProgressBar current={42} total={50} />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">System Design Fundamentals</h4>
              <ProgressBar current={18} total={30} />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-2">Interview Soft Skills</h4>
              <ProgressBar current={12} total={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
