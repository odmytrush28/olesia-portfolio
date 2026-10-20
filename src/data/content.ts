/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE TEXT LIVES HERE.
 *  Edit this file to update copy, add a project, a creative piece,
 *  a skill or a timeline entry — the sections render from this data.
 *  Everything below is sourced from Olesia's résumés (Oct 2026),
 *  her master-résumé workbook and supplied documents.
 * ─────────────────────────────────────────────────────────────
 */

/** Builds a URL to a file in /public that works on any GitHub Pages path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const profile = {
  name: 'Olesia Dmytrush',
  firstName: 'Olesia',
  lastName: 'Dmytrush',
  email: 'olesia.dmytrush@gmail.com',
  linkedin: 'https://www.linkedin.com/in/olesia-dmytrush-dmytrush-71b79418a',
  /** Set to your profile URL (e.g. 'https://github.com/your-username') to show GitHub links. */
  github: null as string | null,
  location: 'Palatine, IL',
  availability: 'Open to opportunities nationwide',
  languages: ['Ukrainian', 'Polish', 'Russian', 'English'],
}

export const resumes = [
  {
    id: 'general',
    label: 'General',
    focus: 'IT Audit & Assurance · Business Analysis · QA & Operations',
    file: 'resume/Olesia_Dmytrush_Resume_General.pdf',
  },
  {
    id: 'grc',
    label: 'IT Risk & GRC',
    focus: 'IT Audit · Technology Risk · GRC',
    file: 'resume/Olesia_Dmytrush_Resume_IT_Risk_GRC.pdf',
  },
  {
    id: 'ba',
    label: 'Business Analyst',
    focus: 'Business Analysis · Product Analysis',
    file: 'resume/Olesia_Dmytrush_Resume_Business_Analyst.pdf',
  },
  {
    id: 'qa',
    label: 'QA Analyst',
    focus: 'QA Analysis · Manual Software Testing',
    file: 'resume/Olesia_Dmytrush_Resume_QA_Analyst.pdf',
  },
]

export const nav = [
  { id: 'home', label: 'Home', menuLabel: 'Home', sub: 'Back to the start — and the hidden AI layer.' },
  { id: 'about', label: 'About', menuLabel: 'About me', sub: 'Ukraine → Poland → USA. Four degrees, four languages.' },
  { id: 'experience', label: 'Experience', menuLabel: 'Experience', sub: 'IT audit at KPMG, real-estate operations, banking, i.c.stars.' },
  { id: 'projects', label: 'Projects', menuLabel: 'Projects', sub: 'Case studies — Medline, QA & testing, operations, AI video.' },
  { id: 'studio', label: 'Creative Studio', menuLabel: 'Creative studio', sub: 'AI video & creative experiments.' },
  { id: 'skills', label: 'Skills', menuLabel: 'Skills', sub: 'Strengths mapped to where I actually used them.' },
  { id: 'journey', label: 'Journey', menuLabel: 'Journey', sub: 'The moves, the degrees, the next step.' },
  { id: 'contact', label: 'Contact', menuLabel: 'Contact me', sub: 'Let’s create something meaningful.' },
] as const

export const hero = {
  eyebrow: ['IT Audit', 'Business Analysis', 'QA', 'Technology'],
  headline: ['I turn', 'curiosity', 'into real-world', 'solutions'],
  intro:
    'Analytical mind. Creative spirit. Always learning. I combine experience in IT audit, business operations, and creative problem-solving with growing technical skills to understand challenges and develop meaningful solutions.',
  ghostWords: ['Create', 'Explore', 'Solutions'],
  chips: [
    { icon: '◇', text: 'IT Audit · Risk' },
    { icon: '●', text: 'Analysis / QA' },
    { icon: '+', text: 'Creative Thinking' },
  ],
}

/* ───────────────────────── ABOUT ───────────────────────── */

