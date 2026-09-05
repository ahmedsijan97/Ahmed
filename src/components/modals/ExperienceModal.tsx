import React, { useEffect } from 'react';
import { X, Briefcase, Calendar, MapPin, CheckCircle2, TrendingUp, Layers, ArrowRight } from 'lucide-react';
import { ExperienceItem, NavPage } from '../../types/portfolio';

interface ExperienceModalProps {
  experience: ExperienceItem | null;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ experience, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (experience) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose]);

  if (!experience) return null;

  return (
    <div
      id="experience-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="experience-modal-content"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-slate-800 pb-6">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold">
                {experience.type}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {experience.period}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {experience.location}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              {experience.position}
            </h3>
            <p className="text-base text-blue-400 font-semibold">{experience.company}</p>
          </div>

          {/* Quantifiable Results */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Quantifiable Track Record
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {experience.quantifiableResults.map((res, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-center space-y-1">
                  <p className="text-xs text-slate-400">{res.metric}</p>
                  <p className="text-sm font-bold text-white">{res.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Achievements */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Achievements</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {experience.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-2 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Responsibilities */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Core Scope & Responsibilities</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {experience.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tools Deployed</h4>
            <div className="flex flex-wrap gap-2">
              {experience.tools.map((tool, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center gap-2"
            >
              <span>Discuss Similar Role / Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
