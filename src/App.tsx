/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavPage, CaseStudyItem, CertificationItem, ProjectItem, ExperienceItem } from './types/portfolio';
import { ColorThemeId, COLOR_THEMES, ThemeMode } from './types/theme';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { SkillsPage } from './pages/SkillsPage';
import { ServicesPage } from './pages/ServicesPage';
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CertificationsPage } from './pages/CertificationsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

// Modals
import { CaseStudyDetailModal } from './components/modals/CaseStudyDetailModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { ProjectModal } from './components/modals/ProjectModal';
import { ExperienceModal } from './components/modals/ExperienceModal';
import { ThemeSelectorModal } from './components/modals/ThemeSelectorModal';
import { AiChatbot } from './components/chat/AiChatbot';

// CMS & Admin Panel
import { CmsProvider, usePortfolioCms } from './context/CmsContext';
import { AdminApp } from './admin/AdminApp';
import { MaintenanceScreen } from './admin/components/MaintenanceScreen';
import { Sparkles, Megaphone, ArrowRight, ShieldCheck } from 'lucide-react';

function PortfolioMain() {
  const { data, loading, isMaintenanceMode, maintenanceMessage } = usePortfolioCms();
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyItem | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<CertificationItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);
  const [selectedServiceInquiry, setSelectedServiceInquiry] = useState<string>('');
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return (
      window.location.hash.startsWith('#admin') ||
      window.location.pathname.startsWith('/admin') ||
      window.location.search.includes('admin=1')
    );
  });
  
  // Theme Mode (Deep Night vs Professional Light)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('portfolio_theme_mode');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch {
      // fallback
    }
    return 'dark';
  });

  // Color Theme state persisted in localStorage
  const [currentTheme, setCurrentTheme] = useState<ColorThemeId>(() => {
    try {
      const saved = localStorage.getItem('portfolio_color_theme');
      if (saved && COLOR_THEMES.some(t => t.id === saved)) {
        return saved as ColorThemeId;
      }
    } catch {
      // fallback
    }
    return 'obsidian-crimson';
  });
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);

  const activeTheme = COLOR_THEMES.find(t => t.id === currentTheme) || COLOR_THEMES[0];
  const isLight = themeMode === 'light';

  // Listen to hash changes for Admin routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#admin')) {
        setIsAdminView(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync SEO metadata with document head
  useEffect(() => {
    if (data?.seo?.websiteTitle) {
      document.title = data.seo.websiteTitle;
    }
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && data?.seo?.metaDescription) {
      metaDesc.setAttribute('content', data.seo.metaDescription);
    }
  }, [data?.seo]);

  // Apply theme & mode to html / document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-mode', themeMode);
    try {
      localStorage.setItem('portfolio_color_theme', currentTheme);
      localStorage.setItem('portfolio_theme_mode', themeMode);
    } catch {
      // ignore
    }
  }, [currentTheme, themeMode]);

  // Scroll to top whenever page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
  };

  const handleSelectServiceForInquiry = (serviceName: string) => {
    setSelectedServiceInquiry(serviceName);
  };

  const handleSelectTheme = (themeId: ColorThemeId) => {
    setCurrentTheme(themeId);
  };

  const handleToggleThemeMode = () => {
    setThemeMode(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectThemeMode = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  // If Admin view is active, render the complete Admin CMS Application
  if (isAdminView) {
    return (
      <AdminApp 
        onExitAdmin={() => {
          setIsAdminView(false);
          window.location.hash = '';
        }} 
      />
    );
  }

  // If Maintenance Mode is active (and visitor is not in admin mode)
  if (isMaintenanceMode) {
    return (
      <MaintenanceScreen 
        message={maintenanceMessage}
        onAdminLoginClick={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />
    );
  }

  const bannerAnnouncement = (data as any)?.siteSettings?.bannerAnnouncement;

  return (
    <div 
      id="portfolio-app-root" 
      data-theme={currentTheme}
      data-mode={themeMode}
      className={`min-h-screen font-['Plus_Jakarta_Sans'] antialiased selection:bg-emerald-500 selection:text-white flex flex-col justify-between overflow-x-hidden relative transition-colors duration-500 ${
        isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#080d19] text-slate-100'
      }`}
    >
      
      {/* Frosted Glass Dynamic Ambient Lighting Backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-all duration-700">
        <div 
          className={`absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 ${
            isLight ? 'opacity-30' : 'opacity-70'
          }`}
          style={{ backgroundColor: activeTheme.previewColors[0] }}
        />
        <div 
          className={`absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full blur-[140px] transition-all duration-700 ${
            isLight ? 'opacity-25' : 'opacity-60'
          }`}
          style={{ backgroundColor: activeTheme.previewColors[1] }}
        />
        <div 
          className={`absolute bottom-1/4 left-1/4 w-[480px] h-[480px] rounded-full blur-[150px] transition-all duration-700 ${
            isLight ? 'opacity-20' : 'opacity-50'
          }`}
          style={{ backgroundColor: activeTheme.previewColors[2] }}
        />
        <div className={`absolute inset-0 bg-grid-pattern ${isLight ? 'opacity-25' : 'opacity-35'}`} />
      </div>

      {/* Top Banner Announcement if configured in CMS */}
      {bannerAnnouncement?.enabled && bannerAnnouncement.message && (
        <div className="relative z-50 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 border-b border-purple-700/50 text-white text-xs py-2 px-4 text-center flex items-center justify-center gap-2 shadow-lg backdrop-blur-md">
          <Megaphone className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-bounce" />
          <span>{bannerAnnouncement.message}</span>
          {bannerAnnouncement.linkText && (
            <a
              href={bannerAnnouncement.linkUrl || '#contact'}
              onClick={(e) => {
                if (bannerAnnouncement.linkUrl?.startsWith('#')) {
                  e.preventDefault();
                  const target = bannerAnnouncement.linkUrl.replace('#', '') as NavPage;
                  if (['home', 'about', 'experience', 'skills', 'services', 'case-studies', 'certifications', 'projects', 'testimonials', 'contact'].includes(target)) {
                    handleNavigate(target);
                  }
                }
              }}
              className="inline-flex items-center gap-1 font-bold text-amber-300 hover:text-white underline ml-1 cursor-pointer"
            >
              <span>{bannerAnnouncement.linkText}</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Sticky Global Navigation */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        currentTheme={currentTheme}
        themeMode={themeMode}
        onToggleThemeMode={handleToggleThemeMode}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Main Page Viewport Container */}
      <main className="flex-1 w-full relative z-10 pb-16 lg:pb-0">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCaseStudy={setSelectedCaseStudy}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'experience' && (
          <ExperiencePage
            onNavigate={handleNavigate}
            onSelectExperience={setSelectedExperience}
          />
        )}

        {currentPage === 'skills' && (
          <SkillsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onNavigate={handleNavigate}
            onSelectServiceForInquiry={handleSelectServiceForInquiry}
          />
        )}

        {currentPage === 'case-studies' && (
          <CaseStudiesPage
            onNavigate={handleNavigate}
            onSelectCaseStudy={setSelectedCaseStudy}
          />
        )}

        {currentPage === 'certifications' && (
          <CertificationsPage
            onNavigate={handleNavigate}
            onSelectCertificate={setSelectedCertificate}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            onNavigate={handleNavigate}
            onSelectProject={setSelectedProject}
          />
        )}

        {currentPage === 'testimonials' && (
          <TestimonialsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            initialService={selectedServiceInquiry}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Interactive Modals */}
      <CaseStudyDetailModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onNavigate={handleNavigate}
      />

      <CertificateModal
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigate}
      />

      <ExperienceModal
        experience={selectedExperience}
        onClose={() => setSelectedExperience(null)}
        onNavigate={handleNavigate}
      />

      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onSelectTheme={handleSelectTheme}
        themeMode={themeMode}
        onSelectThemeMode={handleSelectThemeMode}
      />

      {/* AI Assistant Chatbot (controlled by CMS settings) */}
      {(data?.siteSettings?.allowChat !== false) && (
        <AiChatbot 
          onNavigate={handleNavigate} 
          themeMode={themeMode} 
          currentTheme={currentTheme}
        />
      )}

      {/* Global Footer */}
      <Footer 
        onNavigate={handleNavigate}
        onOpenAdmin={() => {
          setIsAdminView(true);
          window.location.hash = 'admin';
        }}
      />

      {/* Mobile-Only Bottom Navigation Bar */}
      <BottomNav 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        currentTheme={currentTheme}
        themeMode={themeMode}
        onToggleThemeMode={handleToggleThemeMode}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <PortfolioMain />
    </CmsProvider>
  );
}
