import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Built with <span className="hero-title-name">Venice</span>
      </h1>
      <p className="hero-subtitle">
        SDKs, agents, dashboards, and demos — what the community is
        shipping on Venice.
      </p>
      <button type="button" onClick={onSubmit} className="submit-cta">
        Submit your work <ArrowIcon />
      </button>
      <AgentPromptCard />
    </section>
  );
}
