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

// Live GitHub stats — refresh via `npm run refresh-projects`.
// Keep entries on a single line so the refresh script's regex can rewrite them.
const STATS: Record<string, { stars: number; forks: number; language: string }> = {
  "nikshepsvn/openvenice": { stars: 44, forks: 9, language: "TypeScript" },
  "georgeglarson/deep-research-privacy": { stars: 37, forks: 4, language: "TypeScript" },
  "ar-jan/llm-venice": { stars: 24, forks: 5, language: "Python" },
  "georgeglarson/venice-dev-tools": { stars: 14, forks: 2, language: "TypeScript" },
  "sethbang/venice-ai": { stars: 13, forks: 4, language: "Python" },
  "grasponcrypto/venice_ai": { stars: 13, forks: 3, language: "Python" },
  "13rac1/teep": { stars: 9, forks: 3, language: "Go" },
  "georgeglarson/venice-ai-php": { stars: 7, forks: 3, language: "PHP" },
  "DraconicDragon/ComfyUI-Venice-API": { stars: 6, forks: 1, language: "Python" },
  "KaffeMedFika/YouTube-Transcript-Summarizer": { stars: 6, forks: 0, language: "JavaScript" },
  "mars-llm/claude-venice": { stars: 5, forks: 0, language: "Shell" },
  "georgeglarson/venicecode": { stars: 5, forks: 0, language: "TypeScript" },
  "jooray/venice-e2ee-proxy": { stars: 5, forks: 3, language: "TypeScript" },
  "jooray/video-summarizer": { stars: 4, forks: 0, language: "Python" },
  "presstab/venice_discobot": { stars: 4, forks: 1, language: "Python" },
  "elkimek/venice-e2ee": { stars: 3, forks: 1, language: "TypeScript" },
  "actuallyrizzn/Venice-AI-SDK": { stars: 2, forks: 0, language: "Python" },
  "balresch/veniceresch": { stars: 1, forks: 0, language: "Python" },
  "michaellucasnzl/venice-ai-api-sdk": { stars: 1, forks: 0, language: "C#" },
  "venicestats/venicestats-mcp": { stars: 1, forks: 0, language: "TypeScript" },
  "ValenteCreativo/ARVI": { stars: 1, forks: 0, language: "TypeScript" },
  "decentrathai/veniceguard": { stars: 0, forks: 0, language: "HTML" },
  "drdeeks/venice-reply-composer": { stars: 0, forks: 0, language: "TypeScript" },
  "jordanurbs/venice-video-mcp": { stars: 0, forks: 0, language: "TypeScript" },
  "zzmrl/aiva": { stars: 0, forks: 0, language: "TypeScript" },
};

