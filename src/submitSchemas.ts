// Schema-driven definitions for the in-app submit form. Field `id` must match
// the GitHub issue form field ID so URL prefill works on submit.

export type FieldType = 'text' | 'textarea' | 'select' | 'date' | 'image';

export interface FieldConfig {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  description?: string;
  options?: string[];
  showWhen?: (form: Record<string, string>) => boolean;
}

export interface SubmissionType {
  key: 'project' | 'cookbook' | 'event' | 'demo';
  label: string;
  blurb: string;
  template: string;
  titlePrefix: string;
  // Field whose value becomes the issue title (after the prefix).
  titleField: string;
  fields: FieldConfig[];
}

const PROJECT_TYPE = 'project-type';

export const submissionTypes: SubmissionType[] = [
  {
    key: 'project',
    label: 'Project',
    blurb: 'Website, GitHub repo, X account, or community token.',
    template: 'submit-project.yml',
    titlePrefix: '[Project] ',
    titleField: 'project-name',
    fields: [
      { id: 'project-name', label: 'Project name', type: 'text', required: true, placeholder: 'e.g. VeniceStats, @venicebuilds, $DOGEDAO' },
      {
        id: PROJECT_TYPE,
        label: 'Project type',
        type: 'select',
        required: true,
        options: ['Website', 'GitHub Repo', 'X Account', 'Token'],
      },
      { id: 'project-url', label: 'Project URL', type: 'text', required: true, placeholder: 'https://…', description: 'Canonical link for the project.' },
      {
        id: 'category',
        label: 'Category',
        type: 'select',
        required: true,
        options: [
          'Ecosystem (built for the Venice community)',
          'Powered by Venice (uses the Venice API)',
        ],
      },
      { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: '1–2 plain sentences. Avoid marketing language.' },
      { id: 'tags', label: 'Tags', type: 'text', required: true, placeholder: 'SDK, TypeScript, Analytics', description: 'Comma-separated, 1–4 short tags.' },
      { id: 'submitted-by', label: 'Your name / handle', type: 'text', placeholder: 'e.g. @nikshepsvn' },

      // GitHub Repo fields
      { id: 'github-owner', label: 'GitHub owner', type: 'text', placeholder: 'e.g. nikshepsvn', showWhen: f => f[PROJECT_TYPE] === 'GitHub Repo' },
      { id: 'github-repo', label: 'GitHub repo name', type: 'text', placeholder: 'e.g. openvenice', showWhen: f => f[PROJECT_TYPE] === 'GitHub Repo' },
      { id: 'language', label: 'Primary language', type: 'text', placeholder: 'e.g. TypeScript, Python', showWhen: f => f[PROJECT_TYPE] === 'GitHub Repo' },
      { id: 'stars', label: 'Stars (optional)', type: 'text', placeholder: 'e.g. 42', showWhen: f => f[PROJECT_TYPE] === 'GitHub Repo' },
      { id: 'forks', label: 'Forks (optional)', type: 'text', placeholder: 'e.g. 5', showWhen: f => f[PROJECT_TYPE] === 'GitHub Repo' },

      // X Account fields
      { id: 'x-handle', label: 'X handle', type: 'text', placeholder: 'venicebuilds', description: 'Without the @.', showWhen: f => f[PROJECT_TYPE] === 'X Account' },
      { id: 'x-bio', label: 'Short bio', type: 'text', placeholder: 'One-line description of the account.', showWhen: f => f[PROJECT_TYPE] === 'X Account' },
      { id: 'x-followers', label: 'Followers (optional)', type: 'text', placeholder: 'e.g. 4200', showWhen: f => f[PROJECT_TYPE] === 'X Account' },

      // Token fields
      { id: 'token-ticker', label: 'Ticker', type: 'text', placeholder: 'e.g. DOGEDAO', showWhen: f => f[PROJECT_TYPE] === 'Token' },
      { id: 'token-address', label: 'Contract address', type: 'text', placeholder: '0x… or Solana base58', showWhen: f => f[PROJECT_TYPE] === 'Token' },
      {
        id: 'token-chain',
        label: 'Chain',
        type: 'select',
        options: ['Solana', 'Base', 'Ethereum'],
        showWhen: f => f[PROJECT_TYPE] === 'Token',
      },
      { id: 'token-market-cap', label: 'Market cap in USD (optional)', type: 'text', placeholder: 'e.g. 2400000', showWhen: f => f[PROJECT_TYPE] === 'Token' },
      { id: 'token-holders', label: 'Holders (optional)', type: 'text', placeholder: 'e.g. 1820', showWhen: f => f[PROJECT_TYPE] === 'Token' },

      {
        id: 'socials',
        label: 'Connected socials (optional)',
        type: 'textarea',
        description: 'One per line, kind: url. Kinds: x, github, website, farcaster, warpcast, instagram, telegram, discord, youtube, tiktok, token.',
        placeholder: 'x: https://x.com/yourproject\nfarcaster: https://warpcast.com/yourproject',
      },
      {
        id: 'screenshot',
        label: 'Thumbnail (optional)',
        type: 'image',
        description: 'Drop an image; we crop it to 16:9 and upload it. The URL is auto-filled into the GitHub issue.',
      },
    ],
  },
  {
    key: 'cookbook',
    label: 'Cookbook',
    blurb: 'Tutorial, recipe, or guide for building on Venice.',
    template: 'submit-cookbook.yml',
    titlePrefix: '[Cookbook] ',
    titleField: 'cookbook-title',
    fields: [
      { id: 'cookbook-title', label: 'Title', type: 'text', required: true, placeholder: 'e.g. Streaming chat completions with the Venice API' },
      { id: 'cookbook-url', label: 'URL', type: 'text', required: true, placeholder: 'https://github.com/owner/repo/blob/main/cookbook/recipe.md' },
      { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: '1–2 plain sentences about what the recipe teaches.' },
      { id: 'author', label: 'Author handle', type: 'text', required: true, placeholder: 'e.g. nikshepsvn' },
      { id: 'author-url', label: 'Author URL (optional)', type: 'text', placeholder: 'https://x.com/yourhandle' },
      { id: 'difficulty', label: 'Difficulty', type: 'select', required: true, options: ['beginner', 'intermediate', 'advanced'] },
      { id: 'read-time', label: 'Read time', type: 'text', required: true, placeholder: 'e.g. 10 min' },
      { id: 'language', label: 'Primary language (optional)', type: 'text', placeholder: 'e.g. TypeScript, Python' },
      { id: 'tags', label: 'Tags', type: 'text', required: true, placeholder: 'Streaming, Chat, Tutorial' },
      { id: 'published-at', label: 'Published date', type: 'date', required: true, placeholder: 'YYYY-MM-DD' },
    ],
  },
  {
    key: 'event',
    label: 'Event',
    blurb: 'Hackathon, meetup, workshop, or conference.',
    template: 'submit-event.yml',
    titlePrefix: '[Event] ',
    titleField: 'event-name',
    fields: [
      { id: 'event-name', label: 'Event name', type: 'text', required: true, placeholder: 'e.g. Venice Private-AI Hackathon' },
      { id: 'event-url', label: 'URL', type: 'text', required: true, placeholder: 'https://lu.ma/your-event' },
      { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: '1–2 plain sentences about the event.' },
      { id: 'kind', label: 'Kind', type: 'select', required: true, options: ['hackathon', 'meetup', 'conference', 'workshop'] },
      { id: 'status', label: 'Status', type: 'select', required: true, options: ['upcoming', 'live', 'past'] },
      { id: 'start-date', label: 'Start date', type: 'date', required: true, placeholder: 'YYYY-MM-DD' },
      { id: 'end-date', label: 'End date (optional)', type: 'date', description: 'Only for multi-day events.' },
      { id: 'location', label: 'Location', type: 'text', required: true, placeholder: 'e.g. San Francisco, CA  /  Online' },
      { id: 'host', label: 'Host', type: 'text', required: true, placeholder: 'e.g. Venice AI, @nikshepsvn' },
      { id: 'prize', label: 'Prize (hackathons only, optional)', type: 'text', placeholder: 'e.g. $15,000 in credits' },
      { id: 'tags', label: 'Tags', type: 'text', required: true, placeholder: 'Hackathon, Online' },
    ],
  },
  {
    key: 'demo',
    label: 'Demo',
    blurb: 'Short clip, screenshot, or post showing something you made on Venice.',
    template: 'submit-demo.yml',
    titlePrefix: '[Demo] ',
    titleField: 'demo-title',
    fields: [
      { id: 'demo-title', label: 'Title', type: 'text', required: true, placeholder: 'e.g. openvenice running chat, image, and audio in one tab' },
      { id: 'demo-url', label: 'Demo URL', type: 'text', required: true, placeholder: 'https://x.com/yourhandle/status/…  /  https://loom.com/…  /  https://…', description: 'Link to where the demo lives — X post, Loom, asciinema, gallery image.' },
      { id: 'description', label: 'Description', type: 'textarea', required: true, placeholder: '1–2 plain sentences about what the demo shows.' },
      { id: 'builder', label: 'Your handle', type: 'text', required: true, placeholder: 'e.g. nikshepsvn' },
      { id: 'published-at', label: 'Published date', type: 'date', required: true, placeholder: 'YYYY-MM-DD' },
      { id: 'tags', label: 'Tags', type: 'text', required: true, placeholder: 'Frontend, Multimodal' },
    ],
  },
];

export function buildIssueUrl(
  repoUrl: string,
  type: SubmissionType,
  values: Record<string, string>,
): string {
  const params = new URLSearchParams();
  params.set('template', type.template);

  const titleValue = values[type.titleField]?.trim();
  if (titleValue) params.set('title', `${type.titlePrefix}${titleValue}`);
  else params.set('title', type.titlePrefix);

  for (const field of type.fields) {
    if (field.showWhen && !field.showWhen(values)) continue;
    const v = values[field.id];
    if (v && v.trim()) params.set(field.id, v.trim());
  }

  return `${repoUrl}/issues/new?${params.toString()}`;
}
