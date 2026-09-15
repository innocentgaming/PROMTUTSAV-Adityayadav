import React, { useEffect, useRef } from 'react';

interface MatrixRainCanvasProps {
  isActive: boolean;
  opacity?: number;
}

const GLYPHS = '01ΣΩλΔπΨ⚙️∂∇λ{}<>[]+=-*/#_AI0101ENGINEER2.0PROMPTIQ';

export const MatrixRainCanvas: React.FC<MatrixRainCanvasProps> = ({
  isActive,
  opacity = 0.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initColumns();
    };

    window.addEventListener('resize', handleResize);

    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    const initColumns = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50);
      }
    };

    initColumns();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      // Semi-transparent fade for trailing effect
      ctx.fillStyle = 'rgba(5, 8, 13, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Interactive mouse distortion
        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 100) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#00D9FF';
        } else if (drops[i] % 4 === 0) {
          ctx.fillStyle = '#00D9FF';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00D9FF';
        } else {
          ctx.fillStyle = '#10B981';
          ctx.shadowBlur = 2;
          ctx.shadowColor = '#10B981';
        }

        ctx.fillText(char, x, y);

        // Reset drop to top with randomized delay
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-700">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity }}
      />
      {/* Cyber scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] opacity-40 pointer-events-none" />
    </div>
  );
};
