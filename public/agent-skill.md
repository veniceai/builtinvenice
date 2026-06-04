---
name: submit-builtinvenice-project
description: Submit a community project (website, GitHub repo, or X account) to the Built in Venice directory on behalf of the user, via a GitHub pull request (preferred) or issue against veniceai/builtinvenice.
version: 2
---

# Built in Venice -- agent submission skill

Built in Venice (live at <https://builtinvenice.ai>) is a community-maintained directory of projects built on or around the Venice.ai API. It is an open-source site; there is no write API. Submissions are accepted as **GitHub pull requests** against `veniceai/builtinvenice` or, as a fallback, **GitHub issues** using the project-submission template.

This skill tells an agent how to:

1. Collect the right details from the user.
2. Validate against the `Project` schema below.
3. Open a PR that adds a single file `content/projects/<slug>.yaml`, or fall back to an issue.

Repo: <https://github.com/veniceai/builtinvenice>
Issue picker (project, cookbook, event, media): <https://github.com/veniceai/builtinvenice/issues/new/choose>

---

## Operating principle

**Ship a complete entry. Don't defer to maintainers.** Maintainers triage, label, and merge -- they shouldn't have to fetch metadata, hunt down thumbnails, or guess at fields the agent could have filled in. For every optional field, ask in order:

1. Can I fetch this myself? (e.g. stars/forks/language via `gh api`, language/og:image via the project URL, X bio via a public X profile page).
2. Can I ask the user a quick, specific question to get it?
3. Only if both fail, omit it -- and note in the PR/issue body what's missing and why.

If you discover during validation that something the user said is wrong or thin (description is marketing-speak, tags don't match conventions, no socials provided), **rewrite it or ask** before submitting. The bar is "this entry could be merged as-is."

---

## When to use this skill

Use this skill when the user asks something like:

- "Submit my project to Built in Venice."
- "Add [repo / site / X handle] to builtinvenice.ai."
- "Add this to the Venice community directory."

This skill covers **project** submissions only. Cookbooks, events, and media live in the same repo but have their own issue templates and content directories (`content/cookbooks/`, `content/events/`, `content/media/`). For those, point the user at the issue picker above.

---

## Required + optional inputs

Common to every project type:

| field           | required | notes                                                                 |
|-----------------|----------|-----------------------------------------------------------------------|
| `title`         | yes      | Display name. Keep under 40 chars.                                    |
| `description`   | yes      | One to two sentences. Max 220 chars. If the user gives you marketing copy ("revolutionary", "cutting-edge", emoji, ALL CAPS), **rewrite it yourself** in plain language describing what it does, then show the user the rewrite. If you can't tell what the project does, fetch the URL and read the page before asking. |
| `url`           | yes      | Canonical URL for the project. Must be `https://`.                    |
| `type`          | yes      | `"Website"` \| `"GitHub Repo"` \| `"X Account"`                       |
| `category`      | yes      | `"ecosystem"` (maintained by/with Venice) or `"powered-by"` (built on Venice). |
| `tags`          | yes      | 1-4 short Title-Case tags. **Reuse existing tags.** Discover them by scanning existing files: `grep -rh "^  - " content/projects/` (or just scan `content/projects/*.yaml`). Don't invent close synonyms -- prefer `Privacy`, `TEE`, or `Security` over a new `Verifier`. |
| `submittedBy`   | yes      | GitHub or X handle of the submitter (no `@`).                         |
| `socials`       | no       | Array of `{ kind, url }`. See `SocialKind` below. **Don't leave empty by default.** Fetch the project URL and look for linked socials in the page metadata or footer; check the GitHub repo's `homepage` / README badges; ask the user "any X handle, Farcaster, Discord, or Telegram people should know about?" before submitting. |
| `thumbnail`     | no       | 16:9 preview image. **What to provide depends on type:** <br>- `GitHub Repo`: **leave blank.** A build-time script bakes the repo's GitHub OG image into `public/repo-previews/<owner>-<repo>.png` and the card falls back to the owner avatar at runtime -- anything you supply for this type gets overwritten. <br>- `X Account`: **leave blank.** `XAccountCard` doesn't render thumbnails. <br>- `Website`: **try to provide one.** In order: (1) fetch the URL and read its `<meta property="og:image">` -- if it's a 16:9 absolute https URL, use it; (2) if og:image is missing or wrong shape, ask the user "do you have a 16:9 screenshot or hero image hosted somewhere?"; (3) if they only have a local file, point them at the in-app form at <https://builtinvenice.ai/> ("Submit your work"), which uploads automatically -- the agent's own API access doesn't include the upload endpoint. Don't try to upload via a random third-party host. <br>In the issue template the field is named `screenshot` (label: "Thumbnail (optional)") -- same concept, different name. |
| `featured`      | no       | **Do not set.** Maintainers choose featured projects.                 |

Type-specific extras:

- `Website` -- no extra required fields. Try to provide `thumbnail` per the rules above.
- `GitHub Repo` -- `owner`, `repo` (required). For `stars`, `forks`, `language`, **fetch them yourself**:
  ```
  gh api repos/<owner>/<repo> --jq '{stars: .stargazers_count, forks: .forks_count, language: .language}'
  ```
  Include the values in the entry. (A maintainer refresh script overwrites them with up-to-date numbers periodically, but that's a backstop -- ship fresh values.)
- `X Account` -- `handle` (no `@`, required). For `bio` and `followers`, fetch from the public profile page (`https://x.com/<handle>`) if accessible, otherwise ask the user. Don't leave both empty.

`SocialKind` values: `"x" | "github" | "website" | "farcaster" | "warpcast" | "instagram" | "telegram" | "discord" | "youtube" | "tiktok" | "token"`.

---

## Flow A -- open a pull request (preferred)

Use this when the agent has write access via `gh` or a GitHub API token.

1. Fork `veniceai/builtinvenice` (or reuse an existing fork):
   ```
   gh repo fork veniceai/builtinvenice --clone
   ```
2. Create a branch: `submit/<short-kebab-title>`.
3. Create `content/projects/<slug>.yaml` where the slug is: `<owner>-<repo>` for GitHub repos, the handle (no `@`) for X accounts, the ticker for tokens, and kebab-case of the title otherwise. One entry per file — do not edit other files or any code in `src/`.
4. Open a PR against `veniceai/builtinvenice` `main`:
   ```
   gh pr create --repo veniceai/builtinvenice --base main \
     --title "Add <title>" \
     --body "Submitted by @<handle>. Adds a single file content/projects/<slug>.yaml."
   ```
   PR titles are free-form; `Add <title>` is fine. Optional `[Ecosystem]` / `[Powered by Venice]` prefix if it aids review. (Note: this is the PR convention. The *issue* template in Flow B hardcodes a `[Project]` prefix instead -- don't mix them up.)
5. Return the PR URL to the user.

### Minimal example (GitHub Repo, powered-by)

```yaml
title: yourproject
description: One or two plain sentences about what it does. No marketing language.
type: GitHub Repo
url: https://github.com/yourHandle/yourproject
tags: [Frontend, Open Source, Privacy]
category: powered-by
owner: yourHandle
repo: yourproject
language: TypeScript
submittedBy: yourHandle
socials:
  - kind: x
    url: https://x.com/yourHandle
```

---

## Flow B -- open an issue (fallback)

Use this if the agent lacks permission to fork/PR. The issue title **must** start with `[Project] ` -- the template hardcodes it. Unlike Flow A (PR), don't use `[Ecosystem]` / `[Powered by Venice]` prefixes here.

There are two sub-flows depending on whether you can drive a browser:

### B1. Prefilled template URL (browser flow)

Open this URL (or hand it to the user); GitHub will render the form prefilled:

```
https://github.com/veniceai/builtinvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+<url-encoded-title>
```

Append `&<field-id>=<url-encoded-value>` for any of:

- Common: `project-name`, `project-type`, `project-url`, `category`, `description`, `tags`, `submitted-by`
- GitHub Repo extras: `github-owner`, `github-repo`, `language`, `stars`, `forks`
- X Account extras: `x-handle`, `x-bio`, `x-followers`
- `socials` (textarea -- newline-separated `kind: url` pairs)
- `screenshot` (textarea -- 16:9 image for websites; maintainers use it as the `thumbnail`)

Dropdown values (must match exactly, URL-encoded):
- `project-type`: `Website`, `GitHub Repo`, or `X Account`
- `category`: `Ecosystem (built for the Venice community)` or `Powered by Venice (uses the Venice API)`

### B2. `gh issue create` (CLI flow)

The template-prefill URL only works in a browser. To create the issue directly via `gh`, write the body yourself in the markdown format below, then:

```
gh issue create --repo veniceai/builtinvenice \
  --title "[Project] <title>" \
  --body-file <body-file> \
  --label submission
```

The `submission` label matches the template's declared label and is what maintainers filter on for triage. If `gh` errors with "label not found", drop the `--label` flag and continue -- the issue is still created and maintainers can label it.

#### Issue body skeleton

GitHub renders the issue body as one `### <Field Label>` heading per field, with the value below. Use this skeleton -- include only the type-specific sections that apply (GitHub Repo or X Account); omit the rest:

```markdown
### Project Name

<title>

### Project Type

<one of: Website, GitHub Repo, X Account>

### Project URL

<https URL>

### Category

<one of: Ecosystem (built for the Venice community), Powered by Venice (uses the Venice API)>

### Description

<1-2 plain sentences, no marketing language>

### Tags

<Comma, Separated, Title Case>

### Your Name / Handle

@<yourHandle>

### GitHub Owner (repos only)

<owner>            <!-- omit this section for Website / X Account -->

### GitHub Repo Name (repos only)

<repo>             <!-- omit this section for Website / X Account -->

### Primary Language (repos only)

<TypeScript|Python|...>    <!-- omit for Website / X Account -->

### Stars (repos only, optional)

<integer from `gh api repos/<owner>/<repo>` -- fill this in; don't leave blank>

### Forks (repos only, optional)

<integer from `gh api repos/<owner>/<repo>` -- fill this in; don't leave blank>

### X Handle (X accounts only)

<handle without @>      <!-- omit this section for Website / GitHub Repo -->

### Short bio (X accounts only)

<one-line bio>          <!-- omit for Website / GitHub Repo -->

### Followers (X accounts only, optional)

<integer scraped from the public X profile page, or asked from the user -- fill in if you can get it>

### Connected socials (optional)

x: https://x.com/yourHandle
github: https://github.com/yourHandle

### Thumbnail (optional)

<For Website: the og:image you scraped from the project URL, or a hosted https URL the user provided. For GitHub Repo and X Account: "_No response_" (auto-baked / not rendered). If the user has only a local file, tell them the in-app form at https://builtinvenice.ai handles upload automatically -- don't punt to maintainers.>

### Quality Checklist

- [x] This project is publicly accessible.
- [x] This project offers functionality beyond the base Venice platform, OR is a community asset (X account) that complements it.
- [x] I understand that listing does not imply endorsement by Venice AI.
```

Notes:
- Use `_No response_` only for fields where there is genuinely nothing to put. Per the operating principle above, try to fetch or ask before falling back to it.
- All three Quality Checklist boxes are required by the template and must be checked.

Return the issue URL so the user can review.

---

## Validation checklist

Before opening a PR or issue, confirm:

- [ ] The URL is `https://` and resolves (HEAD 200, or expected redirect).
- [ ] For GitHub repos: the repo is public, and `stars` / `forks` / `language` are filled in via `gh api`.
- [ ] For X accounts: the handle exists (`https://x.com/<handle>` doesn't 404), and either `bio` or `followers` is filled in (ideally both).
- [ ] For Websites: a `thumbnail` is included if one is reasonably gettable (og:image scrape, user-hosted URL, or in-app form for local files).
- [ ] No duplicate entry already exists -- search `content/projects/` for the URL and the title (e.g. `grep -rl <url> content/projects`).
- [ ] The description is 1-2 plain sentences, under 220 chars, no marketing filler. If you rewrote it from the user's input, show them the rewrite.
- [ ] `tags` is 1-4 short Title-Case strings; reuse existing tags from `content/projects/` where it makes sense.
- [ ] `socials` has at least one entry, unless the user has genuinely no public socials.
- [ ] The project meets the public submission guidelines at <https://builtinvenice.ai/submission-guidelines>.

If any check fails, fetch / ask / rewrite to fix it before submitting -- don't defer to maintainers.

---

## Schema reference

The authoritative schema is `src/data/schema.ts` (zod) in the repo; a JSON-Schema mirror is at:

```
https://builtinvenice.ai/.well-known/agent-submit.json
```

Version this skill against the `version` field in that manifest.
