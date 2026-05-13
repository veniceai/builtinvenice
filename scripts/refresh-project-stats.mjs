#!/usr/bin/env node
// Refreshes stars/forks/language for every repo in src/data/projects.ts STATS map.
// Reads the STATS keys (owner/repo), fetches live GitHub data, rewrites each line in place.
// Run via `npm run refresh-projects`. Set GITHUB_TOKEN to avoid the 60-req/hour anon limit.

import { readFileSync, writeFileSync } from 'node:fs';
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

console.log(`Refreshing ${repos.length} repos...\n`);
let updated = 0;

for (const repo of repos) {
  process.stdout.write(`  ${repo.padEnd(48)} `);
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
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
    console.log(`${stars}⭐  ${forks} forks  ${language}`);
  } catch (err) {
    console.log(`error: ${err.message}`);
  }
}

writeFileSync(FILE, text);
console.log(`\nUpdated ${updated}/${repos.length} entries in ${FILE}`);
