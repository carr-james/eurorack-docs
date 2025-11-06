#!/bin/bash

# Docker-based local Antora documentation preview script
# Matches the production build environment exactly
# Run from eurorack-docs directory: ./build-docs.sh

set -e

echo "=================================="
echo "Building Eurorack Documentation Site (Docker)"
echo "=================================="

# Check if we're in the eurorack-docs directory
if [ ! -f "antora-playbook.yml" ]; then
    echo "ERROR: antora-playbook.yml not found. Run this script from the eurorack-docs directory."
    exit 1
fi

echo "Pulling Docker container..."
docker pull ghcr.io/carr-james/eurorack-docker:latest

echo ""
echo "Building site in Docker container..."
docker run --rm \
    -v "$(pwd):/work" \
    -w /work \
    -e LOCAL_USER_ID="$(id -u)" \
    -e LOCAL_GROUP_ID="$(id -g)" \
    ghcr.io/carr-james/eurorack-docker:latest \
    bash -c "
        set -e

        echo 'Installing Antora dependencies...'
        if [ ! -d node_modules ]; then
            npm install --no-package-lock
        else
            echo 'Antora dependencies already installed.'
        fi

        echo 'Building Antora site...'
        if npx antora --fetch antora-playbook.yml; then
            echo 'Antora build completed successfully'
        else
            echo 'ERROR: Antora build failed'
            exit 1
        fi

        echo 'Fixing file ownership...'
        chown -R \$LOCAL_USER_ID:\$LOCAL_GROUP_ID /work/build /work/node_modules /work/.cache 2>/dev/null || true
    "

# Check if build succeeded
if [ -d "build/site" ]; then
    echo ""
    echo "=================================="
    echo "✓ Build successful!"
    echo "=================================="
    echo ""
    echo "To view the documentation:"
    echo "  cd build/site && python3 -m http.server 8000"
    echo "  Then open: http://localhost:8000/eurorack-docs/stable/"
    echo ""
else
    echo ""
    echo "=================================="
    echo "✗ Build failed!"
    echo "=================================="
    exit 1
fi
