# Built in Venice

Community showcase of tools, SDKs, content, and builders in the Venice AI ecosystem.

Live at: https://builtinvenice.ai

## What's here

A single tabbed Explore section covers four content types:

- **Projects** — Websites, GitHub repos, X accounts, and community tokens built by or for the Venice ecosystem. Filterable by type, tag, and free-text search. Each project can link multiple socials (X, Farcaster, Instagram, Telegram, Discord, YouTube, GitHub, website).
- **Cookbooks** — Community-written recipes for building on Venice, filterable by difficulty.
- **Events** — Upcoming and past hackathons, meetups, workshops, and conferences.
- **Watch** — Videos, interviews, and recaps about Venice and the projects built on it.

Projects are categorized as either **Ecosystem** (tools built for the Venice community) or **Powered by Venice** (apps that use the Venice API).

## Submit something

You don't need to clone the repo or run anything locally to submit — every option below works from the browser or by editing a single file.

**Easiest:** Click "Submit your work" on the [live site](https://builtinvenice.ai) — fill the form, and we'll redirect you to a prefilled GitHub issue you can review and submit. Maintainers add it from there.

<!-- Media submissions temporarily hidden — "and media" / "or `media.ts`" removed from the two lines below. -->
You can also [pick a submission form](https://github.com/veniceai/builtinvenice/issues/new/choose) directly on GitHub — projects, cookbooks, and events each have their own template.

**Via pull request:** fork, add your entry to the relevant file under `src/data/` (`projects.ts`, `cookbooks.ts`, or `events.ts`), and open a PR. You can do this entirely in the GitHub web editor — no local checkout, no dev server, no token setup. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the per-type schema.

**Via AI agent:** copy the prompt from the hero on the live site — it points your agent at [`/agent-skill.md`](./public/agent-skill.md), which walks it through the schema, validation, and PR flow.

### Submission guidelines

A good submission is:

- **Clearly connected to Venice** — uses, integrates with, teaches, or supports the Venice ecosystem. A general tool that Venice users could also use but has no specific Venice focus (e.g. Google Docs) doesn't qualify.
- **Publicly accessible** — include a working link (live demo, repo, package, docs, video, or event page).
- **Useful or interesting** — real builder value, creative use cases, helpful integrations, or strong ecosystem signal.
- **Easy to understand** — clear title, short description, relevant tags, and any setup instructions.
- **Accurate** — no unsupported claims about privacy, compliance, security, performance, or Venice endorsement.
- **Token-secondary** — token-related projects are welcome when there's a real product, protocol, or resource behind them.
- **Safe for users** — wallet, payment, extension, or automation submissions must explain permissions and data handling.

Full guidelines: [builtinvenice.ai/submission-guidelines](https://builtinvenice.ai/submission-guidelines). All submissions are reviewed before publishing; listing does not imply endorsement by Venice AI.

## Local development

> Only needed if you're modifying the site itself (styling, components, layout). Adding or updating a listing does **not** require any of this — edit the relevant file under `src/data/` in the GitHub web editor and open a PR.

Private `@veniceai/*` packages are hosted on GitHub Packages. Before installing:

1. Create a [classic PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) with the `read:packages` scope.
2. Export it in your shell (or add it to your `.envrc` / shell rc file):

   ```bash
   export VENICE_PACKAGE_REGISTRY_READ="<YOUR_PERSONAL_ACCESS_TOKEN>"
   ```

   The token is read from the shell environment by `.npmrc` at install time — it is not loaded from `.env`.

3. (Optional) Copy `.env.example` to `.env` and add a free [ImgBB](https://api.imgbb.com) API key as `VITE_IMGBB_KEY` if you want to exercise the submit-dialog thumbnail upload locally. The rest of the site works without it.

4. Install and run:

   ```bash
   npm install
   npm run dev
   ```

## Deploy

The site is hosted on Cloudflare Pages and deploys automatically from `main`. Build command is `npm run build`; output directory is `dist`. The `VENICE_PACKAGE_REGISTRY_READ` token must be set as a Pages environment variable so `@veniceai/*` packages install at build time.

## Stack

React 19 / TypeScript / Vite / Pure CSS (DM Sans + DM Mono) / Cloudflare Pages

## License

MIT — see [LICENSE](./LICENSE). Listing content (project descriptions, links, logos) remains the property of the respective submitters.

## Disclaimer

Listing does not imply endorsement by Venice AI, Inc.
