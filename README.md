# Built with Venice

Community showcase of tools, SDKs, content, and builders in the Venice AI ecosystem.

Live at: https://venice-labs-production.up.railway.app

## What's here

A single tabbed Explore section covers four content types:

- **Projects** — Websites, GitHub repos, X accounts, and community tokens built by or for the Venice ecosystem. Filterable by type, tag, and free-text search. Each project can link multiple socials (X, Farcaster, Instagram, Telegram, Discord, YouTube, GitHub, website).
- **Cookbooks** — Community-written recipes for building on Venice, filterable by difficulty.
- **Events** — Upcoming and past hackathons, meetups, workshops, and conferences.
- **Watch** — Videos, interviews, and recaps about Venice and the projects built on it. (Internal data file: `src/data/demos.ts`.)

Projects are categorized as either **Ecosystem** (tools built for the Venice community) or **Powered by Venice** (apps that use the Venice API).

## Submit something

**Easiest:** Click "Submit your work" on the [live site](https://builtwithvenice.ai) — fill the form, and we'll redirect you to a prefilled GitHub issue you can review and submit. Maintainers add it from there.

You can also [pick a submission form](https://github.com/nikshepsvn/builtwithvenice/issues/new/choose) directly on GitHub — projects, cookbooks, events, and videos (demos) each have their own template.

**Via pull request:** fork, add your entry to the relevant file under `src/data/`, open a PR. See [CONTRIBUTING.md](./CONTRIBUTING.md).

**Via AI agent:** copy the prompt from the hero on the live site — it points your agent at [`/agent-skill.md`](./public/agent-skill.md), which walks it through the schema, validation, and PR flow.

### Quality bar

Projects must be publicly accessible and offer something beyond the base Venice platform, or be a community asset (X account, community token, cookbook, event) that complements it. Bare API wrappers and marketing-only submissions are declined.

## Development

Private `@veniceai/*` packages are hosted on GitHub Packages. Before installing:

1. Create a [classic PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with the `read:packages` scope.
2. Export it in your shell (or add it to your `.envrc` / shell rc file):

   ```bash
   export VENICE_PACKAGE_REGISTRY_READ="<YOUR_PERSONAL_ACCESS_TOKEN>"
   ```

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

The token is read from the shell environment by `.npmrc` at install time — it is not loaded from `.env`.

## Build & Deploy

```bash
npm run build
railway up
```

## For maintainers

An agent-readable triage skill lives at [`/admin-skill.md`](./public/admin-skill.md). Point Claude Code (or any agent with `gh` access) at it to review open issues and PRs — it proposes actions and drafts replies, and waits for confirmation before running any `gh` command.

## Stack

React 19 / TypeScript / Vite / Pure CSS (DM Sans + DM Mono) / Railway

## Disclaimer

Listing does not imply endorsement by Venice AI, Inc.
