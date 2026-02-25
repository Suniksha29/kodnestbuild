/**
 * Data Validation and Schema Module
 * Ensures all analysis entries meet strict data requirements
 */

const MIN_JD_LENGTH = 200
const DEFAULT_SKILLS = ['Communication', 'Problem solving', 'Basic coding', 'Projects']

/**
 * Validates input JD text
 * @param {string} jdText - Job description text
 * @returns {object} { isValid: boolean, message: string, length: number }
 */
export function validateJDInput(jdText) {
  if (!jdText || typeof jdText !== 'string') {
    return {
      isValid: false,
      message: 'Job description must be a non-empty string',
      length: 0
    }
  }

  const trimmed = jdText.trim()
  const length = trimmed.length

  if (length === 0) {
    return {
      isValid: false,
      message: 'Job description cannot be empty',
      length: 0
    }
  }

  if (length < MIN_JD_LENGTH) {
    return {
      isValid: true, // Still valid, but warn
      message: `This JD is too short to analyze deeply (${length} chars). Paste full JD for better output.`,
      warning: true,
      length: length
    }
  }

  return {
    isValid: true,
    message: 'Valid JD input',
    length: length
  }
}

/**
 * Creates standardized analysis entry schema
 * Ensures all entries have consistent structure
 */
export function createAnalysisEntry(baseAnalysis = {}) {
  const now = new Date().toISOString()

  return {
    // Meta fields
    id: baseAnalysis.id || Date.now().toString(),
    createdAt: baseAnalysis.createdAt || now,
    updatedAt: baseAnalysis.updatedAt || now,

    // Input fields
    company: baseAnalysis.company || '',
    role: baseAnalysis.role || '',
    jdText: baseAnalysis.jdText || '',

    // Standardized skills schema
    extractedSkills: normalizeExtractedSkills(baseAnalysis.detectedSkills || baseAnalysis.extractedSkills || {}),

    // Scoring (stable: baseScore never changes, finalScore changes based on skills)
    baseScore: typeof baseAnalysis.readinessScore === 'number' ? baseAnalysis.readinessScore : baseAnalysis.baseScore || 50,
    finalScore: typeof baseAnalysis.finalScore === 'number' ? baseAnalysis.finalScore : baseAnalysis.readinessScore || 50,

    // Skill confidence (user's assessment)
    skillConfidenceMap: baseAnalysis.skillConfidenceMap || {},

    // Content sections
    roundMapping: normalizeRoundMapping(baseAnalysis.companyIntel?.roundMapping || baseAnalysis.roundMapping || []),
    checklist: normalizeChecklist(baseAnalysis.preparationChecklist || baseAnalysis.checklist || {}),
    plan7Days: normalize7DayPlan(baseAnalysis.sevenDayPlan || baseAnalysis.plan7Days || {}),
    questions: normalizeQuestions(baseAnalysis.interviewQuestions || baseAnalysis.questions || []),

    // Company intel (if available)
    companyIntel: baseAnalysis.companyIntel || {},

    // Metadata
    detected: baseAnalysis.detectedCategories || [],
    timestamp: baseAnalysis.timestamp || now
  }
}

/**
 * Normalizes extracted skills to standard schema
 */
function normalizeExtractedSkills(skills) {
  return {
    coreCS: Array.isArray(skills['Core CS']) ? skills['Core CS'] : [],
    languages: Array.isArray(skills['Languages']) ? skills['Languages'] : [],
    web: Array.isArray(skills['Web']) ? skills['Web'] : [],
    data: Array.isArray(skills['Data']) ? skills['Data'] : [],
    cloud: Array.isArray(skills['Cloud/DevOps']) ? skills['Cloud/DevOps'] : [],
    testing: Array.isArray(skills['Testing']) ? skills['Testing'] : [],
    other: Array.isArray(skills['other']) ? skills['other'] : []
  }
}

/**
 * Normalizes round mapping structure
 */
function normalizeRoundMapping(rounds) {
  if (!Array.isArray(rounds)) return []
  
  return rounds.filter(r => (
    r && 
    typeof r === 'object' &&
    typeof r.title === 'string' &&
    Array.isArray(r.focus)
  )).map(r => ({
    number: typeof r.number === 'number' ? r.number : 1,
    title: r.title || 'Unknown Round',
    description: r.description || '',
    focus: Array.isArray(r.focus) ? r.focus : [],
    duration: r.duration || '',
    why: r.why || 'Evaluates technical capability'
  }))
}

/**
 * Normalizes preparation checklist structure
 */
