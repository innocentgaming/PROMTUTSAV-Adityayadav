import React, { useState, useRef } from 'react';
import type { EngineerIdData } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { GlowButton } from '../common/GlowButton';
import {
  Download,
  Terminal,
  Cpu,
  QrCode,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface IdentityGeneratorProps {
  onPlayClick: () => void;
  onPlaySuccess: () => void;
}

const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Mechanical Engineering',
  'Civil & Structural Engineering',
  'Electronics & Communication',
  'Electrical Engineering',
  'Aerospace Engineering',
  'Environmental Engineering',
  'Robotics & Automation',
  'Chemical Engineering',
];

const TECHNOLOGIES = [
  'Artificial Intelligence & ML',
  'Autonomous Robotics',
  'Distributed Cloud Architecture',
  'Cybersecurity & Cryptography',
  'Semiconductors & VLSI',
  'IoT & Embedded Systems',
  'Quantum Computing',
  'Renewable Clean Energy',
  'Aerospace Avionics',
];

const SKILLS = [
  'System Architecture',
  'First-Principles Thinking',
  'Mathematical Modeling',
  'Algorithmic Problem Solving',
  'Rapid Physical Prototyping',
  'Finite Element Analysis',
  'Stress Testing & Reliability',
  'Cross-Disciplinary Leadership',
];

