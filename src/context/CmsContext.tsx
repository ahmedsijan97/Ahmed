import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PERSONAL_INFO,
  HERO_FLOATING_METRICS,
  TRUST_STATS,
  EXPERIENCE_ITEMS,
  SKILLS_LIST,
  CERTIFICATIONS_LIST,
  PROJECTS_GALLERY,
  SERVICES_LIST,
  TESTIMONIALS_LIST,
  HOW_I_WORK_STEPS
} from '../data/portfolioData';
import {
  CaseStudyItem,
  CertificationItem,
  ExperienceItem,
  ProjectItem,
  ServiceItem,
  SkillItem,
  TestimonialItem,
  TrustStat
} from '../types/portfolio';

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
  logoUrl?: string;
  displayOrder: number;
}

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  date: string;
  organization: string;
  image?: string;
  certificateUrl?: string;
  credentialUrl?: string;
  displayOrder: number;
}

export interface SocialLinkData {
  id: string;
  platform: string;
  url: string;
  icon: string;
  displayOrder: number;
  enabled: boolean;
}

export interface NavItemData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  displayOrder: number;
  visible: boolean;
}

export interface SiteSettingsData {
  websiteName: string;
  logoUrl?: string;
  faviconUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  maintenanceMode: boolean;
  maintenanceMessage: string;
  animationsEnabled: boolean;
  allowChat: boolean;
  defaultTheme: string;
}

export interface ContactData {
  email: string;
  phone: string;
  whatsappUrl: string;
  location: string;
  officeAddress: string;
  googleMapsUrl: string;
  formEnabled: boolean;
  notificationEmail: string;
  successMessage: string;
}

export interface SeoData {
  websiteTitle: string;
  metaDescription: string;
  keywords: string[];
  author: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  robotsTxt: string;
  sitemapXml: string;
  structuredDataJson: string;
  pageSeo: Record<string, { title: string; description: string }>;
}

export interface PublicPortfolioData {
  personalInfo: typeof PERSONAL_INFO & { nationality?: string; address?: string; cvUrl?: string };
  hero: {
    greeting: string;
    name: string;
    professionalTitle: string;
    mainHeadline: string;
    headlineHighlight: string;
    shortDescription: string;
    profileImage: string;
    primaryButtonText: string;
    primaryButtonUrl: string;
    secondaryButtonText: string;
    secondaryButtonUrl: string;
    availabilityStatus: string;
    availabilityText: string;
    floatingMetrics: Array<{ label: string; value: string; change: string; isPositive: boolean; tag: string }>;
    trustStats: TrustStat[];
  };
  about: {
    sectionTitle: string;
    shortIntro: string;
    detailedBio: string;
    mission: string;
    vision: string;
    careerSummary: string;
    profileImage: string;
    signatureText?: string;
    experienceHighlights: string[];
  };
  education: EducationData[];
  experience: ExperienceItem[];
  skills: SkillItem[];
  certificates: CertificationItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  achievements: AchievementData[];
  testimonials: TestimonialItem[];
  socialLinks: SocialLinkData[];
  contact: ContactData;
  navigation: NavItemData[];
  seo: SeoData;
  siteSettings: SiteSettingsData;
}

interface CmsContextValue {
  data: PublicPortfolioData;
  loading: boolean;
  isMaintenanceMode: boolean;
  maintenanceMessage: string;
  refreshData: () => Promise<void>;
}

