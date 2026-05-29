import { describe, expect, it } from 'vitest';
import { buildIssueUrl, submissionTypes } from './submitSchemas';

const REPO = 'https://github.com/veniceai/builtinvenice';

function typeByKey(key: 'project' | 'cookbook' | 'event' | 'media') {
  const t = submissionTypes.find(t => t.key === key);
  if (!t) throw new Error(`type ${key} not found`);
  return t;
}

describe('buildIssueUrl', () => {
  it('always sets the template param', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {});
    expect(url).toMatch(/[?&]template=submit-project\.yml(&|$)/);
  });

  it('prefixes the title and uses the type-specific titleField', () => {
    const url = buildIssueUrl(REPO, typeByKey('cookbook'), {
      'cookbook-title': 'Quickstart',
    });
    const params = new URL(url).searchParams;
    expect(params.get('title')).toBe('[Cookbook] Quickstart');
  });

  it('emits only the prefix when the titleField is blank', () => {
    const url = buildIssueUrl(REPO, typeByKey('event'), {});
    expect(new URL(url).searchParams.get('title')).toBe('[Event] ');
  });

  it('omits empty/whitespace-only values', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': 'Foo',
      description: '   ',
      tags: '',
    });
    const params = new URL(url).searchParams;
    expect(params.has('description')).toBe(false);
    expect(params.has('tags')).toBe(false);
  });

  it('trims values it does emit', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': '  Foo  ',
    });
    expect(new URL(url).searchParams.get('project-name')).toBe('Foo');
  });

  it('honors showWhen — drops GitHub fields when type is Website', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': 'Foo',
      'project-type': 'Website',
      'github-owner': 'leaked',
      'github-repo': 'leaked',
    });
    const params = new URL(url).searchParams;
    expect(params.has('github-owner')).toBe(false);
    expect(params.has('github-repo')).toBe(false);
  });

  it('honors showWhen — keeps GitHub fields when type is GitHub Repo', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': 'Foo',
      'project-type': 'GitHub Repo',
      'github-owner': 'ar-jan',
      'github-repo': 'llm-venice',
    });
    const params = new URL(url).searchParams;
    expect(params.get('github-owner')).toBe('ar-jan');
    expect(params.get('github-repo')).toBe('llm-venice');
  });

  it('honors showWhen — drops GitHub fields when type is X Account', () => {
    const url = buildIssueUrl(REPO, typeByKey('project'), {
      'project-name': 'Foo',
      'project-type': 'X Account',
      'x-handle': 'me',
      'github-owner': 'shouldnotappear',
    });
    const params = new URL(url).searchParams;
    expect(params.get('x-handle')).toBe('me');
    expect(params.has('github-owner')).toBe(false);
  });

  it('builds against the new-issue endpoint of the provided repo', () => {
    const url = buildIssueUrl(REPO, typeByKey('media'), {});
    expect(url.startsWith(`${REPO}/issues/new?`)).toBe(true);
  });
});
