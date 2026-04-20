---
name: submit-builtwithvenice-project
description: Submit a community project (website, GitHub repo, X account, or token) to the Built with Venice directory on behalf of the user, via a GitHub pull request or issue against nikshepsvn/builtwithvenice.
version: 1
---

# Built with Venice — agent submission skill

Built with Venice is a community-maintained directory of projects built on or around the Venice.ai API. It is an open-source site; there is no write API. Submissions are accepted as **GitHub pull requests** against `nikshepsvn/builtwithvenice` or, as a fallback, **GitHub issues** using the project-submission template.

This skill tells an agent how to:

1. Collect the right details from the user.
2. Validate against the `Project` schema below.
3. Open a PR that adds a single entry to `src/data/projects.ts`, or fall back to an issue.

---

## When to use this skill

Use this skill when the user asks something like:

- "Submit my project to Built with Venice."
- "Add [repo / site / X handle / token] to builtwithvenice.com."
- "Add this to the Venice community directory."

Do NOT use it to submit events, cookbooks, or spotlights — those have separate flows at <https://github.com/nikshepsvn/builtwithvenice>.

---

## Required + optional inputs

Common to every project type:

| field           | required | notes                                                                 |
|-----------------|----------|-----------------------------------------------------------------------|
| `title`         | yes      | Display name. Keep under 40 chars.                                    |
| `description`   | yes      | One–two sentences. Max ~220 chars.                                    |
| `url`           | yes      | Canonical URL for the project.                                        |
| `type`          | yes      | `"Website"` \| `"GitHub Repo"` \| `"X Account"` \| `"Token"`          |
| `category`      | yes      | `"ecosystem"` (maintained by/with Venice) or `"powered-by"` (built on Venice). |
| `tags`          | yes      | 1–4 short tags. Title Case. Reuse existing tags where possible.       |
| `submittedBy`   | yes      | GitHub or X handle of the submitter.                                  |
| `socials`       | no       | Array of `{ kind, url }`. See `SocialKind` below.                     |
| `featured`      | no       | **Do not set.** Maintainers choose featured projects.                 |

Type-specific extras:

- `Website` → `preview?: "/filename.png"` (path in `public/`).
- `GitHub Repo` → `owner`, `repo`; `stars?`, `forks?`, `language?` (leave empty unless you know them).
- `X Account` → `handle` (no `@`), `followers?`, `bio?`.
- `Token` → `ticker`, `address`, `chain: "solana" | "base" | "ethereum"`, `marketCap?`, `holders?`. Reject Venice's own official token; this directory is community-only.

`SocialKind` values: `"x" | "github" | "website" | "farcaster" | "warpcast" | "instagram" | "telegram" | "discord" | "youtube" | "tiktok" | "token"`.

---

## Flow A — open a pull request (preferred)

Use this when the agent has write access via `gh` or a GitHub API token.

1. Fork `nikshepsvn/builtwithvenice` (or reuse an existing fork).
2. Create a branch: `submit/<short-kebab-title>`.
3. Read `src/data/projects.ts`. Insert the new entry into the correct section (ecosystem or powered-by), near similar entries. Keep formatting consistent with surrounding code.
4. Open a PR with:
   - Title: `Add <title>` (prefix `[Ecosystem]` or `[Powered by Venice]` if helpful).
   - Body: short summary + "submitted by @\<handle\>".
5. Return the PR URL to the user.

### Minimal example

```ts
{
  title: "openvenice",
  description: "Open-source frontend for Venice AI. Chat, images, audio, video, embeddings in one UI. No backend required.",
  type: "GitHub Repo",
  url: "https://github.com/nikshepsvn/openvenice",
  tags: ["Frontend", "Open Source", "Privacy"],
  category: "powered-by",
  owner: "nikshepsvn",
  repo: "openvenice",
  language: "TypeScript",
  submittedBy: "nikshepsvn",
  socials: [
    { kind: 'x', url: 'https://x.com/nikshepsvn' },
  ],
}
```

---

## Flow B — open an issue (fallback)

Use this if the agent lacks permission to fork/PR.

1. Construct a body using the fields above, as a short checklist.
2. Open an issue at:

   ```
   https://github.com/nikshepsvn/builtwithvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+<url-encoded-title>
   ```

   Pre-fill what you can via query params (the template field IDs are stable: `title`, `url`, `type`, `category`, `description`, `tags`, `socials`).
3. Return the issue URL so the user can review and submit.

---

## Validation checklist

Before opening a PR or issue, confirm:

- [ ] The URL resolves (HEAD 200, or expected redirect).
- [ ] For GitHub repos: the repo is public.
- [ ] For X accounts: the handle exists (`https://x.com/<handle>` doesn't 404).
- [ ] For tokens: the address is well-formed for its chain, and it is **not** Venice's official `$VVV` token.
- [ ] No duplicate entry already exists (search `src/data/projects.ts` for the URL and the title).
- [ ] The description doesn't include marketing filler ("revolutionary", "cutting-edge", emojis).

If any check fails, stop and ask the user.

---

## Schema reference

The authoritative schema is in `src/data/projects.ts` in the repo. A machine-readable subset is at:

```
https://builtwithvenice.com/.well-known/agent-submit.json
```

Version this skill against the `version` field in that manifest.
