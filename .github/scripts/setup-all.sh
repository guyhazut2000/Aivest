#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
"$SCRIPT_DIR/setup-github-labels.sh"
"$SCRIPT_DIR/setup-github-milestone.sh"
echo "Next: create Project board (see context/09-github-setup.md §4)"
