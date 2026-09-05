import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Sparkles, 
  Send, 
  Grid, 
  X, 
  User, 
  Award, 
  TrendingUp, 
  FolderGit2, 
  Star, 
  MessageSquare,
  ChevronRight,
  ExternalLink,
  Phone,
  Mail,
  Palette,
  Sun,
  Moon
} from 'lucide-react';
import { NavPage } from '../../types/portfolio';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ColorThemeId, ThemeMode } from '../../types/theme';

interface BottomNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  currentTheme?: ColorThemeId;
  themeMode?: ThemeMode;
  onToggleThemeMode?: () => void;
  onOpenThemeModal?: () => void;
}

interface BottomTab {
  id: NavPage | 'more';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRIMARY_TABS: BottomTab[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'services', label: 'Services', icon: Sparkles },
  { id: 'more', label: 'Explore', icon: Grid },
  { id: 'contact', label: 'Hire Me', icon: Send },
];

const ALL_PAGES: { id: NavPage; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
  { id: 'home', label: 'Home', icon: Home, desc: 'Hero, featured stats & core highlights' },
  { id: 'about', label: 'About Me', icon: User, desc: 'Background, marketing philosophy & journey' },
  { id: 'experience', label: 'Experience', icon: Briefcase, desc: 'Work history, roles & career milestones' },
  { id: 'skills', label: 'Skills & Tools', icon: TrendingUp, desc: 'Meta Ads, Google Ads, SEO & AI stack' },
  { id: 'services', label: 'Services', icon: Sparkles, desc: 'Full-funnel growth & paid acquisition' },
  { id: 'case-studies', label: 'Case Studies', icon: Award, desc: 'Real campaigns, ROAS & revenue metrics' },
  { id: 'projects', label: 'Projects', icon: FolderGit2, desc: 'Live campaigns & creative growth builds' },
  { id: 'certifications', label: 'Certifications', icon: Award, desc: 'Google, Meta & Hubspot accreditations' },
  { id: 'testimonials', label: 'Testimonials', icon: Star, desc: 'Client reviews, ratings & feedback' },
  { id: 'contact', label: 'Contact & Hire', icon: MessageSquare, desc: 'Book consultation or send inquiry' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ 
  currentPage, 
  onNavigate,
  themeMode = 'dark',
  onToggleThemeMode,
  onOpenThemeModal 
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
  const isLight = themeMode === 'light';

  const handleTabClick = (tabId: NavPage | 'more') => {
    if (tabId === 'more') {
      setShowMoreMenu(prev => !prev);
    } else {
      setShowMoreMenu(false);
      onNavigate(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageSelect = (pageId: NavPage) => {
    setShowMoreMenu(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isMoreActive = !['home', 'projects', 'services', 'contact'].includes(currentPage);

  return (
    <>
      {/* Slide-up Frosted Glass Sheet for "Explore / All Pages" */}
      {showMoreMenu && (
        <div 
          id="mobile-bottom-nav-backdrop"
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowMoreMenu(false)}
        >
          <div 
            id="mobile-bottom-nav-drawer"
            className="absolute bottom-20 inset-x-3 sm:inset-x-6 max-h-[75vh] bg-[#0c1322]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-4 sm:p-5 overflow-y-auto space-y-4 animate-in slide-in-from-bottom-5 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="relative w-9 h-9 rounded-full ring-2 ring-emerald-400/60 overflow-hidden shrink-0">
                  <img
                    src={PERSONAL_INFO.avatar}
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span>{PERSONAL_INFO.name}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </h3>
                  <p className="text-[10px] text-slate-400">Portfolio & Direct Sections</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {onToggleThemeMode && (
                  <button
                    id="mobile-sheet-mode-btn"
                    onClick={onToggleThemeMode}
                    className={`p-1.5 rounded-xl border transition-colors flex items-center gap-1 text-xs font-semibold px-2 cursor-pointer ${
                      isLight
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-700'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                    }`}
                    title={isLight ? 'Switch to Deep Night' : 'Switch to Professional Light'}
                    aria-label="Toggle Night/Light Mode"
                  >
                    {isLight ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                        <span>Light</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                        <span>Night</span>
                      </>
                    )}
                  </button>
                )}
                {onOpenThemeModal && (
                  <button
                    id="mobile-sheet-theme-btn"
                    onClick={() => {
                      setShowMoreMenu(false);
                      onOpenThemeModal();
                    }}
                    className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10 flex items-center gap-1.5 text-xs font-semibold px-2.5 cursor-pointer"
                    aria-label="Change color theme"
                  >
                    <Palette className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Colors</span>
                  </button>
                )}
                <button 
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
                  aria-label="Close navigation sheet"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid of Pages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ALL_PAGES.map((page) => {
                const IconComponent = page.icon;
                const isCurrent = currentPage === page.id;
                return (
                  <button
                    key={page.id}
                    id={`mobile-sheet-nav-${page.id}`}
                    onClick={() => handlePageSelect(page.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl text-left transition-all border ${
                      isCurrent
                        ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-lg shadow-blue-500/10'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isCurrent 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-white/10 text-slate-300'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <p className={`text-xs font-semibold ${isCurrent ? 'text-blue-300 font-bold' : 'text-slate-200'}`}>
                          {page.label}
                        </p>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{page.desc}</p>
                      </div>
                    </div>
                    {isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-400 shadow-sm shadow-blue-400"></span>
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Direct Contact Quick Links */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex-1 py-2 px-3 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-300 hover:bg-blue-500/25 transition-all text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Me</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Frosted Glass Bottom Navigation Bar (Mobile only: lg:hidden) */}
      <nav
        id="mobile-bottom-nav-bar"
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-3 inset-x-3 sm:inset-x-8 z-50"
      >
        <div className="bg-[#0b1120]/85 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.6)] px-2 py-1.5 sm:px-4 sm:py-2">
          <ul className="flex items-center justify-around gap-1">
            {PRIMARY_TABS.map((tab) => {
              const isSelected = tab.id === 'more' 
                ? (showMoreMenu || isMoreActive) 
                : currentPage === tab.id;
              const Icon = tab.icon;

              return (
                <li key={tab.id} className="flex-1">
                  <button
                    id={`mobile-tab-${tab.id}`}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 relative group cursor-pointer ${
                      isSelected
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {/* Active highlight background pill */}
                    {isSelected && (
                      <span 
                        className="absolute inset-0 rounded-xl bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-emerald-500/20 border border-blue-400/40 -z-10 shadow-inner"
                        aria-hidden="true"
                      />
                    )}

                    {/* Icon container */}
                    <div className="relative">
                      <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                        isSelected 
                          ? 'text-blue-400 scale-110' 
                          : 'group-hover:scale-105'
                      }`} />

                      {/* Dot indicator if active tab is in More menu */}
                      {tab.id === 'more' && isMoreActive && (
                        <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
                      )}
                    </div>

                    {/* Label */}
                    <span className={`text-[10px] sm:text-[11px] font-medium tracking-tight whitespace-nowrap ${
                      isSelected ? 'text-blue-300 font-semibold' : 'text-slate-400'
                    }`}>
                      {tab.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};
