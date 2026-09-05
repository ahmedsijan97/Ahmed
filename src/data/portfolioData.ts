import {
  CaseStudyItem,
  CertificationItem,
  ExperienceItem,
  HowIWorkStep,
  ProjectItem,
  ServiceItem,
  SkillItem,
  TestimonialItem,
  TimelineItem,
  TrustStat
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Sayed Ahmed Sijan',
  title: 'Digital Marketer & AI Performance Specialist',
  badge: 'AVAILABLE FOR SELECT PROJECTS',
  avatar: './assets/profile.jpg',
  headline: 'I Turn Marketing Data Into Measurable Growth.',
  supportingText: 'Digital Marketer & AI Performance Specialist helping e-commerce and local brands scale with data-driven Ads, SEO, and AI automation.',
  bio: 'Helping e-commerce and local brands scale with data-driven Ads, SEO & AI automation. Combining deep analytical science with high-velocity algorithmic advertising and automated Python workflows to maximize customer acquisition and ROAS.',
  email: 'Ahmedsijan97@gmail.com',
  phone: '+880 1763 810310',
  whatsappUrl: 'https://wa.me/8801763810310?text=Hi%20Sayed,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project!',
  location: 'Gaibandha / Dhaka, Bangladesh (Available Worldwide Remote)',
  github: 'https://github.com/sayedahmedsijan',
  linkedin: 'https://linkedin.com/in/sayed-ahmed-sijan',
  facebook: 'https://www.facebook.com/ahmedsijan310',
  education: 'B.Sc (Honours) in Science, National University Gaibandha',
  academicBackground: 'B.Sc (Hon’s) National University | Science & Analytical Research Foundation'
};

export const HERO_FLOATING_METRICS = [
  { label: 'Average ROAS Boost', value: '+147%', change: 'Scaled from 1.8x to 4.4x', isPositive: true, tag: 'Meta & Google Ads' },
  { label: 'Organic Search Traffic', value: '+82%', change: '+14.2k monthly visitors', isPositive: true, tag: 'Technical SEO' },
  { label: 'Customer Acq. Cost (CPA)', value: '-34%', change: 'Blended cost reduction', isPositive: true, tag: 'Funnel Optimization' },
  { label: 'Store Conversion Rate', value: '+61%', change: 'From 1.9% to 3.1%', isPositive: true, tag: 'CRO & AI Testing' }
];

export const TRUST_STATS: TrustStat[] = [
  { value: '5+', numericValue: 5, suffix: '+ Years', label: 'Experience', description: 'Driving scalable performance marketing & growth engineering' },
  { value: '80+', numericValue: 80, suffix: '+ Projects', label: 'Projects Completed', description: 'Across e-commerce, D2C, B2B SaaS, and local service brands' },
  { value: '35+', numericValue: 35, suffix: '+ Brands', label: 'Brands Scaled', description: 'Achieving consistent positive cash flow and market dominance' },
  { value: '3.8x', numericValue: 3.8, suffix: 'x Avg', label: 'Average ROAS', description: 'Tested across paid social, search, and automated retargeting' },
  { value: '$4.2M+', numericValue: 4.2, suffix: 'M+ Spent', label: 'Ad Spend Managed', description: 'Profitable capital allocation across Meta, Google & TikTok' }
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 'timeline-1',
    phase: 'Phase 01: Foundations & Scientific Analytical Rigor',
    period: '2019 – 2021',
    role: 'Analytical Research & Digital Media Apprentice',
    company: 'Gaibandha / Academic & Early Agency Work',
    location: 'Bangladesh',
    summary: 'Built strong foundational capabilities in data modeling, structured testing methodologies, and fundamental digital marketing channels.',
    details: [
      'Graduated with Bachelor of Science (Honours) developing quantitative scientific analysis skills.',
      'Mastered fundamentals of search engine algorithms, keyword intent hierarchies, and tracking architectures.',
      'Launched early localized PPC and Social Media ad campaigns for regional businesses with high direct-response returns.'
    ],
    keyWins: ['Engineered first 10+ local brand search strategies', 'Established 100% accurate conversion tracking setups'],
    tools: ['Google Analytics', 'Google Search Console', 'Meta Business Suite', 'MS Excel / Sheets'],
    icon: 'GraduationCap'
  },
  {
    id: 'timeline-2',
    phase: 'Phase 02: Full-Funnel Performance Marketing',
    period: '2021 – 2023',
    role: 'Senior Paid Media & SEO Specialist',
    company: 'Independent Performance Consultant',
    location: 'Remote Global',
    summary: 'Scaled multi-channel paid acquisition pipelines across North America, Europe, and Asia-Pacific e-commerce stores.',
    details: [
      'Structured CBO & ASC (Advantage+ Shopping Campaigns) architectures handling monthly budgets up to $60,000.',
      'Engineered full-funnel remarketing trees segmenting high-intent basket abandoners and repeat LTV customers.',
      'Conducted technical SEO audits fixing Core Web Vitals, schema microdata, crawl budget bottlenecks, and backlink authority.'
    ],
    keyWins: ['Scaled D2C apparel brand from $15k/mo to $110k/mo at 4.2x ROAS', 'Tripled organic impressions across 8 client domains'],
    tools: ['Meta Ads Manager', 'Google Ads', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Shopify Analytics'],
    icon: 'TrendingUp'
  },
  {
    id: 'timeline-3',
    phase: 'Phase 03: Python Automation & Generative AI Integration',
    period: '2023 – 2025',
    role: 'AI Performance Marketing Engineer',
    company: 'Growth Velocity Studio',
    location: 'Global Remote',
    summary: 'Revolutionized campaign management by developing custom Python scripts and automated LLM prompt pipelines for ad copy generation and budget scaling.',
    details: [
      'Built automated Python scripts fetching real-time ad performance metrics via Meta Graph API & Google Ads API.',
      'Developed automated alert systems on Telegram/Slack triggering when CPA exceeds target threshold.',
      'Pioneered AI creative matrix generation testing 50+ localized ad hook angles per week with zero manual copy fatigue.'
    ],
    keyWins: ['Reduced campaign setup and audit time by 68%', 'Generated over $1.8M in attributed client revenue in 12 months'],
    tools: ['Python', 'OpenAI API / Claude', 'Zapier / Make', 'Meta Graph API', 'Looker Studio', 'GA4'],
    icon: 'Bot'
  },
  {
    id: 'timeline-4',
    phase: 'Phase 04: Growth Lead & AI Performance Specialist (Current)',
    period: '2025 – Present',
    role: 'Lead Growth Strategist & AI Marketer',
    company: 'Sayed Ahmed Sijan Consultancy',
    location: 'Global Remote',
    summary: 'Partnering with select high-growth brands and funded startups to engineer full-stack marketing engines combining data-driven ads, programmatic SEO, and autonomous AI agents.',
    details: [
      'Consulting high-velocity founders on omni-channel acquisition architectures and creative testing flywheels.',
      'Deploying end-to-end customer journey analytics and server-side tracking (CAPI) for privacy-first attribution.',
      'Delivering bespoke growth roadmaps with guaranteed milestone-based performance accountability.'
    ],
    keyWins: ['Maintaining client retention rate of 94%', 'Average client portfolio ROAS 3.8x across $4M+ cumulative spend'],
    tools: ['Generative AI', 'Python Automation', 'Meta CAPI', 'Looker Studio Enterprise', 'Google Ads PMax'],
    icon: 'Sparkles'
  }
];