export const IdentityGenerator: React.FC<IdentityGeneratorProps> = ({
  onPlayClick,
  onPlaySuccess,
}) => {
  const [formData, setFormData] = useState({
    name: 'ADITYA YADAV',
    branch: BRANCHES[0],
    favoriteTech: TECHNOLOGIES[0],
    skill: SKILLS[0],
  });

  const [generatedId, setGeneratedId] = useState<EngineerIdData | null>({
    name: 'ADITYA YADAV',
    branch: BRANCHES[0],
    favoriteTech: TECHNOLOGIES[0],
    skill: SKILLS[0],
    engineerCode: 'ENG-2026-9482',
    issueDate: '15 SEPT 2026',
    systemClearance: 'LEVEL 4 // SENIOR ARCHITECT',
  });

  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateRandomCode = () => {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `ENG-2026-${rand}`;
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onPlayClick();

    const newId: EngineerIdData = {
      name: formData.name.toUpperCase().trim(),
      branch: formData.branch,
      favoriteTech: formData.favoriteTech,
      skill: formData.skill,
      engineerCode: generateRandomCode(),
      issueDate: '15 SEPT 2026',
      systemClearance: 'LEVEL 5 // SYSTEM FELLOW',
    };

    setGeneratedId(newId);
    onPlaySuccess();

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00D9FF', '#1687FF', '#ffffff'],
      });
    } catch {
      // Fallback
    }
  };

  // Client-side HTML Canvas Download
  const handleDownload = () => {
    if (!generatedId) return;
    onPlayClick();

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background fill
    ctx.fillStyle = '#070C14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Blueprint grid
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Outer border & corner accents
    ctx.strokeStyle = '#00D9FF';
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Header bar
    ctx.fillStyle = 'rgba(0, 217, 255, 0.15)';
    ctx.fillRect(20, 20, canvas.width - 40, 60);

    // Title
    ctx.fillStyle = '#00D9FF';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('ENGINEER 2.0 // OFFICIAL CREDENTIAL PASS', 40, 58);

    ctx.fillStyle = '#8B9AAA';
    ctx.font = '14px monospace';
    ctx.fillText('15 SEPTEMBER • ENGINEERS\' DAY', canvas.width - 310, 58);

    // Candidate Name
    ctx.fillStyle = '#F5F7FA';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(generatedId.name, 45, 140);

    // Branch
    ctx.fillStyle = '#00D9FF';
    ctx.font = 'bold 18px monospace';
    ctx.fillText(generatedId.branch.toUpperCase(), 45, 175);

    // Divider
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.3)';
    ctx.beginPath();
    ctx.moveTo(45, 195);
    ctx.lineTo(canvas.width - 45, 195);
    ctx.stroke();

    // Data Attributes
    ctx.fillStyle = '#8B9AAA';
    ctx.font = '13px monospace';
    ctx.fillText('CORE TECHNOLOGY:', 45, 235);
    ctx.fillText('ENGINEERING SKILL:', 45, 290);
    ctx.fillText('CREDENTIAL SERIAL:', 45, 345);
    ctx.fillText('STATUS:', 45, 400);

    ctx.fillStyle = '#F5F7FA';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText(generatedId.favoriteTech, 45, 258);
    ctx.fillText(generatedId.skill, 45, 313);

    ctx.fillStyle = '#00D9FF';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(generatedId.engineerCode, 45, 368);

    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('AUTHENTICATED // SYSTEM VERIFIED', 45, 423);

    // Right Side Mock QR & Telemetry
    ctx.strokeStyle = '#00D9FF';
    ctx.strokeRect(canvas.width - 200, 225, 150, 150);
    ctx.fillStyle = 'rgba(0, 217, 255, 0.05)';
    ctx.fillRect(canvas.width - 200, 225, 150, 150);

    // Draw QR-like pattern inside
    ctx.fillStyle = '#00D9FF';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if ((r + c) % 2 === 0 || (r * c) % 3 === 0) {
          ctx.fillRect(canvas.width - 185 + c * 24, 240 + r * 24, 18, 18);
        }
      }
    }

    ctx.fillStyle = '#8B9AAA';
    ctx.font = '11px monospace';
    ctx.fillText('HASH: SHA256_VERIFIED', canvas.width - 195, 395);
    ctx.fillText('LAT: 12.9716° N', canvas.width - 195, 415);
    ctx.fillText('LON: 77.5946° E', canvas.width - 195, 430);

    // Trigger download
    const link = document.createElement('a');
    link.download = `${generatedId.engineerCode}_pass.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <section
      id="identity"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#05080D] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="08"
          badge="DIGITAL CREDENTIAL GENERATOR"
          title="DEFINE YOUR ENGINEER IDENTITY"
          subtitle="Mint your official Engineer 2.0 digital pass."
          description="Every engineer is defined by their core craft, technical obsession, and problem-solving methodology. Configure your profile below to generate your downloadable access badge."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Form */}
          <div className="lg:col-span-6 bg-[#0A111A] border border-cyan-accent/25 rounded-sm p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-cyan-accent/15 pb-4 mb-6">
              <span className="font-mono text-xs text-cyan-accent uppercase tracking-widest flex items-center gap-2">
                <Terminal className="w-4 h-4" /> IDENTITY CONFIGURATOR
              </span>
              <TechBadge variant="cyan" dot>
                SYSTEM READY
              </TechBadge>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-1.5">
                  1. FULL NAME
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. VISVESVARAYA SEN"
                  required
                  maxLength={40}
                  className="w-full bg-[#05080D] border border-cyan-accent/30 rounded-sm px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyan-accent focus:shadow-glow-cyan"
                />
              </div>

              {/* Engineering Branch */}
              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-1.5">
                  2. ENGINEERING BRANCH
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full bg-[#05080D] border border-cyan-accent/30 rounded-sm px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyan-accent focus:shadow-glow-cyan"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b} className="bg-[#0A111A] text-white">
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Core Technology */}
              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-1.5">
                  3. CORE TECHNOLOGY SPECIALIZATION
                </label>
                <select
                  name="favoriteTech"
                  value={formData.favoriteTech}
                  onChange={handleInputChange}
                  className="w-full bg-[#05080D] border border-cyan-accent/30 rounded-sm px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyan-accent focus:shadow-glow-cyan"
                >
                  {TECHNOLOGIES.map((t) => (
                    <option key={t} value={t} className="bg-[#0A111A] text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Engineering Skill */}
              <div>
                <label className="block font-mono text-xs text-slate-300 uppercase tracking-wider mb-1.5">
                  4. PRIMARY ENGINEERING SUPERPOWER
                </label>
                <select
                  name="skill"
                  value={formData.skill}
                  onChange={handleInputChange}
                  className="w-full bg-[#05080D] border border-cyan-accent/30 rounded-sm px-4 py-2.5 font-mono text-sm text-white focus:outline-none focus:border-cyan-accent focus:shadow-glow-cyan"
                >
                  {SKILLS.map((s) => (
                    <option key={s} value={s} className="bg-[#0A111A] text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4">
                <GlowButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<Sparkles className="w-4 h-4" />}
                >
                  GENERATE MY ENGINEER ID
                </GlowButton>
              </div>
            </form>
          </div>

          {/* Right: The Futuristic Digital ID Card Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {generatedId && (
              <div className="w-full max-w-lg space-y-4">
                {/* Physical Card Container */}
                <div
                  ref={cardRef}
                  className="relative w-full bg-[#0B1420] border-2 border-cyan-accent rounded-sm p-6 sm:p-8 shadow-glow-cyan tech-corner-tl tech-corner-br overflow-hidden select-none"
                >
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 scanline-overlay pointer-events-none opacity-40" />

                  {/* Card Header */}
                  <div className="flex items-center justify-between border-b border-cyan-accent/30 pb-4 mb-5 relative z-10">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-sm bg-cyan-accent/20 border border-cyan-accent flex items-center justify-center text-cyan-accent">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-black text-lg text-white tracking-widest">
                        ENGINEER <span className="text-cyan-accent">2.0</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-[10px] text-cyan-accent font-bold block">
                        ACCESS PASS
                      </span>
                      <span className="font-mono text-[9px] text-technical-dim">
                        15 SEPT • 2026
                      </span>
                    </div>
                  </div>

                  {/* Card Middle: Profile Details */}
                  <div className="space-y-4 relative z-10">
                    <div>
                      <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block">
                        ENGINEER NAME
                      </span>
                      <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-wide truncate">
                        {generatedId.name}
                      </h3>
                      <p className="font-mono text-xs text-cyan-accent font-bold tracking-wider uppercase mt-0.5">
                        // {generatedId.branch}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-cyan-accent/15">
                      <div>
                        <span className="font-mono text-[9px] text-technical-dim uppercase tracking-wider">
                          CORE TECH
                        </span>
                        <div className="font-heading font-bold text-xs text-white uppercase truncate">
                          {generatedId.favoriteTech}
                        </div>
                      </div>

                      <div>
                        <span className="font-mono text-[9px] text-technical-dim uppercase tracking-wider">
                          SKILL
                        </span>
                        <div className="font-heading font-bold text-xs text-white uppercase truncate">
                          {generatedId.skill}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metadata & Decorative QR */}
                    <div className="pt-4 border-t border-cyan-accent/20 flex items-end justify-between">
                      <div>
                        <span className="font-mono text-[9px] text-technical-dim uppercase block">
                          IDENTIFIER CODE
                        </span>
                        <span className="font-mono text-sm font-bold text-cyan-accent tracking-widest">
                          {generatedId.engineerCode}
                        </span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-400 mt-1">
                          <ShieldCheck className="w-3 h-3" /> VERIFIED CREDENTIAL
                        </span>
                      </div>

                      <div className="w-14 h-14 bg-cyan-accent/10 border border-cyan-accent/40 rounded-sm p-1.5 flex items-center justify-center text-cyan-accent">
                        <QrCode className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download / Share actions */}
                <div className="flex items-center justify-between gap-4">
                  <GlowButton
                    variant="primary"
                    size="md"
                    onClick={handleDownload}
                    icon={<Download className="w-4 h-4" />}
                    className="w-full"
                  >
                    DOWNLOAD DIGITAL ID (PNG)
                  </GlowButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
