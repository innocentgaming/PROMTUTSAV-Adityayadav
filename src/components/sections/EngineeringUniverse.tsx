import React, { useState } from 'react';
import { ENGINEERING_DOMAINS } from '../../data/engineeringDomains';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import {
  Code2,
  BrainCircuit,
  Bot,
  Building2,
  Cog,
  Cpu,
  Leaf,
  Rocket,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface EngineeringUniverseProps {
  onPlayClick: () => void;
}

export const EngineeringUniverse: React.FC<EngineeringUniverseProps> = ({ onPlayClick }) => {
  const [selectedDomainId, setSelectedDomainId] = useState(ENGINEERING_DOMAINS[0].id);
  const currentDomain =
    ENGINEERING_DOMAINS.find((d) => d.id === selectedDomainId) || ENGINEERING_DOMAINS[0];

  const getDomainIcon = (name: string, className = 'w-5 h-5') => {
    switch (name) {
      case 'Code2':
        return <Code2 className={className} />;
      case 'BrainCircuit':
        return <BrainCircuit className={className} />;
      case 'Bot':
        return <Bot className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Cog':
        return <Cog className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Leaf':
        return <Leaf className={className} />;
      case 'Rocket':
      default:
        return <Rocket className={className} />;
    }
  };

  const handleSelectDomain = (id: string) => {
    onPlayClick();
    setSelectedDomainId(id);
  };

  return (
    <section
      id="engineering"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#05080D] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint Grid background */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="02"
          badge="CROSS-DISCIPLINARY UNIVERSE"
          title="WHAT DOES AN ENGINEER BUILD?"
          subtitle="Not just machines. Not just software. Systems that change the world."
          description="Explore the eight primary pillars of modern engineering. Every domain solves a fundamental human dilemma through rigorous mathematics, empirical testing, and physical realization."
        />

        {/* Central Interactive Node Network + Domain Browser */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left / Top: Interactive Radial Domain Selector */}
          <div className="lg:col-span-5 bg-[#0A111A] border border-cyan-accent/25 rounded-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-cyan-accent/15 pb-3 mb-4">
                <span className="font-mono text-xs text-cyan-accent uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> DOMAIN MATRIX
                </span>
                <span className="font-mono text-[11px] text-technical-dim">08 NODES ACTIVE</span>
              </div>

              <p className="font-mono text-xs text-technical-dim mb-4">
                SELECT A DISCIPLINE TO RECONFIGURE THE CENTRAL CORE:
              </p>

              {/* 8 Interactive Domain Chips / Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ENGINEERING_DOMAINS.map((domain) => {
                  const isSelected = domain.id === selectedDomainId;
                  return (
                    <button
                      key={domain.id}
                      onClick={() => handleSelectDomain(domain.id)}
                      className={`text-left p-3 rounded-sm border font-mono transition-all duration-200 relative group flex items-center gap-3 ${
                        isSelected
                          ? 'border-cyan-accent bg-cyan-accent/15 shadow-glow-cyan text-white'
                          : 'border-white/10 bg-[#0D1520] text-technical-dim hover:border-cyan-accent/50 hover:text-white'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 border transition-colors ${
                          isSelected
                            ? 'bg-cyan-accent text-bg-primary border-cyan-accent'
                            : 'bg-black/40 text-cyan-accent border-cyan-accent/30 group-hover:border-cyan-accent'
                        }`}
                      >
                        {getDomainIcon(domain.iconName, 'w-4 h-4')}
                      </div>

                      <div className="overflow-hidden">
                        <div className="text-[10px] text-cyan-accent/70 uppercase">
                          {domain.code}
                        </div>
                        <div className="text-xs font-bold truncate">
                          {domain.name.split(' ')[0]}
                        </div>
                      </div>

                      {isSelected && (
                        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-accent animate-ping" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Central Node Visual Ring Indicator */}
            <div className="mt-6 pt-6 border-t border-cyan-accent/15 flex items-center justify-between font-mono text-[11px] text-technical-dim">
              <span className="flex items-center gap-1 text-cyan-accent">
                <Sparkles className="w-3.5 h-3.5" /> INTERCONNECT PROTOCOL: SYNCED
              </span>
              <span>100% MODULAR</span>
            </div>
          </div>

          {/* Right: Live Domain Core Architectural Viewport */}
          <div className="lg:col-span-7 bg-[#0D1520] border border-cyan-accent/30 rounded-sm p-6 sm:p-8 relative tech-corner-tl tech-corner-br shadow-2xl flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-accent/20 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-sm bg-cyan-accent/10 border border-cyan-accent flex items-center justify-center text-cyan-accent">
                    {getDomainIcon(currentDomain.iconName, 'w-6 h-6')}
                  </div>
                  <div>
                    <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest">
                      {currentDomain.code}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-tight">
                      {currentDomain.name}
                    </h3>
                  </div>
                </div>
                <TechBadge variant="cyan" dot>
                  CORE ACTIVE
                </TechBadge>
              </div>

              {/* Tagline description */}
              <p className="font-body text-base text-slate-300 leading-relaxed">
                {currentDomain.description}
              </p>

              {/* Structured Engineering Breakdown */}
              <div className="mt-6 space-y-4">
                {/* Problem Statement */}
                <div className="p-4 bg-[#0A111A] border-l-2 border-amber-500 rounded-sm">
                  <div className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                    <HelpCircle className="w-3.5 h-3.5" /> THE HUMAN PROBLEM
                  </div>
                  <p className="font-body text-sm text-slate-200">
                    {currentDomain.problem}
                  </p>
                </div>

                {/* Engineering Solution */}
                <div className="p-4 bg-[#0A111A] border-l-2 border-cyan-accent rounded-sm">
                  <div className="font-mono text-xs text-cyan-accent uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                    <Layers className="w-3.5 h-3.5" /> ENGINEERING ARCHITECTURE
                  </div>
                  <p className="font-body text-sm text-slate-200">
                    {currentDomain.engineeringSolution}
                  </p>
                </div>

                {/* Real-World Output & Technologies */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-[#0A111A] border border-white/10 rounded-sm">
                    <div className="font-mono text-[11px] text-technical-dim uppercase tracking-wider mb-1">
                      PHYSICAL OUTPUT
                    </div>
                    <div className="font-heading font-bold text-sm text-white">
                      {currentDomain.output}
                    </div>
                  </div>

                  <div className="p-3 bg-[#0A111A] border border-white/10 rounded-sm">
                    <div className="font-mono text-[11px] text-technical-dim uppercase tracking-wider mb-1">
                      GLOBAL SOCIETAL IMPACT
                    </div>
                    <div className="font-body text-xs text-slate-300">
                      {currentDomain.impact}
                    </div>
                  </div>
                </div>

                {/* Key Technologies Pills */}
                <div className="pt-2">
                  <div className="font-mono text-xs text-technical-dim uppercase tracking-wider mb-2">
                    TECHNOLOGY STACK:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentDomain.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono bg-cyan-accent/5 border border-cyan-accent/20 text-cyan-accent rounded-sm flex items-center gap-1"
                      >
                        <ArrowRight className="w-3 h-3 text-cyan-accent/50" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="mt-8 pt-4 border-t border-cyan-accent/15 flex items-center justify-between font-mono text-xs text-technical-dim">
              <span>SYSTEM ARCHITECTURE: VERIFIED</span>
              <span className="text-cyan-accent uppercase">ENGINEER 2.0 ECOSYSTEM</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
