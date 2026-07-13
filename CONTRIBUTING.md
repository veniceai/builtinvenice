# Contributing to Built in Venice

A community-curated showcase of projects, tools, and content built on the Venice AI ecosystem.

Maintained by the Venice DevRel team — **Sabrina Aquino** and **Josh Meyer**.

## How to submit

### Option 1 — Form (easiest)

Pick the form that matches what you're submitting:

- [**Project**](https://github.com/veniceai/builtinvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+) — website, GitHub repo, X account, or community token.
- [**Cookbook / Recipe**](https://github.com/veniceai/builtinvenice/issues/new?template=submit-cookbook.yml&title=%5BCookbook%5D+)
- [**Event**](https://github.com/veniceai/builtinvenice/issues/new?template=submit-event.yml&title=%5BEvent%5D+) — hackathon, meetup, workshop, or conference.
<!-- Media submissions temporarily hidden — restore this bullet to re-enable:
- [**Media**](https://github.com/veniceai/builtinvenice/issues/new?template=submit-media.yml&title=%5BMedia%5D+) — video, interview, recap, or post about Venice or something built on it.
-->

Or [browse all submission forms](https://github.com/veniceai/builtinvenice/issues/new/choose).

### Option 2 — Pull request

1. Fork this repo.
2. Add your entry as a new file matching what you're submitting (one new file per submission — don't edit `src/` or other files):
   - Projects (website / repo / X account / token) → `content/projects/<slug>.yaml`
   - Cookbook recipes → `content/cookbooks/<slug>.yaml`
   - Events / hackathons → `content/events/<slug>.yaml`
   <!-- Media submissions temporarily hidden — restore this bullet to re-enable:
   - Media → `content/media/<slug>.yaml`
   -->
3. Open a pull request with one entry per PR.
4. Sabrina or Josh reviews and merges.

### Option 3 — AI agent

Copy the "paste this into your AI agent" prompt from the hero on the live site, or just point your agent at [`public/agent-skill.md`](./public/agent-skill.md). The skill walks it through the schema, validation, and PR flow.

## Project categories

- **`ecosystem`** — Tools, dashboards, SDKs, content, and community assets built *specifically for* the Venice community (e.g. VeniceStats, a language SDK, a community X account). It must have a specific Venice focus — a general-purpose tool that Venice users could also use, but isn't built for Venice (e.g. Google Docs), doesn't qualify.
- **`powered-by`** — Apps and integrations that use the Venice API to power their product (e.g. a chatbot, a research tool).

## Connected socials

Every project type supports an optional `socials` array. Use it so the same entry can link to other surfaces (a repo's X account, a token's Telegram, an X account's Farcaster, and so on).

```yaml
socials:
  - kind: x
    url: https://x.com/yourproject
  - kind: farcaster
    url: https://warpcast.com/yourproject
  - kind: telegram
    url: https://t.me/yourproject
```

Valid `kind` values: `x, github, website, farcaster, warpcast, instagram, telegram, discord, youtube, tiktok, token`.

## Adding a Website

```yaml
title: My Project
description: What it does in 1–2 plain sentences.
type: Website
url: https://myproject.com
tags: [Tag1, Tag2]
category: powered-by   # or "ecosystem"
thumbnail: /preview-myproject.png   # optional 16:9 — add a 1200×675 PNG to public/
submittedBy: your-handle
socials:
  - kind: x
    url: https://x.com/yourproject
```

`thumbnail` is available on every project type (Website, GitHub Repo, X Account, Token). For GitHub Repo entries, leave it blank — the maintainer runs `npm run refresh-projects` after merging which pre-bakes the repo's GitHub OG image into `public/repo-previews/<owner>-<repo>.png`. RepoCard falls back to the owner avatar at runtime if that file is missing. You only need to set `thumbnail` explicitly when the OG image looks weak and you want a hand-captured screenshot instead.

## Adding a GitHub Repo

```yaml
title: my-repo
description: What it does in 1–2 plain sentences.
type: GitHub Repo
url: https://github.com/owner/repo
tags: [Tag1, Tag2]
category: ecosystem
owner: owner
repo: repo
language: TypeScript
stars: 42   # optional; leave out if you don't know
forks: 5    # optional
submittedBy: your-handle
socials:
  - kind: x
    url: https://x.com/yourproject
  - kind: website
    url: https://yourproject.com
```

## Adding an X Account

```yaml
title: "@yourproject"
description: What the account posts about in 1–2 sentences.
type: X Account
handle: yourproject               # without the @
url: https://x.com/yourproject
tags: [Community, News]
category: ecosystem
bio: One-line bio from the profile.   # optional
followers: 4200                        # optional
submittedBy: your-handle
socials:
  - kind: farcaster
    url: https://warpcast.com/yourproject
```

## Adding a Token

Community tokens only. Venice's own official token is not accepted here.

```yaml
title: "$TICKER"
description: What the token is for in 1–2 sentences.
type: Token
ticker: TICKER
address: "0x…"            # full contract address
chain: base               # "solana" | "base" | "ethereum"
url: https://coingecko.com/...
tags: [Token, DAO]
category: powered-by
marketCap: 2400000        # optional
holders: 1820             # optional
submittedBy: your-handle
socials:
  - kind: x
    url: https://x.com/…
  - kind: telegram
    url: https://t.me/…
```

<!-- Media submissions temporarily hidden — original heading/body to restore:
## Adding a Cookbook / Event / Media

Each has a simple schema — add a file under `content/cookbooks/`, `content/events/`, or `content/media/` following an existing entry. Keep descriptions plain and short.
-->
## Adding a Cookbook / Event

Each has a simple schema — add a file under `content/cookbooks/` or `content/events/` following an existing entry. Keep descriptions plain and short.

## Quality bar

We're looking for:

- Original tools, dashboards, SDKs, and integrations.
- Community content (cookbooks, event writeups, builder interviews).
- Community-maintained X accounts and tokens that meaningfully serve the ecosystem.

We will not accept:

- Bare API wrappers with no added functionality.
- Projects that are not publicly accessible.
- Placeholder or demo-only projects.
- Marketing copy in descriptions ("revolutionary", "cutting-edge", emoji-only taglines).
- Venice's own official token.

## PR checklist

- [ ] One entry per pull request.
- [ ] One new YAML file under `content/` (don't edit `src/`).
- [ ] TypeScript compiles (`npm run build`).
- [ ] Entry includes all required fields for its type.
- [ ] URL is publicly accessible.
- [ ] Description is 1–2 plain sentences, under 220 characters.
- [ ] `tags` reuses existing tags where it makes sense.

## Disclaimer

Listing on Built in Venice does not imply endorsement by Venice AI, Inc.
