#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required."
  exit 1
fi

gh issue create --title "feat: create app shell and navigation" --body "See docs/ISSUE-SEED.md"
gh issue create --title "feat: add dashboard metrics and workflow table" --body "See docs/ISSUE-SEED.md"
gh issue create --title "feat: add task board and activity feed" --body "See docs/ISSUE-SEED.md"
gh issue create --title "chore: add CI workflow and repository templates" --body "See docs/ISSUE-SEED.md"
gh issue create --title "chore: configure Vercel deployment workflow" --body "See docs/ISSUE-SEED.md"
