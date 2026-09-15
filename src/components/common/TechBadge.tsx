import React from 'react';

interface TechBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'blue' | 'green' | 'amber' | 'dim';
  className?: string;
  dot?: boolean;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
  dot = false,
}) => {
  const variantStyles = {
    cyan: 'border-cyan-accent/30 bg-cyan-accent/10 text-cyan-accent',
    blue: 'border-blue-accent/30 bg-blue-accent/10 text-blue-accent',
    green: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
    dim: 'border-white/10 bg-white/5 text-technical-dim',
  };

  const dotColors = {
    cyan: 'bg-cyan-accent animate-pulse',
    blue: 'bg-blue-accent animate-pulse',
    green: 'bg-emerald-400 animate-pulse',
    amber: 'bg-amber-400 animate-pulse',
    dim: 'bg-technical-dim',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider border rounded-sm ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
