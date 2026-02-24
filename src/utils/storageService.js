const STORAGE_KEY = 'placement_readiness_history'

export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading from localStorage:', error)
    return []
  }
}

export function saveAnalysis(analysis) {
  try {
    const history = getHistory()
    const entry = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
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
    const history = getHistory()
    return history.find(entry => entry.id === id)
  } catch (error) {
    console.error('Error retrieving analysis:', error)
    return null
  }
}

export function deleteAnalysis(id) {
  try {
    const history = getHistory()
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
    const history = getHistory()
    const index = history.findIndex(entry => entry.id === id)
    if (index !== -1) {
      history[index] = { ...history[index], ...updates }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
      return history[index]
    }
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
