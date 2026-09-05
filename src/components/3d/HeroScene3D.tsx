import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  Layers, 
  CheckCircle2, 
  Bot, 
  Sparkles, 
  ArrowUpRight, 
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { HERO_FLOATING_METRICS } from '../../data/portfolioData';

export const HeroScene3D: React.FC = () => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-[520px] lg:h-[620px] flex items-center justify-center perspective-1000 select-none overflow-hidden sm:overflow-visible">
      {/* 3D Stage Container responding to mouse */}
      <div
        className="relative w-full max-w-[500px] h-[460px] preserve-3d transition-transform duration-300 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${-mousePos.y * 12}deg) rotateY(${mousePos.x * 14}deg)`
        }}
      >
        {/* Background Depth Glow & Orbital Rings */}
        <div 
          className="absolute w-[360px] h-[360px] rounded-full border border-blue-500/20 animate-spin"
          style={{ 
            animationDuration: '30s',
            transform: `translateZ(-60px) rotateX(${45 + mousePos.y * 10}deg)` 
          }} 
        />
        <div 
          className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-emerald-500/20 animate-spin"
          style={{ 
            animationDuration: '45s',
            animationDirection: 'reverse',
            transform: `translateZ(-100px) rotateY(${30 + mousePos.x * 10}deg)` 
          }} 
        />

        {/* Central Core Holographic Hub */}
        <div 
          className="relative w-64 sm:w-72 p-5 rounded-2xl glass-panel-glow text-white shadow-2xl preserve-3d z-20"
          style={{
            transform: `translateZ(40px) scale(${1 + Math.abs(mousePos.x) * 0.02})`
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Live AI Ad Engine</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <Sparkles className="w-3 h-3" />
              <span>Optimizing</span>
            </div>
          </div>

          {/* Central Analytics Wave Chart */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Aggregated Client ROAS</p>
                <p className="text-2xl font-bold font-['Outfit'] text-white flex items-center gap-1.5">
                  4.38x
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-900/40 px-1.5 py-0.5 rounded flex items-center">
                    <TrendingUp className="w-3 h-3 inline mr-0.5" /> +147%
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-mono">24h Moving Avg</p>
                <p className="text-xs font-semibold text-blue-400 font-mono">$145.6k / Mo</p>
              </div>
            </div>

            {/* Dynamic SVG Sparkline Graph */}
            <div className="relative h-16 w-full bg-slate-900/80 rounded-lg p-2 border border-slate-800 overflow-hidden">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="metricGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,50 Q25,40 50,42 T100,28 T150,22 T200,8 L200,60 L0,60 Z"
                  fill="url(#metricGrad)"
                />
                <path
                  d="M0,50 Q25,40 50,42 T100,28 T150,22 T200,8"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Node Points */}
                <circle cx="50" cy="42" r="3" fill="#60a5fa" />
                <circle cx="100" cy="28" r="3" fill="#60a5fa" />
                <circle cx="150" cy="22" r="3.5" fill="#38bdf8" />
                <circle cx="200" cy="8" r="4.5" fill="#10b981" className="animate-pulse" />
              </svg>
            </div>

            {/* Quick Status Bar */}
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="bg-slate-900/70 p-1.5 rounded border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">PMax Bidding</span>
                <span className="text-emerald-400 font-mono font-bold">Auto</span>
              </div>
              <div className="bg-slate-900/70 p-1.5 rounded border border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-400">Meta CAPI</span>
                <span className="text-blue-400 font-mono font-bold">Active 9.2</span>
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING CARD 1: +147% ROAS (Top Left) */}
        <div
          className="absolute -top-6 -left-4 sm:-top-8 sm:-left-12 p-3.5 sm:p-4 rounded-xl glass-panel text-white shadow-xl preserve-3d animate-float-slow z-30 w-44 sm:w-52"
          style={{
            transform: `translateZ(${70 + mousePos.x * 20}px) translateY(${mousePos.y * -15}px)`
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="p-1.5 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
              <TrendingUp className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
              +147%
            </span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-['Outfit'] text-white">4.4x ROAS</div>
          <div className="text-[11px] text-slate-300 font-medium">Meta & Google Ads</div>
          <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Scaled from 1.8x baseline
          </div>
        </div>

        {/* FLOATING CARD 2: +82% Organic Traffic (Top Right) */}
        <div
          className="absolute -top-4 -right-4 sm:-top-6 sm:-right-10 p-3.5 sm:p-4 rounded-xl glass-panel text-white shadow-xl preserve-3d animate-float-reverse z-30 w-44 sm:w-52"
          style={{
            transform: `translateZ(${60 - mousePos.x * 18}px) translateY(${mousePos.y * 12}px)`
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="p-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20">
              +82%
            </span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-['Outfit'] text-white">+14.2k Visits</div>
          <div className="text-[11px] text-slate-300 font-medium">Technical SEO Lift</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Commercial intent queries</div>
        </div>

        {/* FLOATING CARD 3: -34% CPA (Bottom Left) */}
        <div
          className="absolute -bottom-6 -left-3 sm:-bottom-8 sm:-left-10 p-3.5 sm:p-4 rounded-xl glass-panel text-white shadow-xl preserve-3d animate-float-reverse z-30 w-44 sm:w-50"
          style={{
            transform: `translateZ(${85 + mousePos.y * 22}px) translateX(${mousePos.x * -12}px)`
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="p-1.5 bg-emerald-600/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <Target className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">
              -34% CPA
            </span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-['Outfit'] text-emerald-400">$22.80</div>
          <div className="text-[11px] text-slate-300 font-medium">Acquisition Cost</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Down from $38.50</div>
        </div>

        {/* FLOATING CARD 4: +61% Conversion Rate & Python Bot (Bottom Right) */}
        <div
          className="absolute -bottom-8 -right-3 sm:-bottom-10 sm:-right-8 p-3.5 sm:p-4 rounded-xl glass-panel text-white shadow-xl preserve-3d animate-float-slow z-30 w-44 sm:w-52"
          style={{
            transform: `translateZ(${75 - mousePos.y * 20}px) translateX(${mousePos.x * 15}px)`
          }}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="p-1.5 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-500/30">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-500/20 font-semibold">
              Python Bot
            </span>
          </div>
          <div className="text-lg sm:text-xl font-extrabold font-['Outfit'] text-white">+61% CVR</div>
          <div className="text-[11px] text-slate-300 font-medium">AI & CRO Sprints</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Automated bid reallocator</div>
        </div>

        {/* Small floating 3D badge nodes */}
        <div 
          className="absolute top-1/2 -right-12 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs text-blue-300 border border-blue-500/30"
          style={{ transform: `translateZ(100px) translateY(${mousePos.y * 30}px)` }}
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>Meta Advantage+</span>
        </div>

        <div 
          className="absolute top-1/3 -left-14 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-xs text-emerald-300 border border-emerald-500/30"
          style={{ transform: `translateZ(90px) translateY(${-mousePos.y * 25}px)` }}
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>GA4 Server CAPI</span>
        </div>
      </div>
    </div>
  );
};
