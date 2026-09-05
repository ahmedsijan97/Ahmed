export type NavPage = 
  | 'home' 
  | 'about' 
  | 'experience' 
  | 'skills' 
  | 'services' 
  | 'case-studies' 
  | 'certifications' 
  | 'projects' 
  | 'testimonials' 
  | 'contact';

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext?: string;
}

export interface TrustStat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  phase: string;
  period: string;
  role: string;
  company: string;
  location: string;
  summary: string;
  details: string[];
  keyWins: string[];
  tools: string[];
  icon: string;
}

export interface HowIWorkStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
  highlight: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  type: string;
  responsibilities: string[];
  achievements: string[];
  quantifiableResults: {
    metric: string;
    impact: string;
  }[];
  tools: string[];
  featuredProject: string;
}

export type SkillCategory = 'All' | 'Paid Advertising' | 'SEO' | 'AI & Automation' | 'Analytics' | 'Strategy';

export interface SkillItem {
  id: string;
  name: string;
  category: 'Paid Advertising' | 'SEO' | 'AI & Automation' | 'Analytics' | 'Strategy';
  level: 'Advanced' | 'Professional' | 'Working Knowledge';
  description: string;
  proficiencyScore: number; // For subtle circular/radial gauge (e.g. 95)
  relatedProjects: string[];
  icon: string;
  tools: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  category: string;
  deliverables: string[];
  idealClient: string;
  typicalOutcome: string;
  tools: string[];
  color: string;
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  duration: string;
  channel: string;
  heroImage: string;
  summary: string;
  challenge: string;
  objectives: string[];
  strategy: string[];
  execution: {
    title: string;
    description: string;
  }[];
  analytics: {
    kpi: string;
    before: string;
    after: string;
    growth: string;
  }[];
  mainKPI: string;
  resultSummary: string;
  keyLessons: string[];
  tools: string[];
}

export type CertCategory = 'All' | 'Marketing' | 'SEO' | 'AI' | 'Analytics' | 'Advertising';

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  category: 'Marketing' | 'SEO' | 'AI' | 'Analytics' | 'Advertising';
  skillsCovered: string[];
  verificationUrl: string;
  image: string;
  badgeColor: string;
}

export type ProjectCategory = 'All' | 'Marketing Campaigns' | 'SEO Projects' | 'AI Automation' | 'Websites' | 'Analytics Dashboards' | 'Creative Projects';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Marketing Campaigns' | 'SEO Projects' | 'AI Automation' | 'Websites' | 'Analytics Dashboards' | 'Creative Projects';
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  tools: string[];
  result: string;
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  position: string;
  avatar: string;
  testimonial: string;
  rating: number;
  projectType: string;
  resultHighlight: string;
}
