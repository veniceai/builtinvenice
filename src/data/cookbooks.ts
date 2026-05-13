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
  // ── Official Venice guides ──────────────────────────────
  {
    title: "Quickstart: your first Venice API request",
    description: "From API key to a streaming chat completion — covers env setup, the OpenAI SDK shim, model selection, and `venice_parameters` like `enable_web_search`.",
    url: "https://docs.venice.ai/overview/getting-started",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "beginner",
    readTime: "10 min",
    tags: ["Getting Started", "API", "Tutorial"],
    publishedAt: "2026-04-01",
    featured: true,
  },
  {
    title: "Migrate an OpenAI app to Venice",
    description: "Drop-in migration guide — change the base URL, keep the SDK, and pick a Venice model. Notes on system-prompt behaviour and response-header differences.",
    url: "https://docs.venice.ai/guides/migrating-from-openai",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "beginner",
    readTime: "8 min",
    tags: ["Migration", "OpenAI Compatibility"],
    publishedAt: "2026-04-01",
  },
  {
    title: "Build a LangChain app on Venice",
    description: "Use ChatOpenAI and OpenAIEmbeddings with Venice's base URL to build chains, RAG pipelines, and function-calling agents. Includes a working RAG snippet.",
    url: "https://docs.venice.ai/guides/integrations/langchain",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "intermediate",
    readTime: "15 min",
    language: "Python",
    tags: ["LangChain", "RAG", "Agents"],
    publishedAt: "2026-04-01",
    featured: true,
  },
  {
    title: "Multi-agent crews with CrewAI + Venice",
    description: "Wire Venice as a CrewAI LLM provider, run multi-agent product-analysis crews, mix smart / fast / uncensored models per role, and use built-in web search.",
    url: "https://docs.venice.ai/guides/integrations/crewai",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "intermediate",
    readTime: "14 min",
    language: "Python",
    tags: ["CrewAI", "Multi-Agent", "Agents"],
    publishedAt: "2026-04-01",
  },
  {
    title: "Next.js + Venice via the Vercel AI SDK",
    description: "Stream chat completions, do tool calls, and switch models in a Next.js App Router project. Uses `createOpenAI` with Venice as the base URL.",
    url: "https://docs.venice.ai/guides/integrations/vercel-ai-sdk",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "intermediate",
    readTime: "12 min",
    language: "TypeScript",
    tags: ["Next.js", "Vercel AI SDK", "Streaming"],
    publishedAt: "2026-04-01",
  },
  {
    title: "Route Claude Code through Venice",
    description: "Use Claude Code (Anthropic CLI) against Venice via claude-code-router — pay-per-token access to Claude Opus 4.5/4.6 and Sonnet with prompt caching wired up.",
    url: "https://docs.venice.ai/guides/integrations/claude-code",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "intermediate",
    readTime: "12 min",
    tags: ["Claude Code", "CLI", "Routing"],
    publishedAt: "2026-04-01",
  },
  {
    title: "Cursor + Venice for private coding",
    description: "Step-by-step guide to point Cursor at Venice's OpenAI-compatible endpoint, including the `venice-` model-prefix trick for Claude 4.6 in Cursor.",
    url: "https://venice.ai/blog/how-to-code-with-the-venice-api-in-cursor-a-quick-guide",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "beginner",
    readTime: "8 min",
    tags: ["Cursor", "Coding", "Setup"],
    publishedAt: "2025-02-21",
  },
  {
    title: "Use Venice with Cline in VSCode",
    description: "Install Cline, plug in your Venice API key, and point it at the OpenAI-compatible base URL for private AI coding assistance.",
    url: "https://venice.ai/blog/how-to-use-the-venice-api-with-cline-in-vscode-a-developers-guide",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "beginner",
    readTime: "7 min",
    tags: ["Cline", "VSCode", "Setup"],
    publishedAt: "2025-02-20",
  },
  {
    title: "Roo Code + Venice in VSCode",
    description: "Open-source Roo Code AI coding assistant pointed at Venice — private, uncensored code generation in your VSCode workflow.",
    url: "https://venice.ai/blog/how-to-use-the-roo-ai-coding-assistant-in-private-with-venice-api-a-quick-guide",
    author: "Venice.ai",
    authorUrl: "https://venice.ai",
    difficulty: "beginner",
    readTime: "7 min",
    tags: ["Roo Code", "VSCode", "Setup"],
    publishedAt: "2025-02-24",
  },
  // ── Community guides ────────────────────────────────────
  {
    title: "Getting Started with the Venice AI SDK (venice-dev-tools)",
    description: "Community walkthrough of the @venice-dev-tools TypeScript packages — install, instantiate a client, stream chat, generate images, and tune retries/rate limits.",
    url: "https://georgeglarson.github.io/venice-dev-tools/guides/getting-started.html",
    author: "georgeglarson",
    authorUrl: "https://github.com/georgeglarson",
    difficulty: "beginner",
    readTime: "12 min",
    language: "TypeScript",
    tags: ["SDK", "Tutorial", "TypeScript"],
    publishedAt: "2026-03-25",
  },
];

export const difficultyLabels: Record<CookbookDifficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};
