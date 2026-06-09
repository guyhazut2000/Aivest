#!/usr/bin/env bash
# Idempotent label setup for guyhazut2000/Aivest (or override REPO).
# Requires: gh auth login
set -euo pipefail

REPO="${REPO:-guyhazut2000/Aivest}"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is required. Install: winget install GitHub.cli"
  exit 1
fi

gh auth status >/dev/null

create_label() {
  local name="$1"
  local color="$2"
  local description="$3"
  if gh label list --repo "$REPO" --json name --jq ".[].name" | grep -qx "$name"; then
    echo "exists: $name"
  else
    gh label create "$name" --repo "$REPO" --color "$color" --description "$description" --force
    echo "created: $name"
  fi
}

# type:*
create_label "type:feature" "1D76DB" "New product capability"
create_label "type:bug" "D73A4A" "Defect or regression"
create_label "type:chore" "FBCA04" "Tooling, deps, docs, CI"
create_label "type:spike" "C5DEF5" "Research or proof of concept"

# priority:*
create_label "priority:high" "B60205" "Do next"
create_label "priority:low" "0E8A16" "Backlog"

# area:*
create_label "area:auth" "5319E7" "Clerk / OAuth"
create_label "area:db" "006B75" "Prisma / Neon"
create_label "area:ui" "E99695" "shadcn / Tailwind / charts"

# workflow
create_label "agent" "EDEDED" "Created or driven by an agent"
create_label "blocked" "000000" "Waiting on human input"

echo "Done. Labels for $REPO"
