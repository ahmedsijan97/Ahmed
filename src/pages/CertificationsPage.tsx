import React, { useState } from 'react';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Filter 
} from 'lucide-react';
import { NavPage, CertificationItem, CertCategory } from '../types/portfolio';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface CertificationsPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectCertificate: (certificate: CertificationItem) => void;
}

export const CertificationsPage: React.FC<CertificationsPageProps> = ({ 
  onNavigate, 
  onSelectCertificate 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<CertCategory>('All');

  const categories: CertCategory[] = ['All', 'Marketing', 'SEO', 'AI', 'Analytics', 'Advertising'];

  const filteredCerts = selectedFilter === 'All'
    ? CERTIFICATIONS_LIST
    : CERTIFICATIONS_LIST.filter((c) => c.category === selectedFilter);

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <Award className="w-3.5 h-3.5" />
          <span>Verified Industry Accreditations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Certifications & Professional Credentials
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Official accreditations from Google, Meta Blueprint, HubSpot, DeepLearning.AI, and Python Institute verifying technical competency in ad platforms, algorithms, and automated workflows.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-600/30'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCerts.map((cert) => (
          <Card3DTilt key={cert.id} onClick={() => onSelectCertificate(cert)} className="h-full">
            <div className="h-full rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer">
              
              <div>
                {/* Image Header */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 rounded-md bg-blue-600/90 text-white text-[11px] font-semibold backdrop-blur-md">
                      {cert.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{cert.credentialId}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-xs text-blue-400 font-semibold">{cert.issuer}</span>
                    <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white group-hover:text-blue-400 transition-colors mt-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {cert.date}
                    </p>
                  </div>

                  {/* Skills Covered */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Validated Skills:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsCovered.slice(0, 3).map((s, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-emerald-400">
                <span>View Full Certificate Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>

            </div>
          </Card3DTilt>
        ))}
      </div>

    </div>
  );
};