export const about = {
  title: ['My journey was never', 'a straight line.'],
  subtitle: 'It was a series of choices to keep growing.',
  paragraphs: [
    'I grew up in Ukraine. At 16–17 I moved to Poland on my own to go to university. I studied in Polish while holding down a job, worked toward a tuition-free place, and received an academic scholarship along the way. One degree became four: a bachelor’s and three master’s degrees in economics, marketing, and finance & accounting.',
    'That habit of learning by doing followed me into work. At KPMG in Poland I spent nearly three years in IT audit & assurance — analyzing IT-supported processes, testing IT and business controls, reviewing evidence, and documenting findings for senior review.',
    'At 26 I moved to the United States and started again: supporting documentation and coordination for 100+ real estate transactions and creating marketing for the agents I worked with. Today, at i.c.stars Chicago, I’m the Product & Business Analyst Lead on a client project for Medline — and building the technical side of my toolkit.',
  ],
  facts: [
    { value: '4', label: 'Languages', detail: 'Ukrainian · Polish · Russian · English' },
    { value: '4', label: 'Degrees', detail: '1 bachelor’s + 3 master’s' },
    { value: '3', label: 'Countries', detail: 'Ukraine → Poland → USA' },
    { value: '~3', label: 'Years at KPMG', detail: 'IT Audit & Assurance' },
  ],
  strengths: [
    {
      id: 'analysis',
      title: 'Structured analysis',
      text: 'Reading a process, spotting the risk, and documenting exactly what the evidence shows.',
      evidence: ['KPMG Poland', 'IT & business control testing'],
      figure: { prefix: '~', value: 3, suffix: '', label: 'years in IT audit & assurance' },
      details: [
        'Analyzed IT-supported business processes and identified technology risks and potential control weaknesses.',
        'Tested business and IT controls and reviewed the supporting evidence.',
        'Documented findings in audit working papers for senior team review.',
      ],
    },
    {
      id: 'communication',
      title: 'Clear communication',
      text: 'Explaining, asking and following up with clients, agents, attorneys and teams — in the language the moment needs.',
      evidence: ['KPMG', 'Real estate', 'Banking'],
      figure: { prefix: '', value: 4, suffix: '', label: 'languages: UA · PL · RU · EN' },
      details: [
        'Requested audit evidence directly from clients and followed up on control-related questions (KPMG).',
        'Worked with clients, attorneys, agents and transaction partners to resolve issues (real estate).',
        'Explained banking products and procedures and resolved customer inquiries (Getin Noble Bank).',
      ],
    },
    {
      id: 'organization',
      title: 'Organization under pressure',
      text: 'Keeping many moving parts on schedule — documents, deadlines and people — without dropping a thread.',
      evidence: ['Keller Williams / HomeSmart'],
      figure: { prefix: '', value: 100, suffix: '+', label: 'real estate transactions supported' },
      details: [
        'Supported documentation and coordination for more than 100 transactions.',
        'Managed 3–5 transaction workflows on busy days.',
        'Coordinated daily requests involving up to 7–8 agents — appointments, deadlines, follow-ups.',
      ],
    },
    {
      id: 'creative',
      title: 'Creative execution',
      text: 'Turning information into visuals people want to look at — marketing, social content and AI-assisted video.',
      evidence: ['Canva', 'CapCut', 'Google Flow (Veo)'],
      figure: { prefix: '', value: 5, suffix: '', label: 'scene AI short film — my story & concept' },
      details: [
        'Created a substantial volume of marketing collateral and social content in Canva and CapCut.',
        'Designed listing marketing materials and presentations for real-estate agents.',
        'Wrote the story and concept for a five-scene AI short film generated with Google Flow (Veo).',
      ],
    },
  ],
  learning: {
    title: 'Continuous learning',
    text: 'Four degrees, a QC/QA course, and now technology training.',
    evidence: 'KUL · SGH · TOMMY · i.c.stars',
  },
  photoAlt: 'Olesia Dmytrush, casual portrait with long wavy blonde hair',
}