export const HOW_I_WORK_STEPS: HowIWorkStep[] = [
  {
    step: 1,
    title: 'Understand',
    subtitle: 'Deep Brand & Unit Economics Audit',
    description: 'We dissect your product margins, customer lifetime value (LTV), target persona psychology, and historical acquisition bottlenecks.',
    deliverables: ['Unit Economics Scorecard', 'Audience Avatar Blueprint', 'Competitive Landscape Matrix'],
    icon: 'Compass',
    highlight: 'Zero guesswork foundation'
  },
  {
    step: 2,
    title: 'Analyze',
    subtitle: 'Data Tracking & Attribution Forensics',
    description: 'Audit pixel health, Google Tag Manager dataLayer triggers, Meta Conversion API (CAPI), and GA4 event pipelines to ensure 100% data fidelity.',
    deliverables: ['Attribution Health Report', 'Server-Side Tracking Setup', 'Funnel Drop-off Diagnostic'],
    icon: 'BarChart2',
    highlight: 'Clean data enables smart algorithms'
  },
  {
    step: 3,
    title: 'Strategize',
    subtitle: 'Omni-Channel Growth Blueprint',
    description: 'Crafting a customized testing roadmap across Paid Social, Search intent capture, high-intent SEO topic clusters, and automated nurture sequences.',
    deliverables: ['Channel Budget Allocation Plan', 'Creative Angle Matrix', '90-Day KPI Milestone Map'],
    icon: 'Target',
    highlight: 'Targeted capital deployment'
  },
  {
    step: 4,
    title: 'Execute',
    subtitle: 'High-Velocity Campaign Launch',
    description: 'Rapid deployment of high-converting ad hooks, dynamic creative testing (DCT), technical on-page SEO sprints, and optimized landing pages.',
    deliverables: ['Broad & Advantage+ Campaigns', 'Google Search & PMax Clusters', 'High-Converting Ad Creatives'],
    icon: 'Zap',
    highlight: 'Rapid market feedback loops'
  },
  {
    step: 5,
    title: 'Automate',
    subtitle: 'Python & AI Workflow Integration',
    description: 'Deploying automated scripts for real-time bid rules, budget reallocation, copy variant generation, and instant anomaly alerting.',
    deliverables: ['Automated Rule Engines', 'Slack/Telegram Performance Bots', 'Weekly Auto-Reporting Dashboard'],
    icon: 'Cpu',
    highlight: 'Save 20+ hours weekly'
  },
  {
    step: 6,
    title: 'Optimize',
    subtitle: 'Relentless Iterative Enhancement',
    description: 'Aggressive pruning of underperforming creative angles, query sculpting, landing page A/B testing, and audience refinement.',
    deliverables: ['Weekly A/B Experiment Logs', 'CPA Compression Actions', 'Search Query Whitelists'],
    icon: 'TrendingUp',
    highlight: 'Maximizing incremental ROAS'
  },
  {
    step: 7,
    title: 'Scale',
    subtitle: 'Uncapped Profitable Expansion',
    description: 'Safely ramping daily spend 20-30% on proven winning campaign assets, expanding into new geographical markets and lookalike segments.',
    deliverables: ['Horizontal & Vertical Scaling Model', 'Lookalike & Broad Expansion Matrix', 'Quarterly Growth Review'],
    icon: 'Layers',
    highlight: 'Predictable, sustainable revenue'
  }
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'OmniGrowth Media Inc.',
    position: 'Lead Performance Marketing & AI Strategist',
    period: '2023 – Present',
    location: 'Remote (US & Global Clients)',
    type: 'Full-Time / Consulting',
    responsibilities: [
      'Lead omni-channel acquisition strategies managing $120,000+ monthly ad spend across Meta Ads and Google PPC.',
      'Architected automated Python data pipelines feeding real-time ad performance into Looker Studio executive dashboards.',
      'Implemented server-side Conversion API (CAPI) and Google Tag Manager server containers, recapturing 28% lost event signals.',
      'Supervised creative production workflows using generative AI models for rapid multi-lingual copy adaptation.'
    ],
    achievements: [
      'Scaled an e-commerce wellness brand from $24k to $145k monthly revenue in 5 months.',
      'Reduced average customer acquisition cost (CPA) by 34.6% through algorithmic broad targeting and DCT testing.',
      'Authored automated Python bidding rule scripts preventing weekend ad fatigue and budget overspending.'
    ],
    quantifiableResults: [
      { metric: 'Average ROAS', impact: '4.3x (+147% over benchmark)' },
      { metric: 'Blended CPA Reduction', impact: '-34.6% lower customer cost' },
      { metric: 'Revenue Scaled', impact: '+$1.4M attributed gross sales' }
    ],
    tools: ['Meta Ads Manager', 'Google Ads PMax', 'Python', 'Looker Studio', 'GA4', 'Shopify CAPI', 'OpenAI API'],
    featuredProject: 'E-commerce Supplements Scaling Engine'
  },
  {
    id: 'exp-2',
    company: 'Apex Digital Agency',
    position: 'Senior PPC & SEO Campaign Manager',
    period: '2021 – 2023',
    location: 'Remote',
    type: 'Agency Specialist',
    responsibilities: [
      'Managed end-to-end Google Ads campaigns including Search, Shopping, Performance Max, and YouTube Discovery.',
      'Executed technical on-page and off-page SEO optimizations across 22 client websites in SaaS, e-commerce, and real estate.',
      'Conducted extensive keyword intent mapping, competitor backlink gap analysis, and schema markup deployments.',
      'Collaborated directly with founders and marketing directors to translate business targets into granular ad budgets.'
    ],
    achievements: [
      'Achieved Page 1 rankings on Google for 140+ high-commercial-intent keywords within 6 months.',
      'Boosted organic search traffic by 182% year-over-year for a B2B SaaS software provider.',
      'Lowered Google Search CPC by 22% via rigorous quality score optimizations and negative keyword sculpts.'
    ],
    quantifiableResults: [
      { metric: 'Organic Traffic Lift', impact: '+182% YoY qualified organic visits' },
      { metric: 'Conversion Rate', impact: '3.4% (up from 1.6%)' },
      { metric: 'Qualified Leads', impact: '+210% increase in MQLs' }
    ],
    tools: ['Google Ads', 'Ahrefs', 'Semrush', 'Screaming Frog', 'Google Search Console', 'GTM', 'WordPress'],
    featuredProject: 'B2B SaaS Organic & Search Capture'
  },
  {
    id: 'exp-3',
    company: 'Velocity Growth Lab',
    position: 'Digital Marketer & Data Analyst',
    period: '2020 – 2021',
    location: 'Dhaka / Remote',
    type: 'Growth Specialist',
    responsibilities: [
      'Constructed paid social ad funnels for direct-to-consumer lifestyle brands with custom retargeting sequences.',
      'Analyzed customer journey drop-offs using Hotjar session recordings and Google Analytics event funnels.',
      'Drafted persuasive direct-response ad copy and landing page frameworks with high conversion velocity.'
    ],
    achievements: [
      'Built first standardized reporting templates adopted across 15 internal client accounts.',
      'Maintained consistent 3.2x ROAS across high-competition holiday promotional periods.'
    ],
    quantifiableResults: [
      { metric: 'Campaign ROAS', impact: '3.2x average across 40+ campaigns' },
      { metric: 'Email List Growth', impact: '+45,000 opted-in subscribers' },
      { metric: 'Ad Click-Through Rate', impact: '3.8% (industry avg 1.2%)' }
    ],
    tools: ['Meta Business Suite', 'Google Analytics', 'Canva Pro', 'Klaviyo', 'Zapier'],
    featuredProject: 'Holiday D2C Flash Sale Acquisition'
  }
];

