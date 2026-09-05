import React, { useState } from 'react';
import { 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  TrendingUp, 
  ChevronRight, 
  Filter,
  Layers
} from 'lucide-react';
import { NavPage, ProjectItem, ProjectCategory } from '../types/portfolio';
import { PROJECTS_GALLERY } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface ProjectsPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const categories: ProjectCategory[] = [
    'All',
    'Marketing Campaigns',
    'SEO Projects',
    'AI Automation',
    'Analytics Dashboards',
    'Creative Projects'
  ];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_GALLERY
    : PROJECTS_GALLERY.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Featured Implementations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Portfolio & Production Projects
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Explore production AI bots, real-time Looker Studio data command cockpits, high-velocity creative matrices, and multi-channel acquisition campaigns.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card3DTilt key={project.id} onClick={() => onSelectProject(project)} className="h-full">
            <div className="h-full rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer">
              
              <div>
                {/* Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-white text-[11px] font-semibold backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-['Outfit'] text-white group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Impact Result Box */}
                  <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-200 font-medium leading-snug">{project.result}</p>
                  </div>

                  {/* Metrics preview */}
                  <div className="grid grid-cols-3 gap-2 text-center pt-1">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                        <p className="text-[10px] text-slate-400 truncate">{m.label}</p>
                        <p className="text-xs font-bold font-mono text-blue-400">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-emerald-400">
                <span>View Full System Details</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>

            </div>
          </Card3DTilt>
        ))}
      </div>

    </div>
  );
};