/* ─────────────────────── EXPERIENCE ─────────────────────── */

export type Role = {
  id: string
  company: string
  title: string
  dates: string
  location: string
  status?: string
  summary: string
  bullets: string[]
  tags: string[]
  note?: string
}

export const experience: Role[] = [
  {
    id: 'icstars',
    company: 'i.c.stars Chicago',
    title: 'Technology Intern · Product & Business Analyst Lead',
    dates: 'Aug – Dec 2026',
    location: 'Chicago, IL',
    status: 'In progress',
    summary:
      'Technology and leadership program where I’m building my technical foundation — and leading product & business analysis on our team’s client project for Medline.',
    bullets: [
      'Contribute to the Medline Operations Problem Navigator: requirements discussions, user stories, personas, workflow diagrams, application design, stakeholder communication and presentations.',
      'Coordinate team meetings, priorities, task assignments and deliverables.',
      'Prepare QA artifacts — test cases and defect logs. Testing of the Medline application is planned.',
      'Developing foundational skills in SQL, Python, GitHub, VS Code, Jira, Figma and AI-assisted workflows.',
    ],
    tags: ['Requirements', 'User stories', 'Personas', 'Workflows', 'Jira', 'Figma', 'SQL', 'Python'],
    note: 'Ongoing training and team project work — not finished production experience.',
  },
  {
    id: 'realestate',
    company: 'Keller Williams / HomeSmart',
    title: 'Real Estate Administrative & Marketing Coordinator',
    dates: 'Oct 2024 – Apr 2026',
    location: 'Illinois',
    status: 'Occasional support since',
    summary:
      'Kept many transactions, agents and outside parties moving at once — and produced the marketing that promoted their listings.',
    bullets: [
      'Supported documentation and coordination for more than 100 real estate transactions; managed 3–5 transaction workflows on busy days.',
      'Coordinated daily requests involving up to 7–8 agents; scheduled appointments, tracked deadlines and managed follow-ups.',
      'Communicated with clients, attorneys, agents and other transaction partners to resolve operational issues and obtain documents.',
      'Created a substantial volume of marketing collateral, presentations and social content using Canva and CapCut.',
      'Worked daily with MLS, Excel, Word and email.',
    ],
    tags: ['Coordination', 'Deadlines', 'Client communication', 'Canva', 'CapCut', 'MLS', 'Excel'],
  },
  {
    id: 'kpmg',
    company: 'KPMG Poland',
    title: 'Consultant — IT Audit & Assurance',
    dates: 'Dec 2021 – Aug 2024',
    location: 'Poland',
    summary:
      'Nearly three years assessing technology risk and testing controls on client engagements in financial services and other industries.',
    bullets: [
      'Analyzed IT-supported business processes and identified technology risks and potential control weaknesses.',
      'Tested business and IT controls, reviewed supporting evidence, and documented findings for senior audit team review.',
      'Prepared audit working papers and contributed to reports and presentations of findings.',
      'Requested audit evidence directly from clients, took part in client meetings, and followed up on documentation and control-related questions.',
      'Supported financial audit teams with data analysis in Microsoft Excel and KPMG Clara; assignments typically lasted about 3–9 months.',
    ],
    tags: ['IT controls', 'Risk assessment', 'Audit evidence', 'Working papers', 'Excel', 'KPMG Clara'],
    note: 'Client engagements are confidential — no client names or details are shared here.',
  },
  {
    id: 'bank',
    company: 'Getin Noble Bank',
    title: 'Customer Service Advisor',
    dates: 'Jun 2020 – Oct 2021',
    location: 'Poland',
    summary: 'Front-line banking support while completing my master’s studies.',
    bullets: [
      'Assisted customers with everyday banking transactions, including withdrawals, deposits and account-related services.',
      'Explained banking products and procedures, and resolved customer inquiries.',
      'Provided customer and operational support while following bank procedures.',
    ],
    tags: ['Customer service', 'Financial products', 'Procedures', 'Problem-solving'],
  },
]

