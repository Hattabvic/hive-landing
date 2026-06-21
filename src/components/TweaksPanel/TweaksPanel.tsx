import { useEffect, useState } from 'react';
import styles from './TweaksPanel.module.css';

type Atm = 'stealth' | 'live' | 'threat';
type Mot = 'full' | 'minimal';

const ATMS = {
  stealth: { cyan: '#4a9fb5', cyanbr: '#6ab8cc', bg: '#020508', rgb: '74,159,181' },
  live:    { cyan: '#00C8FF', cyanbr: '#00f0ff', bg: '#050505', rgb: '0,200,255'  },
  threat:  { cyan: '#ff003c', cyanbr: '#ff2255', bg: '#0a0203', rgb: '255,0,60'  },
};

const KEY = 'hive-tw-v2';

export function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [atm, setAtm] = useState<Atm>('live');
  const [glow, setGlow] = useState(3);
  const [motion, setMotion] = useState<Mot>('full');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (saved.atm) setAtm(saved.atm);
      if (saved.glow) setGlow(saved.glow);
      if (saved.motion !== undefined) setMotion(saved.motion ? 'full' : 'minimal');
    } catch {}
  }, []);

  useEffect(() => {
    const r = document.documentElement;
    const a = ATMS[atm];
    r.style.setProperty('--cyan', a.cyan);
    r.style.setProperty('--cyan-bright', a.cyanbr);
    r.style.setProperty('--bg-body', a.bg);
    r.style.setProperty('--tw-rgb', a.rgb);
    r.style.setProperty('--anim-play', motion === 'full' ? 'running' : 'paused');
    (window as any).__twRGB = a.rgb;
    (window as any).__twGlowMult = () => glow / 3;
    localStorage.setItem(KEY, JSON.stringify({ atm, glow, motion: motion === 'full' }));
  }, [atm, glow, motion]);

  return (
    <>
      {open && (
        <div className={styles.panel}>
          <div className={styles.head}>
            ⬡ Tweaks
            <button className={styles.close} onClick={() => setOpen(false)}>×</button>
          </div>
          <div>
            <div className={styles.lbl}>Atmosphere</div>
            <div className={styles.opts}>
              {(['stealth','live','threat'] as Atm[]).map(a => (
                <button key={a} className={`${styles.opt} ${atm===a?styles.on:''}`} onClick={() => setAtm(a)}>
                  {a.charAt(0).toUpperCase() + a.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.lbl}>Glow Intensity — {glow}</div>
            <input type="range" min={1} max={5} value={glow} onChange={e => setGlow(+e.target.value)} className={styles.slider} />
          </div>
          <div>
            <div className={styles.lbl}>Motion</div>
            <div className={styles.opts}>
              {(['full','minimal'] as Mot[]).map(m => (
                <button key={m} className={`${styles.opt} ${motion===m?styles.on:''}`} onClick={() => setMotion(m)}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <button className={styles.toggle} onClick={() => setOpen(o => !o)}>⬡ Tweaks</button>
    </>
  );
}
