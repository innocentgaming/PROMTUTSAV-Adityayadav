import React, { useState } from 'react';
import { INNOVATION_STAGES } from '../../data/innovationStages';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { Lightbulb, Compass, Wrench, Activity, Sparkles, Globe, ArrowRight, FileCheck } from 'lucide-react';

interface InnovationWallProps {
  onPlayClick: () => void;
}

export const InnovationWall: React.FC<InnovationWallProps> = ({ onPlayClick }) => {
  const [selectedStageId, setSelectedStageId] = useState(INNOVATION_STAGES[0].id);
  const currentStage =
    INNOVATION_STAGES.find((s) => s.id === selectedStageId) || INNOVATION_STAGES[0];

  const getStageIcon = (id: string, className = 'w-5 h-5') => {
    switch (id) {
      case 'idea':
        return <Lightbulb className={className} />;
      case 'design':
        return <Compass className={className} />;
      case 'prototype':
        return <Wrench className={className} />;
      case 'test':
        return <Activity className={className} />;
      case 'innovation':
        return <Sparkles className={className} />;
      case 'impact':
      default:
        return <Globe className={className} />;
    }
  };

  const handleSelectStage = (id: string) => {
    onPlayClick();
    setSelectedStageId(id);
  };

  return (
    <section
      id="innovation"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint Grid background */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="05"
          badge="THE ENGINEERING LIFECYCLE"
          title="FROM IDEA TO IMPACT"
          subtitle="Engineering is the discipline of turning abstract imagination into physical reality."
          description="Every modern marvel—from microchips to suspension bridges—traverses this rigorous six-stage development crucible."
        />

        {/* Horizontal Process Steps Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {INNOVATION_STAGES.map((stage, idx) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <button
                key={stage.id}
                onClick={() => handleSelectStage(stage.id)}
                className={`p-4 rounded-sm border text-left font-mono transition-all duration-200 relative group flex flex-col justify-between ${
                  isSelected
                    ? 'border-cyan-accent bg-cyan-accent/15 shadow-glow-cyan text-white'
                    : 'border-white/10 bg-[#0A111A] text-technical-dim hover:border-cyan-accent/40 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-cyan-accent font-bold">
                    {stage.stageNumber}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-sm flex items-center justify-center border ${
                      isSelected
                        ? 'bg-cyan-accent text-bg-primary border-cyan-accent'
                        : 'border-white/10 bg-[#05080D] text-cyan-accent'
                    }`}
                  >
                    {getStageIcon(stage.id, 'w-3.5 h-3.5')}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-extrabold text-sm text-white uppercase tracking-wider">
                    {stage.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 font-body">
                    "{stage.shortDesc}"
                  </p>
                </div>

                {idx < 5 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-accent/30 z-10">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Viewport */}
        <div className="bg-[#0D1520] border border-cyan-accent/30 rounded-sm p-6 sm:p-8 relative tech-corner-tl tech-corner-br shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <TechBadge variant="cyan" dot>
                  {currentStage.stageNumber} CRITICAL CRUCIBLE
                </TechBadge>
                <span className="font-mono text-xs text-technical-dim">
                  PHASE SPECIFICATION
                </span>
              </div>

              <h3 className="text-3xl font-heading font-black text-white uppercase">
                {currentStage.name}: {currentStage.shortDesc}
              </h3>

              <p className="font-body text-base text-slate-200 leading-relaxed">
                {currentStage.fullDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cyan-accent/15">
                <div className="p-3 bg-[#0A111A] border border-white/10 rounded-sm">
                  <div className="font-mono text-[10px] text-cyan-accent uppercase tracking-wider mb-1">
                    PRIMARY ENGINEERING ACTION
                  </div>
                  <p className="font-body text-xs text-slate-300">
                    {currentStage.action}
                  </p>
                </div>

                <div className="p-3 bg-[#0A111A] border border-cyan-accent/20 rounded-sm">
                  <div className="font-mono text-[10px] text-cyan-accent uppercase tracking-wider mb-1 flex items-center gap-1">
                    <FileCheck className="w-3 h-3" /> TANGIBLE DELIVERABLE
                  </div>
                  <p className="font-heading font-bold text-xs text-white">
                    {currentStage.deliverable}
                  </p>
                </div>
              </div>
            </div>

            {/* Stage Technical Emblem / Graphic */}
            <div className="lg:col-span-4 bg-[#05080D] border border-cyan-accent/20 rounded-sm p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-sm border-2 border-cyan-accent bg-cyan-accent/10 flex items-center justify-center text-cyan-accent mb-4 shadow-glow-cyan">
                {getStageIcon(currentStage.id, 'w-10 h-10')}
              </div>
              <div className="font-heading font-bold text-base text-white uppercase">
                {currentStage.name} STAGE
              </div>
              <div className="font-mono text-xs text-cyan-accent uppercase mt-0.5">
                SYSTEM CERTIFIED
              </div>
              <p className="font-body text-[11px] text-technical-dim mt-2 max-w-xs">
                Every breakthrough requires unwavering discipline across every millimeter of the design cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
