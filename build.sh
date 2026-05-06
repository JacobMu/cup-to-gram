#!/usr/bin/env bash
set -euo pipefail

check_command() {
  if ! command -v "$1" &>/dev/null; then
    echo "Error: '$1' is not installed or not on PATH." >&2
    echo "  Install instructions: $2" >&2
    exit 1
  fi
}

check_command node  "https://nodejs.org"
check_command pnpm  "https://pnpm.io/installation"

echo "==> Installing dependencies"
pnpm install --frozen-lockfile

echo "==> Linting"
pnpm lint

echo "==> Running tests"
pnpm test --run

echo "==> Building Chrome (MV3)"
pnpm build

echo "==> Building Firefox (MV2)"
pnpm build:firefox

echo ""
echo "Build complete."
echo "  Chrome artifact : .output/chrome-mv3/"
echo "  Firefox artifact: .output/firefox-mv2/"
