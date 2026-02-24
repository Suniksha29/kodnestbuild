// Skill categories and keywords to detect
const SKILL_CATEGORIES = {
  'Core CS': {
    keywords: ['dsa', 'data structure', 'algorithm', 'oop', 'object oriented', 'dbms', 'database management', 'os', 'operating system', 'networks', 'networking', 'tcp', 'udp'],
    fullName: 'Core CS Fundamentals'
  },
  'Languages': {
    keywords: ['java', 'python', 'javascript', 'typescript', 'c++', 'c#', 'csharp', 'go', 'golang', 'c language', 'rust'],
    fullName: 'Programming Languages'
  },
  'Web': {
    keywords: ['react', 'next.js', 'node.js', 'nodejs', 'express', 'rest', 'graphql', 'html', 'css', 'vue', 'angular', 'svelte'],
    fullName: 'Web Development'
  },
  'Data': {
    keywords: ['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch', 'cassandra', 'dynamo', 'firestore', 'database'],
    fullName: 'Databases & Data'
  },
  'Cloud/DevOps': {
    keywords: ['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'k8s', 'ci/cd', 'jenkins', 'gitlab', 'linux', 'devops', 'terraform', 'ansible'],
    fullName: 'Cloud & DevOps'
  },
  'Testing': {
    keywords: ['selenium', 'cypress', 'playwright', 'junit', 'pytest', 'testing', 'automation', 'qa', 'test', 'mocha', 'jasmine'],
    fullName: 'Testing & QA'
  },
}

export function extractSkills(jdText) {
  const text = jdText.toLowerCase()
  const detectedSkills = {}
  const skillMatches = {}

  Object.entries(SKILL_CATEGORIES).forEach(([category, { keywords }]) => {
    const found = keywords.filter(keyword => 
      text.includes(keyword.toLowerCase())
    )
    
    if (found.length > 0) {
      detectedSkills[category] = found
      skillMatches[category] = keywords.filter(k => text.includes(k.toLowerCase()))
    }
  })

  return {
    detectedSkills,
    detectedCategories: Object.keys(detectedSkills),
    totalCategories: Object.keys(detectedSkills).length
  }
}

export function getSkillTags(detectedSkills) {
  const tags = []
  Object.entries(detectedSkills).forEach(([category, skills]) => {
    skills.forEach(skill => {
      tags.push({
        label: skill.charAt(0).toUpperCase() + skill.slice(1),
        category
      })
    })
  })
  return tags
}

export default SKILL_CATEGORIES
