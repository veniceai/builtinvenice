import { ExternalArrow, StarIcon } from '../icons';
import type { Media } from '../../data';
import { safeUrl } from '../../utils/safeUrl';

export default function MediaCard({ item }: { item: Media }) {
  return (
    <article className="project-card media-card">
      <div className="media-thumb">
        {item.thumbnail ? (
          <img src={item.thumbnail} alt={`${item.title} preview`} loading="lazy" />
        ) : (
          <div className="media-thumb-placeholder" aria-hidden="true">
            <span className="media-thumb-initial">{item.builder.charAt(0).toUpperCase()}</span>
          </div>
        )}
        {item.featured && (
          <span className="featured-badge featured-corner" aria-label="Featured" title="Featured">
            <StarIcon size={12} />
          </span>
        )}
        <div className="media-thumb-overlay">
          <span className="media-thumb-cta">
            View <ExternalArrow className="external-arrow" />
          </span>
        </div>
      </div>
      <div className="card-body">
        <h3 className="project-card-title">{item.title}</h3>
        <p className="project-card-desc">{item.description}</p>
        <div className="project-card-tags">
          {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <p className="submitted-by">by {item.builder}</p>
      </div>
      <a
        href={safeUrl(item.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`View ${item.title}`}
      />
    </article>
  );
}
