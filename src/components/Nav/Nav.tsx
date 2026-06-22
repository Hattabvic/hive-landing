import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

const LINKS = [
  { to: '/products',     label: 'Products' },
  { to: '/siem-demo',    label: 'SIEM Demo' },
  { to: '/mission',      label: 'Mission' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/team',         label: 'Team' },
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
      <Link to="/" className={styles.brand}>
        <img src="/assets/hive-logo.png" alt="HIVE logo" />
        <span>HIVE</span>
      </Link>

      <ul className={styles.links}>
        {LINKS.map((l) => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {l.label}
            </NavLink>
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
