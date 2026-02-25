// Heuristic rules for company classification
const KNOWN_ENTERPRISES = [
  'amazon', 'google', 'microsoft', 'meta', 'facebook', 'apple', 'netflix', 'uber',
  'infosys', 'tcs', 'accenture', 'cognizant', 'wipro', 'ibm', 'adobe',
  'salesforce', 'oracle', 'linkedin', 'goldman', 'morgan', 'jpmorgan',
  'samsung', 'qualcomm', 'intel', 'nvidia', 'tesla', 'walmart',
  'airbnb', 'stripe', 'dropbox', 'slack', 'atlassian', 'databricks'
]

const INDUSTRY_KEYWORDS = {
  'FinTech': ['banking', 'finance', 'fintech', 'payment', 'transaction', 'crypto', 'blockchain', 'trading'],
  'E-Commerce': ['ecommerce', 'shopping', 'retail', 'commerce', 'marketplace', 'inventory'],
  'Healthcare': ['healthcare', 'health', 'medical', 'hospital', 'clinic', 'patient', 'pharma', 'wellness'],
  'EdTech': ['education', 'learning', 'course', 'student', 'training', 'online learning'],
  'SaaS': ['saas', 'cloud service', 'subscription', 'software as', 'api platform'],
  'Media & Entertainment': ['media', 'entertainment', 'streaming', 'video', 'music', 'content'],
  'Consulting': ['consulting', 'business consulting', 'management'],
  'IT Services': ['it services', 'outsourcing', 'managed services', 'bpo', 'ito']
}

export function inferCompanySize(companyName) {
  if (!companyName) return 'Startup'
  
  const name = companyName.toLowerCase().trim()
  
  // Check against known enterprises
  if (KNOWN_ENTERPRISES.some(ent => name.includes(ent))) {
    return 'Enterprise'
  }
  
  // Default to Startup for unknown companies
  return 'Startup'
}

export function inferIndustry(jdText, companyName) {
  if (!jdText) return 'Technology Services'
  
  const text = jdText.toLowerCase()
  
  for (const [industry, keywords] of Object.entries(INDUSTRY_KEYWORDS)) {
    if (keywords.some(keyword => text.includes(keyword))) {
      return industry
    }
  }
  
  return 'Technology Services'
}

export function getCompanySizeLabel(companyName) {
  const size = inferCompanySize(companyName)
  const labels = {
    'Startup': '< 200',
    'Mid-size': '200 – 2,000',
    'Enterprise': '2,000 +'
  }
  return labels[size] || labels['Startup']
}

export function getHiringFocus(companySize) {
  const focus = {
    'Enterprise': {
      title: 'Structured DSA + Core Fundamentals',
      description: 'Large companies emphasize algorithmic problem-solving, system design, and deep CS fundamentals across multiple rounds.',
      skills: ['DSA', 'System Design', 'Problem Solving', 'Core CS']
    },
    'Mid-size': {
      title: 'Balanced Technical + Practical Skills',
      description: 'Mid-size companies balance structured coding interviews with practical project experience and domain expertise.',
      skills: ['DSA', 'Project Implementation', 'Problem Solving', 'Tech Stack']
    },
    'Startup': {
      title: 'Practical Problem Solving + Stack Depth',
      description: 'Startups focus on practical coding ability, quick delivery, and deep expertise in their tech stack.',
      skills: ['Practical Coding', 'Stack Expertise', 'Problem Solving', 'Rapid Development']
    }
  }
  return focus[companySize] || focus['Startup']
}

