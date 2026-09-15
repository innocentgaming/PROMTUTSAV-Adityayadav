import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../../data/projects';
import type { StudentProject } from '../../types';
import { SectionHeader } from '../common/SectionHeader';
import { TechBadge } from '../common/TechBadge';
import { Modal } from '../common/Modal';
import { GlowButton } from '../common/GlowButton';
import { ArrowUpRight, Users } from 'lucide-react';

interface StudentShowcaseProps {
  onPlayClick: () => void;
}

export const StudentShowcase: React.FC<StudentShowcaseProps> = ({ onPlayClick }) => {
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const domains = ['ALL', 'AI & Environmental', 'Civil & IoT', 'Robotics & Agritech', 'Electrical & Software', 'Biomedical & Robotics', 'Environmental & Chemical'];

  const filteredProjects =
    activeFilter === 'ALL'
      ? STUDENT_PROJECTS
      : STUDENT_PROJECTS.filter((p) => p.domain.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.includes(p.domain));

  const handleOpenModal = (project: StudentProject) => {
    onPlayClick();
    setSelectedProject(project);
  };

  return (
    <section
      id="showcase"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#05080D] border-t border-cyan-accent/20 overflow-hidden"
    >
      {/* Blueprint Grid */}
      <div className="absolute inset-0 bg-blueprint opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          number="06"
          badge="STUDENT INNOVATION SHOWCASE"
          title="ENGINEERS ARE BUILDING."
          subtitle="Real prototypes engineered by our undergraduate and research fellows."
          description="From rural water filtration to deep-learning radar forecasting and robotic limb exoskeletons, explore verified technical solutions solving immediate societal challenges."
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => {
                onPlayClick();
                setActiveFilter(dom);
              }}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all shrink-0 ${
                activeFilter === dom
                  ? 'border-cyan-accent bg-cyan-accent/15 text-cyan-accent font-bold shadow-glow-cyan'
                  : 'border-white/10 bg-[#0A111A] text-technical-dim hover:text-white hover:border-cyan-accent/40'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0A111A] border border-cyan-accent/20 rounded-sm p-6 flex flex-col justify-between group hover:border-cyan-accent/60 hover:shadow-glow-cyan transition-all duration-300 tech-card"
            >
              <div>
                {/* Top Badge & Metric */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <TechBadge
                    variant={project.status === 'DEPLOYED' ? 'green' : 'cyan'}
                    dot
                  >
                    {project.status}
                  </TechBadge>
                  <span className="font-mono text-[11px] text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded-sm border border-cyan-accent/30">
                    {project.metric}
                  </span>
                </div>

                <span className="font-mono text-[10px] text-technical-dim uppercase tracking-wider block">
                  // {project.domain}
                </span>

                <h3 className="font-heading font-extrabold text-lg text-white uppercase mt-1 group-hover:text-cyan-accent transition-colors">
                  {project.title}
                </h3>

                {/* Problem Statement */}
                <div className="mt-4 p-3 bg-[#05080D] border-l-2 border-amber-500/80 rounded-sm">
                  <div className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-semibold mb-1">
                    PROBLEM
                  </div>
                  <p className="font-body text-xs text-slate-300 line-clamp-2">
                    {project.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mt-3 p-3 bg-[#05080D] border-l-2 border-cyan-accent rounded-sm">
                  <div className="font-mono text-[10px] text-cyan-accent uppercase tracking-widest font-semibold mb-1">
                    ENGINEERING SOLUTION
                  </div>
                  <p className="font-body text-xs text-slate-300 line-clamp-2">
                    {project.solution}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technology.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technology.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-cyan-accent">
                      +{project.technology.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer with Inspect Action */}
              <div className="mt-6 pt-4 border-t border-cyan-accent/15 flex items-center justify-between">
                <span className="font-mono text-[10px] text-technical-dim truncate max-w-[170px]">
                  TEAM: {project.team.split('(')[0]}
                </span>

                <button
                  onClick={() => handleOpenModal(project)}
                  className="font-mono text-xs text-cyan-accent hover:text-white flex items-center gap-1 uppercase transition-colors"
                >
                  SPEC <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-Dive Project Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          subtitle={`DOMAIN: ${selectedProject.domain} • STATUS: ${selectedProject.status}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 font-body">
            <div className="flex items-center justify-between p-3 bg-[#05080D] border border-cyan-accent/30 rounded-sm">
              <span className="font-mono text-xs text-technical-dim">VERIFIED IMPACT METRIC:</span>
              <span className="font-heading font-bold text-sm text-cyan-accent">
                {selectedProject.metric}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-mono text-xs text-amber-400 uppercase tracking-wider font-semibold mb-1">
                  1. The Engineering Challenge
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.problem}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-cyan-accent uppercase tracking-wider font-semibold mb-1">
                  2. Architectural Solution
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.solution}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-emerald-400 uppercase tracking-wider font-semibold mb-1">
                  3. Proven Societal Impact
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.impact}
                </p>
              </div>

              <div className="pt-2">
                <h4 className="font-mono text-xs text-technical-dim uppercase tracking-wider font-semibold mb-2">
                  Complete Technology Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technology.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-technical-dim font-mono">
                <Users className="w-4 h-4 text-cyan-accent" />
                <span>LAB / TEAM: {selectedProject.team}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <GlowButton variant="secondary" size="sm" onClick={() => setSelectedProject(null)}>
                CLOSE SPECIFICATION
              </GlowButton>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
