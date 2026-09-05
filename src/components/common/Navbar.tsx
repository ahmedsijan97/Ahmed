import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Mail, 
  Briefcase, 
  Phone, 
  FileText,
  ChevronRight,
  Palette,
  Sun,
  Moon
} from 'lucide-react';
import { NavPage } from '../../types/portfolio';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ColorThemeId, COLOR_THEMES, ThemeMode } from '../../types/theme';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  currentTheme: ColorThemeId;
  themeMode: ThemeMode;
  onToggleThemeMode: () => void;
  onOpenThemeModal: () => void;
}

const NAV_ITEMS: { id: NavPage; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'services', label: 'Services' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  onNavigate,
  currentTheme,
  themeMode,
  onToggleThemeMode,
  onOpenThemeModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const activeThemeObj = COLOR_THEMES.find(t => t.id === currentTheme) || COLOR_THEMES[0];
  const isLight = themeMode === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/75 backdrop-blur-2xl border-b border-white/10 shadow-2xl py-3'
          : 'bg-slate-950/40 backdrop-blur-xl border-b border-white/10 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-brand-logo"
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        >
          <div className="relative w-10 h-10 rounded-full ring-2 ring-emerald-400/60 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-all overflow-hidden">
            <img
              src={PERSONAL_INFO.avatar}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-slate-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight text-base sm:text-lg group-hover:text-emerald-400 transition-colors">
                Sayed Ahmed Sijan
              </span>
              <span className="hidden xl:inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wide font-medium hidden sm:block">
              Digital Marketer & AI Specialist
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative cursor-pointer ${
                  isActive
                    ? 'text-white bg-blue-600 shadow-md shadow-blue-600/40 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action CTA & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Mode Switcher Button (Deep Night vs Professional Light) */}
          <button
            id="nav-theme-mode-toggle"
            onClick={onToggleThemeMode}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-sm border ${
              isLight
                ? 'text-amber-700 bg-amber-500/10 hover:bg-amber-500/15 border-amber-500/30 shadow-amber-500/10'
                : 'text-slate-200 bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20'
            }`}
            title={isLight ? 'Switch to Deep Night Mode' : 'Switch to Professional Light Mode'}
            aria-label={isLight ? 'Switch to Deep Night Mode' : 'Switch to Professional Light Mode'}
          >
            {isLight ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                <span className="hidden xl:inline text-[11px] font-medium text-amber-900">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                <span className="hidden xl:inline text-[11px] font-medium text-slate-300">Night</span>
              </>
            )}
          </button>

          {/* Palette Theme Selector Button */}
          <button
            id="nav-theme-palette-btn"
            onClick={onOpenThemeModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer shadow-sm hover:border-white/20"
            title="Change Website Color Palette"
            aria-label="Change Color Theme"
          >
            <div className="flex items-center -space-x-1">
              <span className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900" style={{ backgroundColor: activeThemeObj.previewColors[0] }} />
              <span className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900" style={{ backgroundColor: activeThemeObj.previewColors[1] }} />
            </div>
            <Palette className="w-3.5 h-3.5 text-cyan-400 ml-0.5" />
            <span className="hidden xl:inline text-[11px] text-slate-300">Theme</span>
          </button>

          <button
            id="nav-hire-me-btn"
            onClick={() => handleNavClick('contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mobile Menu Trigger Button */}
        <div className="flex items-center gap-1.5 lg:hidden">
          {/* Quick Mode Toggle for Mobile */}
          <button
            id="nav-mobile-mode-toggle"
            onClick={onToggleThemeMode}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isLight
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-700'
                : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
            }`}
            aria-label={isLight ? 'Switch to Deep Night Mode' : 'Switch to Professional Light Mode'}
            title={isLight ? 'Switch to Deep Night' : 'Switch to Professional Light'}
          >
            {isLight ? (
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
            ) : (
              <Moon className="w-4 h-4 text-blue-400 fill-blue-400/20" />
            )}
          </button>

          <button
            id="nav-mobile-palette-btn"
            onClick={onOpenThemeModal}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
            aria-label="Change Color Palette"
          >
            <Palette className="w-4 h-4 text-cyan-400" />
          </button>
          <button
            id="nav-mobile-hire-btn"
            onClick={() => handleNavClick('contact')}
            className="px-3 py-1.5 rounded-full text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500"
          >
            Hire Me
          </button>
          <button
            id="nav-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden fixed inset-x-0 top-[65px] bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 shadow-2xl p-5 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
            <span>Navigation Pages</span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              {PERSONAL_INFO.badge}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          {/* Quick Contact Box in Mobile Drawer */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 pt-3">
            <p className="text-xs font-semibold text-slate-200">Direct Inquiries</p>
            <div className="flex flex-col gap-2 text-xs text-slate-400">
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <a 
                href={PERSONAL_INFO.whatsappUrl} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{PERSONAL_INFO.phone} (WhatsApp)</span>
              </a>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold text-center text-white bg-gradient-to-r from-blue-600 to-emerald-500 shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
