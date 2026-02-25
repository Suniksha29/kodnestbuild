/**
 * Test Checklist Service
 * Manages the built-in test checklist state in localStorage
 */

const TEST_CHECKLIST_KEY = 'placement_readiness_test_checklist'

/**
 * Default checklist with all tests
 */
const DEFAULT_TESTS = [
  {
    id: 1,
    name: 'JD required validation works',
    description: 'Empty JD should be blocked from submission',
    howToTest: 'Go to /analyzer, try submitting without JD. Should show alert.',
    completed: false
  },
  {
    id: 2,
    name: 'Short JD warning shows for <200 chars',
    description: 'JD with < 200 characters should display warning',
    howToTest: 'Go to /analyzer, paste 150-char JD. Yellow warning should appear.',
    completed: false
  },
  {
    id: 3,
    name: 'Skills extraction groups correctly',
    description: 'Detected skills are organized by category',
    howToTest: 'Create analysis with DSA + React keywords. Skills should appear in Core CS and Web groups.',
    completed: false
  },
  {
    id: 4,
    name: 'Round mapping changes based on company + skills',
    description: 'Interview rounds vary for Enterprise vs Startup',
    howToTest: 'Create 2 analyses: one with "Amazon" (Enterprise + DSA) should show 4 rounds, one with "Startup Co" should show 3 rounds.',
    completed: false
  },
  {
    id: 5,
    name: 'Score calculation is deterministic',
    description: 'Same JD + Company + Role always produces same score',
    howToTest: 'Create same analysis twice. Both should have identical base scores.',
    completed: false
  },
  {
    id: 6,
    name: 'Skill toggles update score live',
    description: 'Marking skills as "know" increases final score',
    howToTest: 'On /results, mark 3 skills as "know". Score should increase by 6 points.',
    completed: false
  },
  {
    id: 7,
    name: 'Changes persist after refresh',
    description: 'Skill confidence changes are saved to localStorage',
    howToTest: 'Mark skills on results page, refresh browser. Changes should persist.',
    completed: false
  },
  {
    id: 8,
    name: 'History saves and loads correctly',
    description: 'Analysis history works without data loss',
    howToTest: 'Create 3 analyses, visit /history. All 3 should be listed.',
    completed: false
  },
  {
    id: 9,
    name: 'Export buttons copy the correct content',
    description: 'Download TXT includes all analysis sections',
    howToTest: 'On /results, click "Download TXT". File should include JD, scores, plan, checklist, questions.',
    completed: false
  },
  {
    id: 10,
    name: 'No console errors on core pages',
    description: 'No JavaScript errors in browser console',
    howToTest: 'Open DevTools Console (F12), navigate through pages. Should have no red errors.',
    completed: false
  }
]

/**
 * Get all tests from localStorage
 */
export function getTests() {
  try {
    const data = localStorage.getItem(TEST_CHECKLIST_KEY)
    if (!data) {
      // First time, initialize with defaults
      setTests(DEFAULT_TESTS)
      return DEFAULT_TESTS
    }
    return JSON.parse(data)
  } catch (error) {
    console.error('Error getting tests:', error)
    return DEFAULT_TESTS
  }
}

/**
 * Save tests to localStorage
 */
export function setTests(tests) {
  try {
    localStorage.setItem(TEST_CHECKLIST_KEY, JSON.stringify(tests))
    return true
  } catch (error) {
    console.error('Error saving tests:', error)
    return false
  }
}

/**
 * Toggle a test as completed/incomplete
 */
export function toggleTest(testId) {
  try {
    const tests = getTests()
    const test = tests.find(t => t.id === testId)
    if (test) {
      test.completed = !test.completed
      setTests(tests)
      return test
    }
    return null
  } catch (error) {
    console.error('Error toggling test:', error)
    return null
  }
}

/**
 * Get completed tests count
 */
export function getCompletedCount() {
  const tests = getTests()
  return tests.filter(t => t.completed).length
}

/**
 * Check if all tests are completed
 */
export function areAllTestsCompleted() {
  const tests = getTests()
  return tests.length > 0 && tests.every(t => t.completed)
}

/**
 * Get progress percentage
 */
export function getProgressPercentage() {
  const tests = getTests()
  if (tests.length === 0) return 0
  return Math.round((getCompletedCount() / tests.length) * 100)
}

/**
 * Reset all tests to incomplete
 */
export function resetTests() {
  try {
    const resetTests = DEFAULT_TESTS.map(t => ({
      ...t,
      completed: false
    }))
    setTests(resetTests)
    return resetTests
  } catch (error) {
    console.error('Error resetting tests:', error)
    return null
  }
}

/**
 * Get a specific test by ID
 */
export function getTestById(testId) {
  const tests = getTests()
  return tests.find(t => t.id === testId)
}

export default {
  getTests,
  setTests,
  toggleTest,
  getCompletedCount,
  areAllTestsCompleted,
  getProgressPercentage,
  resetTests,
  getTestById
}
