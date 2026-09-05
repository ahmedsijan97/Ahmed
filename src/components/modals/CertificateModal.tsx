import React, { useEffect } from 'react';
import { X, ExternalLink, Award, CheckCircle2, ShieldCheck, Calendar, Hash } from 'lucide-react';
import { CertificationItem } from '../../types/portfolio';

interface CertificateModalProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      id="certificate-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="certificate-modal-content"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Display Image with Glass Watermark */}
        <div className="relative h-64 sm:h-72 w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-slate-800">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          
          <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Industry Credential</span>
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-mono">{certificate.credentialId}</p>
              <h3 className="text-lg sm:text-xl font-bold font-['Outfit'] text-white">{certificate.title}</h3>
            </div>
          </div>
        </div>

        {/* Modal Info Details */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-blue-400" /> Issuing Organization
              </span>
              <p className="text-white font-semibold">{certificate.issuer}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" /> Date & Validity
              </span>
              <p className="text-white font-semibold">{certificate.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Verified Technical Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {certificate.skillsCovered.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/30 text-xs font-medium text-blue-200 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <span className="text-xs text-slate-400">Category: <strong className="text-white">{certificate.category}</strong></span>
            
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/25"
            >
              <span>Verify Official Registry</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
