import { ExternalArrow, StarIcon } from '../icons';
import type { Demo } from '../../data';
import { safeUrl } from '../../utils/safeUrl';

export default function DemoCard({ demo }: { demo: Demo }) {
  return (
    <article className="project-card demo-card">
      <div className="demo-thumb">
        {demo.thumbnail ? (
          <img src={demo.thumbnail} alt={`${demo.title} preview`} loading="lazy" />
        ) : (
          <div className="demo-thumb-placeholder" aria-hidden="true">
            <span className="demo-thumb-initial">{demo.builder.charAt(0).toUpperCase()}</span>
          </div>
        )}
        {demo.featured && (
          <span className="featured-badge featured-corner" aria-label="Featured" title="Featured">
            <StarIcon size={12} />
          </span>
        )}
        <div className="demo-thumb-overlay">
          <span className="demo-thumb-cta">
            View <ExternalArrow className="external-arrow" />
          </span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="project-card-title">{demo.title}</h3>
        <p className="project-card-desc">{demo.description}</p>
        <div className="project-card-tags">
          {demo.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <p className="submitted-by">by {demo.builder}</p>
      </div>
      <a
        href={safeUrl(demo.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`View ${demo.title}`}
      />
    </article>
  );
}
