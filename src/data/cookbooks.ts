export type CookbookDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Cookbook {
  title: string;
  description: string;
  url: string;
  author: string;
  authorUrl?: string;
  difficulty: CookbookDifficulty;
  readTime: string;
  language?: string;
  tags: string[];
  publishedAt: string;
  featured?: true;
}

export const cookbooks: Cookbook[] = [
  {
    title: "Streaming chat completions with the Venice API",
    description: "A step-by-step recipe for wiring Server-Sent Events from Venice chat completions into a React app, including backpressure and cancellation.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/cookbook/streaming-chat.md",
    author: "nikshepsvn",
    authorUrl: "https://x.com/nikshepsvn",
    difficulty: "beginner",
    readTime: "8 min",
    language: "TypeScript",
    tags: ["Streaming", "Chat", "Tutorial"],
    publishedAt: "2026-03-02",
    featured: true,
  },
  {
    title: "Routing between Venice and a local model",
    description: "Build a router that prefers a local Ollama model for quick replies and falls back to Venice for long context or vision. Includes latency benchmarks.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/cookbook/local-routing.md",
    author: "georgeglarson",
    authorUrl: "https://github.com/georgeglarson",
    difficulty: "intermediate",
    readTime: "12 min",
    language: "Python",
    tags: ["Routing", "Local", "Performance"],
    publishedAt: "2026-02-18",
  },
  {
    title: "Prompt-caching patterns for agents",
    description: "How to structure system prompts, tools, and message history for reliable cache hits on Venice. Includes a working agent loop and cache-hit metrics.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/cookbook/prompt-caching.md",
    author: "ar-jan",
    difficulty: "advanced",
    readTime: "15 min",
    language: "Python",
    tags: ["Caching", "Agents", "Cost"],
    publishedAt: "2026-03-19",
    featured: true,
  },
  {
    title: "Image generation + safety filters",
    description: "A recipe for generating images with Venice, post-processing with a local safety model, and surfacing moderation results in your UI.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/cookbook/image-safety.md",
    author: "sethbang",
    difficulty: "intermediate",
    readTime: "10 min",
    language: "Python",
    tags: ["Image", "Safety"],
    publishedAt: "2026-01-22",
  },
  {
    title: "Venice behind a privacy-first proxy",
    description: "Run Venice through a Cloudflare Worker that strips identifiers, rotates API keys, and rate-limits per user — without breaking streaming.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/cookbook/privacy-proxy.md",
    author: "grasponcrypto",
    difficulty: "advanced",
    readTime: "18 min",
    language: "TypeScript",
    tags: ["Privacy", "Infra", "Edge"],
    publishedAt: "2026-04-01",
  },
  {
    title: "Embeddings + pgvector quickstart",
    description: "Go from raw docs to a working semantic search endpoint using Venice embeddings and Postgres pgvector. Docker compose included.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/cookbook/embeddings-pgvector.md",
    author: "lorenzovenice",
    difficulty: "beginner",
    readTime: "9 min",
    language: "Python",
    tags: ["Embeddings", "Search", "Postgres"],
    publishedAt: "2026-02-05",
  },
];

export const difficultyLabels: Record<CookbookDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
