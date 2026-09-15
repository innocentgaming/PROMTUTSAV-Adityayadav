import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-2xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className={`relative w-full ${maxWidth} bg-bg-surface border border-cyan-accent/30 rounded-sm shadow-2xl p-6 sm:p-8 z-10 my-8`}
      >
        {/* Decorative corner markers */}
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-accent" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-accent" />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-cyan-accent/20 pb-4 mb-6">
          <div>
            <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest">
              SYSTEM INSPECTION // DETAILS
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white uppercase mt-1">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-technical-dim font-mono mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-technical-dim hover:text-white hover:bg-white/10 rounded-sm border border-transparent hover:border-cyan-accent/30 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="text-sm font-body text-slate-200">{children}</div>
      </div>
    </div>
  );
};
