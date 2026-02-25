import { extractSkills } from './skillsDetector'
import {
  inferCompanySize,
  inferIndustry,
  getHiringFocus,
  generateRoundMapping
} from './companyIntelService'
import {
  createAnalysisEntry,
  ensureValidSkills
} from './dataValidator'
import {
  calculateBaseScore,
  createScoreObject
} from './scoreManagement'

const PREPARATION_TEMPLATES = {
  'Round 1: Aptitude & Basics': {
    default: [
      'Solve basic aptitude problems (10-15 mins)',
      'Review quantitative reasoning concepts',
      'Practice logical reasoning puzzles',
      'Understand problem-solving approach',
      'Learn time management for tests',
      'Review basic mathematics fundamentals',
      'Practice speed and accuracy drills'
    ]
  },
  'Round 2: DSA & Core CS': {
    'Core CS': [
      'Review data structure basics (Arrays, Linked Lists)',
      'Practice sorting and searching algorithms',
      'Cover searching algorithms (Binary Search, Linear Search)',
      'Understand time and space complexity',
      'Solve medium-level DSA problems (15-20)',
      'Review DBMS normalization and queries',
      'Study OS concepts: processes, threads, scheduling'
    ]
  },
  'Round 3: Tech Interview': {
    default: [
      'Prepare project walkthroughs (2-3 projects)',
      'Code a complete solution in 45 mins',
      'Explain architecture and design decisions',
      'Discuss challenges faced and solutions',
      'Be ready for follow-up technical questions',
      'Practice system design basics',
      'Review resume projects thoroughly'
    ],
    'Web': [
      'Prepare project walkthroughs with frontend/backend',
      'Code complete solutions end-to-end',
      'Explain API design and database structure',
      'Discuss state management approach',
      'Be ready for performance and scalability questions',
      'Practice responsive design explanations',
      'Review production deployment experience'
    ],
    'Cloud/DevOps': [
      'Prepare deployment architecture walkthrough',
      'Explain infrastructure as code',
      'Discuss scaling and monitoring setup',
      'Practice explaining CI/CD pipeline',
      'Be ready for disaster recovery questions',
      'Review cloud cost optimization',
      'Discuss containerization strategy'
    ]
  },
  'Round 4: HR & Managerial': {
    default: [
      'Prepare "Tell me about yourself" (2 mins)',
      'Have 3-5 clear project stories ready',
      'Research company culture and values',
      'Prepare questions to ask interviewer',
      'Practice STAR method for behavioral questions',
      'Discuss salary expectations',
      'Prepare for "Why this role?" question'
    ]
  }
}

const INTERVIEW_QUESTION_TEMPLATES = {
  'Core CS': [
    'Explain the difference between Stack and Queue with real-world use cases.',
    'How would you optimize a linear search algorithm? When is binary search not applicable?',
    'What is the difference between process and thread? When would you use each?',
    'Explain database normalization and its importance. What is 3NF?',
    'How does TCP/IP protocol work? Explain the three-way handshake.'
  ],
  'Languages': [
    'Explain the concept of polymorphism. Provide examples in your preferred language.',
    'What is the difference between pass by value and pass by reference?',
    'Explain memory management in your language. How does garbage collection work?',
    'What are the differences between compiled and interpreted languages?',
    'Explain exception handling and error management best practices.'
  ],
  'Web': [
    'Explain React state vs props. How do you manage state in complex applications?',
    'What is the virtual DOM? How does React reconciliation work?',
    'Explain the difference between REST and GraphQL APIs. When would you use each?',
    'How would you optimize a slow-loading React component?',
    'Explain server-side rendering vs client-side rendering. What are the trade-offs?'
  ],
  'Data': [
    'When would you use SQL vs NoSQL? Provide pros and cons of each.',
    'Explain database indexing. How does it improve query performance?',
    'What is the N+1 query problem and how would you solve it?',
    'Explain ACID properties in databases. Why are they important?',
    'How would you design a database schema for a social media application?'
  ],
  'Cloud/DevOps': [
    'Explain the differences between EC2, RDS, and S3 on AWS.',
    'How would you design a highly available and scalable system?',
    'Explain containerization vs virtualization. When would you use each?',
    'What is Infrastructure as Code? How does it benefit DevOps?',
    'Explain blue-green deployment and canary deployment strategies.'
  ],
  'Testing': [
    'What is the difference between unit, integration, and E2E testing?',
    'How would you write automated tests for a React component?',
    'Explain test-driven development (TDD). What are its benefits?',
    'How would you test API endpoints? What should you validate?',
    'Explain code coverage. What percentage should you aim for?'
  ]
}

