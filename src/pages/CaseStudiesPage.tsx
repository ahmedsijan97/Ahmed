import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { NavPage, CaseStudyItem } from '../types/portfolio';
import { CASE_STUDIES } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface CaseStudiesPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyItem) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onNavigate, onSelectCaseStudy }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  const industries = ['All', 'E-commerce & Health/Wellness', 'B2B SaaS / Enterprise Software', 'Home Services / Multi-Location', 'Luxury Fashion & Apparel'];

  const filteredCaseStudies = selectedIndustry === 'All'
    ? CASE_STUDIES
    : CASE_STUDIES.filter((cs) => cs.industry === selectedIndustry);

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-emerald-400 font-mono">
          <Target className="w-3.5 h-3.5" />
          <span>Case Studies & ROI Records</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Scientific Growth Case Studies
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Detailed breakdowns following <strong className="text-white">Problem → Strategy → Execution → Measurable Result</strong>. Click any case study to explore full before vs after metrics and analytics charts.
        </p>
      </div>

      {/* Industry Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
          <Filter className="w-3.5 h-3.5" /> Filter by:
        </span>
        {industries.map((ind) => {
          const isActive = selectedIndustry === ind;
          return (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-600/30'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {ind === 'All' ? 'All Industries' : ind.split('/')[0]}
            </button>
          );
        })}
      </div>

      {/* Case Studies Visual List */}
      <div className="space-y-12">
        {filteredCaseStudies.map((cs, idx) => (
          <Card3DTilt key={cs.id} onClick={() => onSelectCaseStudy(cs)} className="w-full">
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all space-y-6 group cursor-pointer">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Hero Thumbnail (5 cols) */}
                <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-800">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-xs font-semibold backdrop-blur-md">
                      {cs.industry}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30 inline-block font-bold">
                      {cs.mainKPI}
                    </span>
                  </div>
                </div>

                {/* Content & 4-Pillars (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-1">
                      <span>Client: {cs.client}</span>
                      <span>•</span>
                      <span>{cs.duration}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white group-hover:text-emerald-400 transition-colors leading-snug">
                      {cs.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {cs.summary}
                    </p>
                  </div>

                  {/* Problem & Strategy Summary Boxes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="text-red-400 font-bold uppercase tracking-wider block text-[10px]">Problem</span>
                      <p className="text-slate-300 line-clamp-2">{cs.challenge}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                      <span className="text-emerald-400 font-bold uppercase tracking-wider block text-[10px]">Strategy</span>
                      <p className="text-slate-300 line-clamp-2">{cs.strategy[0]}</p>
                    </div>
                  </div>

                  {/* Before vs After Metric Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {cs.analytics.map((a, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                        <p className="text-[10px] text-slate-400 truncate">{a.kpi}</p>
                        <p className="text-xs font-bold text-white mt-0.5">{a.after}</p>
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">{a.growth}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tools.slice(0, 4).map((tool, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
                          {tool}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Complete Case Study <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>

                </div>

              </div>

            </div>
          </Card3DTilt>
        ))}
      </div>

    </div>
  );
};
