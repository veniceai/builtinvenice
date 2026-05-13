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
