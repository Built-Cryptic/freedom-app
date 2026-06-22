import { useState } from 'react'
import './App.css'

function App() {
  const metrics = [
    { label: 'Aircraft online', value: '18 / 24', note: '6 grounded for service rotation' },
    { label: 'Mission readiness', value: '87%', note: 'Last 12 operational hours' },
    { label: 'Airspace alerts', value: '03', note: '2 weather, 1 corridor restriction' },
  ]

  const missions = [
    {
      name: 'Sector Raven-12 perimeter sweep',
      owner: 'Recon Cell Alpha',
      status: 'Tracking',
      eta: '18 min',
      coverage: 'Thermal scan, route deviation monitoring',
    },
    {
      name: 'Bridgewatch convoy overwatch',
      owner: 'Flight Ops Bravo',
      status: 'Loiter',
      eta: '41 min',
      coverage: 'Convoy lane coverage, live video relay',
    },
    {
      name: 'Dustline relay drone replacement',
      owner: 'Maintenance Deck',
      status: 'Needs service',
      eta: 'Grounded',
      coverage: 'Battery swap, gimbal calibration, comms check',
    },
  ]

  const missionStatuses = ['All', 'Tracking', 'Loiter', 'Needs service'] as const
  const [statusFilter, setStatusFilter] = useState<(typeof missionStatuses)[number]>('All')

  const visibleMissions =
    statusFilter === 'All'
      ? missions
      : missions.filter((mission) => mission.status === statusFilter)

  const missionSummary = missionStatuses.slice(1).map((status) => ({
    label: status,
    count: missions.filter((mission) => mission.status === status).length,
  }))

  const tasks = [
    { title: 'Authorize Falcon-03 battery cycle', tag: 'Maintenance', state: 'Immediate' },
    { title: 'Confirm no-fly corridor update for Sector North', tag: 'Airspace', state: 'Queued' },
    { title: 'Review ISR packet from Raven-12', tag: 'Intel', state: 'Ready' },
    { title: 'Assign backup pilot to Bridgewatch mission', tag: 'Crew', state: 'In progress' },
  ]

  const activity = [
    'Telemetry spike detected on Falcon-03 rotor two and routed to maintenance.',
    'Bridgewatch convoy overwatch handed off from pilot Vega to pilot Mercer.',
    'Weather service raised dust advisory for eastern corridor through 22:40 Zulu.',
    'Night sortie bundle passed command validation and synced to active crews.',
  ]

  const readinessTracks = [
    { name: 'Launch package validation', progress: 100, owner: 'Command' },
    { name: 'Battery and payload rotation', progress: 76, owner: 'Ground Crew' },
    { name: 'Night corridor clearance', progress: 61, owner: 'Airspace Desk' },
  ]

  const missionRisks = [
    {
      title: 'Dustline relay replacement may miss launch window',
      severity: 'High',
      note: 'Comms relay bird is waiting on a final calibration pass before redeployment.',
    },
    {
      title: 'Eastern corridor weather could compress recovery timing',
      severity: 'Medium',
      note: 'Wind and dust advisories may force a staggered return-to-base sequence.',
    },
    {
      title: 'Bridgewatch reserve crew is still one operator short',
      severity: 'Low',
      note: 'Coverage is intact, but shift resilience is narrower than target.',
    },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="sidebar__eyebrow">Freedom Fleet</p>
          <h1>UAV Command Grid</h1>
        </div>
        <nav className="sidebar__nav" aria-label="Primary">
          <a href="#overview">Command view</a>
          <a href="#missions">Missions</a>
          <a href="#tasks">Operators</a>
          <a href="#activity">Telemetry</a>
          <a href="#readiness">Readiness</a>
        </nav>
        <div className="sidebar__foot">
          <span>Frontend-only drone fleet SaaS demo</span>
          <strong>React + Vite + TypeScript</strong>
        </div>
      </aside>

      <main className="dashboard">
        <section className="hero-panel" id="overview">
          <div>
            <p className="eyebrow">Command status</p>
            <h2>Live fleet posture, mission control, and operator readiness in one board.</h2>
            <p className="hero-panel__text">
              Freedom Fleet is a fictional UAV status and command center designed as the product
              surface for this SDLC showcase. It frames the repo history around mission operations,
              fleet visibility, operator workflows, and deployment discipline.
            </p>
          </div>
          <div className="hero-panel__meta">
            <span>Theater condition</span>
            <strong>Amber</strong>
          </div>
        </section>

        <section className="metrics">
          {metrics.map((metric) => (
            <article className="card metric-card" key={metric.label}>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
              <span>{metric.note}</span>
            </article>
          ))}
        </section>

        <section className="content-grid">
          <article className="card" id="missions">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Mission board</p>
                <h3>Active sorties</h3>
              </div>
              <span className="badge">Cycle 07</span>
            </div>
            <div className="workflow-summary" aria-label="Mission status summary">
              {missionSummary.map((item) => (
                <article className="summary-chip" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </article>
              ))}
            </div>
            <div className="filter-row" aria-label="Filter missions by status">
              {missionStatuses.map((status) => (
                <button
                  type="button"
                  key={status}
                  className={status === statusFilter ? 'filter-chip filter-chip--active' : 'filter-chip'}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="workflow-list">
              {visibleMissions.map((mission) => (
                <div className="workflow-row" key={mission.name}>
                  <div>
                    <h4>{mission.name}</h4>
                    <p>{mission.coverage}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Control</dt>
                      <dd>{mission.owner}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{mission.status}</dd>
                    </div>
                    <div>
                      <dt>Window</dt>
                      <dd>{mission.eta}</dd>
                    </div>
                  </dl>
                </div>
              ))}
              {visibleMissions.length === 0 ? (
                <div className="empty-state">
                  <h4>No sorties match this view</h4>
                  <p>Broaden the filter to restore the full operational picture.</p>
                </div>
              ) : null}
            </div>
          </article>

          <article className="card" id="tasks">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Operator queue</p>
                <h3>Immediate tasking</h3>
              </div>
              <span className="badge badge--soft">Current shift</span>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <div className="task-row" key={task.title}>
                  <div>
                    <h4>{task.title}</h4>
                    <p>{task.tag}</p>
                  </div>
                  <span className="status-pill">{task.state}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="content-grid content-grid--secondary">
          <article className="card" id="activity">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Telemetry log</p>
                <h3>Recent command events</h3>
              </div>
            </div>
            <ul className="activity-list">
              {activity.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="card release-card">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Mission gate</p>
                <h3>Launch checklist</h3>
              </div>
            </div>
            <div className="checklist">
              <label><input type="checkbox" checked readOnly /> Flight package reviewed</label>
              <label><input type="checkbox" checked readOnly /> Corridor restrictions synced</label>
              <label><input type="checkbox" checked readOnly /> Ground crew handoff confirmed</label>
              <label><input type="checkbox" readOnly /> Reserve pilot bench at target strength</label>
            </div>
          </article>
        </section>

        <section className="content-grid">
          <article className="card" id="readiness">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Fleet readiness</p>
                <h3>Launch track progress</h3>
              </div>
              <span className="badge">Night watch</span>
            </div>
            <div className="milestone-list">
              {readinessTracks.map((track) => (
                <div className="milestone-row" key={track.name}>
                  <div className="milestone-row__header">
                    <div>
                      <h4>{track.name}</h4>
                      <p>{track.owner}</p>
                    </div>
                    <strong>{track.progress}%</strong>
                  </div>
                  <div className="progress-bar" aria-label={`${track.name} progress ${track.progress}%`}>
                    <span style={{ width: `${track.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Watch list</p>
                <h3>Operational risks</h3>
              </div>
            </div>
            <div className="risk-list">
              {missionRisks.map((risk) => (
                <div className="risk-row" key={risk.title}>
                  <div className="risk-row__header">
                    <h4>{risk.title}</h4>
                    <span
                      className={
                        risk.severity === 'High'
                          ? 'status-pill status-pill--high'
                          : risk.severity === 'Medium'
                            ? 'status-pill status-pill--medium'
                            : 'status-pill status-pill--low'
                      }
                    >
                      {risk.severity}
                    </span>
                  </div>
                  <p>{risk.note}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
