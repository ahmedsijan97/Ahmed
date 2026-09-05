import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Layers
} from 'lucide-react';
import { NavPage, ExperienceItem } from '../types/portfolio';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface ExperiencePageProps {
  onNavigate: (page: NavPage) => void;
  onSelectExperience: (experience: ExperienceItem) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate, onSelectExperience }) => {
  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Professional Track Record</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Experience & Key Impact
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Over 5 years of scaling high-growth e-commerce brands, B2B software companies, and local service leaders through algorithmic advertising and technical performance systems.
        </p>
      </div>

      {/* Experience Cards Grid */}
      <div className="space-y-8">
        {EXPERIENCE_ITEMS.map((exp) => (
          <Card3DTilt key={exp.id} onClick={() => onSelectExperience(exp)} className="w-full">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all space-y-6 group">
              
              {/* Top Meta Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-600/30 text-blue-300 border border-blue-500/30 font-semibold font-mono">
                      {exp.type}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {exp.period}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {exp.location}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white mt-2 group-hover:text-blue-400 transition-colors">
                    {exp.position}
                  </h3>
                  <p className="text-sm text-blue-300 font-medium">{exp.company}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:text-emerald-400 self-start lg:self-auto">
                  <span>View Full Responsibilities</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Quantifiable Results Banner (Core Mandate from user prompt) */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> Quantifiable Impact
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {exp.quantifiableResults.map((q, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-emerald-950/25 border border-emerald-500/25 text-left space-y-1">
                      <p className="text-xs text-slate-400">{q.metric}</p>
                      <p className="text-sm font-bold text-white font-['Outfit']">{q.impact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities & Achievements preview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Core Scope</h4>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {exp.responsibilities.slice(0, 3).map((r, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span className="line-clamp-2">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Key Achievements</h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {exp.achievements.slice(0, 2).map((a, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs">{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tools tags */}
              <div className="pt-3 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-400 mr-1">Tools:</span>
                  {exp.tools.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-semibold text-slate-400">
                  Featured Case: <span className="text-slate-200">{exp.featuredProject}</span>
                </span>
              </div>

            </div>
          </Card3DTilt>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/50 via-slate-900 to-emerald-950/50 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <h3 className="text-xl font-bold font-['Outfit'] text-white">Looking to add high-impact growth firepower?</h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">Available for fractional growth leadership, consulting contracts, and campaign sprints.</p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all shrink-0"
        >
          Discuss Opportunities
        </button>
      </div>

    </div>
  );
};
