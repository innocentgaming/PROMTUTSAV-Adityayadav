import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../../data/galleryData';
import type { GalleryItem } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { Modal } from '../common/Modal';
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface GalleryProps {
  onPlayClick: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onPlayClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const categories = ['ALL', 'EVENT', 'ENGINEERING', 'INNOVATION', 'STUDENTS', 'PROJECTS'];

  const filteredItems =
    selectedCategory === 'ALL'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const activeItem = activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === 'ArrowRight') {
        setActiveItemIndex((prev) =>
          prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveItemIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeItemIndex, filteredItems.length]);

  const handleOpenItem = (index: number) => {
    onPlayClick();
    setActiveItemIndex(index);
  };

  const renderBlueprintGraphic = (item: GalleryItem) => {
    return (
      <div className="w-full h-48 bg-[#05080D] border border-cyan-accent/20 rounded-sm relative overflow-hidden flex flex-col items-center justify-center p-4 select-none">
        {/* Fine grid background */}
        <div className="absolute inset-0 bg-blueprint-fine opacity-40 pointer-events-none" />

        {/* Dynamic Schematic Geometry based on title/category */}
        <svg className="w-full h-full text-cyan-accent" viewBox="0 0 240 120" fill="none">
          <circle cx="120" cy="60" r="45" stroke="#00D9FF" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="120" cy="60" r="30" stroke="#1687FF" strokeWidth="1.2" />
          <rect x="70" y="35" width="100" height="50" stroke="#00D9FF" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="20" y1="60" x2="220" y2="60" stroke="rgba(0, 217, 255, 0.3)" />
          <line x1="120" y1="10" x2="120" y2="110" stroke="rgba(0, 217, 255, 0.3)" />
          <circle cx="120" cy="60" r="4" fill="#00D9FF" />

          {/* Floating tech markings */}
          <text x="30" y="25" fill="#00D9FF" fontSize="7" fontFamily="monospace">REF: {item.id.toUpperCase()}</text>
          <text x="30" y="105" fill="#8B9AAA" fontSize="7" fontFamily="monospace">SCALE 1:50</text>
          <text x="170" y="105" fill="#8B9AAA" fontSize="7" fontFamily="monospace">ISO 9001</text>
        </svg>

        <div className="absolute top-2 right-2 font-mono text-[9px] text-cyan-accent/80 bg-black/60 px-2 py-0.5 border border-cyan-accent/30 rounded-sm">
          {item.dimensions}
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070B12] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-blueprint-fine opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="10"
          badge="VISUAL ARCHIVE & PROTOTYPES"
          title="ENGINEERING GALLERY"
          subtitle="A visual compendium of laboratory prototypes, field tests, and event archives."
          description="Browse high-resolution telemetry schematics, wind tunnel validations, and campus hackathon build sessions."
        />

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                onPlayClick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'border-cyan-accent bg-cyan-accent/15 text-cyan-accent font-bold shadow-glow-cyan'
                  : 'border-white/10 bg-[#0A111A] text-technical-dim hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleOpenItem(idx)}
              className="bg-[#0A111A] border border-cyan-accent/20 rounded-sm p-4 flex flex-col justify-between group hover:border-cyan-accent hover:shadow-glow-cyan transition-all duration-300 cursor-pointer tech-card"
            >
              <div>
                {/* Visual Blueprint Graphic */}
                <div className="relative group-hover:scale-[1.02] transition-transform">
                  {renderBlueprintGraphic(item)}
                  <div className="absolute inset-0 bg-cyan-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <Maximize2 className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <TechBadge variant="cyan">{item.category}</TechBadge>
                  <span className="font-mono text-[10px] text-technical-dim">{item.year}</span>
                </div>

                <h4 className="font-heading font-bold text-base text-white uppercase mt-2 group-hover:text-cyan-accent transition-colors">
                  {item.title}
                </h4>

                <p className="font-body text-xs text-slate-300 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-4 pt-3 border-t border-cyan-accent/15 flex flex-wrap gap-1">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono text-technical-dim bg-white/5 px-1.5 py-0.5 rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <Modal
          isOpen={activeItemIndex !== null}
          onClose={() => setActiveItemIndex(null)}
          title={activeItem.title}
          subtitle={`ARCHIVE REF: ${activeItem.id.toUpperCase()} • YEAR: ${activeItem.year}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-4">
            {/* Enlarged Schematic View */}
            <div className="w-full h-64 bg-[#05080D] border-2 border-cyan-accent/40 rounded-sm p-6 relative flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-blueprint opacity-30 pointer-events-none" />
              <svg className="w-full h-full text-cyan-accent" viewBox="0 0 280 140" fill="none">
                <circle cx="140" cy="70" r="55" stroke="#00D9FF" strokeWidth="1.2" strokeDasharray="4 2" />
                <circle cx="140" cy="70" r="35" stroke="#1687FF" strokeWidth="1.5" />
                <polygon points="140,25 180,95 100,95" stroke="#00D9FF" strokeWidth="1.5" fill="rgba(0,217,255,0.06)" />
                <line x1="20" y1="70" x2="260" y2="70" stroke="rgba(0, 217, 255, 0.4)" strokeDasharray="3 3" />
                <line x1="140" y1="10" x2="140" y2="130" stroke="rgba(0, 217, 255, 0.4)" strokeDasharray="3 3" />
                <circle cx="140" cy="70" r="5" fill="#00D9FF" />
                <text x="35" y="30" fill="#00D9FF" fontSize="9" fontFamily="monospace">RESOLUTION: {activeItem.dimensions}</text>
                <text x="35" y="125" fill="#8B9AAA" fontSize="9" fontFamily="monospace">ARCHIVE STATUS: VERIFIED</text>
              </svg>
            </div>

            <p className="font-body text-sm text-slate-200 leading-relaxed">
              {activeItem.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2 border-t border-cyan-accent/20">
              {activeItem.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 font-mono text-xs text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/30 rounded-sm"
                >
                  #{t}
                </span>
              ))}
            </div>

            {/* Lightbox Navigation Controls */}
            <div className="pt-4 border-t border-cyan-accent/20 flex items-center justify-between">
              <button
                onClick={() =>
                  setActiveItemIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1
                  )
                }
                className="px-3 py-1.5 border border-cyan-accent/30 bg-[#0A111A] text-white hover:text-cyan-accent text-xs font-mono flex items-center gap-1 uppercase"
              >
                <ChevronLeft className="w-4 h-4" /> PREVIOUS
              </button>

              <span className="font-mono text-xs text-technical-dim">
                {activeItemIndex !== null ? activeItemIndex + 1 : 0} / {filteredItems.length}
              </span>

              <button
                onClick={() =>
                  setActiveItemIndex((prev) =>
                    prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0
                  )
                }
                className="px-3 py-1.5 border border-cyan-accent/30 bg-[#0A111A] text-white hover:text-cyan-accent text-xs font-mono flex items-center gap-1 uppercase"
              >
                NEXT <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
