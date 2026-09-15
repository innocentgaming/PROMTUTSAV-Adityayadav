import React, { useState } from 'react';
import {
  FLOOD_CHALLENGE_CHOICES,
  calculateChallengeResults,
} from '../../data/challengeQuestions';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { GlowButton } from '../common/GlowButton';
import {
  ShieldAlert,
  CheckSquare,
  Square,
  Award,
  BarChart3,
  RotateCcw,
  Sparkles,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ThinkChallengeProps {
  onPlayClick: () => void;
  onPlaySuccess: () => void;
}

export const ThinkChallenge: React.FC<ThinkChallengeProps> = ({
  onPlayClick,
  onPlaySuccess,
}) => {
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculateChallengeResults> | null>(null);

  const toggleChoice = (id: string) => {
    onPlayClick();
    if (submitted) return; // Locked until reset
    setSelectedChoices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEvaluate = () => {
    if (selectedChoices.length === 0) return;
    onPlayClick();
    const computed = calculateChallengeResults(selectedChoices);
    setResult(computed);
    setSubmitted(true);
    onPlaySuccess();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#00D9FF', '#1687FF', '#F5F7FA'],
      });
    } catch {
      // Fallback
    }
  };

  const handleReset = () => {
    onPlayClick();
    setSelectedChoices([]);
    setSubmitted(false);
    setResult(null);
  };

  return (
    <section
      id="challenge"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#05080D] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="04"
          badge="INTERACTIVE SIMULATION"
          title="CAN YOU THINK LIKE AN ENGINEER?"
          subtitle="Test your architectural instincts against real-world constraints."
          description="In engineering, there is rarely a single textbook answer. Success demands trade-off analysis: balancing capital cost, hydraulic capacity, human safety, and sensor latency."
        />

        {/* Challenge Board Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Crisis Scenario & Selection Grid */}
          <div className="lg:col-span-7 bg-[#0A111A] border border-cyan-accent/25 rounded-sm p-6 sm:p-8">
            {/* Scenario Header */}
            <div className="border-b border-cyan-accent/20 pb-4 mb-6">
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="font-mono text-xs text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> CRISIS SCENARIO // SIM-FLOOD-09
                </span>
                <TechBadge variant="amber" dot>
                  HIGH RISK
                </TechBadge>
              </div>

              <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase">
                Metropolitan Monsoon Surge
              </h3>
              <p className="font-body text-sm text-slate-300 mt-2 leading-relaxed">
                A sudden 150mm cloudburst has inundated the municipal river basin. Riverbanks are overflowing, arterial underpasses are submerged, and hospital transit corridors are compromised.
              </p>
              <div className="mt-3 font-mono text-xs text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/30 p-2.5 rounded-sm">
                MISSION OBJECTIVE: REDUCE FLOOD RISK • SAVE RESOURCES • PROTECT CITIZENS
              </div>
            </div>

            {/* 4 Countermeasure Options */}
            <div className="space-y-3">
              <div className="font-mono text-xs text-technical-dim uppercase tracking-wider mb-2">
                SELECT YOUR COUNTERMEASURE SUITE (MULTI-SELECT ENABLED):
              </div>

              {FLOOD_CHALLENGE_CHOICES.map((choice) => {
                const isChecked = selectedChoices.includes(choice.id);
                return (
                  <button
                    key={choice.id}
                    onClick={() => toggleChoice(choice.id)}
                    disabled={submitted}
                    className={`w-full text-left p-4 rounded-sm border transition-all duration-200 flex items-start gap-3.5 group ${
                      isChecked
                        ? 'border-cyan-accent bg-cyan-accent/10 shadow-glow-cyan text-white'
                        : 'border-white/10 bg-[#0D1520] text-slate-300 hover:border-cyan-accent/40'
                    }`}
                  >
                    <div className="mt-0.5 text-cyan-accent">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-cyan-accent" />
                      ) : (
                        <Square className="w-5 h-5 text-technical-dim group-hover:text-cyan-accent" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading font-bold text-sm text-white uppercase">
                          {choice.title}
                        </span>
                        <span className="font-mono text-[10px] text-cyan-accent border border-cyan-accent/30 px-1.5 py-0.5 rounded-sm">
                          COST: {choice.costPoints} PTS
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block mt-0.5">
                        // {choice.category}
                      </span>
                      <p className="font-body text-xs text-slate-300 mt-1 leading-relaxed">
                        {choice.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 pt-4 border-t border-cyan-accent/15 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-technical-dim">
                SELECTED: <strong className="text-cyan-accent">{selectedChoices.length}</strong> / 4 STRATEGIES
              </span>

              <div className="flex items-center gap-3">
                {submitted ? (
                  <GlowButton variant="outline" size="sm" onClick={handleReset} icon={<RotateCcw className="w-3.5 h-3.5" />}>
                    RE-SIMULATE
                  </GlowButton>
                ) : (
                  <GlowButton
                    variant="primary"
                    size="md"
                    onClick={handleEvaluate}
                    disabled={selectedChoices.length === 0}
                    icon={<Zap className="w-4 h-4" />}
                  >
                    CALCULATE ENGINEER SCORE
                  </GlowButton>
                )}
              </div>
            </div>
          </div>

          {/* Right: Real-time Telemetry & Archetype Result Card */}
          <div className="lg:col-span-5 bg-[#0D1520] border border-cyan-accent/30 rounded-sm p-6 sm:p-8 relative tech-corner-tl tech-corner-br shadow-2xl flex flex-col justify-between">
            {submitted && result ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Score Banner */}
                <div className="flex items-center justify-between border-b border-cyan-accent/20 pb-4">
                  <div>
                    <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest">
                      SIMULATION COMPLETE
                    </span>
                    <h4 className="font-heading font-black text-3xl text-white mt-1">
                      {result.overallScore} <span className="text-base text-cyan-accent">/ 100</span>
                    </h4>
                  </div>
                  <div className="w-12 h-12 rounded-sm bg-cyan-accent/10 border border-cyan-accent flex items-center justify-center text-cyan-accent">
                    <Award className="w-6 h-6" />
                  </div>
                </div>

                {/* Engineering Profile Archetype */}
                <div className="p-4 bg-[#0A111A] border border-cyan-accent/30 rounded-sm">
                  <div className="font-mono text-[10px] text-cyan-accent uppercase tracking-widest mb-1">
                    ENGINEER PROFILE ARCHETYPE // {result.profile.code}
                  </div>
                  <h5 className="font-heading font-extrabold text-xl text-white uppercase">
                    You're a {result.profile.title}
                  </h5>
                  <p className="font-mono text-xs text-cyan-accent/90 mt-0.5 font-semibold">
                    "{result.profile.tagline}"
                  </p>
                  <p className="font-body text-xs text-slate-300 mt-3 leading-relaxed">
                    {result.profile.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                    {result.profile.keyStrengths.map((str) => (
                      <span
                        key={str}
                        className="px-2 py-0.5 text-[10px] font-mono bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20 rounded-sm"
                      >
                        {str}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Score Breakdown Radar/Metrics */}
                <div className="space-y-3">
                  <div className="font-mono text-xs text-technical-dim uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart3 className="w-3.5 h-3.5 text-cyan-accent" /> COGNITIVE DIMENSIONS:
                  </div>

                  {[
                    { label: 'SYSTEMS THINKING', val: result.systemsThinking },
                    { label: 'PROBLEM SOLVING', val: result.problemSolving },
                    { label: 'RESOURCE OPTIMIZATION', val: result.resourceOptimization },
                    { label: 'RISK AWARENESS', val: result.riskAwareness },
                    { label: 'INNOVATION LEVERAGE', val: result.innovation },
                  ].map((dim) => (
                    <div key={dim.label} className="space-y-1">
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-slate-300">{dim.label}</span>
                        <span className="text-cyan-accent font-bold">{dim.val}%</span>
                      </div>
                      <div className="h-1.5 bg-black/60 border border-cyan-accent/20 rounded-none overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-accent to-cyan-accent transition-all duration-500"
                          style={{ width: `${dim.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Awaiting Input Placeholder State */
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-sm border border-cyan-accent/20 bg-cyan-accent/5 flex items-center justify-center text-cyan-accent/60 animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg text-white uppercase">
                    Awaiting System Selection
                  </h4>
                  <p className="font-mono text-xs text-technical-dim max-w-xs mt-1">
                    Select one or more engineering countermeasures on the left to activate deterministic profiling algorithm.
                  </p>
                </div>
                <div className="font-mono text-[10px] text-cyan-accent/60 border border-cyan-accent/20 px-3 py-1 bg-black/40">
                  DETERMINISTIC EVALUATOR READY
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-cyan-accent/15 flex items-center justify-between font-mono text-[10px] text-technical-dim">
              <span>ALGORITHM: MULTI-DIMENSIONAL MATRIX</span>
              <span className="text-cyan-accent">VISVESVARAYA SCALE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
