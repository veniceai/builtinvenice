import { describe, expect, it } from 'vitest';
import {
  projects, events, cookbooks, media,
  officialResources, officialRepos, officialLinks,
} from './index';

describe('content loads and is well-formed', () => {
  it('every section is non-empty', () => {
    expect(projects.length).toBeGreaterThan(0);
    expect(events.length).toBeGreaterThan(0);
    expect(cookbooks.length).toBeGreaterThan(0);
    expect(media.length).toBeGreaterThan(0);
    expect(officialResources.length).toBe(officialRepos.length + officialLinks.length);
  });

  it('project URLs are unique', () => {
    const urls = projects.map((p) => p.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('projects are sorted featured-first then by weight desc', () => {
    const score = (p: typeof projects[number]) => {
      const w = p.type === 'GitHub Repo' ? (p.stars ?? 0)
        : p.type === 'X Account' ? (p.followers ?? 0)
        : p.type === 'Token' ? (p.marketCap ?? 0) : 0;
      return [Number(p.featured ?? false), w] as const;
    };
    for (let i = 1; i < projects.length; i++) {
      const [fa, wa] = score(projects[i - 1]);
      const [fb, wb] = score(projects[i]);
      expect(fa >= fb).toBe(true);
      if (fa === fb) expect(wa >= wb).toBe(true);
    }
  });

  it('applies the repo-preview thumbnail default', () => {
    const withDefault = projects.filter(
      (p) => p.type === 'GitHub Repo' && p.thumbnail?.startsWith('/repo-previews/'),
    );
    expect(withDefault.length).toBeGreaterThan(0);
  });

  it('official resources are split by kind and ordered', () => {
    expect(officialRepos.every((r) => r.kind === 'Repository')).toBe(true);
    expect(officialLinks.every((l) => l.kind !== 'Repository')).toBe(true);
  });
});
