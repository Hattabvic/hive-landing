import styles from './Mission.module.css';

const CARDS = [
  { ico: '</>', color: 'var(--cyan)',   value: '~32K', label: 'EGP total hardware cost consumer-grade pricing' },
  { ico: '⬡',  color: 'var(--green)',  value: '13–16',label: 'Target age group entirely underserved by current tools' },
  { ico: '◈',  color: 'var(--amber)',  value: 'FREE',  label: 'Open-source license free global adoption' },
  { ico: '◉',  color: 'var(--purple)', value: '100%', label: 'Self-contained no external internet required' },
];

export function Mission() {
  return (
    <section className={styles.mission} id="mission">
      <div className={styles.inner}>
        <div className="rl">
          <p className="sec-label">Our Mission</p>
          <h2 className="sec-title">Democratizing<br/>Cybersecurity Education.</h2>
          <p className="sec-body" style={{ marginTop: 16 }}>
            Current cybersecurity education relies on theoretical models and expensive platforms.
            Students in underfunded schools rarely observe live attacks. The HIVE Kit directly
            confronts this gap using open-source software and grade hardware to deliver
            enterprise-quality learning.
          </p>
          <br />
          <p className="sec-body">
            All hardware, software, and educational materials will be released under open-source
            licenses enabling global adoption at zero cost.
          </p>
        </div>
        <div className={`${styles.cards} rr`}>
          {CARDS.map((c) => (
            <div key={c.value} className={styles.card}>
              <div className={styles.ico} style={{ color: c.color }}>{c.ico}</div>
              <div className={styles.val}>{c.value}</div>
              <div className={styles.lbl}>{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
