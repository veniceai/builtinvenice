import { useState } from 'react';
import { AGENT_SKILL_URL, AGENT_SKILL_CANONICAL } from '../constants';

const PROMPT = `Submit my project to Built with Venice.

Fetch ${AGENT_SKILL_CANONICAL} and follow it end-to-end:
ask me for the project details, validate against the schema, then open a pull
request against nikshepsvn/builtwithvenice (fall back to a GitHub issue if you
can't fork). Return the PR or issue URL when done.`;

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  );
}

export default function AgentPromptCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop — user can still select manually */
    }
  };

  return (
    <div className="agent-prompt-card">
      <div className="agent-prompt-header">
        <span className="agent-prompt-label">
          <span className="agent-prompt-dot" /> Paste this into your AI agent
        </span>
        <button
          type="button"
          onClick={copy}
          className={`agent-prompt-copy ${copied ? 'copied' : ''}`}
          aria-label={copied ? 'Copied prompt' : 'Copy prompt'}
        >
          {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
        </button>
      </div>
      <pre className="agent-prompt-body">{PROMPT}</pre>
      <p className="agent-prompt-foot">
        Works with Claude Code, Cursor, Codex, or any agent that can fetch a URL and open a PR.{' '}
        <a href={AGENT_SKILL_URL} target="_blank" rel="noopener noreferrer">View the skill</a>.
      </p>
    </div>
  );
}
