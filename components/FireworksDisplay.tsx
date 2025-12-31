import React, { useEffect, useRef } from 'react';
import { Particle, Shell } from '../types';

const FireworksDisplay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // State for animation
    const shells: Shell[] = [];
    const particles: Particle[] = [];

    // Configuration
    const GRAVITY = 0.08; // Slight gravity for shells
    const PARTICLE_GRAVITY = 0.05;
    const PARTICLE_DRAG = 0.96;
    const COLORS = [
      '#FF0000', // Red
      '#FFD700', // Gold
      '#FFA500', // Orange
      '#00FF00', // Green
      '#00FFFF', // Cyan
      '#FF00FF', // Magenta
      '#FFFFFF', // White
      '#FF4500', // OrangeRed
    ];

    const randomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];
    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const createShell = () => {
      const startX = randomRange(width * 0.1, width * 0.9);
      const targetY = randomRange(height * 0.1, height * 0.4); // Target upper part of screen
      const flightHeight = height - targetY;
      // Physics calc: v^2 = u^2 + 2as. We want v=0 at top. u = sqrt(2 * g * h)
      // Adding a bit of randomness to velocity
      const velocityY = -Math.sqrt(2 * GRAVITY * flightHeight) * randomRange(0.95, 1.05); 
      
      shells.push({
        x: startX,
        y: height,
        vx: randomRange(-2, 2), // Slight horizontal drift
        vy: velocityY,
        color: randomColor(),
        targetY: targetY,
        exploded: false,
      });
    };

    const explodeShell = (shell: Shell) => {
      const particleCount = Math.floor(randomRange(80, 150));
      for (let i = 0; i < particleCount; i++) {
        const angle = randomRange(0, Math.PI * 2);
        const speed = randomRange(1, 6);
        particles.push({
          x: shell.x,
          y: shell.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: shell.color,
          alpha: 1,
          decay: randomRange(0.005, 0.025),
        });
      }
      
      // Secondary burst (sparkles)
      const sparkleCount = 30;
      for (let i = 0; i < sparkleCount; i++) {
         const angle = randomRange(0, Math.PI * 2);
         const speed = randomRange(0.5, 3);
         particles.push({
           x: shell.x,
           y: shell.y,
           vx: Math.cos(angle) * speed,
           vy: Math.sin(angle) * speed,
           color: '#FFFFFF',
           alpha: 1,
           decay: randomRange(0.015, 0.04),
         });
      }
    };

    const update = () => {
      // Clear canvas with trail effect
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'; // Adjust alpha for trail length
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // Update Shells
      for (let i = shells.length - 1; i >= 0; i--) {
        const shell = shells[i];
        
        shell.x += shell.vx;
        shell.y += shell.vy;
        shell.vy += GRAVITY;

        // Draw Shell
        ctx.beginPath();
        ctx.arc(shell.x, shell.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = shell.color;
        ctx.fill();

        // Explosion condition: Reached target height or started falling
        if (shell.vy >= 0 || shell.y <= shell.targetY) {
          explodeShell(shell);
          shells.splice(i, 1);
        }
      }

      // Update Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= PARTICLE_DRAG;
        p.vy *= PARTICLE_DRAG;
        p.vy += PARTICLE_GRAVITY;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Randomly launch new shells
      if (Math.random() < 0.05) { // 5% chance per frame (approx 3 per second at 60fps)
        createShell();
      }
    };

    const loop = () => {
      update();
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    // Initial volley
    setTimeout(() => {
        createShell(); createShell(); createShell();
    }, 500);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default FireworksDisplay;
