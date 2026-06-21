<div align="center">

<img src="public/assets/hive-logo.png" alt="HIVE logo" width="120" />

# HIVE — Landing Page

**Honeypot Intelligence & Visualization Environment**

A single-page marketing site for the HIVE graduation project, featuring an interactive,
browser-side **SIEM** (Security Information & Event Management) demo and an animated
diagram of the real three-node honeypot lab.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-~6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

</div>

---

## Overview

HIVE is a cybersecurity-themed, front-end-only landing page. It introduces the project and
demonstrates its capabilities through a **live SIEM dashboard** that streams simulated attack
events in real time — KPIs, charts, protocol filtering, and a JSON payload inspector — all
generated client-side. A companion **Architecture** section visualizes the physical lab the
demo represents: a Kali attacker, a Cowrie + Dionaea honeypot, and the SIEM monitor, wired
across VLANs through a managed switch.

> The SIEM stream is a self-contained simulation. The site makes no backend calls and stores
> no user data — it builds to a static bundle deployable to any static host.

## Features

- **Interactive SIEM demo** — live event stream with Slow / Normal / Fast speed controls and pause/resume.
- **Live KPIs** — total attacks, critical events, unique attackers, active protocols.
- **Charts** — rolling attack-timeline bar chart and a threat-severity donut.
- **Protocol filtering** — `ALL · SSH · SMB · HTTP · FTP · MySQL · MSSQL`.
- **Payload inspector** — click any log row to view its syntax-highlighted JSON.
- **Animated network topology** — SVG diagram with packets flowing across VLAN 10 / VLAN 20.
- **Scroll-reveal animations** and animated count-up statistics.
- **Self-hosted fonts** (Inter, Montserrat, JetBrains Mono) and design-token theming.

## Tech Stack

| Layer        | Choice                                         |
| ------------ | ---------------------------------------------- |
| Framework    | React 19 + TypeScript                          |
| Build tool   | Vite 8                                          |
| Styling      | CSS Modules + CSS custom properties (tokens)   |
| Linting      | ESLint (typescript-eslint, react-hooks)        |
| Data         | In-browser simulation engine (no backend)      |

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ and npm

### Install & run

```bash
# clone
git clone https://github.com/Hattabvic/hive-landing.git
cd hive-landing

# install dependencies
npm install

# start the dev server (http://localhost:5173)
npm run dev
```

### Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR           |
| `npm run build`   | Type-check and build the production bundle    |
| `npm run preview` | Preview the production build locally          |
| `npm run lint`    | Run ESLint over the project                   |

## Project Structure

```
hive-landing/
├── index.html                 # Vite entry
├── public/
│   ├── assets/                # logo, team photos, architecture.svg
│   └── fonts/                 # self-hosted Inter / Montserrat / JetBrains Mono
└── src/
    ├── main.tsx               # React root mount
    ├── App.tsx                # composes all sections in order
    ├── components/            # one folder per section (.tsx + .module.css)
    │   ├── Nav/  Hero/  Stats/  Products/
    │   ├── SiemDemo/          # the interactive SIEM dashboard
    │   ├── Mission/  Architecture/  Team/  CTA/  Footer/
    │   └── TweaksPanel/
    ├── hooks/
    │   ├── useScrollReveal.ts # reveal-on-scroll animation
    │   └── useCountUp.ts      # animated number counters
    ├── lib/
    │   ├── siemSimulation.ts  # SIEM data + tick engine
    │   └── hexCanvas.ts       # hex-grid background canvas
    └── styles/
        ├── tokens.css         # CSS variables (colors, spacing)
        ├── global.css         # base styles + helpers
        └── animations.css     # reveal keyframes
```

Sections render top-to-bottom in this fixed order:

```
Nav → Hero → Stats → Products → SiemDemo → Mission → Architecture → Team → CTA → Footer
```

## How the SIEM Demo Works

All data logic is isolated in `src/lib/siemSimulation.ts`; `SiemDemo.tsx` only renders state
and wires the controls.

```
makeInitialState()        seeds 247 attacks · 12 critical · 10 backfilled logs · 12-bucket timeline
   │
   ▼
setInterval(speed) ──► tick(state)
   │                      ├─ pick a random event template + source IP
   │                      ├─ prepend new log entry (list capped at 60)
   │                      ├─ counts[protocol]++ · total++ · critical++ if severity = high
   │                      ├─ add IP to the unique-attacker set
   │                      └─ push into the rolling timeline buffer
   ▼
setState ──► React re-render ──► KPIs · charts · event log · payload inspector
```

- **Speed**: Slow `2200 ms` · Normal `1000 ms` · Fast `320 ms` (Pause clears the interval).
- **Inspector**: selecting a row calls `makePayload(entry)` to build the full JSON event.

## Network Architecture (the lab the demo simulates)

| Node          | Hardware / Software                                       | Role                          |
| ------------- | -------------------------------------------------------- | ----------------------------- |
| 01 · Attacker | Kali Linux · Raspberry Pi 4 (`192.168.10.2`)            | Nmap · Hydra · Metasploit     |
| 02 · Honeypot | Raspbian · Raspberry Pi 4 (`192.168.20.2`)             | Cowrie + Dionaea → JSON logs  |
| 03 · Monitor  | React + TypeScript SIEM dashboard                       | Live threat visualization     |

Traffic is segmented by a **TP-Link SG2210P** managed switch using 802.1Q VLANs and port
mirroring — **VLAN 10** for the attack path, **VLAN 20** for the honeypot — with a direct log
feed to the SIEM monitor.

```
Kali (attack tools) ──VLAN10──► Switch ──VLAN20──► Honeypot (Cowrie/Dionaea)
                                                         │ logs → JSON
        HIVE SIEM dashboard ◄──────── log stream ────────┘
```

## Deployment

The build output (`dist/`) is fully static and can be hosted on Netlify, Vercel,
GitHub Pages, or any static-file host:

```bash
npm run build      # outputs to dist/
npm run preview    # verify locally before deploying
```

## Team

Built by the HIVE fourth-year graduation project team. See the **Team** section on the live
site for members and roles.

## License

This project was created for academic purposes as a fourth-year graduation project.
