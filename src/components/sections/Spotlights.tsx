import { spotlights } from '../../data';
import SectionHeader from './SectionHeader';
import SpotlightCard from '../cards/SpotlightCard';

export default function Spotlights() {
  const sorted = [...spotlights].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  return (
    <section className="spotlights-section">
      <SectionHeader label="Builder Spotlights" />
      <p className="section-lede">Video interviews with the people shipping on Venice. How they built it, why Venice, and what's next.</p>

      <div className="project-grid">
        {sorted.map(spotlight => (
          <SpotlightCard key={spotlight.url} spotlight={spotlight} />
        ))}
      </div>

      {sorted.length === 0 && (
        <p className="empty-state">No spotlights yet.</p>
      )}
    </section>
  );
}
