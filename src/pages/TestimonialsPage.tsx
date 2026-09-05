import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Star, 
  CheckCircle2, 
  Pause, 
  Play, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { NavPage } from '../types/portfolio';
import { TESTIMONIALS_LIST } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface TestimonialsPageProps {
  onNavigate: (page: NavPage) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered]);

  const current = TESTIMONIALS_LIST[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_LIST.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_LIST.length) % TESTIMONIALS_LIST.length);
  };

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Client Feedback & Impact</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Trusted by Growth Founders & Marketing Leaders
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Hear directly from e-commerce founders, SaaS executives, and agency directors who have scaled their acquisition pipelines and unlocked record ROAS.
        </p>
      </div>

      {/* Interactive 3D Featured Slider */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative max-w-4xl mx-auto"
      >
        <Card3DTilt maxTilt={8} scale={1.01} className="w-full">
          <div className="p-8 sm:p-12 rounded-3xl glass-panel-glow border border-blue-500/30 space-y-8 relative overflow-hidden">
            
            {/* Background Big Quote Icon Watermark */}
            <Quote className="absolute -top-4 -right-4 w-36 h-36 text-white/5 pointer-events-none rotate-12" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/40 shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white">{current.name}</h3>
                  <p className="text-xs sm:text-sm text-blue-400 font-medium">{current.position}</p>
                  <p className="text-xs text-slate-400">{current.company}</p>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-1">
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(current.rating)}
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                  {current.projectType}
                </span>
              </div>
            </div>

            {/* Testimonial Quote */}
            <p className="text-base sm:text-xl text-slate-200 leading-relaxed font-normal italic relative z-10">
              "{current.testimonial}"
            </p>

            {/* Result Highlight Box */}
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300 font-medium">Quantified Outcome:</span>
                <span className="text-xs font-bold text-emerald-300">{current.resultHighlight}</span>
              </div>

              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Partner
              </span>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all text-xs flex items-center gap-1.5"
                  aria-label={isPlaying ? 'Pause autoplay' : 'Resume autoplay'}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{isPlaying ? 'Autoplay On' : 'Paused'}</span>
                </button>

                <div className="flex gap-1.5 ml-2">
                  {TESTIMONIALS_LIST.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === i ? 'w-6 bg-blue-500' : 'w-2 bg-slate-700 hover:bg-slate-600'
                      }`}
                      aria-label={`Jump to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </Card3DTilt>
      </div>

      {/* Grid of all endorsements */}
      <div className="space-y-6 pt-6">
        <h3 className="text-xl font-bold font-['Outfit'] text-white">All Client Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS_LIST.map((t) => (
            <Card3DTilt key={t.id} className="h-full">
              <div className="h-full p-6 rounded-2xl glass-panel border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover border border-blue-500/30"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{t.name}</h4>
                        <p className="text-[11px] text-slate-400 truncate">{t.company}</p>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 text-xs">
                      {'★'.repeat(t.rating)}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{t.testimonial}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 font-medium">
                  {t.resultHighlight}
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">Ready to become our next success story?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Let's discuss how we can engineer similar double-digit ROAS improvements and automated efficiency for your business.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="px-8 py-3.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
        >
          <span>Schedule Strategy Session</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
