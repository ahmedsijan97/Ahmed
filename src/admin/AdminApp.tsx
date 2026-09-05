import React, { useState, useEffect } from 'react';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminCmsProvider, useAdminCms } from './context/AdminCmsContext';
import { ToastContainer } from './components/ToastContainer';
import { AdminSidebar, AdminSection } from './components/AdminSidebar';
import { AdminHeader } from './components/AdminHeader';
import { LivePreviewDrawer } from './components/LivePreviewDrawer';

// Pages
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { HeroEditor } from './pages/HeroEditor';
import { PersonalInfoEditor } from './pages/PersonalInfoEditor';
import { AboutEditor } from './pages/AboutEditor';
import { EducationManager } from './pages/EducationManager';
import { ExperienceManager } from './pages/ExperienceManager';
import { SkillsManager } from './pages/SkillsManager';
import { CertificatesManager } from './pages/CertificatesManager';
import { ProjectsManager } from './pages/ProjectsManager';
import { ServicesManager } from './pages/ServicesManager';
import { AchievementsManager } from './pages/AchievementsManager';
import { TestimonialsManager } from './pages/TestimonialsManager';
import { SocialLinksManager } from './pages/SocialLinksManager';
import { NavigationManager } from './pages/NavigationManager';
import { ContactManager } from './pages/ContactManager';
import { SeoManager } from './pages/SeoManager';
import { MediaLibrary } from './pages/MediaLibrary';
import { WebsiteSettings } from './pages/WebsiteSettings';
import { SecuritySettings } from './pages/SecuritySettings';
import { ActivityLogsView } from './pages/ActivityLogsView';

function AdminLayout({ onExitAdmin }: { onExitAdmin?: () => void }) {
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [livePreviewOpen, setLivePreviewOpen] = useState<boolean>(false);

  // Sync section with URL hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('admin-')) {
        const sec = hash.replace('admin-', '') as AdminSection;
        setActiveSection(sec);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectSection = (sec: AdminSection) => {
    setActiveSection(sec);
    window.location.hash = `admin-${sec}`;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono text-slate-400">Authenticating CMS session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onBackToSite={onExitAdmin || (() => {})} />;
  }

  const renderActiveContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <AdminDashboard
            onNavigate={handleSelectSection}
            onOpenLivePreview={() => setLivePreviewOpen(true)}
            onOpenPublicSite={onExitAdmin || (() => {})}
          />
        );
      case 'hero':
        return <HeroEditor />;
      case 'profile':
        return <PersonalInfoEditor />;
      case 'about':
        return <AboutEditor />;
      case 'education':
        return <EducationManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'skills':
        return <SkillsManager />;
      case 'certificates':
        return <CertificatesManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'services':
        return <ServicesManager />;
      case 'achievements':
        return <AchievementsManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'social':
        return <SocialLinksManager />;
      case 'navigation':
        return <NavigationManager />;
      case 'contact':
        return <ContactManager />;
      case 'seo':
        return <SeoManager />;
      case 'media':
        return <MediaLibrary />;
      case 'settings':
        return <WebsiteSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'activity-logs':
        return <ActivityLogsView />;
      default:
        return (
          <AdminDashboard
            onNavigate={handleSelectSection}
            onOpenLivePreview={() => setLivePreviewOpen(true)}
            onOpenPublicSite={onExitAdmin || (() => {})}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-purple-500 selection:text-white">
      {/* Top Header */}
      <AdminHeader
        currentSection={activeSection}
        onSelectSection={handleSelectSection}
        onToggleMobileSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenLivePreview={() => setLivePreviewOpen(true)}
        onOpenPublicSite={onExitAdmin || (() => {})}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar
          currentSection={activeSection}
          onSelectSection={handleSelectSection}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
          onOpenLivePreview={() => setLivePreviewOpen(true)}
          onOpenPublicSite={onExitAdmin || (() => {})}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-950/95 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderActiveContent()}
          </div>
        </main>
      </div>

      {/* Live Preview Slide-Over Drawer */}
      <LivePreviewDrawer
        isOpen={livePreviewOpen}
        onClose={() => setLivePreviewOpen(false)}
      />

      <ToastContainer />
    </div>
  );
}

export function AdminApp({ onExitAdmin }: { onExitAdmin?: () => void }) {
  return (
    <AdminAuthProvider>
      <AdminCmsProvider>
        <AdminLayout onExitAdmin={onExitAdmin} />
      </AdminCmsProvider>
    </AdminAuthProvider>
  );
}
export default AdminApp;
