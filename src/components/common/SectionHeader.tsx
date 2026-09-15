import React from 'react';
import { TechBadge } from './TechBadge';

interface SectionHeaderProps {
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  badge,
  title,
  subtitle,
  description,
  align = 'left',
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 md:mb-16 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-3xl'} ${className}`}>
      <div className={`flex items-center gap-3 mb-3 ${isCenter ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs text-cyan-accent font-semibold tracking-widest">
          // {number}
        </span>
        <span className="w-6 h-[1px] bg-cyan-accent/40" />
        <TechBadge variant="cyan" dot>
          {badge}
        </TechBadge>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight uppercase">
        {title}
      </h2>

      <p className="mt-2 text-lg sm:text-xl font-heading text-cyan-accent/90 font-medium">
        {subtitle}
      </p>

      {description && (
        <p className="mt-4 text-sm sm:text-base text-technical-dim font-body leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