/* ──────────────────────── PROJECTS ──────────────────────── */

export type ProjectCategory = 'Product & BA' | 'QA & Testing' | 'Operations' | 'Creative & AI'

export type Project = {
  id: string
  index: string
  name: string
  category: ProjectCategory
  /** One line for the gallery card. */
  summary: string
  status: string
  statusTone: 'progress' | 'done'
  context: string
  role: string
  problem: string
  goal: string
  work: string[]
  tools: string[]
  outcome: string
  /** What I learned — written in my own words; edit freely. */
  learned?: string
  figures?: { value: string; label: string }[]
  /** Optional links — only real, public URLs. */
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'medline',
    index: '01',
    name: 'Medline Operations Problem Navigator',
    category: 'Product & BA',
    summary: 'Turning scattered warehouse incident reports into recurring Problems that reach the right IT team.',
    status: 'In progress · Aug–Dec 2026',
    statusTone: 'progress',
    context: 'i.c.stars team client project',
    role: 'Product & Business Analyst Lead',
    problem:
      'Warehouse operations can run into recurring technology and equipment incidents. Reporting is fragmented, which makes patterns hard to see and fixes hard to coordinate.',
    goal:
      'An application that standardizes how incidents are reported, spots the ones that keep coming back, groups related incidents into Problems, and routes each Problem to the right IT team.',
    work: [
      'Requirements analysis and stakeholder discussions',
      'Personas and user stories',
      'Workflow and process diagrams',
      'Application design discussions',
      'Presentation preparation',
      'Team coordination — meetings, priorities, deliverables',
      'QA artifacts: test cases and defect logs',
    ],
    tools: ['Personas', 'User stories', 'Workflow diagrams', 'GitHub (team repo)', 'VS Code', 'Team stack: React + Vite'],
    outcome:
      'In progress. The team’s application is organized into three modules — Incidents, Problem Register and Resolution Manager. Testing with Medline is planned; there are no results to report yet.',
    learned:
      'Translating an operations problem into requirements a development team can build — and a client can recognize as their own.',
  },
  {
    id: 'qa',
    index: '02',
    name: 'QA & Software Testing',
    category: 'QA & Testing',
    summary: 'Manual website testing, bug reports and a final testing project — now test cases and defect logs at i.c.stars.',
    status: 'Course completed · practice ongoing',
    statusTone: 'done',
    context: 'QC/QA Engineer course · TOMMY Online University (Ukraine)',
    role: 'QA trainee → test-case author at i.c.stars',
    problem:
      'Software fails in the gaps between what was specified and what was built. Someone has to find those gaps before users do — and describe them so they can be fixed.',
    goal:
      'Learn to test systematically: design test cases from requirements, compare expected and actual results, and write defect reports a developer can act on.',
    work: [
      'Manually tested Ukrainian websites and identified defects',
      'Wrote several bug reports',
      'Completed a final course testing project',
      'Now creating test cases and defect logs in i.c.stars training',
    ],
    tools: ['Test cases', 'Checklists', 'Defect reports', 'Test-design techniques', 'Databases', 'API basics'],
    outcome:
      'Earned the QC/QA Engineer diploma (completed before Dec 2021). The same discipline carried into IT control testing at KPMG: define what should happen, test it, and document the evidence.',
    learned: 'Write the expected result down before testing — then the defect is simply the gap, and the evidence explains it.',
  },
  {
    id: 'realestate',
    index: '03',
    name: 'Real Estate Operations & Marketing',
    category: 'Operations',
    summary: 'Documents, deadlines and marketing for 100+ transactions across up to 7–8 agents.',
    status: 'Completed · Oct 2024 – Apr 2026',
    statusTone: 'done',
    context: 'Keller Williams / HomeSmart agents, Illinois',
    role: 'Administrative & Marketing Coordinator',
    problem:
      'Agents juggle listings, showings, contracts and deadlines with clients, attorneys and other partners — and still need steady, professional marketing.',
    goal:
      'Keep every transaction’s documents, deadlines and follow-ups on track, and give agents marketing they could publish with confidence.',
    work: [
      'Coordinated documentation and deadlines across concurrent transactions',
      'Scheduled appointments and managed follow-ups',
      'Resolved operational issues with clients, attorneys, agents and partners',
      'Designed marketing collateral and presentations in Canva',
      'Edited social video content in CapCut',
    ],
    tools: ['MLS', 'Excel', 'Word', 'Email', 'Canva', 'CapCut'],
    figures: [
      { value: '100+', label: 'transactions supported' },
      { value: '7–8', label: 'agents coordinated' },
      { value: '3–5', label: 'workflows on busy days' },
    ],
    outcome: 'Completed. Supported more than 100 transactions over about a year and a half, and still help occasionally.',
    learned: 'Operations work is quality work: every missed handoff shows up later as a problem.',
  },
  {
    id: 'aivideo',
    index: '04',
    name: 'Spills Become Skills — AI short film',
    category: 'Creative & AI',
    summary: 'A five-scene AI video where a spilled coffee turns into five skills. My story and concept, generated with Google Flow (Veo).',
    status: 'Completed · 2026',
    statusTone: 'done',
    context: 'Personal creative project',
    role: 'Story & concept',
    problem:
      'An everyday setback — a coffee spilled on the way to work — as a visual metaphor for how difficult moments build skills.',
    goal: 'Tell a short visual story with a clear message, using AI video generation.',
    work: [
      'Came up with the idea and the message',
      'Shaped the story arc across five scenes',
      'Chose the five skills the story ends on',
    ],
    tools: ['Google Flow (Veo)'],
    outcome:
      'Completed: five vertical scenes, about 40 seconds in total. The visuals, motion and audio were generated by AI; the story and concept are mine.',
    learned: 'With AI video, the idea and the structure are the real creative work — the tool only renders what you can clearly describe.',
  },
]

