/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE TEXT LIVES HERE.
 *  Edit this file to update copy, add a project, a creative piece,
 *  a skill or a timeline entry — the sections render from this data.
 *  Everything below is sourced from Olesia's résumés (Oct 2026),
 *  her master-résumé workbook and supplied documents.
 * ─────────────────────────────────────────────────────────────
 */

/** Builds a URL to a file in /public that works on any GitHub Pages path
 *  (and with any `base` setting, with or without a trailing slash). */
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${path.replace(/^\//, '')}`

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

/** The site's pages (hash routes — they work on GitHub Pages and with the browser's Back button). */
export const nav = [
  { id: 'home', to: '/', label: 'Home', menuLabel: 'Home', sub: 'The start — and the hidden AI side.' },
  { id: 'about', to: '/about', label: 'About', menuLabel: 'About me', sub: 'Ukraine → Poland → USA. My story, strengths and journey.' },
  { id: 'experience', to: '/experience', label: 'Experience', menuLabel: 'Experience', sub: 'KPMG IT audit, i.c.stars, real estate, banking — and my skills.' },
  { id: 'projects', to: '/projects', label: 'Projects', menuLabel: 'Projects', sub: 'Medline, Cybersecurity Challenge, Cycle Soundtrack, QA.' },
  { id: 'studio', to: '/studio', label: 'Studio', menuLabel: 'Creative studio', sub: 'AI video & creative experiments.' },
  { id: 'contact', to: '/contact', label: 'Contact', menuLabel: 'Contact me', sub: 'Let’s create something meaningful.' },
] as const

export const hero = {
  eyebrow: ['Business Analyst', 'AI & Data Solutions', 'IT Audit & QA'],
  headline: ['I turn', 'curiosity', 'into real-world', 'solutions'],
  intro:
    'Analytical mind. Creative spirit. Always learning. I combine experience in IT audit, business operations, and creative problem-solving with growing technical skills to understand challenges and develop meaningful solutions.',
  ghostWords: ['Creative'],
  chips: [
    { icon: '◇', text: 'IT Audit · Risk' },
    { icon: '●', text: 'Analysis / QA' },
    { icon: '+', text: 'Creative Thinking' },
  ],
}

/** Home page: the four areas I work in, each linked to its proof. */
export const focusAreas = [
  {
    id: 'ba',
    title: 'Business Analysis',
    text: 'Requirements, user stories with acceptance criteria, personas, workflows and MVP priorities — turning an operations problem into something a team can build.',
    proof: 'Product & BA Lead · Medline',
    to: '/projects/medline',
  },
  {
    id: 'ai',
    title: 'AI & Data Solutions',
    text: 'Analyzing ~47,672 incidents and defining AI matching logic: 3 similar incidents in a rolling 24 hours become one Problem Record.',
    proof: 'Incident data · AI logic',
    to: '/projects/medline',
  },
  {
    id: 'audit',
    title: 'IT Audit & QA',
    text: 'Nearly three years testing IT and business controls at KPMG — and QC/QA training: test cases, defect reports, evidence.',
    proof: 'KPMG Poland · QC/QA diploma',
    to: '/experience/kpmg',
  },
  {
    id: 'lead',
    title: 'Leadership',
    text: 'Leading analysis on a product team, and co-creating our cycle’s Gift — a video and event that scored 100% and reached TechBash.',
    proof: 'Medline team · Cycle Soundtrack',
    to: '/projects/cycle-soundtrack',
  },
]

/* ───────────────────────── ABOUT ───────────────────────── */

export const about = {
  title: ['My journey was never', 'a straight line.'],
  subtitle: 'It was a series of choices to keep growing.',
  paragraphs: [
    'I grew up in Ukraine. At 16–17 I moved to Poland on my own to go to university. I studied in Polish while holding down a job, worked toward a tuition-free place, and received an academic scholarship along the way. One degree became four: a bachelor’s and three master’s degrees in economics, marketing, and finance & accounting.',
    'That habit of learning by doing followed me into work. At KPMG in Poland I spent nearly three years in IT audit & assurance — analyzing IT-supported processes, testing IT and business controls, reviewing evidence, and documenting findings for senior review.',
    'At 26 I moved to the United States and started again: supporting documentation and coordination for 100+ real estate transactions and creating marketing for the agents I worked with. Today, at i.c.stars Chicago, I’m the Product & Business Analyst Lead on a client project for Medline and I’m building the technical side of my toolkit. With my cycle-mate Jordan Stephens I created “Cycle Soundtrack”, our cycle’s Gift, and I’m developing a cybersecurity awareness game for Tech Expo.',
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
      id: 'requirements',
      title: 'From data to requirements',
      text: 'Finding the pattern in a large dataset and turning it into rules, stories and priorities a team can build.',
      evidence: ['Medline client project', 'i.c.stars'],
      figure: { prefix: '~', value: 47672, suffix: '', label: 'incidents in the dataset I analyzed' },
      details: [
        'Analyzed a dataset of about 47,672 incident tickets to understand how recurring problems show up.',
        'Helped define the AI matching logic: 3 similar incidents within a rolling 24 hours create a Problem Record.',
        'Wrote user stories and acceptance criteria, and helped prioritize the MVP and plan sprints.',
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
      id: 'leadership',
      title: 'Leadership in action',
      text: 'Leading a product team’s analysis work — and creating something for my whole cycle when time was scarce.',
      evidence: ['Medline team lead', 'i.c.stars Gift'],
      figure: { prefix: '', value: 100, suffix: '%', label: 'on the i.c.stars Gift Scorecard' },
      details: [
        'Product & Business Analyst Lead on the Medline team: meetings, priorities, task assignments and deliverables.',
        'Co-created “Cycle Soundtrack” with Jordan Stephens — a video and event for Chicago Cycle 60.',
        'The Gift scored 100% on the i.c.stars Gift Scorecard and was shown to Chicago’s tech community at TechBash.',
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
    text: 'Four degrees, a QC/QA course, and now technology and leadership training at i.c.stars.',
    evidence: 'KUL · SGH · TOMMY · i.c.stars',
  },
  photoAlt: 'Olesia Dmytrush, professional portrait in a black blazer with arms crossed',
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
  /** Optional link to a detailed page. */
  spotlight?: string
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
      'Lead product & business analysis for the Medline Operations Problem Navigator: requirements gathering, stakeholder feedback, user stories with acceptance criteria, personas, workflow diagrams and wireframes.',
      'Analyzed a dataset of about 47,672 incidents and helped define the AI matching logic — 3 similar incidents within a rolling 24 hours create a Problem Record.',
      'Prioritized features for the MVP, took part in sprint planning and worked closely with the development team.',
      'Prepare QA artifacts — test cases and defect tracking — and stakeholder presentations.',
      'Co-created “Cycle Soundtrack”, our cycle’s Gift (Leadership in Action), which scored 100% on the Gift Scorecard.',
      'Developing foundational skills in SQL, Python, GitHub, VS Code, Jira, Figma and AI-assisted workflows.',
    ],
    tags: ['Requirements', 'User stories', 'Acceptance criteria', 'Data analysis', 'AI logic', 'Sprint planning', 'Jira', 'Figma'],
    note: 'Ongoing training and team project work — not finished production experience.',
    spotlight: '/projects/medline',
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
      'Nearly three years assessing technology risk and testing IT and business controls on client engagements in financial services and other industries.',
    bullets: [
      'Analyzed IT-supported business processes and identified technology risks and potential control weaknesses.',
      'Tested business and IT controls, reviewed supporting evidence, and documented findings for senior audit team review.',
      'Prepared audit working papers and contributed to reports and presentations of findings.',
      'Requested audit evidence directly from clients, took part in client meetings, and followed up on documentation and control-related questions.',
      'Supported financial audit teams with data analysis in Microsoft Excel and KPMG Clara; assignments typically lasted about 3–9 months.',
    ],
    tags: ['IT controls', 'Risk assessment', 'Audit evidence', 'Working papers', 'Excel', 'KPMG Clara'],
    note: 'Client engagements are confidential — no client names or details are shared here.',
    spotlight: '/experience/kpmg',
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

/** Detailed page: KPMG — IT Audit & Assurance (facts from the résumés; no client details). */
export const kpmgSpotlight = {
  title: 'IT Audit & Assurance',
  company: 'KPMG Poland',
  role: 'Consultant — IT Audit & Assurance',
  dates: 'Dec 2021 – Aug 2024',
  lead:
    'For nearly three years I helped audit teams answer one question for their clients: can the technology behind the business be trusted? That meant understanding how IT-supported processes work, finding where they could fail, testing the controls meant to prevent it — and documenting the evidence so a senior reviewer could rely on it.',
  facts: [
    { value: '~3', label: 'years at KPMG', detail: 'Dec 2021 – Aug 2024' },
    { value: '3–9', label: 'months per assignment', detail: 'typical engagement length' },
    { value: 'FS', label: 'industry focus', detail: 'financial services — and other industries' },
  ],
  cycle: [
    { step: 'Understand', title: 'Map the process', text: 'Analyzed IT-supported business processes to see how data and decisions flow.' },
    { step: 'Assess', title: 'Identify risks', text: 'Identified technology risks and potential control weaknesses.' },
    { step: 'Test', title: 'Test the controls', text: 'Tested business and IT controls against what they were designed to do.' },
    { step: 'Evidence', title: 'Review evidence', text: 'Requested evidence directly from clients and reviewed it for each control.' },
    { step: 'Document', title: 'Write it down', text: 'Prepared audit working papers and documented findings for senior review.' },
    { step: 'Report', title: 'Share findings', text: 'Contributed to reports and presentations of findings.' },
  ],
  groups: [
    {
      title: 'Risk & control testing',
      items: [
        'Analyzed IT-supported business processes',
        'Identified technology risks and potential control weaknesses',
        'Tested business and IT controls',
        'Reviewed supporting evidence for each test',
      ],
    },
    {
      title: 'Documentation & reporting',
      items: [
        'Prepared audit working papers',
        'Documented findings for senior audit team review',
        'Contributed to reports and presentations of findings',
      ],
    },
    {
      title: 'Client communication',
      items: [
        'Requested audit evidence directly from clients',
        'Took part in client meetings',
        'Followed up on documentation and control-related questions',
      ],
    },
    {
      title: 'Data support',
      items: [
        'Supported financial audit teams with data analysis',
        'Worked in Microsoft Excel and KPMG Clara',
      ],
    },
  ],
  tools: ['IT general & business controls', 'Risk assessment', 'Audit evidence', 'Working papers', 'Microsoft Excel', 'KPMG Clara'],
  carries: [
    { title: 'IT risk & GRC', text: 'Thinking in risks, controls and evidence is the core of governance, risk and compliance work.' },
    { title: 'Business analysis', text: 'Mapping a process and asking “what could go wrong here?” is how good requirements start.' },
    { title: 'QA', text: 'A control test and a test case share one discipline: define what should happen, test it, document the gap.' },
  ],
}

/* ──────────────────────── PROJECTS ──────────────────────── */

export type ProjectCategory = 'Business Analysis' | 'Cybersecurity' | 'Leadership' | 'QA & Testing' | 'Creative & AI'

export type Project = {
  id: string
  index: string
  name: string
  /** Short name for cards, menus and navigation. */
  short: string
  category: ProjectCategory
  /** One line for the gallery card. */
  summary: string
  status: string
  statusTone: 'progress' | 'done'
  context: string
  role: string
  tools: string[]
  /** One verified number or fact shown on the card. */
  highlight?: { value: string; label: string }
  featured?: boolean
  /** Generic case-study fields (used by projects without a bespoke page layout). */
  problem?: string
  goal?: string
  work?: string[]
  outcome?: string
  /** What I learned — written in my own words; edit freely. */
  learned?: string
  /** Optional links — only real, public URLs. */
  links?: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    id: 'medline',
    index: '01',
    name: 'Medline — Operations Problem Navigator',
    short: 'Medline',
    category: 'Business Analysis',
    summary:
      'An AI-assisted tool that spots recurring incident patterns and turns them into Problem Records — my main case study in requirements, data and product analysis.',
    status: 'In progress · Aug–Dec 2026',
    statusTone: 'progress',
    context: 'i.c.stars Chicago · client project',
    role: 'Product & Business Analyst Lead',
    tools: ['Requirements', 'User stories', 'Acceptance criteria', 'Personas', 'Workflow diagrams', 'Wireframes', 'Data analysis', 'Sprint planning', 'Test cases', 'Jira', 'Figma'],
    highlight: { value: '~47,672', label: 'incidents analyzed' },
    featured: true,
    learned:
      'Translating an operations problem into requirements a development team can build — and a client can recognize as their own.',
  },
  {
    id: 'cybersecurity-challenge',
    index: '02',
    name: 'Cybersecurity Challenge',
    short: 'Cybersecurity Challenge',
    category: 'Cybersecurity',
    summary: 'An interactive educational game that makes cybersecurity awareness engaging, accessible and practical — my Tech Expo project.',
    status: 'In development · Tech Expo showcase',
    statusTone: 'progress',
    context: 'Personal project',
    role: 'Creator — product concept, UX/UI and learning design',
    tools: ['Product concept', 'UX/UI design', 'Gamification', 'Interactive learning', 'Cybersecurity awareness'],
    highlight: { value: 'Tech Expo', label: 'showcase project' },
  },
  {
    id: 'cycle-soundtrack',
    index: '03',
    name: 'Cycle Soundtrack — i.c.stars Gift',
    short: 'Cycle Soundtrack',
    category: 'Leadership',
    summary:
      'Our cycle’s Gift — Leadership in Action: a video and an event that captured Chicago Cycle 60’s journey, later shown at TechBash.',
    status: 'Completed · Nov 2026',
    statusTone: 'done',
    context: 'i.c.stars Chicago · Cycle 60',
    role: 'Co-creator, with Jordan Stephens',
    tools: ['Storytelling', 'Video', 'Event', 'Leadership in Action'],
    highlight: { value: '100%', label: 'on the Gift Scorecard' },
  },
  {
    id: 'qa',
    index: '04',
    name: 'QA & Software Testing',
    short: 'QA & Testing',
    category: 'QA & Testing',
    summary: 'Manual website testing, bug reports and a final testing project — now test cases and defect tracking at i.c.stars.',
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
      'Now creating test cases and tracking defects for the Medline project at i.c.stars',
    ],
    tools: ['Test cases', 'Checklists', 'Defect reports', 'Test-design techniques', 'Databases', 'API basics'],
    highlight: { value: 'Diploma', label: 'QC/QA Engineer' },
    outcome:
      'Earned the QC/QA Engineer diploma (completed before Dec 2021). The same discipline carried into IT control testing at KPMG: define what should happen, test it, and document the evidence.',
    learned: 'Write the expected result down before testing — then the defect is simply the gap, and the evidence explains it.',
  },
  {
    id: 'aivideo',
    index: '05',
    name: 'Spills Become Skills — AI short film',
    short: 'AI short film',
    category: 'Creative & AI',
    summary: 'A five-scene AI video where a spilled coffee turns into five skills. My story and concept, generated with Google Flow (Veo).',
    status: 'Completed · 2026',
    statusTone: 'done',
    context: 'Personal creative project',
    role: 'Story & concept',
    problem:
      'An everyday setback — a coffee spilled on the way to work — as a visual metaphor for how difficult moments build skills.',
    goal: 'Tell a short visual story with a clear message, using AI video generation.',
    work: ['Came up with the idea and the message', 'Shaped the story arc across five scenes', 'Chose the five skills the story ends on'],
    tools: ['Google Flow (Veo)'],
    highlight: { value: '5', label: 'scenes · ~40 seconds' },
    outcome:
      'Completed: five vertical scenes, about 40 seconds in total. The visuals, motion and audio were generated by AI; the story and concept are mine.',
    learned: 'With AI video, the idea and the structure are the real creative work — the tool only renders what you can clearly describe.',
  },
]

/* ─────────────── Case study #1 — Medline (details) ─────────────── */

export const medlineCase = {
  environment: 'i.c.stars Chicago · client project',
  timeline: 'Aug – Dec 2026',
  problem: {
    text: 'Medline handles thousands of incident tickets coming from different locations and systems. When every ticket is analyzed on its own, the same operational problem can keep coming back without anyone seeing the pattern.',
    points: ['Thousands of tickets', 'Many locations & systems', 'Patterns hidden in single tickets'],
  },
  solution:
    'Operations Problem Navigator uses AI to analyze incidents, detect similar events and identify recurring operational problems — so the right team can fix the cause, not just the ticket.',
  rule: '3 similar incidents within a rolling 24-hour period → create a Problem Record.',
  flow: [
    { title: 'AI analysis', text: 'New incidents are read and classified.' },
    { title: 'Similarity detection', text: 'Incidents that describe the same issue are matched.' },
    { title: 'Problem Record', text: '3 matches in a rolling 24 h open a Problem Record.' },
    { title: 'Prioritization', text: 'Problems are ranked by impact and urgency.' },
    { title: 'Owner', text: 'Each Problem is routed to the team that can fix it.' },
    { title: 'Resolution tracking', text: 'Progress is tracked until the cause is fixed.' },
    { title: 'Recurring monitoring', text: 'If it comes back, the pattern is caught again.' },
  ],
  scale: { value: 47672, label: 'incidents in the dataset I analyzed (approximately)' },
  work: [
    { phase: 'Discover', items: ['Requirements gathering & stakeholder feedback', 'Personas', 'Incident data analysis'] },
    { phase: 'Define', items: ['User stories & acceptance criteria', 'Workflow diagrams', 'Wireframes', 'Defining the AI matching logic'] },
    { phase: 'Deliver', items: ['Feature prioritization & MVP', 'Sprint planning', 'Collaboration with the development team'] },
    { phase: 'Assure', items: ['QA / test cases', 'Defect tracking', 'Stakeholder presentations'] },
  ],
  modules: [
    { name: 'Incidents', text: 'One standard way to report an incident.' },
    { name: 'Problem Register', text: 'Related incidents grouped into Problem Records.' },
    { name: 'Resolution Manager', text: 'Each Problem routed to an owner and tracked to resolution.' },
  ],
  status:
    'In progress. The team’s application is organized into three modules — Incidents, Problem Register and Resolution Manager. Testing with Medline is planned; there are no results to report yet.',
}

/** Illustrative data for the rolling 24-hour demo. NOT Medline data. */
export const rollingDemo = {
  hours: 48,
  window: 24,
  threshold: 3,
  categories: {
    scanner: { label: 'Scanner offline', team: 'Network team' },
    printer: { label: 'Label printer issue', team: 'Hardware support' },
    wifi: { label: 'Wi-Fi drop', team: 'Network team' },
  },
  incidents: [
    { id: 'INC-101', t: 1, cat: 'scanner', where: 'Dock 3' },
    { id: 'INC-102', t: 4, cat: 'printer', where: 'Line B' },
    { id: 'INC-103', t: 7.5, cat: 'scanner', where: 'Dock 5' },
    { id: 'INC-104', t: 11, cat: 'wifi', where: 'Aisle 12' },
    { id: 'INC-105', t: 15, cat: 'scanner', where: 'Dock 3' },
    { id: 'INC-106', t: 22, cat: 'printer', where: 'Line B' },
    { id: 'INC-107', t: 30, cat: 'wifi', where: 'Aisle 12' },
    { id: 'INC-108', t: 33, cat: 'printer', where: 'Line B' },
    { id: 'INC-109', t: 38, cat: 'printer', where: 'Line B' },
    { id: 'INC-110', t: 44, cat: 'wifi', where: 'Aisle 12' },
  ] as { id: string; t: number; cat: 'scanner' | 'printer' | 'wifi'; where: string }[],
}

/* ─────────────── Cybersecurity Challenge (details) ─────────────── */

export const cyberChallenge = {
  type: 'Personal project',
  focus: ['Cybersecurity awareness', 'Interactive learning', 'UX/UI design'],
  overview: [
    'Cybersecurity Challenge is an interactive educational game designed to make cybersecurity awareness engaging, accessible, and practical.',
    'The project focuses on helping users recognize common digital threats, improve their decision-making skills, and understand how everyday actions can affect online security.',
  ],
  goals: [
    'Make cybersecurity education more engaging through gamification.',
    'Help users develop stronger security awareness.',
    'Encourage critical thinking and safer digital habits.',
    'Create an intuitive and visually appealing learning experience.',
  ],
  skills: ['Product Concept Development', 'User Experience (UX/UI)', 'Problem-Solving', 'Cybersecurity Awareness', 'Interactive Learning Design', 'Creative Thinking'],
  status: 'In development — Tech Expo showcase',
  /** A small playable preview of the idea, written for this portfolio (not taken from the game). */
  preview: [
    {
      kind: 'Email',
      text: 'Your account will be closed today unless you verify your password at this link.',
      answer: 'suspicious' as const,
      why: 'Urgency plus a request for your password is a classic phishing pattern. Go to the website directly instead of clicking.',
    },
    {
      kind: 'Shared file',
      text: 'A coworker you met with this morning shares the agreed document through your company’s usual file-sharing tool.',
      answer: 'safe' as const,
      why: 'Expected, from a known person, through the normal channel. If anything feels off, confirm with them directly.',
    },
    {
      kind: 'Text message',
      text: 'You won a $500 gift card! Pay a small shipping fee by card to claim it.',
      answer: 'suspicious' as const,
      why: 'A prize you never entered for and a request for payment are typical scam signals.',
    },
    {
      kind: 'Pop-up',
      text: 'Your computer is infected! Call this support number now to remove the virus.',
      answer: 'suspicious' as const,
      why: 'Real security software doesn’t ask you to call a number from a browser pop-up. Close the tab.',
    },
  ],
}

/* ─────────────── Cycle Soundtrack — i.c.stars Gift (details) ─────────────── */

export const cycleSoundtrack = {
  creators: 'Olesia Dmytrush & Jordan Stephens',
  cycle: 'Chicago Cycle 60',
  presented: 'Presented Nov 10, 2026',
  gift: [
    'At i.c.stars, Gifts are Leadership in Action. Interns are challenged to create opportunities for others while navigating their own internship experience.',
    'Gifts are given on purpose during a season when resources are scarce — time, money, and mental and emotional capacity.',
  ],
  story:
    'Our Gift began as an opportunity to capture and reflect on the experience of Chicago Cycle 60 — a video and an event about our 14-week journey and the people who shaped it.',
  techbash: 'The Gift was also shown to Chicago’s tech community at TechBash — a celebratory evening of connection & creativity.',
  score: {
    value: '100%',
    label: 'i.c.stars Gift Scorecard',
    criteria: ['Make opportunities', 'Visibility', 'Integrity', 'Community', 'Legacy'],
  },
  quotes: [
    {
      quote: 'Olesia and Jordan’s Gift, “Cycle Soundtrack,” is a beautiful example of that philosophy in action.',
      by: 'Brandies Meva’a',
      role: 'Program Director, i.c.stars',
    },
    {
      quote: 'You all have set the bar for future cycles and your current cycle mates.',
      by: 'Brandies Meva’a',
      role: 'Program Director, i.c.stars',
    },
    {
      quote: 'Congratulations on putting together such a powerful event and video. Well done!',
      by: 'Elizabeth Ferruelo',
      role: 'Chief Development Officer, i.c.stars',
    },
  ],
  video: { src: 'videos/cycle-soundtrack.mp4', poster: 'videos/cycle-soundtrack.webp', duration: '5:37' },
  photos: [
    { file: 'techbash-500', w: 758, h: 1100, alt: 'The Cycle Soundtrack video projected on a gallery wall at TechBash 2026', caption: 'The video on screen at TechBash' },
    { file: 'techbash-olesia', w: 825, h: 1100, alt: 'Olesia at TechBash 2026 in front of the i.c.stars backdrop', caption: 'At TechBash 2026' },
    { file: 'techbash-sponsors', w: 825, h: 1100, alt: 'TechBash 2026 sponsor board, including Medline and Comcast Business', caption: 'TechBash 2026 · Chicago' },
    { file: 'techbash-group', w: 1100, h: 825, alt: 'Selfie of Olesia with i.c.stars community members at TechBash', caption: 'Connection & creativity' },
    { file: 'techbash-trio', w: 825, h: 1100, alt: 'Olesia with two cycle-mates at the i.c.stars backdrop', caption: 'With cycle-mates' },
    { file: 'techbash-cohort-selfie', w: 1100, h: 825, alt: 'Selfie of Olesia with Cycle 60 interns at the i.c.stars wall', caption: 'Chicago Cycle 60' },
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
]

/* ───────────────────────── SKILLS ───────────────────────── */

export type EvidenceId = 'kpmg' | 'icstars' | 'gift' | 'realestate' | 'bank' | 'qa' | 'edu'

export const evidenceSources: { id: EvidenceId; label: string; sub: string }[] = [
  { id: 'kpmg', label: 'KPMG Poland', sub: 'IT Audit & Assurance' },
  { id: 'icstars', label: 'i.c.stars Chicago', sub: 'Medline client project' },
  { id: 'gift', label: 'i.c.stars Gift', sub: 'Cycle Soundtrack' },
  { id: 'realestate', label: 'Keller Williams / HomeSmart', sub: 'Operations & marketing' },
  { id: 'bank', label: 'Getin Noble Bank', sub: 'Customer service' },
  { id: 'qa', label: 'QC/QA course', sub: 'TOMMY Online University' },
  { id: 'edu', label: 'Universities', sub: 'KUL · SGH' },
]

export type Skill = { name: string; level: string; evidence: EvidenceId[] }
export type SkillArea = { id: string; title: string; skills: Skill[] }

/** Professional strengths, grouped by area. Level: Professional = paid roles · Applied = Medline client project. */
export const skillAreas: SkillArea[] = [
  {
    id: 'audit',
    title: 'IT audit & risk',
    skills: [
      { name: 'IT Audit & Assurance', level: 'Professional', evidence: ['kpmg'] },
      { name: 'IT & Business Controls Testing', level: 'Professional', evidence: ['kpmg'] },
      { name: 'Risk Assessment', level: 'Professional', evidence: ['kpmg'] },
      { name: 'Audit Evidence Review', level: 'Professional', evidence: ['kpmg'] },
      { name: 'Working Papers & Findings', level: 'Professional', evidence: ['kpmg'] },
    ],
  },
  {
    id: 'ba',
    title: 'Business analysis',
    skills: [
      { name: 'Requirements Gathering', level: 'Applied', evidence: ['icstars'] },
      { name: 'Stakeholder Feedback', level: 'Applied', evidence: ['icstars'] },
      { name: 'User Stories & Acceptance Criteria', level: 'Applied', evidence: ['icstars'] },
      { name: 'Personas', level: 'Applied', evidence: ['icstars'] },
      { name: 'Process & Workflow Mapping', level: 'Applied', evidence: ['icstars', 'kpmg'] },
      { name: 'Wireframes', level: 'Applied', evidence: ['icstars'] },
      { name: 'MVP Prioritization', level: 'Applied', evidence: ['icstars'] },
    ],
  },
  {
    id: 'data',
    title: 'Data & AI',
    skills: [
      { name: 'Incident Data Analysis', level: 'Applied', evidence: ['icstars'] },
      { name: 'AI Matching Logic', level: 'Applied', evidence: ['icstars'] },
      { name: 'Data Analysis in Excel', level: 'Professional', evidence: ['kpmg', 'realestate', 'edu'] },
      { name: 'KPMG Clara', level: 'Professional', evidence: ['kpmg'] },
    ],
  },
  {
    id: 'lead',
    title: 'Leadership & communication',
    skills: [
      { name: 'Team Coordination', level: 'Applied', evidence: ['icstars', 'gift'] },
      { name: 'Sprint Planning', level: 'Applied', evidence: ['icstars'] },
      { name: 'Stakeholder Presentations', level: 'Professional', evidence: ['kpmg', 'icstars', 'gift'] },
      { name: 'Client Communication', level: 'Professional', evidence: ['kpmg', 'realestate', 'bank'] },
      { name: 'Project Coordination', level: 'Professional', evidence: ['realestate', 'icstars'] },
      { name: 'Documentation', level: 'Professional', evidence: ['kpmg', 'realestate', 'icstars'] },
      { name: 'Customer Service', level: 'Professional', evidence: ['bank', 'realestate'] },
    ],
  },
  {
    id: 'creative',
    title: 'Creative',
    skills: [
      { name: 'Storytelling & Video', level: 'Applied', evidence: ['gift'] },
      { name: 'Creative Marketing', level: 'Professional', evidence: ['realestate', 'edu'] },
      { name: 'Canva', level: 'Advanced', evidence: ['realestate'] },
      { name: 'CapCut', level: 'Advanced', evidence: ['realestate'] },
    ],
  },
]

export const skills: { developing: Skill[] } = {
  developing: [
    { name: 'QA & Manual Testing', level: 'Trained', evidence: ['qa', 'icstars'] },
    { name: 'Test Cases & Defect Tracking', level: 'Applied', evidence: ['qa', 'icstars'] },
    { name: 'SQL', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Python', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Git & GitHub', level: 'Foundational', evidence: ['icstars'] },
    { name: 'VS Code', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Jira', level: 'Foundational', evidence: ['icstars'] },
    { name: 'Figma', level: 'Working knowledge', evidence: ['icstars'] },
    { name: 'AI-assisted workflows', level: 'Developing', evidence: ['icstars'] },
  ],
}

export const otherTools = ['MLS', 'Microsoft Word', 'PowerPoint', 'Email & calendar management']

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
