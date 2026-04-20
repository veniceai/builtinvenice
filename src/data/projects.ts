export type ProjectCategory = 'ecosystem' | 'powered-by';

export type SocialKind =
  | 'x'
  | 'github'
  | 'website'
  | 'farcaster'
  | 'instagram'
  | 'telegram'
  | 'discord'
  | 'youtube'
  | 'tiktok'
  | 'warpcast'
  | 'token';

export interface Social {
  kind: SocialKind;
  url: string;
  label?: string;
}

export type TokenChain = 'solana' | 'base' | 'ethereum';

interface BaseProject {
  title: string;
  description: string;
  url: string;
  tags: string[];
  category: ProjectCategory;
  submittedBy?: string;
  featured?: true;
  socials?: Social[];
}

export interface WebsiteProject extends BaseProject {
  type: 'Website';
  preview?: string;
}

export interface RepoProject extends BaseProject {
  type: 'GitHub Repo';
  owner: string;
  repo: string;
  stars?: number;
  forks?: number;
  language?: string;
}

export interface XAccountProject extends BaseProject {
  type: 'X Account';
  handle: string;
  followers?: number;
  bio?: string;
}

export interface TokenProject extends BaseProject {
  type: 'Token';
  ticker: string;
  address: string;
  chain: TokenChain;
  marketCap?: number;
  holders?: number;
}

export type Project = WebsiteProject | RepoProject | XAccountProject | TokenProject;

