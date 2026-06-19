/**
 * Endüstri İmparatorluğu v5 - Parçacık Efekt Motoru
 * Canvas tabanlı neon piksel efektleri
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  sz: number;
  col: string;
  glow: string;
  life: number;
  maxL: number;
  sh: string;
  rot: number;
  rotV: number;
  grav: number;
  drag: number;
}

interface BurstOptions {
  n?: number;
  col?: string;
  spd?: [number, number];
  sz?: [number, number];
  lt?: [number, number];
  sh?: string[];
}

class ParticleEngine {
  private cvs: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private pool: Particle[] = [];
  private raf: number | null = null;
  private active = false;

  constructor() {
    this.boot();
  }

  /**
   * Canvas kurulumu
   */
  private boot(): void {
    this.cvs = document.createElement('canvas');
    Object.assign(this.cvs.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '985',
    });
    this.fit();
    this.ctx = this.cvs.getContext('2d');
    document.body.appendChild(this.cvs);
    window.addEventListener('resize', () => this.fit(), { passive: true });
  }

  /**
   * Canvas'ı pencereye uyarla
   */
  private fit(): void {
    if (!this.cvs) return;
    this.cvs.width = window.innerWidth;
    this.cvs.height = window.innerHeight;
  }

  /**
   * Renk varyantı oluştur
   */
  private variant(col: string): string {
    const h = parseInt(col.slice(1), 16);
    const r = (h >> 16) & 255;
    const g = (h >> 8) & 255;
    const b = h & 255;
    const v = Math.random() * 0.4 - 0.2;
    return `rgb(${Math.max(0, Math.min(255, r + v * 255))},${Math.max(
      0,
      Math.min(255, g + v * 255)
    ))},${Math.max(0, Math.min(255, b + v * 255))})`;
  }

  /**
   * Şekil çiz
   */
  private drawShape(ctx: CanvasRenderingContext2D, shape: string, sz: number): void {
    ctx.save();
    ctx.translate(0, 0);

    switch (shape) {
      case 'square':
        ctx.fillRect(-sz / 2, -sz / 2, sz, sz);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, sz / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(0, -sz / 2);
        ctx.lineTo(sz / 2, 0);
        ctx.lineTo(0, sz / 2);
        ctx.lineTo(-sz / 2, 0);
        ctx.closePath();
        ctx.fill();
        break;
      case 'star':
        this.drawStar(ctx, sz / 2);
        break;
    }

    ctx.restore();
  }

  /**
   * Yıldız şekli çiz
   */
  private drawStar(ctx: CanvasRenderingContext2D, r: number): void {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  /**
   * Preset olaylar
   */
  public onBuy(x: number, y: number, color?: string): void {
    const c = color || '#00d4ff';
    this.burst(x, y, { n: 14, col: c, spd: [3, 7], sz: [2, 5], lt: [0.7, 1.3], sh: ['square', 'diamond'] });
  }

  public onBuyMax(x: number, y: number, color?: string): void {
    const c = color || '#39ff14';
    this.burst(x, y, { n: 30, col: c, spd: [4, 11], sz: [2, 6], lt: [0.9, 1.9], sh: ['square', 'diamond', 'circle'] });
  }

  public onAchievement(x: number, y: number): void {
    this.burst(x, y, { n: 30, col: '#ffd700', spd: [5, 13], sz: [3, 7], lt: [1.2, 2.2], sh: ['star', 'diamond', 'circle'] });
    setTimeout(
      () => this.burst(x, y, { n: 14, col: '#ff00ff', spd: [3, 7], sz: [2, 5], lt: [0.8, 1.6], sh: ['star', 'circle'] }),
      130
    );
  }

  public onZoneUp(x: number, y: number): void {
    ['#ff00ff', '#00d4ff', '#ffd700', '#39ff14'].forEach((c, i) =>
      setTimeout(
        () =>
          this.burst(x, y, {
            n: 24,
            col: c,
            spd: [7, 15],
            sz: [3, 8],
            lt: [1.6, 3.0],
            sh: ['star', 'diamond', 'square', 'circle'],
          }),
        i * 70
      )
    );
  }

  public onLevelUp(x: number, y: number): void {
    this.burst(x, y, { n: 22, col: '#a855f7', spd: [4, 9], sz: [2, 6], lt: [1.0, 2.0], sh: ['star', 'circle', 'diamond'] });
  }

  public onMilestone(x: number, y: number): void {
    this.burst(x, y, { n: 18, col: '#00ffee', spd: [4, 9], sz: [2, 6], lt: [0.9, 1.8], sh: ['diamond', 'circle'] });
  }

  public onError(x: number, y: number): void {
    this.burst(x, y, { n: 9, col: '#ff3535', spd: [2, 5], sz: [2, 4], lt: [0.4, 0.9], sh: ['square'] });
  }

  /**
   * Ham yayıcı
   */
  public burst(x: number, y: number, opts: BurstOptions = {}): void {
    const { n = 12, col = '#00d4ff', spd = [3, 7], sz = [2, 5], lt = [0.7, 1.4], sh = ['square', 'circle'] } = opts;

    for (let i = 0; i < n; i++) {
      const ang = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.9;
      const spd_ = spd[0] + Math.random() * (spd[1] - spd[0]);
      const life = lt[0] + Math.random() * (lt[1] - lt[0]);

      this.pool.push({
        x,
        y,
        vx: Math.cos(ang) * spd_ * (0.55 + Math.random() * 0.45),
        vy: Math.sin(ang) * spd_ * (0.55 + Math.random() * 0.45) - Math.random() * 2.8,
        sz: sz[0] + Math.random() * (sz[1] - sz[0]),
        col: this.variant(col),
        glow: col,
        life,
        maxL: life,
        sh: sh[Math.floor(Math.random() * sh.length)],
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.17,
        grav: 0.11 + Math.random() * 0.09,
        drag: 0.974,
      });
    }

    if (!this.active) this.run();
  }

  /**
   * Render döngüsü
   */
  private run(): void {
    this.active = true;
    const tick = () => {
      if (!this.pool.length) {
        this.active = false;
        if (this.ctx && this.cvs) {
          this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
        }
        return;
      }

      this.frame();
      this.raf = requestAnimationFrame(tick);
    };

    this.raf = requestAnimationFrame(tick);
  }

  /**
   * Frame çiz
   */
  private frame(): void {
    if (!this.ctx || !this.cvs) return;

    this.ctx.clearRect(0, 0, this.cvs.width, this.cvs.height);
    this.ctx.globalCompositeOperation = 'lighter';

    for (let i = this.pool.length - 1; i >= 0; i--) {
      const p = this.pool[i];
      p.life -= 0.016;

      if (p.life <= 0) {
        this.pool.splice(i, 1);
        continue;
      }

      // Fizik
      p.vy += p.grav;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.rotV;

      // Opacity
      const alpha = p.life / p.maxL;

      // Glow
      this.ctx.shadowColor = p.glow;
      this.ctx.shadowBlur = 12;
      this.ctx.fillStyle = p.col;
      this.ctx.globalAlpha = alpha * 0.8;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rot);
      this.drawShape(this.ctx, p.sh, p.sz);
      this.ctx.restore();
    }

    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
  }
}

// Singleton instance
export const particleEngine = new ParticleEngine();
