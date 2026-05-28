---
name: submit-builtonvenice-project
description: Submit a community project (website, GitHub repo, or X account) to the Built on Venice directory on behalf of the user, via a GitHub pull request (preferred) or issue against veniceai/builtwithvenice.
version: 2
---

# Built on Venice -- agent submission skill

Built on Venice (live at <https://builtonvenice.ai>) is a community-maintained directory of projects built on or around the Venice.ai API. It is an open-source site; there is no write API. Submissions are accepted as **GitHub pull requests** against `veniceai/builtwithvenice` or, as a fallback, **GitHub issues** using the project-submission template.

This skill tells an agent how to:

1. Collect the right details from the user.
2. Validate against the `Project` schema below.
3. Open a PR that adds a single entry to `src/data/projects.ts`, or fall back to an issue.

Repo: <https://github.com/veniceai/builtwithvenice>
Issue picker (project, cookbook, event, demo): <https://github.com/veniceai/builtwithvenice/issues/new/choose>

---

## When to use this skill

Use this skill when the user asks something like:

- "Submit my project to Built on Venice."
- "Add [repo / site / X handle] to builtonvenice.ai."
- "Add this to the Venice community directory."

This skill covers **project** submissions only. Cookbooks, events, and demos live in the same repo but have their own issue templates and data files (`src/data/cookbooks.ts`, `src/data/events.ts`, `src/data/demos.ts`). For those, point the user at the issue picker above.

---

## Required + optional inputs

Common to every project type:

| field           | required | notes                                                                 |
|-----------------|----------|-----------------------------------------------------------------------|
| `title`         | yes      | Display name. Keep under 40 chars.                                    |
| `description`   | yes      | One to two sentences. Max ~220 chars. No marketing filler.            |
| `url`           | yes      | Canonical URL for the project. Must be `https://`.                    |
| `type`          | yes      | `"Website"` \| `"GitHub Repo"` \| `"X Account"`                       |
| `category`      | yes      | `"ecosystem"` (maintained by/with Venice) or `"powered-by"` (built on Venice). |
| `tags`          | yes      | 1-4 short tags. Title Case. Reuse existing tags where possible.       |
| `submittedBy`   | yes      | GitHub or X handle of the submitter (no `@`).                         |
| `socials`       | no       | Array of `{ kind, url }`. See `SocialKind` below.                     |
| `thumbnail`     | no       | 16:9 preview image. Local path (e.g. `/preview-foo.png` in `public/`) or absolute https URL. For GitHub Repo entries, leave blank -- the maintainer runs `npm run refresh-projects`, which pre-bakes the GitHub OG image into `public/repo-previews/<owner>-<repo>.png`. The card falls back to `https://github.com/<owner>.png` (the owner avatar) at runtime if that file 404s. |
| `featured`      | no       | **Do not set.** Maintainers choose featured projects.                 |

Type-specific extras:

- `Website` -- no extra required fields (use `thumbnail` for the preview image).
- `GitHub Repo` -- `owner`, `repo`; `stars?`, `forks?`, `language?` (leave empty unless you know them; the maintainer's `npm run refresh-projects` script fills them in).
- `X Account` -- `handle` (no `@`), `followers?`, `bio?`.

`SocialKind` values: `"x" | "github" | "website" | "farcaster" | "warpcast" | "instagram" | "telegram" | "discord" | "youtube" | "tiktok" | "token"`.

---

## Flow A -- open a pull request (preferred)

Use this when the agent has write access via `gh` or a GitHub API token.

1. Fork `veniceai/builtwithvenice` (or reuse an existing fork):
   ```
   gh repo fork veniceai/builtwithvenice --clone
   ```
2. Create a branch: `submit/<short-kebab-title>`.
3. Read `src/data/projects.ts`. Insert the new entry into the correct section (`// -- Ecosystem --` or `// -- Powered by Venice --`), near similar entries. Keep formatting consistent with surrounding code.
4. Open a PR against `veniceai/builtwithvenice` `main`:
   ```
   gh pr create --repo veniceai/builtwithvenice --base main \
     --title "Add <title>" \
     --body "Submitted by @<handle>. Adds a single entry to src/data/projects.ts."
   ```
   Prefix the title with `[Ecosystem]` or `[Powered by Venice]` if helpful.
5. Return the PR URL to the user.

### Minimal example (GitHub Repo, powered-by)

```ts
{
  title: "yourproject",
  description: "One or two plain sentences about what it does. No marketing language.",
  type: "GitHub Repo",
  url: "https://github.com/yourHandle/yourproject",
  tags: ["Frontend", "Open Source", "Privacy"],
  category: "powered-by",
  owner: "yourHandle",
  repo: "yourproject",
  language: "TypeScript",
  submittedBy: "yourHandle",
  socials: [
    { kind: 'x', url: 'https://x.com/yourHandle' },
  ],
}
```

---

## Flow B -- open an issue (fallback)

Use this if the agent lacks permission to fork/PR.

1. Construct the issue URL using stable field IDs and URL-encode each value. Base URL:

   ```
   https://github.com/veniceai/builtwithvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+<url-encoded-title>
   ```

   Field IDs (append as `&<id>=<url-encoded-value>`):

   - Common: `project-name`, `project-type`, `project-url`, `category`, `description`, `tags`, `submitted-by`
   - GitHub Repo extras: `github-owner`, `github-repo`, `language`, `stars`, `forks`
   - X Account extras: `x-handle`, `x-bio`, `x-followers`
   - `socials` (textarea -- newline-separated `kind: url` pairs)
   - `screenshot` (textarea -- 16:9 image for websites; maintainers use it as the thumbnail)

   Notes on `project-type` and `category` dropdown values (must match exactly):
   - `project-type`: `Website`, `GitHub Repo`, or `X Account`
   - `category`: `Ecosystem (built for the Venice community)` or `Powered by Venice (uses the Venice API)`

2. Either open the URL with `gh` / `open`, or hand it back to the user:
   ```
   gh issue create --repo veniceai/builtwithvenice \
     --title "[Project] <title>" \
     --body-file <body-file> \
     --label submission
   ```
   When opening via `gh issue create`, write the body yourself in markdown matching the template fields -- the template-prefill URL flow only works in a browser.

3. Return the issue URL so the user can review and submit.

---

## Validation checklist

Before opening a PR or issue, confirm:

- [ ] The URL is `https://` and resolves (HEAD 200, or expected redirect).
- [ ] For GitHub repos: the repo is public.
- [ ] For X accounts: the handle exists (`https://x.com/<handle>` doesn't 404).
- [ ] No duplicate entry already exists -- search `src/data/projects.ts` for the URL and the title.
- [ ] The description is 1-2 plain sentences, under ~220 chars, no marketing filler ("revolutionary", "cutting-edge", emoji, ALL CAPS).
- [ ] `tags` is 1-4 short Title-Case strings; reuse existing tags from `src/data/projects.ts` where it makes sense.
- [ ] The project meets the public submission guidelines at <https://builtonvenice.ai/submission-guidelines>.

If any check fails, stop and ask the user.

---

## Schema reference

The authoritative schema is in `src/data/projects.ts` in the repo. A machine-readable subset is at:

```
https://builtonvenice.ai/.well-known/agent-submit.json
```

Version this skill against the `version` field in that manifest.
