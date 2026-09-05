import React from 'react';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  Linkedin, 
  Facebook, 
  Github, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { NavPage } from '../../types/portfolio';
import { PERSONAL_INFO, SERVICES_LIST } from '../../data/portfolioData';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy, onOpenTerms, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 text-slate-400 text-sm overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-24 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/60">
          
          {/* Brand & Bio Column (2 cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full ring-2 ring-emerald-400/60 shadow-lg shadow-emerald-500/20 overflow-hidden shrink-0">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-lg tracking-tight">{PERSONAL_INFO.name}</h3>
                <p className="text-xs text-emerald-400 font-medium">{PERSONAL_INFO.title}</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              {PERSONAL_INFO.bio}
            </p>

            {/* Live Availability Status */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for selected Q3/Q4 projects</span>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all"
                aria-label="Facebook Profile"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-600/10 transition-all"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-600/10 transition-all"
                aria-label="WhatsApp Contact"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-600/10 transition-all"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Navigation</p>
            <ul className="space-y-2 text-xs">
              {(['home', 'about', 'experience', 'skills', 'case-studies', 'projects'] as NavPage[]).map((page) => (
                <li key={page}>
                  <button
                    onClick={() => {
                      onNavigate(page);
                      scrollToTop();
                    }}
                    className="hover:text-blue-400 transition-colors capitalize text-left"
                  >
                    {page.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services Links */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Core Services</p>
            <ul className="space-y-2 text-xs">
              {SERVICES_LIST.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <button
                    onClick={() => {
                      onNavigate('services');
                      scrollToTop();
                    }}
                    className="hover:text-emerald-400 transition-colors text-left"
                  >
                    {srv.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Details */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-200">Direct Contact</p>
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.email}</span>
              </a>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <p className="text-slate-500 text-[11px] pt-1">
                {PERSONAL_INFO.location}
              </p>
            </div>

            <button
              onClick={() => {
                onNavigate('contact');
                scrollToTop();
              }}
              className="w-full mt-3 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all text-center"
            >
              Book Strategy Call
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Sayed Ahmed Sijan. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => {
                if (onOpenPrivacy) onOpenPrivacy();
                else alert('Privacy Notice: This portfolio does not collect personal cookies or sell personal data. All inquiry submissions are encrypted.');
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => {
                if (onOpenTerms) onOpenTerms();
                else alert('Terms of Service: All strategies, case studies, and content are proprietary intellectual property of Sayed Ahmed Sijan.');
              }}
              className="hover:text-slate-300 transition-colors"
            >
              Terms of Engagement
            </button>

            {/* Admin CMS Portal Trigger */}
            <button
              id="footer-admin-link"
              onClick={() => {
                if (onOpenAdmin) {
                  onOpenAdmin();
                } else {
                  window.location.hash = 'admin';
                }
              }}
              className="flex items-center gap-1 text-slate-500 hover:text-purple-400 transition-colors"
              title="Admin CMS Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-500/70" />
              <span>Admin Portal</span>
            </button>

            {/* Back to Top Button */}
            <button
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-1 ml-2"
              aria-label="Back to top of page"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
