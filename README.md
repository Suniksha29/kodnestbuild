# Placement Readiness Platform

A comprehensive React-based platform for job placement preparation with interactive dashboards, skill tracking, and assessment management.

## Features Implemented

### 1. Landing Page (`/`)
- **Hero Section**: "Ace Your Placement" with subheading and "Get Started" button
- **Features Grid**: 3-column layout with:
  - Practice Problems (with code icon)
  - Mock Interviews (with video icon)
  - Track Progress (with chart icon)
- **Footer**: Copyright information
- **Color Scheme**: Indigo/Purple primary color (hsl(245, 58%, 51%))

### 2. Dashboard App Shell
- **Sidebar Navigation**: 
  - Dashboard, Practice, Assessments, Resources, Profile
  - Lucide-react icons for each item
  - Active route highlighting
- **Header**: "Placement Prep" title with user avatar
- **Main Content Area**: Uses React Router Outlet for nested routes
- **Responsive Design**: Full-height layout with flexible content

### 3. Comprehensive Dashboard (`/dashboard`)

#### Components:
1. **Overall Readiness** (Left Column)
   - Circular progress indicator (SVG with stroke-dasharray animation)
   - Shows 72/100 readiness score
   - Centered number with "Readiness Score" label

2. **Skill Breakdown** (Right Column)
   - Recharts Radar chart with 5 axes:
     - DSA: 75
     - System Design: 60
     - Communication: 80
     - Resume: 85
     - Aptitude: 70
   - ResponsiveContainer for mobile compatibility
   - Custom color scheme with primary color

3. **Continue Practice** (Left Column)
   - Shows "Dynamic Programming" topic
   - Progress bar (3/10 completed)
   - "Continue Practice" button with arrow icon

4. **Weekly Goals** (Right Column)
   - Problems solved progress: 12/20
   - 7-day activity circles (Mon-Sun)
   - Days with activity are highlighted in primary color

5. **Upcoming Assessments** (Bottom)
   - 3 scheduled assessments with:
     - DSA Mock Test - Tomorrow, 10:00 AM
     - System Design Review - Wednesday, 2:00 PM
     - HR Interview Prep - Friday, 11:00 AM
   - Calendar and clock icons
   - Schedule buttons for each assessment

6. **Quick Stats** (Bottom Left)
   - Total Problems Solved: 142
   - Mock Interviews: 8
   - Accuracy Rate: 78%

7. **Learning Path Progress** (Bottom Full Width)
   - Three learning tracks with progress bars:
     - Data Structures & Algorithms (42/50)
     - System Design Fundamentals (18/30)
     - Interview Soft Skills (12/20)

### 4. Other Pages (Placeholder)
- **Practice** (`/practice`): Coding problems section
- **Assessments** (`/assessments`): Mock interviews and technical tests
- **Resources** (`/resources`): Study materials and tutorials
- **Profile** (`/profile`): User profile and settings

## Technology Stack

- **Frontend Framework**: React 18.2
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 6.20
- **Charts**: Recharts 2.10
- **Icons**: Lucide React 0.294

## Project Structure

```
PlacementReadinessPlatform/
├── src/
│   ├── components/
│   │   ├── Card.jsx                  # Card component with header/content
│   │   ├── CircularProgress.jsx      # SVG circular progress indicator
│   │   ├── ContinuePractice.jsx      # Continue practice card
│   │   ├── Header.jsx                # Dashboard header
│   │   ├── ProgressBar.jsx           # Horizontal progress bar
│   │   ├── Sidebar.jsx               # Sidebar navigation
│   │   ├── SkillBreakdownChart.jsx   # Recharts radar chart
│   │   ├── UpcomingAssessments.jsx   # Assessments list
│   │   └── WeeklyGoals.jsx           # Weekly progress with day circles
│   ├── layouts/
│   │   └── DashboardLayout.jsx       # Dashboard layout wrapper
│   ├── pages/
│   │   ├── Landing.jsx               # Landing page
│   │   ├── Dashboard.jsx             # Main dashboard
│   │   ├── Practice.jsx              # Practice problems
│   │   ├── Assessments.jsx           # Assessments
│   │   ├── Resources.jsx             # Resources
│   │   └── Profile.jsx               # User profile
│   ├── App.jsx                       # Main app with routing
│   ├── main.jsx                      # React DOM entry
│   └── index.css                     # Tailwind CSS imports
├── index.html                        # HTML entry
├── tailwind.config.js                # Tailwind configuration
├── postcss.config.js                 # PostCSS configuration
├── vite.config.js                    # Vite configuration
└── package.json                      # Dependencies
```

## Color Scheme

- **Primary**: hsl(245, 58%, 51%) - Indigo/Purple
- **Primary Light**: hsl(245, 58%, 61%)
- **Primary Dark**: hsl(245, 58%, 41%)
- **Background**: Neutral grays (slate-50 to slate-900)

## Responsive Design

- **Desktop**: 2-column grid layouts for optimal space usage
- **Tablet**: Flexible grid that adapts to available space
- **Mobile**: Single column stacking of all components

## Features

✅ Interactive dashboard with real-time data visualization
✅ Circular progress animation with custom SVG
✅ Radar chart for multi-axis skill comparison
✅ Daily activity tracking with visual indicators
✅ Responsive design for all screen sizes
✅ Smooth transitions and hover effects
✅ Icon integration for better UX
✅ Clean, professional UI

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

The application will run on `http://localhost:3000/`

## Future Enhancements

- User authentication
- Database integration for persistent data
- Real assessments and practice problems
- Progress analytics
- Team collaboration features
- Certificate generation
- Admin dashboard

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready
