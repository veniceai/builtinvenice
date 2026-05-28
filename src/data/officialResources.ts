export type OfficialResourceKind = 'Repository' | 'Docs' | 'Pricing';

interface BaseOfficialResource {
  title: string;
  description: string;
  url: string;
}

export interface OfficialRepoResource extends BaseOfficialResource {
  kind: 'Repository';
  /** owner/repo slug — surfaces as the small mono label on the card */
  slug: string;
}

export interface OfficialLinkResource extends BaseOfficialResource {
  kind: 'Docs' | 'Pricing';
}

export type OfficialResource = OfficialRepoResource | OfficialLinkResource;

export const officialRepos: OfficialRepoResource[] = [
  {
    title: 'MCP server',
    description: 'Connect Venice models to MCP-compatible agents and clients.',
    url: 'https://github.com/veniceai/venice-mcp-server',
    kind: 'Repository',
    slug: 'veniceai/venice-mcp-server',
  },
  {
    title: 'Venice CLI',
    description: 'A command-line interface for Venice from local scripts and terminals.',
    url: 'https://github.com/veniceai/venice-cli',
    kind: 'Repository',
    slug: 'veniceai/venice-cli',
  },
  {
    title: 'x402 client',
    description: 'Official client utilities for building x402 payment flows.',
    url: 'https://github.com/veniceai/x402-client',
    kind: 'Repository',
    slug: 'veniceai/x402-client',
  },
  {
    title: 'Venice Skills',
    description: 'Reusable agent skills for supported coding tools.',
    url: 'https://github.com/veniceai/skills',
    kind: 'Repository',
    slug: 'veniceai/skills',
  },
];

export const officialLinks: OfficialLinkResource[] = [
  {
    title: 'Docs',
    description: 'Official documentation hub.',
    url: 'https://docs.venice.ai',
    kind: 'Docs',
  },
  {
    title: 'Getting started',
    description: 'Your first Venice API request.',
    url: 'https://docs.venice.ai/overview/getting-started',
    kind: 'Docs',
  },
  {
    title: 'API',
    description: 'Endpoints, schemas, and API behavior.',
    url: 'https://docs.venice.ai/api-reference',
    kind: 'Docs',
  },
  {
    title: 'Pricing',
    description: 'Plans and API pricing.',
    url: 'https://docs.venice.ai/overview/pricing',
    kind: 'Pricing',
  },
];

export const officialResources: OfficialResource[] = [...officialRepos, ...officialLinks];
