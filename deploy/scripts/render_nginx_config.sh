#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_PATH="${1:?template path required}"
OUTPUT_PATH="${2:?output path required}"

: "${UPSTREAM_NAME:?UPSTREAM_NAME is required}"
: "${SERVER_NAME:?SERVER_NAME is required}"
: "${CERT_DOMAIN:?CERT_DOMAIN is required}"

awk -v up="${UPSTREAM_NAME}" -v sn="${SERVER_NAME}" -v cert="${CERT_DOMAIN}" '{
  gsub(/\$\{UPSTREAM_NAME\}/, up);
  gsub(/\$\{SERVER_NAME\}/, sn);
  gsub(/\$\{CERT_DOMAIN\}/, cert);
  print;
}' "$TEMPLATE_PATH" > "$OUTPUT_PATH"
