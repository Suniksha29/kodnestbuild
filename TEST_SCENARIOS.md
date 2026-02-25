# Company Intel + Round Mapping - Test Scenarios

## Feature Overview
The Placement Readiness Platform now includes:
1. **Company Intel Block** - Displays company size category, industry, and typical hiring focus
2. **Round Mapping Engine** - Shows dynamic interview rounds based on company size and detected skills
3. **Data Persistence** - Company intel is stored with analysis history

---

## Test Scenario 1: Enterprise + DSA Company

### Input:
- **Company**: Amazon
- **Role**: Senior Software Engineer
- **Job Description**: (Contains: DSA, data structures, algorithms, system design, etc.)

### Expected Output:

#### Company Intel Block:
- Company Name: Amazon
- Industry: Technology Services (or detected based on JD keywords)
- Company Size: **Enterprise** (2,000+ employees)
- Typical Hiring Focus: "Structured DSA + Core Fundamentals"
  - Required Skills Tags: DSA, System Design, Problem Solving, Core CS

#### Round Mapping (4 rounds):
1. **Round 1: Online Test (DSA + Aptitude)**
   - Duration: 90-120 mins
   - Why: "Screens for coding fundamentals and basic problem-solving ability across large candidate pool."
   - Focus: DSA, Time Management, Aptitude

2. **Round 2: Technical Interview (DSA + Core CS)**
   - Duration: 60 mins
   - Why: "Deep dive into problem-solving approach, code quality, and theoretical understanding."
   - Focus: DSA, System Design, Core CS Fundamentals

3. **Round 3: Advanced Technical (Projects + Architecture)**
   - Duration: 45 mins
   - Why: "Validates ability to design and build production-level systems independently."
   - Focus: System Design, API Design, Scalability

4. **Round 4: HR & Cultural Fit**
   - Duration: 30 mins
   - Why: "Ensures alignment with company culture and team dynamics."
   - Focus: Communication, Teamwork, Adaptability

---

## Test Scenario 2: Startup + React/Node Company

### Input:
- **Company**: TechStartup Co
- **Role**: Full Stack Developer
- **Job Description**: (Contains: React, Node.js, MongoDB, practical problem solving, etc.)

### Expected Output:

#### Company Intel Block:
- Company Name: TechStartup Co
- Industry: Technology Services
- Company Size: **Startup** (< 200 employees)
- Typical Hiring Focus: "Practical Problem Solving + Stack Depth"
  - Required Skills Tags: Practical Coding, Stack Expertise, Problem Solving, Rapid Development

#### Round Mapping (3 rounds):
1. **Round 1: Practical Coding Challenge**
   - Duration: 60-90 mins
   - Why: "Startups need developers who can immediately contribute to live product."
   - Focus: React, Node.js, Practical Implementation

2. **Round 2: System Discussion & Deep Dive**
   - Duration: 45 mins
   - Why: "Evaluates whether candidate thinks about real-world constraints."
   - Focus: Architecture, Code Quality, Scalability

3. **Round 3: Culture Fit & Team Synergy**
   - Duration: 45 mins
   - Why: "Startup success depends heavily on team dynamics and adaptability."
   - Focus: Collaboration, Adaptability, Startup Mindset

---

## Test Scenario 3: Mid-size + Finance Company (FinTech)

### Input:
- **Company**: FinTech Solutions
- **Role**: Backend Engineer
- **Job Description**: (Contains: payments, REST API, SQL, system design, etc.)

### Expected Output:

#### Company Intel Block:
- Company Name: FinTech Solutions
- Industry: **FinTech** (detected from keywords: payments, banking, transaction, etc.)
- Company Size: **Mid-size** (200–2,000 employees)
- Typical Hiring Focus: "Balanced Technical + Practical Skills"
  - Required Skills Tags: DSA, Project Implementation, Problem Solving, Tech Stack

#### Round Mapping (3 rounds):
1. **Round 1: Coding Challenge**
   - Duration: 75 mins
   - Why: "Evaluates algorithmic thinking and coding ability."
   - Focus: DSA, Problem Solving

2. **Round 2: Technical Round**
   - Duration: 60 mins
   - Why: "Validates problem-solving approach and technical depth."
   - Focus: Technical Knowledge, System Thinking

3. **Round 3: HR & Final Discussion**
   - Duration: 30 mins
   - Why: "Confirms mutual fit and discusses role expectations."
   - Focus: Communication, Team Fit

