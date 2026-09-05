import React, { useState } from 'react';
import { X, RefreshCw, Monitor, Tablet, Smartphone, ExternalLink } from 'lucide-react';

interface LivePreviewDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LivePreviewDrawer({ isOpen, onClose }: LivePreviewDrawerProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [key, setKey] = useState<number>(0);

  if (!isOpen) return null;

  const deviceWidthClasses = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-[768px] max-w-full',
    mobile: 'w-[390px] max-w-full'
  };

  const reloadIframe = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div 
      id="live-preview-modal-backdrop"
      className="fixed inset-0 z-[9500] flex flex-col bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Top Controller Bar */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-950 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Portfolio Preview
          </span>

          <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setDevice('desktop')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                device === 'desktop' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                device === 'tablet' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
                device === 'mobile' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={reloadIframe}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors flex items-center gap-1 text-xs"
            title="Reload Preview"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 hover:text-white rounded-xl border border-slate-700 flex items-center gap-1.5 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Open in Tab
          </a>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/80">
        <div className={`${deviceWidthClasses[device]} h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-purple-950/30 transition-all duration-300 relative`}>
          <iframe
            key={key}
            src="/"
            title="Portfolio Live Preview"
            className="w-full h-full border-0 bg-[#080d19]"
          />
        </div>
      </div>
    </div>
  );
}
