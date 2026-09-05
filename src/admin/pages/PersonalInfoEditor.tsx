import React, { useState, useEffect } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { RichTextEditorSimple } from '../components/RichTextEditorSimple';
import { PersonalInfo } from '../../server/cmsStore';
import { User, Save, FileText, Mail, Phone, MapPin, Globe } from 'lucide-react';

export function PersonalInfoEditor() {
  const { db, updatePersonalInfo, saving } = useAdminCms();
  const [formData, setFormData] = useState<PersonalInfo | null>(null);

  useEffect(() => {
    if (db?.personalInfo) {
      setFormData(JSON.parse(JSON.stringify(db.personalInfo)));
    }
  }, [db?.personalInfo]);

  if (!formData) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-200">
      {/* Top Save Bar */}
      <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-2xl sticky top-20 z-20 backdrop-blur-xl">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            Personal Profile & Contact Attributes
          </h3>
          <p className="text-xs text-slate-400">Core personal identity, executive summary, contact channels, and downloadable CV.</p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-950/40 flex items-center gap-1.5 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Identity Details</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Professional Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-purple-300 focus:border-purple-500 outline-none font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Location / Residence</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality || ''}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  placeholder="e.g. Bangladeshi"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Detailed Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Gaibandha, Rangpur, Bangladesh"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <RichTextEditorSimple
                label="Executive Bio"
                value={formData.bio}
                onChange={(val) => setFormData({ ...formData, bio: val })}
                rows={5}
                helperText="Appears across meta tags and structured schema summaries."
              />
            </div>
          </div>

          {/* Contact Directs */}
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Direct Communication Channels</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">WhatsApp Direct Link</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="https://wa.me/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: CV / Resume & Avatar */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Profile Photo</h4>
            <ImageUploadDropzone
              label="Avatar Image"
              value={formData.avatar}
              onChange={(url) => setFormData({ ...formData, avatar: url })}
            />
          </div>

          <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Downloadable Curriculum Vitae (CV)</h4>
            <ImageUploadDropzone
              label="CV File (PDF Document)"
              value={formData.cvUrl || ''}
              onChange={(url) => setFormData({ ...formData, cvUrl: url })}
              accept="application/pdf"
              helperText="Upload official Resume / CV in PDF format"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
