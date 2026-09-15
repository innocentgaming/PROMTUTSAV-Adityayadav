import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Terminal } from 'lucide-react';
import { GlowButton } from '../common/GlowButton';

interface NavbarProps {
  activeSection: string;
  scrollProgress: number;
  isMuted: boolean;
  onToggleMute: () => void;
  onPlayClick: () => void;
  onOpenTerminal?: () => void;
}

const NAV_ITEMS = [
  { id: 'legacy', label: 'LEGACY' },
  { id: 'engineering', label: 'ENGINEERING' },
  { id: 'ai-engineering', label: 'AI × ENGINEERING' },
  { id: 'challenge', label: 'CHALLENGE' },
  { id: 'innovation', label: 'INNOVATION' },
  { id: 'future', label: 'FUTURE' },
  { id: 'identity', label: 'IDENTITY ID' },
  { id: 'event', label: 'EVENT' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  scrollProgress,
  isMuted,
  onToggleMute,
  onPlayClick,
  onOpenTerminal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onPlayClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.offsetTop - 75;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 bg-[#05080D]/90 backdrop-blur-md border-b border-cyan-accent/20 shadow-lg shadow-black/50'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll Progress line at the very top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-accent to-cyan-accent shadow-glow-cyan transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onPlayClick();
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-sm bg-cyan-accent/10 border border-cyan-accent flex items-center justify-center text-cyan-accent group-hover:bg-cyan-accent group-hover:text-bg-primary transition-all duration-200">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-base tracking-widest text-white group-hover:text-cyan-accent transition-colors flex items-center gap-1.5">
              ENGINEER <span className="text-cyan-accent">2.0</span>
            </div>
            <div className="font-mono text-[9px] text-technical-dim tracking-wider uppercase">
              15 SEPT • BUILD THE FUTURE
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-[#101923]/60 border border-cyan-accent/15 px-3 py-1.5 rounded-sm backdrop-blur-md">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1 text-xs font-mono tracking-wider transition-all duration-150 rounded-sm relative ${
                  isActive
                    ? 'text-cyan-accent bg-cyan-accent/10 border-b border-cyan-accent font-semibold'
                    : 'text-technical-dim hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="inline-block w-1 h-1 rounded-full bg-cyan-accent mr-1.5 animate-pulse" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & Sound Control */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Cyber Terminal Toggle */}
          {onOpenTerminal && (
            <button
              onClick={() => {
                onPlayClick();
                onOpenTerminal();
              }}
              className="p-2 text-technical-dim hover:text-cyan-accent hover:bg-white/5 rounded-sm border border-transparent hover:border-cyan-accent/30 transition-colors flex items-center gap-1 text-xs font-mono"
              title="Open Cyber Terminal Console (~)"
              aria-label="Open Cyber Terminal"
            >
              <Terminal className="w-4 h-4 text-cyan-accent" />
              <span className="hidden lg:inline text-[11px] text-cyan-accent">TERMINAL</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 text-technical-dim hover:text-cyan-accent hover:bg-white/5 rounded-sm border border-transparent hover:border-cyan-accent/30 transition-colors"
            title={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            aria-label="Toggle Sound"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 opacity-70" />
            ) : (
              <Volume2 className="w-4 h-4 text-cyan-accent animate-pulse" />
            )}
          </button>

          <GlowButton
            variant="primary"
            size="sm"
            onClick={() => handleNavClick('identity')}
          >
            ENTER EXPERIENCE
          </GlowButton>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={onToggleMute}
            className="p-2 text-technical-dim hover:text-cyan-accent"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-accent" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white border border-cyan-accent/30 rounded-sm bg-[#101923] hover:border-cyan-accent"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-accent" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[60px] bg-[#0A111A]/95 backdrop-blur-xl border-b border-cyan-accent/30 p-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 font-mono text-sm tracking-widest border transition-all ${
                    isActive
                      ? 'border-cyan-accent bg-cyan-accent/15 text-cyan-accent font-semibold'
                      : 'border-white/5 text-technical-dim hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-cyan-accent/60 mr-2">//</span>
                  {item.label}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-cyan-accent/20 flex flex-col gap-3">
              <GlowButton
                variant="primary"
                size="md"
                onClick={() => handleNavClick('identity')}
                className="w-full"
              >
                ENTER EXPERIENCE
              </GlowButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
