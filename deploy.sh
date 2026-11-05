#!/usr/bin/env bash
# Build into docs/ and publish to main. GitHub Pages serves main:/docs.
set -euo pipefail
cd "$(dirname "$0")"

bun run build
touch docs/.nojekyll

git add docs
if git diff --cached --quiet; then
  echo "Nothing to deploy — site is already up to date."
else
  git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push -q origin "$(git branch --show-current)"
  echo "Deployed to https://hamzahasann.github.io/"
fi
