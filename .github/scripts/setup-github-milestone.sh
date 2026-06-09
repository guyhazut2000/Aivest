#!/usr/bin/env bash
# Create v0.1 MVP milestone if missing. Requires gh.
set -euo pipefail

REPO="${REPO:-guyhazut2000/Aivest}"
TITLE="${TITLE:-v0.1 MVP}"
DESCRIPTION="${DESCRIPTION:-First SaaS milestone: shadcn, auth, database bootstrap}"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install gh: winget install GitHub.cli"
  exit 1
fi

if gh api "repos/$REPO/milestones" --jq ".[].title" | grep -qx "$TITLE"; then
  echo "Milestone already exists: $TITLE"
  gh api "repos/$REPO/milestones" --jq ".[] | select(.title==\"$TITLE\") | {number, title, html_url}"
else
  gh api "repos/$REPO/milestones" -f title="$TITLE" -f description="$DESCRIPTION" -f state=open
  echo "Created milestone: $TITLE"
fi
