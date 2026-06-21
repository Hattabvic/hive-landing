import { useEffect, useReducer, useRef, useState } from 'react';
import {
  makeInitialState, tick, makePayload,
  PROTOCOLS, PROTO_COLORS,
  type LogEntry, type Protocol, type SimState,
} from '../../lib/siemSimulation';
import styles from './SiemDemo.module.css';

function badgeCls(st: string) {
  if (st === 'CONNECT') return styles.bc;
  if (st === 'COMMAND') return styles.bk;
  return styles.bf;
}

function colorJSON(json: string) {
  return json
    .replace(/"([^"]+)":/g, '<span style="color:var(--cyan-light)">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span style="color:var(--green)">"$1"</span>')
    .replace(/: (\d+)/g, ': <span style="color:var(--amber)">$1</span>');
}

export function SiemDemo() {
  const [state, setState] = useState<SimState>(makeInitialState);
  const [filter, setFilter] = useState<Protocol | 'ALL'>('ALL');
  const [speed, setSpeed] = useState(1000);
  const [paused, setPaused] = useState(false);
  const [selId, setSelId] = useState<number | null>(null);
  const ivRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (ivRef.current) clearInterval(ivRef.current);
    if (!paused) ivRef.current = setInterval(() => setState(s => tick(s)), speed);
    return () => { if (ivRef.current) clearInterval(ivRef.current); };
  }, [speed, paused]);

  const logs = filter === 'ALL' ? state.logs : state.logs.filter(l => l.p === filter);
  const tot = Object.values(state.counts).reduce((a, b) => a + b, 0) || 1;
  const selected = selId != null ? state.logs.find(l => l.id === selId) : null;

  /* ── Charts data ── */
  const timelineMax = Math.max(...state.timeline, 1);
  const sevCounts = state.logs.reduce((acc, l) => {
    acc[l.sev] = (acc[l.sev] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const sevTotal = state.logs.length || 1;
  const circ = 2 * Math.PI * 32; // r=32 → circumference ≈ 201
  const sevItems = [
    { label: 'HIGH', pct: Math.round((sevCounts.high || 0) / sevTotal * 100), color: '#ef4444' },
    { label: 'MED',  pct: Math.round((sevCounts.med  || 0) / sevTotal * 100), color: '#f59e0b' },
    { label: 'LOW',  pct: Math.round((sevCounts.low  || 0) / sevTotal * 100), color: '#22d3ee' },
  ].map((item, i, arr) => ({
    ...item,
    dash: (item.pct / 100) * circ,
    dashOffset: -arr.slice(0, i).reduce((s, x) => s + (x.pct / 100) * circ, 0),
  }));

  return (
    <section className={styles.section} id="siem-demo">
      <div className={`${styles.hdr} reveal`}>
        <p className="sec-label">Interactive Live Demo</p>
        <h2 className="sec-title">HIVE SIEM Solution</h2>
        <p className="sec-body">Watch live attack events stream in real time. Filter by protocol, click any entry to inspect its full JSON payload, and control the simulation speed.</p>
      </div>

      <div className={`${styles.dash} reveal`}>
        {/* Top bar */}
        <div className={styles.top}>
          <div className={styles.brand}>
            <img src="/assets/hive-logo.png" alt="" />
            <span>HIVE SIEM Solution</span>
          </div>
          <div className={styles.ctrls}>
            <span className={styles.ctrlLbl}>Speed</span>
            {[['Slow', 2200], ['Normal', 1000], ['Fast', 320]].map(([l, s]) => (
              <button key={l} className={`${styles.cbtn} ${speed === s && !paused ? styles.on : ''}`}
                onClick={() => { setSpeed(s as number); setPaused(false); }}>{l}</button>
            ))}
            <button className={`${styles.pause} ${paused ? styles.paused : ''}`} onClick={() => setPaused(p => !p)}>
              {paused ? 'Resume' : 'Pause'}
            </button>
          </div>
          <div className={styles.live}><span className="pdot" />Live Capture</div>
        </div>

        {/* KPIs */}
        <div className={styles.kpis}>
          <div className={styles.kpi}><div className={styles.kpiL}>Total Attacks</div><div className={styles.kpiV}>{state.total.toLocaleString()}</div></div>
          <div className={styles.kpi}><div className={styles.kpiL}>Critical Events</div><div className={styles.kpiV} style={{ color: 'var(--red)' }}>{state.critical}</div></div>
          <div className={styles.kpi}><div className={styles.kpiL}>Unique Attackers</div><div className={styles.kpiV}>{state.ips.size}</div></div>
          <div className={styles.kpi}><div className={styles.kpiL}>Active Protocols</div><div className={styles.kpiV} style={{ color: 'var(--amber)' }}>{PROTOCOLS.filter(p => state.counts[p] > 0).length}</div></div>
        </div>

        {/* ── Charts row ── */}
        <div className={styles.charts}>
          {/* Bar chart — Attack Timeline */}
          <div className={styles.chartPanel}>
            <div className={styles.chartTitle}>Attack Timeline <span className={styles.chartSub}>— last {state.timeline.length} intervals</span></div>
            <div className={styles.chartBars}>
              {state.timeline.map((h, i) => (
                <div key={i} className={styles.chartBarCol}>
                  <div
                    className={styles.chartBarFill}
                    style={{
                      height: `${(h / timelineMax) * 100}%`,
                      background: i === state.timeline.length - 1 ? '#ff003c' : 'rgba(0,200,255,.55)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Donut chart — Threat Severity */}
          <div className={styles.chartPanel}>
            <div className={styles.chartTitle}>Threat Severity</div>
            <div className={styles.donutRow}>
              <svg width="90" height="90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#1e2a3a" strokeWidth="12" />
                {sevItems.map(s => (
                  <circle key={s.label} cx="40" cy="40" r="32" fill="none"
                    stroke={s.color} strokeWidth="12"
                    strokeDasharray={`${s.dash} ${circ}`}
                    strokeDashoffset={s.dashOffset}
                    transform="rotate(-90 40 40)"
                  />
                ))}
                <text x="40" y="45" textAnchor="middle" fontSize="12" fill="#F0F4F8"
                  fontWeight="700" fontFamily="Montserrat,sans-serif">{state.logs.length}</text>
              </svg>
              <div className={styles.donutLegend}>
                {sevItems.map(s => (
                  <div key={s.label} className={styles.donutItem}>
                    <span className={styles.donutDot} style={{ background: s.color }} />
                    <span className={styles.donutText}>{s.label} — {s.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <span className={styles.flbl}>Filter</span>
          {(['ALL', ...PROTOCOLS] as (Protocol | 'ALL')[]).map(p => (
            <button key={p} className={`${styles.fchip} ${filter === p ? styles.on : ''}`} onClick={() => setFilter(p)}>{p}</button>
          ))}
        </div>

        {/* Body */}
        <div className={styles.body}>
          <div className={styles.left}>
            {/* Log table */}
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Live Event Log <span style={{ color: 'var(--cyan)' }}>({logs.length})</span></div>
              <div className={styles.logHd}>
                <span>Time</span><span>Source IP</span><span>Event</span><span>Protocol</span><span>Port</span><span>Status</span>
              </div>
              <div className={styles.logRows}>
                {logs.slice(0, 30).map(l => (
                  <div key={l.id} className={`${styles.logrow} ${l.id === selId ? styles.sel : ''}`} onClick={() => setSelId(l.id)}>
                    <span className={styles.st}>{l.ts}</span>
                    <span className={styles.sip}>{l.ip}</span>
                    <span className={styles.sev}>{l.ev}</span>
                    <span className={styles.spr}>{l.p}</span>
                    <span className={styles.spo}>{l.port}</span>
                    <span className={`${styles.badge} ${badgeCls(l.st)}`}>{l.st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.right}>
            {/* Protocol breakdown */}
            <div className={styles.panel}>
              <div className={styles.panelTitle}>Protocol Breakdown</div>
              {PROTOCOLS.map(p => {
                const pct = Math.round(state.counts[p] / tot * 100);
                return (
                  <div key={p} className={styles.protoRow}>
                    <div className={styles.protoMeta}>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p}</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{pct}%</span>
                    </div>
                    <div className={styles.protoTrack}>
                      <div className={styles.protoFill} style={{ width: `${pct}%`, background: PROTO_COLORS[p] }} />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Inspector */}
            <div className={`${styles.panel} ${styles.inspector}`}>
              <div className={styles.panelTitle}>Payload Inspector</div>
              {selected
                ? <pre className={styles.jsonPre} dangerouslySetInnerHTML={{ __html: colorJSON(JSON.stringify(makePayload(selected), null, 2)) }} />
                : <div className={styles.empty}>Click any log entry to inspect its JSON payload</div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
