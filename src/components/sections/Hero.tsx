import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Built with Venice</h1>
      <p className="hero-subtitle">
        From SDKs and research tools to bots and dashboards — see what the community
        is building on Venice AI.
      </p>
      <button type="button" onClick={onSubmit} className="submit-cta">
        Submit your work <ArrowIcon />
      </button>
      <AgentPromptCard />
    </section>
  );
}
