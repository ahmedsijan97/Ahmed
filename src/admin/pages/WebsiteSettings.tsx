import React, { useState, useEffect } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { SiteSettings } from '../../server/cmsStore';
import { Settings, Save, Sparkles, MessageCircle, AlertTriangle, Palette, Globe } from 'lucide-react';

export function WebsiteSettings() {
  const { db, updateSiteSettings, saving } = useAdminCms();
  const [formData, setFormData] = useState<SiteSettings | null>(null);

  useEffect(() => {
    if (db?.siteSettings) {
      setFormData(JSON.parse(JSON.stringify(db.siteSettings)));
    }
  }, [db?.siteSettings]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      {/* Top Save Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl sticky top-20 z-20 backdrop-blur-xl">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Settings className="w-4 h-4 text-purple-400" />
            Global Website & Interface Settings
          </h3>
          <p className="text-xs text-slate-400">Control brand name, visual themes, interactive features, and maintenance mode.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brand Identity */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-purple-400" />
              Brand & Display Identity
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Website Brand Name</label>
                <input
                  type="text"
                  value={formData.websiteName || ''}
                  onChange={(e) => setFormData({ ...formData, websiteName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Default Theme Style</label>
                <select
                  value={formData.defaultTheme || 'dark'}
                  onChange={(e) => setFormData({ ...formData, defaultTheme: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                >
                  <option value="dark">Cyber Neon Dark (Default)</option>
                  <option value="midnight">Midnight Deep Blue</option>
                  <option value="slate">Minimalist Charcoal Slate</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Logo URL (Optional)</label>
                <input
                  type="text"
                  value={formData.logoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  placeholder="/assets/logo.png"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Favicon URL (Optional)</label>
                <input
                  type="text"
                  value={formData.faviconUrl || ''}
                  onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                  placeholder="/favicon.ico"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Theme & Palette */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              Theme Colors & Aesthetics
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Brand Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.primaryColor || '#8B5CF6'}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-10 h-9 bg-transparent border-0 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor || '#8B5CF6'}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Secondary Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.secondaryColor || '#EC4899'}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="w-10 h-9 bg-transparent border-0 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.secondaryColor || '#EC4899'}
                    onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Highlight Glow Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formData.accentColor || '#3B82F6'}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-10 h-9 bg-transparent border-0 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={formData.accentColor || '#3B82F6'}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Controls & Switches */}
        <div className="space-y-6">
          {/* Interactive Capabilities */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Interactive Features
            </h4>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-slate-950 border border-slate-850">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">AI Growth Assistant</span>
                <span className="text-[10px] text-slate-500">Floating interactive chatbot</span>
              </div>
              <input
                type="checkbox"
                checked={formData.allowChat !== false}
                onChange={(e) => setFormData({ ...formData, allowChat: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer p-2 rounded-xl bg-slate-950 border border-slate-850">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">Fluid Animations</span>
                <span className="text-[10px] text-slate-500">Enable Framer/Motion effects</span>
              </div>
              <input
                type="checkbox"
                checked={formData.animationsEnabled !== false}
                onChange={(e) => setFormData({ ...formData, animationsEnabled: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
              />
            </label>
          </div>

          {/* Maintenance Mode */}
          <div className="p-6 bg-rose-950/20 border border-rose-900/40 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Maintenance Mode</h4>
            </div>
            <p className="text-[11px] text-slate-400">
              When enabled, public visitors will see a maintenance notice screen while admins retain full CMS access.
            </p>

            <label className="flex items-center justify-between cursor-pointer pt-1">
              <span className="text-xs font-semibold text-rose-300">Enable Maintenance Mode</span>
              <input
                type="checkbox"
                checked={formData.maintenanceMode || false}
                onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                className="rounded bg-rose-950 border-rose-800 text-rose-600 focus:ring-0"
              />
            </label>

            {formData.maintenanceMode && (
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-semibold text-slate-400">Public Maintenance Message</label>
                <textarea
                  rows={2}
                  value={formData.maintenanceMessage || ''}
                  onChange={(e) => setFormData({ ...formData, maintenanceMessage: e.target.value })}
                  placeholder="System undergoing scheduled optimization..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:border-purple-500 outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
