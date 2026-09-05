import React, { useState, useRef } from 'react';
import { useAdminCms } from '../context/AdminCmsContext';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Link as LinkIcon, X } from 'lucide-react';

interface ImageUploadDropzoneProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  accept?: string;
  maxSizeMb?: number;
}

export function ImageUploadDropzone({
  label,
  value,
  onChange,
  helperText = 'Supports JPG, PNG, WEBP, SVG or PDF (Max 10MB)',
  accept = 'image/*,application/pdf',
  maxSizeMb = 10
}: ImageUploadDropzoneProps) {
  const { uploadMedia, showToast } = useAdminCms();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [manualUrl, setManualUrl] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (file.size > maxSizeMb * 1024 * 1024) {
      showToast('error', 'File Too Large', `Selected file exceeds ${maxSizeMb}MB maximum limit.`);
      return;
    }

    try {
      setUploading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Data = e.target?.result as string;
        if (base64Data) {
          const media = await uploadMedia(file.name, file.type, base64Data);
          if (media && media.url) {
            onChange(media.url);
          }
        }
        setUploading(false);
      };
      reader.onerror = () => {
        showToast('error', 'Read Error', 'Failed to read file from disk.');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      showToast('error', 'Upload Error', err.message);
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleApplyManualUrl = () => {
    if (manualUrl.trim()) {
      onChange(manualUrl.trim());
      setManualUrl('');
      setShowUrlInput(false);
      showToast('info', 'URL Applied', 'Media link reference updated.');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          {showUrlInput ? 'Hide URL Input' : 'Or Paste Direct URL'}
        </button>
      </div>

      {showUrlInput && (
        <div className="flex items-center gap-2 p-2 bg-slate-950/80 border border-purple-500/30 rounded-xl">
          <input
            type="text"
            placeholder="https://... or /assets/image.jpg"
            value={manualUrl}
            onChange={(e) => setManualUrl(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 px-2 py-1 outline-none"
          />
          <button
            type="button"
            onClick={handleApplyManualUrl}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white rounded-lg transition-all"
          >
            Apply
          </button>
        </div>
      )}

      {/* Main Drag Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-4 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center text-center group ${
          isDragging
            ? 'border-purple-500 bg-purple-500/10'
            : value
            ? 'border-slate-700 hover:border-purple-500/50 bg-slate-900/60'
            : 'border-slate-800 hover:border-slate-600 bg-slate-950/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <div className="py-6 flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs text-purple-300 font-medium">Uploading & Optimizing Media...</p>
          </div>
        ) : value ? (
          <div className="w-full flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 flex items-center justify-center">
              {value.endsWith('.pdf') ? (
                <div className="text-[10px] font-bold text-rose-400">PDF DOC</div>
              ) : (
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              )}
            </div>

            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-medium text-white truncate">{value}</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3 h-3" /> Ready & Linked
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Click or drag a new file here to replace</p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
              title="Clear media"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="py-4 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-purple-400 group-hover:border-purple-500/40 transition-colors">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-300 font-medium">
              <span className="text-purple-400 font-semibold underline">Click to upload</span> or drag and drop
            </div>
            <p className="text-[11px] text-slate-500">{helperText}</p>
          </div>
        )}
      </div>
    </div>
  );
}