export function generateRoundMapping(companySize, detectedSkills, detectedCategories) {
  const detectedSkillsStr = Object.values(detectedSkills)
    .flat()
    .join(' ')
    .toLowerCase()

  const hasDSA = detectedCategories.includes('Core CS')
  const hasWeb = detectedCategories.includes('Web')
  const hasDevOps = detectedCategories.includes('Cloud/DevOps')
  const hasData = detectedCategories.includes('Data')

  let rounds = []

  if (companySize === 'Enterprise') {
    if (hasDSA) {
      rounds = [
        {
          number: 1,
          title: 'Online Test (DSA + Aptitude)',
          description: 'Timed coding challenges and aptitude questions in a proctored environment.',
          focus: ['DSA', 'Time Management', 'Aptitude'],
          duration: '90-120 mins',
          why: 'Screens for coding fundamentals and basic problem-solving ability across large candidate pool.'
        },
        {
          number: 2,
          title: 'Technical Interview (DSA + Core CS)',
          description: 'In-depth coding problems, complexity analysis, and core computer science concepts.',
          focus: ['DSA', 'System Design', 'Core CS Fundamentals'],
          duration: '60 mins',
          why: 'Deep dive into problem-solving approach, code quality, and theoretical understanding.'
        },
        {
          number: 3,
          title: 'Advanced Technical (Projects + Architecture)',
          description: 'Discuss real projects, system design, and architectural decisions.',
          focus: hasWeb ? ['System Design', 'API Design', 'Scalability'] : ['Architecture', 'Optimization', 'Design Patterns'],
          duration: '45 mins',
          why: 'Validates ability to design and build production-level systems independently.'
        },
        {
          number: 4,
          title: 'HR & Cultural Fit',
          description: 'Behavioral interview covering work style, collaboration, and career goals.',
          focus: ['Communication', 'Teamwork', 'Adaptability'],
          duration: '30 mins',
          why: 'Ensures alignment with company culture and team dynamics.'
        }
      ]
    } else {
      rounds = [
        {
          number: 1,
          title: 'Initial Screening (General Coding)',
          description: 'Basic coding problems and logical reasoning assessment.',
          focus: ['Problem Solving', 'Coding Basics'],
          duration: '60 mins',
          why: 'Evaluates foundational programming ability and logical thinking.'
        },
        {
          number: 2,
          title: 'Technical Interview',
          description: 'In-depth technical discussion and coding solutions.',
          focus: ['Technical Skills', 'Code Quality'],
          duration: '60 mins',
          why: 'Assesses depth of technical knowledge and coding proficiency.'
        },
        {
          number: 3,
          title: 'Project Discussion + Design',
          description: 'Deep dive into portfolio projects and design approach.',
          focus: ['Project Experience', 'Design Skills'],
          duration: '45 mins',
          why: 'Validates real-world project execution and design thinking.'
        },
        {
          number: 4,
          title: 'HR & Managerial',
          description: 'Behavioral and cultural fit interview.',
          focus: ['Soft Skills', 'Team Fit'],
          duration: '30 mins',
          why: 'Ensures cohesion with team and long-term potential.'
        }
      ]
    }
  } else if (companySize === 'Mid-size') {
    if (hasWeb || hasDevOps) {
      rounds = [
        {
          number: 1,
          title: 'Technical Coding (Full-Stack)',
          description: 'Practical coding challenge with emphasis on full-stack capability.',
          focus: hasWeb ? ['Frontend', 'Backend', 'Database'] : ['Infrastructure', 'Deployment'],
          duration: '90 mins',
          why: 'Tests practical ability to implement working solutions end-to-end.'
        },
        {
          number: 2,
          title: 'System Discussion & Architecture',
          description: 'Discuss approach, architecture decisions, and scalability considerations.',
          focus: ['System Design', 'Technical Decision Making'],
          duration: '60 mins',
          why: 'Evaluates engineering maturity and ability to think about system design.'
        },
        {
          number: 3,
          title: 'Culture Fit & Projects',
          description: 'Informal discussion about work style, past projects, and team collaboration.',
          focus: ['Collaboration', 'Project Experience', 'Culture'],
          duration: '45 mins',
          why: 'Assesses team fit and practical project delivery experience.'
        }
      ]
    } else if (hasDSA) {
      rounds = [
        {
          number: 1,
          title: 'Coding Challenge',
          description: 'Medium-level DSA coding problems with time constraints.',
          focus: ['DSA', 'Problem Solving'],
          duration: '75 mins',
          why: 'Evaluates algorithmic thinking and coding ability.'
        },
        {
          number: 2,
          title: 'Technical Round',
          description: 'Discussion of approach, optimization, and related concepts.',
          focus: ['Technical Knowledge', 'System Thinking'],
          duration: '60 mins',
          why: 'Validates problem-solving approach and technical depth.'
        },
        {
          number: 3,
          title: 'HR & Final Discussion',
          description: 'Behavioral questions and final cultural fit discussion.',
          focus: ['Communication', 'Team Fit'],
          duration: '30 mins',
          why: 'Confirms mutual fit and discusses role expectations.'
        }
      ]
    } else {
      rounds = [
        {
          number: 1,
          title: 'Technical Interview',
          description: 'Practical coding and technical capability assessment.',
          focus: ['Technical Skills', 'Problem Solving'],
          duration: '60 mins',
          why: 'Evaluates baseline technical competency.'
        },
        {
          number: 2,
          title: 'Project & Experience Discussion',
          description: 'Deep dive into past projects and technical experience.',
          focus: ['Project Experience', 'Learning Ability'],
          duration: '45 mins',
          why: 'Validates real-world project delivery and growth trajectory.'
        },
        {
          number: 3,
          title: 'HR Round',
          description: 'Final cultural fit and role alignment discussion.',
          focus: ['Culture', 'Career Goals'],
          duration: '30 mins',
          why: 'Ensures alignment with role and company culture.'
        }
      ]
    }
  } else { // Startup
    if (hasWeb) {
      rounds = [
        {
          number: 1,
          title: 'Practical Coding Challenge',
          description: 'Real-world project scenario on their tech stack (most likely React/Node).',
          focus: ['React', 'Node.js', 'Practical Implementation'],
          duration: '60-90 mins',
          why: 'Startups need developers who can immediately contribute to live product.'
        },
        {
          number: 2,
          title: 'System Discussion & Deep Dive',
          description: 'Discuss approach, architecture, and scalability thinking.',
          focus: ['Architecture', 'Code Quality', 'Scalability'],
          duration: '45 mins',
          why: 'Evaluates whether candidate thinks about real-world constraints.'
        },
        {
          number: 3,
          title: 'Culture Fit & Team Synergy',
          description: 'Informal discussion about work style, collaboration, and startup mentality.',
          focus: ['Collaboration', 'Adaptability', 'Startup Mindset'],
          duration: '45 mins',
          why: 'Startup success depends heavily on team dynamics and adaptability.'
        }
      ]
    } else if (hasDevOps) {
      rounds = [
        {
          number: 1,
          title: 'Infrastructure Challenge',
          description: 'Practical DevOps/Infrastructure scenario on their tools.',
          focus: ['Docker', 'Kubernetes', 'CI/CD'],
          duration: '60 mins',
          why: 'Validates ability to quickly set up and manage infrastructure for agile deployment.'
        },
        {
          number: 2,
          title: 'Architecture & Decision Making',
          description: 'Discuss system architecture and technical decision-making.',
          focus: ['System Design', 'Problem Solving'],
          duration: '45 mins',
          why: 'Evaluates engineering judgment on practical tools and trade-offs.'
        },
        {
          number: 3,
          title: 'Team Fit & Vision',
          description: 'Discuss work style, past achievements, and alignment with startup vision.',
          focus: ['Teamwork', 'Vision Alignment'],
          duration: '30 mins',
          why: 'Startup success requires team players with shared vision.'
        }
      ]
    } else {
      rounds = [
        {
          number: 1,
          title: 'Coding + Problem-Solving',
          description: 'Practical coding challenge focused on the core stack.',
          focus: ['Practical Problem Solving', 'Code Quality'],
          duration: '60 mins',
          why: 'Startups need pragmatic, self-sufficient developers.'
        },
        {
          number: 2,
          title: 'Technical + Product Discussion',
          description: 'Discuss past work, product thinking, and approach to challenges.',
          focus: ['Product Sense', 'Rapid Learning'],
          duration: '45 mins',
          why: 'Validates ability to learn quickly and contribute beyond code.'
        },
        {
          number: 3,
          title: 'Culture & Team Chemistry',
          description: 'Casual discussion about collaboration and fit with team.',
          focus: ['Team Chemistry', 'Flexibility'],
          duration: '30 mins',
          why: 'In startups, team cohesion is as important as technical skills.'
        }
      ]
    }
  }

  return rounds
}

export default {
  inferCompanySize,
  inferIndustry,
  getCompanySizeLabel,
  getHiringFocus,
  generateRoundMapping
}
