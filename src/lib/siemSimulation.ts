/* SIEM live simulation engine — all data and tick logic isolated here */

export type Severity = 'low' | 'med' | 'high';
export type Status = 'FAILED' | 'CONNECT' | 'COMMAND' | 'BLOCKED';
export type Protocol = 'SSH' | 'SMB' | 'HTTP' | 'FTP' | 'MySQL' | 'MSSQL';

export interface LogEntry {
  id: number;
  ts: string;
  ip: string;
  ev: string;
  p: Protocol;
  port: number;
  st: Status;
  sev: Severity;
}

export interface SimState {
  total: number;
  critical: number;
  ips: Set<string>;
  counts: Record<Protocol, number>;
  timeline: number[];
  logs: LogEntry[];
}

const EVTS: Omit<LogEntry, 'id' | 'ts' | 'ip'>[] = [
  { ev: 'SSH brute force — root credential',  p: 'SSH',   port: 22,   st: 'FAILED',  sev: 'low' },
  { ev: 'SSH login — admin (wrong password)', p: 'SSH',   port: 22,   st: 'FAILED',  sev: 'low' },
  { ev: 'SSH session established',            p: 'SSH',   port: 22,   st: 'CONNECT', sev: 'med' },
  { ev: 'Command executed — whoami; id',      p: 'SSH',   port: 22,   st: 'COMMAND', sev: 'med' },
  { ev: 'Command executed — cat /etc/passwd', p: 'SSH',   port: 22,   st: 'COMMAND', sev: 'high' },
  { ev: 'Telnet anonymous login attempt',     p: 'SSH',   port: 23,   st: 'FAILED',  sev: 'low' },
  { ev: 'SMB exploit — EternalBlue MS17-010', p: 'SMB',   port: 445,  st: 'BLOCKED', sev: 'high' },
  { ev: 'SMB lateral movement — share scan',  p: 'SMB',   port: 445,  st: 'BLOCKED', sev: 'high' },
  { ev: 'WannaCry propagation attempt',        p: 'SMB',   port: 445,  st: 'BLOCKED', sev: 'high' },
  { ev: 'HTTP phishing portal accessed',       p: 'HTTP',  port: 80,   st: 'CONNECT', sev: 'med' },
  { ev: 'HTTP credential form submitted',      p: 'HTTP',  port: 80,   st: 'FAILED',  sev: 'high' },
  { ev: 'FTP anonymous login attempt',         p: 'FTP',   port: 21,   st: 'FAILED',  sev: 'low' },
  { ev: 'FTP malware file upload blocked',     p: 'FTP',   port: 21,   st: 'BLOCKED', sev: 'high' },
  { ev: 'MySQL root auth bypass attempt',      p: 'MySQL', port: 3306, st: 'FAILED',  sev: 'med' },
  { ev: 'MSSQL SA credential brute force',     p: 'MSSQL', port: 1433, st: 'FAILED',  sev: 'med' },
];

const IPS = ['192.168.1.42', '192.168.1.13', '192.168.1.71', '192.168.1.88', '10.0.0.15', '10.0.0.23'];
export const PROTOCOLS: Protocol[] = ['SSH', 'SMB', 'HTTP', 'FTP', 'MySQL', 'MSSQL'];

export const PROTO_COLORS: Record<Protocol, string> = {
  SSH:   'var(--cyan)',
  SMB:   'var(--red)',
  HTTP:  'var(--amber)',
  FTP:   'var(--purple)',
  MySQL: 'var(--green)',
  MSSQL: '#7FE4FF',
};

let uid = 0;

function pad(n: number) { return String(n).padStart(2, '0'); }
function fmt(d = new Date()) {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}
function rnd<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export function makeInitialState(): SimState {
  const logs: LogEntry[] = [];
  for (let i = 0; i < 10; i++) {
    const e = rnd(EVTS);
    logs.push({ id: uid++, ts: fmt(new Date(Date.now() - (10 - i) * 9000)), ip: rnd(IPS), ...e });
  }
  return {
    total: 247, critical: 12,
    ips: new Set(IPS),
    counts: { SSH: 108, SMB: 71, HTTP: 38, FTP: 18, MySQL: 8, MSSQL: 4 },
    timeline: Array(12).fill(0).map(() => Math.floor(Math.random() * 20) + 3),
    logs,
  };
}

export function tick(state: SimState): SimState {
  const e = rnd(EVTS);
  const ip = rnd(IPS);
  const entry: LogEntry = { id: uid++, ts: fmt(), ip, ...e };

  const logs = [entry, ...state.logs].slice(0, 60);
  const ips = new Set(state.ips);
  ips.add(ip);

  const counts = { ...state.counts, [e.p]: state.counts[e.p] + 1 };
  const total = state.total + 1;
  const critical = e.sev === 'high' ? state.critical + 1 : state.critical;

  const timeline = [...state.timeline];
  timeline[timeline.length - 1]++;
  if (total % 12 === 0) { timeline.shift(); timeline.push(0); }

  return { total, critical, ips, counts, timeline, logs };
}

export function makePayload(entry: LogEntry) {
  return {
    timestamp:   new Date().toISOString(),
    source_ip:   entry.ip,
    source_port: 40000 + Math.floor(Math.random() * 9999),
    dest_port:   entry.port,
    protocol:    entry.p,
    event:       entry.ev.toLowerCase().replace(/[ —–]+/g, '_').replace(/[^a-z0-9_]/g, ''),
    session_id:  Math.random().toString(16).substring(2, 10),
    honeypot:    'HONEYPOT-ALPHA-01',
    status:      entry.st.toLowerCase(),
    severity:    entry.sev,
  };
}