/** Illustrative data for the Incident → Problem demo. NOT Medline data. */
export const incidentDemo = {
  incidents: [
    { id: 'INC-01', text: 'Handheld scanner offline', where: 'Dock 3', problem: 'P1' },
    { id: 'INC-02', text: 'Label printer jam', where: 'Line B', problem: 'P2' },
    { id: 'INC-03', text: 'Handheld scanner offline', where: 'Dock 5', problem: 'P1' },
    { id: 'INC-04', text: 'Wi-Fi drop', where: 'Aisle 12', problem: 'P3' },
    { id: 'INC-05', text: 'Label printer jam', where: 'Line B', problem: 'P2' },
    { id: 'INC-06', text: 'Handheld scanner offline', where: 'Dock 3', problem: 'P1' },
    { id: 'INC-07', text: 'Wi-Fi drop', where: 'Aisle 12', problem: 'P3' },
    { id: 'INC-08', text: 'Conveyor sensor fault', where: 'Zone 2', problem: null },
  ],
  problems: [
    { id: 'P1', title: 'Scanners losing connection', team: 'Network team' },
    { id: 'P2', title: 'Recurring printer jams on Line B', team: 'Hardware support' },
    { id: 'P3', title: 'Wireless coverage gap, Aisle 12', team: 'Network team' },
  ],
}

/** Anatomy of a defect report — the standard structure taught in QA training. */
export const defectAnatomy = [
  { field: 'Title', text: 'One line: what is broken, and where.' },
  { field: 'Environment', text: 'Browser / device / version, so it can be reproduced.' },
  { field: 'Steps to reproduce', text: 'Numbered, minimal, unambiguous.' },
  { field: 'Expected result', text: 'What the requirement says should happen.' },
  { field: 'Actual result', text: 'What actually happened — the gap is the defect.' },
  { field: 'Severity & priority', text: 'Impact on users vs. urgency to fix.' },
  { field: 'Evidence', text: 'Screenshot, recording or log.' },
]

