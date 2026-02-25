/**
 * Score Management Utility
 * Ensures baseScore stability and finalScore calculation
 */

/**
 * Calculates base score - only called on initial analysis
 * This score NEVER changes after initial calculation
 */
export function calculateBaseScore(jdText, company, role, detectedCategories) {
  let score = 35 // Base score

  // +5 per detected category (max 30)
  score += Math.min((detectedCategories.length || 0) * 5, 30)

  // +10 for company name
  if (company && company.trim().length > 0) {
    score += 10
  }

  // +10 for role
  if (role && role.trim().length > 0) {
    score += 10
  }

  // +10 if JD is detailed (> 800 chars)
  if (jdText && jdText.length > 800) {
    score += 10
  }

  return Math.min(Math.max(score, 0), 100) // Clamp 0-100
}

/**
 * Calculates final score based on skill confidence
 * This CHANGES based on user's confidence map updates
 * Formula: baseScore + (knowCount * 2) - (practiceCount * 1)
 */
export function calculateFinalScore(baseScore, skillConfidenceMap) {
  if (!skillConfidenceMap || Object.keys(skillConfidenceMap).length === 0) {
    return baseScore // Return base if no confidence data
  }

  let adjustment = 0

  Object.values(skillConfidenceMap).forEach(confidence => {
    if (confidence === 'know') {
      adjustment += 2 // +2 for each known skill
    } else if (confidence === 'practice') {
      adjustment -= 1 // -1 for each skill to practice
    }
  })

  const finalScore = baseScore + adjustment
  return Math.min(Math.max(finalScore, 0), 100) // Clamp 0-100
}

/**
 * Validates that baseScore hasn't been tampered with
 * @param {number} storedBaseScore - Score from history
 * @param {number} calculatedBaseScore - Recalculated score
 * @returns {boolean} true if scores match (no tampering)
 */
export function validateBaseScore(storedBaseScore, calculatedBaseScore) {
  // Allow 1-point difference due to rounding
  return Math.abs(storedBaseScore - calculatedBaseScore) <= 1
}

/**
 * Creates score object for analysis
 * Should be called once during initial analysis
 */
export function createScoreObject(jdText, company, role, detectedCategories) {
  const baseScore = calculateBaseScore(jdText, company, role, detectedCategories)

  return {
    baseScore: baseScore,
    finalScore: baseScore, // Initially same as base
    initialScore: baseScore, // Snapshot for comparison
    lastUpdated: new Date().toISOString()
  }
}

/**
 * Updates final score based on skill changes
 * NEVER modifies baseScore
 * Returns updated score object
 */
export function updateFinalScore(scoreObject, skillConfidenceMap) {
  if (!scoreObject || typeof scoreObject.baseScore !== 'number') {
    console.error('Invalid score object')
    return scoreObject
  }

  return {
    ...scoreObject,
    finalScore: calculateFinalScore(scoreObject.baseScore, skillConfidenceMap),
    lastUpdated: new Date().toISOString()
  }
}

/**
 * Generates score breakdown (explanation)
 */
export function generateScoreBreakdown(jdText, company, role, detectedCategories, skillConfidenceMap) {
  let breakdown = []
  let score = 35

  breakdown.push({ reason: 'Base score', points: 35 })

  if (detectedCategories && detectedCategories.length > 0) {
    const categoryPoints = Math.min(detectedCategories.length * 5, 30)
    breakdown.push({
      reason: `Detected ${detectedCategories.length} skill categories`,
      points: categoryPoints
    })
    score += categoryPoints
  }

  if (company && company.trim().length > 0) {
    breakdown.push({ reason: 'Company name provided', points: 10 })
    score += 10
  }

  if (role && role.trim().length > 0) {
    breakdown.push({ reason: 'Role specified', points: 10 })
    score += 10
  }

  if (jdText && jdText.length > 800) {
    breakdown.push({ reason: 'Detailed JD (800+ chars)', points: 10 })
    score += 10
  }

  // Skill confidence adjustments
  if (skillConfidenceMap && Object.keys(skillConfidenceMap).length > 0) {
    let knowCount = 0
    let practiceCount = 0

    Object.values(skillConfidenceMap).forEach(conf => {
      if (conf === 'know') knowCount++
      else if (conf === 'practice') practiceCount++
    })

    if (knowCount > 0) {
      breakdown.push({
        reason: `${knowCount} skills marked as known`,
        points: knowCount * 2
      })
    }

    if (practiceCount > 0) {
      breakdown.push({
        reason: `${practiceCount} skills need practice`,
        points: -(practiceCount * 1)
      })
    }
  }

  return {
    breakdown: breakdown,
    total: Math.min(Math.max(score, 0), 100)
  }
}

/**
 * Score comparison for before/after
 */
export function compareScores(beforeScore, afterScore) {
  const improvement = afterScore - beforeScore

  return {
    before: beforeScore,
    after: afterScore,
    improvement: improvement,
    percentChange: beforeScore > 0 ? ((improvement / beforeScore) * 100).toFixed(2) : 0,
    message: improvement > 0
      ? `👆 Improved by ${improvement} points`
      : improvement < 0
      ? `👇 Decreased by ${Math.abs(improvement)} points`
      : '➡️ Score unchanged'
  }
}

export default {
  calculateBaseScore,
  calculateFinalScore,
  validateBaseScore,
  createScoreObject,
  updateFinalScore,
  generateScoreBreakdown,
  compareScores
}
