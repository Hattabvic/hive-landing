import styles from './Architecture.module.css';

const NODES = [
  {
    id: 'Node 01 · Attacker', name: 'Kali Linux', role: 'HONEYPOT-ALPHA-ATTACKER',
    color: 'var(--red)',
    desc: 'Executes controlled penetration testing Nmap scanning, Hydra brute-force, Metasploit exploits. Generates real malicious traffic in a safe.',
  },
  {
    id: 'Node 02 · Honeypot', name: 'Raspbian + Cowrie', role: 'HONEYPOT-ALPHA-01',
    color: 'var(--cyan)',
    desc: 'Runs Cowrie (SSH/Telnet) and Dionaea (HTTP, FTP, SMB, MYSQL) honeypot services. Logs every command, connection, and payload to structured JSON.',
  },
  {
    id: 'Node 03 · Monitor', name: 'SIEM Dashboard', role: 'HONEYPOT-ALPHA-MONITOR',
    color: 'var(--green)',
    desc: 'React + TypeScript dashboard connects directly to the Kali node to receive live log streams. Displays real-time threat data, attack timelines, and protocol breakdowns.',
  },
];

export function Architecture() {
  return (
    <section className={styles.arch} id="architecture">
      <div className={styles.inner}>
        <div className="reveal">
          <p className="sec-label">Network Architecture</p>
          <h2 className="sec-title">Three Nodes.<br/>One Attack Chain.</h2>
          <p className="sec-body" style={{ marginTop: 14, maxWidth: 640 }}>
            Every attack unfolds across three simultaneous perspectives  initiation, capture,
            and visualization  giving students a complete, enterprise-grade view of a live
            threat intelligence cycle.
          </p>
        </div>

        <div className={styles.nodes}>
          {NODES.map((n, i) => (
            <div key={n.id} className={`${styles.node} reveal d${i + 1}`} style={{ '--ac': n.color } as React.CSSProperties}>
              <div className={styles.nodeId}>{n.id}</div>
              <div className={styles.nodeName}>{n.name}</div>
              <div className={styles.nodeRole}>{n.role}</div>
              <div className={styles.nodeDesc}>{n.desc}</div>
            </div>
          ))}
        </div>

        {/* SVG topology diagram */}
        <div className={`${styles.circuitWrap} reveal`}>
          <div className={styles.cirBar}>
            <span className="pdot" />LIVE NETWORK TOPOLOGY
            <div className={styles.legend}>
              <span style={{ color: '#ff003c' }}>━  · Attack</span>
              <span style={{ color: '#00C8FF' }}>━  · Honeypot</span>
              <span style={{ color: '#00ff9f' }}>━ Monitor · Kali Link</span>
            </div>
          </div>
          <svg className={styles.cirSvg} viewBox="0 0 1100 460" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="fr" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="fc" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="fg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* Enclosure border */}
            <rect x="55" y="108" width="990" height="280" rx="18" fill="none" stroke="rgba(139,174,196,.1)" strokeWidth="1.5" strokeDasharray="10 6"/>
            <text x="78" y="103" fontFamily="JetBrains Mono,monospace" fontSize="11" fill="rgba(139,174,196,.35)" letterSpacing="3">H.I.V.E. ACRYLIC ENCLOSURE</text>

            {/* ─ Connection lines ─ */}
            {/* Kali → Switch (VLAN 10 · Attack) */}
            <path id="circ-a1" d="M 248,192 H 452" stroke="#ff003c" strokeWidth="1.5" fill="none" strokeDasharray="8 5" opacity=".6"/>
            <path id="circ-a2" d="M 452,210 H 248" stroke="#ff003c" strokeWidth="1" fill="none" strokeDasharray="5 7" opacity=".25"/>
            {/* Switch → Honeypot (VLAN 20 · Honeypot) */}
            <path id="circ-h1" d="M 676,192 H 872" stroke="#00C8FF" strokeWidth="1.5" fill="none" strokeDasharray="8 5" opacity=".65"/>
            {/* Kali → SIEM Monitor (direct link) */}
            <path id="circ-m1" d="M 162,252 C 162,350 508,320 508,388" stroke="#00ff9f" strokeWidth="1.5" fill="none" strokeDasharray="5 4" opacity=".75"/>

            {/* ─ Kali Linux ─ */}
            <g transform="translate(82,132)">
              <rect width="166" height="120" rx="8" fill="#090212" stroke="#ff003c" strokeWidth="1.5"/>
              <rect width="166" height="3" rx="1.5" fill="#ff003c"/>
              <text x="83" y="28" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="700" fontSize="13" fill="#F0F4F8" letterSpacing="1.5">KALI LINUX</text>
              <text x="83" y="45" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fill="#ff003c" letterSpacing="1">ATTACKER NODE</text>
              <text x="83" y="65" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">192.168.1.10</text>
              <text x="83" y="82" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">Raspberry Pi 4 · 4 GB</text>
              <text x="83" y="110" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">Nmap · Hydra · Metasploit</text>
              <circle cx="154" cy="16" r="5" fill="#ff003c"><animate attributeName="opacity" values="1;.25;1" dur="1.2s" repeatCount="indefinite"/></circle>
            </g>

            {/* ─ Switch ─ */}
            <g transform="translate(452,130)">
              <rect width="224" height="180" rx="10" fill="#060d18" stroke="#334155" strokeWidth="1.5"/>
              <rect width="224" height="3" rx="1.5" fill="#334155"/>
              <text x="112" y="27" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="700" fontSize="13" fill="#F0F4F8" letterSpacing="1">TP-LINK SG2210P</text>
              <text x="112" y="44" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fill="#8BAEC4" letterSpacing="1">MANAGED SWITCH</text>
              <text x="112" y="60" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#64748b"> PORT MIRRORING</text>
              <g transform="translate(14,70)">
                {[['P1', '#ff003c', 0], ['P2', '#00C8FF', 32], ['P3', '#334155', 64]].map(([p, c, x]) => (
                  <g key={p as string}>
                    <rect x={x as number} width="28" height="22" rx="2" fill="#0f1a28" stroke={c as string} strokeWidth="1" opacity=".85"/>
                    <text x={(x as number) + 14} y="15" textAnchor="middle" fontFamily="monospace" fontSize="9" fill={c as string}>{p}</text>
                    <circle cx={(x as number) + 14} cy="32" r="3.5" fill={c as string}><animate attributeName="opacity" values="1;.15;1" dur="1s" repeatCount="indefinite"/></circle>
                  </g>
                ))}
                {[96, 128, 160].map((x, i) => (
                  <g key={i}>
                    <rect x={x} width="28" height="22" rx="2" fill="#0f1a28" stroke="#334155" strokeWidth="1" opacity=".4"/>
                    <text x={x + 14} y="15" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#64748b">P{i + 4}</text>
                    <circle cx={x + 14} cy="32" r="3" fill="#334155" opacity=".35"/>
                  </g>
                ))}
              </g>
              <text x="14" y="128" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4"> P1 → Attacker</text>
              <text x="14" y="145" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4"> P2 → Honeypot</text>
              <text x="14" y="162" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#64748b">P3: Uplink / Standby</text>
              <circle cx="212" cy="16" r="5" fill="#00C8FF"><animate attributeName="opacity" values="1;.4;1" dur="1.9s" repeatCount="indefinite"/></circle>
            </g>

            {/* ─ Honeypot / Vulnerable Server ─ */}
            <g transform="translate(860,132)">
              <rect width="196" height="120" rx="8" fill="#030d1a" stroke="#00C8FF" strokeWidth="1.5"/>
              <rect width="196" height="3" rx="1.5" fill="#00C8FF"/>
              <text x="98" y="28" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="700" fontSize="13" fill="#F0F4F8" letterSpacing="1.5">VULNERABLE SERVER</text>
              <text x="98" y="45" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fill="#00C8FF" letterSpacing="1">COWRIE + DIONAEA</text>
              <text x="98" y="65" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">192.168.1.20</text>
              <text x="98" y="82" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">Raspberry Pi 4 · 4 GB</text>
              <text x="98" y="110" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">SSH · SMB · HTTP · FTP · MySQL</text>
              <circle cx="184" cy="16" r="5" fill="#00C8FF"><animate attributeName="opacity" values="1;.35;1" dur="2s" repeatCount="indefinite"/></circle>
            </g>

            {/* ─ SIEM Monitor (connected to Kali) ─ */}
            <g transform="translate(368,388)">
              <rect width="380" height="56" rx="10" fill="#030d18" stroke="#00ff9f" strokeWidth="1.5"/>
              <rect width="380" height="3" rx="1.5" fill="#00ff9f"/>
              <text x="190" y="24" textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="700" fontSize="14" fill="#F0F4F8" letterSpacing="1.5">H.I.V.E. SIEM SOLUTION</text>
              <text x="190" y="39" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="11" fill="#00ff9f" letterSpacing="1">REAL-TIME THREAT MONITORING</text>
              <text x="190" y="52" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="10" fill="#8BAEC4">React · TypeScript · WebSocket · WIMAXIT Touchscreen</text>
              <circle cx="366" cy="14" r="5" fill="#00ff9f"><animate attributeName="opacity" values="1;.4;1" dur="1.6s" repeatCount="indefinite"/></circle>
            </g>

            {/* ─ Animated packets ─ */}
            {/* Kali → Switch */}
            {[0, 0.57, 1.14].map((d, i) => (
              <circle key={i} r="5.5" fill="#ff003c" filter="url(#fr)" opacity="0">
                <animateMotion dur="1.7s" repeatCount="indefinite" begin={`${d}s`}><mpath xlinkHref="#circ-a1"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="1.7s" repeatCount="indefinite" begin={`${d}s`}/>
              </circle>
            ))}
            {/* Switch → Honeypot */}
            {[0.2, 1.1].map((d, i) => (
              <circle key={i} r="5.5" fill="#00C8FF" filter="url(#fc)" opacity="0">
                <animateMotion dur="2s" repeatCount="indefinite" begin={`${d}s`}><mpath xlinkHref="#circ-h1"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin={`${d}s`}/>
              </circle>
            ))}
            {/* Kali → SIEM */}
            {[0, 1.0].map((d, i) => (
              <circle key={i} r="5" fill="#00ff9f" filter="url(#fg)" opacity="0">
                <animateMotion dur="2.2s" repeatCount="indefinite" begin={`${d}s`}><mpath xlinkHref="#circ-m1"/></animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin={`${d}s`}/>
              </circle>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
