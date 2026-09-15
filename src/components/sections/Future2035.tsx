import React, { useState } from 'react';
import { FUTURE_SCENARIOS } from '../../data/futureScenarios';
import type { FutureScenario } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { Modal } from '../common/Modal';
import { GlowButton } from '../common/GlowButton';
import {
  Bot,
  Atom,
  Building2,
  Flame,
  Orbit,
  Dna,
  ArrowUpRight,
  Target,
  Sparkles,
  UserCheck,
} from 'lucide-react';

interface Future2035Props {
  onPlayClick: () => void;
}

export const Future2035: React.FC<Future2035Props> = ({ onPlayClick }) => {
  const [selectedScenario, setSelectedScenario] = useState<FutureScenario | null>(null);

  const getScenarioIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'Bot':
        return <Bot className={className} />;
      case 'Atom':
        return <Atom className={className} />;
      case 'Building2':
        return <Building2 className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Orbit':
        return <Orbit className={className} />;
      case 'Dna':
      default:
        return <Dna className={className} />;
    }
  };

  const handleOpenScenario = (scenario: FutureScenario) => {
    onPlayClick();
    setSelectedScenario(scenario);
  };

  return (
    <section
      id="future"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="07"
          badge="THE 2035 HORIZON"
          title="WHAT WILL ENGINEERS BUILD?"
          subtitle="A decade from now, engineering challenges will span planetary boundaries."
          description="By 2035, the frontier of engineering shifts from earthbound components to orbital foundries, room-temperature quantum catalysts, and self-healing living structures."
        />

        {/* 6 Futuristic Horizon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FUTURE_SCENARIOS.map((scenario) => (
            <div
              key={scenario.id}
              className="bg-[#0D1520] border border-cyan-accent/20 rounded-sm p-6 sm:p-7 flex flex-col justify-between group hover:border-cyan-accent/60 hover:shadow-glow-cyan transition-all duration-300 tech-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-sm bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent group-hover:scale-110 group-hover:border-cyan-accent transition-all">
                    {getScenarioIcon(scenario.iconName)}
                  </div>
                  <TechBadge variant="blue">
                    YEAR: {scenario.year}
                  </TechBadge>
                </div>

                <h3 className="font-heading font-extrabold text-xl text-white uppercase group-hover:text-cyan-accent transition-colors">
                  {scenario.title}
                </h3>

                <p className="font-body text-xs text-slate-300 mt-2 leading-relaxed">
                  {scenario.shortDesc}
                </p>

                {/* Target Metric Badge */}
                <div className="mt-5 p-2.5 bg-[#05080D] border border-cyan-accent/20 rounded-sm flex items-center justify-between font-mono text-[11px]">
                  <span className="text-technical-dim">{scenario.metricLabel}:</span>
                  <span className="text-cyan-accent font-bold">{scenario.metricValue}</span>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-cyan-accent/15 flex items-center justify-between">
                <span className="font-mono text-[10px] text-technical-dim uppercase">
                  FRONTIER HORIZON
                </span>
                <button
                  onClick={() => handleOpenScenario(scenario)}
                  className="font-mono text-xs text-cyan-accent hover:text-white flex items-center gap-1 uppercase transition-colors"
                >
                  EXPLORE SCENARIO <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scenario Detail Modal */}
      {selectedScenario && (
        <Modal
          isOpen={!!selectedScenario}
          onClose={() => setSelectedScenario(null)}
          title={selectedScenario.title}
          subtitle={`YEAR: ${selectedScenario.year} • HORIZON PROJECTION`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 font-body">
            <div className="p-4 bg-[#0A111A] border-l-2 border-amber-500 rounded-sm">
              <div className="font-mono text-xs text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                <Target className="w-4 h-4" /> 2035 ENGINEERING CHALLENGE
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedScenario.challenge}
              </p>
            </div>

            <div className="p-4 bg-[#0A111A] border-l-2 border-cyan-accent rounded-sm">
              <div className="font-mono text-xs text-cyan-accent uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" /> FRONTIER TECHNOLOGY CORE
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedScenario.technology}
              </p>
            </div>

            <div className="p-4 bg-[#0A111A] border-l-2 border-blue-accent rounded-sm">
              <div className="font-mono text-xs text-blue-accent uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                <UserCheck className="w-4 h-4" /> THE ENGINEER'S ROLE
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedScenario.engineerRole}
              </p>
            </div>

            <div className="p-4 bg-[#0A111A] border-l-2 border-emerald-500 rounded-sm">
              <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold mb-1">
                POSSIBLE GLOBAL IMPACT
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">
                {selectedScenario.possibleImpact}
              </p>
            </div>

            <div className="pt-3 flex justify-end">
              <GlowButton variant="secondary" size="sm" onClick={() => setSelectedScenario(null)}>
                CLOSE SCENARIO
              </GlowButton>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
