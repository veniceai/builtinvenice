# Stricter Venice-relevance for Ecosystem submissions

**Date:** 2026-06-15
**Status:** Approved (design); implementation plan pending

## Problem

Several project submissions tagged **Ecosystem** ("built for the Venice
community") are not clearly related to Venice. They are general-purpose AI
tools that Venice community members *could* use — in the same way Google Docs
is a tool a Venice user could also use — but they have no specific focus on the
Venice ecosystem.

We only want projects that are **directly related to Venice**: either *Powered
by Venice* (uses the Venice API) or *built specifically for the Venice
community*. The "Powered by Venice" category already implies a concrete Venice
connection (it uses the API). The "Ecosystem" category is where the ambiguity
lives, so that is where we add friction and clarity.

## Goal

When a submitter selects **Ecosystem**, the submission flow must:

1. Collect structured + free-text justification of the project's specific
   Venice connection.
2. Make it explicit — in the form, the GitHub issue, and the public guidelines
   — that an Ecosystem project must have a Venice-specific focus and cannot be
   a general tool that Venice users merely could also use (e.g. Google Docs).

## Background: how submissions work today

The submission flow is **client-only**. There is no backend gate.

- `src/submitSchemas.ts` defines the form fields declaratively
  (`submissionTypes` → `project` → `fields`). Fields support conditional
  display via `showWhen(form)`.
- `src/components/SubmitDialog.tsx` renders those fields. Its `validate()`
  enforces `required` **only on visible fields** (`visibleFields`), so a
  conditionally-shown required field is automatically conditionally required.
- On submit, the form prefills a **GitHub issue**
  (`.github/ISSUE_TEMPLATE/submit-project.yml`) via URL params. Field `id`s in
  the schema must match the issue form field IDs for prefill to work.
- Maintainers review the issue, then add the entry to `content/projects/*.yaml`
  (validated by `src/data/schema.ts` / `z.strictObject`, checked in CI).

GitHub issue forms **cannot** do conditional fields. The existing convention
for type-specific fields (e.g. `github-owner`) is: conditional + required in
the in-app form (`showWhen`), but always-shown + optional in the YAML, labeled
"(repos only)". We follow that same convention.

## Decisions

- **What to add:** a required relationship-type **dropdown** plus a required
  free-text **"how"** field (not copy-only, not free-text-only).
- **Scope:** **Ecosystem only**. "Powered by Venice" is left unchanged.
- **Surfaces:** all of them — in-app form, GitHub issue template (+ checklist),
  and guidelines/docs.
- **Data model:** the two new fields are **review-time signals, not persisted
  data**. They are intentionally NOT added to `src/data/schema.ts` or
  `content/*.yaml`. The site surfaces no "why it's Venice-related" anywhere, so
  persisting them would add data-model + CI surface for no display value
  (YAGNI). They live only in the GitHub issue body for maintainers to vet.

## Design

### 1. In-app form — two new conditional fields (`src/submitSchemas.ts`)

Insert directly after the existing `category` field in the `project` type's
`fields` array. Both are shown only when category equals the Ecosystem option
string.

```ts
{
  id: 'venice-relationship',
  label: 'Venice relationship',
  type: 'select',
  required: true,
  description:
    'Ecosystem projects must have a specific Venice focus — not a general tool that Venice users could also use (e.g. Google Docs).',
  options: [
    'Tooling / SDK for Venice builders',
    'Community asset (e.g. Venice X account, token)',
    'Content / education about Venice',
    'Other (explain below)',
  ],
  showWhen: f => f.category === 'Ecosystem (built for the Venice community)',
},
{
  id: 'venice-connection',
  label: 'How is this built for Venice?',
  type: 'textarea',
  required: true,
  placeholder:
    "Explain the specific Venice connection — who in the Venice community uses it, and why a general AI tool wouldn't serve the same purpose.",
  showWhen: f => f.category === 'Ecosystem (built for the Venice community)',
},
```

Also add a `description` to the existing `category` field (it currently has
none) stating the Ecosystem bar succinctly.

**No `SubmitDialog.tsx` changes required.** `validate()` already iterates
`visibleFields`, and `buildIssueUrl()` already skips fields whose `showWhen` is
false — so prefill omits these fields for non-Ecosystem submissions.

### 2. GitHub issue template (`.github/ISSUE_TEMPLATE/submit-project.yml`)

After the `category` dropdown, add two always-shown, **optional** fields
labeled "(Ecosystem only)", matching the "(repos only)" convention:

- `venice-relationship` — dropdown with the same four options.
- `venice-connection` — textarea, "How is this built for Venice? (Ecosystem only)".

Both `required: false` (issue forms can't conditionally require). Sharpen the
existing `category` dropdown `description` to state the Ecosystem bar and name
the Google-Docs-style anti-example.

### 3. Quality Checklist (same YAML file)

Replace the current item —

> "This project offers functionality beyond the base Venice platform, OR is a
> community asset (X account) that complements it."

— with a sharper required attestation:

> "This project has a specific focus on Venice — powered by Venice or built for
> the Venice community — not a general-purpose tool that Venice users could
> also use (e.g. Google Docs)."

### 4. Guidelines & docs (copy only)

- `src/components/sections/SubmissionGuidelines.tsx` — strengthen item #1 ("Be
  clearly connected to Venice") with the "a general tool Venice users could
  also use does not qualify" exclusion.
- `CONTRIBUTING.md` — sharpen the `ecosystem` category definition (~line 37)
  with the same exclusion.
- `README.md` — update the "Clearly connected to Venice" submission-guidelines
  bullet with the exclusion.
- `public/agent-skill.md` — document the two new fields and sharpen the
  `category` guidance so agent-driven submissions meet the same bar.

## Out of scope

- Persisting the new fields to the data model / `content/*.yaml` / CI schema.
- Any backend validation or automated relevance gating.
- Changes to non-project submission types (cookbook, event, media).
- Re-classifying or editing already-published submissions (separate cleanup).

## Testing

- Unit: extend `submitSchemas` coverage — `buildIssueUrl` includes the two
  fields when category is Ecosystem and omits them otherwise; `showWhen`
  predicates behave for both category values.
- Manual: in the in-app form, selecting Ecosystem reveals + requires both
  fields; selecting Powered by Venice hides them; submit blocks until both are
  filled for Ecosystem.
- Build/CI: `npm run build` + `npm test` stay green (no schema/CI changes
  expected, confirming the data-model boundary held).

## Key files

| Purpose | Path |
|---|---|
| Form field definitions | `src/submitSchemas.ts` |
| Form renderer / validation | `src/components/SubmitDialog.tsx` |
| GitHub issue template + checklist | `.github/ISSUE_TEMPLATE/submit-project.yml` |
| Public guidelines page | `src/components/sections/SubmissionGuidelines.tsx` |
| Contribution docs | `CONTRIBUTING.md` |
| Readme | `README.md` |
| Agent submission guide | `public/agent-skill.md` |
| Data model (intentionally untouched) | `src/data/schema.ts` |