export const qaCourseModules = [
  'IT methodologies',
  'Test cases',
  'Checklists',
  'Defects',
  'Testing types & approaches',
  'Levels of testing',
  'Test-design techniques',
  'Requirements',
  'Metrics',
  'Program versions',
  'Performance evaluation',
  'Databases',
  'API',
]

/* ───────────────────── CREATIVE STUDIO ─────────────────────
 * Add real work here. Put files in /public/creative/ and add an entry.
 * The section stays hidden while this list is empty.
 *  type: 'image' | 'video'
 */
export type CreativeWork = {
  id: string
  type: 'image' | 'video'
  src: string
  poster?: string
  title: string
  category: string
  description: string
  tools: string[]
  /** width / height of the file, so the grid keeps its proportions. */
  ratio: number
}

export const creativeWorks: CreativeWork[] = []

/* ──────────────── AI VIDEO & CREATIVE EXPERIMENTS ────────────────
 * Real AI-assisted video work. Files live in /public/videos/.
 * "Spills Become Skills" is a working title — rename it here if you like.
 */
export const aiVideo = {
  subtitle: 'Where storytelling meets emerging technology.',
  film: {
    title: 'Spills Become Skills',
    logline:
      'A spilled coffee on the way to work looks like a bad start — until the spill lights up into five skills: resilience, creativity, connection, problem-solving and leadership.',
    status: 'Completed · 5 scenes · about 40 seconds',
    credits: [
      { label: 'Story & concept', value: 'Olesia Dmytrush' },
      { label: 'Generated with', value: 'Google Flow (Veo)' },
      { label: 'Format', value: 'Vertical 9:16 · 5 scenes' },
    ],
    mine: [
      'The idea: a setback that turns into growth',
      'The story arc across five scenes',
      'The message and the five skills it ends on',
    ],
    ai: ['Characters and settings', 'Motion and camera', 'Rendering of each scene, including audio'],
    scenes: [
      { id: 'spill-01', title: 'Morning confidence', text: 'Walking to work with a “CREATE” coffee in hand.' },
      { id: 'spill-02', title: 'The stumble', text: 'One loose stone — and the coffee is in the air.' },
      { id: 'spill-03', title: 'The setback', text: 'On the sidewalk, plans spilled everywhere.' },
      { id: 'spill-04', title: 'The spill', text: 'Close-up on the mess that looks like an ending.' },
      { id: 'spill-05', title: 'Spills become skills', text: 'The spill lights up: resilience, creativity, connection, problem-solving, leadership.' },
    ],
  },
  next: 'Design work, reels and new AI experiments will be added here.',
}

/* ───────────────────── INNOVATION LAB ───────────────────── */

export const innovation = [
  {
    id: 'video',
    name: 'AI Video Editor',
    status: 'Concept',
    text: 'Upload raw footage and let AI help cut, caption and format it into polished, platform-ready content.',
    why: 'Inspired by producing real-estate video content in CapCut.',
    explore: ['Scene detection', 'Auto-captions', 'Format presets'],
  },
  {
    id: 'assistant',
    name: 'AI Personal Assistant',
    status: 'Concept',
    text: 'An intelligent assistant for productivity, organization and daily tasks — schedules, reminders and follow-ups in one place.',
    why: 'Shaped by coordinating schedules, deadlines and follow-ups for the agents I supported.',
    explore: ['Task capture', 'Smart reminders', 'Daily planning'],
  },
  {
    id: 'budget',
    name: 'Smart Budget',
    status: 'Concept',
    text: 'A personal finance and budgeting app that makes spending patterns easy to see and plans easy to keep.',
    why: 'Built on my finance & accounting background.',
    explore: ['Categorization', 'Monthly insights', 'Goal tracking'],
  },
  {
    id: 'cyber',
    name: 'CyberDetective',
    status: 'Concept',
    text: 'An educational cybersecurity game with missions, difficulty levels and practical challenges that teach security thinking by playing.',
    why: 'Connects my IT audit and risk background with learning by doing.',
    explore: ['Missions', 'Difficulty levels', 'Practical challenges'],
  },
]

