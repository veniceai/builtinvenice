import {
  projectSchema, eventSchema, cookbookSchema, mediaSchema, officialResourceSchema,
  type Project, type VeniceEvent, type Cookbook, type Media,
  type OfficialResource, type OfficialRepoResource, type OfficialLinkResource,
} from './schema';
import type { z } from 'zod';

// Re-export types so consumers keep importing from '../../data'.
export type {
  Project, WebsiteProject, RepoProject, XAccountProject, TokenProject,
  ProjectCategory, Social, SocialKind, TokenChain,
  VeniceEvent, EventKind, EventStatus,
  Cookbook, CookbookDifficulty,
  Media,
  OfficialResource, OfficialRepoResource, OfficialLinkResource, OfficialResourceKind,
} from './schema';

export {
  categoryLabels, langColors, chainLabels, chainColors, socialLabels, difficultyLabels,
} from './maps';

type YamlModule = { default: unknown };

function loadAll<T>(
  modules: Record<string, YamlModule>,
  schema: z.ZodType<T>,
  label: string,
): T[] {
  return Object.entries(modules).map(([path, mod]) => {
    const parsed = schema.safeParse(mod.default);
    if (!parsed.success) {
      throw new Error(`Invalid ${label} entry at ${path}:\n${parsed.error.toString()}`);
    }
    return parsed.data;
  });
}

// Globs are relative to this file: src/data -> ../../content.
const projectModules = import.meta.glob('../../content/projects/*.yaml', { eager: true }) as Record<string, YamlModule>;
const eventModules = import.meta.glob('../../content/events/*.yaml', { eager: true }) as Record<string, YamlModule>;
const cookbookModules = import.meta.glob('../../content/cookbooks/*.yaml', { eager: true }) as Record<string, YamlModule>;
const mediaModules = import.meta.glob('../../content/media/*.yaml', { eager: true }) as Record<string, YamlModule>;
const officialModules = import.meta.glob('../../content/official-resources/*.yaml', { eager: true }) as Record<string, YamlModule>;

function projectWeight(p: Project): number {
  if (p.type === 'GitHub Repo') return p.stars ?? 0;
  if (p.type === 'X Account') return p.followers ?? 0;
  if (p.type === 'Token') return p.marketCap ?? 0;
  return 0;
}

export const projects: Project[] = loadAll(projectModules, projectSchema, 'project')
  .map((p) =>
    p.type === 'GitHub Repo'
      ? { ...p, thumbnail: p.thumbnail ?? `/repo-previews/${p.owner}-${p.repo}.png` }
      : p,
  )
  .sort((a, b) =>
    Number(b.featured ?? false) - Number(a.featured ?? false) ||
    projectWeight(b) - projectWeight(a) ||
    a.title.localeCompare(b.title),
  );

export const events: VeniceEvent[] = loadAll(eventModules, eventSchema, 'event')
  .sort((a, b) =>
    Number(b.featured ?? false) - Number(a.featured ?? false) ||
    a.startDate.localeCompare(b.startDate),
  );

export const cookbooks: Cookbook[] = loadAll(cookbookModules, cookbookSchema, 'cookbook')
  .sort((a, b) =>
    Number(b.featured ?? false) - Number(a.featured ?? false) ||
    b.publishedAt.localeCompare(a.publishedAt),
  );

export const media: Media[] = loadAll(mediaModules, mediaSchema, 'media')
  .sort((a, b) =>
    Number(b.featured ?? false) - Number(a.featured ?? false) ||
    b.publishedAt.localeCompare(a.publishedAt),
  );

const officialAll: OfficialResource[] = loadAll(officialModules, officialResourceSchema, 'official resource')
  .sort((a, b) => a.order - b.order);

export const officialRepos: OfficialRepoResource[] =
  officialAll.filter((r): r is OfficialRepoResource => r.kind === 'Repository');
export const officialLinks: OfficialLinkResource[] =
  officialAll.filter((r): r is OfficialLinkResource => r.kind !== 'Repository');
export const officialResources: OfficialResource[] = [...officialRepos, ...officialLinks];
