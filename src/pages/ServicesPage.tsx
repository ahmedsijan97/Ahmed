import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  Terminal, 
  Cpu, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  DollarSign, 
  UserCheck, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { NavPage, ServiceItem } from '../types/portfolio';
import { SERVICES_LIST, PERSONAL_INFO } from '../data/portfolioData';
import { Card3DTilt } from '../components/3d/Card3DTilt';
import { ParticleCanvas } from '../components/3d/ParticleCanvas';

interface ServicesPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectServiceForInquiry?: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectServiceForInquiry }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <Layers className="w-6 h-6" />;
    }
  };

  const handleInquire = (serviceTitle: string) => {
    if (onSelectServiceForInquiry) {
      onSelectServiceForInquiry(serviceTitle);
    }
    onNavigate('contact');
  };

  return (
    <div className="relative w-full pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <ParticleCanvas particleCount={25} className="opacity-40" />

      {/* Header */}
      <div className="space-y-3 text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-semibold text-blue-400 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Specialized Growth Services</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Outfit'] text-white">
          Engineered For Predictable ROAS & Scale.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          From full-funnel Meta & Google advertising to Python rule automations and generative AI creative pipelines. Every service is backed by transparent tracking and milestone accountability.
        </p>
      </div>

      {/* 6 Core Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_LIST.map((service) => (
          <Card3DTilt key={service.id} className="h-full">
            <div className="h-full p-6 sm:p-8 rounded-3xl glass-panel border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between space-y-6 group">
              
              <div className="space-y-5">
                {/* Icon & Category */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    {getServiceIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800">
                    {service.category}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-xl font-bold font-['Outfit'] text-white group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                    {service.fullDesc}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Core Deliverables
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-400">
                    {service.deliverables.map((del, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-500 font-bold">•</span>
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ideal Client & Outcome */}
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block">Ideal For:</span>
                    <span className="text-slate-300">{service.idealClient}</span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-800/80">
                    <span className="text-emerald-400 font-semibold block">Expected Impact:</span>
                    <span className="text-slate-200 font-medium">{service.typicalOutcome}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => handleInquire(service.title)}
                  className="w-full py-3 rounded-xl text-xs font-bold text-center text-white bg-slate-800 group-hover:bg-blue-600 border border-slate-700 group-hover:border-blue-500 transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Explore & Inquire</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </Card3DTilt>
        ))}
      </div>

      {/* Engagement Models Box */}
      <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider">
            Flexible Partnership Frameworks
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-['Outfit'] text-white">
            How We Can Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-950 text-blue-400 border border-blue-500/30">
              Monthly Retainer
            </span>
            <h3 className="text-base font-bold text-white">Full-Funnel Growth Management</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dedicated end-to-end management of paid ads, CRO testing, and weekly Python automated reporting for scaling brands.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              Sprint / Audit
            </span>
            <h3 className="text-base font-bold text-white">30-Day Growth Diagnostic</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Comprehensive 120-point ad account & technical SEO audit with server-side CAPI deployment and 90-day scale roadmap.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-950 text-purple-400 border border-purple-500/30">
              Custom Build
            </span>
            <h3 className="text-base font-bold text-white">AI Automation System Setup</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom Python scripts, creative prompt matrices, and automated Slack/Telegram alert systems built to order.
            </p>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
          >
            <span>Schedule A Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
