const STORAGE_KEY = 'placement_readiness_history'

import { validateAndCleanHistory, sanitizeHistoryEntry } from './dataValidator'

/**
 * Gets history with robust error handling for corrupted entries
 * @returns {array} Valid entries only, with optional corruption warning
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return { entries: [], corruptedCount: 0 }

    const rawHistory = JSON.parse(data)
    
    // Validate and clean
    const { valid, invalid } = validateAndCleanHistory(rawHistory)

    if (invalid > 0) {
      console.warn(`Recovered ${valid.length} entries, skipped ${invalid} corrupted entries`)
    }

    return { entries: valid, corruptedCount: invalid }
  } catch (error) {
    console.error('Critical error reading from localStorage:', error)
    return { entries: [], corruptedCount: 1, error: true }
  }
}

/**
 * Gets just the entries array (backwards compatible)
 */
export function getHistoryEntries() {
  const result = getHistory()
  return result.entries || []
}

/**
 * Gets history with corruption status
 */
export function getHistoryWithStatus() {
  return getHistory()
}

export function saveAnalysis(analysis) {
  try {
    const { entries: history } = getHistory()
    const entry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...analysis
    }
    history.unshift(entry) // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    return entry
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return null
  }
}

export function getAnalysisById(id) {
  try {
    const { entries: history } = getHistory()
    const found = history.find(entry => entry.id === id)
    if (!found) {
      console.warn(`Analysis with id ${id} not found`)
      return null
    }
    return found
  } catch (error) {
    console.error('Error retrieving analysis:', error)
    return null
  }
}

export function deleteAnalysis(id) {
  try {
    const { entries: history } = getHistory()
    const filtered = history.filter(entry => entry.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Error deleting analysis:', error)
    return false
  }
}

export function updateAnalysis(id, updates) {
  try {
    const { entries: history } = getHistory()
    const index = history.findIndex(entry => entry.id === id)
    if (index !== -1) {
      // Ensure updatedAt is always set
      history[index] = {
        ...history[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      return history[index]
    }
    console.warn(`Analysis with id ${id} not found for update`)
    return null
  } catch (error) {
    console.error('Error updating analysis:', error)
    return null
  }
}

export function clearHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing history:', error)
    return false
  }
}

export default {
  getHistory,
  saveAnalysis,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
  clearHistory
}
