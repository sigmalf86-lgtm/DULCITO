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
  rgbColor: string; // e.g. '255, 170, 0'
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

    // Handle high DPI for ultra-sharp crisp sparks
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

    // ULTRA-VIVID, HIGH-SATURATION FESTIVE PALETTES (Electric, punchy, neon-grade pigments)
    // 1. Molten Gold & Solar Amber Chrysanthemum (Deep solar gold, electric lemon, warm amber flame)
    const goldPalette = [
      '#FFFFFF',
      '#FFE600', // Intense Electric Lemon
      '#FFD700', // Pure Sun Gold
      '#FFB700', // Rich Amber
      '#FF8C00', // Deep Tangerine
      '#FF4500', // Solar Orange-Red
      '#FF2200', // Fiery Flame Red
      '#FFA500', // Vibrant Gold-Orange
    ];

    // 2. Electric Cyan & Laser Turquoise Crown (Pure laser cyan, electric sky, vivid cobalt, white star)
    const cyanPalette = [
      '#FFFFFF',
      '#00FFFF', // Pure Laser Cyan
      '#00F0FF', // Neon Electric Turquoise
      '#00D4FF', // Intense Sky Blue
      '#0099FF', // Electric Azure
      '#0055FF', // Deep Cobalt
      '#38BDF8', // Luminous Topaz
      '#7DD3FC', // Bright Ice Cyan
    ];

    // 3. Ruby Rose, Laser Magenta & Sunset Starburst (Laser crimson, hot magenta, electric purple, gold stardust)
    const rubyPalette = [
      '#FFFFFF',
      '#FF0055', // Pure Laser Ruby
      '#FF007F', // Vivid Hot Pink
      '#FF1493', // Deep Neon Magenta
      '#E11D48', // Intense Crimson
      '#D900FF', // Electric Violet
      '#FF3366', // Coral Fire
      '#FFD700', // Brilliant Gold Star
    ];

    // 4. Laser Emerald & Neon Lime Companion (Ultra-punchy green)
    const emeraldPalette = [
      '#FFFFFF',
      '#00FF66', // Neon Spring Green
      '#00FF99', // Electric Mint
      '#00E676', // Vivid Emerald
      '#76FF03', // Laser Lime
      '#10B981', // Deep Emerald
      '#FFE600', // Gold Sparkle
    ];

    // 5. Royal Ultraviolet & Electric Violet Companion
    const violetPalette = [
      '#FFFFFF',
      '#B026FF', // Neon Purple
      '#9900FF', // Electric Violet
      '#D500F9', // Vivid Magenta-Purple
      '#7C4DFF', // Deep Royal Violet
      '#00E5FF', // Cyan Spark
    ];

    const spawnExplosion = (
      x: number,
      y: number,
      palette: string[],
      style: 'golden_chrysanthemum' | 'electric_cyan' | 'ruby_magenta'
    ) => {
      // Sound effect
      soundEffects.playFireworkBurst();

      // Determine intense colored ambient flash for this burst
      let rgbFlash = '255, 200, 50';
      if (style === 'electric_cyan') {
        rgbFlash = '0, 240, 255';
      } else if (style === 'ruby_magenta') {
        rgbFlash = '255, 0, 110';
      }

      // Center Flash (high-intensity illuminating epicenter)
      flashes.push({
        x,
        y,
        radius: 12,
        maxRadius: style === 'electric_cyan' ? 120 : 105,
        alpha: 1.0,
        rgbColor: rgbFlash,
      });

      // Layered radial particles with high density
      const particleCount = style === 'golden_chrysanthemum' ? 165 : style === 'electric_cyan' ? 175 : 160;

      for (let i = 0; i < particleCount; i++) {
        // Multi-ring spherical distribution
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.12;

        const tier = Math.random();
        let speed: number;
        let maxTrail: number;
        let decay: number;
        let size: number;

        if (tier > 0.78) {
          // Fast outer long streamers (strong high-velocity arms)
          speed = 4.8 + Math.random() * 4.2;
          maxTrail = 9;
          decay = 0.0075 + Math.random() * 0.0045;
          size = 3.2;
        } else if (tier > 0.28) {
          // Dense, rich middle ring
          speed = 3.0 + Math.random() * 2.6;
          maxTrail = 7;
          decay = 0.0095 + Math.random() * 0.0055;
          size = 2.8;
        } else {
          // Intense glittering epicenter / stardust
          speed = 1.0 + Math.random() * 2.2;
          maxTrail = 5;
          decay = 0.012 + Math.random() * 0.008;
          size = 3.4;
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
          gravity: 0.048,
          drag: 0.980,
          twinkleSpeed: 0.16 + Math.random() * 0.24,
          twinkleSeed: Math.random() * 100,
        });
      }

      // Add a cluster of falling intense golden/diamond glitter sparkles
      for (let j = 0; j < 35; j++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.6 + Math.random() * 2.6;
        particles.push({
          x: x + (Math.random() - 0.5) * 18,
          y: y + (Math.random() - 0.5) * 18,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: 1,
          decay: 0.009 + Math.random() * 0.007,
          color: '#FFE600',
          twinkleColor: '#FFFFFF',
          size: 2.2,
          trail: [],
          maxTrailLength: 4,
          gravity: 0.060,
          drag: 0.970,
          twinkleSpeed: 0.35,
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

      const frames = 42;
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

    // Schedule 3 Main Powerful Explosions + 2 Ambient Saturated Companions:
    // Explosion 1: Left quadrant (Molten Gold Chrysanthemum)
    const timer1 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.26, 0.28, 0.28, goldPalette, 'golden_chrysanthemum');
    }, 100);

    // Companion mini-burst: Lower-left Electric Violet
    const timerSub1 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.16, 0.15, 0.50, violetPalette, 'ruby_magenta');
    }, 420);

    // Explosion 2: Center (High Electric Cyan & Laser Turquoise Crown)
    const timer2 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.50, 0.50, 0.18, cyanPalette, 'electric_cyan');
    }, 620);

    // Companion mini-burst: Lower-right Laser Emerald
    const timerSub2 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.84, 0.85, 0.46, emeraldPalette, 'electric_cyan');
    }, 920);

    // Explosion 3: Right quadrant (Vivid Ruby Rose & Hot Magenta Starburst)
    const timer3 = window.setTimeout(() => {
      if (!isRunning) return;
      launchRocket(0.74, 0.72, 0.26, rubyPalette, 'ruby_magenta');
    }, 1150);

    // Render loop
    const render = () => {
      if (!isRunning) return;
      tick++;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear canvas cleanly
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Contrast Aura Vignette during activity to make neon colors pop dramatically
      const activeBurstsCount = particles.length + flashes.length + rockets.length;
      if (activeBurstsCount > 0) {
        const auraAlpha = Math.min(0.28, (activeBurstsCount / 250) * 0.28);
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(15, 5, 2, ${auraAlpha})`;
        ctx.fillRect(0, 0, width, height);
      }

      // Additive blending for realistic, hyper-intense luminous neon glow
      ctx.globalCompositeOperation = 'lighter';

      // 2. Update and Render Flashes (Epicenter Glows with colored radial aura)
      for (let i = flashes.length - 1; i >= 0; i--) {
        const flash = flashes[i];
        flash.radius += (flash.maxRadius - flash.radius) * 0.25;
        flash.alpha -= 0.045;

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
        gradient.addColorStop(0, `rgba(255, 255, 255, ${flash.alpha * 0.95})`);
        gradient.addColorStop(0.3, `rgba(${flash.rgbColor}, ${flash.alpha * 0.75})`);
        gradient.addColorStop(0.7, `rgba(${flash.rgbColor}, ${flash.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${flash.rgbColor}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Update and Render Rockets (Thicker, vivid tracers rising with spark trails)
      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];

        rocket.trail.push({ x: rocket.x, y: rocket.y });
        if (rocket.trail.length > 8) {
          rocket.trail.shift();
        }

        rocket.x += rocket.vx;
        rocket.y += rocket.vy;

        // Check if rocket reached apex
        if (rocket.y <= rocket.targetY || rocket.vy >= 0) {
          spawnExplosion(rocket.x, rocket.y, rocket.palette, rocket.style);
          rockets.splice(i, 1);
          continue;
        }

        // Draw ascending rocket tracer with multi-pass neon beam
        if (rocket.trail.length > 1) {
          // Wide outer colored aura
          ctx.beginPath();
          ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);
          for (let t = 1; t < rocket.trail.length; t++) {
            ctx.lineTo(rocket.trail[t].x, rocket.trail[t].y);
          }
          ctx.strokeStyle = rocket.color;
          ctx.lineWidth = 8;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Saturated core beam
          ctx.beginPath();
          ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);
          for (let t = 1; t < rocket.trail.length; t++) {
            ctx.lineTo(rocket.trail[t].x, rocket.trail[t].y);
          }
          ctx.strokeStyle = rocket.color;
          ctx.lineWidth = 4;
          ctx.stroke();

          // White-hot center spine
          ctx.beginPath();
          ctx.moveTo(rocket.trail[0].x, rocket.trail[0].y);
          for (let t = 1; t < rocket.trail.length; t++) {
            ctx.lineTo(rocket.trail[t].x, rocket.trail[t].y);
          }
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }

        // Rocket head spark (intense star)
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 4.0, 0, Math.PI * 2);
        ctx.fill();

        // Emitter trail sparks falling off rocket
        if (Math.random() < 0.75) {
          particles.push({
            x: rocket.x + (Math.random() - 0.5) * 5,
            y: rocket.y + Math.random() * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: 1.8 + Math.random() * 3.0,
            alpha: 0.95,
            decay: 0.045,
            color: rocket.color,
            size: 2.0,
            trail: [],
            maxTrailLength: 3,
            gravity: 0.08,
            drag: 0.94,
            twinkleSpeed: 0.25,
            twinkleSeed: Math.random() * 20,
          });
        }
      }

      // 4. Update and Render Particles (Multi-pass high-intensity glow)
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

        // Twinkle factor
        const twinkleFactor =
          0.65 + 0.35 * Math.sin(tick * p.twinkleSpeed + p.twinkleSeed);
        const currentAlpha = Math.max(0, p.alpha * twinkleFactor);

        // MULTI-PASS NEON LASER TRAIL:
        if (p.trail.length > 1) {
          // Pass 1: Wide Saturated Glow Aura
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = currentAlpha * 0.55;
          ctx.lineWidth = Math.max(2.5, p.size * 2.2);
          ctx.lineCap = 'round';
          ctx.stroke();

          // Pass 2: Vivid Pure Body
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = currentAlpha * 0.95;
          ctx.lineWidth = Math.max(1.5, p.size * 1.15);
          ctx.stroke();

          // Pass 3: White-Hot Center Light
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let t = 1; t < p.trail.length; t++) {
            ctx.lineTo(p.trail[t].x, p.trail[t].y);
          }
          ctx.strokeStyle = '#FFFFFF';
          ctx.globalAlpha = currentAlpha * 0.85;
          ctx.lineWidth = Math.max(0.8, p.size * 0.45);
          ctx.stroke();
        }

        // SPARK HEAD (Vivid outer disc + brilliant white star core)
        // Outer colored glow circle
        ctx.globalAlpha = currentAlpha * 0.95;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1.1 + 0.4 * twinkleFactor), 0, Math.PI * 2);
        ctx.fill();

        // White-hot center star
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = p.twinkleColor && twinkleFactor > 0.82 ? '#FFFFFF' : '#FFFBEB';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.55 + 0.25 * twinkleFactor), 0, Math.PI * 2);
        ctx.fill();

        // Secondary crackle: occasionally spawn a tiny glitter burst
        if (!p.hasCrackled && p.alpha < 0.48 && Math.random() < 0.045) {
          p.hasCrackled = true;
          flashes.push({
            x: p.x,
            y: p.y,
            radius: 3,
            maxRadius: 10,
            alpha: 0.75,
            rgbColor: '255, 230, 100',
          });
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.globalCompositeOperation = 'source-over';

      const hasPendingActivity =
        rockets.length > 0 || particles.length > 0 || flashes.length > 0;

      if (!hasPendingActivity && tick > 150) {
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
