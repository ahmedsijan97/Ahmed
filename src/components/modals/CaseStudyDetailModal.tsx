import React, { useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  Target, 
  Sparkles, 
  Clock, 
  Building2, 
  ExternalLink,
  Zap,
  BarChart2,
  BookOpen
} from 'lucide-react';
import { CaseStudyItem, NavPage } from '../../types/portfolio';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudyItem | null;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({
  caseStudy,
  onClose,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      id="case-study-detail-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="case-study-detail-container"
        className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto text-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          id="case-study-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/70 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-all"
          aria-label="Close Case Study Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner with Image & Meta */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-t-2xl">
          <img
            src={caseStudy.heroImage}
            alt={caseStudy.title}
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-blue-600 font-semibold text-white">
                {caseStudy.industry}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {caseStudy.duration}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                {caseStudy.mainKPI}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Outfit'] text-white tracking-tight leading-tight">
              {caseStudy.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Client: <span className="text-white font-semibold">{caseStudy.client}</span> · Channels: <span className="text-blue-300">{caseStudy.channel}</span>
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Executive Summary */}
          <div className="p-4 sm:p-5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-slate-300 text-sm leading-relaxed">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
              <Target className="w-4 h-4" /> Executive Summary
            </h4>
            <p>{caseStudy.summary}</p>
          </div>

          {/* Section 1: The Challenge & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                The Challenge
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Target Objectives
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {caseStudy.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 2: Strategy Roadmap */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              Strategic Blueprint
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.strategy.map((strat, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                    0{i + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-snug">{strat}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Execution Stages */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              Execution Milestones
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {caseStudy.execution.map((exec, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 space-y-1.5">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    {exec.title}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">{exec.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Before vs After Analytics & Charts */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" />
              Before vs. After Impact Metrics
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {caseStudy.analytics.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <p className="text-[11px] text-slate-400 font-medium truncate">{item.kpi}</p>
                  <div className="flex items-center justify-center gap-2 text-xs font-mono">
                    <span className="text-slate-500 line-through">{item.before}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                    <span className="text-white font-bold text-sm">{item.after}</span>
                  </div>
                  <div className="inline-block text-[11px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                    {item.growth}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Key Lessons & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-purple-400" /> Key Insights & Takeaways
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {caseStudy.keyLessons.map((lesson, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-purple-400 font-bold">✓</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-400" /> Tech Stack & Tools Deployed
              </h4>
              <div className="flex flex-wrap gap-2">
                {caseStudy.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/40 via-slate-900 to-emerald-900/40 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-white">Want similar results for your business?</h4>
              <p className="text-xs text-slate-300">Let's analyze your current ad account and organic search funnel.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 shrink-0"
            >
              <span>Get Free Growth Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
