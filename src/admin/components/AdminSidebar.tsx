import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminCms } from '../context/AdminCmsContext';
import {
  LayoutDashboard,
  Sparkles,
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  FolderGit2,
  Zap,
  Trophy,
  MessageSquare,
  Compass,
  Share2,
  Mail,
  Search,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  History,
  ExternalLink,
  LogOut,
  ChevronLeft,
  ChevronRight,
  KeyRound,
  Eye
} from 'lucide-react';

export type AdminSection =
  | 'dashboard'
  | 'hero'
  | 'profile'
  | 'about'
  | 'education'
  | 'experience'
  | 'skills'
  | 'certificates'
  | 'projects'
  | 'services'
  | 'achievements'
  | 'testimonials'
  | 'navigation'
  | 'social'
  | 'contact'
  | 'seo'
  | 'media'
  | 'settings'
  | 'security'
  | 'activity-logs';

interface AdminSidebarProps {
  currentSection: AdminSection;
  onSelectSection: (section: AdminSection) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onOpenLivePreview: () => void;
  onOpenPublicSite: () => void;
}

export function AdminSidebar({
  currentSection,
  onSelectSection,
  collapsed,
  onToggleCollapsed,
  onOpenLivePreview,
  onOpenPublicSite
}: AdminSidebarProps) {
  const { adminUser, logout, mustChangePassword } = useAdminAuth();
  const { db } = useAdminCms();

  const navGroups = [
    {
      label: 'MAIN',
      items: [
        { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'CONTENT',
      items: [
        { id: 'hero' as AdminSection, label: 'Hero Section', icon: Sparkles },
        { id: 'profile' as AdminSection, label: 'Personal Info', icon: User },
        { id: 'about' as AdminSection, label: 'About Me', icon: FileText },
        { id: 'education' as AdminSection, label: 'Education', icon: GraduationCap, count: db?.education?.length },
        { id: 'experience' as AdminSection, label: 'Experience', icon: Briefcase, count: db?.experience?.length },
        { id: 'skills' as AdminSection, label: 'Skills', icon: Layers, count: db?.skills?.length },
        { id: 'certificates' as AdminSection, label: 'Certificates', icon: Award, count: db?.certificates?.length },
        { id: 'projects' as AdminSection, label: 'Projects', icon: FolderGit2, count: db?.projects?.length },
        { id: 'services' as AdminSection, label: 'Services', icon: Zap, count: db?.services?.length },
        { id: 'achievements' as AdminSection, label: 'Achievements', icon: Trophy, count: db?.achievements?.length },
        { id: 'testimonials' as AdminSection, label: 'Testimonials', icon: MessageSquare, count: db?.testimonials?.length }
      ]
    },
    {
      label: 'WEBSITE',
      items: [
        { id: 'navigation' as AdminSection, label: 'Navigation', icon: Compass },
        { id: 'social' as AdminSection, label: 'Social Links', icon: Share2, count: db?.socialLinks?.length },
        { id: 'contact' as AdminSection, label: 'Contact Info', icon: Mail },
        { id: 'seo' as AdminSection, label: 'SEO Settings', icon: Search }
      ]
    },
    {
      label: 'MEDIA',
      items: [
        { id: 'media' as AdminSection, label: 'Media Library', icon: ImageIcon, count: db?.media?.length }
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { id: 'settings' as AdminSection, label: 'Website Settings', icon: Settings },
        { id: 'security' as AdminSection, label: 'Security & Auth', icon: ShieldCheck, alert: mustChangePassword },
        { id: 'activity-logs' as AdminSection, label: 'Activity Logs', icon: History }
      ]
    }
  ];

  return (
    <aside
      id="admin-sidebar"
      className={`fixed top-0 left-0 bottom-0 z-40 bg-slate-950/95 border-r border-slate-800/80 flex flex-col justify-between transition-all duration-300 backdrop-blur-2xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-red-600 p-[1px] shadow-lg shadow-purple-950/40">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-white text-sm">
                S
              </div>
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">Sayed CMS</h1>
              <p className="text-[10px] text-purple-400 font-medium">Enterprise Portfolio Admin</p>
            </div>
          </div>
        ) : (
          <div className="w-9 h-9 mx-auto rounded-xl bg-gradient-to-tr from-purple-600 to-red-600 p-[1px] shadow-lg">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-white text-sm">
              S
            </div>
          </div>
        )}

        <button
          id="admin-sidebar-toggle-btn"
          onClick={onToggleCollapsed}
          className={`p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors ${
            collapsed ? 'hidden' : 'block'
          }`}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Links (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6 custom-scrollbar">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-1">
            {!collapsed && (
              <p className="text-[10px] font-bold text-slate-500 px-3 tracking-wider uppercase mb-1.5">
                {group.label}
              </p>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  id={`admin-nav-${item.id}`}
                  onClick={() => onSelectSection(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all relative group ${
                    isActive
                      ? 'bg-purple-600/15 text-purple-300 border border-purple-500/30 shadow-md shadow-purple-950/20'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  
                  {!collapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {!collapsed && typeof item.count === 'number' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                      {item.count}
                    </span>
                  )}

                  {item.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" title="Action required" />
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-purple-500" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Profile & Actions */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
        {/* Quick View Live Preview */}
        <button
          id="admin-sidebar-preview-btn"
          onClick={onOpenLivePreview}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:bg-purple-500/10 border border-purple-500/20 transition-all justify-center"
        >
          <Eye className="w-4 h-4 text-purple-400" />
          {!collapsed && <span>Live Preview</span>}
        </button>

        {/* View Public Website */}
        <button
          id="admin-sidebar-view-site-btn"
          onClick={onOpenPublicSite}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-all justify-center"
        >
          <ExternalLink className="w-4 h-4 text-slate-400" />
          {!collapsed && <span>Public Website</span>}
        </button>

        {/* User Badge & Logout */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
          {!collapsed ? (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-xs shrink-0">
                {adminUser?.username?.substring(0, 1) || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{adminUser?.username || 'Admin'}</p>
                <p className="text-[10px] text-emerald-400 font-mono">Online</p>
              </div>
            </div>
          ) : null}

          <button
            id="admin-sidebar-logout-btn"
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors shrink-0"
            title="Sign out of CMS"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