export const projects: Project[] = [
  // ── Venice Ecosystem ─────────────────────────────────
  {
    title: "VeniceStats",
    description: "Real-time analytics dashboard for the Venice network. Track model usage, performance metrics, and ecosystem growth.",
    type: "Website",
    url: "https://venicestats.com",
    tags: ["Analytics", "Dashboard", "Open Source"],
    category: "ecosystem",
    preview: "/preview-venicestats.png",
    submittedBy: "gekko.eth",
    featured: true,
    socials: [
      { kind: 'x', url: 'https://x.com/venicestats' },
      { kind: 'github', url: 'https://github.com/gekko-eth/venicestats' },
    ],
  },
  {
    title: "venice-dev-tools",
    description: "TypeScript SDK for the Venice API with full type safety, streaming support, and extensive examples.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/venice-dev-tools",
    tags: ["SDK", "TypeScript", "Developer Tools"],
    category: "ecosystem",
    stars: 14,
    forks: 2,
    language: "TypeScript",
    owner: "georgeglarson",
    repo: "venice-dev-tools",
    submittedBy: "georgeglarson",
    socials: [
      { kind: 'x', url: 'https://x.com/georgeglarson' },
    ],
  },
  {
    title: "venice-ai",
    description: "Python SDK for Venice.ai. Sync/async support, streaming, and full coverage of chat, image gen, TTS, and embeddings.",
    type: "GitHub Repo",
    url: "https://github.com/sethbang/venice-ai",
    tags: ["SDK", "Python", "Developer Tools"],
    category: "ecosystem",
    stars: 11,
    forks: 4,
    language: "Python",
    owner: "sethbang",
    repo: "venice-ai",
    submittedBy: "sethbang",
  },
  {
    title: "venice-ai-php",
    description: "PHP SDK for Venice AI. Drop-in OpenAI-compatible client for text and image generation.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/venice-ai-php",
    tags: ["SDK", "PHP", "Developer Tools"],
    category: "ecosystem",
    stars: 7,
    forks: 3,
    language: "PHP",
    owner: "georgeglarson",
    repo: "venice-ai-php",
    submittedBy: "georgeglarson",
  },
  {
    title: "@venicebuilds",
    description: "Daily highlights of projects shipping in the Venice ecosystem. Launches, hackathon winners, and builder tips.",
    type: "X Account",
    handle: "venicebuilds",
    url: "https://x.com/venicebuilds",
    followers: 4200,
    bio: "Shipping the private AI frontier, one build at a time.",
    tags: ["Community", "News"],
    category: "ecosystem",
    submittedBy: "venicebuilds",
    socials: [
      { kind: 'farcaster', url: 'https://warpcast.com/venicebuilds' },
      { kind: 'telegram', url: 'https://t.me/venicebuilds' },
      { kind: 'website', url: 'https://venicebuilds.xyz' },
    ],
  },

  // ── Powered by Venice ────────────────────────────────
  {
    title: "openvenice",
    description: "Open-source frontend for Venice AI. Chat, image gen, audio, video, embeddings, and visual workflows in one UI. No backend required.",
    type: "GitHub Repo",
    url: "https://github.com/nikshepsvn/openvenice",
    tags: ["Frontend", "Open Source", "Privacy"],
    category: "powered-by",
    stars: 36,
    forks: 8,
    language: "TypeScript",
    owner: "nikshepsvn",
    repo: "openvenice",
    submittedBy: "nikshepsvn",
    featured: true,
    socials: [
      { kind: 'x', url: 'https://x.com/nikshepsvn' },
      { kind: 'website', url: 'https://openvenice.app' },
    ],
  },
  {
    title: "deep-research-privacy",
    description: "Privacy-first research tool. Venice uncensored models + Brave private search, parallel queries, and structured citations.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/deep-research-privacy",
    tags: ["Research", "Privacy", "Search"],
    category: "powered-by",
    stars: 35,
    forks: 4,
    language: "TypeScript",
    owner: "georgeglarson",
    repo: "deep-research-privacy",
    submittedBy: "georgeglarson",
    featured: true,
  },
  {
    title: "llm-venice",
    description: "Venice AI plugin for the llm CLI. Use Venice models from your terminal alongside other LLM providers.",
    type: "GitHub Repo",
    url: "https://github.com/ar-jan/llm-venice",
    tags: ["CLI", "Plugin", "Developer Tools"],
    category: "powered-by",
    stars: 24,
    forks: 5,
    language: "Python",
    owner: "ar-jan",
    repo: "llm-venice",
    submittedBy: "ar-jan",
  },
  {
    title: "nanoclaw-venice",
    description: "Personal AI assistant on WhatsApp and Telegram. Private, uncensored conversations powered by Venice.",
    type: "GitHub Repo",
    url: "https://github.com/lorenzovenice/nanoclaw-venice",
    tags: ["Bot", "Messaging", "Privacy"],
    category: "powered-by",
    stars: 17,
    forks: 3,
    language: "TypeScript",
    owner: "lorenzovenice",
    repo: "nanoclaw-venice",
    submittedBy: "lorenzovenice",
    socials: [
      { kind: 'telegram', url: 'https://t.me/nanoclaw' },
      { kind: 'x', url: 'https://x.com/lorenzovenice' },
    ],
  },
  {
    title: "venice_ai",
    description: "Home Assistant integration for Venice AI. Private AI conversations in your smart home.",
    type: "GitHub Repo",
    url: "https://github.com/grasponcrypto/venice_ai",
    tags: ["Smart Home", "Integration", "Privacy"],
    category: "powered-by",
    stars: 13,
    forks: 3,
    language: "Python",
    owner: "grasponcrypto",
    repo: "venice_ai",
    submittedBy: "grasponcrypto",
  },
  {
    title: "@uncensoredlab",
    description: "Indie research lab posting daily experiments, jailbreak safety notes, and uncensored-model demos — all built on Venice.",
    type: "X Account",
    handle: "uncensoredlab",
    url: "https://x.com/uncensoredlab",
    followers: 9800,
    bio: "Experiments in private, uncensored, open-model AI.",
    tags: ["Research", "Privacy"],
    category: "powered-by",
    submittedBy: "uncensoredlab",
    socials: [
      { kind: 'farcaster', url: 'https://warpcast.com/uncensoredlab' },
      { kind: 'instagram', url: 'https://instagram.com/uncensoredlab' },
      { kind: 'youtube', url: 'https://youtube.com/@uncensoredlab' },
      { kind: 'github', url: 'https://github.com/uncensoredlab' },
    ],
  },
  {
    title: "$DOGE-DAO",
    description: "Community-run token funding Venice-powered open-source tools. Creators pitch, holders vote, builders get paid in USDC.",
    type: "Token",
    ticker: "DOGEDAO",
    address: "DoGEDAo5UNCensoRedAIbuiLdersLaBtoKen111111111",
    chain: "solana",
    marketCap: 2_400_000,
    holders: 1820,
    url: "https://dexscreener.com/solana/dogedao",
    tags: ["Token", "DAO", "Community"],
    category: "powered-by",
    submittedBy: "dogedao",
    socials: [
      { kind: 'x', url: 'https://x.com/dogedao' },
      { kind: 'telegram', url: 'https://t.me/dogedao' },
      { kind: 'discord', url: 'https://discord.gg/dogedao' },
    ],
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  ecosystem: "Ecosystem",
  'powered-by': "Powered by Venice",
};

export const langColors: Record<string, string> = {
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Rust: '#dea584',
  JavaScript: '#f1e05a',
  Go: '#00ADD8',
  MDX: '#fcb32c',
  HTML: '#e34c26',
  PHP: '#4F5D95',
};

export const chainLabels: Record<TokenChain, string> = {
  solana: 'Solana',
  base: 'Base',
  ethereum: 'Ethereum',
};

export const chainColors: Record<TokenChain, string> = {
  solana: '#9945FF',
  base: '#0052FF',
  ethereum: '#627EEA',
};
