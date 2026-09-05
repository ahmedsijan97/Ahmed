import React, { useEffect, useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { AdminSection } from '../components/AdminSidebar';
import {
  Sparkles,
  FolderGit2,
  Briefcase,
  Award,
  Layers,
  Image as ImageIcon,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Plus,
  FileEdit,
  Database,
  Eye,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { ActivityLog } from '../../server/cmsStore';

interface AdminDashboardProps {
  onNavigate: (section: AdminSection) => void;
  onOpenLivePreview: () => void;
  onOpenPublicSite: () => void;
}

export function AdminDashboard({ onNavigate, onOpenLivePreview, onOpenPublicSite }: AdminDashboardProps) {
  const { db, isDraftDirty, publishAllChanges, saving, fetchActivityLogs } = useAdminCms();
  const { adminUser, mustChangePassword } = useAdminAuth();
  const [recentLogs, setRecentLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    fetchActivityLogs().then((logs) => {
      setRecentLogs(logs.slice(0, 6));
    });
  }, [fetchActivityLogs]);

  const kpis = [
    {
      label: 'Projects & Case Studies',
      value: db?.projects?.length || 0,
      sub: `${db?.projects?.filter(p => p.featured).length || 0} Featured`,
      icon: FolderGit2,
      color: 'from-purple-600 to-indigo-600',
      section: 'projects' as AdminSection
    },
    {
      label: 'Work Experience',
      value: db?.experience?.length || 0,
      sub: '5+ Years Track Record',
      icon: Briefcase,
      color: 'from-blue-600 to-cyan-600',
      section: 'experience' as AdminSection
    },
    {
      label: 'Certifications',
      value: db?.certificates?.length || 0,
      sub: 'Meta, Google & AI Certs',
      icon: Award,
      color: 'from-amber-600 to-orange-600',
      section: 'certificates' as AdminSection
    },
    {
      label: 'Skills & Tools',
      value: db?.skills?.length || 0,
      sub: '5 Core Competency Domains',
      icon: Layers,
      color: 'from-emerald-600 to-teal-600',
      section: 'skills' as AdminSection
    },
    {
      label: 'Media Assets',
      value: db?.media?.length || 0,
      sub: 'Images & Documents Stored',
      icon: ImageIcon,
      color: 'from-rose-600 to-pink-600',
      section: 'media' as AdminSection
    },
    {
      label: 'Client Testimonials',
      value: db?.testimonials?.length || 0,
      sub: '5.0 Star Verified Reviews',
      icon: TrendingUp,
      color: 'from-violet-600 to-purple-600',
      section: 'testimonials' as AdminSection
    }
  ];

  return (
    <div id="admin-dashboard-view" className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/40 via-slate-900/80 to-slate-900/90 border border-purple-500/20 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Full Portfolio Control Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Back, {adminUser?.username || 'Sayed'}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              All portfolio sections, case studies, personal bios, certificates, and SEO metadata are dynamically synchronized with your live website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="admin-dashboard-preview-btn"
              onClick={onOpenLivePreview}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition-all shadow-md"
            >
              <Eye className="w-4 h-4 text-purple-400" />
              <span>Live Preview</span>
            </button>

            <button
              id="admin-dashboard-publish-btn"
              onClick={() => publishAllChanges()}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-purple-950/50 hover:shadow-purple-900/60 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{saving ? 'Publishing...' : 'Publish to Live Site'}</span>
            </button>
          </div>
        </div>

        {/* Subtle background gradient shapes */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Security Recommendation Callout if using default password */}
      {mustChangePassword && (
        <div 
          id="admin-security-alert-box"
          className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Default Admin Password In Use</h4>
              <p className="text-xs text-amber-200 mt-0.5 leading-relaxed">
                Your portfolio is currently using the initial development credentials (<code className="font-mono bg-amber-950/40 px-1 py-0.5 rounded">Sayed10@</code>). Please change your password to secure your admin panel.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('security')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shrink-0 flex items-center gap-1.5 transition-all"
          >
            <KeyRound className="w-3.5 h-3.5" /> Change Password
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              onClick={() => onNavigate(kpi.section)}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900 transition-all duration-300 cursor-pointer group shadow-lg flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-tr ${kpi.color} text-white shadow-md`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">{kpi.label}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black text-white">{kpi.value}</span>
                  <span className="text-xs text-purple-400 font-medium">{kpi.sub}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Panel */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-400" />
              Quick Content Actions
            </h3>
            <span className="text-xs text-slate-500">Fast shortcuts to update sections</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 hover:bg-purple-950/20 text-left transition-all group"
            >
              <Plus className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Add Project</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Publish new case study</p>
            </button>

            <button
              onClick={() => onNavigate('experience')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 hover:bg-blue-950/20 text-left transition-all group"
            >
              <Plus className="w-4 h-4 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Add Experience</p>
              <p className="text-[10px] text-slate-400 mt-0.5">New career role</p>
            </button>

            <button
              onClick={() => onNavigate('certificates')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/40 hover:bg-amber-950/20 text-left transition-all group"
            >
              <Plus className="w-4 h-4 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Add Certificate</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Credential & badge</p>
            </button>

            <button
              onClick={() => onNavigate('media')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-rose-500/40 hover:bg-rose-950/20 text-left transition-all group"
            >
              <ImageIcon className="w-4 h-4 text-rose-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Media Library</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Upload images & PDFs</p>
            </button>

            <button
              onClick={() => onNavigate('hero')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 hover:bg-purple-950/20 text-left transition-all group"
            >
              <FileEdit className="w-4 h-4 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Edit Hero Banner</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Headlines & metrics</p>
            </button>

            <button
              onClick={() => onNavigate('seo')}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-950/20 text-left transition-all group"
            >
              <TrendingUp className="w-4 h-4 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">SEO & Robots</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Meta tags & sitemap</p>
            </button>
          </div>
        </div>

        {/* System & Architecture Status */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            System Architecture
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Persistence Store</span>
              <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> JSON DB Engine
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Authentication</span>
              <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> JWT + Bcrypt
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Rate Limiting</span>
              <span className="text-emerald-400 font-mono font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Brute-Force Guard
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
              <span className="text-slate-400">Maintenance Mode</span>
              <span className={`font-mono font-semibold px-2 py-0.5 rounded ${
                db?.siteSettings?.maintenanceMode ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {db?.siteSettings?.maintenanceMode ? 'ACTIVE' : 'OFFLINE (LIVE)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Audit Feed */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            Recent Administrative Activity
          </h3>
          <button
            onClick={() => onNavigate('activity-logs')}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            View All Audit Logs →
          </button>
        </div>

        <div className="divide-y divide-slate-800/60">
          {recentLogs.length === 0 ? (
            <p className="text-xs text-slate-500 py-4 text-center">No recent administrative logs.</p>
          ) : (
            recentLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <div>
                    <span className="font-semibold text-white">{log.action}</span>
                    <span className="text-slate-400 ml-2">by {(log as any).username || log.user}</span>
                  </div>
                </div>
                <div className="text-slate-500 font-mono text-[11px]">
                  {new Date(log.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