function normalizeChecklist(checklist) {
  if (!checklist || typeof checklist !== 'object') return {}

  const normalized = {}
  Object.entries(checklist).forEach(([round, items]) => {
    if (Array.isArray(items)) {
      normalized[round] = items.map(item => ({
        text: typeof item === 'string' ? item : item.text || '',
        completed: item.completed === true
      }))
    }
  })
  return normalized
}

/**
 * Normalizes 7-day plan structure
 */
function normalize7DayPlan(plan) {
  if (!plan || typeof plan !== 'object') return {}

  const normalized = {}
  Object.entries(plan).forEach(([day, config]) => {
    if (config && typeof config === 'object') {
      normalized[day] = {
        focus: Array.isArray(config.focus) ? config.focus : [],
        tasks: Array.isArray(config.tasks) ? config.tasks.map(t => typeof t === 'string' ? t : '') : []
      }
    }
  })
  return normalized
}

/**
 * Normalizes interview questions structure
 */
function normalizeQuestions(questions) {
  if (!Array.isArray(questions)) return []

  return questions.map(q => 
    typeof q === 'string' ? q : (q.question || '')
  ).filter(q => q.length > 0)
}

/**
 * Validates complete analysis entry
 * @returns {object} { isValid: boolean, errors: string[] }
 */
export function validateAnalysisEntry(entry) {
  const errors = []

  // Required fields
  if (!entry.id || typeof entry.id !== 'string') {
    errors.push('Missing or invalid id')
  }
  if (!entry.createdAt || typeof entry.createdAt !== 'string') {
    errors.push('Missing or invalid createdAt')
  }
  if (!entry.jdText || typeof entry.jdText !== 'string') {
    errors.push('Missing or invalid jdText')
  }

  // Type validation
  if (entry.company !== undefined && typeof entry.company !== 'string') {
    errors.push('company must be string')
  }
  if (entry.role !== undefined && typeof entry.role !== 'string') {
    errors.push('role must be string')
  }
  if (typeof entry.baseScore !== 'number' || entry.baseScore < 0 || entry.baseScore > 100) {
    errors.push('baseScore must be number between 0-100')
  }
  if (typeof entry.finalScore !== 'number' || entry.finalScore < 0 || entry.finalScore > 100) {
    errors.push('finalScore must be number between 0-100')
  }
  if (entry.skillConfidenceMap && typeof entry.skillConfidenceMap !== 'object') {
    errors.push('skillConfidenceMap must be object')
  }

  return {
    isValid: errors.length === 0,
    errors: errors,
    entry: errors.length === 0 ? entry : null
  }
}

/**
 * Handles entry with missing or empty skills
 * Populates with safe defaults
 */
export function ensureValidSkills(entry) {
  const hasAnySkills = entry.extractedSkills && 
    (entry.extractedSkills.coreCS?.length > 0 ||
     entry.extractedSkills.languages?.length > 0 ||
     entry.extractedSkills.web?.length > 0 ||
     entry.extractedSkills.data?.length > 0 ||
     entry.extractedSkills.cloud?.length > 0 ||
     entry.extractedSkills.testing?.length > 0)

  if (!hasAnySkills) {
    // Populate with default skills
    entry.extractedSkills = {
      ...entry.extractedSkills,
      other: DEFAULT_SKILLS
    }
  }

  return entry
}

/**
 * Sanitizes corrupted history entry
 * Attempts recovery or marks as invalid
 */
export function sanitizeHistoryEntry(rawEntry) {
  try {
    if (!rawEntry || typeof rawEntry !== 'object') {
      return null
    }

    // Create standardized entry with safe defaults
    const sanitized = createAnalysisEntry(rawEntry)

    // Validate
    const validation = validateAnalysisEntry(sanitized)
    if (!validation.isValid) {
      console.warn('Entry validation failed:', validation.errors)
      return null
    }

    // Ensure skills
    ensureValidSkills(sanitized)

    return sanitized
  } catch (error) {
    console.error('Error sanitizing entry:', error)
    return null
  }
}

/**
 * Validates entire history array
 * Filters out corrupted entries
 */
export function validateAndCleanHistory(rawHistory) {
  if (!Array.isArray(rawHistory)) {
    return { valid: [], invalid: 0 }
  }

  const valid = []
  let invalid = 0

  rawHistory.forEach(entry => {
    const sanitized = sanitizeHistoryEntry(entry)
    if (sanitized) {
      valid.push(sanitized)
    } else {
      invalid++
    }
  })

  return { valid, invalid }
}

export default {
  validateJDInput,
  createAnalysisEntry,
  validateAnalysisEntry,
  ensureValidSkills,
  sanitizeHistoryEntry,
  validateAndCleanHistory,
  MIN_JD_LENGTH,
  DEFAULT_SKILLS
}
