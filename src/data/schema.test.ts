import { describe, expect, it } from 'vitest';
import {
  projectSchema,
  eventSchema,
  cookbookSchema,
  mediaSchema,
  officialResourceSchema,
} from './schema';

describe('projectSchema', () => {
  it('accepts a valid GitHub Repo project', () => {
    const r = projectSchema.safeParse({
      title: 'llm-venice',
      description: 'Venice plugin for the llm CLI.',
      type: 'GitHub Repo',
      url: 'https://github.com/ar-jan/llm-venice',
      tags: ['CLI', 'Plugin'],
      category: 'ecosystem',
      owner: 'ar-jan',
      repo: 'llm-venice',
      stars: 24,
    });
    expect(r.success).toBe(true);
  });

  it('rejects an unknown project type', () => {
    const r = projectSchema.safeParse({
      title: 'x', description: 'y', type: 'Podcast',
      url: 'https://example.com', tags: ['a'], category: 'ecosystem',
    });
    expect(r.success).toBe(false);
  });

  it('rejects a GitHub Repo missing owner/repo', () => {
    const r = projectSchema.safeParse({
      title: 'x', description: 'y', type: 'GitHub Repo',
      url: 'https://example.com', tags: ['a'], category: 'ecosystem',
    });
    expect(r.success).toBe(false);
  });

  it('accepts a Token project', () => {
    const r = projectSchema.safeParse({
      title: '$VVV', description: 'token', type: 'Token',
      url: 'https://example.com', tags: ['Token'], category: 'powered-by',
      ticker: 'VVV', address: '0xabc', chain: 'base',
    });
    expect(r.success).toBe(true);
  });

  it('rejects unknown keys (strict object catches typos / over-posting)', () => {
    const r = projectSchema.safeParse({
      title: 'x', description: 'y', type: 'Website',
      url: 'https://example.com', tags: ['a'], category: 'ecosystem',
      featuerd: true, // typo'd field must fail, not be silently dropped
    });
    expect(r.success).toBe(false);
  });

  it('rejects a GitHub Repo whose owner/repo could traverse paths', () => {
    const base = {
      title: 'x', description: 'y', type: 'GitHub Repo' as const,
      url: 'https://example.com', tags: ['a'], category: 'ecosystem' as const,
    };
    expect(projectSchema.safeParse({ ...base, owner: '../../etc', repo: 'foo' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...base, owner: 'foo', repo: 'a/b' }).success).toBe(false);
    expect(projectSchema.safeParse({ ...base, owner: 'ar-jan', repo: 'llm-venice' }).success).toBe(true);
  });

  it('rejects negative counts', () => {
    const base = {
      title: 'x', description: 'y', type: 'GitHub Repo' as const,
      url: 'https://example.com', tags: ['a'], category: 'ecosystem' as const,
      owner: 'o', repo: 'r',
    };
    expect(projectSchema.safeParse({ ...base, stars: -1 }).success).toBe(false);
    expect(projectSchema.safeParse({ ...base, stars: 0 }).success).toBe(true);
  });
});

describe('other section schemas', () => {
  it('accepts a valid event', () => {
    expect(eventSchema.safeParse({
      title: 'Hack', description: 'd', url: 'https://e.com',
      kind: 'hackathon', status: 'live', startDate: '2026-05-15',
      location: 'Online', host: 'Venice', tags: ['Hackathon'],
    }).success).toBe(true);
  });

  it('accepts a valid cookbook', () => {
    expect(cookbookSchema.safeParse({
      title: 'Quickstart', description: 'd', url: 'https://d.com',
      author: 'Venice.ai', difficulty: 'beginner', readTime: '10 min',
      tags: ['API'], publishedAt: '2026-04-01',
    }).success).toBe(true);
  });

  it('accepts a valid media item', () => {
    expect(mediaSchema.safeParse({
      title: 'Intro', builder: 'Venice.ai', description: 'd',
      url: 'https://y.com', publishedAt: '2024-09-03', tags: ['Video'],
    }).success).toBe(true);
  });

  it('accepts a Repository official resource and rejects bad kind', () => {
    expect(officialResourceSchema.safeParse({
      title: 'MCP', description: 'd', url: 'https://g.com',
      kind: 'Repository', slug: 'veniceai/venice-mcp-server', order: 0,
    }).success).toBe(true);
    expect(officialResourceSchema.safeParse({
      title: 'X', description: 'd', url: 'https://g.com', kind: 'Blog', order: 0,
    }).success).toBe(false);
  });
});

