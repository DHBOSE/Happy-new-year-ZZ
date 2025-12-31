export interface Coordinates {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  decay: number;
}

export interface Shell {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  targetY: number;
  exploded: boolean;
}
