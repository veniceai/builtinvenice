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
  /** 16:9 thumbnail. Local path (e.g. /preview-foo.png) or absolute URL. */
  thumbnail?: string;
}

export interface WebsiteProject extends BaseProject {
  type: 'Website';
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
  "nikshepsvn/openvenice": { stars: 46, forks: 9, language: "TypeScript" },
  "georgeglarson/deep-research-privacy": { stars: 38, forks: 4, language: "TypeScript" },
  "ar-jan/llm-venice": { stars: 24, forks: 5, language: "Python" },
  "lorenzovenice/nanoclaw-venice": { stars: 19, forks: 4, language: "TypeScript" },
  "georgeglarson/venice-dev-tools": { stars: 14, forks: 2, language: "TypeScript" },
  "sethbang/venice-ai": { stars: 13, forks: 4, language: "Python" },
  "grasponcrypto/venice_ai": { stars: 13, forks: 3, language: "Python" },
  "13rac1/teep": { stars: 9, forks: 3, language: "Go" },
  "georgeglarson/venice-ai-php": { stars: 7, forks: 2, language: "HTML" },
  "DraconicDragon/ComfyUI-Venice-API": { stars: 6, forks: 1, language: "Python" },
  "KaffeMedFika/YouTube-Transcript-Summarizer": { stars: 6, forks: 0, language: "JavaScript" },
  "tunnckoCore/pi-venice": { stars: 7, forks: 2, language: "TypeScript" },
  "mars-llm/claude-venice": { stars: 5, forks: 0, language: "Shell" },
  "georgeglarson/venicecode": { stars: 6, forks: 0, language: "TypeScript" },
  "jooray/venice-e2ee-proxy": { stars: 5, forks: 3, language: "TypeScript" },
  "jooray/video-summarizer": { stars: 4, forks: 0, language: "Python" },
  "presstab/venice_discobot": { stars: 4, forks: 1, language: "Python" },
  "elkimek/venice-e2ee": { stars: 3, forks: 1, language: "TypeScript" },
  "actuallyrizzn/Venice-AI-SDK": { stars: 2, forks: 0, language: "Python" },
  "balresch/veniceresch": { stars: 1, forks: 0, language: "Python" },
  "michaellucasnzl/venice-ai-api-sdk": { stars: 1, forks: 0, language: "C#" },
  "venicestats/venicestats-mcp": { stars: 1, forks: 1, language: "TypeScript" },
  "ValenteCreativo/ARVI": { stars: 1, forks: 0, language: "TypeScript" },
  "decentrathai/veniceguard": { stars: 0, forks: 0, language: "HTML" },
  "drdeeks/venice-reply-composer": { stars: 0, forks: 0, language: "TypeScript" },
  "jordanurbs/venice-video-mcp": { stars: 1, forks: 0, language: "TypeScript" },
  "zzmrl/aiva": { stars: 0, forks: 1, language: "TypeScript" },
  "karthiksai109/healthguard": { stars: 0, forks: 2, language: "Python" },
};

const RAW_PROJECTS: Project[] = [
  // ── Top picks ───────────────────────────────────────────
  {
    title: "VeniceStats",
    description: "Community analytics dashboard for the Venice network — VVV/DIEM staking, the Venetians leaderboard, and live ecosystem metrics.",
    type: "Website",
    url: "https://venicestats.com",
    tags: ["Analytics", "Dashboard", "VVV"],
    category: "ecosystem",
    thumbnail: "/preview-venicestats.png",
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
    thumbnail: "/preview-openvenice.png",
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
    title: "HealthGuard",
    description: "1st place at Akash × Venice Open Agents 2026. Decentralized AI health agent — Venice STT/vision/TTS run on Akash compute, 60s TTL on raw media, AES-256-GCM at rest, Telegram alerts.",
    type: "GitHub Repo",
    url: "https://github.com/karthiksai109/healthguard",
    tags: ["Health", "Multimodal", "Hackathon"],
    category: "powered-by",
    owner: "karthiksai109",
    repo: "healthguard",
    submittedBy: "karthiksai109",
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

  // ── Ecosystem ───────────────────────────────────────────
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
    title: "pi-venice",
    description: "Venice extension for the Pi Coding Agent — wires Venice models into the Pi CLI so you can run Pi against Venice's OpenAI-compatible endpoint.",
    type: "GitHub Repo",
    url: "https://github.com/tunnckoCore/pi-venice",
    tags: ["Developer Tools", "CLI", "Extension"],
    category: "ecosystem",
    owner: "tunnckoCore",
    repo: "pi-venice",
    submittedBy: "tunnckoCore",
  },
  {
    title: "VVVKernel",
    description: "Inference kernel that wires Venice models into seven role-specific expert agents, exposed via an MCP server and an HTTP REST API. Includes optional x402 micropayment metering on Base. Hosted off-GitHub; the x402 wallet flow is unaudited — review before connecting funds.",
    type: "Website",
    url: "https://gitlawb.com/node/repos/z6Mkw3V6/vvvkernel",
    tags: ["MCP", "Inference", "x402"],
    category: "ecosystem",
  },
  {
    title: "AntSeed",
    description: "Peer-to-peer marketplace for AI inference with on-chain USDC settlement on Base. Runs a DIEM staking pool that proxies into Venice; pool revenue from served Venice requests streams back to DIEM stakers.",
    type: "Website",
    url: "https://antseed.com",
    tags: ["Inference", "Marketplace", "DIEM"],
    category: "ecosystem",
    socials: [
      { kind: 'x', url: 'https://x.com/antseedai' },
      { kind: 'github', url: 'https://github.com/antseed' },
      { kind: 'telegram', url: 'https://t.me/antseed' },
    ],
  },
  {
    title: "Liquid Protocol",
    description: "Token launcher on Base built on Uniswap V4 — supports pairing new community token launches against VVV or DIEM with locked liquidity and MEV protection.",
    type: "Website",
    url: "https://liquidprotocol.org",
    tags: ["VVV", "DIEM", "Launchpad"],
    category: "ecosystem",
  },

  // ── Powered by Venice ───────────────────────────────────
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
    description: "Community config that routes Claude Code through Venice via claude-code-router, with cc-mirror support.",
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
    title: "VeniceGuard",
    description: "Multimodal AI assistant prototype for documents, images, and voice. Open Agents 2026 hackathon submission.",
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
    description: "Chrome extension that drafts AI reply suggestions on Farcaster/X/Reddit using Venice, with optional Base swap integrations. Browser-extension wallet flows are unaudited — review before installing.",
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
  {
    title: "nanoclaw-venice",
    description: "Personal AI assistant built on Venice — fork of NanoClaw with Telegram and WhatsApp messaging support.",
    type: "GitHub Repo",
    url: "https://github.com/lorenzovenice/nanoclaw-venice",
    tags: ["Assistant", "Telegram", "WhatsApp"],
    category: "powered-by",
    owner: "lorenzovenice",
    repo: "nanoclaw-venice",
    submittedBy: "lorenzovenice",
  },
];

export const projects: Project[] = RAW_PROJECTS.map((p) => {
  if (p.type === 'GitHub Repo') {
    const stats = STATS[`${p.owner}/${p.repo}`] ?? {};
    // Pre-baked by `npm run refresh-projects`. Falls back to the owner avatar
    // via onError in RepoCard if the local file is missing (e.g. fresh repo
    // added before the script has run).
    const thumbnail =
      p.thumbnail ?? `/repo-previews/${p.owner}-${p.repo}.png`;
    return { ...p, ...stats, thumbnail };
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