const DAILY_PLAN_STRUCTURE = {
  'Day 1-2: Core Fundamentals': {
    focus: ['Core CS', 'Languages'],
    tasks: [
      'Review data structure basics (1 hrs)',
      'Learn complexity analysis - O(n), O(log n), O(n²) (45 mins)',
      'Solve 5 easy-level problems on arrays/strings (1.5 hrs)',
      'Review OOP concepts and design patterns (45 mins)',
      'Self-review and notes (15 mins)'
    ]
  },
  'Day 3-4: DSA & Coding Practice': {
    focus: ['Core CS'],
    tasks: [
      'Deep dive into sorting algorithms (1 hr)',
      'Practice searching algorithms (45 mins)',
      'Solve 8-10 medium-level problems (2 hrs)',
      'Analyze time/space for each solution (30 mins)',
      'Practice on one advanced problem (45 mins)',
      'Discuss solutions with peers (30 mins)'
    ]
  },
  'Day 5: Projects & Alignment': {
    focus: ['Web', 'Cloud/DevOps'],
    tasks: [
      'Select and document 2-3 key projects (1 hr)',
      'Create 1-page project summary for each (1.5 hrs)',
      'Practice project walkthrough presentation (1 hr)',
      'Align resume skills with job description (45 mins)',
      'Prepare answers for technical follow-ups (45 mins)'
    ]
  },
  'Day 6: Mock Interviews': {
    focus: [],
    tasks: [
      'Take a full mock interview (2 hrs)',
      'Review mock interview feedback (30 mins)',
      'Practice answers to common questions (1 hr)',
      'Record yourself and review (45 mins)',
      'Discuss difficult questions with mentor (30 mins)',
      'Polish answers and practice again (30 mins)'
    ]
  },
  'Day 7: Revision & Weak Areas': {
    focus: [],
    tasks: [
      'Identify weak areas from practice (30 mins)',
      'Focused revision on weak topics (2 hrs)',
      'Quick review of all key concepts (1 hr)',
      'Solve quick problems for speed (45 mins)',
      'Mentally prepare for interview (30 mins)',
      'Review company and role details (30 mins)'
    ]
  }
}

export function generatePreparationChecklist(detectedCategories) {
  const checklist = {}

  Object.entries(PREPARATION_TEMPLATES).forEach(([round, templates]) => {
    let items = templates.default || []

    // Customize based on detected skills
    if (templates[detectedCategories[0]]) {
      items = templates[detectedCategories[0]]
    }

    checklist[round] = items.map(item => ({
      text: item,
      completed: false
    }))
  })

  return checklist
}

export function generate7DayPlan(detectedCategories) {
  const plan = {}

  Object.entries(DAILY_PLAN_STRUCTURE).forEach(([day, config]) => {
    let tasks = config.tasks

    // Customize based on detected skills
    if (config.focus.length > 0) {
      const focusSkills = config.focus.filter(s => detectedCategories.includes(s))
      // Tasks are same, but we could customize further if needed
    }

    plan[day] = {
      focus: config.focus.filter(s => detectedCategories.includes(s)),
      tasks: tasks
    }
  })

  return plan
}

export function generateInterviewQuestions(detectedCategories) {
  const questions = []
  const usedQuestions = new Set()

  // Prioritize detected skills
  detectedCategories.forEach(category => {
    if (INTERVIEW_QUESTION_TEMPLATES[category]) {
      INTERVIEW_QUESTION_TEMPLATES[category].forEach(q => {
        if (!usedQuestions.has(q)) {
          questions.push({
            question: q,
            category: category,
            difficulty: 'medium'
          })
          usedQuestions.add(q)
        }
      })
    }
  })

  // Add general questions if needed
  if (questions.length < 10) {
    const generalQuestions = [
      'Tell me about a challenging project you worked on and how you solved it.',
      'Describe your experience with version control and working in teams.',
      'How do you approach learning new technologies?',
      'What is your biggest strength as a developer?',
      'How do you handle debugging a complex issue?'
    ]

    generalQuestions.forEach(q => {
      if (questions.length < 10 && !usedQuestions.has(q)) {
        questions.push({
          question: q,
          category: 'General',
          difficulty: 'easy'
        })
        usedQuestions.add(q)
      }
    })
  }

  return questions.slice(0, 10)
}

export function calculateReadinessScore(jdText, company, role, detectedCategories) {
  // Use the new score management function
  return calculateBaseScore(jdText, company, role, detectedCategories)
}

export function analyzeJD(jdText, company = '', role = '') {
  const { detectedSkills, detectedCategories, totalCategories } = extractSkills(jdText)

  // Generate company intel
  const companySize = inferCompanySize(company)
  const industry = inferIndustry(jdText, company)
  const hiringFocus = getHiringFocus(companySize)
  const roundMapping = generateRoundMapping(companySize, detectedSkills, detectedCategories)

  // Calculate stable base score
  const baseScore = calculateReadinessScore(jdText, company, role, detectedCategories)

  // Create base analysis object
  const baseAnalysis = {
    company: company || '',
    role: role || '',
    jdText: jdText,
    detectedSkills: detectedSkills,
    detectedCategories: detectedCategories,
    totalCategories: totalCategories,
    preparationChecklist: generatePreparationChecklist(detectedCategories),
    sevenDayPlan: generate7DayPlan(detectedCategories),
    interviewQuestions: generateInterviewQuestions(detectedCategories),
    readinessScore: baseScore,
    baseScore: baseScore,
    finalScore: baseScore,
    timestamp: new Date().toISOString(),
    // Company Intel
    companyIntel: {
      size: companySize,
      industry: industry,
      hiringFocus: hiringFocus,
      roundMapping: roundMapping
    }
  }

  // Create standardized entry with all required fields
  const analysis = createAnalysisEntry(baseAnalysis)

  // Ensure skills exist (populate with defaults if needed)
  ensureValidSkills(analysis)

  return analysis
}

export default analyzeJD
