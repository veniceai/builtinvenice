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
}

export const events: VeniceEvent[] = [
  {
    title: "Venice Private-AI Hackathon",
    description: "48-hour global hackathon. Build an app on the Venice API. Three tracks: agents, creative tools, and on-device.",
    url: "https://lu.ma/venice-hack",
    kind: "hackathon",
    status: "upcoming",
    startDate: "2026-05-10",
    endDate: "2026-05-12",
    location: "Online",
    host: "Venice AI",
    prize: "$50,000 in credits + $VVV",
    tags: ["Hackathon", "Agents", "Global"],
    featured: true,
  },
  {
    title: "Builders IRL — San Francisco",
    description: "Evening meetup for Venice builders. Lightning demos from three ecosystem projects, open bar, no talks longer than ten minutes.",
    url: "https://lu.ma/venice-sf",
    kind: "meetup",
    status: "upcoming",
    startDate: "2026-04-29",
    location: "San Francisco, CA",
    host: "Venice AI + Shack15",
    tags: ["Meetup", "In-Person"],
  },
  {
    title: "Uncensored Models Workshop",
    description: "Half-day workshop on running Venice uncensored models locally, fine-tuning with LoRA, and routing to Venice for heavy inference.",
    url: "https://lu.ma/venice-workshop",
    kind: "workshop",
    status: "upcoming",
    startDate: "2026-05-03",
    location: "Online",
    host: "georgeglarson",
    tags: ["Workshop", "Fine-tuning"],
  },
  {
    title: "PrivateCon 2026",
    description: "Two-day conference on private inference, local-first AI, and the economics of open models. Venice is a founding sponsor.",
    url: "https://privatecon.xyz",
    kind: "conference",
    status: "upcoming",
    startDate: "2026-06-18",
    endDate: "2026-06-19",
    location: "Lisbon, Portugal",
    host: "PrivateCon",
    tags: ["Conference", "In-Person"],
    featured: true,
  },
  {
    title: "Agents on Venice — Demo Day",
    description: "Virtual demo day for agent builders. Six five-minute demos, Q&A with the Venice core team, and a network room after.",
    url: "https://lu.ma/venice-agents-demo",
    kind: "meetup",
    status: "upcoming",
    startDate: "2026-05-21",
    location: "Online",
    host: "@uncensoredlab",
    tags: ["Meetup", "Agents"],
  },
  {
    title: "Open Models Unconference — Berlin",
    description: "Community-run unconference for open-source model research. Bring-your-own-topic sessions and a build room with GPU credits.",
    url: "https://lu.ma/open-models-berlin",
    kind: "meetup",
    status: "upcoming",
    startDate: "2026-06-04",
    location: "Berlin, Germany",
    host: "Open Models Collective",
    tags: ["Meetup", "Unconference"],
  },
  {
    title: "Agents on Venice — NYC",
    description: "Meetup focused on agentic workflows powered by Venice. Demos, a panel, and a show-and-tell session.",
    url: "https://lu.ma/venice-nyc",
    kind: "meetup",
    status: "past",
    startDate: "2026-03-14",
    location: "Brooklyn, NY",
    host: "nikshepsvn",
    tags: ["Meetup", "Agents"],
  },
  {
    title: "Private-AI Launch Night — SF",
    description: "Launch-night edition of Builders IRL: three demos of newly-shipped projects, a fireside with the openvenice team, pizza.",
    url: "https://lu.ma/venice-launch-sf",
    kind: "meetup",
    status: "past",
    startDate: "2026-02-20",
    location: "San Francisco, CA",
    host: "nikshepsvn",
    tags: ["Meetup", "In-Person"],
  },
  {
    title: "First Builders Hackathon",
    description: "The very first Venice hackathon. 72 hours, 140 builders, 31 projects shipped. Several are now in the community directory.",
    url: "https://github.com/nikshepsvn/builtwithvenice/blob/main/events/first-hackathon.md",
    kind: "hackathon",
    status: "past",
    startDate: "2026-01-24",
    endDate: "2026-01-26",
    location: "Online",
    host: "Venice community",
    prize: "$15,000 in credits",
    tags: ["Hackathon", "Online"],
  },
];
