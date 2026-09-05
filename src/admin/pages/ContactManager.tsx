import React, { useState, useEffect } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { ContactSettings } from '../../server/cmsStore';
import { Mail, Phone, MapPin, MessageSquare, Save, CheckCircle2 } from 'lucide-react';

export function ContactManager() {
  const { db, updateContact, saving } = useAdminCms();
  const [formData, setFormData] = useState<ContactSettings>({
    email: '',
    phone: '',
    whatsappUrl: '',
    location: '',
    officeAddress: '',
    googleMapsUrl: '',
    formEnabled: true,
    notificationEmail: '',
    successMessage: ''
  });

  useEffect(() => {
    if (db?.contact) {
      setFormData(db.contact);
    }
  }, [db?.contact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContact(formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            Contact Information & Lead Capture Settings
          </h2>
          <p className="text-xs text-slate-400">
            Configure inbound emails, WhatsApp direct routing, office location, and response automations.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-purple-950/40 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Direct Channels */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-purple-400" />
            Direct Communication Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Inquiry / Business Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="sayedahmedsijan@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Direct Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+880 1763-810310"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">WhatsApp Direct Chat Link</label>
            <input
              type="text"
              value={formData.whatsappUrl}
              onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
              placeholder="https://wa.me/8801763810310?text=..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
            />
          </div>
        </div>

        {/* Location & Office Address */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            Physical Location & Global Base
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Location Badge / Region</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Gaibandha & Dhaka, Bangladesh (Available Worldwide)"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Office / Working Address</label>
              <input
                type="text"
                value={formData.officeAddress}
                onChange={(e) => setFormData({ ...formData, officeAddress: e.target.value })}
                placeholder="Gaibandha Sadar, Gaibandha 5700, Bangladesh"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Google Maps Embed / Navigation URL</label>
            <input
              type="text"
              value={formData.googleMapsUrl}
              onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
              placeholder="https://maps.google.com/..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none font-mono"
            />
          </div>
        </div>

        {/* Lead Capture Form Settings */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            Interactive Lead Form & Notification Automation
          </h3>

          <div className="flex items-center gap-2 pb-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={formData.formEnabled}
                onChange={(e) => setFormData({ ...formData, formEnabled: e.target.checked })}
                className="rounded bg-slate-800 border-slate-700 text-purple-600 focus:ring-0"
              />
              <span className="font-semibold text-white">Enable Inbound Contact & Strategy Call Form</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Admin Notification Email</label>
              <input
                type="email"
                value={formData.notificationEmail}
                onChange={(e) => setFormData({ ...formData, notificationEmail: e.target.value })}
                placeholder="sayedahmedsijan@gmail.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Submission Success Message</label>
              <input
                type="text"
                value={formData.successMessage}
                onChange={(e) => setFormData({ ...formData, successMessage: e.target.value })}
                placeholder="Thank you for reaching out! I will review your goals and respond within 24 hours."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:border-purple-500 outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
