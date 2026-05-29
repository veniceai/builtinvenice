// Single source of truth for the GitHub repo and public domain.
export const REPO_SLUG = "veniceai/builtinvenice";
export const REPO_URL = `https://github.com/${REPO_SLUG}`;

// Canonical public origin of the site.
export const SITE_URL = "https://builtinvenice.ai";

// Same-origin path for in-app links; absolute URL for text baked into
// copy-paste prompts (which run in agents that don't know this site's origin).
export const AGENT_SKILL_URL = "/agent-skill.md";
export const AGENT_SKILL_CANONICAL = `${SITE_URL}${AGENT_SKILL_URL}`;
