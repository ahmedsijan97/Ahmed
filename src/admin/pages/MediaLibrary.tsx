import React, { useState } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { ImageUploadDropzone } from '../components/ImageUploadDropzone';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Image, Copy, Check, Trash2, Plus, ExternalLink, HardDrive } from 'lucide-react';

export function MediaLibrary() {
  const { db, deleteMedia, saving } = useAdminCms();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const mediaList = db?.media || [];

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteMedia(deleteTarget);
    setDeleteTarget(null);
  };

  const totalSizeMb = (
    mediaList.reduce((acc, m) => acc + (m.size || 0), 0) /
    (1024 * 1024)
  ).toFixed(2);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Image className="w-4 h-4 text-purple-400" />
            Media & File Asset Repository
          </h2>
          <p className="text-xs text-slate-400">
            {mediaList.length} files stored • {totalSizeMb} MB total storage utilized
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <HardDrive className="w-4 h-4 text-purple-400" />
          <span>Secure Persistent Storage</span>
        </div>
      </div>

      {/* Upload Zone */}
      <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Upload New Visual Assets</h4>
        <ImageUploadDropzone
          label="Drop photo, SVG logo, or document file here"
          value=""
          onChange={async () => {
            // Dropzone automatically adds to media store
          }}
          helperText="Supports PNG, JPG, WebP, SVG, and PDF documents"
        />
      </div>

      {/* Asset Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Stored Media Assets</h4>

        {mediaList.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl text-slate-500 text-xs">
            No media files uploaded yet. Drag and drop assets above to populate your library.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaList.map((item) => {
              const displayName = item.originalName || item.filename || 'asset';
              const isPdf = displayName.endsWith('.pdf') || item.mimeType?.includes('pdf');
              return (
                <div
                  key={item.id}
                  className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="w-full aspect-square bg-slate-950 flex items-center justify-center overflow-hidden relative">
                    {isPdf ? (
                      <div className="flex flex-col items-center gap-1 text-slate-400">
                        <HardDrive className="w-8 h-8 text-purple-400" />
                        <span className="text-[10px] font-mono">PDF Document</span>
                      </div>
                    ) : (
                      <img
                        src={item.url}
                        alt={displayName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    )}

                    {/* Hover overlay actions */}
                    <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item.url, item.id)}
                        className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-lg transition-all cursor-pointer"
                        title="Copy Public URL"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>

                      <button
                        type="button"
                        onClick={() => setDeleteTarget(item.id)}
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all cursor-pointer"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-3 text-[11px] space-y-0.5 border-t border-slate-800 bg-slate-900">
                    <p className="font-semibold text-white truncate" title={displayName}>
                      {displayName}
                    </p>
                    <div className="flex items-center justify-between text-slate-500 font-mono text-[10px]">
                      <span>{((item.size || 0) / 1024).toFixed(1)} KB</span>
                      <span>{new Date(item.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        title="Permanently Delete Media Asset?"
        message="Are you sure you want to delete this media file? Any section referencing this URL will no longer be able to load the image."
        confirmLabel="Delete File"
        isDestructive={true}
        loading={saving}
      />
    </div>
  );
}
