import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { Activity, Clock, Search, RefreshCw } from 'lucide-react';

export function ActivityLogsView() {
  const { db, fetchFullDatabase } = useAdminCms();
  const [searchTerm, setSearchTerm] = useState('');

  const logs = db?.activityLogs || [];

  const filtered = logs.filter((l) => {
    const q = searchTerm.toLowerCase();
    return (
      l.action.toLowerCase().includes(q) ||
      l.details.toLowerCase().includes(q) ||
      l.user.toLowerCase().includes(q) ||
      (l.ip && l.ip.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-purple-400" />
            System Audit & Activity Logs
          </h2>
          <p className="text-xs text-slate-400">
            Immutable tracking of CMS content updates, publish events, file uploads, and authentication attempts.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchFullDatabase()}
          className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl flex items-center gap-1.5 text-xs font-semibold"
          title="Refresh Activity Logs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter audit logs by action, details, user, or IP address..."
          className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-purple-500 outline-none"
        />
      </div>

      {/* Log list */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No audit records found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {filtered.map((log) => (
              <div key={log.id} className="p-4 hover:bg-slate-800/30 transition-colors flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-purple-950/50 border border-purple-800/40 flex items-center justify-center shrink-0 text-purple-400">
                  <Activity className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{log.action}</span>
                    <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300">{log.details}</p>

                  <div className="flex items-center gap-3 text-[10px] text-slate-500 font-mono pt-1">
                    <span>User: <strong className="text-purple-300">{log.user}</strong></span>
                    {log.ip && (
                      <>
                        <span>•</span>
                        <span>IP: {log.ip}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
