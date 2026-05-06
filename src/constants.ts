export const REPO_URL = "https://github.com/nikshepsvn/builtwithvenice";
export const SUBMIT_URL = `${REPO_URL}/issues/new?template=submit-project.yml&title=%5BProject%5D+`;
// Chooser surface for non-project submissions (cookbooks, events, spotlights).
export const SUBMIT_CHOOSE_URL = `${REPO_URL}/issues/new/choose`;

// Same-origin path for in-app links; absolute URL for text baked into
// copy-paste prompts (which run in agents that don't know this site's origin).
export const AGENT_SKILL_URL = "/agent-skill.md";
export const AGENT_SKILL_CANONICAL = "https://builtwithvenice.com/agent-skill.md";
