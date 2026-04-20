import { ExternalArrow } from '../icons';
import { SUBMIT_URL } from '../../constants';
import AgentPromptCard from '../AgentPromptCard';

export default function Hero() {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Built with Venice</h1>
      <p className="hero-subtitle">
        From SDKs and research tools to bots and dashboards — see what the community
        is building on Venice AI.
      </p>
      <a
        href={SUBMIT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="submit-cta"
      >
        Submit Your Project <ExternalArrow />
      </a>
      <AgentPromptCard />
    </section>
  );
}
