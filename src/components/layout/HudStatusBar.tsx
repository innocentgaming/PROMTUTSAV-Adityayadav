import React, { useState, useEffect } from 'react';
import { Terminal, Activity, VolumeX, Binary } from 'lucide-react';

interface HudStatusBarProps {
  onOpenTerminal: () => void;
  onToggleMatrix: () => void;
  isMatrixActive: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  currentTheme: string;
  onSetTheme: (theme: string) => void;
  onPlayClick: () => void;
}

export const HudStatusBar: React.FC<HudStatusBarProps> = ({
  onOpenTerminal,
  onToggleMatrix,
  isMatrixActive,
  isMuted,
  onToggleMute,
  currentTheme,
  onSetTheme,
  onPlayClick,
}) => {
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = (now: number) => {
      frameCount++;
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <aside
      aria-label="System Telemetry & Controls"
      className="fixed bottom-4 left-4 z-40 hidden md:flex items-center gap-2 bg-[#05080D]/90 backdrop-blur-md border border-cyan-accent/25 rounded-full px-3.5 py-1.5 shadow-xl shadow-black/80 font-mono text-xs select-none transition-all duration-300"
    >
      {/* Online Status */}
      <div className="flex items-center gap-1.5 pr-2 border-r border-white/10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-accent"></span>
        </span>
        <span className="text-[10px] text-technical-dim tracking-wider font-semibold">
          SYS:ONLINE
        </span>
      </div>

      {/* Real-time FPS */}
      <div className="flex items-center gap-1 px-1.5 text-technical-dim text-[10px] border-r border-white/10">
        <Activity className="w-3 h-3 text-cyan-accent" />
        <span className="text-white font-semibold">{fps}</span>
        <span className="text-[9px]">FPS</span>
      </div>

      {/* Matrix Toggle Button */}
      <button
        onClick={() => {
          onPlayClick();
          onToggleMatrix();
        }}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-all ${
          isMatrixActive
            ? 'bg-emerald-accent/20 border-emerald-accent text-emerald-accent shadow-glow-emerald'
            : 'border-white/10 text-technical-dim hover:text-white hover:bg-white/5'
        }`}
        title="Toggle Matrix Code Rain Canvas"
      >
        <Binary className="w-3 h-3" />
        <span>MATRIX</span>
      </button>

      {/* Theme Quick Switcher */}
      <div className="flex items-center gap-1 px-1 border-r border-white/10">
        {(['cyan', 'emerald', 'plasma'] as const).map((theme) => (
          <button
            key={theme}
            onClick={() => {
              onPlayClick();
              onSetTheme(theme);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              theme === 'cyan'
                ? 'bg-[#00D9FF]'
                : theme === 'emerald'
                ? 'bg-[#10B981]'
                : 'bg-[#F59E0B]'
            } ${currentTheme === theme ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-100'}`}
            title={`Switch Theme: ${theme.toUpperCase()}`}
          />
        ))}
      </div>

      {/* Terminal Trigger Button */}
      <button
        onClick={() => {
          onPlayClick();
          onOpenTerminal();
        }}
        className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] bg-cyan-accent/10 border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent/20 transition-all group"
        title="Open Cyber Terminal Console (Shortcut: ~)"
      >
        <Terminal className="w-3 h-3" />
        <span>TERMINAL</span>
        <kbd className="hidden lg:inline bg-black/40 px-1 py-0.2 rounded text-[9px] text-white/60 group-hover:text-cyan-accent">
          ~
        </kbd>
      </button>

      {/* Sound Visualizer & Toggle */}
      <button
        onClick={() => {
          onPlayClick();
          onToggleMute();
        }}
        className="flex items-center gap-1 pl-1.5 text-technical-dim hover:text-cyan-accent transition-colors"
        title={isMuted ? 'Unmute Audio Synthesizer' : 'Mute Audio Synthesizer'}
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
        ) : (
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-full bg-cyan-accent animate-pulse" />
            <span className="w-0.5 h-2/3 bg-cyan-accent animate-bounce" />
            <span className="w-0.5 h-full bg-cyan-accent animate-pulse" />
          </div>
        )}
      </button>
    </aside>
  );
};
