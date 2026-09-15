import React, { useState } from 'react';
import { EVENT_SCHEDULE, EVENT_SPEAKERS } from '../../data/eventSchedule';
import { EVENT_CONFIG } from '../../config/eventConfig';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  User,
  Mic,
} from 'lucide-react';

interface EventSectionProps {
  onPlayClick: () => void;
}

export const EventSection: React.FC<EventSectionProps> = ({ onPlayClick }) => {
  const [activeTab, setActiveTab] = useState<'schedule' | 'speakers'>('schedule');

  return (
    <section
      id="event"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="09"
          badge="EVENT DISPATCH & LOGISTICS"
          title="ENGINEERS' DAY 2026"
          subtitle="Join 1,500+ builders, innovators, and research architects on September 15."
          description="Commemorating the 165th birth anniversary of Sir M. Visvesvaraya with keynote presentations, competitive engineering hack challenges, and working hardware exhibitions."
        />

        {/* Quick Event Logistics Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="p-4 bg-[#0A111A] border border-cyan-accent/25 rounded-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-sm bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block">
                OFFICIAL DATE
              </span>
              <span className="font-heading font-bold text-sm text-white uppercase">
                {EVENT_CONFIG.eventDate}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0A111A] border border-cyan-accent/25 rounded-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-sm bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block">
                TIMELINE
              </span>
              <span className="font-heading font-bold text-sm text-white uppercase">
                {EVENT_CONFIG.eventTime}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0A111A] border border-cyan-accent/25 rounded-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-sm bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block">
                CAMPUS VENUE
              </span>
              <span className="font-heading font-bold text-sm text-white uppercase truncate block max-w-[170px]">
                {EVENT_CONFIG.venue}
              </span>
            </div>
          </div>

          <div className="p-4 bg-[#0A111A] border border-cyan-accent/25 rounded-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-sm bg-cyan-accent/10 border border-cyan-accent/40 flex items-center justify-center text-cyan-accent shrink-0">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block">
                INSTITUTION
              </span>
              <span className="font-heading font-bold text-sm text-white uppercase truncate block max-w-[170px]">
                {EVENT_CONFIG.collegeName}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-cyan-accent/20 pb-4 mb-8">
          <button
            onClick={() => {
              onPlayClick();
              setActiveTab('schedule');
            }}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all ${
              activeTab === 'schedule'
                ? 'border-cyan-accent bg-cyan-accent/15 text-cyan-accent font-bold shadow-glow-cyan'
                : 'border-white/10 bg-[#0A111A] text-technical-dim hover:text-white'
            }`}
          >
            01 // SYMPOSIUM SCHEDULE
          </button>

          <button
            onClick={() => {
              onPlayClick();
              setActiveTab('speakers');
            }}
            className={`px-4 py-2 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all ${
              activeTab === 'speakers'
                ? 'border-cyan-accent bg-cyan-accent/15 text-cyan-accent font-bold shadow-glow-cyan'
                : 'border-white/10 bg-[#0A111A] text-technical-dim hover:text-white'
            }`}
          >
            02 // DISTINGUISHED SPEAKERS
          </button>
        </div>

        {/* Tab 1: Schedule Content */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {EVENT_SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0A111A] border border-cyan-accent/20 rounded-sm p-5 sm:p-6 hover:border-cyan-accent/50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <div className="font-mono text-sm font-bold text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/30 px-3 py-1.5 rounded-sm shrink-0">
                    {item.time}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TechBadge
                        variant={
                          item.category === 'KEYNOTE'
                            ? 'cyan'
                            : item.category === 'CHALLENGE'
                            ? 'amber'
                            : item.category === 'SHOWCASE'
                            ? 'green'
                            : 'dim'
                        }
                      >
                        {item.category}
                      </TechBadge>
                      <span className="font-mono text-xs text-technical-dim flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-accent" /> {item.location}
                      </span>
                    </div>

                    <h4 className="font-heading font-extrabold text-base sm:text-lg text-white uppercase group-hover:text-cyan-accent transition-colors">
                      {item.title}
                    </h4>

                    <p className="font-body text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                      {item.description}
                    </p>

                    {item.speaker && (
                      <div className="mt-2 font-mono text-xs text-cyan-accent/80 flex items-center gap-1.5">
                        <User className="w-3 h-3" /> SPEAKER: {item.speaker}
                      </div>
                    )}
                  </div>
                </div>

                <div className="font-mono text-[10px] text-technical-dim uppercase shrink-0 text-right md:block hidden">
                  SCHEDULED // ON TRACK
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Speakers Content */}
        {activeTab === 'speakers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENT_SPEAKERS.map((speaker) => (
              <div
                key={speaker.id}
                className="bg-[#0A111A] border border-cyan-accent/20 rounded-sm p-6 flex flex-col justify-between group hover:border-cyan-accent/60 transition-all tech-card"
              >
                <div className="flex items-start gap-4">
                  {/* Speaker Placeholder Avatar with futuristic border */}
                  <div className="w-16 h-16 rounded-sm bg-[#05080D] border border-cyan-accent flex items-center justify-center text-cyan-accent shrink-0 shadow-glow-cyan">
                    <User className="w-8 h-8" />
                  </div>

                  <div>
                    <TechBadge variant="cyan" dot className="mb-2">
                      {speaker.domainBadge}
                    </TechBadge>
                    <h4 className="font-heading font-extrabold text-lg text-white uppercase group-hover:text-cyan-accent transition-colors">
                      {speaker.name}
                    </h4>
                    <p className="font-mono text-xs text-cyan-accent/90 mt-0.5">
                      {speaker.role}
                    </p>
                    <p className="font-mono text-[11px] text-technical-dim">
                      {speaker.organization}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-cyan-accent/15">
                  <div className="font-mono text-[10px] text-technical-dim uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Mic className="w-3 h-3 text-cyan-accent" /> KEYNOTE PRESENTATION:
                  </div>
                  <p className="font-heading font-semibold text-xs sm:text-sm text-white">
                    "{speaker.topic}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
