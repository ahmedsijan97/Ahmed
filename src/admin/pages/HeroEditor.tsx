import React, { useState, useEffect } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { HeroSettings } from '../../server/cmsStore';
import { Sparkles, Plus, Trash2, Save, ArrowRight } from 'lucide-react';

export function HeroEditor() {
  const { db, updateHero, saving } = useAdminCms();
  const [formData, setFormData] = useState<HeroSettings | null>(null);

  useEffect(() => {
    if (db?.hero) {
      setFormData(JSON.parse(JSON.stringify(db.hero)));
    }
  }, [db?.hero]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHero(formData);
  };

  const handleAddFloatingMetric = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        floatingMetrics: [
          ...prev.floatingMetrics,
          {
            label: 'New Metric',
            value: '4.5x',
            change: '+25%',
            isPositive: true,
            tag: 'Growth'
          }
        ]
      };
    });
  };

  const handleRemoveFloatingMetric = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.floatingMetrics];
      updated.splice(index, 1);
      return { ...prev, floatingMetrics: updated };
    });
  };

  const handleUpdateMetric = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.floatingMetrics];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, floatingMetrics: updated };
    });
  };

  const handleAddTrustStat = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        trustStats: [
          ...prev.trustStats,
          {
            label: 'Client Satisfaction',
            value: '99%',
            numericValue: 99,
            suffix: '%',
            description: 'Verified client reviews'
          }
        ]
      };
    });
  };

  const handleRemoveTrustStat = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.trustStats];
      updated.splice(index, 1);
      return { ...prev, trustStats: updated };
    });
  };

  const handleUpdateTrustStat = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.trustStats];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, trustStats: updated };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      {/* Top Save Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl sticky top-20 z-20 backdrop-blur-xl">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Hero Banner & Value Proposition
          </h3>
          <p className="text-xs text-slate-400">Manage headline typography, image, call-to-actions, and live trust counters.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Hero Section'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Main Headlines & Copy</h4>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Pre-Greeting Badge</label>
              <input
                type="text"
                value={formData.greeting}
                onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Main Headline</label>
              <input
                type="text"
                value={formData.mainHeadline}
                onChange={(e) => setFormData({ ...formData, mainHeadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Highlighted Words in Headline (Gradient Accent)</label>
              <input
                type="text"
                value={formData.headlineHighlight}
                onChange={(e) => setFormData({ ...formData, headlineHighlight: e.target.value })}
                placeholder="e.g. Measurable Growth"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-purple-300 focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Short Description / Subtext</label>
              <textarea
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Action Buttons & Status */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">CTA Buttons & Availability</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Button Text</label>
                <input
                  type="text"
                  value={formData.primaryButtonText}
                  onChange={(e) => setFormData({ ...formData, primaryButtonText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Button Link Target</label>
                <input
                  type="text"
                  value={formData.primaryButtonUrl}
                  onChange={(e) => setFormData({ ...formData, primaryButtonUrl: e.target.value })}
                  placeholder="#case-studies or URL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Secondary Button Text</label>
                <input
                  type="text"
                  value={formData.secondaryButtonText}
                  onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Secondary Button Link Target</label>
                <input
                  type="text"
                  value={formData.secondaryButtonUrl}
                  onChange={(e) => setFormData({ ...formData, secondaryButtonUrl: e.target.value })}
                  placeholder="#contact or URL"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Availability Status</label>
                <input
                  type="text"
                  value={formData.availabilityStatus}
                  onChange={(e) => setFormData({ ...formData, availabilityStatus: e.target.value })}
                  placeholder="e.g. Available Now"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-semibold focus:border-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Availability Detail Subtext</label>
                <input
                  type="text"
                  value={formData.availabilityText}
                  onChange={(e) => setFormData({ ...formData, availabilityText: e.target.value })}
                  placeholder="e.g. Accepting select new Q3/Q4 retainer clients"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Floating Metric Badges Editor */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Floating Hero Metric Badges</h4>
                <p className="text-xs text-slate-500">Key metrics displayed dynamically around the hero visual.</p>
              </div>
              <button
                type="button"
                onClick={handleAddFloatingMetric}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-400 text-xs font-semibold rounded-xl border border-slate-700 flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" /> Add Metric
              </button>
            </div>

            <div className="space-y-3">
              {formData.floatingMetrics.map((metric, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center gap-3">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={metric.label}
                      onChange={(e) => handleUpdateMetric(idx, 'label', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g. 4.8x)"
                      value={metric.value}
                      onChange={(e) => handleUpdateMetric(idx, 'value', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-bold"
                    />
                    <input
                      type="text"
                      placeholder="Change (e.g. +38%)"
                      value={metric.change}
                      onChange={(e) => handleUpdateMetric(idx, 'change', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Tag"
                      value={metric.tag}
                      onChange={(e) => handleUpdateMetric(idx, 'tag', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFloatingMetric(idx)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Hero Visual & Trust Stats */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Hero Profile Photo</h4>
            <ImageUploadDropzone
              label="Profile Photo (Hero Visual)"
              value={formData.profileImage}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
              helperText="High quality portrait photo (PNG/JPG/WEBP)"
            />
          </div>

          {/* Trust Stats Editor */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Trust Stats Bar</h4>
                <p className="text-[11px] text-slate-500">Counters below the hero banner</p>
              </div>
              <button
                type="button"
                onClick={handleAddTrustStat}
                className="p-1 text-purple-400 hover:text-purple-300 rounded-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {formData.trustStats.map((stat, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-purple-400">Stat #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTrustStat(idx)}
                      className="text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Value (e.g. $4.2M+)"
                    value={stat.value}
                    onChange={(e) => handleUpdateTrustStat(idx, 'value', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-white font-bold"
                  />
                  <input
                    type="text"
                    placeholder="Label (e.g. Ad Spend Managed)"
                    value={stat.label}
                    onChange={(e) => handleUpdateTrustStat(idx, 'label', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={stat.description || (stat as any).subtext || ''}
                    onChange={(e) => handleUpdateTrustStat(idx, 'description', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
