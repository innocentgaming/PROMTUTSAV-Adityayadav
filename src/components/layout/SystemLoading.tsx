import React, { useEffect, useState } from 'react';
import { Terminal, ShieldCheck, Cpu } from 'lucide-react';

interface SystemLoadingProps {
  onComplete: () => void;
}

export const SystemLoading: React.FC<SystemLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [logText, setLogText] = useState('ALLOCATING MEMORY...');

  useEffect(() => {
    const logs = [
      'ALLOCATING QUANTUM BUFFER...',
      'CALIBRATING HYDRAULIC MATRICES...',
      'SYNCHRONIZING VISVESVARAYA LEGACY DATA...',
      'INITIALIZING AI ENGINE PIPELINES...',
      'LOADING 2035 FUTURES MODULES...',
      'SYSTEM READY: ENGINEER 2.0 ONLINE',
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 3;
        const logIndex = Math.min(
          logs.length - 1,
          Math.floor((next / 100) * logs.length)
        );
        setLogText(logs[logIndex]);

        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 250);
          return 100;
        }
        return next;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#05080D] flex flex-col items-center justify-center p-6 select-none font-mono">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-md border border-cyan-accent/30 bg-[#0A111A]/90 p-6 rounded-sm shadow-glow-cyan">
        {/* Corner marks */}
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-accent" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-accent" />

        <div className="flex items-center justify-between border-b border-cyan-accent/20 pb-3 mb-4">
          <div className="flex items-center gap-2 text-cyan-accent">
            <Cpu className="w-4 h-4 animate-spin" />
            <span className="text-xs tracking-widest uppercase">KERNEL BOOT</span>
          </div>
          <span className="text-xs text-technical-dim">VER 2.0.26</span>
        </div>

        <div className="text-center my-6">
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-white tracking-widest">
            ENGINEER <span className="text-cyan-accent">2.0</span>
          </h1>
          <p className="text-[11px] text-technical-dim uppercase tracking-widest mt-1">
            BUILD THE FUTURE // 15 SEPTEMBER
          </p>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-cyan-accent">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              {logText}
            </span>
            <span className="font-bold">{progress}%</span>
          </div>

          <div className="h-2 w-full bg-black/60 border border-cyan-accent/30 rounded-none overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-blue-accent to-cyan-accent transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-cyan-accent/10 flex items-center justify-between text-[10px] text-technical-dim">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> INTEGRITY CHECK: PASS
          </span>
          <span>SYSTEM TIME: 15.09.2026</span>
        </div>
      </div>
    </div>
  );
};
