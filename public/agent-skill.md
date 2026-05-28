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
| `tags`          | yes      | 1-4 short Title-Case tags. **Reuse existing tags.** Discover them with `grep -hoE "tags: \[[^]]+\]" src/data/projects.ts \| sort -u` (or just scan `src/data/projects.ts`). Don't invent close synonyms -- prefer `Privacy`, `TEE`, or `Security` over a new `Verifier`. |
| `submittedBy`   | yes      | GitHub or X handle of the submitter (no `@`).                         |
| `socials`       | no       | Array of `{ kind, url }`. See `SocialKind` below.                     |
| `thumbnail`     | no       | 16:9 preview image. **What to provide depends on type:** <br>- `GitHub Repo`: **leave blank.** Maintainers run `npm run refresh-projects`, which bakes the repo's GitHub OG image into `public/repo-previews/<owner>-<repo>.png`; the card falls back to the owner avatar (`https://github.com/<owner>.png`) at runtime. Anything you supply gets ignored. <br>- `X Account`: **leave blank.** X Account cards don't render thumbnails. <br>- `Website`: **helpful but optional.** Paste an absolute https URL to a 16:9 image the user already has hosted (their CDN, GitHub raw, S3, etc.). If they only have a local file and no host, **do not try to upload it yourself** -- instead, point them at the in-app form at <https://builtonvenice.ai/> (the "Submit your work" button), which handles the upload automatically. As a last resort, leave blank; a maintainer will capture a screenshot during review. <br>In the issue template the field is named `screenshot` (label: "Thumbnail (optional)") -- same concept, different name. Maintainers may also use a local path (e.g. `/preview-foo.png` in `public/`) when curating manually. |
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
   PR titles are free-form; `Add <title>` is fine. Optional `[Ecosystem]` / `[Powered by Venice]` prefix if it aids review. (Note: this is the PR convention. The *issue* template in Flow B hardcodes a `[Project]` prefix instead -- don't mix them up.)
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

Use this if the agent lacks permission to fork/PR. The issue title **must** start with `[Project] ` -- the template hardcodes it. Unlike Flow A (PR), don't use `[Ecosystem]` / `[Powered by Venice]` prefixes here.

There are two sub-flows depending on whether you can drive a browser:

### B1. Prefilled template URL (browser flow)

Open this URL (or hand it to the user); GitHub will render the form prefilled:

```
https://github.com/veniceai/builtwithvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+<url-encoded-title>
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
gh issue create --repo veniceai/builtwithvenice \
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

_No response_

### Forks (repos only, optional)

_No response_

### X Handle (X accounts only)

<handle without @>      <!-- omit this section for Website / GitHub Repo -->

### Short bio (X accounts only)

<one-line bio>          <!-- omit for Website / GitHub Repo -->

### Followers (X accounts only, optional)

_No response_

### Connected socials (optional)

x: https://x.com/yourHandle
github: https://github.com/yourHandle

### Thumbnail (optional)

<For Website: absolute https URL of a 16:9 image the user already has hosted. For GitHub Repo and X Account: "_No response_" (auto-baked / not rendered). If the user only has a local file and no host, leave "_No response_" and tell them the in-app form at https://builtonvenice.ai handles upload automatically.>

### Quality Checklist

- [x] This project is publicly accessible.
- [x] This project offers functionality beyond the base Venice platform, OR is a community asset (X account) that complements it.
- [x] I understand that listing does not imply endorsement by Venice AI.
```

Notes:
- Use `_No response_` for optional fields you're leaving blank -- that matches how the browser flow renders empty inputs.
- All three Quality Checklist boxes are required by the template and must be checked.

Return the issue URL so the user can review.

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
