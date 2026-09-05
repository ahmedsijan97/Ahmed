import React from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useAdminCms();

  if (toasts.length === 0) return null;

  return (
    <div 
      id="admin-toast-container"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none"
    >
      {toasts.map((t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';
        const isWarning = t.type === 'warning';
        const isInfo = t.type === 'info';

        return (
          <div
            key={t.id}
            id={`toast-${t.id}`}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${
              isSuccess 
                ? 'bg-slate-950/95 border-emerald-500/40 text-slate-100 shadow-emerald-950/30' 
                : isError
                ? 'bg-slate-950/95 border-rose-500/50 text-slate-100 shadow-rose-950/30'
                : isWarning
                ? 'bg-slate-950/95 border-amber-500/40 text-slate-100 shadow-amber-950/30'
                : 'bg-slate-950/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/30'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {isInfo && <Info className="w-5 h-5 text-cyan-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white tracking-wide">{t.title}</p>
              {t.message && (
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{t.message}</p>
              )}
            </div>

            <button
              id={`close-toast-${t.id}`}
              onClick={() => removeToast(t.id)}
              className="shrink-0 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
