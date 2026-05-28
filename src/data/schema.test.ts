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
