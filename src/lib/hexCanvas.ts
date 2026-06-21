/* Cursor-reactive animated hex grid canvas */

export function initHexCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;
  let W = 0, H = 0, t = 0, mX = -999, mY = -999;
  let animId: number;

  const onMouseMove = (e: MouseEvent) => { mX = e.clientX; mY = e.clientY; };
  document.addEventListener('mousemove', onMouseMove, { passive: true });

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function hex(x: number, y: number, r: number) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * 60 - 30) * Math.PI / 180;
      i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
              : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
    }
    ctx.closePath();
  }

  function frame() {
    t += 0.014;
    ctx.clearRect(0, 0, W, H);

    const r = 34, cw = r * Math.sqrt(3), rh = r * 1.5;
    const gm = (window as any).__twGlowMult?.() ?? 1;

    /* Walker 1 — sweeps top→bottom, oscillates left-right */
    const gx  = (Math.sin(t * .65) * .5 + .5) * W;
    const gy  = ((t * .09) % (1 + r * 2 / H)) * H - r;

    /* Walker 2 — sweeps bottom→top, opposite phase */
    const gx2 = (Math.cos(t * .5 + 1.2) * .5 + .5) * W;
    const gy2 = H - ((t * .075 + 0.5) % (1 + r * 2 / H)) * H + r;

    /* Walker 3 — sweeps left→right, vertical oscillation */
    const gx3 = ((t * .065) % (1 + r * 2 / W)) * W - r;
    const gy3 = (Math.sin(t * .42 + 2.1) * .5 + .5) * H;

    /* Ripple origin — drifts slowly around center */
    const rx = W * 0.5 + Math.sin(t * 0.28) * W * 0.35;
    const ry = H * 0.5 + Math.cos(t * 0.19) * H * 0.32;

    const cols = Math.ceil(W / cw) + 2;
    const rows = Math.ceil(H / rh) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const x = col * cw + (row % 2 === 0 ? 0 : cw / 2);
        const y = row * rh;

        const distM  = Math.hypot(x - mX,  y - mY);
        const distG  = Math.hypot(x - gx,  y - gy);
        const distG2 = Math.hypot(x - gx2, y - gy2);
        const distG3 = Math.hypot(x - gx3, y - gy3);

        /* Travelling sine wave ripple */
        const distR = Math.hypot(x - rx, y - ry);
        const wave  = (Math.sin(distR * 0.028 - t * 4.5) * 0.5 + 0.5) * 0.10;

        const hoverO = Math.max(0, 1 - distM  / 200) * 0.50 * gm;
        const glowO  = Math.max(0, 1 - distG  / 380) * 0.30 * gm;
        const glowO2 = Math.max(0, 1 - distG2 / 340) * 0.24 * gm;
        const glowO3 = Math.max(0, 1 - distG3 / 300) * 0.20 * gm;
        const baseO  = 0.055 * gm;

        const opacity = Math.min(1, baseO + hoverO + glowO + glowO2 + glowO3 + wave * gm);
        if (opacity < 0.005) continue;

        const rgb = (window as any).__twRGB ?? '0,200,255';
        ctx.strokeStyle = `rgba(${rgb},${opacity.toFixed(3)})`;
        ctx.lineWidth = 0.9;
        hex(x, y, r - 1);
        ctx.stroke();
      }
    }
    animId = requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  animId = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    document.removeEventListener('mousemove', onMouseMove);
  };
}
