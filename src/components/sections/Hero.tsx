import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="hero-section">
      <h1 className="hero-title">
        Built on <span className="hero-title-name">Venice</span>
      </h1>
      <p className="hero-subtitle">
        Private, uncensored AI in the wild — SDKs, agents, on-chain
        experiments, and dashboards shipped by the Venice community.
      </p>
      <button type="button" onClick={onSubmit} className="submit-cta">
        Submit your work <ArrowIcon />
      </button>
      <AgentPromptCard />
    </section>
  );
}
