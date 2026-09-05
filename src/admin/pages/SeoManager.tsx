import React, { useState, useEffect } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { SeoSettings } from '../../server/cmsStore';
import { Search, Save, Globe, Share2, Code } from 'lucide-react';

export function SeoManager() {
  const { db, updateSeo, saving } = useAdminCms();
  const [formData, setFormData] = useState<SeoSettings | null>(null);

  useEffect(() => {
    if (db?.seo) {
      setFormData(JSON.parse(JSON.stringify(db.seo)));
    }
  }, [db?.seo]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSeo(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      {/* Top Save Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl sticky top-20 z-20 backdrop-blur-xl">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-purple-400" />
            SEO, OpenGraph & Structured Schema
          </h3>
          <p className="text-xs text-slate-400">Configure global metadata, search engine indexing, social preview cards, and rich snippets.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save SEO Configuration'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Meta */}
        <div className="lg:col-span-2 space-y-6">
          {/* SERP Preview */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Search Engine Result Preview (Google)</h4>
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>{formData.canonicalUrl || 'https://sayedahmedsijan.com'}</span>
              </div>
              <div className="text-base text-blue-400 font-medium hover:underline cursor-pointer">
                {formData.websiteTitle || 'Sayed Ahmed Sijan | Performance Marketer'}
              </div>
              <div className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {formData.metaDescription || 'Add a meta description to see how it appears in search results...'}
              </div>
            </div>
          </div>

          {/* Primary Meta Fields */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Primary Meta Tags</h4>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-400">Site Title (&lt;title&gt;)</label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {(formData.websiteTitle || '').length} / 60 chars
                </span>
              </div>
              <input
                type="text"
                value={formData.websiteTitle || ''}
                onChange={(e) => setFormData({ ...formData, websiteTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-400">Meta Description</label>
                <span className="text-[10px] text-slate-500 font-mono">
                  {(formData.metaDescription || '').length} / 160 chars
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Meta Keywords (Comma separated)</label>
              <input
                type="text"
                value={formData.keywords?.join(', ') || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  keywords: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                })}
                placeholder="Meta Ads, Performance Marketing, Media Buying, ROAS Scaling"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={formData.canonicalUrl || ''}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  placeholder="https://sayedahmedsijan.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Twitter / X Handle</label>
                <input
                  type="text"
                  value={formData.twitterHandle || ''}
                  onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
                  placeholder="@SayedAhmedSijan"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>
          </div>

          {/* Structured Schema JSON-LD */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-purple-400" />
              Custom JSON-LD Structured Data Schema
            </h4>
            <p className="text-xs text-slate-400">Schema.org Person / ProfessionalService entity markup for Google Knowledge Graph.</p>
            <textarea
              rows={8}
              value={formData.structuredDataJson || formData.customSchema || ''}
              onChange={(e) => setFormData({ ...formData, structuredDataJson: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-purple-300 font-mono focus:border-purple-500 outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Right 1 Col: Social Share Image & Indexing */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-purple-400" />
              OpenGraph Social Share Image (1200x630)
            </h4>
            <ImageUploadDropzone
              label="OG Banner Image"
              value={formData.ogImage}
              onChange={(url) => setFormData({ ...formData, ogImage: url })}
              helperText="Image displayed when portfolio link is shared on WhatsApp, LinkedIn, X, and Slack"
            />
          </div>

          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Search Engine Directives</h4>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Robots.txt Content</label>
              <textarea
                rows={4}
                value={formData.robotsTxt || 'User-agent: *\nAllow: /'}
                onChange={(e) => setFormData({ ...formData, robotsTxt: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
