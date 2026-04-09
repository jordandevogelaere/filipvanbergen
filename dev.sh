#!/bin/bash
# Start all services for local development
# Usage: ./dev.sh

cd "$(dirname "$0")"

# Install dependencies if needed
(cd blog-api && [ -d node_modules ] || npm install)
(cd admin && [ -d node_modules ] || npm install)
(cd fvbadvocaten && [ -d node_modules ] || npm install)

# Start all 3 services in parallel
trap 'kill 0' EXIT

(cd blog-api && npm run dev) &
(cd admin && npm run dev) &
(cd fvbadvocaten && BLOG_API_URL=http://localhost:8787 NEXT_PUBLIC_BLOG_API_URL=http://localhost:8787 npm run dev) &

wait
