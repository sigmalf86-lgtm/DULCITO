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
  hasCrackled?: boolean;
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
  style: 'golden_chrysanthemum' | 'electric_cyan' | 'ruby_magenta';
  trail: SparkTrail[];
  isDead: boolean;
  burstSoundPlayed: boolean;
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

    // Handle high DPI
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Distinct Palettes matching the user's reference image:
    // 1. Golden Amber Chrysanthemum (Rich gold, topaz, warm sparks)
    const goldPalette = ['#FFFFFF', '#FFF7D6', '#FFE27A', '#FFB800', '#F59E0B', '#D97706', '#E65100'];
    // 2. Electric Cyan / Turquoise Starburst (Bright cyan, sky blue, neon turquoise, white core)
    const cyanPalette = ['#FFFFFF', '#D1FAE5', '#67E8F9', '#00E5FF', '#38BDF8', '#0284C7', '#0369A1'];
    // 3. Ruby Rose / Magenta & Sunset Starburst (Vibrant ruby, magenta, coral, golden stardust)
    const rubyPalette = ['#FFFFFF', '#FFE4E6', '#F43F5E', '#FB7185', '#E11D48', '#C026D3', '#FBBF24'];

    const spawnExplosion = (
      x: number,
      y: number,
      palette: string[],
      style: 'golden_chrysanthemum' | 'electric_cyan' | 'ruby_magenta'
    ) => {
      // Sound effect
      soundEffects.playFireworkBurst();

      // Center Flash (illuminating epicenter)
      flashes.push({
        x,
        y,
        radius: 8,
        maxRadius: style === 'electric_cyan' ? 95 : 80,
        alpha: 0.9,
        color: palette[0] || '#FFFFFF',
      });

      // Layered radial particles
      const particleCount = style === 'golden_chrysanthemum' ? 140 : style === 'electric_cyan' ? 150 : 135;

      for (let i = 0; i < particleCount; i++) {
        // Multi-ring distribution for realistic peony / chrysanthemum
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.12;
        
        // Tiered speed: outer long tentacles, dense middle, and inner glittering core
        const tier = Math.random();
        let speed: number;
        let maxTrail: number;
        let decay: number;
        let size: number;

        if (tier > 0.8) {
          // Fast outer streamers
          speed = 4.2 + Math.random() * 3.6;
          maxTrail = 6;
          decay = 0.009 + Math.random() * 0.005;
          size = 2.4;
        } else if (tier > 0.3) {
          // Dense middle ring
          speed = 2.6 + Math.random() * 2.2;
          maxTrail = 4;
          decay = 0.012 + Math.random() * 0.006;
          size = 2.0;
        } else {
          // Inner sparkling core / stardust
          speed = 0.8 + Math.random() * 1.8;
          maxTrail = 3;
          decay = 0.015 + Math.random() * 0.01;
          size = 2.6;
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
          gravity: 0.052,
          drag: 0.976,
          twinkleSpeed: 0.18 + Math.random() * 0.22,
          twinkleSeed: Math.random() * 100,
        });
      }

      // Add a cluster of falling golden/diamond glitter sparkles
      for (let j = 0; j < 25; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.2;
        particles.push({
          x: x + (Math.random() - 0.5) * 15,
          y: y + (Math.random() - 0.5) * 15,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.5,
          alpha: 1,
          decay: 0.011 + Math.random() * 0.008,
          color: '#FFFBEB',
          twinkleColor: '#FDE047',
          size: 1.8,
          trail: [],
          maxTrailLength: 3,
          gravity: 0.065,
          drag: 0.965,
          twinkleSpeed: 0.3,
          twinkleSeed: Math.random() * 50,
        });
      }
    };

    const launchRocket = (
      startXRatio: number,
      targetXRatio: number,
      targetYRatio: number,
      palette: string[],
      style: 'golden_chrysanthemum' | 'electric_cyan' | 'ruby_magenta'
    ) => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const startX = width * startXRatio;
      const startY = height + 10;
      const targetX = width * targetXRatio;
      const targetY = height * targetYRatio;

      // Calculate initial velocity to reach target in ~40-48 frames
      const frames = 44;
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
        color: palette[1] || '#FFD700',
        palette,
        style,
        trail: [],
        isDead: false,
        burstSoundPlayed: false,
      });
    };

    // 4. Emerald & Violet companion palettes for depth (as shown in reference image)
    const emeraldPalette = ['#FFFFFF', '#A7F3D0', '#34D399', '#10B981', '#059669', '#FDE047'];
    const violetPalette = ['#FFFFFF', '#E9D5FF', '#C084FC', '#A855F7', '#7E22CE', '#38BDF8'];

    // Schedule the 3 Main Explosions requested, plus 2 companion ambient bursts:
    // Explosion 1: Left quadrant (Golden Chrysanthemum)
    const timer1 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.26, 0.28, 0.30, goldPalette, 'golden_chrysanthemum');
    }, 120);

    // Companion mini-burst: Lower-left Violet (from reference image)
    const timerSub1 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.18, 0.16, 0.52, violetPalette, 'ruby_magenta');
    }, 450);

    // Explosion 2: Center (High Electric Cyan / Turquoise Crown)
    const timer2 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.50, 0.50, 0.20, cyanPalette, 'electric_cyan');
    }, 650);

    // Companion mini-burst: Lower-right Emerald / Lime (from reference image)
    const timerSub2 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.82, 0.84, 0.48, emeraldPalette, 'electric_cyan');
    }, 950);

    // Explosion 3: Right quadrant (Ruby Rose / Magenta Starburst)
    const timer3 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.74, 0.72, 0.28, rubyPalette, 'ruby_magenta');
    }, 1200);

    // Render loop
    const render = () => {
      if (!isRunning) return;
      tick++;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear canvas with subtle trail fade for luminosity
      ctx.clearRect(0, 0, width, height);

      // Use additive blending for realistic fireworks glow
      ctx.globalCompositeOperation = 'lighter';

      // 1. Update and Render Flashes
      for (let i = flashes.length - 1; i >= 0; i--) {
        const flash = flashes[i];
        flash.radius += (flash.maxRadius - flash.radius) * 0.28;
        flash.alpha -= 0.055;

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
        gradient.addColorStop(0.35, `rgba(255, 240, 200, ${flash.alpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Update and Render Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];

        rocket.trail.push({ x: rocket.x, y: rocket.y });
        if (rocket.trail.length > 7) {
          rocket.trail.shift();
        }

        rocket.x += rocket.vx;
        rocket.y += rocket.vy;

        // Check if rocket reached apex / target altitude
        if (rocket.y <= rocket.targetY || rocket.vy >= 0) {
          spawnExplosion(rocket.x, rocket.y, rocket.palette, rocket.style);
          rockets.splice(i, 1);
          continue;
        }

        // Draw ascending rocket tail with sparks
        if (rocket.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);
          for (let t = 1; t < rocket.trail.length; t++) {
            ctx.lineTo(rocket.trail[t].x, rocket.trail[t].y);
          }
          ctx.strokeStyle = rocket.color;
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Outer luminous glow
          ctx.beginPath();
          ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);
          for (let t = 1; t < rocket.trail.length; t++) {
            ctx.lineTo(rocket.trail[t].x, rocket.trail[t].y);
          }
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 6;
          ctx.stroke();
        }

        // Rocket head spark
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Emitter trail sparks falling off rocket
        if (Math.random() < 0.65) {
          particles.push({
            x: rocket.x + (Math.random() - 0.5) * 4,
            y: rocket.y + Math.random() * 6,
            vx: (Math.random() - 0.5) * 1.2,
            vy: 1.5 + Math.random() * 2.5,
            alpha: 0.85,
            decay: 0.05,
            color: '#FFD700',
            size: 1.5,
            trail: [],
            maxTrailLength: 2,
            gravity: 0.08,
            drag: 0.94,
            twinkleSpeed: 0.2,
            twinkleSeed: Math.random() * 20,
          });
        }
      }

      // 3. Update and Render Particles
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

        // Twinkle flicker calculation
        const twinkleFactor =
          0.6 + 0.4 * Math.sin(tick * p.twinkleSpeed + p.twinkleSeed);
        const currentAlpha = Math.max(0, p.alpha * twinkleFactor);

        // Draw particle tail / streak
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = currentAlpha * 0.85;
          ctx.lineWidth = Math.max(0.8, p.size * (p.alpha > 0.5 ? 1 : p.alpha * 2));
          ctx.lineCap = 'round';
          ctx.stroke();
        }

        // Draw particle glowing head
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.twinkleColor && twinkleFactor > 0.85 ? '#FFFFFF' : p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + 0.4 * twinkleFactor), 0, Math.PI * 2);
        ctx.fill();

        // Secondary crackle: occasionally spawn a tiny glitter drop
        if (!p.hasCrackled && p.alpha < 0.45 && Math.random() < 0.04) {
          p.hasCrackled = true;
          flashes.push({
            x: p.x,
            y: p.y,
            radius: 2,
            maxRadius: 8,
            alpha: 0.6,
            color: '#FFFBEB',
          });
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';

      // Check if finished (all rockets and particles done after launch timers)
      const hasPendingActivity =
        rockets.length > 0 || particles.length > 0 || flashes.length > 0;

      if (!hasPendingActivity && tick > 130) {
        if (onComplete) onComplete();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      window.clearTimeout(timer1);
      window.clearTimeout(timerSub1);
      window.clearTimeout(timer2);
      window.clearTimeout(timerSub2);
      window.clearTimeout(timer3);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, triggerKey, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[65] pointer-events-none select-none transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
