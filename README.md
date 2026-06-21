# Freedom App

Frontend-only SaaS demo application for the Freedom SDLC showcase.

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

## Suggested repo URL

`https://github.com/Built-Cryptic/freedom-app`

## Suggested live URL

`https://freedom-app.vercel.app`

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

The Vercel workflow expects these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
