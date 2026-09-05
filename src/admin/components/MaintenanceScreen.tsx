import React from 'react';
import { Wrench, ShieldAlert, ArrowRight, MessageCircle } from 'lucide-react';

interface MaintenanceScreenProps {
  message?: string;
  onAdminLoginClick: () => void;
}

export function MaintenanceScreen({
  message = 'We are currently upgrading and deploying new systems. Please check back shortly.',
  onAdminLoginClick
}: MaintenanceScreenProps) {
  return (
    <div 
      id="maintenance-mode-screen"
      className="min-h-screen bg-[#080d19] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-['Plus_Jakarta_Sans']"
    >
      {/* Background glow backdrops */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-xl w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl relative z-10 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 shadow-lg shadow-red-950/40 animate-pulse">
          <Wrench className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-wider uppercase mb-4">
          <ShieldAlert className="w-4 h-4" /> Scheduled Maintenance
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
          Sayed Ahmed Sijan Portfolio
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-md">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a
            href="https://wa.me/8801763810310?text=Hi%20Sayed,%20I%20saw%20your%20portfolio%20maintenance%20page%20and%20want%20to%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
          >
            <MessageCircle className="w-4 h-4" /> Reach on WhatsApp
          </a>

          <button
            id="maintenance-admin-bypass-btn"
            onClick={onAdminLoginClick}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            Admin Sign In <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[11px] text-slate-500 mt-8">
          Authorized administrators can log in to bypass maintenance mode.
        </p>
      </div>
    </div>
  );
}
