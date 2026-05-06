import { useState } from 'react';
import { AGENT_SKILL_URL, AGENT_SKILL_CANONICAL } from '../constants';

const PROMPT = `Submit to Built with Venice — fetch ${AGENT_SKILL_CANONICAL} and follow it.`;

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2"/>
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
      <span className="agent-prompt-label">Or paste into your AI agent</span>
      <div className="agent-prompt-row">
        <code className="agent-prompt-snippet">{PROMPT}</code>
        <button
          type="button"
          onClick={copy}
          className={`agent-prompt-copy ${copied ? 'copied' : ''}`}
          aria-label={copied ? 'Copied prompt' : 'Copy prompt'}
        >
          {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
        </button>
      </div>
      <a className="agent-prompt-link" href={AGENT_SKILL_URL} target="_blank" rel="noopener noreferrer">
        View the skill →
      </a>
    </div>
  );
}