// Default fallback data matching seeded portfolio
const DEFAULT_PUBLIC_DATA: PublicPortfolioData = {
  personalInfo: {
    ...PERSONAL_INFO,
    nationality: 'Bangladeshi',
    address: 'Gaibandha & Dhaka, Bangladesh',
    cvUrl: '/assets/Sayed_Ahmed_Sijan_CV.pdf'
  },
  hero: {
    greeting: "HELLO, I'M SAYED AHMED SIJAN",
    name: PERSONAL_INFO.name,
    professionalTitle: PERSONAL_INFO.title,
    mainHeadline: 'I Turn Marketing Data Into Measurable Growth',
    headlineHighlight: 'Measurable Growth',
    shortDescription: 'Helping e-commerce and local brands scale with data-driven Ads, SEO, and AI automation. Managed over $4.2M+ ad spend with 3.8x average blended ROAS.',
    profileImage: '/assets/profile.jpg',
    primaryButtonText: 'Explore Case Studies',
    primaryButtonUrl: '#case-studies',
    secondaryButtonText: 'Book Strategy Call',
    secondaryButtonUrl: '#contact',
    availabilityStatus: 'Available Now',
    availabilityText: 'Accepting select new Q3/Q4 retainer clients worldwide',
    floatingMetrics: HERO_FLOATING_METRICS,
    trustStats: TRUST_STATS
  },
  about: {
    sectionTitle: 'Scientific Analytical Mind Meets High-Velocity Growth Engineering',
    shortIntro: 'From a rigorous Bachelor of Science (B.Sc Honours) foundation in Gaibandha to engineering multi-million dollar performance campaigns worldwide.',
    detailedBio: PERSONAL_INFO.bio,
    mission: 'To empower forward-thinking brands with transparent, high-ROI marketing systems powered by algorithmic precision and autonomous AI workflows.',
    vision: 'To bridge data science, creative psychology, and marketing automation into seamless growth flywheels that scale revenue sustainably.',
    careerSummary: 'Over 5+ years of hands-on media buying, 80+ completed projects, $4.2M+ in managed ad spend, and consistently ranking client websites on page 1 of Google.',
    profileImage: '/assets/profile.jpg',
    signatureText: 'Sayed Ahmed Sijan',
    experienceHighlights: [
      'B.Sc (Honours) Quantitative Analytical Background',
      'Meta Certified Media Buying & Advantage+ Specialist',
      'Google Ads Search & Performance Max Certified',
      'Python Scripting for Ad Automation & API Reporting',
      'Advanced Server-Side GTM & Meta CAPI Attribution'
    ]
  },
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science (B.Sc Honours)',
      institution: 'National University Gaibandha',
      department: 'Science & Quantitative Analysis',
      location: 'Gaibandha, Bangladesh',
      startDate: '2016',
      endDate: '2020',
      currentlyStudying: false,
      description: 'Developed rigorous scientific hypothesis testing, mathematical modeling, and structured statistical analysis skills that form the bedrock of my marketing experimentation frameworks.',
      displayOrder: 1
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Gaibandha Govt. College',
      department: 'Science Division',
      location: 'Gaibandha, Bangladesh',
      startDate: '2014',
      endDate: '2016',
      currentlyStudying: false,
      description: 'Focused on higher mathematics, physics, and computational logic with outstanding academic performance.',
      displayOrder: 2
    }
  ],
  experience: EXPERIENCE_ITEMS,
  skills: SKILLS_LIST,
  certificates: CERTIFICATIONS_LIST,
  projects: PROJECTS_GALLERY,
  services: SERVICES_LIST,
  achievements: [
    {
      id: 'ach-1',
      title: '$4.2M+ Profitable Ad Spend Managed',
      description: 'Successfully deployed capital across Meta, Google, and TikTok with an average portfolio blended ROAS of 3.8x.',
      date: '2025',
      organization: 'Portfolio Milestone',
      image: '/assets/profile.jpg',
      displayOrder: 1
    },
    {
      id: 'ach-2',
      title: 'Top Rated Performance Marketer',
      description: 'Completed 80+ client engagements with 94% retention and 5-star verified client satisfaction ratings.',
      date: '2024',
      organization: 'Client Success Milestone',
      image: '/assets/profile.jpg',
      displayOrder: 2
    },
    {
      id: 'ach-3',
      title: 'Bachelor of Science (B.Sc Honours)',
      description: 'Graduated in Science from National University Gaibandha with high academic honors in quantitative research.',
      date: '2020',
      organization: 'National University',
      image: '/assets/profile.jpg',
      displayOrder: 3
    }
  ],
  testimonials: TESTIMONIALS_LIST,
  socialLinks: [
    { id: 'soc-1', platform: 'WhatsApp', url: 'https://wa.me/8801763810310?text=Hi%20Sayed,%20I%20saw%20your%20portfolio!', icon: 'Phone', displayOrder: 1, enabled: true },
    { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com/in/sayed-ahmed-sijan', icon: 'Linkedin', displayOrder: 2, enabled: true },
    { id: 'soc-3', platform: 'Facebook', url: 'https://facebook.com/sayed.ahmed.sijan', icon: 'Facebook', displayOrder: 3, enabled: true },
    { id: 'soc-4', platform: 'GitHub', url: 'https://github.com/sayedahmedsijan', icon: 'Github', displayOrder: 4, enabled: true },
    { id: 'soc-5', platform: 'Email', url: 'mailto:Ahmedsijan97@gmail.com', icon: 'Mail', displayOrder: 5, enabled: true }
  ],
  contact: {
    email: 'Ahmedsijan97@gmail.com',
    phone: '+880 1763 810310',
    whatsappUrl: 'https://wa.me/8801763810310?text=Hi%20Sayed,%20I%20saw%20your%20portfolio!',
    location: 'Gaibandha / Dhaka, Bangladesh (Available Worldwide Remote)',
    officeAddress: 'Gaibandha, Rangpur Division, Bangladesh',
    googleMapsUrl: 'https://maps.google.com/?q=Gaibandha,Bangladesh',
    formEnabled: true,
    notificationEmail: 'Ahmedsijan97@gmail.com',
    successMessage: 'Thank you! Your project inquiry has been received. Sayed will review your details and respond within 24 business hours.'
  },
  navigation: [
    { id: 'nav-1', name: 'Home', slug: 'home', icon: 'Home', displayOrder: 1, visible: true },
    { id: 'nav-2', name: 'About', slug: 'about', icon: 'User', displayOrder: 2, visible: true },
    { id: 'nav-3', name: 'Experience', slug: 'experience', icon: 'Briefcase', displayOrder: 3, visible: true },
    { id: 'nav-4', name: 'Skills', slug: 'skills', icon: 'Layers', displayOrder: 4, visible: true },
    { id: 'nav-5', name: 'Services', slug: 'services', icon: 'Zap', displayOrder: 5, visible: true },
    { id: 'nav-6', name: 'Case Studies', slug: 'case-studies', icon: 'TrendingUp', displayOrder: 6, visible: true },
    { id: 'nav-7', name: 'Certificates', slug: 'certifications', icon: 'Award', displayOrder: 7, visible: true },
    { id: 'nav-8', name: 'Projects', slug: 'projects', icon: 'FolderGit2', displayOrder: 8, visible: true },
    { id: 'nav-9', name: 'Testimonials', slug: 'testimonials', icon: 'MessageSquare', displayOrder: 9, visible: true },
    { id: 'nav-10', name: 'Contact', slug: 'contact', icon: 'Mail', displayOrder: 10, visible: true }
  ],
  seo: {
    websiteTitle: 'Sayed Ahmed Sijan — Digital Marketer & AI Performance Specialist',
    metaDescription: 'Portfolio of Sayed Ahmed Sijan — Digital Marketer & AI Performance Specialist helping e-commerce and local brands scale with data-driven Ads, SEO & AI automation.',
    keywords: ['Digital Marketer', 'AI Marketing Specialist', 'Meta Ads Expert', 'Google Ads PMax', 'SEO Consultant Bangladesh', 'Sayed Ahmed Sijan', 'ROAS Optimization'],
    author: 'Sayed Ahmed Sijan',
    canonicalUrl: 'https://sayedahmedsijan.com',
    ogTitle: 'Sayed Ahmed Sijan — Digital Marketer & AI Performance Specialist',
    ogDescription: 'Managed $4.2M+ profitable ad spend with 3.8x average ROAS. Explore case studies, client results, and growth systems.',
    ogImage: '/assets/profile.jpg',
    twitterTitle: 'Sayed Ahmed Sijan — Digital Marketer & AI Specialist',
    twitterDescription: 'Data-driven performance marketing, SEO, and AI automation systems.',
    twitterImage: '/assets/profile.jpg',
    robotsTxt: 'User-agent: *\nAllow: /\nSitemap: https://sayedahmedsijan.com/sitemap.xml',
    sitemapXml: '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://sayedahmedsijan.com/</loc><priority>1.0</priority></url>\n</urlset>',
    structuredDataJson: '{"@context":"https://schema.org","@type":"Person","name":"Sayed Ahmed Sijan","jobTitle":"Digital Marketer & AI Performance Specialist","url":"https://sayedahmedsijan.com"}',
    pageSeo: {
      home: { title: 'Sayed Ahmed Sijan — Digital Marketer & AI Performance Specialist', description: 'Home of Sayed Ahmed Sijan, performance marketing and AI consultant.' },
      about: { title: 'About Sayed Ahmed Sijan — B.Sc Science & Growth Specialist', description: 'Academic background, journey, and marketing philosophy of Sayed Ahmed Sijan.' },
      projects: { title: 'Selected Projects & Case Studies — Sayed Ahmed Sijan', description: 'Real-world campaign results scaling revenue to $110k+/mo.' },
      services: { title: 'Growth Packages & Marketing Services — Sayed Ahmed Sijan', description: 'Meta Ads, Google Ads PMax, SEO audits, and custom AI automations.' },
      contact: { title: 'Book Strategy Consultation — Sayed Ahmed Sijan', description: 'Get in touch for performance marketing retainers and audits.' }
    }
  },
  siteSettings: {
    websiteName: 'Sayed Ahmed Sijan',
    logoUrl: '/assets/profile.jpg',
    faviconUrl: '/app-favicon.ico',
    primaryColor: '#e7040f',
    secondaryColor: '#ffffff',
    accentColor: '#e7040f',
    maintenanceMode: false,
    maintenanceMessage: 'We are currently deploying exciting new growth systems and case studies. Please check back shortly or connect directly on WhatsApp (+880 1763 810310).',
    animationsEnabled: true,
    allowChat: true,
    defaultTheme: 'obsidian-crimson'
  }
};

const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PublicPortfolioData>(DEFAULT_PUBLIC_DATA);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/cms/public-data');
      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          setData(json.data);

          // Update Document Title & Favicon dynamically from CMS
          if (json.data.seo?.websiteTitle) {
            document.title = json.data.seo.websiteTitle;
          }
          if (json.data.seo?.metaDescription) {
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
              metaDesc.setAttribute('content', json.data.seo.metaDescription);
            }
          }
        }
      }
    } catch (err) {
      console.warn('Failed to load live CMS data from backend, utilizing cached dataset:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isMaintenanceMode = Boolean(data.siteSettings?.maintenanceMode);
  const maintenanceMessage = data.siteSettings?.maintenanceMessage || 'Website is undergoing scheduled maintenance.';

  return (
    <CmsContext.Provider value={{ data, loading, isMaintenanceMode, maintenanceMessage, refreshData: fetchData }}>
      {children}
    </CmsContext.Provider>
  );
}

export function usePortfolioCms(): CmsContextValue {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('usePortfolioCms must be used within a CmsProvider');
  }
  return context;
}
