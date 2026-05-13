import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';
import { projects, cookbooks, events, demos } from '../../data';

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <span className="hero-eyebrow">Community directory · MIT</span>
        <h1 className="hero-title">
          Built with <span className="hero-title-name">Venice</span>
        </h1>
        <p className="hero-subtitle">
          SDKs, research tools, bots, dashboards — what the community
          is shipping on Venice AI.
        </p>
        <div className="hero-cta-row">
          <button type="button" onClick={onSubmit} className="submit-cta">
            Submit your work <ArrowIcon />
          </button>
          <a href="#explore" className="hero-explore-link">
            or just browse ↓
          </a>
        </div>
      </div>
      <div className="hero-right">
        <AgentPromptCard />
        <div className="hero-meta">
          <span><strong>{projects.length}</strong> projects</span>
          <span className="hero-meta-sep" aria-hidden="true">·</span>
          <span><strong>{cookbooks.length}</strong> cookbooks</span>
          <span className="hero-meta-sep" aria-hidden="true">·</span>
          <span><strong>{events.length}</strong> events</span>
          <span className="hero-meta-sep" aria-hidden="true">·</span>
          <span><strong>{demos.length}</strong> videos</span>
        </div>
      </div>
    </section>
  );
}
