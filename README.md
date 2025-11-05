# Eurorack Documentation Site

This repository contains the Antora playbook and configuration for building the unified documentation site for all Eurorack DIY modules.

## Live Site

The documentation is published at: https://carr-james.github.io/eurorack-docs

## Structure

- `antora-playbook.yml` - Main playbook that references all component repositories
- `supplemental-ui/` - Shared UI customizations (Fancybox, custom scripts, etc.)
- `.github/workflows/` - CI/CD workflow for building and deploying the site

## Component Repositories

This site aggregates documentation from:

- [cem3340-vco](https://github.com/carr-james/cem3340-vco) - CEM3340 VCO Module
- More modules to be added...

## Local Development

### Prerequisites

- Node.js 18+ and npm
- Docker (optional, for matching CI environment)

### Building Locally

```bash
# Install dependencies
npm install

# Build the site
npm run build:fetch

# Serve locally
npm run serve
```

Then open http://localhost:8000/eurorack-docs/stable/

### Docker Build

For an environment that matches CI exactly:

```bash
docker run --rm \
  -v "$(pwd):/work" \
  -w /work \
  ghcr.io/inti-cmnb/kicad_auto:dev_k9 \
  bash -c "npm ci && npx antora --fetch antora-playbook.yml"
```

## Adding New Modules

To add a new module to the documentation site:

1. Ensure the module repository has a `docs/antora.yml` component descriptor
2. Add the repository to the `content.sources` section in `antora-playbook.yml`
3. Commit and push - the site will automatically rebuild

## Features

- **Unified Documentation** - All modules in one searchable site
- **Version Support** - Documentation for multiple versions/branches
- **KiBot Integration** - Schematics, BOMs, and PCB renders generated automatically
- **Fancybox Lightbox** - Expandable schematics with zoom and transformation tools
- **Cross-References** - Link between modules seamlessly

## License

MIT
