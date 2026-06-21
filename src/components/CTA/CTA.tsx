import styles from './CTA.module.css';

export function CTA() {
  return (
    <section className={styles.cta} id="cta">
      <div className={styles.hexBg} />
      <div className={styles.glow} />
      <div className={`${styles.inner} reveal`}>
        <div className={styles.badge}><span className="pdot" />Open Source · Spring 2026</div>
        <h2 className={styles.title}>
          Ready to Deploy<br/>the <span className={styles.accent}>HIVE</span> Kit?
        </h2>
        <p className={styles.desc}>
          Everything you need to run live cybersecurity labs — hardware, software, and books.
          Self-contained, open-source, and built for learners aged 13–16.
        </p>
        <div className={styles.actions}>
          <a href="#products"     className="btn-p">Explore Products</a>
          <a href="#siem-demo"   className="btn-g">Live SIEM Demo</a>
          <a href="#architecture" className="btn-g">Architecture</a>
        </div>

        {/* ── Contact ── */}
        <div className={styles.contactLbl}>Get in touch</div>
        <div className={styles.contacts}>
          <a className={styles.contactCard} href="mailto:sharemed915@gmail.com">
            <span className={styles.contactIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/>
                <path d="M3 6l9 6 9-6"/>
              </svg>
            </span>
            <span className={styles.contactText}>
              <span className={styles.contactKind}>Email</span>
              <span className={styles.contactVal}>Pheonix11@gmail.com</span>
            </span>
          </a>

          <a className={styles.contactCard} href="tel:+201000000000">
            <span className={styles.contactIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 3.5h3.2l1.4 4.2-2 1.4a12 12 0 0 0 5 5l1.4-2 4.2 1.4V20a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 6.1 1.5 1.5 0 0 1 5 4.5z"/>
              </svg>
            </span>
            <span className={styles.contactText}>
              <span className={styles.contactKind}>Phone</span>
              <span className={styles.contactVal}>+20 100 615 2026</span>
            </span>
          </a>
        </div>

        
      </div>
    </section>
  );
}
