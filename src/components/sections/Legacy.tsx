import React, { useState } from 'react';
import { TIMELINE_DATA } from '../../data/timeline';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { ChevronLeft, ChevronRight, MapPin, CheckCircle2, Award, Waves, ShieldAlert, Landmark, Building } from 'lucide-react';

interface LegacyProps {
  onPlayClick: () => void;
}

export const Legacy: React.FC<LegacyProps> = ({ onPlayClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = TIMELINE_DATA[currentIndex];

  const handleSelect = (index: number) => {
    onPlayClick();
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    onPlayClick();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : TIMELINE_DATA.length - 1));
  };

  const handleNext = () => {
    onPlayClick();
    setCurrentIndex((prev) => (prev < TIMELINE_DATA.length - 1 ? prev + 1 : 0));
  };

  const getSchematicIcon = (type: string) => {
    switch (type) {
      case 'birth':
      case 'education':
        return <Landmark className="w-8 h-8 text-cyan-accent" />;
      case 'irrigation':
        return <Waves className="w-8 h-8 text-cyan-accent" />;
      case 'flood':
        return <ShieldAlert className="w-8 h-8 text-cyan-accent" />;
      case 'krs':
      case 'industry':
        return <Building className="w-8 h-8 text-cyan-accent" />;
      case 'legacy':
      default:
        return <Award className="w-8 h-8 text-cyan-accent" />;
    }
  };

  return (
    <section id="legacy" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-cyan-accent/20 overflow-hidden">
      {/* Background blueprint details */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="01"
          badge="HISTORICAL FOUNDATION"
          title="SIR M. VISVESVARAYA"
          subtitle="Before Engineering 2.0, there was a vision."
          description="Civil engineer, statesman, and the 19th Diwan of Mysore. Sir Mokshagundam Visvesvaraya (1861–1962) established the bedrock of Indian hydraulic, industrial, and institutional engineering."
        />

        {/* Desktop Horizontal Timeline Bar */}
        <div className="hidden md:block mb-12">
          <div className="relative flex items-center justify-between border-t border-b border-cyan-accent/20 py-4 bg-[#0A111A]/80 backdrop-blur-sm px-6 rounded-sm">
            {/* Horizontal Track Line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] bg-white/10 -z-0">
              <div
                className="h-full bg-cyan-accent transition-all duration-300 shadow-glow-cyan"
                style={{
                  width: `${(currentIndex / (TIMELINE_DATA.length - 1)) * 100}%`,
                }}
              />
            </div>

            {TIMELINE_DATA.map((event, idx) => {
              const isActive = idx === currentIndex;
              const isPast = idx < currentIndex;
              return (
                <button
                  key={event.year}
                  onClick={() => handleSelect(idx)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-sm flex items-center justify-center font-mono text-xs font-bold border transition-all duration-200 ${
                      isActive
                        ? 'bg-cyan-accent text-bg-primary border-white shadow-glow-cyan scale-110'
                        : isPast
                        ? 'bg-[#101923] text-cyan-accent border-cyan-accent/60'
                        : 'bg-[#0A111A] text-technical-dim border-white/20 group-hover:border-cyan-accent/60'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`mt-2 font-mono text-xs tracking-wider transition-colors ${
                      isActive ? 'text-cyan-accent font-bold' : 'text-technical-dim group-hover:text-white'
                    }`}
                  >
                    {event.year}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Event Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Detail Blueprint Card */}
          <div className="lg:col-span-8 bg-[#0D1520] border border-cyan-accent/30 rounded-sm p-6 sm:p-8 relative tech-corner-tl tech-corner-br shadow-2xl flex flex-col justify-between">
            {/* Top metadata */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyan-accent/15 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <TechBadge variant="cyan" dot>
                    {currentEvent.badge}
                  </TechBadge>
                  <span className="font-mono text-xs text-technical-dim flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-accent" /> {currentEvent.coordinates}
                  </span>
                </div>
                <span className="font-heading font-black text-2xl text-cyan-accent">
                  {currentEvent.year}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                {currentEvent.title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-cyan-accent/80 mt-1 uppercase tracking-wide">
                {currentEvent.subtitle}
              </p>

              {/* Description */}
              <p className="font-body text-base text-slate-200 mt-6 leading-relaxed">
                {currentEvent.description}
              </p>

              {/* Key Contributions */}
              <div className="mt-8 space-y-3">
                <div className="font-mono text-xs text-cyan-accent uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span>// VERIFIED HISTORICAL RECORD</span>
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  {currentEvent.keyContributions.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-[#0A111A]/80 border border-white/5 rounded-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                      <span className="font-body text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-8 pt-6 border-t border-cyan-accent/15 flex items-center justify-between">
              <div className="font-mono text-xs text-technical-dim">
                PROGRESS: <span className="text-cyan-accent font-bold">0{currentIndex + 1}</span> / 0{TIMELINE_DATA.length}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="px-3 py-2 border border-cyan-accent/30 bg-[#0A111A] text-white hover:text-cyan-accent hover:border-cyan-accent text-xs font-mono flex items-center gap-1 uppercase transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> PREV
                </button>
                <button
                  onClick={handleNext}
                  className="px-3 py-2 border border-cyan-accent/30 bg-[#0A111A] text-white hover:text-cyan-accent hover:border-cyan-accent text-xs font-mono flex items-center gap-1 uppercase transition-colors"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Technical Blueprint Schematic Diagram */}
          <div className="lg:col-span-4 bg-[#0A111A] border border-cyan-accent/20 rounded-sm p-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 font-mono text-[10px] text-technical-dim">
              FIG 19.{currentIndex + 1} // SCHEMATIC
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-sm bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center">
                {getSchematicIcon(currentEvent.schematicType)}
              </div>

              <div>
                <span className="font-mono text-[10px] text-cyan-accent tracking-widest uppercase">
                  ENGINEERING PRINCIPLE
                </span>
                <h4 className="font-heading font-bold text-lg text-white uppercase mt-1">
                  {currentEvent.schematicType === 'krs'
                    ? 'Hydro-Gravity Masonry & Surkhi Mortar'
                    : currentEvent.schematicType === 'irrigation'
                    ? 'Automatic Weir Counterbalance Physics'
                    : currentEvent.schematicType === 'flood'
                    ? 'Dual Reservoir Hydro-Moderation'
                    : currentEvent.schematicType === 'industry'
                    ? 'Institutional Self-Reliance'
                    : 'Precision Engineering Ethics'}
                </h4>
              </div>

              {/* Technical Drawing SVG Visualization */}
              <div className="h-44 border border-cyan-accent/20 bg-[#05080D] p-4 rounded-sm relative flex items-center justify-center">
                <svg className="w-full h-full text-cyan-accent" viewBox="0 0 200 120" fill="none">
                  {/* Grid markings */}
                  <line x1="10" y1="60" x2="190" y2="60" stroke="rgba(0, 217, 255, 0.2)" strokeDasharray="2 2" />
                  <line x1="100" y1="10" x2="100" y2="110" stroke="rgba(0, 217, 255, 0.2)" strokeDasharray="2 2" />

                  {/* Dynamic technical geometry based on step */}
                  {currentEvent.schematicType === 'irrigation' || currentEvent.schematicType === 'krs' ? (
                    <>
                      {/* Dam profile and water pressure vectors */}
                      <polygon points="40,100 80,30 110,30 150,100" stroke="#00D9FF" strokeWidth="1.5" fill="rgba(0,217,255,0.08)" />
                      <line x1="80" y1="30" x2="80" y2="100" stroke="#1687FF" strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="110" cy="30" r="4" fill="#00D9FF" />
                      {/* Water arrows */}
                      <path d="M 10 50 Q 25 45 40 50" stroke="#00D9FF" strokeWidth="1.5" />
                      <path d="M 10 70 Q 25 65 40 70" stroke="#00D9FF" strokeWidth="1.5" />
                      <text x="12" y="42" fill="#8B9AAA" fontSize="7" fontFamily="monospace">HEAD: 120m</text>
                    </>
                  ) : currentEvent.schematicType === 'flood' ? (
                    <>
                      {/* Dual reservoir balancing schematic */}
                      <rect x="25" y="40" width="50" height="40" stroke="#00D9FF" strokeWidth="1.5" fill="rgba(0,217,255,0.08)" />
                      <rect x="125" y="40" width="50" height="40" stroke="#00D9FF" strokeWidth="1.5" fill="rgba(0,217,255,0.08)" />
                      <path d="M 75 60 L 125 60" stroke="#1687FF" strokeWidth="2" strokeDasharray="4 2" />
                      <circle cx="100" cy="60" r="3" fill="#00D9FF" />
                      <text x="32" y="63" fill="#F5F7FA" fontSize="7" fontFamily="monospace">OSMAN SAGAR</text>
                      <text x="128" y="63" fill="#F5F7FA" fontSize="7" fontFamily="monospace">HIMAYAT SAGAR</text>
                    </>
                  ) : (
                    <>
                      {/* General engineering compass / coordinate geometry */}
                      <circle cx="100" cy="60" r="35" stroke="#00D9FF" strokeWidth="1.2" strokeDasharray="4 2" />
                      <circle cx="100" cy="60" r="20" stroke="#1687FF" strokeWidth="1" />
                      <line x1="70" y1="30" x2="130" y2="90" stroke="#00D9FF" strokeWidth="1.5" />
                      <circle cx="100" cy="60" r="3" fill="#00D9FF" />
                      <text x="65" y="105" fill="#8B9AAA" fontSize="7" fontFamily="monospace">TOLERANCE: ±0.01mm</text>
                    </>
                  )}
                </svg>
              </div>

              <p className="font-body text-xs text-technical-dim leading-relaxed">
                "Remember, your work may be only to sweep a railway crossing, but it is your duty to keep it so clean that no other crossing in the world is even half as clean."
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 font-mono text-[10px] text-technical-dim flex justify-between">
              <span>MUDDENAHALLI → BENGALURU</span>
              <span className="text-cyan-accent">CIVIC ARCHIVE</span>
            </div>
          </div>
        </div>

        {/* Mobile Vertical Timeline Selector */}
        <div className="mt-8 md:hidden flex overflow-x-auto gap-2 pb-2">
          {TIMELINE_DATA.map((item, idx) => (
            <button
              key={item.year}
              onClick={() => handleSelect(idx)}
              className={`px-3 py-1.5 font-mono text-xs whitespace-nowrap border shrink-0 ${
                idx === currentIndex
                  ? 'border-cyan-accent bg-cyan-accent/15 text-cyan-accent font-bold'
                  : 'border-white/10 text-technical-dim'
              }`}
            >
              {item.year}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
