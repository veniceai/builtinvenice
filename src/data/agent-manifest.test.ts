import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { z } from 'zod';
import { describe, expect, it } from 'vitest';
import { projectSchema } from './schema';

const MANIFEST = resolve(__dirname, '../../public/.well-known/agent-submit.json');

// Static metadata preserved across regenerations.
const META = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  name: 'builtonvenice-submit',
  version: 3,
  description:
    'Submit a community project to the Built in Venice directory. Submissions land as pull requests (preferred) or issues against veniceai/builtwithvenice.',
  repo: 'https://github.com/veniceai/builtwithvenice',
  site: 'https://builtonvenice.ai',
  skill: 'https://builtonvenice.ai/agent-skill.md',
  issueTemplate:
    'https://github.com/veniceai/builtwithvenice/issues/new?template=submit-project.yml&title=%5BProject%5D+',
  issuePicker: 'https://github.com/veniceai/builtwithvenice/issues/new/choose',
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
