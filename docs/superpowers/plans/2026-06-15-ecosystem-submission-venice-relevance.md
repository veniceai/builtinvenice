# Stricter Venice-relevance for Ecosystem submissions — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When a submitter selects the "Ecosystem" project category, require a structured Venice-relationship dropdown plus a free-text justification, and sharpen the "must be Venice-specific" policy copy across the form, GitHub issue template, and guidelines.

**Architecture:** The submission flow is client-only: a schema-driven in-app form (`src/submitSchemas.ts` + `SubmitDialog.tsx`) prefills a GitHub issue (`submit-project.yml`) that maintainers review. We add two conditional fields to the form (shown only for Ecosystem via the existing `showWhen` mechanism), mirror them as always-shown-but-optional fields in the issue template (issue forms can't do conditionals — same convention as the existing "(repos only)" fields), and update copy. The two new fields are review-time signals only and are intentionally NOT persisted to the data model (`src/data/schema.ts`) or `content/*.yaml`.

**Tech Stack:** React 19 + TypeScript + Vite, Vitest (+ @testing-library/react), Zod (untouched here), GitHub issue forms (YAML).

---

## File Structure

- `src/submitSchemas.ts` — add an `ECOSYSTEM_CATEGORY` constant, a sharpened `description` on the existing `category` field, and two new conditional fields (`venice-relationship`, `venice-connection`). **Modify.**
- `src/submitSchemas.test.ts` — add coverage that `buildIssueUrl` includes the two fields only for Ecosystem. **Modify.**
- `src/components/SubmitDialog.test.tsx` — add coverage that the fields appear/disappear with the category selection. **Modify.**
- `.github/ISSUE_TEMPLATE/submit-project.yml` — add the two fields (optional, "(Ecosystem only)"), sharpen the category dropdown description, replace the weak quality-checklist item. **Modify.**
- `src/components/sections/SubmissionGuidelines.tsx` — strengthen guideline #1. **Modify.**
- `CONTRIBUTING.md`, `README.md`, `public/agent-skill.md` — copy edits. **Modify.**

No new files. `SubmitDialog.tsx` itself needs **no change** — `validate()` already enforces `required` only on visible fields, and `buildIssueUrl()` already honors `showWhen`.

---

## Task 1: Add the two conditional fields to the in-app form schema

**Files:**
- Modify: `src/submitSchemas.ts` (constant near line 28; `category` field at lines 48-57; insert new fields after it)
- Test: `src/submitSchemas.test.ts`

- [ ] **Step 1: Write the failing tests**

Add these to the `describe('buildIssueUrl', ...)` block in `src/submitSchemas.test.ts` (after the existing X Account test, before the closing `});` of that block):

```ts
  it('includes the Venice-relationship fields when category is Ecosystem', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': 'Foo',
      'project-type': 'Website',
      category: 'Ecosystem (built for the Venice community)',
      'venice-relationship': 'Tooling / SDK for Venice builders',
      'venice-connection': 'A CLI that wraps the Venice API for builders.',
    });
    const params = new URL(url).searchParams;
    expect(params.get('venice-relationship')).toBe('Tooling / SDK for Venice builders');
    expect(params.get('venice-connection')).toBe('A CLI that wraps the Venice API for builders.');
  });

  it('drops the Venice-relationship fields when category is Powered by Venice', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': 'Foo',
      'project-type': 'Website',
      category: 'Powered by Venice (uses the Venice API)',
      'venice-relationship': 'shouldnotappear',
      'venice-connection': 'shouldnotappear',
    });
    const params = new URL(url).searchParams;
    expect(params.has('venice-relationship')).toBe(false);
    expect(params.has('venice-connection')).toBe(false);
  });
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- src/submitSchemas.test.ts`
Expected: FAIL — the two new assertions fail because the fields don't exist yet (`venice-relationship` is not in the schema, so `buildIssueUrl` never emits it; the "includes" test fails its `.toBe(...)` assertion).

- [ ] **Step 3: Add the `ECOSYSTEM_CATEGORY` constant**

In `src/submitSchemas.ts`, just below the existing `const PROJECT_TYPE = 'project-type';` (line 28), add:

```ts
// Exact option string for the Ecosystem category. Referenced by both the
// category field's options and the showWhen predicates below so they can't drift.
const ECOSYSTEM_CATEGORY = 'Ecosystem (built for the Venice community)';
```

- [ ] **Step 4: Update the `category` field and insert the two new fields**

In the `project` type's `fields` array, replace the existing `category` field block (lines 48-57) with the following — it adds a `description`, switches the hardcoded Ecosystem option to the constant, and appends the two conditional fields:

```ts
      {
        id: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        description:
          'Ecosystem projects must be built specifically for Venice — not a general tool that Venice users could also use (e.g. Google Docs).',
        options: [
          ECOSYSTEM_CATEGORY,
          'Powered by Venice (uses the Venice API)',
        ],
      },
      {
        id: 'venice-relationship',
        label: 'Venice relationship',
        type: 'select',
        required: true,
        description: 'Pick the way this project is built for the Venice community.',
        options: [
          'Tooling / SDK for Venice builders',
          'Community asset (e.g. Venice X account, token)',
          'Content / education about Venice',
          'Other (explain below)',
        ],
        showWhen: f => f.category === ECOSYSTEM_CATEGORY,
      },
      {
        id: 'venice-connection',
        label: 'How is this built for Venice?',
        type: 'textarea',
        required: true,
        placeholder:
          "Explain the specific Venice connection — who in the Venice community uses it, and why a general AI tool wouldn't serve the same purpose.",
        showWhen: f => f.category === ECOSYSTEM_CATEGORY,
      },
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- src/submitSchemas.test.ts`
Expected: PASS — all tests, including the two new ones and the existing `submissionTypes` invariants (unique ids, select fields have options).

- [ ] **Step 6: Commit**

```bash
git add src/submitSchemas.ts src/submitSchemas.test.ts
git commit -m "feat: collect Venice relationship + justification for Ecosystem submissions"
```

---

## Task 2: Verify conditional show/require in the form component

`SubmitDialog.tsx` needs no code change — this task pins the behavior with tests so a future schema edit can't silently break it.

**Files:**
- Test: `src/components/SubmitDialog.test.tsx`

- [ ] **Step 1: Write the failing tests**

Add this block to `src/components/SubmitDialog.test.tsx` (append after the existing `describe('SubmitDialog — submission without image', ...)` block):

```tsx
describe('SubmitDialog — Ecosystem Venice fields', () => {
  it('reveals the Venice-relationship fields when Ecosystem is selected', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    expect(screen.queryByLabelText(/How is this built for Venice/)).toBeNull();
    await user.selectOptions(
      screen.getByLabelText(/^Category/),
      'Ecosystem (built for the Venice community)',
    );
    expect(screen.getByLabelText(/^Venice relationship/)).toBeInTheDocument();
    expect(screen.getByLabelText(/How is this built for Venice/)).toBeInTheDocument();
  });

  it('keeps the Venice-relationship fields hidden for Powered by Venice', async () => {
    const user = userEvent.setup();
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    await user.selectOptions(
      screen.getByLabelText(/^Category/),
      'Powered by Venice (uses the Venice API)',
    );
    expect(screen.queryByLabelText(/^Venice relationship/)).toBeNull();
    expect(screen.queryByLabelText(/How is this built for Venice/)).toBeNull();
  });

  it('blocks submission until the Ecosystem fields are filled', async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
    render(<SubmitDialog onClose={() => {}} initialKey="project" />);
    await user.type(screen.getByLabelText(/^Project name/), 'Foo');
    await user.selectOptions(screen.getByLabelText(/^Project type/), 'Website');
    await user.type(screen.getByLabelText(/^Project URL/), 'https://foo.dev');
    await user.selectOptions(
      screen.getByLabelText(/^Category/),
      'Ecosystem (built for the Venice community)',
    );
    await user.type(screen.getByLabelText(/^Description/), 'Does a thing.');
    await user.type(screen.getByLabelText(/^Tags/), 'SDK');
    // venice-relationship + venice-connection left blank
    await user.click(screen.getByRole('button', { name: /Open prefilled issue/ }));
    expect(openSpy).not.toHaveBeenCalled();
    expect(screen.getAllByText('Required').length).toBeGreaterThan(0);
    openSpy.mockRestore();
  });
});
```

- [ ] **Step 2: Run the tests**

Run: `npm test -- src/components/SubmitDialog.test.tsx`
Expected: PASS (Task 1 already added the fields with `showWhen` + `required`, which is exactly what these tests assert). If the "reveals" or "blocks" test fails, the schema field ids/labels from Task 1 don't match — reconcile labels with `src/submitSchemas.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/components/SubmitDialog.test.tsx
git commit -m "test: pin Ecosystem-only Venice field show/require behavior"
```

---

## Task 3: Mirror the fields in the GitHub issue template + harden the checklist

**Files:**
- Modify: `.github/ISSUE_TEMPLATE/submit-project.yml` (category dropdown lines 34-43; insert after it; checklist lines 144-154)

- [ ] **Step 1: Sharpen the category description and add the two fields**

Replace the existing `category` dropdown block (lines 34-43) with the following. It sharpens the `description` and appends the two always-shown, optional, "(Ecosystem only)" fields immediately after:

```yaml
  - type: dropdown
    id: category
    attributes:
      label: Category
      description: "Ecosystem = built specifically for the Venice community (tools, SDKs, content, assets). Powered by Venice = apps that use the Venice API. An Ecosystem project must have a specific Venice focus — not a general tool that Venice users could also use (e.g. Google Docs)."
      options:
        - "Ecosystem (built for the Venice community)"
        - "Powered by Venice (uses the Venice API)"
    validations:
      required: true

  - type: dropdown
    id: venice-relationship
    attributes:
      label: Venice relationship (Ecosystem only)
      description: How this project is built for the Venice community. Leave blank for Powered by Venice.
      options:
        - "Tooling / SDK for Venice builders"
        - "Community asset (e.g. Venice X account, token)"
        - "Content / education about Venice"
        - "Other (explain below)"

  - type: textarea
    id: venice-connection
    attributes:
      label: How is this built for Venice? (Ecosystem only)
      description: Explain the specific Venice connection — who in the Venice community uses it, and why a general AI tool wouldn't serve the same purpose. Leave blank for Powered by Venice.
      placeholder: This SDK wraps the Venice API so community builders can…
```

- [ ] **Step 2: Replace the weak quality-checklist item**

In the `quality` checkboxes block (lines 144-154), replace this item —

```yaml
        - label: This project offers functionality beyond the base Venice platform, OR is a community asset (X account) that complements it.
          required: true
```

— with:

```yaml
        - label: This project has a specific focus on Venice — powered by Venice or built for the Venice community — not a general-purpose tool that Venice users could also use (e.g. Google Docs).
          required: true
```

- [ ] **Step 3: Validate the YAML parses**

Run: `node -e "const fs=require('fs');const t=fs.readFileSync('.github/ISSUE_TEMPLATE/submit-project.yml','utf8');require('child_process').execSync('npx --yes js-yaml .github/ISSUE_TEMPLATE/submit-project.yml',{stdio:'inherit'})"`

If `js-yaml` is unavailable offline, instead eyeball that indentation matches the surrounding blocks (6 spaces under `attributes:`, list items under `options:` aligned with existing entries) and that the new field ids (`venice-relationship`, `venice-connection`) exactly match the schema ids from Task 1.
Expected: no parse error / valid YAML printed.

- [ ] **Step 4: Commit**

```bash
git add .github/ISSUE_TEMPLATE/submit-project.yml
git commit -m "feat: add Ecosystem Venice-relationship fields to issue template"
```

---

## Task 4: Update guidelines page and docs (copy only)

**Files:**
- Modify: `src/components/sections/SubmissionGuidelines.tsx` (item #1, lines 4-12)
- Modify: `CONTRIBUTING.md` (line 37)
- Modify: `README.md` ("Clearly connected to Venice" bullet under "Submission guidelines")
- Modify: `public/agent-skill.md` (category row, line 56)

- [ ] **Step 1: Strengthen guideline #1 on the public page**

In `src/components/sections/SubmissionGuidelines.tsx`, replace the first entry's `body` (lines 6-11) with:

```tsx
      <>
        It should use Venice, integrate with Venice, teach people how to use Venice, or support the Venice ecosystem. A general-purpose tool that Venice users could also use — but that has no specific Venice focus (e.g. Google Docs) — doesn't qualify. If you're using Venice's name or marks, check the{' '}
        <a href="https://venice.ai/brand">Venice Brand Kit</a> to keep things consistent.
      </>
```

- [ ] **Step 2: Sharpen the `ecosystem` definition in CONTRIBUTING.md**

In `CONTRIBUTING.md`, replace line 37:

```markdown
- **`ecosystem`** — Tools, dashboards, SDKs, content, and community assets built *for* the Venice community (e.g. VeniceStats, a language SDK, a community X account).
```

with:

```markdown
- **`ecosystem`** — Tools, dashboards, SDKs, content, and community assets built *specifically for* the Venice community (e.g. VeniceStats, a language SDK, a community X account). It must have a specific Venice focus — a general-purpose tool that Venice users could also use, but isn't built for Venice (e.g. Google Docs), doesn't qualify.
```

- [ ] **Step 3: Update the README submission bullet**

In `README.md`, under "### Submission guidelines", replace the bullet:

```markdown
- **Clearly connected to Venice** — uses, integrates with, teaches, or supports the Venice ecosystem.
```

with:

```markdown
- **Clearly connected to Venice** — uses, integrates with, teaches, or supports the Venice ecosystem. A general tool that Venice users could also use but has no specific Venice focus (e.g. Google Docs) doesn't qualify.
```

- [ ] **Step 4: Update the agent-skill.md category guidance**

In `public/agent-skill.md`, replace the `category` table row (line 56):

```markdown
| `category`      | yes      | `"ecosystem"` (maintained by/with Venice) or `"powered-by"` (built on Venice). |
```

with:

```markdown
| `category`      | yes      | `"ecosystem"` (built specifically for the Venice community) or `"powered-by"` (uses the Venice API). `ecosystem` must have a specific Venice focus — a general tool Venice users could also use (e.g. Google Docs) doesn't qualify. The issue form asks ecosystem submissions for a `venice-relationship` (one of: Tooling / SDK for Venice builders; Community asset; Content / education about Venice; Other) and a free-text `venice-connection` explaining the tie to Venice. |
```

- [ ] **Step 5: Verify the page still builds and renders**

Run: `npm run build`
Expected: PASS — TypeScript compiles and Vite builds (catches any JSX typo in `SubmissionGuidelines.tsx`).

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/SubmissionGuidelines.tsx CONTRIBUTING.md README.md public/agent-skill.md
git commit -m "docs: require a specific Venice focus for Ecosystem submissions"
```

---

## Task 5: Full verification

**Files:** none (verification only)

- [ ] **Step 1: Run the full test suite**

Run: `npm test`
Expected: PASS — all suites green, including the new `submitSchemas` and `SubmitDialog` tests.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: PASS — `tsc -b` reports no type errors and `vite build` completes.

- [ ] **Step 3: Manual smoke check (optional but recommended)**

Run: `npm run dev`, open the site, click "Submit your work" → Project. Confirm:
- Selecting **Ecosystem** reveals "Venice relationship" (required) and "How is this built for Venice?" (required); submit is blocked until both are filled.
- Selecting **Powered by Venice** hides both fields and lets you submit without them.
- The "Open prefilled issue" button produces a GitHub issue URL that includes `venice-relationship` / `venice-connection` only for Ecosystem.

- [ ] **Step 4: Confirm the data model was left untouched**

Run: `git diff main --stat -- src/data`
Expected: no output — `src/data/schema.ts` and friends are unchanged, confirming the intentional data-model boundary held.

---

## Self-Review notes

- **Spec coverage:** dropdown + free-text field (Task 1), Ecosystem-only via `showWhen`/`(Ecosystem only)` (Tasks 1, 3), in-app form (Task 1), issue template + checklist (Task 3), guidelines/README/CONTRIBUTING/agent-skill (Task 4), data model untouched (verified Task 5 Step 4). All spec sections map to a task.
- **No placeholders:** every code/copy step shows exact before/after text and exact commands.
- **Type/id consistency:** field ids `venice-relationship` and `venice-connection` are used identically across the schema (Task 1), component tests (Task 2), and the YAML template (Task 3); the option strings match between `submitSchemas.ts` and `submit-project.yml`; `ECOSYSTEM_CATEGORY` is the single source for the Ecosystem option string used in both `options` and `showWhen`.
