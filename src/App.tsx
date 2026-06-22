import { useState } from 'react'
import './App.css'

function App() {
  const metrics = [
    { label: 'Open workflows', value: '08', note: '4 active this sprint' },
    { label: 'On-time delivery', value: '96%', note: 'Past 30 days' },
    { label: 'Deployment health', value: 'Green', note: 'CI checks passing' },
  ]

  const workflows = [
    {
      name: 'Store Launch Preparation',
      owner: 'Platform Team',
      status: 'In review',
      eta: '2 days',
      coverage: 'Checklist, assets, approvals',
    },
    {
      name: 'Customer Rollout Sequence',
      owner: 'Operations',
      status: 'On track',
      eta: '5 days',
      coverage: 'Training, QA, release notes',
    },
    {
      name: 'Automation Upgrade Plan',
      owner: 'Engineering',
      status: 'Needs input',
      eta: 'Blocked',
      coverage: 'Rules engine migration',
    },
  ]

  const workflowStatuses = ['All', 'In review', 'On track', 'Needs input'] as const
  const [statusFilter, setStatusFilter] = useState<(typeof workflowStatuses)[number]>('All')

  const visibleWorkflows =
    statusFilter === 'All'
      ? workflows
      : workflows.filter((workflow) => workflow.status === statusFilter)

  const workflowSummary = workflowStatuses.slice(1).map((status) => ({
    label: status,
    count: workflows.filter((workflow) => workflow.status === status).length,
  }))

  const tasks = [
    { title: 'Approve release checklist', tag: 'Release', state: 'Ready' },
    { title: 'Validate dashboard edge cases', tag: 'QA', state: 'In progress' },
    { title: 'Refresh role permissions copy', tag: 'UX', state: 'Queued' },
    { title: 'Stage production announcement', tag: 'Comms', state: 'Ready' },
  ]

  const activity = [
    'PR #14 merged into main and triggered a production deployment.',
    'New issue added for audit logging acceptance criteria.',
    'Feature branch feature/settings-preferences opened for the next cycle.',
    'CI completed lint and build validation in 54 seconds.',
  ]

  const milestones = [
    { name: 'Content review', progress: 100, owner: 'Product' },
    { name: 'Edge-case QA sweep', progress: 72, owner: 'QA' },
    { name: 'Operations sign-off', progress: 58, owner: 'Operations' },
  ]

  const releaseRisks = [
    {
      title: 'Automation upgrade plan needs stakeholder approval',
      severity: 'High',
      note: 'Rules-engine migration is still waiting on final review.',
    },
    {
      title: 'Dashboard edge-case validation is still in progress',
      severity: 'Medium',
      note: 'QA has one browser pass and one accessibility pass remaining.',
    },
    {
      title: 'Production announcement copy needs final scheduling',
      severity: 'Low',
      note: 'Comms draft is approved, but publish timing is not locked.',
    },
  ]

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="sidebar__eyebrow">Freedom Ops</p>
          <h1>Operations Command</h1>
        </div>
        <nav className="sidebar__nav" aria-label="Primary">
          <a href="#overview">Overview</a>
          <a href="#workflows">Workflows</a>
          <a href="#tasks">Tasks</a>
          <a href="#activity">Activity</a>
        </nav>
        <div className="sidebar__foot">
          <span>Frontend-only SaaS demo</span>
          <strong>React + Vite + TypeScript</strong>
        </div>
      </aside>

      <main className="dashboard">
        <section className="hero-panel" id="overview">
          <div>
            <p className="eyebrow">Quarterly Delivery</p>
            <h2>Built to demonstrate product thinking, workflow clarity, and release readiness.</h2>
            <p className="hero-panel__text">
              Freedom Ops is the delivery target for the SDLC showcase. The app is intentionally
              scoped to a frontend product surface so the repo can focus on planning, implementation
              hygiene, CI checks, and cloud deployment.
            </p>
          </div>
          <div className="hero-panel__meta">
            <span>Release candidate</span>
            <strong>v0.1.0</strong>
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
          <article className="card" id="workflows">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Pipeline view</p>
                <h3>Active workflows</h3>
              </div>
              <span className="badge">Sprint 04</span>
            </div>
            <div className="workflow-summary" aria-label="Workflow status summary">
              {workflowSummary.map((item) => (
                <article className="summary-chip" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.count}</strong>
                </article>
              ))}
            </div>
            <div className="filter-row" aria-label="Filter workflows by status">
              {workflowStatuses.map((status) => (
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
              {visibleWorkflows.map((workflow) => (
                <div className="workflow-row" key={workflow.name}>
                  <div>
                    <h4>{workflow.name}</h4>
                    <p>{workflow.coverage}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Owner</dt>
                      <dd>{workflow.owner}</dd>
                    </div>
                    <div>
                      <dt>Status</dt>
                      <dd>{workflow.status}</dd>
                    </div>
                    <div>
                      <dt>ETA</dt>
                      <dd>{workflow.eta}</dd>
                    </div>
                  </dl>
                </div>
              ))}
              {visibleWorkflows.length === 0 ? (
                <div className="empty-state">
                  <h4>No workflows match this filter</h4>
                  <p>Try a broader status view to review the full delivery pipeline.</p>
                </div>
              ) : null}
            </div>
          </article>

          <article className="card" id="tasks">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Execution board</p>
                <h3>Priority tasks</h3>
              </div>
              <span className="badge badge--soft">This week</span>
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
                <p className="eyebrow">Engineering pulse</p>
                <h3>Recent activity</h3>
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
                <p className="eyebrow">Release gating</p>
                <h3>Launch checklist</h3>
              </div>
            </div>
            <div className="checklist">
              <label><input type="checkbox" checked readOnly /> Product copy reviewed</label>
              <label><input type="checkbox" checked readOnly /> CI validation passing</label>
              <label><input type="checkbox" checked readOnly /> Deploy pipeline configured</label>
              <label><input type="checkbox" readOnly /> GitHub issues and PRs published</label>
            </div>
          </article>
        </section>

        <section className="content-grid">
          <article className="card" id="readiness">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Launch readiness</p>
                <h3>Milestone progress</h3>
              </div>
              <span className="badge">Release week</span>
            </div>
            <div className="milestone-list">
              {milestones.map((milestone) => (
                <div className="milestone-row" key={milestone.name}>
                  <div className="milestone-row__header">
                    <div>
                      <h4>{milestone.name}</h4>
                      <p>{milestone.owner}</p>
                    </div>
                    <strong>{milestone.progress}%</strong>
                  </div>
                  <div
                    className="progress-bar"
                    aria-label={`${milestone.name} progress ${milestone.progress}%`}
                  >
                    <span style={{ width: `${milestone.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card">
            <div className="card__heading">
              <div>
                <p className="eyebrow">Risk register</p>
                <h3>Release blockers and watch items</h3>
              </div>
            </div>
            <div className="risk-list">
              {releaseRisks.map((risk) => (
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
