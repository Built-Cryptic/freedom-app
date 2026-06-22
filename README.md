# Freedom Fleet App

Frontend-only UAV fleet command dashboard for the Freedom Fleet SDLC showcase.

Showcase site: `https://built-cryptic.github.io/freedom-showcase/`

## Stack

- React
- Vite
- TypeScript
- GitHub Actions
- Vercel deployment workflow

## Purpose

This repo acts as the feature-delivery target for a professional SDLC demonstration. It is intentionally
frontend-only so the public GitHub history can focus on:

- backlog planning
- issue quality
- branch strategy
- pull request hygiene
- CI validation
- cloud deployment automation

The product concept is a fictional command-center SaaS for monitoring aircraft status, mission readiness,
operator tasking, telemetry, and operational risk across a drone and UAV fleet.

## Repository URL

`https://github.com/Built-Cryptic/freedom-app`

## Live URL

`https://freedom-app-bay.vercel.app`

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## SDLC contents

- `.github/ISSUE_TEMPLATE/`
- `.github/pull_request_template.md`
- `.github/workflows/ci.yml`
- `.github/workflows/vercel-deploy.yml`
- `docs/ROADMAP.md`
- `docs/ISSUE-SEED.md`
- `scripts/create-demo-issues.sh`

## Deployment notes

The production deployment path is wired through GitHub Actions and Vercel. The repo expects these GitHub
repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
