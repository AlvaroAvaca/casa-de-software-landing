#!/bin/sh
# Publish sitio/ into the gh-pages branch, either at the root (production) or under a subfolder (PR preview).
# Usage: publicar-pages.sh <subfolder-or-empty> [remove]
# Uses only the repository's own token (set by the workflow). No secrets, no paid services.
set -eu
SUB="${1:-}"
MODE="${2:-publish}"
REPO_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
WORK="$(mktemp -d)"
if git ls-remote --exit-code --heads "$REPO_URL" gh-pages >/dev/null 2>&1; then
  git clone -q --depth 1 --branch gh-pages "$REPO_URL" "$WORK/pages"
else
  mkdir -p "$WORK/pages"
  git -C "$WORK/pages" init -q -b gh-pages
  git -C "$WORK/pages" remote add origin "$REPO_URL"
fi
cd "$WORK/pages"
git config user.name "casa-de-software"
git config user.email "casa@ejemplo.cl"
DEST="."
[ -n "$SUB" ] && DEST="$SUB"
if [ "$MODE" = "remove" ]; then
  rm -rf "$DEST"
else
  if [ "$DEST" = "." ]; then
    # Production: replace everything except the previews folder.
    find . -mindepth 1 -maxdepth 1 ! -name .git ! -name pr-preview -exec rm -rf {} +
  else
    rm -rf "$DEST"; mkdir -p "$DEST"
  fi
  cp -R "$GITHUB_WORKSPACE/sitio/." "$DEST/"
  touch .nojekyll
fi
git add -A
if git diff --cached --quiet; then echo "Sin cambios que publicar."; exit 0; fi
git commit -q -m "publish: ${SUB:-produccion} from ${GITHUB_SHA:-local}"
git push -q origin gh-pages
echo "Verificado: publicado en gh-pages (${SUB:-raíz})."
