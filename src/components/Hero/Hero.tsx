import { useEffect, useRef } from 'react';
import { initHexCanvas } from '../../lib/hexCanvas';
import styles from './Hero.module.css';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    return initHexCanvas(canvasRef.current);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.hexBg} />
      <div className="scan" />

      <section className={styles.hero}>
        <div className={styles.center}>
          <div className={styles.eyebrow}>
            <span className="pdot" />
            Team Phoenix
          </div>

          <h1 className={styles.h1}>HIVE</h1>
          <p className={styles.tag}>Cybersecurity Education Kit</p>
          <p className={styles.desc}>
            A complete cybersecurity lab inside a transparent acrylic enclosure real live attacks,
            real-time defense, built for the next generation.
          </p>

          <div className={styles.cta}>
            <a href="#products" className="btn-p">Explore Products ↓</a>
            <a href="#siem-demo" className="btn-g">Live SIEM Demo</a>
          </div>
        </div>

        <div className={styles.scrollCue}>
          <div className={styles.scrollLine} />
          Scroll
        </div>
      </section>
    </>
  );
}
