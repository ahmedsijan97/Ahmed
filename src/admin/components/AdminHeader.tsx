import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminCms } from '../context/AdminCmsContext';
import { AdminSection } from './AdminSidebar';
import {
  Menu,
  Sparkles,
  Eye,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  ShieldAlert,
  User,
  LogOut,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { ConfirmDialog } from './ConfirmDialog';

interface AdminHeaderProps {
  currentSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  onToggleMobileSidebar: () => void;
  onOpenLivePreview: () => void;
  onOpenPublicSite: () => void;
}

export function AdminHeader({
  currentSection,
  onSelectSection,
  onToggleMobileSidebar,
  onOpenLivePreview,
  onOpenPublicSite
}: AdminHeaderProps) {
  const { adminUser, logout, mustChangePassword } = useAdminAuth();
  const { isDraftDirty, publishAllChanges, resetToDefaults, saving, db } = useAdminCms();
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showUserDropdown, setShowUserDropdown] = useState<boolean>(false);

  const sectionTitles: Record<AdminSection, { title: string; category: string }> = {
    dashboard: { title: 'Dashboard Overview', category: 'Main' },
    hero: { title: 'Hero & Headlines Management', category: 'Content' },
    profile: { title: 'Personal Information & Bio', category: 'Content' },
    about: { title: 'About Me & Mission', category: 'Content' },
    education: { title: 'Education Management', category: 'Content' },
    experience: { title: 'Work Experience Manager', category: 'Content' },
    skills: { title: 'Skills & Competencies', category: 'Content' },
    certificates: { title: 'Certifications & Credentials', category: 'Content' },
    projects: { title: 'Projects & Case Studies', category: 'Content' },
    services: { title: 'Services & Growth Packages', category: 'Content' },
    achievements: { title: 'Milestones & Achievements', category: 'Content' },
    testimonials: { title: 'Testimonials & Reviews', category: 'Content' },
    navigation: { title: 'Navigation Menu Manager', category: 'Website' },
    social: { title: 'Social Media Links', category: 'Website' },
    contact: { title: 'Contact Info & Lead Form', category: 'Website' },
    seo: { title: 'Global & Page SEO Settings', category: 'Website' },
    media: { title: 'Media Assets Library', category: 'Media' },
    settings: { title: 'Website Global Settings', category: 'System' },
    security: { title: 'Security & Access Control', category: 'System' },
    'activity-logs': { title: 'Audit Activity Logs', category: 'System' }
  };

  const currentInfo = sectionTitles[currentSection] || { title: 'Admin CMS', category: 'System' };

  return (
    <>
      <header
        id="admin-topbar"
        className="sticky top-0 z-30 bg-slate-950/90 border-b border-slate-800/80 backdrop-blur-xl px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4"
      >
        {/* Left: Mobile trigger & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            id="admin-mobile-menu-trigger"
            onClick={onToggleMobileSidebar}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900 md:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              <span>{currentInfo.category}</span>
              <span>/</span>
              <span className="text-purple-400 font-semibold">{currentInfo.title}</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight hidden sm:block">
              {currentInfo.title}
            </h2>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Unsaved Draft Pill */}
          {isDraftDirty && (
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Unpublished Draft Changes</span>
            </div>
          )}

          {/* Live Preview Button */}
          <button
            id="admin-header-preview-btn"
            onClick={onOpenLivePreview}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Publish Changes Button */}
          <button
            id="admin-header-publish-btn"
            onClick={() => publishAllChanges()}
            disabled={saving}
            className={`px-4 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white text-xs font-bold shadow-lg shadow-purple-950/40 hover:shadow-purple-900/50 flex items-center gap-1.5 transition-all ${
              saving ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish to Live'}</span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              id="admin-header-user-menu-btn"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              <div className="relative w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                {adminUser?.username?.substring(0, 1) || 'S'}
                {mustChangePassword && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 border-2 border-slate-950 rounded-full animate-bounce" />
                )}
              </div>
            </button>

            {showUserDropdown && (
              <div 
                id="admin-header-user-dropdown"
                className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-2 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="font-bold text-white text-sm">{adminUser?.username}</p>
                  <p className="text-[11px] text-purple-400 capitalize">{adminUser?.role || 'Superadmin'}</p>
                </div>

                {mustChangePassword && (
                  <div className="p-2.5 mx-1 mb-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-tight">
                      Using default password. Please update your password immediately.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    onSelectSection('security');
                    setShowUserDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <KeyRound className="w-4 h-4 text-purple-400" />
                  <span>Change Password</span>
                </button>

                <button
                  onClick={() => {
                    setShowResetConfirm(true);
                    setShowUserDropdown(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Database Defaults</span>
                </button>

                <div className="my-1 border-t border-slate-800" />

                <button
                  onClick={() => {
                    setShowUserDropdown(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showResetConfirm}
        title="Reset Portfolio to Default State?"
        message="This will overwrite all custom database changes and restore the initial portfolio contents (biography, projects, certifications, and settings). This cannot be undone."
        confirmLabel="Reset Everything"
        isDestructive={true}
        onConfirm={async () => {
          await resetToDefaults();
          setShowResetConfirm(false);
        }}
        onCancel={() => setShowResetConfirm(false)}
      />
    </>
  );
}
