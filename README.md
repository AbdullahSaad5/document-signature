# Document Signature

<!-- repo-hygiene: reposhuttle-standard -->

**JavaScript application for preparing and collecting document signatures.**

## Overview

JavaScript application for preparing and collecting document signatures.

This README records the repository's purpose, verified local workflow, major technology choices, and maintenance status so the project can be understood without first reverse-engineering the source tree.

## Highlights

- Component-based user interface built with React
- Fast local development and production bundling with Vite
- Repeatable local workflows defined in the package manifest

## Tech stack

JavaScript, Vite, React

## Quick start

```bash
git clone <repository-url>
cd <repository-directory>
npm install
npm run dev
```

Replace the placeholders with this repository's clone URL and local directory.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development workflow. |
| `npm run build` | Create a production build. |
| `npm run lint` | Run static-analysis and lint checks. |

## Configuration

No repository-specific configuration file is required for the basic workflow documented above.

## Project structure

```text
src/  # primary application source
public/  # static files served as-is
```

## Repository status

This repository is maintained as a project reference and portfolio artifact.

## Development

Before submitting a change, run `npm run lint`, `npm run build`.
Keep changes focused, avoid committing generated artifacts unless the project already tracks them, and update this README whenever setup or behavior changes.

## Security and configuration hygiene

Keep secrets in local environment variables or an ignored `.env` file. Never commit API keys, access tokens, private keys, production database URLs, or customer data. If a credential is committed, revoke and rotate it; deleting the file in a later commit does not remove it from Git history.

## Contributing

Open an issue or provide context before making a large change. Prefer small pull requests with a clear purpose, verification notes, and screenshots for visible UI changes.

## Additional project notes

Create a folder in public called "webviewer" and paste "core" and "ui" folders from @pdftron/webviewer node_modules folder.

## License

No license file is currently included. Unless the repository owner states otherwise, the source is not offered under an open-source license.
