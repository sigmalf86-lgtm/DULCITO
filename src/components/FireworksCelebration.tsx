import React, { useEffect, useRef } from 'react';
import { soundEffects } from '../utils/audio';

interface FireworksCelebrationProps {
  isActive: boolean;
  onComplete?: () => void;
  triggerKey?: number;
}

interface SparkTrail {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  twinkleColor?: string;
  size: number;
  trail: SparkTrail[];
  maxTrailLength: number;
  gravity: number;
  drag: number;
  twinkleSpeed: number;
  twinkleSeed: number;
}

interface Rocket {
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  palette: string[];
  trail: SparkTrail[];
}

interface Flash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export const FireworksCelebration: React.FC<FireworksCelebrationProps> = ({
  isActive,
  onComplete,
  triggerKey = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isRunning = true;
    let tick = 0;

    // Fast, lightweight DPI setup
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const rockets: Rocket[] = [];
    const particles: Particle[] = [];
    const flashes: Flash[] = [];

    // Clean, elegant festive palettes (slightly enhanced, not oversaturated)
    // 1. Golden Amber Chrysanthemum
    const goldPalette = ['#FFFFFF', '#FFE875', '#FFC72C', '#FF9F1C', '#E85D04', '#D4AF37'];
    // 2. Bright Cyan / Turquoise Starburst
    const cyanPalette = ['#FFFFFF', '#80ED99', '#48CAE4', '#00B4D8', '#0077B6', '#90E0EF'];
    // 3. Ruby Rose / Magenta Starburst
    const rubyPalette = ['#FFFFFF', '#FF758F', '#FF4D6D', '#C9184A', '#A4133C', '#FFD166'];

    const spawnExplosion = (x: number, y: number, palette: string[]) => {
      // Soft burst sound
      soundEffects.playFireworkBurst();

      // Center Flash (soft, brief halo)
      flashes.push({
        x,
        y,
        radius: 6,
        maxRadius: 65,
        alpha: 0.8,
        color: palette[1] || '#FFFFFF',
      });

      // Lightweight particle count (85-100 particles for fluid 60fps)
      const count = 90;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.15;
        const tier = Math.random();

        let speed: number;
        let maxTrail: number;
        let decay: number;
        let size: number;

        if (tier > 0.65) {
          speed = 3.6 + Math.random() * 2.8;
          maxTrail = 4;
          decay = 0.013 + Math.random() * 0.006;
          size = 2.2;
        } else {
          speed = 1.8 + Math.random() * 1.8;
          maxTrail = 3;
          decay = 0.015 + Math.random() * 0.008;
          size = 1.8;
        }

        const colorIndex = Math.floor(Math.random() * palette.length);
        const color = palette[colorIndex];
        const twinkleColor = palette[(colorIndex + 1) % palette.length];

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay,
          color,
          twinkleColor,
          size,
          trail: [],
          maxTrailLength: maxTrail,
          gravity: 0.05,
          drag: 0.976,
          twinkleSpeed: 0.2,
          twinkleSeed: Math.random() * 50,
        });
      }
    };

    const launchRocket = (
      startXRatio: number,
      targetXRatio: number,
      targetYRatio: number,
      palette: string[]
    ) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const startX = width * startXRatio;
      const startY = height + 5;
      const targetX = width * targetXRatio;
      const targetY = height * targetYRatio;

      const frames = 38;
      const vx = (targetX - startX) / frames;
      const vy = (targetY - startY) / frames;

      soundEffects.playFireworkLaunch();

      rockets.push({
        x: startX,
        y: startY,
        startX,
        startY,
        targetX,
        targetY,
        vx,
        vy,
        color: palette[2] || '#FFC72C',
        palette,
        trail: [],
      });
    };

    // Exactly 3 clean, perfectly timed explosions:
    // Explosion 1: Left quadrant (Golden Chrysanthemum)
    const timer1 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.28, 0.28, 0.32, goldPalette);
    }, 120);

    // Explosion 2: Center (Bright Electric Cyan)
    const timer2 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.50, 0.50, 0.22, cyanPalette);
    }, 550);

    // Explosion 3: Right quadrant (Ruby Rose / Magenta)
    const timer3 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.72, 0.72, 0.30, rubyPalette);
    }, 1020);

    // High performance 60fps render loop
    const render = () => {
      if (!isRunning) return;
      tick++;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clean single clearRect
      ctx.clearRect(0, 0, width, height);

      // Lightweight additive blend
      ctx.globalCompositeOperation = 'lighter';

      // 1. Render Center Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const flash = flashes[i];
        flash.radius += (flash.maxRadius - flash.radius) * 0.28;
        flash.alpha -= 0.06;

        if (flash.alpha <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          flash.x,
          flash.y,
          0,
          flash.x,
          flash.y,
          flash.radius
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flash.alpha * 0.9})`);
        gradient.addColorStop(0.4, `rgba(255, 220, 160, ${flash.alpha * 0.4})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Render Ascending Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];

        rocket.trail.push({ x: rocket.x, y: rocket.y });
        if (rocket.trail.length > 5) {
          rocket.trail.shift();
        }

        rocket.x += rocket.vx;
        rocket.y += rocket.vy;

        if (rocket.y <= rocket.targetY || rocket.vy >= 0) {
          spawnExplosion(rocket.x, rocket.y, rocket.palette);
          rockets.splice(i, 1);
          continue;
        }

        // Clean, crisp rocket trail
        if (rocket.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);
          for (let t = 1; t < rocket.trail.length; t++) {
            ctx.lineTo(rocket.trail[t].x, rocket.trail[t].y);
          }
          ctx.strokeStyle = rocket.color;
          ctx.lineWidth = 2.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Rocket head spark
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Render Particles (Single efficient pass, smooth & fluid)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > p.maxTrailLength) {
          p.trail.shift();
        }

        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const twinkleFactor =
          0.65 + 0.35 * Math.sin(tick * p.twinkleSpeed + p.twinkleSeed);
        const currentAlpha = Math.max(0, p.alpha * twinkleFactor);

        // Draw particle tail / streak
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = currentAlpha * 0.9;
          ctx.lineWidth = p.size;
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw particle glowing head
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.twinkleColor && twinkleFactor > 0.82 ? '#FFFFFF' : p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';

      const hasPendingActivity =
        rockets.length > 0 || particles.length > 0 || flashes.length > 0;

      if (!hasPendingActivity && tick > 120) {
        if (onComplete) onComplete();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.clearTimeout(timer1);
      window.clearTimeout(timer2);
      window.clearTimeout(timer3);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, triggerKey, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[65] pointer-events-none select-none transition-opacity duration-500"
      aria-hidden="true"
    />
  );
};
