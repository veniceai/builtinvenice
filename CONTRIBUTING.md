# Contributing to Built with Venice

A community-curated showcase of projects, tools, and content built on the Venice AI ecosystem.

Maintained by the Venice DevRel team — **Sabrina Aquino** and **Josh Meyer**.

## How to submit

### Option 1 — Form (easiest)

Pick the form that matches what you're submitting:

- [**Project**](https://github.com/nikshepsvn/builtwithvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+) — website, GitHub repo, X account, or community token.
- [**Cookbook / Recipe**](https://github.com/nikshepsvn/builtwithvenice/issues/new?template=submit-cookbook.yml&title=%5BCookbook%5D+)
- [**Event**](https://github.com/nikshepsvn/builtwithvenice/issues/new?template=submit-event.yml&title=%5BEvent%5D+) — hackathon, meetup, workshop, or conference.
- [**Builder Spotlight**](https://github.com/nikshepsvn/builtwithvenice/issues/new?template=submit-spotlight.yml&title=%5BSpotlight%5D+)

Or [browse all submission forms](https://github.com/nikshepsvn/builtwithvenice/issues/new/choose).

### Option 2 — Pull request

1. Fork this repo.
2. Add your entry to the file matching what you're submitting:
   - Projects (website / repo / X account / token) → `src/data/projects.ts`
   - Cookbook recipes → `src/data/cookbooks.ts`
   - Events / hackathons → `src/data/events.ts`
   - Builder spotlights → `src/data/spotlights.ts`
3. Open a pull request with one entry per PR.
4. Sabrina or Josh reviews and merges.

### Option 3 — AI agent

Copy the "paste this into your AI agent" prompt from the hero on the live site, or just point your agent at [`public/agent-skill.md`](./public/agent-skill.md). The skill walks it through the schema, validation, and PR flow.

## Project categories

- **`ecosystem`** — Tools, dashboards, SDKs, content, and community assets built *for* the Venice community (e.g. VeniceStats, a language SDK, a community X account).
- **`powered-by`** — Apps and integrations that use the Venice API to power their product (e.g. a chatbot, a research tool).

## Connected socials

Every project type supports an optional `socials` array. Use it so the same entry can link to other surfaces (a repo's X account, a token's Telegram, an X account's Farcaster, and so on).

```ts
socials: [
  { kind: 'x',         url: 'https://x.com/yourproject' },
  { kind: 'farcaster', url: 'https://warpcast.com/yourproject' },
  { kind: 'telegram',  url: 'https://t.me/yourproject' },
]
```

Valid `kind` values: `x, github, website, farcaster, warpcast, instagram, telegram, discord, youtube, tiktok, token`.

## Adding a Website

```ts
{
  title: "My Project",
  description: "What it does in 1–2 plain sentences.",
  type: "Website",
  url: "https://myproject.com",
  tags: ["Tag1", "Tag2"],
  category: "powered-by",   // or "ecosystem"
  preview: "/preview-myproject.png",   // optional — add a 1200x750 PNG to public/
  submittedBy: "your-handle",
  socials: [
    { kind: 'x', url: 'https://x.com/yourproject' },
  ],
}
```

## Adding a GitHub Repo

```ts
{
  title: "my-repo",
  description: "What it does in 1–2 plain sentences.",
  type: "GitHub Repo",
  url: "https://github.com/owner/repo",
  tags: ["Tag1", "Tag2"],
  category: "ecosystem",
  owner: "owner",
  repo: "repo",
  language: "TypeScript",
  stars: 42,   // optional; leave out if you don't know
  forks: 5,    // optional
  submittedBy: "your-handle",
  socials: [
    { kind: 'x',       url: 'https://x.com/yourproject' },
    { kind: 'website', url: 'https://yourproject.com' },
  ],
}
```

## Adding an X Account

```ts
{
  title: "@yourproject",
  description: "What the account posts about in 1–2 sentences.",
  type: "X Account",
  handle: "yourproject",               // without the @
  url: "https://x.com/yourproject",
  tags: ["Community", "News"],
  category: "ecosystem",
  bio: "One-line bio from the profile.",   // optional
  followers: 4200,                          // optional
  submittedBy: "your-handle",
  socials: [
    { kind: 'farcaster', url: 'https://warpcast.com/yourproject' },
  ],
}
```

## Adding a Token

Community tokens only. Venice's own official token is not accepted here.

```ts
{
  title: "$TICKER",
  description: "What the token is for in 1–2 sentences.",
  type: "Token",
  ticker: "TICKER",
  address: "0x…",            // full contract address
  chain: "base",             // "solana" | "base" | "ethereum"
  url: "https://coingecko.com/...",
  tags: ["Token", "DAO"],
  category: "powered-by",
  marketCap: 2_400_000,      // optional
  holders: 1820,             // optional
  submittedBy: "your-handle",
  socials: [
    { kind: 'x',        url: 'https://x.com/…' },
    { kind: 'telegram', url: 'https://t.me/…' },
  ],
}
```

## Adding a Cookbook / Event / Spotlight

Each has a simple schema — open the file (`src/data/cookbooks.ts`, `src/data/events.ts`, `src/data/spotlights.ts`) and follow the existing entries. Keep descriptions plain and short.

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
- [ ] TypeScript compiles (`npm run build`).
- [ ] Entry includes all required fields for its type.
- [ ] URL is publicly accessible.
- [ ] Description is 1–2 plain sentences, under ~220 characters.
- [ ] `tags` reuses existing tags where it makes sense.

## Disclaimer

Listing on Built with Venice does not imply endorsement by Venice AI, Inc.
