// Watch — videos, posts, recaps, and gallery content about Venice.
// Live deployments belong in Projects; this tab is for media you watch or read.

export interface Demo {
  title: string;
  builder: string;
  description: string;
  url: string;
  thumbnail?: string;
  publishedAt: string;
  tags: string[];
  featured?: true;
}

export const demos: Demo[] = [
  {
    title: "Venice intro — decentralized, privacy-first AI",
    builder: "Venice.ai",
    description: "Overview video walking through Venice's privacy architecture, open-source model lineup, and uncensored tooling.",
    url: "https://www.youtube.com/watch?v=2DFOQ_YrMpU",
    thumbnail: "https://img.youtube.com/vi/2DFOQ_YrMpU/hqdefault.jpg",
    publishedAt: "2024-09-03",
    tags: ["Overview", "Video"],
    featured: true,
  },
  {
    title: "Erik Voorhees on Bitcoin & AI — What Bitcoin Did",
    builder: "Peter McCormack",
    description: "Long-form interview with Venice founder Erik Voorhees on permissionless AI, decentralized GPU infrastructure, and why private inference matters.",
    url: "https://www.youtube.com/watch?v=Vr3wFGoowUk",
    thumbnail: "https://img.youtube.com/vi/Vr3wFGoowUk/hqdefault.jpg",
    publishedAt: "2024-06-12",
    tags: ["Interview", "Podcast"],
  },
];
