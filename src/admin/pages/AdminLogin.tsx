import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { ShieldCheck, Lock, User, Eye, EyeOff, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export function AdminLogin({ onBackToSite }: AdminLoginProps) {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState<string>('Sayed10');
  const [password, setPassword] = useState<string>('Sayed10@');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please provide both username and password.');
      return;
    }

    setSubmitting(true);
    const result = await login(username.trim(), password);
    setSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || 'Invalid credentials. Please verify your username and password.');
    }
  };

  const handleFillDemoCredentials = () => {
    setUsername('Sayed10');
    setPassword('Sayed10@');
    setErrorMessage(null);
  };

  return (
    <div 
      id="admin-login-page"
      className="min-h-screen bg-[#080d19] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-['Plus_Jakarta_Sans']"
    >
      {/* Background glow backdrops */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-red-600 p-[1px] mx-auto mb-4 shadow-xl shadow-purple-950/40">
            <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl font-black text-white tracking-tight">Sayed CMS Portal</h1>
          <p className="text-xs text-slate-400 mt-1">Enterprise Admin Authentication</p>
        </div>

        {/* Error Banner */}
        {errorMessage && (
          <div 
            id="admin-login-error-banner"
            className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Administrator Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g. Sayed10)"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Admin Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="admin-login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all font-sans"
              />
              <button
                type="button"
                id="admin-login-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1 rounded transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Credential Helper Pill */}
          <div className="p-3 bg-purple-500/5 border border-purple-500/20 rounded-xl flex items-center justify-between text-xs">
            <span className="text-purple-300 text-[11px]">
              Initial Login: <strong className="text-white">Sayed10</strong> / <strong className="text-white">Sayed10@</strong>
            </span>
            <button
              type="button"
              id="admin-quick-fill-btn"
              onClick={handleFillDemoCredentials}
              className="text-purple-400 hover:text-purple-300 font-semibold underline text-[11px] transition-colors"
            >
              Fill Credentials
            </button>
          </div>

          {/* Submit Button */}
          <button
            id="admin-login-submit-btn"
            type="submit"
            disabled={submitting}
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-bold text-sm shadow-xl shadow-purple-950/50 hover:shadow-purple-900/60 flex items-center justify-center gap-2 transition-all mt-6 ${
              submitting ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Access CMS Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="mt-8 text-center pt-6 border-t border-slate-800/80">
          <button
            id="admin-login-back-btn"
            onClick={onBackToSite}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            ← Return to Public Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