---

## Test Scenario 4: Unknown Company (No DSA detected)

### Input:
- **Company**: SomeUnknownCompany
- **Role**: Software Developer
- **Job Description**: (Contains: frontend, HTML, CSS, no explicit DSA mention)

### Expected Output:

#### Company Intel Block:
- Company Name: SomeUnknownCompany
- Industry: Technology Services (default)
- Company Size: **Startup** (default for unknown companies)
- Typical Hiring Focus: "Practical Problem Solving + Stack Depth"

#### Round Mapping (3 rounds):
1. **Round 1: Coding + Problem-Solving**
   - Duration: 60 mins
   - Focus: Practical Problem Solving, Code Quality
   - Why: "Startups need pragmatic, self-sufficient developers."

2. **Round 2: Technical + Product Discussion**
   - Duration: 45 mins
   - Focus: Product Sense, Rapid Learning
   - Why: "Validates ability to learn quickly and contribute beyond code."

3. **Round 3: Culture & Team Chemistry**
   - Duration: 30 mins
   - Focus: Team Chemistry, Flexibility
   - Why: "In startups, team cohesion is as important as technical skills."

---

## Data Persistence Testing

### Create Analysis → Save to History → Retrieve

1. Create a new analysis via Analyzer page
2. Review results showing Company Intel and Round Mapping
3. Navigate to History page
4. Retrieve the saved analysis
5. **Verify**: Company Intel and Round Mapping data is persisted and displayed correctly

### Download Feature

1. On Results page, click "Download TXT"
2. File downloads with content including:
   - Company Intel section (size, industry, hiring focus)
   - Round Mapping details (all rounds with "Why this round matters")
   - All other analysis sections

---

## Demo Mode Indicator

- **Location**: CompanyIntel component shows: "Demo Mode: Heuristic Analysis"
- **Download footer**: Includes note - "Demo Mode: Company intel generated heuristically based on job description analysis."
- **Purpose**: Clarifies that company sizing and industry detection are heuristic-based, not scraped

---

## Route & Feature Preservation Checklist

✅ Routes unchanged - All existing routes work as before:
  - `/analyzer` - New analysis creation
  - `/results/:id` - Results page with new sections
  - `/history` - History view with persisted data
  - `/dashboard` - Dashboard (unchanged)
  - `/practice`, `/resources`, etc.

✅ Existing features preserved:
  - Skill detection and confidence mapping
  - 7-day preparation plan
  - Interview checklist
  - Interview question generation
  - Copy and download functionality
  - History management

✅ Premium design maintained:
  - Color-coded company size indicators
  - Timeline visualization for rounds
  - Consistent card-based layout
  - Interactive elements preserved

---

## Known Enterprise Companies (Heuristic List)

The system recognizes these companies as Enterprise:
- Amazon, Google, Microsoft, Meta, Facebook, Apple, Netflix, Uber
- Infosys, TCS, Accenture, Cognizant, Wipro, IBM, Adobe
- Salesforce, Oracle, LinkedIn, Goldman, Morgan, JPMorgan
- Samsung, Qualcomm, Intel, Nvidia, Tesla, Walmart
- Airbnb, Stripe, Dropbox, Slack, Atlassian, Databricks

Any other company defaults to "Startup" category.

---

## Industry Detection Keywords

- **FinTech**: banking, finance, payment, transaction, crypto, blockchain, trading
- **E-Commerce**: ecommerce, shopping, retail, commerce, marketplace
- **Healthcare**: healthcare, health, medical, hospital, patient, pharma
- **EdTech**: education, learning, course, student, training
- **SaaS**: saas, cloud service, subscription, api platform
- **Media & Entertainment**: streaming, video, music, content
- **Consulting**: consulting, business consulting, management
- **IT Services**: outsourcing, managed services, bpo

---

## Verification Checklist

- [ ] Company Intel block appears on Results page
- [ ] Company size correctly categorized (Enterprise/Mid-size/Startup)
- [ ] Industry inferred from JD keywords
- [ ] Round mapping generates based on company size + skills
- [ ] "Why this round matters" explanations display for each round
- [ ] Vertical timeline layout renders correctly
- [ ] Demo mode indicator visible
- [ ] Data persists to history
- [ ] Download TXT includes company intel
- [ ] No routes changed
- [ ] All existing features work as before
- [ ] Premium design maintained
- [ ] No external scraping performed

