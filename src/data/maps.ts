import type {
  ProjectCategory, TokenChain, SocialKind, CookbookDifficulty,
} from './schema';

export const categoryLabels: Record<ProjectCategory, string> = {
  ecosystem: 'Ecosystem',
  'powered-by': 'Powered by Venice',
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

export const difficultyLabels: Record<CookbookDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
