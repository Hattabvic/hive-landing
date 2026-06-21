import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>HIVE</div>
        <div className={styles.info}>
          HONEYPOT INTRUSION &amp; VULNERABILITY EMULATOR<br />
          Team Phoenix 
        </div>
        <div className={styles.status}><span className="pdot" />System Online</div>
      </div>
    </footer>
  );
}
