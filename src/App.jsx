import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Practice from './pages/Practice'
import Assessments from './pages/Assessments'
import Resources from './pages/Resources'
import Profile from './pages/Profile'
import Analyzer from './pages/Analyzer'
import Results from './pages/Results'
import History from './pages/History'

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<Landing />} />

        {/* Dashboard Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Analysis Routes */}
        <Route path="/analyzer" element={<Analyzer />} />
        <Route path="/results/:analysisId" element={<Results />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  )
}

export default App
