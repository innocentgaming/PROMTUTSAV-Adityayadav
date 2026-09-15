import React, { useState } from 'react';
import { EVENT_CONFIG } from '../../config/eventConfig';
import { GlowButton } from '../common/GlowButton';
import { TechBadge } from '../common/TechBadge';
import { CheckCircle2, Shield, Users, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationCtaProps {
  onPlayClick: () => void;
  onPlaySuccess: () => void;
}

export const RegistrationCta: React.FC<RegistrationCtaProps> = ({
  onPlayClick,
  onPlaySuccess,
}) => {
  const [registered, setRegistered] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onPlayClick();
    setRegistered(true);
    onPlaySuccess();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#00D9FF', '#1687FF', '#F5F7FA'],
      });
    } catch {
      // Fallback
    }
  };

  const percentage = Math.round(
    (EVENT_CONFIG.currentRegistrations / EVENT_CONFIG.maxParticipants) * 100
  );

  return (
    <section
      id="register"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#05080D] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint opacity-25 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-[#0A111A] border-2 border-cyan-accent/40 rounded-sm p-8 sm:p-12 relative tech-corner-tl tech-corner-br shadow-glow-cyan">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2">
              <TechBadge variant="cyan" dot>
                LIMITED CAPACITY: {EVENT_CONFIG.maxParticipants} SEATS
              </TechBadge>
            </div>

            <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
              READY TO BUILD THE FUTURE?
            </h2>

            <p className="font-body text-sm sm:text-base text-slate-300 leading-relaxed">
              Secure your delegate pass for Engineers' Day 2026. Experience live hardware showcases, participate in real-time hack simulations, and network with leading engineering minds.
            </p>

            {/* Capacity Progress Bar */}
            <div className="pt-2 max-w-md mx-auto space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-technical-dim">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-cyan-accent" /> DELEGATE SLOTS FILLED:
                </span>
                <span className="text-cyan-accent font-bold">
                  {EVENT_CONFIG.currentRegistrations} / {EVENT_CONFIG.maxParticipants} ({percentage}%)
                </span>
              </div>
              <div className="h-2 w-full bg-black/60 border border-cyan-accent/30 rounded-none overflow-hidden p-[1px]">
                <div
                  className="h-full bg-gradient-to-r from-blue-accent to-cyan-accent"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Registration Form / Status */}
            <div className="pt-6 max-w-md mx-auto">
              {registered ? (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/40 rounded-sm text-center space-y-2 animate-in zoom-in-95">
                  <div className="flex items-center justify-center gap-2 text-emerald-400 font-heading font-bold uppercase text-base">
                    <CheckCircle2 className="w-5 h-5" /> DELEGATE PASS ALLOCATED
                  </div>
                  <p className="font-mono text-xs text-slate-300">
                    A confirmation packet with your digital RFID coordinates has been dispatched to <strong>{email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter academic or work email"
                    required
                    className="flex-1 bg-[#05080D] border border-cyan-accent/30 rounded-sm px-4 py-3 font-mono text-xs text-white focus:outline-none focus:border-cyan-accent"
                  />
                  <GlowButton
                    type="submit"
                    variant="primary"
                    size="md"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    REGISTER NOW
                  </GlowButton>
                </form>
              )}
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 font-mono text-[11px] text-technical-dim">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-cyan-accent" /> ZERO ADMISSION FEE
              </span>
              <span>•</span>
              <span>VERIFIED BADGES ISSUED ON-SITE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