export const SKILL_CATEGORIES: ('All' | 'Paid Advertising' | 'SEO' | 'AI & Automation' | 'Analytics' | 'Strategy')[] = [
  'All',
  'Paid Advertising',
  'SEO',
  'AI & Automation',
  'Analytics',
  'Strategy'
];

export const SKILLS_LIST: SkillItem[] = [
  // Paid Advertising
  {
    id: 'sk-meta',
    name: 'Meta Ads (Facebook & IG)',
    category: 'Paid Advertising',
    level: 'Advanced',
    description: 'Full-funnel acquisition, Advantage+ shopping campaigns, Dynamic Creative Testing (DCT), CBO structures, custom audience retention.',
    proficiencyScore: 96,
    relatedProjects: ['D2C Luxury Apparel Scale', 'Supplements Brand Scale'],
    icon: 'Layers',
    tools: ['Meta Ads Manager', 'Meta Pixel & CAPI', 'Creative Hub', 'Commerce Manager']
  },
  {
    id: 'sk-google-ads',
    name: 'Google PPC & Search Ads',
    category: 'Paid Advertising',
    level: 'Advanced',
    description: 'High-intent search campaigns, Performance Max (PMax) asset groups, Shopping feed optimization, Smart Bidding calibration.',
    proficiencyScore: 94,
    relatedProjects: ['Local Service Multi-Location PPC', 'B2B SaaS Search Capture'],
    icon: 'Search',
    tools: ['Google Ads', 'Google Merchant Center', 'Keyword Planner', 'Ad Preview Tool']
  },
  {
    id: 'sk-retargeting',
    name: 'Dynamic Retargeting & Funnels',
    category: 'Paid Advertising',
    level: 'Advanced',
    description: 'Segmented audience warming, cart abandonment recaptures, time-decay lookback windows, cross-channel retargeting.',
    proficiencyScore: 92,
    relatedProjects: ['E-Commerce Flash Sale Pipeline', 'B2B Demo Retargeting'],
    icon: 'Repeat',
    tools: ['Custom Audiences', 'Dynamic Product Ads', 'Exclusion Rules']
  },
  {
    id: 'sk-cro',
    name: 'Conversion Rate Optimization',
    category: 'Paid Advertising',
    level: 'Professional',
    description: 'Landing page teardowns, offer positioning, checkout friction reduction, multi-variant headline testing.',
    proficiencyScore: 88,
    relatedProjects: ['Shopify Checkout Redesign', 'Lead Magnet Funnel'],
    icon: 'CheckCircle2',
    tools: ['Hotjar', 'Microsoft Clarity', 'Google Optimize / VWO', 'Unbounce']
  },

  // SEO
  {
    id: 'sk-tech-seo',
    name: 'Technical SEO & Core Web Vitals',
    category: 'SEO',
    level: 'Advanced',
    description: 'Site architecture audits, crawl budget optimization, canonicalization, JavaScript rendering, PageSpeed and schema markup.',
    proficiencyScore: 93,
    relatedProjects: ['Enterprise E-com Site Migration', 'SaaS Technical SEO Overhaul'],
    icon: 'Terminal',
    tools: ['Screaming Frog', 'Google Search Console', 'PageSpeed Insights', 'Schema.org']
  },
  {
    id: 'sk-onpage-seo',
    name: 'On-Page SEO & Content Strategy',
    category: 'SEO',
    level: 'Advanced',
    description: 'Search intent alignment, semantic keyword clustering, internal linking topology, featured snippet optimization.',
    proficiencyScore: 91,
    relatedProjects: ['B2B SaaS Content Hub', 'Local Dental Clinic Organic Domination'],
    icon: 'FileText',
    tools: ['SurferSEO', 'Ahrefs', 'Semrush', 'Clearscope']
  },
  {
    id: 'sk-seo-audits',
    name: 'Comprehensive SEO Audits',
    category: 'SEO',
    level: 'Advanced',
    description: 'Deep-dive 100+ point technical, content, backlink, and algorithmic penalty health checks with actionable roadmap creation.',
    proficiencyScore: 95,
    relatedProjects: ['E-commerce Health Diagnostic', 'Publisher Traffic Recovery'],
    icon: 'ShieldCheck',
    tools: ['Ahrefs Site Audit', 'Sitebulb', 'Semrush Audit']
  },

  // AI & Automation
  {
    id: 'sk-python-auto',
    name: 'Python Marketing Automation',
    category: 'AI & Automation',
    level: 'Advanced',
    description: 'Custom scripts interacting with Meta Graph API, Google Ads API, automated data scraping, CSV processing, and automated reporting bots.',
    proficiencyScore: 90,
    relatedProjects: ['Automated Meta Budget Reallocator', 'SEO SERP Scraper & Alert Bot'],
    icon: 'Code2',
    tools: ['Python 3', 'Pandas', 'Requests', 'Google API Client', 'Facebook SDK']
  },
  {
    id: 'sk-genai',
    name: 'Generative AI & Prompt Engineering',
    category: 'AI & Automation',
    level: 'Advanced',
    description: 'Structuring few-shot system prompts for hyper-personalized ad copy matrix generation, SEO article frameworks, and customer objections handling.',
    proficiencyScore: 94,
    relatedProjects: ['50-Angle Creative Copy Generator', 'AI Customer Persona Simulator'],
    icon: 'Sparkles',
    tools: ['Claude 3.5 Sonnet', 'OpenAI API', 'Custom GPTs', 'LangChain Basics']
  },
  {
    id: 'sk-workflow-auto',
    name: 'Autonomous Workflow Automation',
    category: 'AI & Automation',
    level: 'Professional',
    description: 'Connecting CRM systems, ad platforms, Google Sheets, and communication channels for zero-touch client onboarding and lead notifications.',
    proficiencyScore: 92,
    relatedProjects: ['Instant Lead Routing System', 'Client Auto-Reporting Pipeline'],
    icon: 'Cpu',
    tools: ['Make.com', 'Zapier', 'Webhooks', 'Telegram Bot API']
  },

  // Analytics
  {
    id: 'sk-ga4',
    name: 'GA4 & Server-Side Tracking',
    category: 'Analytics',
    level: 'Advanced',
    description: 'Custom dimensions, user-property segmentation, server-side GTM, cross-domain attribution, and e-commerce enhanced measurement.',
    proficiencyScore: 95,
    relatedProjects: ['Full Server-Side Tracking Deployment', 'Multi-Touch Attribution Dashboard'],
    icon: 'Activity',
    tools: ['Google Analytics 4', 'GTM Server Container', 'Stape.io / Cloud Run', 'BigQuery']
  },
  {
    id: 'sk-looker',
    name: 'Looker Studio & Data Visualization',
    category: 'Analytics',
    level: 'Advanced',
    description: 'Interactive executive dashboards combining blended ad spend, CAC, LTV, profit margins, and organic search velocity in real-time.',
    proficiencyScore: 93,
    relatedProjects: ['Executive CMO Ad Cockpit', 'Weekly Performance Hub'],
    icon: 'PieChart',
    tools: ['Looker Studio', 'Supermetrics', 'Google Sheets Connector']
  },

  // Strategy
  {
    id: 'sk-funnel-strat',
    name: 'Growth & Funnel Strategy',
    category: 'Strategy',
    level: 'Advanced',
    description: 'Full-journey marketing funnels, customer value optimization, lead magnet architecture, upsell/cross-sell monetization sequences.',
    proficiencyScore: 94,
    relatedProjects: ['D2C 7-Figure Scale Blueprint', 'High-Ticket B2B Funnel'],
    icon: 'Compass',
    tools: ['Figma Funnel Mapping', 'Miro', 'Funnel Analytics']
  },
  {
    id: 'sk-customer-acq',
    name: 'Customer Acquisition Economics',
    category: 'Strategy',
    level: 'Advanced',
    description: 'Unit economics modeling, payback period calculation, contribution margin analysis, and scalable ad spend risk forecasting.',
    proficiencyScore: 92,
    relatedProjects: ['Direct-to-Consumer Financial Projections', 'SaaS CAC Payback Roadmap'],
    icon: 'DollarSign',
    tools: ['Financial Model Spreadsheets', 'Cohort Analysis']
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'srv-meta-ads',
    title: 'Meta Ads Management',
    shortDesc: 'Performance-focused Facebook & Instagram advertising engineered for maximum ROAS and lower CPA.',
    fullDesc: 'We build high-converting full-funnel Meta advertising engines. From Advantage+ shopping campaigns to custom dynamic creative testing matrices, our scientific approach scales profitable customer acquisition while safeguarding ad account health.',
    icon: 'Layers',
    category: 'Paid Media',
    color: 'blue',
    deliverables: [
      'Comprehensive Ad Account & Pixel Audit',
      'Broad & Advantage+ Campaign Structure',
      'Dynamic Creative Testing (DCT) Setup',
      'High-Intent Retargeting & Exclusion Funnels',
      'Weekly Creative Angle Iterations & Copy',
      'Real-Time Live Dashboard & Weekly Reports'
    ],
    idealClient: 'E-commerce brands and D2C stores spending $3k–$50k/month wanting predictable, scalable ROAS.',
    typicalOutcome: '+120% to +250% increase in monthly attributed ad revenue with 30%+ lower CPA.',
    tools: ['Meta Ads Manager', 'Conversion API (CAPI)', 'Looker Studio', 'Figma']
  },
  {
    id: 'srv-google-ppc',
    title: 'Google PPC & Search Ads',
    shortDesc: 'Search, Shopping, Performance Max, and remarketing campaigns capturing ready-to-buy intent.',
    fullDesc: 'Capture in-market buyers at the exact moment they search for your solution. We engineer precision-targeted Google Search, Google Shopping, and Performance Max campaigns with strict negative keyword scrubbing and high Quality Score architectures.',
    icon: 'Search',
    category: 'Paid Media',
    color: 'emerald',
    deliverables: [
      'High-Commercial-Intent Keyword Mapping',
      'Performance Max (PMax) Asset Group Optimization',
      'Google Merchant Center Feed Optimization',
      'Negative Keyword Sculpting & Pruning',
      'Conversion Tracking & Value-Based Bidding',
      'Competitor Conspicuity & Ad Copy Testing'
    ],
    idealClient: 'E-commerce retailers, local service businesses, and B2B SaaS companies seeking high-intent conversions.',
    typicalOutcome: '35% reduction in cost per conversion and 2.4x higher lead quality within 45 days.',
    tools: ['Google Ads', 'Google Merchant Center', 'GTM', 'Keyword Planner']
  },
  {
    id: 'srv-technical-seo',
    title: 'Technical & Strategic SEO',
    shortDesc: 'Deep technical audits, semantic architecture, and search visibility improvements to dominate organic rankings.',
    fullDesc: 'Transform your website into an organic traffic powerhouse. We resolve complex crawling and indexing roadblocks, optimize Core Web Vitals, implement structured schema data, and build semantic topic clusters that rank for high-value transactional queries.',
    icon: 'Terminal',
    category: 'Search Engine Optimization',
    color: 'blue',
    deliverables: [
      '120-Point Technical Architecture Audit',
      'Core Web Vitals & Page Speed Optimization',
      'Schema Markup & Structured Data Injection',
      'Semantic Topic Clusters & Content Briefs',
      'Internal Link Graph Topology Redesign',
      'Google Search Console Clean-Up & Indexation'
    ],
    idealClient: 'Brands with existing websites suffering from traffic plateaus, migration drops, or poor technical health.',
    typicalOutcome: '+80% to +200% growth in qualified organic search traffic in 3 to 6 months.',
    tools: ['Screaming Frog', 'Ahrefs', 'Semrush', 'Google Search Console']
  },
  {
    id: 'srv-ai-automation',
    title: 'AI Marketing Automation',
    shortDesc: 'Automating repetitive marketing and business workflows with autonomous intelligence and APIs.',
    fullDesc: 'Eliminate manual data entry, slow reporting, and delayed lead responses. We build bespoke AI-powered automations that instantly route leads, auto-generate localized marketing assets, monitor ad anomalies, and sync multi-channel data automatically.',
    icon: 'Cpu',
    category: 'AI & Systems',
    color: 'emerald',
    deliverables: [
      'Zero-Touch Lead Enrichment & Routing',
      'Automated Ad Anomaly & CPA Slack/Telegram Alerts',
      'AI-Powered Review & Feedback Response System',
      'Automated Multi-Channel Reporting Pipelines',
      'CRM & Pixel Synchronization Workflows',
      'Custom LLM-Powered Customer Agent Workflows'
    ],
    idealClient: 'Agencies and fast-growing businesses losing 15+ hours weekly on manual operational tasks.',
    typicalOutcome: 'Save 20+ hours per week while eliminating human delay in lead follow-ups and reporting.',
    tools: ['Make.com', 'Zapier', 'OpenAI API', 'Webhooks', 'Telegram API']
  },
  {
    id: 'srv-python-automation',
    title: 'Custom Python Automation',
    shortDesc: 'Tailored Python scripts for marketing data processing, automated API pulling, and custom scrapers.',
    fullDesc: 'When off-the-shelf tools fall short, we write clean, robust Python scripts to scrape market intelligence, programmatically adjust ad bids via official APIs, clean customer databases, and build custom predictive analytics models.',
    icon: 'Code2',
    category: 'AI & Systems',
    color: 'blue',
    deliverables: [
      'Meta Graph API & Google Ads API Custom Scripts',
      'Automated Competitor Ad & Price Scrapers',
      'Customer Cohort & LTV Retention Scripts',
      'Automated CSV & Database Normalizers',
      'Cron-Scheduled Cloud Serverless Executions',
      'Full Source Code & Deployment Documentation'
    ],
    idealClient: 'Data-driven founders and marketing heads requiring bespoke integrations and algorithmic bidding rules.',
    typicalOutcome: 'Complete data sovereignty and automated programmatic execution with zero third-party software subscriptions.',
    tools: ['Python 3', 'Pandas', 'Meta Graph API', 'Google Ads API', 'Cloud Functions']
  },
  {
    id: 'srv-generative-ai',
    title: 'Generative AI Creative Systems',
    shortDesc: 'AI-powered copy matrices, dynamic ad hooks, and intelligent marketing workflow systems.',
    fullDesc: 'Accelerate your creative velocity 10x without sacrificing brand authenticity. We engineer custom Prompt Engineering architectures and fine-tuned AI workflows that generate hundreds of psychology-backed ad hooks, angles, and content variants on demand.',
    icon: 'Sparkles',
    category: 'AI & Systems',
    color: 'emerald',
    deliverables: [
      'Custom Brand-Voice Fine-Tuned Prompt Library',
      '50-Variant Ad Hook & Copy Angle Matrix',
      'Automated AI Landing Page Copy Generation',
      'Multi-Language Translation & Localization Workflows',
      'Visual Moodboard & Creative Brief Prompts',
      'Team AI Upskilling & Playbook Documentation'
    ],
    idealClient: 'Brands hitting creative fatigue on Meta/TikTok needing high-velocity winning ad variations.',
    typicalOutcome: '3x higher creative output with 60% faster turnaround time from concept to live ad.',
    tools: ['Claude 3.5 Sonnet', 'GPT-4o', 'Midjourney Prompting', 'Notion AI Systems']
  }
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-1',
    slug: 'ecom-wellness-roas-scale',
    title: 'Scaling D2C Wellness Brand to $145K/Month with 4.3x ROAS',
    client: 'PureVitality Organics',
    industry: 'E-commerce & Health/Wellness',
    duration: '5 Months Sprint',
    channel: 'Meta Ads + Google PMax + Python Rule Automation',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e557b6f3?q=80&w=1200&auto=format&fit=crop',
    summary: 'A direct-to-consumer nutritional brand was stuck at $24k/mo with a rising CPA ($38.50) and erratic ROAS. By overhauling their campaign structure, implementing server-side CAPI, and deploying automated Python bid rules, we scaled them to $145,000/month at a 4.3x blended ROAS.',
    challenge: 'The brand suffered from severe audience saturation on Meta, inaccurate conversion tracking post-iOS14, and high cart abandonment. The founder was manually tweaking ad sets daily, causing budget volatility and poor algorithmic learning.',
    objectives: [
      'Rebuild ad account architecture to allow algorithmic machine learning.',
      'Restore 100% data fidelity via Meta Server-Side Conversion API (CAPI).',
      'Reduce customer acquisition cost (CPA) below $25.',
      'Scale monthly revenue beyond $100k while maintaining at least 3.5x ROAS.'
    ],
    strategy: [
      'Consolidated 18 fragmented ad sets into 2 streamlined Advantage+ Shopping Campaigns (ASC) and 1 broad dynamic creative testing (DCT) sandbox.',
      'Engineered a 4-tier creative matrix testing problem-aware, objection-handling, and lifestyle video hooks.',
      'Deployed Google Performance Max to capture high-intent search traffic sparked by Meta social awareness.',
      'Set up Python automated rules to detect CPA spikes and scale winning ad sets by 15% every 48 hours without shocking the algorithm.'
    ],
    execution: [
      {
        title: 'Full Server-Side Tracking Deployment',
        description: 'Configured GTM server containers via Cloud Run with deduplicated Meta Pixel & CAPI events, boosting event match quality score to 9.2/10.'
      },
      {
        title: 'Dynamic Creative Testing (DCT) Engine',
        description: 'Ran continuous 3:2:2 dynamic creative tests (3 creatives, 2 copy angles, 2 headlines) to systematically identify winning combinations.'
      },
      {
        title: 'Automated Python Budget Rebalancing',
        description: 'Installed automated cron scripts that shifted daily budget towards top ROAS ad creatives and automatically paused fatigue outliers.'
      },
      {
        title: 'Checkout Friction Optimization',
        description: 'Streamlined Shopify checkout flow with one-click upsells and social proof badges, increasing store conversion rate from 1.8% to 3.2%.'
      }
    ],
    analytics: [
      { kpi: 'Blended ROAS', before: '2.1x', after: '4.3x', growth: '+104.7%' },
      { kpi: 'Cost Per Acquisition (CPA)', before: '$38.50', after: '$22.80', growth: '-40.7%' },
      { kpi: 'Monthly Revenue', before: '$24,200', after: '$145,600', growth: '+501.6%' },
      { kpi: 'Store Conversion Rate', before: '1.8%', after: '3.2%', growth: '+77.7%' }
    ],
    mainKPI: '+$121,400 Monthly Net Growth at 4.3x ROAS',
    resultSummary: 'Over 5 months, we unlocked exponential profitable growth, taking the brand from an unstable $24k/mo to a highly predictable $145k/mo business with healthy profit margins.',
    keyLessons: [
      'Simpler account structures outperform hyper-segmented targeting on Meta every time.',
      'Accurate server-side event tracking provides the ad algorithm with 30%+ more conversion signal.',
      'Automated rule safety nets allow aggressive budget scaling without human error.'
    ],
    tools: ['Meta Ads Manager', 'Google Ads PMax', 'Python 3', 'Shopify CAPI', 'Looker Studio', 'GTM Server Container']
  },
  {
    id: 'cs-2',
    slug: 'saas-technical-seo-organic-boost',
    title: 'Tripling Organic MQLs & Dominating Commercial Keywords for B2B SaaS',
    client: 'CloudMetrics Analytics',
    industry: 'B2B SaaS / Enterprise Software',
    duration: '6 Months Sprint',
    channel: 'Technical SEO + Semantic Content Architecture + Google Search',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    summary: 'A cloud analytics platform struggled with stagnant organic traffic and high reliance on expensive Google search clicks ($28 CPC). We conducted a technical SEO overhaul, fixed crawl traps, and built 6 semantic topic clusters that tripled qualified organic leads.',
    challenge: 'The platform had over 4,000 dynamically generated pages that caused index bloat and diluted crawl budget. The site had poor Core Web Vitals (LCP > 4.2s) and lacked structured schema data.',
    objectives: [
      'Eliminate index bloat and optimize crawl budget distribution.',
      'Pass all Google Core Web Vitals assessments across desktop and mobile.',
      'Rank in Top 3 for 25+ high-intent commercial software queries.',
      'Triple organic Marketing Qualified Leads (MQLs) to reduce paid dependency.'
    ],
    strategy: [
      'Pruned 2,800 low-value indexable URLs via canonical tags and noindex directives.',
      'Overhauled JavaScript rendering and server caching to bring LCP from 4.2s down to 1.4s.',
      'Built a hub-and-spoke topic cluster model centered around "cloud cost observability".',
      'Deployed JSON-LD SoftwareApplication, FAQ, and HowTo schema across key product pillars.'
    ],
    execution: [
      {
        title: 'Deep Technical Architecture Surgery',
        description: 'Identified and fixed 48 broken redirect loops, canonical anomalies, and duplicate title tag structures using Screaming Frog and Search Console.'
      },
      {
        title: 'Core Web Vitals Engineering',
        description: 'Optimized hero asset delivery, implemented modern image formats, and deferred non-critical JavaScript to achieve 98/100 Mobile PageSpeed score.'
      },
      {
        title: 'Semantic Topic Cluster Deployment',
        description: 'Produced 18 high-authority in-depth technical guides with interactive calculators that earned 45 natural high-DR backlinks.'
      },
      {
        title: 'Lead Conversion Architecture',
        description: 'Embedded contextual free-trial interactive widgets and gated benchmark reports inside high-ranking articles.'
      }
    ],
    analytics: [
      { kpi: 'Monthly Organic Traffic', before: '8,400 visits', after: '32,600 visits', growth: '+288.1%' },
      { kpi: 'Commercial Keywords in Top 3', before: '4 keywords', after: '38 keywords', growth: '+850%' },
      { kpi: 'Organic Monthly MQLs', before: '32 leads', after: '118 leads', growth: '+268.7%' },
      { kpi: 'Mobile PageSpeed Score', before: '44 / 100', after: '98 / 100', growth: '+122.7%' }
    ],
    mainKPI: '+288% Organic Traffic & 118 Qualified Demo Requests / Month',
    resultSummary: 'The company reduced their paid search customer acquisition dependency by 45% while establishing undisputed category leadership across their primary software categories.',
    keyLessons: [
      'Pruning thin, bloated pages often yields more immediate SEO gains than creating new content.',
      'Fast-loading technical pages directly improve both rankings and on-page form conversions.',
      'Interactive tools and calculators generate exponential organic backlink velocity.'
    ],
    tools: ['Screaming Frog', 'Ahrefs', 'Google Search Console', 'Sitebulb', 'WordPress', 'Google Analytics 4']
  },
  {
    id: 'cs-3',
    slug: 'local-services-google-ppc-cpa-reduction',
    title: 'Slashing Lead Cost by 48% for Multi-Location Service Provider',
    client: 'Premier Home Services Group',
    industry: 'Home Services / Multi-Location',
    duration: '3 Months Sprint',
    channel: 'Google Search Ads + Local Call-Only Campaigns + CRO',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1200&auto=format&fit=crop',
    summary: 'A regional home services contractor was burning $15k/month on Google Ads with irrelevant clicks and wasted geographic spend ($84 CPA). We restructured their campaigns into tight radius geofences, sculpted negative keywords, and reduced lead cost to $43.50.',
    challenge: 'Broad match keywords were triggering expensive clicks from locations outside the service territory. Landing pages took 6 seconds to load on mobile and had cumbersome multi-step contact forms.',
    objectives: [
      'Eliminate wasted ad spend outside operational radius.',
      'Lower cost per inbound booked phone call below $50.',
      'Implement mobile-first click-to-call landing pages.',
      'Increase booking conversion rate to over 15%.'
    ],
    strategy: [
      'Separated campaigns by postal code clusters with radius bid adjustments based on profitability.',
      'Installed over 600 strict negative keywords targeting "jobs", "cheap", "DIY", and "salary" queries.',
      'Designed high-speed mobile landing pages featuring sticky "Tap to Call" buttons and instant SMS quote widgets.',
      'Configured Google Call Forwarding and Dynamic Number Insertion (DNI) to track revenue per phone call.'
    ],
    execution: [
      {
        title: 'Geographic Radius Segmentation',
        description: 'Replaced state-wide campaigns with hyper-local 15-mile service radius groups with custom zip code exclusions.'
      },
      {
        title: 'Mobile Click-to-Call Engine',
        description: 'Created instant-loading mobile landing pages (<1.1s load time) dedicated exclusively to emergency repair calls.'
      },
      {
        title: 'Call Tracking & Quality Routing',
        description: 'Integrated CallRail with Google Ads to automatically pass qualified phone call value back to the Smart Bidding algorithm.'
      },
      {
        title: 'Automated After-Hours Lead Capture',
        description: 'Built a Python script that toggled ad schedules and routed weekend inquiries to an on-call AI SMS booking assistant.'
      }
    ],
    analytics: [
      { kpi: 'Cost Per Lead (CPA)', before: '$84.20', after: '$43.50', growth: '-48.3%' },
      { kpi: 'Monthly Inbound Leads', before: '178 calls', after: '344 calls', growth: '+93.2%' },
      { kpi: 'Landing Page Conversion Rate', before: '7.2%', after: '16.4%', growth: '+127.7%' },
      { kpi: 'Wasted Search Spend', before: '$4,100 / mo', after: '$280 / mo', growth: '-93.1%' }
    ],
    mainKPI: '-48% CPA with 344 Verified Inbound Service Calls / Month',
    resultSummary: 'The client doubled their active technician crew capacity within 90 days while spending less total ad budget on unproductive clicks.',
    keyLessons: [
      'For service businesses, mobile speed and click-to-call friction are the #1 drivers of conversion.',
      'Negative keyword sculpting is the fastest way to save 20-30% of a Google Ads budget instantly.',
      'Smart bidding only works when fed real qualified offline conversion data.'
    ],
    tools: ['Google Ads', 'CallRail', 'Google Tag Manager', 'Unbounce', 'Python', 'Looker Studio']
  },
  {
    id: 'cs-4',
    slug: 'ai-creative-matrix-apparel-scale',
    title: 'Deploying AI Creative Testing Matrix for Luxury Apparel E-com',
    client: 'AURA Atelier Fashion',
    industry: 'Luxury Fashion & Apparel',
    duration: '4 Months Sprint',
    channel: 'Meta Ads + Generative AI + Python Matrix Pipeline',
    heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    summary: 'Luxury fashion store faced severe ad fatigue on Meta with declining click-through rates. We implemented a custom Generative AI prompt matrix that generated 60 localized ad copy variations weekly, scaling ROAS from 1.9x to 3.9x.',
    challenge: 'Creative production was too slow; creating 4 ad variants took 2 weeks. The brand was burning cash on fatigue-ridden creatives that lost performance after 72 hours.',
    objectives: [
      'Accelerate creative testing velocity from 2 ads/week to 20+ ads/week.',
      'Generate multi-angle consumer psychological hooks without diluting luxury branding.',
      'Boost click-through rate (CTR) above 2.5%.',
      'Scale overall ad spend from $10k to $45k/month profitably.'
    ],
    strategy: [
      'Engineered custom Claude & GPT prompt frameworks trained on high-converting direct response luxury copywriting.',
      'Automated the assembly of dynamic video captions and hook overlays with Python.',
      'Constructed a 3-stage sandbox testing framework to filter winning angles before promoting to high-budget campaigns.',
      'Integrated real-time CTR and ROAS tracking in Looker Studio.'
    ],
    execution: [
      {
        title: 'Brand-Voice AI Prompt Architecture',
        description: 'Developed a system prompt library maintaining the refined, elegant tone of the luxury house while injecting proven persuasion hooks.'
      },
      {
        title: 'Automated Copy-Variant Assembly',
        description: 'Generated 240 distinct headline/body combinations testing emotional vanity, craftsmanship, social proof, and exclusivity angles.'
      },
      {
        title: 'Advantage+ Creative Optimization',
        description: 'Leveraged dynamic ad formats combining AI-written headlines with high-resolution editorial product photography.'
      },
      {
        title: 'Rapid Winner Graduation System',
        description: 'Built automated rules that promoted ads with CTR > 2.5% and ROAS > 3.5x directly into the scaling campaign.'
      }
    ],
    analytics: [
      { kpi: 'Average ROAS', before: '1.9x', after: '3.9x', growth: '+105.2%' },
      { kpi: 'Ad Click-Through Rate (CTR)', before: '1.1%', after: '2.85%', growth: '+159.0%' },
      { kpi: 'Weekly Creative Output', before: '2 variants', after: '25 variants', growth: '+1,150%' },
      { kpi: 'Monthly Store Revenue', before: '$31,000', after: '$118,500', growth: '+282.2%' }
    ],
    mainKPI: '3.9x ROAS with 10x Faster Creative Testing Velocity',
    resultSummary: 'Transformed the client into an agile, AI-empowered advertising machine capable of launching winning creative angles in minutes rather than weeks.',
    keyLessons: [
      'Generative AI is a massive leverage amplifier when combined with rigorous creative testing frameworks.',
      'High creative velocity directly prevents ad fatigue and stabilizes algorithmic ad costs.',
      'Luxury tone and direct-response performance can coexist when prompts are properly structured.'
    ],
    tools: ['OpenAI API', 'Claude 3.5 Sonnet', 'Meta Ads Manager', 'Python', 'Figma', 'Looker Studio']
  }
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Google Ads Search & Measurement Certified',
    issuer: 'Google Digital Academy (Skillshop)',
    date: 'Issued Jan 2024 · Valid thru 2026',
    credentialId: 'GA-SEARCH-892410-SY',
    category: 'Advertising',
    skillsCovered: ['Google Search Ads', 'Smart Bidding', 'Conversion Tracking', 'Keyword Planning', 'Quality Score Optimization'],
    verificationUrl: 'https://skillshop.credential.net/verification/placeholder',
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=800&auto=format&fit=crop',
    badgeColor: 'emerald'
  },
  {
    id: 'cert-2',
    title: 'Meta Certified Media Buying Professional',
    issuer: 'Meta Blueprint',
    date: 'Issued Mar 2024 · Valid thru 2026',
    credentialId: 'META-MBP-984214-SY',
    category: 'Marketing',
    skillsCovered: ['Advantage+ Campaigns', 'CBO Strategy', 'Meta Pixel & CAPI', 'Audience Insights', 'Auction Dynamics'],
    verificationUrl: 'https://www.credly.com/org/meta/placeholder',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    badgeColor: 'blue'
  },
  {
    id: 'cert-3',
    title: 'Advanced Google Analytics 4 (GA4) Certification',
    issuer: 'Google Analytics Academy',
    date: 'Issued Nov 2023 · Valid thru 2025',
    credentialId: 'GA4-ADV-771903-SY',
    category: 'Analytics',
    skillsCovered: ['Server-Side GTM', 'Custom Exploration Reports', 'Event Attribution Modeling', 'BigQuery Export', 'Funnel Analysis'],
    verificationUrl: 'https://analytics.google.com/analytics/academy/placeholder',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    badgeColor: 'emerald'
  },
  {
    id: 'cert-4',
    title: 'Technical SEO Specialist & Auditing Masterclass',
    issuer: 'HubSpot Academy / Semrush',
    date: 'Issued Aug 2023 · Lifetime',
    credentialId: 'HS-TECHSEO-550198-SY',
    category: 'SEO',
    skillsCovered: ['Core Web Vitals', 'Schema Markup', 'Log File Analysis', 'Crawl Budget', 'JavaScript SEO'],
    verificationUrl: 'https://academy.hubspot.com/certificates/placeholder',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    badgeColor: 'blue'
  },
  {
    id: 'cert-5',
    title: 'Generative AI & Prompt Engineering for Performance',
    issuer: 'DeepLearning.AI / Vanderbilt University',
    date: 'Issued Feb 2024 · Lifetime',
    credentialId: 'DLAI-PROMPT-104928-SY',
    category: 'AI',
    skillsCovered: ['System Prompts', 'Few-Shot Conditioning', 'LLM Agent Workflows', 'Creative Matrix Gen', 'API Automation'],
    verificationUrl: 'https://www.deeplearning.ai/placeholder',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    badgeColor: 'emerald'
  },
  {
    id: 'cert-6',
    title: 'Python for Data Automation & Marketing APIs',
    issuer: 'DataCamp / Python Institute',
    date: 'Issued May 2024 · Lifetime',
    credentialId: 'PY-MKTG-339102-SY',
    category: 'AI',
    skillsCovered: ['Pandas DataFrames', 'Meta Graph API', 'Web Scraping (BeautifulSoup)', 'Automation Cron Jobs', 'API Rate Limiting'],
    verificationUrl: 'https://www.datacamp.com/certificate/placeholder',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    badgeColor: 'blue'
  }
];

