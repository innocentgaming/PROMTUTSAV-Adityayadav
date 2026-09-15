import React from 'react';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  glow = true,
  className = '',
  onClick,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-mono',
    md: 'px-5 py-2.5 text-sm font-mono tracking-wider',
    lg: 'px-7 py-3.5 text-base font-mono tracking-widest',
  };

  const variantStyles = {
    primary:
      'bg-cyan-accent text-bg-primary font-semibold hover:bg-white hover:text-bg-primary shadow-glow-cyan border border-cyan-accent',
    secondary:
      'bg-bg-surface text-cyan-accent hover:bg-cyan-accent/15 border border-cyan-accent/30 hover:border-cyan-accent',
    outline:
      'bg-transparent text-[#F5F7FA] hover:text-cyan-accent border border-white/20 hover:border-cyan-accent/60',
    ghost:
      'bg-transparent text-technical-dim hover:text-cyan-accent hover:bg-white/5 border border-transparent',
  };

  return (
    <button
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${
        sizeStyles[size]
      } ${variantStyles[variant]} ${glow ? 'hover:shadow-glow-cyan' : ''} ${className}`}
      {...props}
    >
      {/* HUD Corner markers */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-current opacity-70 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-current opacity-70 pointer-events-none" />

      {icon && iconPosition === 'left' && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative z-10 uppercase">{children}</span>
      {icon && iconPosition === 'right' && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
};