const RAW_PROJECTS: Project[] = [
  // ── Ecosystem ───────────────────────────────────────────
  {
    title: "VeniceStats",
    description: "Community analytics dashboard for the Venice network — VVV/DIEM staking, the Venetians leaderboard, and live ecosystem metrics.",
    type: "Website",
    url: "https://venicestats.com",
    tags: ["Analytics", "Dashboard", "VVV"],
    category: "ecosystem",
    preview: "/preview-venicestats.png",
    featured: true,
    socials: [
      { kind: 'github', url: 'https://github.com/venicestats' },
    ],
  },
  {
    title: "llm-venice",
    description: "Venice plugin for Simon Willison's `llm` CLI. Use Venice models from your terminal alongside other LLM providers, with venice_parameters support.",
    type: "GitHub Repo",
    url: "https://github.com/ar-jan/llm-venice",
    tags: ["CLI", "Plugin", "Developer Tools"],
    category: "ecosystem",
    owner: "ar-jan",
    repo: "llm-venice",
    submittedBy: "ar-jan",
    featured: true,
  },
  {
    title: "venice-dev-tools",
    description: "TypeScript SDK monorepo for the Venice API — core runtime, Node CLI helpers, and a browser bundle entry.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/venice-dev-tools",
    tags: ["SDK", "TypeScript", "Developer Tools"],
    category: "ecosystem",
    owner: "georgeglarson",
    repo: "venice-dev-tools",
    submittedBy: "georgeglarson",
  },
  {
    title: "venice-ai (Python)",
    description: "Python client for Venice.ai. Sync/async, streaming, and full coverage of chat, image gen, TTS, and embeddings.",
    type: "GitHub Repo",
    url: "https://github.com/sethbang/venice-ai",
    tags: ["SDK", "Python", "Developer Tools"],
    category: "ecosystem",
    owner: "sethbang",
    repo: "venice-ai",
    submittedBy: "sethbang",
  },
  {
    title: "teep",
    description: "Verify that AI providers can't read your prompts — TEE attestation and end-to-end encryption verifier for Venice and other privacy-claim providers.",
    type: "GitHub Repo",
    url: "https://github.com/13rac1/teep",
    tags: ["Privacy", "TEE", "Security"],
    category: "ecosystem",
    owner: "13rac1",
    repo: "teep",
    submittedBy: "13rac1",
  },
  {
    title: "venice-ai-php",
    description: "PHP SDK for Venice AI. Drop-in OpenAI-compatible client for text and image generation, with comprehensive examples.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/venice-ai-php",
    tags: ["SDK", "PHP", "Developer Tools"],
    category: "ecosystem",
    owner: "georgeglarson",
    repo: "venice-ai-php",
    submittedBy: "georgeglarson",
  },
  {
    title: "venice-e2ee-proxy",
    description: "Local proxy that transparently end-to-end encrypts OpenAI-compatible requests to Venice — drop it in front of any client.",
    type: "GitHub Repo",
    url: "https://github.com/jooray/venice-e2ee-proxy",
    tags: ["Privacy", "Encryption", "Proxy"],
    category: "ecosystem",
    owner: "jooray",
    repo: "venice-e2ee-proxy",
    submittedBy: "jooray",
  },
  {
    title: "venice-e2ee",
    description: "End-to-end encryption library for Venice — ECDH secp256k1, AES-256-GCM, and TEE attestation verification.",
    type: "GitHub Repo",
    url: "https://github.com/elkimek/venice-e2ee",
    tags: ["Privacy", "Encryption", "Library"],
    category: "ecosystem",
    owner: "elkimek",
    repo: "venice-e2ee",
    submittedBy: "elkimek",
  },
  {
    title: "Venice-AI-SDK (Python, alt)",
    description: "Alternative Python SDK with full Swagger spec coverage — chat, image generation, audio synthesis, embeddings, and function calling.",
    type: "GitHub Repo",
    url: "https://github.com/actuallyrizzn/Venice-AI-SDK",
    tags: ["SDK", "Python", "Developer Tools"],
    category: "ecosystem",
    owner: "actuallyrizzn",
    repo: "Venice-AI-SDK",
    submittedBy: "actuallyrizzn",
  },
  {
    title: "veniceresch",
    description: "Typed, async-first Python SDK for the Venice.ai API.",
    type: "GitHub Repo",
    url: "https://github.com/balresch/veniceresch",
    tags: ["SDK", "Python", "Async"],
    category: "ecosystem",
    owner: "balresch",
    repo: "veniceresch",
    submittedBy: "balresch",
  },
  {
    title: "venice-ai-api-sdk (.NET)",
    description: "Community .NET SDK for Venice — typed access to chat, image, video, TTS, and embeddings. Published on NuGet.",
    type: "GitHub Repo",
    url: "https://github.com/michaellucasnzl/venice-ai-api-sdk",
    tags: ["SDK", ".NET", "C#"],
    category: "ecosystem",
    owner: "michaellucasnzl",
    repo: "venice-ai-api-sdk",
    submittedBy: "michaellucasnzl",
  },
  {
    title: "venicestats-mcp",
    description: "MCP server exposing live VeniceStats (VVV/DIEM) analytics to LLMs and agents.",
    type: "GitHub Repo",
    url: "https://github.com/venicestats/venicestats-mcp",
    tags: ["MCP", "Analytics", "VVV"],
    category: "ecosystem",
    owner: "venicestats",
    repo: "venicestats-mcp",
    submittedBy: "venicestats",
  },
  {
    title: "venice-video-mcp",
    description: "Token-lean MCP server for end-to-end edited videos — 6 verb tools and companion skills for consistency-first Venice video creation.",
    type: "GitHub Repo",
    url: "https://github.com/jordanurbs/venice-video-mcp",
    tags: ["MCP", "Video", "Developer Tools"],
    category: "ecosystem",
    owner: "jordanurbs",
    repo: "venice-video-mcp",
    submittedBy: "jordanurbs",
  },

  // ── Powered by Venice ───────────────────────────────────
  {
    title: "openvenice",
    description: "Open-source frontend for Venice AI. Chat, image gen, audio, video, embeddings, and visual workflows in one UI. No backend required.",
    type: "GitHub Repo",
    url: "https://github.com/nikshepsvn/openvenice",
    tags: ["Frontend", "Open Source", "Privacy"],
    category: "powered-by",
    owner: "nikshepsvn",
    repo: "openvenice",
    submittedBy: "nikshepsvn",
    featured: true,
    socials: [
      { kind: 'x', url: 'https://x.com/nikshepsvn' },
    ],
  },
  {
    title: "deep-research-privacy",
    description: "Privacy-first AI research tool — Venice uncensored models + Brave private search, parallel queries, and structured citations.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/deep-research-privacy",
    tags: ["Research", "Privacy", "Search"],
    category: "powered-by",
    owner: "georgeglarson",
    repo: "deep-research-privacy",
    submittedBy: "georgeglarson",
    featured: true,
  },
  {
    title: "venice_ai (Home Assistant)",
    description: "Home Assistant conversation integration for Venice AI. Private AI inside your smart home.",
    type: "GitHub Repo",
    url: "https://github.com/grasponcrypto/venice_ai",
    tags: ["Smart Home", "Integration", "Privacy"],
    category: "powered-by",
    owner: "grasponcrypto",
    repo: "venice_ai",
    submittedBy: "grasponcrypto",
  },
  {
    title: "claude-venice",
    description: "Route Claude Code through Venice.ai for pseudonymous AI inference — built on claude-code-router with cc-mirror support.",
    type: "GitHub Repo",
    url: "https://github.com/mars-llm/claude-venice",
    tags: ["Developer Tools", "Privacy", "CLI"],
    category: "powered-by",
    owner: "mars-llm",
    repo: "claude-venice",
    submittedBy: "mars-llm",
  },
  {
    title: "venicecode",
    description: "AI-powered coding agent built on opencode with Venice integration and enhanced model compatibility.",
    type: "GitHub Repo",
    url: "https://github.com/georgeglarson/venicecode",
    tags: ["Developer Tools", "CLI", "Agent"],
    category: "powered-by",
    owner: "georgeglarson",
    repo: "venicecode",
    submittedBy: "georgeglarson",
  },
  {
    title: "ComfyUI-Venice-API",
    description: "Custom ComfyUI nodes for Venice — image generation, editing, upscale, enhance, text, and TTS in visual workflows.",
    type: "GitHub Repo",
    url: "https://github.com/DraconicDragon/ComfyUI-Venice-API",
    tags: ["ComfyUI", "Image Generation", "Workflow"],
    category: "powered-by",
    owner: "DraconicDragon",
    repo: "ComfyUI-Venice-API",
    submittedBy: "DraconicDragon",
  },
  {
    title: "ARVI",
    description: "Autonomous environmental sensor agent — real weather data → Venice analysis → anomaly detection → on-chain alerts on Base. ERC-8004 identity.",
    type: "GitHub Repo",
    url: "https://github.com/ValenteCreativo/ARVI",
    tags: ["Agent", "Privacy", "On-chain"],
    category: "powered-by",
    owner: "ValenteCreativo",
    repo: "ARVI",
    submittedBy: "ValenteCreativo",
    socials: [
      { kind: 'website', url: 'https://arvi-eight.vercel.app' },
    ],
  },
  {
    title: "VeniceGuard",
    description: "Privacy-preserving multimodal AI assistant — process documents, images, and voice with zero data retention. Open Agents 2026 submission.",
    type: "GitHub Repo",
    url: "https://github.com/decentrathai/veniceguard",
    tags: ["Multimodal", "Privacy", "Agent"],
    category: "powered-by",
    owner: "decentrathai",
    repo: "veniceguard",
    submittedBy: "decentrathai",
  },
  {
    title: "venice-reply-composer",
    description: "Chrome extension injecting private AI reply suggestions into Farcaster/X/Reddit, with inline DeFi swap support on Base.",
    type: "GitHub Repo",
    url: "https://github.com/drdeeks/venice-reply-composer",
    tags: ["Chrome Extension", "Social", "Privacy"],
    category: "powered-by",
    owner: "drdeeks",
    repo: "venice-reply-composer",
    submittedBy: "drdeeks",
  },
  {
    title: "YouTube Transcript Summarizer",
    description: "Chrome extension that uses Venice AI to summarize YouTube transcripts and answer questions about video content.",
    type: "GitHub Repo",
    url: "https://github.com/KaffeMedFika/YouTube-Transcript-Summarizer",
    tags: ["Chrome Extension", "Summarization"],
    category: "powered-by",
    owner: "KaffeMedFika",
    repo: "YouTube-Transcript-Summarizer",
    submittedBy: "KaffeMedFika",
  },
  {
    title: "video-summarizer",
    description: "Summarize video transcripts using Venice AI (or any OpenAI-compatible endpoint).",
    type: "GitHub Repo",
    url: "https://github.com/jooray/video-summarizer",
    tags: ["Summarization", "CLI"],
    category: "powered-by",
    owner: "jooray",
    repo: "video-summarizer",
    submittedBy: "jooray",
  },
  {
    title: "venice_discobot",
    description: "Modular Discord bot powered by Venice AI for private, uncensored Q&A in your server.",
    type: "GitHub Repo",
    url: "https://github.com/presstab/venice_discobot",
    tags: ["Bot", "Discord"],
    category: "powered-by",
    owner: "presstab",
    repo: "venice_discobot",
    submittedBy: "presstab",
  },
  {
    title: "aiva",
    description: "Virtual assistant that handles phone calls and SMS via Twilio webhooks, with conversational responses through Venice AI.",
    type: "GitHub Repo",
    url: "https://github.com/zzmrl/aiva",
    tags: ["Voice", "SMS", "Agent"],
    category: "powered-by",
    owner: "zzmrl",
    repo: "aiva",
    submittedBy: "zzmrl",
  },
];

export const projects: Project[] = RAW_PROJECTS.map((p) => {
  if (p.type === 'GitHub Repo') {
    const stats = STATS[`${p.owner}/${p.repo}`];
    if (stats) return { ...p, ...stats };
  }
  return p;
});

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
  Shell: '#89e051',
  'C#': '#178600',
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

export const socialLabels: Record<SocialKind, string> = {
  x: 'X',
  github: 'GitHub',
  website: 'Website',
  farcaster: 'Farcaster',
  warpcast: 'Warpcast',
  instagram: 'Instagram',
  telegram: 'Telegram',
  discord: 'Discord',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  token: 'Token',
};
