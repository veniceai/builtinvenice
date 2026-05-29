#!/usr/bin/env node
// Refreshes stars/forks/language for every GitHub Repo entry under content/projects/*.yaml.
// Also pre-bakes each repo's OG preview into public/repo-previews/<owner>-<repo>.png so the
// site doesn't depend on opengraph.githubassets.com at runtime (it's flaky on cold caches).
// Run via `npm run refresh-projects`. Set GITHUB_TOKEN to avoid the 60-req/hour anon limit.

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse, stringify } from 'yaml';

const DIR = resolve('content/projects');
const files = readdirSync(DIR).filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));

// owner/repo flow into a GitHub API URL and a filesystem write path below, so
// reject anything outside the safe GitHub segment charset (no slashes / `..`)
// even though the content schema already enforces this — defense in depth for a
// maintainer-run script that processes contributor-supplied YAML.
const SAFE_SEGMENT = /^[A-Za-z0-9._-]+$/;

const repos = [];
for (const file of files) {
  const path = resolve(DIR, file);
  const data = parse(readFileSync(path, 'utf8'));
  if (data && data.type === 'GitHub Repo' && data.owner && data.repo) {
    if (!SAFE_SEGMENT.test(data.owner) || !SAFE_SEGMENT.test(data.repo)) {
      console.warn(`  skip ${file}: unsafe owner/repo (${data.owner}/${data.repo})`);
      continue;
    }
    repos.push({ path, data, slug: `${data.owner}/${data.repo}` });
  }
}

if (repos.length === 0) {
  console.error('No GitHub Repo entries found in', DIR);
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

const fetchPreview = async (slug) => {
  const out = resolve(PREVIEW_DIR, `${slug.replaceAll('/', '-')}.png`);
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetchWithTimeout(`https://opengraph.githubassets.com/1/${slug}`, {
        headers: { 'User-Agent': 'venice-media-refresh' },
      });
      if (!res.ok) { if (attempt === 0) continue; return `preview HTTP ${res.status}`; }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 1024) { if (attempt === 0) continue; return `preview too small (${buf.length}b)`; }
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

for (const { path, data, slug } of repos) {
  process.stdout.write(`  ${slug.padEnd(48)} `);
  try {
    const res = await fetchWithTimeout(`https://api.github.com/repos/${slug}`, { headers });
    if (!res.ok) { console.log(`skip (HTTP ${res.status})`); continue; }
    const gh = await res.json();
    data.stars = gh.stargazers_count ?? 0;
    data.forks = gh.forks_count ?? 0;
    data.language = gh.language ?? 'Unknown';
    writeFileSync(path, stringify(data), 'utf8');
    updated += 1;

    const previewMsg = await fetchPreview(slug);
    if (previewMsg.startsWith('preview ') && !previewMsg.includes('HTTP') && !previewMsg.includes('error')) {
      previews += 1;
    }
    console.log(`${data.stars}⭐  ${data.forks} forks  ${String(data.language).padEnd(14)} ${previewMsg}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

console.log(`\nUpdated ${updated}/${repos.length} entries in ${DIR}`);
console.log(`Pre-baked ${previews}/${repos.length} preview images to ${PREVIEW_DIR}`);
if (previews < repos.length) {
  console.log('(missing previews fall back to the owner avatar at runtime)');
}
