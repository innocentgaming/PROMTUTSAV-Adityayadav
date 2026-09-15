import React, { useState } from 'react';
import { AI_APPLICATIONS } from '../../data/aiApplications';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import {
  ActivitySquare,
  CloudLightning,
  HardHat,
  Sprout,
  ShieldAlert,
  Building,
  ArrowRight,
  Database,
  Cpu,
  BrainCircuit,
  Zap,
  CheckCircle,
} from 'lucide-react';

interface AiEngineeringProps {
  onPlayClick: () => void;
}

export const AiEngineering: React.FC<AiEngineeringProps> = ({ onPlayClick }) => {
  const [selectedAppId, setSelectedAppId] = useState(AI_APPLICATIONS[0].id);
  const currentApp = AI_APPLICATIONS.find((a) => a.id === selectedAppId) || AI_APPLICATIONS[0];

  const getAppIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'ActivitySquare':
        return <ActivitySquare className={className} />;
      case 'CloudLightning':
        return <CloudLightning className={className} />;
      case 'HardHat':
        return <HardHat className={className} />;
      case 'Sprout':
        return <Sprout className={className} />;
      case 'ShieldAlert':
        return <ShieldAlert className={className} />;
      case 'Building':
      default:
        return <Building className={className} />;
    }
  };

  const handleSelectApp = (id: string) => {
    onPlayClick();
    setSelectedAppId(id);
  };

  return (
    <section
      id="ai-engineering"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="03"
          badge="INTELLIGENT SYSTEMS"
          title="ENGINEERING × AI"
          subtitle="When human problem-solving meets machine intelligence."
          description="AI is not a replacement for engineers; it is the most powerful multiplier in human history. Witness how engineering hardware, telemetry pipelines, and machine intelligence combine to solve planetary-scale challenges."
        />

        {/* The 6-Stage Master Pipeline Visualization */}
        <div className="mb-12 bg-[#0A111A] border border-cyan-accent/25 rounded-sm p-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-cyan-accent/15 pb-3 mb-6">
            <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> ARCHITECTURAL SIGNAL PIPELINE
            </span>
            <span className="font-mono text-[11px] text-technical-dim">
              END-TO-END COGNITIVE FLOW
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'HUMAN PROBLEM', icon: <ActivitySquare className="w-4 h-4" /> },
              { step: '02', title: 'ENGINEERING', icon: <Cpu className="w-4 h-4" /> },
              { step: '03', title: 'DATA TELEMETRY', icon: <Database className="w-4 h-4" /> },
              { step: '04', title: 'AI MODEL', icon: <BrainCircuit className="w-4 h-4" /> },
              { step: '05', title: 'DECISION', icon: <Zap className="w-4 h-4" /> },
              { step: '06', title: 'REAL IMPACT', icon: <CheckCircle className="w-4 h-4" /> },
            ].map((node, i) => (
              <div
                key={node.step}
                className="relative bg-[#0D1520] border border-cyan-accent/20 p-3 rounded-sm text-center group hover:border-cyan-accent transition-colors"
              >
                <div className="font-mono text-[10px] text-cyan-accent font-bold mb-1">
                  // {node.step}
                </div>
                <div className="flex justify-center text-cyan-accent my-1">
                  {node.icon}
                </div>
                <div className="font-heading font-bold text-xs text-white uppercase tracking-wider">
                  {node.title}
                </div>
                {i < 5 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-cyan-accent/40">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 6 Interactive AI Application Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {AI_APPLICATIONS.map((app) => {
            const isSelected = app.id === selectedAppId;
            return (
              <button
                key={app.id}
                onClick={() => handleSelectApp(app.id)}
                className={`p-3 rounded-sm border text-left font-mono transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-accent bg-cyan-accent/15 text-white shadow-glow-cyan'
                    : 'border-white/10 bg-[#0A111A] text-technical-dim hover:border-cyan-accent/50 hover:text-white'
                }`}
              >
                <div className="text-cyan-accent mb-2">
                  {getAppIcon(app.iconName, 'w-5 h-5')}
                </div>
                <div>
                  <div className="text-[10px] text-cyan-accent/70 uppercase">
                    {app.domain.split(' ')[0]}
                  </div>
                  <div className="text-xs font-bold leading-tight uppercase mt-0.5">
                    {app.title.replace('AI + ', '')}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Live System Architecture Diagram for Selected Application */}
        <div className="bg-[#0D1520] border border-cyan-accent/30 rounded-sm p-6 sm:p-8 relative tech-corner-tl tech-corner-br shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-accent/20 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-cyan-accent/10 border border-cyan-accent flex items-center justify-center text-cyan-accent">
                {getAppIcon(currentApp.iconName, 'w-5 h-5')}
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase">
                  {currentApp.title}
                </h3>
                <span className="font-mono text-xs text-cyan-accent tracking-wider">
                  DOMAIN: {currentApp.domain}
                </span>
              </div>
            </div>
            <TechBadge variant="cyan" dot>
              ACTIVE PIPELINE
            </TechBadge>
          </div>

          {/* Connected Flow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Step 1: Problem */}
            <div className="p-4 bg-[#0A111A] border border-amber-500/30 rounded-sm">
              <div className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                01 // HUMAN PROBLEM
              </div>
              <p className="font-body text-xs text-slate-300 leading-relaxed">
                {currentApp.problem}
              </p>
            </div>

            {/* Step 2: Input Data */}
            <div className="p-4 bg-[#0A111A] border border-cyan-accent/20 rounded-sm">
              <div className="font-mono text-xs text-cyan-accent font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                02 // INPUT DATA TELEMETRY
              </div>
              <p className="font-body text-xs text-slate-300 leading-relaxed">
                {currentApp.inputData}
              </p>
            </div>

            {/* Step 3: Engineering System */}
            <div className="p-4 bg-[#0A111A] border border-cyan-accent/20 rounded-sm">
              <div className="font-mono text-xs text-cyan-accent font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                03 // ENGINEERING SYSTEM
              </div>
              <p className="font-body text-xs text-slate-300 leading-relaxed">
                {currentApp.engineeringSystem}
              </p>
            </div>

            {/* Step 4: AI Model */}
            <div className="p-4 bg-[#0A111A] border border-blue-accent/40 rounded-sm">
              <div className="font-mono text-xs text-blue-accent font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5" />
                04 // NEURAL AI MODEL
              </div>
              <p className="font-body text-xs text-slate-300 leading-relaxed">
                {currentApp.aiModel}
              </p>
            </div>

            {/* Step 5: Automated Decision */}
            <div className="p-4 bg-[#0A111A] border border-cyan-accent/20 rounded-sm">
              <div className="font-mono text-xs text-cyan-accent font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                05 // ACTIONABLE DECISION
              </div>
              <p className="font-body text-xs text-slate-300 leading-relaxed">
                {currentApp.decision}
              </p>
            </div>

            {/* Step 6: Real-World Impact */}
            <div className="p-4 bg-[#0A111A] border border-emerald-500/40 rounded-sm">
              <div className="font-mono text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                06 // REAL-WORLD IMPACT
              </div>
              <p className="font-body text-xs text-slate-300 leading-relaxed">
                {currentApp.impact}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
