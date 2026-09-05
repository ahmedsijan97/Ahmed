import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, TrendingUp, Layers, ArrowRight } from 'lucide-react';
import { ProjectItem, NavPage } from '../../types/portfolio';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (page: NavPage) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onNavigate }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      id="project-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-60 sm:h-72 w-full overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover brightness-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
            <span className="px-2.5 py-1 rounded-md bg-blue-600 font-semibold text-xs text-white">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] text-white">
              {project.title}
            </h3>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Full description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Overview</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{project.fullDescription}</p>
          </div>

          {/* Key Outcome / Result */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide">Quantifiable Impact</p>
              <p className="text-sm font-semibold text-white mt-0.5">{project.result}</p>
            </div>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                <p className="text-xs text-slate-400">{m.label}</p>
                <p className="text-base font-bold font-mono text-blue-400 mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Tools */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Technology & Tools</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30 flex items-center gap-2"
            >
              <span>Build A Similar Solution</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
