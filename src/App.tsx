import { useState } from 'react'
import './App.css'

function App() {
  const metrics = [
    { label: 'Aircraft online', value: '18 / 24', note: '6 in maintenance or battery rotation' },
    { label: 'Mission readiness', value: '87%', note: 'Across current active wings' },
    { label: 'Airspace conflicts', value: '03', note: '2 weather, 1 temporary corridor closure' },
    { label: 'Telemetry stability', value: '99.2%', note: 'Across the last 12 operational hours' },
  ]

  const missions = [
    {
      name: 'Sector Raven-12 perimeter sweep',
      control: 'Recon Cell Alpha',
      status: 'Tracking',
      window: '18 min',
      craft: 'Raven-12',
      coverage: 'Thermal perimeter scan with route deviation watch.',
    },
    {
      name: 'Bridgewatch convoy overwatch',
      control: 'Flight Ops Bravo',
      status: 'Loiter',
      window: '41 min',
      craft: 'Falcon-07',
      coverage: 'Live convoy lane coverage and video relay.',
    },
    {
      name: 'Dustline relay replacement',
      control: 'Maintenance Deck',
      status: 'Needs service',
      window: 'Grounded',
      craft: 'Relay-03',
      coverage: 'Battery swap, gimbal calibration, comms validation.',
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

  const alerts = [
    { code: 'WX-18', title: 'Dust advisory', level: 'Elevated', note: 'Eastern corridor gusts rising through 22:40 Zulu.' },
    { code: 'MX-04', title: 'Rotor anomaly', level: 'Critical', note: 'Falcon-03 telemetry spike routed to maintenance deck.' },
    { code: 'OP-11', title: 'Reserve crew gap', level: 'Monitor', note: 'Bridgewatch backup bench is one pilot under target.' },
  ]

  const tasks = [
    { title: 'Authorize Falcon-03 battery cycle', tag: 'Maintenance', state: 'Immediate' },
    { title: 'Confirm no-fly corridor update for Sector North', tag: 'Airspace', state: 'Queued' },
    { title: 'Review ISR packet from Raven-12', tag: 'Intel', state: 'Ready' },
    { title: 'Assign backup pilot to Bridgewatch mission', tag: 'Crew', state: 'In progress' },
  ]

  const telemetry = [
    '23:18Z  Raven-12 completed north fence sweep and resumed thermal pass.',
    '23:11Z  Bridgewatch convoy handed video lead from Vega to Mercer.',
    '23:04Z  Dustline relay replacement moved from diagnostics to calibration.',
    '22:56Z  Command validation cleared night sortie bundle for launch lane B.',
  ]

  const fleet = [
    { craft: 'Raven-12', condition: 'Nominal', battery: '74%', uplink: 'Strong' },
    { craft: 'Falcon-07', condition: 'On station', battery: '59%', uplink: 'Strong' },
    { craft: 'Relay-03', condition: 'Maintenance', battery: 'Offline', uplink: 'Bench' },
    { craft: 'Specter-02', condition: 'Standby', battery: '92%', uplink: 'Strong' },
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
      note: 'Relay bird is waiting on final calibration before redeployment.',
    },
    {
      title: 'Eastern corridor weather may compress recovery timing',
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
      <header className="topbar">
        <div className="topbar__brand">
          <div className="topbar__logo">FF</div>
          <div>
            <p className="topbar__eyebrow">Freedom Fleet</p>
            <h1>Command Dashboard</h1>
          </div>
        </div>

        <nav className="topbar__nav" aria-label="Primary">
          <a href="#overview">Overview</a>
          <a href="#missions">Missions</a>
          <a href="#operators">Operators</a>
          <a href="#readiness">Readiness</a>
          <a href="#telemetry">Telemetry</a>
        </nav>

        <div className="topbar__status">
          <div className="status-chip status-chip--live">Command online</div>
          <div className="status-chip">23:41 Zulu</div>
          <div className="user-chip">Ops Chief Vega</div>
        </div>
      </header>

      <main className="dashboard">
        <section className="overview-panel" id="overview">
          <div className="overview-panel__copy">
            <p className="eyebrow">Theater condition</p>
            <h2>Axis-style industrial identity, DayNight-style control surface.</h2>
            <p className="overview-panel__text">
              Freedom Fleet is a fictional UAV fleet command product. This build keeps the dense,
              usable dashboard backbone of an admin interface while shifting the visual language into
              a harder operations-console system.
            </p>
          </div>

          <div className="overview-panel__meta">
            <article>
              <span>Condition</span>
              <strong>Amber</strong>
            </article>
            <article>
              <span>Mission cycle</span>
              <strong>07</strong>
            </article>
            <article>
              <span>Launch lane</span>
              <strong>B-2</strong>
            </article>
          </div>
        </section>

        <section className="metrics-grid">
          {metrics.map((metric) => (
            <article className="metric-card" key={metric.label}>
              <span className="metric-card__label">{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.note}</p>
            </article>
          ))}
        </section>

        <section className="main-grid">
          <div className="main-grid__primary">
            <article className="panel" id="missions">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Mission board</p>
                  <h3>Active sorties</h3>
                </div>
                <span className="panel__badge">Tracking layer</span>
              </div>

              <div className="summary-row" aria-label="Mission status summary">
                {missionSummary.map((item) => (
                  <article className="summary-card" key={item.label}>
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

              <div className="mission-list">
                {visibleMissions.map((mission) => (
                  <article className="mission-row" key={mission.name}>
                    <div className="mission-row__main">
                      <div className="mission-row__title">
                        <h4>{mission.name}</h4>
                        <span>{mission.craft}</span>
                      </div>
                      <p>{mission.coverage}</p>
                    </div>
                    <dl className="mission-row__stats">
                      <div>
                        <dt>Control</dt>
                        <dd>{mission.control}</dd>
                      </div>
                      <div>
                        <dt>Status</dt>
                        <dd>{mission.status}</dd>
                      </div>
                      <div>
                        <dt>Window</dt>
                        <dd>{mission.window}</dd>
                      </div>
                    </dl>
                  </article>
                ))}

                {visibleMissions.length === 0 ? (
                  <div className="empty-state">
                    <h4>No sorties match this view</h4>
                    <p>Broaden the filter to restore the full operational picture.</p>
                  </div>
                ) : null}
              </div>
            </article>

            <div className="split-grid">
              <article className="panel" id="operators">
                <div className="panel__header">
                  <div>
                    <p className="eyebrow">Operator queue</p>
                    <h3>Immediate tasking</h3>
                  </div>
                  <span className="panel__badge panel__badge--soft">Current shift</span>
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

              <article className="panel" id="telemetry">
                <div className="panel__header">
                  <div>
                    <p className="eyebrow">Telemetry</p>
                    <h3>Command log</h3>
                  </div>
                </div>

                <ul className="telemetry-list">
                  {telemetry.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </article>
            </div>

            <div className="split-grid">
              <article className="panel" id="readiness">
                <div className="panel__header">
                  <div>
                    <p className="eyebrow">Fleet readiness</p>
                    <h3>Launch track progress</h3>
                  </div>
                  <span className="panel__badge">Night watch</span>
                </div>

                <div className="readiness-list">
                  {readinessTracks.map((track) => (
                    <div className="readiness-row" key={track.name}>
                      <div className="readiness-row__header">
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

              <article className="panel">
                <div className="panel__header">
                  <div>
                    <p className="eyebrow">Operational risks</p>
                    <h3>Watch list</h3>
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
            </div>
          </div>

          <aside className="main-grid__aside">
            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Alert stack</p>
                  <h3>Priority events</h3>
                </div>
              </div>

              <div className="alert-list">
                {alerts.map((alert) => (
                  <div className="alert-card" key={alert.code}>
                    <div className="alert-card__header">
                      <span>{alert.code}</span>
                      <strong>{alert.level}</strong>
                    </div>
                    <h4>{alert.title}</h4>
                    <p>{alert.note}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
                <div>
                  <p className="eyebrow">Fleet board</p>
                  <h3>Craft status</h3>
                </div>
              </div>

              <div className="fleet-list">
                {fleet.map((entry) => (
                  <div className="fleet-row" key={entry.craft}>
                    <div>
                      <h4>{entry.craft}</h4>
                      <p>{entry.condition}</p>
                    </div>
                    <div className="fleet-row__meta">
                      <span>{entry.battery}</span>
                      <span>{entry.uplink}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel">
              <div className="panel__header">
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
          </aside>
        </section>
      </main>
    </div>
  )
}

export default App
