import { z } from 'zod';

// YAML parsers (including @modyfi/vite-plugin-yaml) deserialise bare ISO dates
// like `2026-06-29` as JS Date objects.  This helper coerces them to YYYY-MM-DD
// strings so the rest of the app always sees plain strings.
const dateString = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string(),
);
const optionalDateString = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string().optional(),
);

// ── Shared ──────────────────────────────────────────────
export const socialKinds = [
  'x', 'github', 'website', 'farcaster', 'instagram',
  'telegram', 'discord', 'youtube', 'tiktok', 'warpcast', 'token',
] as const;

export const socialSchema = z.strictObject({
  kind: z.enum(socialKinds),
  url: z.url(),
  label: z.string().optional(),
});

const projectCategory = z.enum(['ecosystem', 'powered-by']);
const tokenChain = z.enum(['solana', 'base', 'ethereum']);

// GitHub owner/repo path segments. Constrained to a safe charset (no slashes or
// path separators) so they can't traverse outside the preview dir or escape the
// GitHub API path when interpolated into URLs/filesystem paths downstream.
const ghSegment = z.string().regex(/^[A-Za-z0-9._-]+$/, 'invalid GitHub owner/repo segment');

const baseProject = {
  title: z.string(),
  description: z.string(),
  url: z.url(),
  tags: z.array(z.string()),
  category: projectCategory,
  submittedBy: z.string().optional(),
  featured: z.literal(true).optional(),
  socials: z.array(socialSchema).optional(),
  thumbnail: z.string().optional(),
};

export const websiteProjectSchema = z.strictObject({ ...baseProject, type: z.literal('Website') });
export const repoProjectSchema = z.strictObject({
  ...baseProject,
  type: z.literal('GitHub Repo'),
  owner: ghSegment,
  repo: ghSegment,
  stars: z.number().int().nonnegative().optional(),
  forks: z.number().int().nonnegative().optional(),
  language: z.string().optional(),
});
export const xAccountProjectSchema = z.strictObject({
  ...baseProject,
  type: z.literal('X Account'),
  handle: z.string(),
  followers: z.number().int().nonnegative().optional(),
  bio: z.string().optional(),
});
export const tokenProjectSchema = z.strictObject({
  ...baseProject,
  type: z.literal('Token'),
  ticker: z.string(),
  address: z.string(),
  chain: tokenChain,
  marketCap: z.number().nonnegative().optional(),
  holders: z.number().int().nonnegative().optional(),
});

export const projectSchema = z.discriminatedUnion('type', [
  websiteProjectSchema,
  repoProjectSchema,
  xAccountProjectSchema,
  tokenProjectSchema,
]);

// ── Events ──────────────────────────────────────────────
export const eventSchema = z.strictObject({
  title: z.string(),
  description: z.string(),
  url: z.url(),
  kind: z.enum(['hackathon', 'meetup', 'conference', 'workshop']),
  status: z.enum(['upcoming', 'live', 'past']),
  startDate: dateString,
  endDate: optionalDateString,
  location: z.string(),
  host: z.string(),
  prize: z.string().optional(),
  tags: z.array(z.string()),
  featured: z.literal(true).optional(),
  thumbnail: z.string().optional(),
});

// ── Cookbooks ───────────────────────────────────────────
export const cookbookSchema = z.strictObject({
  title: z.string(),
  description: z.string(),
  url: z.url(),
  author: z.string(),
  authorUrl: z.url().optional(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  readTime: z.string(),
  language: z.string().optional(),
  tags: z.array(z.string()),
  publishedAt: dateString,
  featured: z.literal(true).optional(),
  thumbnail: z.string().optional(),
});

// ── Media ───────────────────────────────────────────────
export const mediaSchema = z.strictObject({
  title: z.string(),
  builder: z.string(),
  description: z.string(),
  url: z.url(),
  thumbnail: z.string().optional(),
  publishedAt: dateString,
  tags: z.array(z.string()),
  featured: z.literal(true).optional(),
});

// ── Official resources ──────────────────────────────────
const officialBase = {
  title: z.string(),
  description: z.string(),
  url: z.url(),
  order: z.number().int().nonnegative(),
};
export const officialRepoSchema = z.strictObject({
  ...officialBase,
  kind: z.literal('Repository'),
  slug: z.string(),
});
export const officialDocsSchema = z.strictObject({ ...officialBase, kind: z.literal('Docs') });
export const officialPricingSchema = z.strictObject({ ...officialBase, kind: z.literal('Pricing') });
export const officialResourceSchema = z.discriminatedUnion('kind', [
  officialRepoSchema,
  officialDocsSchema,
  officialPricingSchema,
]);

// ── Inferred types (single source of truth) ─────────────
export type Social = z.infer<typeof socialSchema>;
export type SocialKind = (typeof socialKinds)[number];
export type ProjectCategory = z.infer<typeof projectCategory>;
export type TokenChain = z.infer<typeof tokenChain>;
export type WebsiteProject = z.infer<typeof websiteProjectSchema>;
export type RepoProject = z.infer<typeof repoProjectSchema>;
export type XAccountProject = z.infer<typeof xAccountProjectSchema>;
export type TokenProject = z.infer<typeof tokenProjectSchema>;
export type Project = z.infer<typeof projectSchema>;

export type VeniceEvent = z.infer<typeof eventSchema>;
export type EventKind = VeniceEvent['kind'];
export type EventStatus = VeniceEvent['status'];

export type Cookbook = z.infer<typeof cookbookSchema>;
export type CookbookDifficulty = Cookbook['difficulty'];

export type Media = z.infer<typeof mediaSchema>;

export type OfficialRepoResource = z.infer<typeof officialRepoSchema>;
export type OfficialLinkResource = z.infer<typeof officialDocsSchema> | z.infer<typeof officialPricingSchema>;
export type OfficialResource = z.infer<typeof officialResourceSchema>;
export type OfficialResourceKind = OfficialResource['kind'];