export const PROJECTS_GALLERY: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Autonomous Meta Ad Budget Optimizer Bot',
    category: 'AI Automation',
    shortDescription: 'Custom Python cloud application that checks ad set ROAS hourly via Graph API and auto-scales budgets while suppressing fatigue.',
    fullDescription: 'Developed an end-to-end Python automation suite that connects to Meta Marketing API, calculates 24-hour moving ROAS and CPA, and applies programmatic bid adjustments. Includes an interactive Telegram alert bot that sends daily performance snapshots.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tools: ['Python 3', 'Meta Graph API', 'Telegram Bot API', 'Docker', 'Google Cloud Run'],
    result: 'Prevented over $18,000 in wasted ad spend across 8 managed client accounts in 90 days.',
    metrics: [
      { label: 'Time Saved', value: '14 hrs / wk' },
      { label: 'Budget Managed', value: '$120k / mo' },
      { label: 'Uptime', value: '99.9%' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Omni-Channel E-commerce Ad Command Cockpit',
    category: 'Analytics Dashboards',
    shortDescription: 'Real-time executive Looker Studio dashboard unifying Meta Ads, Google Ads, TikTok Ads, and Shopify net revenue.',
    fullDescription: 'Built a real-time data cockpit for founders and media buyers. Merges spend across multiple advertising channels with real-time Shopify net sales, Blended ROAS (MER), New Customer Acquisition Cost (nCAC), and 30-day LTV cohorts.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tools: ['Looker Studio', 'Supermetrics', 'Shopify API', 'Google Sheets Data Pipes', 'GA4'],
    result: 'Provided executive leadership with 100% transparent live attribution without manual spreadsheet reporting.',
    metrics: [
      { label: 'Live Data Refresh', value: '15 Mins' },
      { label: 'Connected Channels', value: '6 Platforms' },
      { label: 'Reporting Speed', value: 'Instant' }
    ]
  },
  {
    id: 'proj-3',
    title: 'AI Multi-Angle Creative Copy Matrix Generator',
    category: 'AI Automation',
    shortDescription: 'Generative AI system that takes product URLs and outputs 50 psychological ad hooks and long-form copy sets in seconds.',
    fullDescription: 'Designed a structured prompt chaining system that scrapes a target product page, extracts key customer objections and reviews, and synthesizes 50 distinct ad creative angles categorized by intent (Pain-Point, Social Proof, Curiosity Hook, Urgency).',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
    tools: ['Claude 3.5 Sonnet', 'OpenAI API', 'Python', 'Streamlit UI', 'BeautifulSoup'],
    result: 'Accelerated creative test volume by 400% for an apparel client, resulting in a 2.8x higher win rate on new creatives.',
    metrics: [
      { label: 'Generation Time', value: '< 45 Sec' },
      { label: 'Angles Tested', value: '250+ Hook Sets' },
      { label: 'CTR Uplift', value: '+64%' }
    ]
  },
  {
    id: 'proj-4',
    title: 'Enterprise Core Web Vitals & Technical SEO Sprint',
    category: 'SEO Projects',
    shortDescription: 'Complete performance and indexation overhaul for an e-commerce catalog of 15,000+ SKU pages.',
    fullDescription: 'Conducted a deep technical SEO reconstruction for a multi-category store. Cleaned dynamic URL parameters, created clean XML sitemap hierarchies, implemented WebP image pipelines, and deployed comprehensive Product Schema markup.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    tools: ['Screaming Frog', 'Google Search Console', 'Ahrefs', 'Cloudflare Workers', 'JSON-LD'],
    result: 'Achieved 100% Good URLs status in Google Search Console and boosted organic category ranking by 140%.',
    metrics: [
      { label: 'Indexed Pages', value: '15k+ Cleaned' },
      { label: 'Page Speed', value: '96 Mobile' },
      { label: 'Organic Traffic', value: '+140% YoY' }
    ]
  },
  {
    id: 'proj-5',
    title: 'High-Ticket B2B Acquisition Search Campaign',
    category: 'Marketing Campaigns',
    shortDescription: 'Google Search PPC campaign targeting enterprise procurement heads and IT directors with high contract value.',
    fullDescription: 'Designed an exact-match search strategy focused exclusively on bottom-funnel commercial keywords. Created custom dedicated landing pages with personalized dynamic keyword insertion (DKI) and gated enterprise ROI calculators.',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop',
    tools: ['Google Ads Search', 'GTM', 'HubSpot CRM', 'Unbounce Landing Pages'],
    result: 'Closed 14 enterprise software contracts valued at $380,000+ pipeline value within 4 months.',
    metrics: [
      { label: 'Pipeline Generated', value: '$380k+' },
      { label: 'Conversion Rate', value: '6.8%' },
      { label: 'Average Deal Size', value: '$27.5k' }
    ]
  },
  {
    id: 'proj-6',
    title: 'High-Velocity Direct Response Creative Sprint',
    category: 'Creative Projects',
    shortDescription: 'Psychology-driven ad creative suite with dynamic motion graphics, hooks, and static benefit callouts.',
    fullDescription: 'Conducted a comprehensive creative refresh for a D2C beauty brand. Developed 40 static benefit callouts, UGC mashups, and animated infographic creatives tailored for TikTok and Instagram Reels placements.',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    tools: ['Figma', 'Adobe After Effects', 'CapCut Pro', 'Meta Creative Hub'],
    result: 'Increased thumb-stop rate (3-second video views) from 18% to 42% across Instagram Reels ad sets.',
    metrics: [
      { label: 'Thumb-Stop Rate', value: '42%' },
      { label: 'Click Rate', value: '3.4%' },
      { label: 'Winning Ads', value: '9 Scaled Assets' }
    ]
  }
];

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    company: 'PureVitality Health Group',
    position: 'Founder & Chief Executive Officer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    testimonial: 'Sayed is hands-down the most analytical and results-oriented growth specialist we have worked with. He transformed our Meta ad account from an erratic money pit into our #1 profit driver. Scaling to $145k/month with a 4.3x ROAS gave us the confidence to expand our product line. His Python automated alerts also caught anomalies before we wasted a single dollar.',
    rating: 5,
    projectType: 'E-commerce Meta & Google Scaling',
    resultHighlight: '+501% revenue scale with 4.3x ROAS'
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    company: 'CloudMetrics SaaS',
    position: 'VP of Growth & Marketing',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    testimonial: 'Before working with Sayed, our organic search traffic was stuck for over a year. He identified deep technical indexing flaws that other agencies completely overlooked. Within 4 months of implementing his topic clusters and Core Web Vitals optimizations, our organic demo requests tripled. True technical mastery combined with commercial acumen.',
    rating: 5,
    projectType: 'B2B SaaS Technical SEO Overhaul',
    resultHighlight: '+288% organic traffic & 3x demo bookings'
  },
  {
    id: 'test-3',
    name: 'David Reynolds',
    company: 'Premier Home Solutions',
    position: 'Managing Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    testimonial: 'Sayed cut our cost per lead almost in half on Google Ads in 60 days. His geofencing strategy and negative keyword scrubbing stopped all the junk clicks that were burning our budget. We now get 340+ qualified service calls every month and our technicians are booked out weeks in advance.',
    rating: 5,
    projectType: 'Google PPC & Lead Generation',
    resultHighlight: '-48% CPA reduction & 344 monthly calls'
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    company: 'AURA Atelier Fashion',
    position: 'Creative Director & Co-Founder',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    testimonial: 'The AI creative matrix system Sayed built for us solved our biggest bottleneck: ad creative fatigue. We went from struggling to produce 2 ad variants a week to launching 25+ fresh, high-converting angles weekly without compromising our luxury brand identity. ROAS jumped from 1.9x to 3.9x within 90 days.',
    rating: 5,
    projectType: 'AI Generative Marketing System',
    resultHighlight: '3.9x ROAS with 10x creative test velocity'
  },
  {
    id: 'test-5',
    name: 'Tariq Al-Mansoor',
    company: 'Kinetix D2C Goods',
    position: 'Operations & Acquisition Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    testimonial: 'Sayed is a rare hybrid who understands both high-level marketing psychology and hard technical execution. His server-side tracking setup fixed our post-iOS14 attribution overnight, and his automated Looker Studio dashboards saved our team 15+ hours of manual reporting every single week. Highly recommended!',
    rating: 5,
    projectType: 'Tracking Architecture & GA4 Automation',
    resultHighlight: '100% data fidelity & 15 hrs saved/wk'
  }
];
