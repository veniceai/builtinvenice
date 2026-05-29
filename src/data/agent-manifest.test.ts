import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';
import { describe, expect, it } from 'vitest';
import { projectSchema } from './schema';
import { AGENT_SKILL_CANONICAL, REPO_SLUG, REPO_URL, SITE_URL } from '../constants';

const MANIFEST = resolve(__dirname, '../../public/.well-known/agent-submit.json');

// Static metadata preserved across regenerations.
const META = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  name: 'builtinvenice-submit',
  version: 3,
  description: `Submit a community project to the Built in Venice directory. Submissions land as pull requests (preferred) or issues against ${REPO_SLUG}.`,
  repo: REPO_URL,
  site: SITE_URL,
  skill: AGENT_SKILL_CANONICAL,
  issueTemplate: `${REPO_URL}/issues/new?template=submit-project.yml&title=%5BProject%5D+`,
  issuePicker: `${REPO_URL}/issues/new/choose`,
  preferredFlow: 'pull-request',
  fallbackFlow: 'github-issue',
  targetDir: 'content/projects/',
};

function buildManifest() {
  return {
    ...META,
    projectSchema: z.toJSONSchema(projectSchema),
  };
}

describe('agent-submit.json', () => {
  it('matches the zod Project schema', () => {
    const expected = JSON.stringify(buildManifest(), null, 2) + '\n';
    if (process.env.UPDATE_MANIFEST) {
      writeFileSync(MANIFEST, expected, 'utf8');
    }
    const actual = readFileSync(MANIFEST, 'utf8');
    expect(actual).toBe(expected);
  });
});
