import { ArrowIcon } from '../icons';
import AgentPromptCard from '../AgentPromptCard';
import { projects, cookbooks, events, demos } from '../../data';

const FEATURED = projects.filter((p) => p.featured).slice(0, 4);

export default function Hero({ onSubmit }: { onSubmit: () => void }) {
  return (
    <section className="hero-section">
      <h1 className="hero-title">Built with Venice</h1>
      <p className="hero-subtitle">
        From SDKs and research tools to bots and dashboards — see what the community
        is building on Venice AI.
      </p>

      <div className="hero-stats" aria-label="What's in the directory">
        <span><strong>{projects.length}</strong> projects</span>
        <span className="hero-stats-sep" aria-hidden="true">·</span>
        <span><strong>{cookbooks.length}</strong> cookbooks</span>
        <span className="hero-stats-sep" aria-hidden="true">·</span>
        <span><strong>{events.length}</strong> events</span>
        <span className="hero-stats-sep" aria-hidden="true">·</span>
        <span><strong>{demos.length}</strong> videos</span>
      </div>

      <div className="hero-cta-row">
        <button type="button" onClick={onSubmit} className="submit-cta">
          Submit your work <ArrowIcon />
        </button>
        <a href="#explore" className="hero-explore-link">
          or just explore ↓
        </a>
      </div>

      <AgentPromptCard />

      {FEATURED.length > 0 && (
        <div className="hero-featured" aria-label="Featured projects">
          <span className="hero-featured-label">Featured</span>
          <div className="hero-featured-strip">
            {FEATURED.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-featured-card"
                title={p.description}
              >
                {p.thumbnail && (
                  <img src={p.thumbnail} alt="" loading="lazy" />
                )}
                <span className="hero-featured-card-title">{p.title}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
