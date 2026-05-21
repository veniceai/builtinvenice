#!/usr/bin/env node
// Refreshes stars/forks/language for every repo in src/data/projects.ts STATS map.
// Reads the STATS keys (owner/repo), fetches live GitHub data, rewrites each line in place.
// Also pre-bakes each repo's OG preview into public/repo-previews/<owner>-<repo>.png so the
// site doesn't depend on opengraph.githubassets.com at runtime (it's flaky on cold caches).
// Run via `npm run refresh-projects`. Set GITHUB_TOKEN to avoid the 60-req/hour anon limit.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const FILE = resolve('src/data/projects.ts');
let text = readFileSync(FILE, 'utf8');

const LINE_RE = /"([^"/]+\/[^"]+)": \{ stars: \d+, forks: \d+, language: "[^"]+" \}/g;
const repos = [...text.matchAll(LINE_RE)].map((m) => m[1]);

if (repos.length === 0) {
  console.error('No STATS entries found in', FILE);
  process.exit(1);
}

const headers = {
  'User-Agent': 'venice-media-refresh',
  Accept: 'application/vnd.github+json',
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

const FETCH_TIMEOUT_MS = 15_000;

function fetchWithTimeout(url, options = {}) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: ctrl.signal }).finally(() => clearTimeout(timer));
}

const PREVIEW_DIR = resolve('public/repo-previews');
mkdirSync(PREVIEW_DIR, { recursive: true });

const fetchPreview = async (repo) => {
  const slug = repo.replace('/', '-');
  const out = resolve(PREVIEW_DIR, `${slug}.png`);
  // GitHub's OG renderer occasionally 5xx's or times out; retry once.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(`https://opengraph.githubassets.com/1/${repo}`, {
        headers: { 'User-Agent': 'venice-media-refresh' },
      });
      if (!res.ok) {
        if (attempt === 0) continue;
        return `preview HTTP ${res.status}`;
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1024) {
        if (attempt === 0) continue;
        return `preview too small (${buf.length}b)`;
      }
      writeFileSync(out, buf);
      return `preview ${(buf.length / 1024).toFixed(0)}KB`;
    } catch (err) {
      if (attempt === 0) continue;
      return `preview error: ${err.message}`;
    }
  }
};

console.log(`Refreshing ${repos.length} repos...\n`);
let updated = 0;
let previews = 0;

for (const repo of repos) {
  process.stdout.write(`  ${repo.padEnd(48)} `);
  try {
    const res = await fetchWithTimeout(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) {
      console.log(`skip (HTTP ${res.status})`);
      continue;
    }
    const data = await res.json();
    const stars = data.stargazers_count ?? 0;
    const forks = data.forks_count ?? 0;
    const language = data.language ?? 'Unknown';

    const escaped = repo.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
    const oldRe = new RegExp(
      `"${escaped}": \\{ stars: \\d+, forks: \\d+, language: "[^"]+" \\}`,
    );
    const newLine = `"${repo}": { stars: ${stars}, forks: ${forks}, language: ${JSON.stringify(language)} }`;
    text = text.replace(oldRe, newLine);
    updated += 1;

    const previewMsg = await fetchPreview(repo);
    if (previewMsg.startsWith('preview ') && !previewMsg.includes('HTTP') && !previewMsg.includes('error')) {
      previews += 1;
    }
    console.log(`${stars}⭐  ${forks} forks  ${language.padEnd(14)} ${previewMsg}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

writeFileSync(FILE, text);
console.log(`\nUpdated ${updated}/${repos.length} entries in ${FILE}`);
console.log(`Pre-baked ${previews}/${repos.length} preview images to ${PREVIEW_DIR}`);
if (previews < repos.length) {
  console.log('(missing previews fall back to the owner avatar at runtime)');
}
// suppress unused-import warning when previews already exist
void existsSync;