/* ───────────────────────── SKILLS ───────────────────────── */

export type EvidenceId = 'kpmg' | 'realestate' | 'bank' | 'icstars' | 'qa' | 'edu'

export const evidenceSources: { id: EvidenceId; label: string; sub: string }[] = [
  { id: 'kpmg', label: 'KPMG Poland', sub: 'IT Audit & Assurance' },
  { id: 'realestate', label: 'Keller Williams / HomeSmart', sub: 'Operations & marketing' },
  { id: 'bank', label: 'Getin Noble Bank', sub: 'Customer service' },
  { id: 'icstars', label: 'i.c.stars Chicago', sub: 'Medline client project' },
  { id: 'qa', label: 'QC/QA course', sub: 'TOMMY Online University' },
  { id: 'edu', label: 'Universities', sub: 'KUL · SGH' },
]

export type Skill = { name: string; level: string; evidence: EvidenceId[] }

export const skills: { professional: Skill[]; developing: Skill[] } = {
  professional: [
    { name: 'IT Audit & Assurance', level: 'Professional', evidence: ['kpmg'] },
    { name: 'IT Controls & Risk', level: 'Professional', evidence: ['kpmg'] },
    { name: 'Business Analysis', level: 'Applied', evidence: ['kpmg', 'icstars', 'edu'] },
    { name: 'Documentation', level: 'Professional', evidence: ['kpmg', 'realestate', 'icstars'] },
    { name: 'Client Communication', level: 'Professional', evidence: ['kpmg', 'realestate', 'bank'] },
    { name: 'Project Coordination', level: 'Professional', evidence: ['realestate', 'icstars'] },
    { name: 'Excel', level: 'Advanced', evidence: ['kpmg', 'realestate', 'edu'] },
    { name: 'Creative Marketing', level: 'Professional', evidence: ['realestate', 'edu'] },
    { name: 'Canva', level: 'Advanced', evidence: ['realestate'] },
    { name: 'CapCut', level: 'Advanced', evidence: ['realestate'] },
  ],
  developing: [
    { name: 'SQL', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Python', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Git & GitHub', level: 'Foundational', evidence: ['icstars'] },
    { name: 'VS Code', level: 'Foundational', evidence: ['icstars'] },
    { name: 'QA & Manual Testing', level: 'Trained', evidence: ['qa', 'icstars'] },
    { name: 'Jira', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Figma', level: 'Working knowledge', evidence: ['icstars'] },
    { name: 'AI-assisted workflows', level: 'Developing', evidence: ['icstars'] },
  ],
}

export const otherTools = ['KPMG Clara', 'MLS', 'Word', 'PowerPoint', 'Email & calendar management']

export const languageLevels = [
  { name: 'Ukrainian', level: 'Native' },
  { name: 'Polish', level: 'Fluent' },
  { name: 'Russian', level: 'Fluent' },
  { name: 'English', level: 'Professional' },
]

/* ─────────────────────── HOW I WORK ─────────────────────── */

export const process = [
  { title: 'Understand the problem', text: 'Start with the people affected and what “fixed” would actually look like for them.' },
  { title: 'Ask questions', text: 'Clarify scope, edge cases and assumptions before anyone builds anything.' },
  { title: 'Research & analyze', text: 'Gather evidence, data and examples — and look for the pattern behind them.' },
  { title: 'Explore solutions', text: 'Compare options, trade-offs and risks instead of falling for the first idea.' },
  { title: 'Build or document', text: 'Turn the chosen option into requirements, workflows, test cases — or a working prototype.' },
  { title: 'Test, learn, improve', text: 'Check expected against actual, learn from the gap, and iterate.' },
]

export const aiApproach =
  'I use AI as a learning and problem-solving assistant — to explain unfamiliar concepts, brainstorm options and review drafts. Then I check the output against reliable sources and make the final call myself.'

/* ───────────────────────── JOURNEY ───────────────────────── */

export type Milestone = {
  when: string
  title: string
  text: string
  kind: 'life' | 'education' | 'work'
  place: string
}

export const journey: Milestone[] = [
  {
    when: 'Age 16–17',
    title: 'Ukraine → Poland, on my own',
    text: 'Moved alone to Poland to pursue a university education in a new language — working toward tuition-free study and receiving an academic scholarship along the way.',
    kind: 'life',
    place: 'Ukraine → Poland',
  },
  {
    when: '2015 – 2018',
    title: 'Bachelor’s in Economics',
    text: 'John Paul II Catholic University of Lublin — studying in Polish while working.',
    kind: 'education',
    place: 'Lublin, Poland',
  },
  {
    when: '2018 – 2021',
    title: 'Master’s in Economics & in Marketing',
    text: 'Economics (2018–2020) and Marketing (2019–2021) at the John Paul II Catholic University of Lublin.',
    kind: 'education',
    place: 'Lublin, Poland',
  },
  {
    when: '2020 – 2022',
    title: 'Master’s in Finance & Accounting',
    text: 'SGH Warsaw School of Economics — while working at Getin Noble Bank from June 2020.',
    kind: 'education',
    place: 'Warsaw, Poland',
  },
  {
    when: 'Before Dec 2021',
    title: 'QC/QA Engineer course',
    text: 'TOMMY Online University: manual website testing, bug reports and a final testing project.',
    kind: 'education',
    place: 'Online · Ukraine',
  },
  {
    when: 'Dec 2021 – Aug 2024',
    title: 'KPMG Poland — IT Audit & Assurance',
    text: 'Nearly three years testing controls, assessing technology risk and documenting evidence.',
    kind: 'work',
    place: 'Poland',
  },
  {
    when: '2024 · Age 26',
    title: 'A new start in the United States',
    text: 'Moved to the U.S. and started over — real-estate coordination and marketing from October 2024.',
    kind: 'life',
    place: 'Illinois, USA',
  },
  {
    when: 'Aug – Dec 2026',
    title: 'i.c.stars Chicago',
    text: 'Technology Intern and Product & Business Analyst Lead on the Medline client project.',
    kind: 'work',
    place: 'Chicago, IL',
  },
  {
    when: 'Next',
    title: 'Where analysis, risk, quality and technology meet',
    text: 'Looking for roles in IT risk & GRC, business / product analysis, or QA.',
    kind: 'work',
    place: 'Open to relocation',
  },
]

export const education = [
  {
    school: 'SGH Warsaw School of Economics',
    degree: 'Master’s in Finance and Accounting',
    years: '2020 – 2022',
    place: 'Warsaw, Poland',
  },
  {
    school: 'John Paul II Catholic University of Lublin',
    degree: 'Master’s in Marketing',
    years: '2019 – 2021',
    place: 'Lublin, Poland',
  },
  {
    school: 'John Paul II Catholic University of Lublin',
    degree: 'Master’s in Economics',
    years: '2018 – 2020',
    place: 'Lublin, Poland',
  },
  {
    school: 'John Paul II Catholic University of Lublin',
    degree: 'Bachelor’s in Economics',
    years: '2015 – 2018',
    place: 'Lublin, Poland',
  },
]

export const training = [
  { name: 'QC/QA Engineer course', by: 'TOMMY Online University', proof: 'Diploma' },
  { name: 'IT & Data Analysis Training', by: '', proof: '' },
  { name: 'Content Specialist Training', by: 'Poland', proof: '' },
  { name: 'English as a Second Language', by: 'USA', proof: 'Completed' },
]

/* ───────────────────────── CONTACT ───────────────────────── */

export const contact = {
  title: ['Let’s create', 'something meaningful.'],
  text: 'I’m open to opportunities where analytical thinking, creativity, business understanding and technology come together.',
}
