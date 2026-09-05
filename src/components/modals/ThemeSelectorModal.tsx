import React from 'react';
import { X, Check, Palette, Sparkles, Moon, Sun, Monitor } from 'lucide-react';
import { COLOR_THEMES, ColorThemeId, ThemeMode } from '../../types/theme';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: ColorThemeId;
  onSelectTheme: (themeId: ColorThemeId) => void;
  themeMode?: ThemeMode;
  onSelectThemeMode?: (mode: ThemeMode) => void;
}

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onSelectTheme,
  themeMode = 'dark',
  onSelectThemeMode,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      id="theme-selector-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="theme-selector-modal-container"
        className="w-full max-w-xl bg-[#0c1322]/95 border border-white/15 rounded-3xl shadow-2xl p-5 sm:p-7 overflow-hidden relative animate-in zoom-in-95 duration-200 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow behind modal */}
        <div className="absolute top-0 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-400 to-emerald-400 p-[1px] shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <span>Display & Color Themes</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">Toggle between Light/Dark mode and customize accent colors</p>
            </div>
          </div>
          <button 
            id="close-theme-modal-btn"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10 cursor-pointer"
            aria-label="Close theme selector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Mode Segmented Cards (Deep Night vs Professional Light) */}
        {onSelectThemeMode && (
          <div className="space-y-2 relative z-10">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-blue-400" />
              <span>Canvas Atmosphere Mode</span>
            </label>

            <div className="grid grid-cols-2 gap-3">
              {/* Deep Night Option */}
              <button
                id="select-mode-dark-btn"
                type="button"
                onClick={() => onSelectThemeMode('dark')}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer relative ${
                  themeMode === 'dark'
                    ? 'bg-blue-950/50 border-blue-500/50 ring-2 ring-blue-500/30 shadow-lg shadow-blue-950/40'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 shadow-inner">
                  <Moon className="w-5 h-5 text-blue-400 fill-blue-400/20" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Deep Night</p>
                    {themeMode === 'dark' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Obsidian dark canvas with glowing neon glassmorphism
                  </p>
                </div>
                {themeMode === 'dark' && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shadow">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Professional Light Option */}
              <button
                id="select-mode-light-btn"
                type="button"
                onClick={() => onSelectThemeMode('light')}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all text-left cursor-pointer relative ${
                  themeMode === 'light'
                    ? 'bg-amber-500/15 border-amber-500/50 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 shadow-inner">
                  <Sun className="w-5 h-5 text-amber-500 fill-amber-500/30" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-white">Professional Light</p>
                    {themeMode === 'light' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight">
                    Crisp studio white with high-contrast specular glass
                  </p>
                </div>
                {themeMode === 'light' && (
                  <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow font-bold">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Color Palette Section */}
        <div className="space-y-2 relative z-10 pt-1">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Accent Color Palette</span>
          </label>

          {/* Themes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[36vh] overflow-y-auto pr-1">
            {COLOR_THEMES.map((theme) => {
              const isSelected = currentTheme === theme.id;

              return (
                <button
                  key={theme.id}
                  id={`select-theme-${theme.id}`}
                  onClick={() => {
                    onSelectTheme(theme.id);
                  }}
                  className={`flex flex-col text-left p-3 rounded-2xl transition-all duration-200 relative group cursor-pointer border ${
                    isSelected
                      ? 'bg-white/10 border-white/30 shadow-lg shadow-black/40 ring-2 ring-white/20'
                      : 'bg-white/5 border-white/5 hover:bg-white/8 hover:border-white/15'
                  }`}
                >
                  {/* Active checkmark badge */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}

                  {/* Color swatches preview bar */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm ring-1 ring-white/20" 
                      style={{ backgroundColor: theme.previewColors[0] }} 
                    />
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm ring-1 ring-white/20" 
                      style={{ backgroundColor: theme.previewColors[1] }} 
                    />
                    <div 
                      className="w-4 h-4 rounded-full shadow-sm ring-1 ring-white/20" 
                      style={{ backgroundColor: theme.previewColors[2] }} 
                    />
                    <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider ml-auto">
                      {theme.category}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {theme.name}
                  </p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {theme.tagline}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info & Done CTA */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 relative z-10">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            Settings are saved automatically to your browser.
          </p>
          <button
            id="theme-modal-apply-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer shadow-lg ml-auto"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
