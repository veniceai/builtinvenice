export type EventKind = 'hackathon' | 'meetup' | 'conference' | 'workshop';
export type EventStatus = 'upcoming' | 'live' | 'past';

export interface VeniceEvent {
  title: string;
  description: string;
  url: string;
  kind: EventKind;
  status: EventStatus;
  startDate: string;
  endDate?: string;
  location: string;
  host: string;
  prize?: string;
  tags: string[];
  featured?: true;
  thumbnail?: string;
}

export const events: VeniceEvent[] = [
  {
    title: "MetaMask Smart Accounts Kit × 1Shot API × Venice AI Dev Cook-Off",
    description: "Online hackathon co-hosted by MetaMask, 1Shot API, and Venice AI. Build agents that combine MetaMask Smart Accounts (ERC-7715 permissions) with Venice for permissionless intelligence — text, image, audio, video, and crypto RPC access. Dedicated Venice AI track.",
    url: "https://www.hackquest.io/hackathons/MetaMask-Smart-Accounts-Kit-x-1Shot-API-x-Venice-AI-Dev-Cook-Off",
    kind: "hackathon",
    status: "live",
    startDate: "2026-05-15",
    endDate: "2026-06-15",
    location: "Online",
    host: "MetaMask Developer + 1Shot API + Venice AI",
    prize: "$14K total ($3K Venice AI track)",
    tags: ["Hackathon", "Agents", "MetaMask", "x402"],
    thumbnail: "/preview-metamask-cookoff-2026.png",
  },
  {
    title: "AI Engineer World's Fair 2026",
    description: "Four-day AI engineering conference at Moscone West with 29 parallel tracks across reasoning, agents, RAG, coding, voice, and vision. 400+ sessions, 100+ exhibiting companies. Venice is sponsoring.",
    url: "https://www.ai.engineer/worldsfair",
    kind: "conference",
    status: "upcoming",
    startDate: "2026-06-29",
    endDate: "2026-07-02",
    location: "Moscone West, San Francisco",
    host: "AI Engineer (Software 3.0)",
    tags: ["Conference", "AI Engineering", "Sponsorship"],
    thumbnail: "/preview-ai-engineer-worlds-fair-2026.png",
  },
  {
    title: "The Synthesis 2026 — Private Agents, Trusted Actions",
    description: "Ethereum's first agentic hackathon, judged by AI agent judges. Venice ran the 'Private Agents, Trusted Actions' track for agents that reason over sensitive data without exposure. 153 projects submitted to the Venice track.",
    url: "https://synthesis.md/",
    kind: "hackathon",
    status: "past",
    startDate: "2026-03-13",
    endDate: "2026-03-22",
    location: "Online",
    host: "Synthesis (Ethereum Foundation dev/acc + dAI)",
    prize: "$11.5K in VVV (Venice track)",
    tags: ["Hackathon", "Agents", "Ethereum"],
    featured: true,
    thumbnail: "/preview-synthesis-2026.png",
  },
  {
    title: "Open Agents Hackathon 2026 — Venice Track",
    description: "One-day hackathon co-hosted by Akash Network and Venice AI. The Venice Track focused on 'Private Multimodal Intelligence' — apps combining language, vision, speech, and video on Venice's zero-retention infrastructure.",
    url: "https://open-agents-hackathon.devpost.com/",
    kind: "hackathon",
    status: "past",
    startDate: "2026-02-25",
    location: "Online",
    host: "Akash Network + Venice AI",
    prize: "1,000 VVV (Best Private Multimodal System)",
    tags: ["Hackathon", "Multimodal", "Privacy"],
    featured: true,
    thumbnail: "/preview-open-agents-2026.png",
  },
];
