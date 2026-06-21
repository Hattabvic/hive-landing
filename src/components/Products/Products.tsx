import { useRef, useState, useEffect } from 'react';
import styles from './Products.module.css';

/* ── Kit viewer ── */
const KIT_VIEWS = [
  { src: '/assets/blue.png',   label: 'SYSTEM ONLINE', tag: 'BLUE'   },
  { src: '/assets/greeb.png',  label: 'MONITOR MODE',  tag: 'GREEN'  },
  { src: '/assets/red.png',    label: 'ATTACK MODE',   tag: 'RED'    },
  { src: '/assets/purple.png', label: 'STANDBY MODE',  tag: 'PURPLE' },
];

function KitViewer() {
  const [active, setActive]   = useState(0);
  const [opacity, setOpacity] = useState(1);
  const activeRef = useRef(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (i: number) => {
    setOpacity(0);
    setTimeout(() => { activeRef.current = i; setActive(i); setOpacity(1); }, 260);
  };

  const restart = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (activeRef.current + 1) % KIT_VIEWS.length;
      go(next);
    }, 3000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { restart(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, []);

  return (
    <div className={styles.kitViewer}>
      <img
        className={styles.kitMainImg}
        src={KIT_VIEWS[active].src}
        alt="Kit view"
        style={{ opacity, transition: 'opacity .28s ease' }}
      />
      <div className={styles.kitViewLbl}>{KIT_VIEWS[active].label}</div>
      <div className={styles.kitThumbs}>
        {KIT_VIEWS.map((v, i) => (
          <div
            key={i}
            className={`${styles.kthumb} ${i === active ? styles.kthumbActive : ''}`}
            onClick={() => { go(i); restart(); }}
          >
            <img src={v.src} alt={v.tag} />
            <span>{v.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Dashboard mini ── */
function DashMini() {
  const bars = [28, 52, 38, 74, 58, 90, 44, 100, 62, 46, 34, 80];
  const circ = 2 * Math.PI * 22;
  const sevData = [
    { label: 'HIGH', pct: 32, color: '#ef4444', dash: 0.32 * circ, dashOff: 0 },
    { label: 'MED',  pct: 26, color: '#f59e0b', dash: 0.26 * circ, dashOff: -(0.32 * circ) },
    { label: 'LOW',  pct: 42, color: '#22d3ee', dash: 0.42 * circ, dashOff: -(0.58 * circ) },
  ];
  const protocols = [
    { name: 'SSH',   pct: 43, color: '#00C8FF' },
    { name: 'SMB',   pct: 28, color: '#ef4444' },
    { name: 'HTTP',  pct: 15, color: '#f59e0b' },
    { name: 'FTP',   pct: 9,  color: '#a855f7' },
    { name: 'Other', pct: 5,  color: '#22d3ee' },
  ];
  const evtBadge = (cls: string) => cls === 'bc' ? styles.bc : cls === 'bk' ? styles.bk : styles.bf;

  return (
    <div className={styles.dash}>
      <div className={styles.dashTop}>
        <span className={styles.dashTtl}>HIVE SIEM SOLUTION</span>
        <span className={styles.dashLive}><span className="pdot" />Live Capture</span>
      </div>
      <div className={styles.dashKpis}>
        {[
          ['TOTAL ATTACKS', '2,847', ''],
          ['UNIQUE IPS',    '94',    ''],
          ['CRITICAL',      '17',    'var(--red)'],
          ['PROTOCOLS',     '6',     'var(--amber)'],
        ].map(([l, v, c]) => (
          <div key={l} className={styles.dkpi}>
            <div className={styles.dkpiL}>{l}</div>
            <div className={styles.dkpiV} style={c ? { color: c } : {}}>{v}</div>
          </div>
        ))}
      </div>
      <div className={styles.dashBody}>
        <div className={styles.dp}>
          <div className={styles.dpL}>Attack Timeline</div>
          <div className={styles.bars}>
            {bars.map((h, i) => (
              <div key={i} className={styles.bar}
                style={{ height: `${h}%`, background: i === bars.length - 1 ? 'rgba(255,0,60,.65)' : 'rgba(0,200,255,.4)' }} />
            ))}
          </div>
        </div>
        <div className={styles.dp}>
          <div className={styles.dpL}>Protocols</div>
          {protocols.map(p => (
            <div key={p.name} className={styles.drow}>
              <span className={styles.dotC} style={{ background: p.color }} />
              <span className={styles.dip}>{p.name}</span>
              <span className={styles.dpct}>{p.pct}%</span>
            </div>
          ))}
        </div>
        <div className={styles.dp}>
          <div className={styles.dpL}>Threat Severity</div>
          <div className={styles.donutWrap}>
            <svg width="64" height="64" viewBox="0 0 58 58">
              <circle cx="29" cy="29" r="22" fill="none" stroke="#1e2a3a" strokeWidth="10" />
              {sevData.map(s => (
                <circle key={s.label} cx="29" cy="29" r="22" fill="none"
                  stroke={s.color} strokeWidth="10"
                  strokeDasharray={`${s.dash} ${circ}`}
                  strokeDashoffset={s.dashOff}
                  transform="rotate(-90 29 29)"
                />
              ))}
              <text x="29" y="33" textAnchor="middle" fontSize="9" fill="#F0F4F8" fontWeight="700">247</text>
            </svg>
            <div className={styles.donutLegend}>
              {sevData.map(s => (
                <div key={s.label} className={styles.donutRow}>
                  <span className={styles.donutBar} style={{ background: s.color }} />
                  <span className={styles.donutLbl}>{s.label} — {s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.dashEvents}>
        <div className={styles.dpL} style={{ marginBottom: 6 }}>LIVE EVENTS</div>
        {[
          { t: '14:32:08', ip: '192.168.1.42', desc: 'SSH brute force — root',    st: 'FAILED',  cls: 'bf' },
          { t: '14:31:55', ip: '192.168.1.42', desc: 'New connection — port 22',  st: 'CONNECT', cls: 'bc' },
          { t: '14:29:12', ip: '192.168.1.42', desc: 'Command — whoami; id',      st: 'COMMAND', cls: 'bk' },
          { t: '14:28:44', ip: '192.168.1.13', desc: 'SMB exploit — EternalBlue', st: 'BLOCKED', cls: 'bf' },
        ].map(({ t, ip, desc, st, cls }) => (
          <div key={t} className={styles.drow}>
            <span className={styles.dt}>{t}</span>
            <span className={styles.dip}>{ip}</span>
            <span className={styles.ddesc}>{desc}</span>
            <span className={`${styles.dbdg} ${evtBadge(cls)}`}>{st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Books visual — panels are rendered OUTSIDE carousel by parent ── */
function BooksVis({ onText, onLabs, textOpen, labsOpen }: {
  onText: () => void; onLabs: () => void; textOpen: boolean; labsOpen: boolean;
}) {
  return (
    <div className={styles.booksWrap}>
      {/* Zero to Secure */}
      <div
        className={`${styles.book} ${textOpen ? styles.bookSel : ''}`}
        onClick={onText}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.bookBar} style={{ background: 'var(--cyan)' }} />
        <div className={styles.bookInner} style={{ background: '#070d18' }}>
          <div className={styles.bTag} style={{ color: 'var(--cyan)' }}>Module 01 · 02 · 03</div>
          <div className={styles.bBrand} style={{ color: 'var(--cyan)' }}>H.I.V.E.</div>
          <div className={styles.bDiv} style={{ background: 'var(--cyan)' }} />
          <div className={styles.bMain}>Zero<br/>to Secure.</div>
          <div className={styles.bSub}>A Beginner's Guide to Cybersecurity</div>
          <div className={styles.bFoot}><span>213 Pages</span><span>Spring 2026</span></div>
        </div>
      </div>
      {/* Labs Workbook */}
      <div
        className={`${styles.book} ${styles.bookLabs} ${labsOpen ? styles.bookSel : ''}`}
        onClick={onLabs}
        style={{ cursor: 'pointer' }}
      >
        <div className={styles.bookBar} style={{ background: '#8b5cf6' }} />
        <div className={styles.bookInner} style={{ background: 'linear-gradient(160deg,#0f0820 0%,#0a0618 100%)' }}>
          <div className={styles.bTag} style={{ color: '#9B5DE5', borderColor: 'rgba(139,92,246,.3)', background: 'rgba(139,92,246,.08)' }}>Lab Edition</div>
          <div className={styles.bBrand} style={{ color: '#8b5cf6' }}>HIVE</div>
          <div className={styles.bDiv} style={{ background: '#8b5cf6' }} />
          <div className={styles.bMain} style={{ color: '#c4b5fd' }}>Labs<br/>Workbook.</div>
          <div className={styles.bSub} style={{ color: 'rgba(210,196,255,.92)' }}>Hands-On Agent Missions</div>
          <div className={styles.bFoot} style={{ borderTopColor: 'rgba(139,92,246,.25)' }}><span>Lab Exercises</span><span>Spring 2026</span></div>
        </div>
      </div>
    </div>
  );
}

/* ── Products (carousel) ── */
const SLIDES = 3;

export function Products() {
  const [slide, setSlide] = useState(0);
  const [bookPanel, setBookPanel] = useState<'text' | 'labs' | null>(null);
  const sxRef    = useRef<number | null>(null);
  const swipeRef = useRef(false);

  const go = (i: number) => {
    setSlide(((i % SLIDES) + SLIDES) % SLIDES);
    if (i !== 2) setBookPanel(null); // close panel when leaving book slide
  };

  const toggleBook = (which: 'text' | 'labs') =>
    setBookPanel(p => (p === which ? null : which));

  return (
    <section className={styles.products} id="products">
      <div className={`${styles.hdr} reveal`}>
        <p className="sec-label">What We Built</p>
        <h2 className="sec-title">FOUR Products.<br/>One Mission.</h2>
        <p className="sec-body">From custom hardware to live dashboards and curriculum-aligned books a complete cybersecurity education ecosystem, built from scratch.</p>
      </div>

      <div className={styles.carousel}>
        <button className={`${styles.carArrow} ${styles.carPrev}`} onClick={() => go(slide - 1)} aria-label="Previous">‹</button>
        <button className={`${styles.carArrow} ${styles.carNext}`} onClick={() => go(slide + 1)} aria-label="Next">›</button>

        <div
          className={styles.track}
          style={{ transform: `translateX(-${slide * 100}%)` }}
          onPointerDown={e => { sxRef.current = e.clientX; swipeRef.current = false; }}
          onPointerMove={e => {
            if (sxRef.current === null) return;
            if (!swipeRef.current && Math.abs(e.clientX - sxRef.current) > 50) {
              swipeRef.current = true;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            }
          }}
          onPointerUp={e => {
            if (sxRef.current === null) return;
            const dx = e.clientX - sxRef.current;
            sxRef.current = null;
            if (swipeRef.current && Math.abs(dx) > 50) go(slide + (dx < 0 ? 1 : -1));
            swipeRef.current = false;
          }}
          onPointerCancel={() => { sxRef.current = null; swipeRef.current = false; }}
        >
          {/* Slide 01 — Kit */}
          <div className={styles.slide}>
            <div className={styles.product}>
              <div className="rl">
                <p className={styles.prodNum}>PRODUCT 01 / 03</p>
                <div className={styles.prodTag}>Hardware</div>
                <h3 className={styles.prodTitle}>HIVE Kit</h3>
                <p className={styles.prodSub}>Portable Cybersecurity Hardware</p>
                <p className={styles.prodDesc}>A custom-built, clear acrylic enclosure housing two Raspberry Pi 4 nodes, a TP-Link Omada managed switch, and a WIMAXIT touchscreen — with a perimeter RGB LED strip that communicates system state in real time.</p>
                <ul className={styles.feats}>
                  <li>2× Raspberry Pi 4 — Attacker (Kali Linux) + Honeypot (Raspbian)</li>
                  <li>TP-Link SG2210P with 802.1Q VLAN segmentation & port mirroring</li>
                  <li>Plug and play setup — no configuration required</li>
                  <li>Fully self-contained — no external network required</li>
                </ul>
              </div>
              <div className="rr"><KitViewer /></div>
            </div>
          </div>

          {/* Slide 02 — Dashboard */}
          <div className={styles.slide}>
            <div className={`${styles.product} ${styles.flip}`}>
              <div className="rr">
                <p className={styles.prodNum}>PRODUCT 02 / 03</p>
                <div className={styles.prodTag} style={{ color: 'var(--green)', borderColor: 'rgba(0,255,159,.25)', background: 'rgba(0,255,159,.04)' }}>Software</div>
                <h3 className={styles.prodTitle}>HIVE SIEM Solution</h3>
                <p className={styles.prodSub} style={{ color: 'var(--green)' }}>Real-Time Threat Dashboard</p>
                <p className={styles.prodDesc}>A live security information and event management dashboard built in React and TypeScript. Streams real attack data from Cowrie and Dionaea honeypots via WebSocket, visualizing every intrusion as it happens.</p>
                <ul className={styles.feats}>
                  <li>Live WebSocket feed from Cowrie SSH/Telnet + Dionaea honeypots</li>
                  <li>Protocol breakdown chart — SSH, SMB, HTTP, FTP, MySQL, MSSQL</li>
                  <li>24-hour rolling attack timeline with animated bar chart</li>
                  <li>Filterable log table with full JSON payload inspector</li>
                  <li>KPI cards: Total Attacks, Unique Attackers, Critical Events</li>
                </ul>
                <br /><a href="#siem-demo" className="btn-p" style={{ width: 'fit-content' }}>See Live Demo ↓</a>
              </div>
              <div className="rl"><DashMini /></div>
            </div>
          </div>

          {/* Slide 03 — Books */}
          <div className={styles.slide}>
            <div className={styles.product}>
              <div className="rl">
                <p className={styles.prodNum}>PRODUCT 03 / 03</p>
                <div className={styles.prodTag} style={{ color: 'var(--purple-alt)', borderColor: 'rgba(155,93,229,.3)', background: 'rgba(155,93,229,.05)' }}>Educational Materials</div>
                <h3 className={styles.prodTitle}>Zero to Secure<br/>+ Labs Workbook</h3>
                <p className={styles.prodSub} style={{ color: 'var(--purple-alt)' }}>Curriculum-Aligned Textbooks</p>
                <p className={styles.prodDesc}>Two companion books engineered for students aged 13–16. The main textbook covers OS & Linux, Networking, and Security fundamentals. The labs workbook delivers hands-on agent missions aligned to each module.</p>
                <ul className={styles.feats}>
                  <li>213+ pages across 3 modules — OS & Linux, Networks, Security</li>
                  <li>5 callout types: Agent Tasks, Tips, Alerts, Notes, Lab Connectors</li>
                  <li>Hacker aesthetic meets academic structure — terminal motifs throughout</li>
                  
                </ul>
                <p className={styles.bookHint}>↑ Click a book to see its contents</p>
              </div>
              <div className="rr">
                <BooksVis
                  onText={() => toggleBook('text')}
                  onLabs={() => toggleBook('labs')}
                  textOpen={bookPanel === 'text'}
                  labsOpen={bookPanel === 'labs'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Book panels — OUTSIDE overflow:hidden carousel, aligned under the books column */}
      {bookPanel && (
        <div className={styles.panelRow}>
          <div className={styles.panelSpacer} />
          {bookPanel === 'text' && (
            <div className={styles.textPanel}>
              <div className={styles.textBopTitle}>Zero to Secure — Modules</div>
              <div className={styles.textBopSub}>Core textbook · 213 pages across 3 foundational modules</div>
              <div className={styles.textBopGrid}>
                {[
                  ['Module 01', 'OS & Linux',            'Command line, filesystem, permissions, processes & package management'],
                  ['Module 02', 'Network Fundamentals',   'TCP/IP, ports & protocols, packets, scanning & traffic analysis'],
                  ['Module 03', 'Security Fundamentals',  'Threats & attacks, defense, honeypots, logging & SIEM monitoring'],
                ].map(([n, t, d]) => (
                  <div key={n} className={styles.textBopCh}>
                    <div className={styles.textBopChN}>{n}</div>
                    <div className={styles.textBopChT}>{t}</div>
                    <div className={styles.textBopChD}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {bookPanel === 'labs' && (
            <div className={styles.labsPanel}>
              <div className={styles.bopTitle}>Labs Workbook — Contents</div>
              <div className={styles.bopSub}>Hands-on agent missions · Aligned to Zero to Secure modules</div>
              <div className={styles.bopGrid}>
                {[
                  ['Lab 01', 'Terminal Basics & Linux Navigation'],
                  ['Lab 02', 'Network Scanning with Nmap'],
                  ['Lab 03', 'Packet Capture & Wireshark'],
                  ['Lab 04', 'SSH Brute Force with Hydra'],
                  ['Lab 05', 'Honeypot Deployment & Cowrie'],
                  ['Lab 06', 'SIEM Log Analysis & Alerting'],
                ].map(([n, t]) => (
                  <div key={n} className={styles.bopCh}>
                    <div className={styles.bopChN}>{n}</div>
                    <div className={styles.bopChT}>{t}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dot indicators */}
      <div className={styles.dots}>
        {[0, 1, 2].map(i => (
          <button
            key={i}
            className={`${styles.dot} ${i === slide ? styles.dotOn : ''}`}
            onClick={() => go(i)}
            aria-label={`Product ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