describe('strict-object behavior for non-project schemas', () => {
  const validEvent = {
    title: 'Hack', description: 'd', url: 'https://e.com',
    kind: 'hackathon' as const, status: 'live' as const, startDate: '2026-05-15',
    location: 'Online', host: 'Venice', tags: ['Hackathon'],
  };

  it('eventSchema rejects unknown keys', () => {
    expect(eventSchema.safeParse({ ...validEvent, foo: 'bar' }).success).toBe(false);
  });

  it('cookbookSchema rejects unknown keys', () => {
    expect(cookbookSchema.safeParse({
      title: 'X', description: 'd', url: 'https://d.com', author: 'a',
      difficulty: 'beginner', readTime: '5 min', tags: ['x'],
      publishedAt: '2026-04-01', wat: true,
    }).success).toBe(false);
  });

  it('mediaSchema rejects unknown keys', () => {
    expect(mediaSchema.safeParse({
      title: 'X', builder: 'b', description: 'd', url: 'https://y.com',
      publishedAt: '2024-09-03', tags: ['x'], extra: 1,
    }).success).toBe(false);
  });

  it('officialResourceSchema rejects unknown keys (Repository)', () => {
    expect(officialResourceSchema.safeParse({
      title: 'X', description: 'd', url: 'https://g.com',
      kind: 'Repository', slug: 'a/b', order: 0, foo: 'bar',
    }).success).toBe(false);
  });
});

describe('date preprocessing', () => {
  it('eventSchema coerces a Date object into YYYY-MM-DD on startDate', () => {
    const r = eventSchema.safeParse({
      title: 'X', description: 'd', url: 'https://e.com',
      kind: 'meetup', status: 'upcoming', startDate: new Date('2026-07-04T00:00:00Z'),
      location: 'NYC', host: 'h', tags: ['x'],
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.startDate).toBe('2026-07-04');
  });

  it('cookbookSchema coerces a Date object on publishedAt', () => {
    const r = cookbookSchema.safeParse({
      title: 'X', description: 'd', url: 'https://d.com', author: 'a',
      difficulty: 'intermediate', readTime: '5 min', tags: ['x'],
      publishedAt: new Date('2026-04-01T00:00:00Z'),
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.publishedAt).toBe('2026-04-01');
  });

  it('mediaSchema coerces a Date object on publishedAt', () => {
    const r = mediaSchema.safeParse({
      title: 'X', builder: 'b', description: 'd', url: 'https://y.com',
      publishedAt: new Date('2024-09-03T00:00:00Z'), tags: ['x'],
    });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.publishedAt).toBe('2024-09-03');
  });

  it('eventSchema endDate stays optional', () => {
    const r = eventSchema.safeParse({
      title: 'X', description: 'd', url: 'https://e.com',
      kind: 'meetup', status: 'upcoming', startDate: '2026-07-04',
      location: 'NYC', host: 'h', tags: ['x'],
    });
    expect(r.success).toBe(true);
  });
});

describe('officialResourceSchema discrimination', () => {
  it('accepts a Docs resource without slug', () => {
    expect(officialResourceSchema.safeParse({
      title: 'Docs', description: 'd', url: 'https://docs.example',
      kind: 'Docs', order: 1,
    }).success).toBe(true);
  });

  it('accepts a Pricing resource without slug', () => {
    expect(officialResourceSchema.safeParse({
      title: 'Pricing', description: 'd', url: 'https://x.example',
      kind: 'Pricing', order: 2,
    }).success).toBe(true);
  });

  it('rejects a non-integer order', () => {
    expect(officialResourceSchema.safeParse({
      title: 'X', description: 'd', url: 'https://g.com',
      kind: 'Docs', order: 1.5,
    }).success).toBe(false);
  });
});
