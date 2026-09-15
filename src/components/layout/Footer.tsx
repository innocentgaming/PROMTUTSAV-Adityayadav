import React from 'react';
import { EVENT_CONFIG } from '../../config/eventConfig';
import { Terminal, Shield, Cpu, ExternalLink, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#05080D] border-t border-cyan-accent/20 text-technical-dim font-mono text-xs overflow-hidden">
      {/* Background blueprint elements */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-20 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-cyan-accent/10 border border-cyan-accent flex items-center justify-center text-cyan-accent">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold text-xl text-white tracking-widest">
                ENGINEER <span className="text-cyan-accent">2.0</span>
              </span>
            </div>

            <p className="font-heading text-sm text-cyan-accent/90 uppercase tracking-widest font-semibold">
              BUILD THE FUTURE
            </p>

            <p className="font-body text-sm text-technical-dim max-w-sm leading-relaxed">
              From the pioneering hydraulic foundations laid by Sir M. Visvesvaraya to autonomous AI systems and space robotics, engineering continues to transform our civilization.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyan-accent/30 bg-[#0A111A] text-cyan-accent text-[11px]">
                <span className="w-2 h-2 rounded-full bg-cyan-accent animate-ping" />
                SYSTEM RUNTIME: 15 SEPTEMBER 2026
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-semibold uppercase tracking-wider text-sm border-b border-cyan-accent/20 pb-2">
              SECTIONS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#legacy" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> Visvesvaraya Legacy
                </a>
              </li>
              <li>
                <a href="#engineering" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> 8 Engineering Domains
                </a>
              </li>
              <li>
                <a href="#ai-engineering" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> AI × Engineering Pipeline
                </a>
              </li>
              <li>
                <a href="#challenge" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> Engineering Thinking Challenge
                </a>
              </li>
              <li>
                <a href="#innovation" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> From Idea to Impact
                </a>
              </li>
              <li>
                <a href="#future" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> 2035 Horizons
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Event & Identity */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-semibold uppercase tracking-wider text-sm border-b border-cyan-accent/20 pb-2">
              EVENT ACCESS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#identity" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> Generate Digital ID
                </a>
              </li>
              <li>
                <a href="#event" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> Event Schedule & Venue
                </a>
              </li>
              <li>
                <a href="#register" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> Delegate Registration
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-cyan-accent transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-accent/50">//</span> Prototype Gallery
                </a>
              </li>
              <li className="pt-2 text-technical-dim/80">
                <span>{EVENT_CONFIG.venue}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Institutional & Connect */}
          <div className="space-y-3">
            <h4 className="text-white font-heading font-semibold uppercase tracking-wider text-sm border-b border-cyan-accent/20 pb-2">
              INSTITUTION
            </h4>
            <p className="text-xs text-technical-dim font-body leading-relaxed">
              {EVENT_CONFIG.collegeName}
            </p>
            <p className="text-xs text-technical-dim">
              {EVENT_CONFIG.locationCity}
            </p>
            <div className="pt-2 space-y-1">
              <a
                href={`mailto:${EVENT_CONFIG.contactEmail}`}
                className="text-cyan-accent hover:underline flex items-center gap-1 text-xs"
              >
                {EVENT_CONFIG.contactEmail} <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="pt-3 flex items-center gap-2">
              <button
                onClick={scrollToTop}
                className="px-3 py-1.5 border border-cyan-accent/30 bg-[#0A111A] text-white hover:text-cyan-accent hover:border-cyan-accent transition-all flex items-center gap-1.5 text-xs uppercase"
              >
                <ArrowUp className="w-3 h-3" /> TOP
              </button>
            </div>
          </div>
        </div>

        {/* Technical Sub-Footer */}
        <div className="mt-12 pt-6 border-t border-cyan-accent/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-technical-dim">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1 text-cyan-accent">
              <Cpu className="w-3.5 h-3.5" /> SYSTEM STATUS: ONLINE
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" /> VERSION: {EVENT_CONFIG.systemStatus.version}
            </span>
            <span>BUILT FOR ENGINEERS</span>
          </div>

          <div className="text-center md:text-right">
            © 2026 ENGINEER 2.0 • COMMEMORATING SIR M. VISVESVARAYA
          </div>
        </div>
      </div>
    </footer>
  );
};
