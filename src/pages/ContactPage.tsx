import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Facebook,
  Send, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  MessageSquare,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { NavPage } from '../types/portfolio';
import { PERSONAL_INFO, SERVICES_LIST } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface ContactPageProps {
  initialService?: string;
  onNavigate: (page: NavPage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialService = '', onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: initialService || 'Meta Ads (Facebook & Instagram)',
    budget: '$2,000 - $5,000 / mo',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const budgetOptions = [
    '< $2,000 / mo',
    '$2,000 - $5,000 / mo',
    '$5,000 - $15,000 / mo',
    '$15,000+ / mo',
    'Fixed Project / Audit'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Initiate Collaboration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Let's Build Something That Grows.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Whether you want to scale profitable ROAS, build automated Python reporting scripts, or audit your entire acquisition funnel, reach out below. I typically respond within 12 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Direct Contact Details & 3D Interactive Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <Card3DTilt maxTilt={10} className="w-full">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel-glow border border-blue-500/30 space-y-6">
              
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden ring-2 ring-emerald-400/60 shadow-xl shrink-0">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                </div>
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Online & Available</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-white">{PERSONAL_INFO.name}</h3>
                  <p className="text-xs text-blue-400 font-medium">{PERSONAL_INFO.title}</p>
                </div>
              </div>

              {/* Direct Channels */}
              <div className="space-y-4 text-xs sm:text-sm">
                
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">Email Directly</span>
                    <span className="font-semibold text-slate-200">{PERSONAL_INFO.email}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-emerald-400 block font-mono">WhatsApp Fast Response</span>
                    <span className="font-semibold text-slate-200">{PERSONAL_INFO.phone}</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                </a>

                {/* Facebook */}
                <a
                  href={PERSONAL_INFO.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/40 text-slate-300 hover:text-white transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[11px] text-blue-400 block font-mono">Facebook Connect</span>
                    <span className="font-semibold text-slate-200 truncate">ahmedsijan310</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                </a>

                {/* Location */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                  <div className="p-2.5 rounded-lg bg-purple-600/20 text-purple-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">Location & Timezone</span>
                    <span className="font-semibold text-slate-200">{PERSONAL_INFO.location} (GMT+6 · Global Remote)</span>
                  </div>
                </div>

              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-blue-400 font-bold">
                  <Clock className="w-4 h-4" /> Response Commitment
                </div>
                <p className="leading-relaxed">
                  All campaign inquiries receive an initial technical audit perspective and roadmap within 24 hours.
                </p>
              </div>

            </div>
          </Card3DTilt>
        </div>

        {/* Right Column: Interactive Conversion Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-10 rounded-3xl glass-panel border border-slate-800 shadow-2xl relative">
            
            {isSubmitted ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold font-['Outfit'] text-white">Message Received!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>. I have received your request regarding <strong className="text-blue-400">{formData.service}</strong> and will get back to you shortly.
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all inline-flex items-center gap-2"
                  >
                    <span>Escalate on WhatsApp</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        service: 'Meta Ads (Facebook & Instagram)',
                        budget: '$2,000 - $5,000 / mo',
                        message: ''
                      });
                    }}
                    className="px-5 py-3 rounded-full text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold font-['Outfit'] text-white">Project Inquiry Form</h3>
                  <p className="text-xs text-slate-400">Fill in the parameters of your project to receive a tailored response.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Company / Website */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Company & Website URL</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Scale (apexscale.com)"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* Service Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Primary Service Desired</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white focus:outline-none transition-colors cursor-pointer"
                  >
                    {SERVICES_LIST.map((s) => (
                      <option key={s.id} value={s.title} className="bg-slate-900 text-white">
                        {s.title}
                      </option>
                    ))}
                    <option value="Full Acquisition Audit" className="bg-slate-900 text-white">
                      Full Acquisition Audit & Fractional Growth
                    </option>
                  </select>
                </div>

                {/* Budget Range */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Monthly Ad Spend or Project Budget</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetOptions.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                          formData.budget === b
                            ? 'bg-blue-600/30 text-blue-300 border-blue-500 font-semibold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Brief Overview of Goals / Challenge *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your current revenue run-rate, main bottlenecks, target CAC, and what success looks like in 90 days..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Sending Transmission...</span>
                  ) : (
                    <>
                      <span>Send Project Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
