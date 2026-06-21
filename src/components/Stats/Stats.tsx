import { useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import styles from './Stats.module.css';

function StatItem({ target, suffix, label, delay }: {
  target: number; suffix?: string; label: string; delay: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div className={`${styles.stat} reveal`} style={{ transitionDelay: delay }}>
      <div className={styles.number}>
        <span ref={ref as React.RefObject<HTMLSpanElement>}>{value}</span>
        {suffix && <sup>{suffix}</sup>}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <div className={styles.stats}>
      <div className={styles.grid}>
        <StatItem target={4}   label="Products Built"    delay=".1s" />
        <StatItem target={213} suffix="+" label="Book Pages"    delay=".2s" />
        <StatItem target={5}   label="Attack Protocols"  delay=".3s" />
      </div>
    </div>
  );
}
