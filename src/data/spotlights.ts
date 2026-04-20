export interface Spotlight {
  title: string;
  builder: string;
  role: string;
  description: string;
  url: string;
  thumbnail?: string;
  duration: string;
  publishedAt: string;
  tags: string[];
  featured?: true;
}

export const spotlights: Spotlight[] = [
  {
    title: "How we built openvenice as a weekend project",
    builder: "nikshepsvn",
    role: "Creator, openvenice",
    description: "A no-backend frontend for Venice AI with chat, images, and video — shipped in a weekend. Why Venice, how it handles streaming, and what's next.",
    url: "https://www.youtube.com/watch?v=nikshepsvn-openvenice",
    duration: "14:22",
    publishedAt: "2026-04-02",
    tags: ["Frontend", "Open Source"],
    featured: true,
  },
  {
    title: "Privacy-first research, parallel search, and citations",
    builder: "georgeglarson",
    role: "Author, deep-research-privacy",
    description: "George walks through the agent loop, how parallel Brave queries compose with Venice uncensored models, and the citation schema he landed on.",
    url: "https://www.youtube.com/watch?v=georgeglarson-research",
    duration: "22:10",
    publishedAt: "2026-03-15",
    tags: ["Research", "Privacy", "Agents"],
    featured: true,
  },
  {
    title: "Building a Venice plugin for the llm CLI",
    builder: "ar-jan",
    role: "Maintainer, llm-venice",
    description: "A short interview on contributing to Simon Willison's llm CLI, API-surface tradeoffs, and testing against multiple model providers.",
    url: "https://www.youtube.com/watch?v=arjan-llm-venice",
    duration: "09:47",
    publishedAt: "2026-02-28",
    tags: ["CLI", "Plugin"],
  },
  {
    title: "Private assistants on WhatsApp and Telegram",
    builder: "lorenzovenice",
    role: "Builder, nanoclaw-venice",
    description: "Lorenzo demos nanoclaw live — a private messaging assistant running on Venice — and discusses moderation tradeoffs for uncensored chat.",
    url: "https://www.youtube.com/watch?v=lorenzo-nanoclaw",
    duration: "11:05",
    publishedAt: "2026-04-09",
    tags: ["Bot", "Messaging"],
  },
  {
    title: "Smart home, privately",
    builder: "grasponcrypto",
    role: "Maintainer, venice_ai (HA integration)",
    description: "A walk-through of the Home Assistant integration: intent parsing with a local model, long-context fallback to Venice, and how the privacy boundary is drawn.",
    url: "https://www.youtube.com/watch?v=graspon-homeassistant",
    duration: "16:40",
    publishedAt: "2026-03-28",
    tags: ["Smart Home", "Privacy"],
  },
  {
    title: "From SDK to ecosystem: the story of venice-dev-tools",
    builder: "georgeglarson",
    role: "Author, venice-dev-tools",
    description: "George on designing a TypeScript SDK for a fast-moving API, keeping examples current, and the small community forming around it.",
    url: "https://www.youtube.com/watch?v=george-sdk",
    duration: "13:18",
    publishedAt: "2026-01-30",
    tags: ["SDK", "Developer Tools"],
  },
];
