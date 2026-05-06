// Short examples of things people made on Venice — a screenshot, a Loom,
// an X post, a gallery image. The visual is the point.

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
    title: "openvenice running chat, image, and audio in one tab",
    builder: "nikshepsvn",
    description: "30-second clip of openvenice handling a multimodal session — chat reply, image gen, then a TTS read-back.",
    url: "https://x.com/nikshepsvn/status/example-openvenice-demo",
    publishedAt: "2026-04-12",
    tags: ["Frontend", "Multimodal"],
    featured: true,
  },
  {
    title: "Parallel Brave + Venice search loop",
    builder: "georgeglarson",
    description: "Side-by-side: a research agent firing six Brave queries and stitching citations back through a Venice uncensored model.",
    url: "https://x.com/georgeglarson/status/example-research-demo",
    publishedAt: "2026-03-22",
    tags: ["Research", "Agents"],
    featured: true,
  },
  {
    title: "llm-venice from the terminal",
    builder: "ar-jan",
    description: "Quick asciinema of the llm CLI piping a Venice model into a shell pipeline — `git log | llm -m venice 'summarise'`.",
    url: "https://asciinema.org/a/example-llm-venice",
    publishedAt: "2026-03-04",
    tags: ["CLI", "Plugin"],
  },
  {
    title: "WhatsApp assistant answering on-device",
    builder: "lorenzovenice",
    description: "Screen recording of nanoclaw responding to a WhatsApp thread with sub-second latency over Venice.",
    url: "https://x.com/lorenzovenice/status/example-whatsapp-demo",
    publishedAt: "2026-04-09",
    tags: ["Bot", "Messaging"],
  },
  {
    title: "Home Assistant talking to a local LoRA + Venice",
    builder: "grasponcrypto",
    description: "Demo clip of a smart-home routine: local intent parser handles short commands, falls back to Venice for long context.",
    url: "https://x.com/grasponcrypto/status/example-homeassistant-demo",
    publishedAt: "2026-03-28",
    tags: ["Smart Home", "Privacy"],
  },
  {
    title: "venice-dev-tools streaming demo",
    builder: "georgeglarson",
    description: "Loom showing the TypeScript SDK streaming a chat completion, with token-by-token render and cancel.",
    url: "https://www.loom.com/share/example-venice-dev-tools",
    publishedAt: "2026-01-30",
    tags: ["SDK", "Streaming"],
  },
];
