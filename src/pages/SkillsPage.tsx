import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Bot, 
  Activity, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Terminal, 
  FileText, 
  ShieldCheck, 
  Code2, 
  Cpu, 
  PieChart, 
  DollarSign,
  Repeat
} from 'lucide-react';
import { NavPage, SkillCategory, SkillItem } from '../types/portfolio';
import { SKILLS_LIST, SKILL_CATEGORIES } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface SkillsPageProps {
  onNavigate: (page: NavPage) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('All');

  const filteredSkills = selectedCategory === 'All'
    ? SKILLS_LIST
    : SKILLS_LIST.filter((s) => s.category === selectedCategory);

  const getLevelBadge = (level: SkillItem['level']) => {
    switch (level) {
      case 'Advanced':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Professional':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/40';
      case 'Working Knowledge':
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Technical Competencies</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Skills & Systems Matrix
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Categorized across paid media, search infrastructure, autonomous Python scripting, generative AI systems, and multi-touch attribution. Rated with qualitative industry seniority standards.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {SKILL_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <Card3DTilt key={skill.id} className="h-full">
            <div className="h-full p-6 rounded-2xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-5 group">
              
              <div className="space-y-4">
                {/* Header with Category & Level */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    {skill.category}
                  </span>
                  <span className={`text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full border ${getLevelBadge(skill.level)}`}>
                    {skill.level}
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-lg font-bold font-['Outfit'] text-white group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Real-World Related Projects */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Deployed In:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.relatedProjects.map((p, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-500/20 text-[11px]">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tools & Tech stack */}
              <div className="pt-3 border-t border-slate-800/70 space-y-2">
                <div className="flex flex-wrap gap-1.5">
                  {skill.tools.map((tool, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </Card3DTilt>
        ))}
      </div>

      {/* Bottom Cross-Navigation */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Want to see these skills in real production campaigns?</h4>
          <p className="text-xs text-slate-400 mt-0.5">Explore full case studies detailing challenges, solutions, and measurable revenue gains.</p>
        </div>
        <button
          onClick={() => onNavigate('case-studies')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md flex items-center gap-2 shrink-0"
        >
          <span>Explore Case Studies</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
