// Short examples of things people made on Venice — a live deployment,
// a hackathon submission video, an X post, a gallery image. The visual is the point.

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
    title: "VeniceStats — live VVV/DIEM analytics dashboard",
    builder: "venicestats",
    description: "Live dashboard tracking VVV staking, the Venetians leaderboard, DIEM minting curves, and on-chain Venice metrics. No login required.",
    url: "https://venicestats.com",
    thumbnail: "/preview-venicestats.png",
    publishedAt: "2026-03-19",
    tags: ["Dashboard", "VVV", "Analytics"],
    featured: true,
  },
  {
    title: "ARVI — autonomous environmental sensor agent",
    builder: "ValenteCreativo",
    description: "Live agent running every hour: real Open-Meteo weather data → Venice analysis → anomaly detection → on-chain alerts on Base via ARVIAgent (ERC-8004 identity).",
    url: "https://arvi-eight.vercel.app",
    thumbnail: "/preview-arvi.png",
    publishedAt: "2026-03-21",
    tags: ["Agent", "On-chain", "Privacy"],
    featured: true,
  },
  {
    title: "Vigil — private guardian for elderly crypto wallets",
    builder: "drewmanley16",
    description: "Synthesis-built agent: every outbound tx is privately analyzed by Venice (llama-3.3-70b, zero retention). Suspicious transfers held in escrow until a family guardian approves on Telegram.",
    url: "https://vigil-guardian.vercel.app/demo",
    thumbnail: "/preview-vigil.png",
    publishedAt: "2026-03-20",
    tags: ["Agent", "Privacy", "On-chain"],
  },
  {
    title: "VeniceGuard — privacy-preserving multimodal AI",
    builder: "decentrathai",
    description: "Open Agents 2026 submission. Upload a medical prescription → Venice vision extracts data → reasoning summarises → TTS reads results. Original image never stored.",
    url: "https://devpost.com/software/veniceguard",
    thumbnail: "/preview-veniceguard.png",
    publishedAt: "2026-02-25",
    tags: ["Multimodal", "Privacy", "Hackathon"],
  },
  {
    title: "HealthGuard — 1st place at Akash × Venice Open Agents",
    builder: "karthiksai109",
    description: "Decentralized AI health agent — Venice STT, vision, TTS, and chat run on Akash compute. 60-second TTL on raw media, AES-256-GCM at rest, Telegram alerts.",
    url: "https://github.com/karthiksai109/healthguard",
    thumbnail: "https://opengraph.githubassets.com/1/karthiksai109/healthguard",
    publishedAt: "2026-03-03",
    tags: ["Health", "Multimodal", "Hackathon"],
  },
  {
    title: "Venice intro — decentralized, privacy-first AI",
    builder: "Venice.ai",
    description: "Overview video walking through Venice's privacy architecture, open-source model lineup, and uncensored tooling.",
    url: "https://www.youtube.com/watch?v=2DFOQ_YrMpU",
    thumbnail: "https://img.youtube.com/vi/2DFOQ_YrMpU/hqdefault.jpg",
    publishedAt: "2024-09-03",
    tags: ["Overview", "Video"],
  },
];
