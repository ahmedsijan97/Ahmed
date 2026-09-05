import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Compass, 
  GraduationCap, 
  TrendingUp, 
  Bot, 
  Cpu, 
  Target, 
  Zap, 
  BarChart2, 
  Layers, 
  ChevronDown, 
  ChevronUp,
  Award,
  BookOpen,
  Code2,
  ShieldCheck
} from 'lucide-react';
import { NavPage } from '../types/portfolio';
import { PERSONAL_INFO, TIMELINE_ITEMS, HOW_I_WORK_STEPS } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [expandedTimelineId, setExpandedTimelineId] = useState<string>('timeline-4');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const toggleTimeline = (id: string) => {
    setExpandedTimelineId((prev) => (prev === id ? '' : id));
  };

  const activeStep = HOW_I_WORK_STEPS[activeStepIndex];

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header with Executive Profile Spotlight Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Bio & Mission Statement */}
        <div className="lg:col-span-7 space-y-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Sayed Ahmed Sijan</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white leading-tight">
            Where Scientific Rigor Meets Modern AI Growth.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {PERSONAL_INFO.bio}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="about-cta-hire"
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 cursor-pointer"
            >
              <span>Work With Me</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-200 glass-panel hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Quick Chat</span>
            </a>
          </div>
        </div>

        {/* Right: Executive Portrait Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <Card3DTilt maxTilt={10} className="w-full max-w-md">
            <div className="relative p-6 rounded-3xl glass-card-glow border border-white/15 overflow-hidden space-y-5">
              
              {/* Profile Image & Badges */}
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-2 ring-emerald-400/50 shadow-2xl shrink-0">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-slate-900 shadow-md" />
                </div>

                <div className="space-y-1.5 text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-300">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Specialist</span>
                  </div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-white">{PERSONAL_INFO.name}</h3>
                  <p className="text-xs text-blue-300 font-medium leading-snug">{PERSONAL_INFO.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-300" />
                    <span>B.Sc (Honours) in Science</span>
                  </p>
                </div>
              </div>

              {/* Quick Credentials Strip */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-800/80 text-left">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Location</p>
                  <p className="text-xs font-semibold text-slate-200 truncate">Bangladesh / Global</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-mono">Track Record</p>
                  <p className="text-xs font-semibold text-emerald-400">80+ Scaled Brands</p>
                </div>
              </div>

            </div>
          </Card3DTilt>
        </div>

      </div>

      {/* Philosophy & Approach Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <Card3DTilt className="h-full">
          <div className="p-6 rounded-2xl glass-panel h-full space-y-4 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-white">Career Philosophy</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "Marketing is not intuition—it is an empirical feedback loop." Grounded in scientific principles from my Bachelor of Science background, I treat every ad campaign as a controlled hypothesis test designed to isolate variables and maximize return on capital.
            </p>
          </div>
        </Card3DTilt>

        <Card3DTilt className="h-full">
          <div className="p-6 rounded-2xl glass-panel h-full space-y-4 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-white">Marketing Approach</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Full-funnel integration over siloed channels. Paid social creates latent demand; Google search captures ready-to-buy intent; technical SEO protects long-term brand equity; and server-side tracking provides unshakeable attribution clarity.
            </p>
          </div>
        </Card3DTilt>

        <Card3DTilt className="h-full">
          <div className="p-6 rounded-2xl glass-panel h-full space-y-4 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-['Outfit'] text-white">AI & Automation Mindset</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              AI shouldn't create generic spam—it should automate operational friction. By building custom Python scripts and prompt engineering matrices, I eliminate 20+ hours of weekly manual work and unlock 10x faster creative testing velocity.
            </p>
          </div>
        </Card3DTilt>

      </div>

      {/* 3D Interactive Career Timeline */}
      <section id="career-timeline-section" className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-400 uppercase font-mono tracking-wider">
            Interactive Career Progression
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
            Evolution from Scientific Research to AI Performance
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click on any career milestone below to expand in-depth achievements, tools, and key wins.
          </p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
          {TIMELINE_ITEMS.map((item) => {
            const isExpanded = expandedTimelineId === item.id;
            return (
              <div key={item.id} className="relative group">
                {/* Node circle on timeline line */}
                <div 
                  className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                    isExpanded 
                      ? 'bg-blue-600 border-blue-400 ring-4 ring-blue-500/20' 
                      : 'bg-slate-900 border-slate-700 group-hover:border-blue-400'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                {/* Timeline Card */}
                <div 
                  onClick={() => toggleTimeline(item.id)}
                  className={`p-5 sm:p-6 rounded-2xl glass-panel border transition-all cursor-pointer ${
                    isExpanded ? 'border-blue-500/50 bg-slate-900/90 shadow-xl shadow-blue-500/10' : 'border-slate-800/90 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {item.period}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white mt-1.5">
                        {item.role}
                      </h3>
                      <p className="text-xs text-blue-400 font-medium">{item.company} · {item.location}</p>
                    </div>

                    <button 
                      className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white self-start sm:self-auto"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Expandable Section */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-4 animate-in fade-in duration-200">
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">Detailed Scope & Initiatives</h4>
                        <ul className="space-y-1.5 text-xs text-slate-400">
                          {item.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Key Wins</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.keyWins.map((win, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-xs text-slate-300 flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{win}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tools.map((tool, i) => (
                          <span key={i} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300">
                            {tool}
                          </span>
                        ))}
                      </div>

                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* "HOW I WORK" 7-STEP INTERACTIVE VISUAL PROCESS */}
      <section id="how-i-work-interactive-process" className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
            Execution Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
            "How I Work" — The 7-Stage Growth Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click through the steps below to inspect deliverables, diagnostic tools, and key outcomes for each phase.
          </p>
        </div>

        {/* Step Buttons Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {HOW_I_WORK_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">0{step.step}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
                <div className="font-bold text-xs sm:text-sm mt-1">{step.title}</div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Card */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-blue-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase px-2 py-0.5 rounded bg-blue-950 border border-blue-500/30">
                  Step 0{activeStep.step} of 07
                </span>
                <span className="text-xs text-emerald-400 font-mono">{activeStep.highlight}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white mt-1.5">
                {activeStep.title}: {activeStep.subtitle}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 disabled:opacity-40 hover:bg-slate-700"
              >
                Previous
              </button>
              <button
                disabled={activeStepIndex === HOW_I_WORK_STEPS.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(HOW_I_WORK_STEPS.length - 1, prev + 1))}
                className="px-3 py-1.5 rounded-lg bg-blue-600 text-xs font-semibold text-white disabled:opacity-40 hover:bg-blue-500"
              >
                Next Step
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Phase Objective & Implementation
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Key Phase Deliverables
              </h4>
              <ul className="space-y-2">
                {activeStep.deliverables.map((del, i) => (
                  <li key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Background & Credentials Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Academic Qualifications & Research</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {PERSONAL_INFO.academicBackground} · Strong quantitative modeling and biological research foundations applied to digital growth.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('experience')}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2 shrink-0"
        >
          <span>View Experience & Roles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
