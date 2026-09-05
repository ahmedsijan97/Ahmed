import React, { useState, useEffect } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { RichTextEditorSimple } from '../components/RichTextEditorSimple';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { AboutSettings } from '../../server/cmsStore';
import { FileText, Save, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export function AboutEditor() {
  const { db, updateAbout, saving } = useAdminCms();
  const [formData, setFormData] = useState<AboutSettings | null>(null);

  useEffect(() => {
    if (db?.about) {
      setFormData(JSON.parse(JSON.stringify(db.about)));
    }
  }, [db?.about]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateAbout(formData);
  };

  const handleAddHighlight = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experienceHighlights: [...prev.experienceHighlights, 'New achievement highlight']
      };
    });
  };

  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.experienceHighlights];
      updated.splice(index, 1);
      return { ...prev, experienceHighlights: updated };
    });
  };

  const handleUpdateHighlight = (index: number, val: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const updated = [...prev.experienceHighlights];
      updated[index] = val;
      return { ...prev, experienceHighlights: updated };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      {/* Top Save Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl sticky top-20 z-20 backdrop-blur-xl">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-400" />
            About Me, Philosophy & Mission
          </h3>
          <p className="text-xs text-slate-400">Manage detailed narrative, scientific background, mission, and bullet highlights.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save About Section'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Narrative */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Headline & Overview</h4>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Section Main Title</label>
              <input
                type="text"
                value={formData.sectionTitle}
                onChange={(e) => setFormData({ ...formData, sectionTitle: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Short Intro / Hook</label>
              <textarea
                rows={2}
                value={formData.shortIntro}
                onChange={(e) => setFormData({ ...formData, shortIntro: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-purple-200 focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>

            <div className="pt-2">
              <RichTextEditorSimple
                label="Detailed Career Biography"
                value={formData.detailedBio}
                onChange={(val) => setFormData({ ...formData, detailedBio: val })}
                rows={6}
                helperText="Comprehensive overview of scientific analysis background and performance marketing journey."
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Strategic Mission & Vision</h4>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Our Mission Statement</label>
              <textarea
                rows={3}
                value={formData.mission}
                onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Future Vision</label>
              <textarea
                rows={3}
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-purple-500 outline-none leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Career Quantitative Summary</label>
              <input
                type="text"
                value={formData.careerSummary}
                onChange={(e) => setFormData({ ...formData, careerSummary: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-emerald-400 font-semibold focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Highlights & Media */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">About Portrait Visual</h4>
            <ImageUploadDropzone
              label="About Section Image"
              value={formData.profileImage}
              onChange={(url) => setFormData({ ...formData, profileImage: url })}
            />
          </div>

          {/* Highlights list */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Experience Highlights</h4>
                <p className="text-[11px] text-slate-500">Key bullet points rendered in about section</p>
              </div>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="p-1 text-purple-400 hover:text-purple-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5">
              {formData.experienceHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleUpdateHighlight(idx, e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Signature Text</h4>
            <input
              type="text"
              value={formData.signatureText || ''}
              onChange={(e) => setFormData({ ...formData, signatureText: e.target.value })}
              placeholder="e.g. Sayed Ahmed Sijan"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-serif italic"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
