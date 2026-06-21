import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const LINKS = [
  { href: '#products',     label: 'Products' },
  { href: '#siem-demo',   label: 'SIEM Demo' },
  { href: '#mission',     label: 'Mission' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#team',        label: 'Team' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.brand}>
        <img src="/assets/hive-logo.png" alt="HIVE logo" />
        <span>HIVE</span>
      </a>

      <ul className={styles.links}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <div className={styles.status}>
        <span className="pdot" />
        System Online
      </div>
    </nav>
  );
}
