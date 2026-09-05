import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Search, 
  Bot, 
  Layers, 
  CheckCircle2, 
  Award, 
  ShieldCheck, 
  Briefcase, 
  ChevronRight,
  ExternalLink,
  Zap,
  Target
} from 'lucide-react';
import { NavPage, CaseStudyItem } from '../types/portfolio';
import { 
  PERSONAL_INFO, 
  TRUST_STATS, 
  SERVICES_LIST, 
  CASE_STUDIES, 
  SKILLS_LIST, 
  TESTIMONIALS_LIST 
} from '../data/portfolioData';
import { HeroScene3D } from '../components/3d/HeroScene3D';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectCaseStudy }) => {
  return (
    <div className="relative w-full space-y-20 sm:space-y-28 overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section id="hero-section" className="relative pt-28 sm:pt-36 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParticleCanvas particleCount={35} className="opacity-50" />
        
        {/* Ambient Top Lighting */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-72 bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Hero Copy & Value Proposition (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            
            {/* Hero Author & Status Badge */}
            <div className="flex flex-wrap items-center gap-3">
              <div 
                id="hero-profile-pill"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2.5 p-1.5 pr-4 rounded-full glass-card border border-white/15 cursor-pointer group shadow-lg hover:border-emerald-400/40"
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-emerald-400/60 shadow-md">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1">
                    <span>{PERSONAL_INFO.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Senior Growth & AI Strategist</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-xs font-semibold text-emerald-300 border border-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="tracking-wider uppercase font-mono text-[10px]">
                  {PERSONAL_INFO.badge}
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold font-['Outfit'] tracking-tight text-white leading-[1.12]">
                I Turn Marketing Data Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400">
                  Measurable Growth.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                {PERSONAL_INFO.supportingText}
              </p>
            </div>

            {/* CTA Buttons Hierarchy */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2">
              {/* Primary CTA */}
              <button
                id="hero-cta-case-studies"
                onClick={() => onNavigate('case-studies')}
                className="group px-7 py-3.5 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <span>View Case Studies</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-cta-hire-me"
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 rounded-full text-sm font-semibold text-slate-200 glass-panel hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <span>Hire Me</span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </button>

              {/* Tertiary small link */}
              <button
                id="hero-cta-experience"
                onClick={() => onNavigate('experience')}
                className="text-xs sm:text-sm font-medium text-slate-400 hover:text-blue-400 underline underline-offset-4 decoration-slate-700 hover:decoration-blue-400 transition-colors py-2 px-1"
              >
                Explore My Experience →
              </button>
            </div>

            {/* Core Capability Badges */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2.5 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Core Expertise:</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-blue-300">Meta Ads (CAPI)</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-300">Google PPC & PMax</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-sky-300">Technical SEO</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-purple-300">Python Automation</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400">Generative AI</span>
            </div>

          </div>

          {/* Right Column: 3D Interactive Hero Scene (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <HeroScene3D />
          </div>

        </div>
      </section>

      {/* ================= TRUST / SOCIAL PROOF METRICS BAR ================= */}
      <section id="trust-metrics-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800/90 shadow-2xl relative overflow-hidden">
          {/* Subtle accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600" />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6' : ''} space-y-1.5`}>
                <div className="text-3xl sm:text-4xl font-extrabold font-['Outfit'] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-300">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200">{stat.label}</p>
                <p className="text-[11px] text-slate-400 leading-snug">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CORE SERVICES SECTION (PREVIEW) ================= */}
      <section id="services-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Growth Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-white">
              Data-Driven Services Built To Scale
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              High-performance acquisition funnels, algorithmic ad management, and automated Python workflows.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 group"
          >
            <span>View All 6 Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_LIST.slice(0, 6).map((service) => (
            <Card3DTilt key={service.id} onClick={() => onNavigate('services')} className="h-full">
              <div className="h-full p-6 rounded-2xl glass-panel hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-5 group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                      {service.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-white group-hover:text-blue-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                    {service.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-emerald-400 transition-colors">
                  <span>Explore Service</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* ================= FEATURED CASE STUDIES (PREVIEW) ================= */}
      <section id="case-studies-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
              <Target className="w-3.5 h-3.5" /> Proven Results
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-['Outfit'] text-white">
              Featured Growth Case Studies
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Real commercial case studies following Problem → Strategy → Execution → Measurable Result.
            </p>
          </div>

          <button
            onClick={() => onNavigate('case-studies')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 group"
          >
            <span>Explore All Case Studies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CASE_STUDIES.slice(0, 2).map((cs) => (
            <Card3DTilt key={cs.id} onClick={() => onSelectCaseStudy(cs)} className="h-full">
              <div className="h-full rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition-all overflow-hidden flex flex-col justify-between group">
                
                {/* Thumbnail Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                  <img
                    src={cs.heroImage}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-white font-semibold text-xs backdrop-blur-md">
                      {cs.industry}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/30">
                      {cs.mainKPI}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold font-['Outfit'] text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {cs.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {cs.summary}
                  </p>

                  {/* Before vs After Metric Strip */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <p className="text-[10px] text-slate-400 font-mono">ROAS / Growth</p>
                      <p className="text-sm font-bold text-emerald-400 font-mono">
                        {cs.analytics[0]?.growth || '+104%'}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <p className="text-[10px] text-slate-400 font-mono">Cost Per Acq (CPA)</p>
                      <p className="text-sm font-bold text-blue-400 font-mono">
                        {cs.analytics[1]?.growth || '-38%'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs font-bold text-white group-hover:text-emerald-400">
                    <span>View Deep Dive Breakdown</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* ================= "HOW I WORK" 7-STEP TEASER ================= */}
      <section id="process-teaser-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 space-y-8 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-400 font-mono uppercase tracking-wider">
              The Scientific Growth Flywheel
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
              7-Step Systematic Scaling Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              We replace guesswork with structured execution: Understand → Analyze → Strategize → Execute → Automate → Optimize → Scale.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-left">
            {[
              { num: '01', title: 'Understand', desc: 'Unit Economics' },
              { num: '02', title: 'Analyze', desc: 'Data & Tracking' },
              { num: '03', title: 'Strategize', desc: 'Omni Blueprint' },
              { num: '04', title: 'Execute', desc: 'DCT & Launch' },
              { num: '05', title: 'Automate', desc: 'Python & AI' },
              { num: '06', title: 'Optimize', desc: 'CPA Reduction' },
              { num: '07', title: 'Scale', desc: 'Uncapped Growth' },
            ].map((step, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <span className="font-mono text-xs font-bold text-blue-400">{step.num}</span>
                <p className="text-xs font-bold text-white">{step.title}</p>
                <p className="text-[11px] text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all inline-flex items-center gap-2"
            >
              <span>Explore The Full Working Methodology</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL PREVIEW ================= */}
      <section id="testimonials-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-blue-400 font-mono uppercase tracking-wider">
              Client Endorsements
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white mt-1">
              What Founders & Directors Say
            </h2>
          </div>
          <button
            onClick={() => onNavigate('testimonials')}
            className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
          >
            <span>Read All 5 Endorsements</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_LIST.slice(0, 2).map((t) => (
            <div key={t.id} className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-blue-500/30"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.position}, {t.company}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 text-xs">
                  {'★'.repeat(t.rating)}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                "{t.testimonial}"
              </p>
              <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                Key Result: {t.resultHighlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HIGH CONVERTING BOTTOM CTA BANNER ================= */}
      <section id="bottom-cta-banner" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-blue-900/60 via-slate-900 to-emerald-950/60 border border-blue-500/40 shadow-2xl text-center space-y-6 overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ready To Unlock Predictable Profitable Scale?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white max-w-3xl mx-auto leading-tight">
            Let's Build An Acquisition Engine That Grows Your Business.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Whether you need to scale Meta ROAS, reduce Google PPC CPA, overhaul technical SEO, or automate marketing workflows with Python & AI, let's connect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-4 rounded-full text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>Book Growth Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-4 rounded-full text-sm font-semibold text-slate-200 glass-panel hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Instant WhatsApp Chat</span>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </a>
          </div>

        </div>
      </section>

    </div>
  );
};
