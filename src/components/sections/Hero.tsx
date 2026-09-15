import React, { useEffect, useRef } from 'react';
import { GlowButton } from '../common/GlowButton';
import { TechBadge } from '../common/TechBadge';
import { ArrowDown, Cpu, Shield, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onEnterExperience: () => void;
  onExploreLegacy: () => void;
  onPlayClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onEnterExperience,
  onExploreLegacy,
  onPlayClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Rotating Wireframe Polyhedron on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Icosahedron vertices definition
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    // Normalize
    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len] as [number, number, number];
    });

    // Edges between vertices within distance threshold
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (Math.abs(dist - 1.05) < 0.1) {
          edges.push([i, j]);
        }
      }
    }

    let rotX = 0;
    let rotY = 0;
    let rotZ = 0;
    let targetSpeedX = 0.003;
    let targetSpeedY = 0.005;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      targetSpeedX = (mouseY / height - 0.5) * 0.02;
      targetSpeedY = (mouseX / width - 0.5) * 0.02;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotX += targetSpeedX;
      rotY += targetSpeedY;
      rotZ += 0.001;

      // Draw subtle orbital rings
      const centerX = width > 1024 ? width * 0.65 : width * 0.5;
      const centerY = height * 0.52;
      const baseRadius = Math.min(width, height) * (width > 768 ? 0.28 : 0.32);

      // Coordinate axes lines
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX - baseRadius * 1.5, centerY);
      ctx.lineTo(centerX + baseRadius * 1.5, centerY);
      ctx.moveTo(centerX, centerY - baseRadius * 1.5);
      ctx.lineTo(centerX, centerY + baseRadius * 1.5);
      ctx.stroke();
      ctx.setLineDash([]);

      // Rotating concentric measurement circles
      ctx.strokeStyle = 'rgba(0, 217, 255, 0.06)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.25, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(22, 135, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.45, rotZ, rotZ + Math.PI * 1.2);
      ctx.stroke();

      // Transform 3D vertices to 2D
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      const projected = vertices.map(([vx, vy, vz]) => {
        // Rot Y
        let x1 = vx * cosY + vz * sinY;
        let y1 = vy;
        let z1 = -vx * sinY + vz * cosY;

        // Rot X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rot Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        const fov = 3.5;
        const scale = (baseRadius * 0.9) / (fov + z3);
        const px = centerX + x3 * scale * fov;
        const py = centerY + y3 * scale * fov;

        return { px, py, z: z3 };
      });

      // Draw Edges
      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.12, (avgZ + 1.2) * 0.28);

        ctx.strokeStyle = `rgba(0, 217, 255, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      });

      // Draw Vertices
      projected.forEach(({ px, py, z }) => {
        const alpha = Math.max(0.2, (z + 1.2) * 0.45);
        ctx.fillStyle = `rgba(0, 217, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Vertex glow
        ctx.fillStyle = `rgba(22, 135, 255, ${alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Blueprint Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating HUD Telemetry Badges */}
      <div className="absolute top-24 left-6 hidden lg:flex flex-col gap-2 font-mono text-[11px] text-technical-dim pointer-events-none z-10">
        <div className="flex items-center gap-2 border-l-2 border-cyan-accent pl-2.5 py-0.5 bg-[#0A111A]/40 backdrop-blur-sm">
          <Cpu className="w-3.5 h-3.5 text-cyan-accent" />
          <span>SYSTEM: ENGINEER 2.0</span>
        </div>
        <div className="flex items-center gap-2 border-l-2 border-emerald-500 pl-2.5 py-0.5 bg-[#0A111A]/40 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>STATUS: ONLINE</span>
        </div>
        <div className="flex items-center gap-2 border-l-2 border-cyan-accent/40 pl-2.5 py-0.5 bg-[#0A111A]/40 backdrop-blur-sm">
          <Compass className="w-3.5 h-3.5 text-blue-accent" />
          <span>DATE: 15.09 // ENG-DAY</span>
        </div>
      </div>

      <div className="absolute top-24 right-6 hidden lg:flex flex-col items-end gap-2 font-mono text-[11px] text-technical-dim pointer-events-none z-10 text-right">
        <div className="border-r-2 border-cyan-accent pr-2.5 py-0.5 bg-[#0A111A]/40 backdrop-blur-sm">
          <span>MODE: FRONTIER COGNITION</span>
        </div>
        <div className="border-r-2 border-blue-accent pr-2.5 py-0.5 bg-[#0A111A]/40 backdrop-blur-sm">
          <span>CORE: INNOVATION & IMPACT</span>
        </div>
        <div className="border-r-2 border-cyan-accent/40 pr-2.5 py-0.5 bg-[#0A111A]/40 backdrop-blur-sm">
          <Shield className="w-3.5 h-3.5 text-cyan-accent inline mr-1.5" />
          <span>VERSION: 2.0.26_PROD</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          {/* Engineers' Day Header Badge */}
          <div className="inline-flex items-center gap-2">
            <TechBadge variant="cyan" dot>
              ENGINEERS' DAY / 15 SEPTEMBER
            </TechBadge>
            <span className="hidden sm:inline font-mono text-xs text-technical-dim">
              // COMMEMORATING SIR M. VISVESVARAYA
            </span>
          </div>

          {/* Huge Main Heading */}
          <div className="space-y-1">
            <div className="font-heading font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-[0.95] uppercase">
              ENGINEER
            </div>
            <div className="font-heading font-black text-5xl sm:text-7xl md:text-8xl text-cyan-accent tracking-tight leading-[0.95] flex items-center gap-4">
              <span>2.0</span>
              <span className="text-xl sm:text-2xl font-mono text-technical-dim font-normal tracking-normal border border-cyan-accent/30 px-3 py-1 bg-cyan-accent/5 rounded-sm">
                [FUTURE ARCHITECTURE]
              </span>
            </div>
          </div>

          {/* Secondary Heading & Tagline */}
          <div className="space-y-2 pt-2">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-wide uppercase">
              BUILD THE FUTURE
            </h2>
            <p className="font-mono text-sm sm:text-base text-cyan-accent font-semibold tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              THINK. DESIGN. BUILD. TRANSFORM.
            </p>
          </div>

          {/* Cinematic Description */}
          <p className="font-body text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed border-l-2 border-cyan-accent/50 pl-4 py-1">
            From the monumental hydraulic foundations laid by Sir M. Visvesvaraya to autonomous neural systems and space infrastructure, engineering is humanity's engine for transforming abstract imagination into physical reality.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <GlowButton
              variant="primary"
              size="lg"
              onClick={() => {
                onPlayClick();
                onEnterExperience();
              }}
            >
              ENTER THE EXPERIENCE
            </GlowButton>

            <GlowButton
              variant="outline"
              size="lg"
              onClick={() => {
                onPlayClick();
                onExploreLegacy();
              }}
            >
              EXPLORE THE LEGACY
            </GlowButton>
          </div>

          {/* Technical Micro-Telemetry row */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl border-t border-cyan-accent/20">
            <div>
              <div className="font-mono text-[10px] text-technical-dim uppercase">FOUNDATION</div>
              <div className="font-heading font-bold text-white text-sm">1861 – PRESENT</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-technical-dim uppercase">DISCIPLINES</div>
              <div className="font-heading font-bold text-cyan-accent text-sm">08 CORE DOMAINS</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-technical-dim uppercase">AI CONVERGENCE</div>
              <div className="font-heading font-bold text-white text-sm">PIPELINE V2</div>
            </div>
            <div>
              <div className="font-mono text-[10px] text-technical-dim uppercase">HORIZON</div>
              <div className="font-heading font-bold text-cyan-accent text-sm">2035 & BEYOND</div>
            </div>
          </div>
        </div>

        {/* Right side spacer for wireframe visual on desktop */}
        <div className="hidden lg:block lg:col-span-4" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-technical-dim font-mono text-[11px] tracking-widest z-10 pointer-events-none">
        <span className="animate-pulse text-cyan-accent">SCROLL TO EXPLORE</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-cyan-accent" />
      </div>
    </section>
  );
};
