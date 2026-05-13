import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1 className="hero-title">
          Built with <span className="hero-title-name">Venice</span>
        </h1>
        <p className="hero-subtitle">
          From SDKs and research tools to bots and dashboards — see what the
          community is building on Venice AI.
        </p>
        <button type="button" onClick={onSubmit} className="submit-cta">
          Submit your work <ArrowIcon />
        </button>
      </div>
      <div className="hero-right">
        <AgentPromptCard />
      </div>
    </section>
  );
}
