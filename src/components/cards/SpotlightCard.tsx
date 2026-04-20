import { PlayIcon, ClockIcon, ExternalArrow } from '../icons';
import type { Spotlight } from '../../data';

export default function SpotlightCard({ spotlight }: { spotlight: Spotlight }) {
  return (
    <article className="project-card spotlight-card">
      <div className="spotlight-thumb">
        {spotlight.thumbnail ? (
          <img src={spotlight.thumbnail} alt={`${spotlight.title} thumbnail`} />
        ) : (
          <div className="spotlight-thumb-placeholder" aria-hidden="true">
            <span className="spotlight-thumb-initial">{spotlight.builder.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <span className="spotlight-play"><PlayIcon size={18} /></span>
        <span className="spotlight-duration"><ClockIcon /> {spotlight.duration}</span>
      </div>
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label"><PlayIcon /> Builder Spotlight</span>
          <ExternalArrow className="external-arrow" />
        </div>
        <h3 className="project-card-title">{spotlight.title}</h3>
        <p className="project-card-desc">{spotlight.description}</p>
        <div className="project-card-tags">
          {spotlight.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <p className="spotlight-byline">
          <span className="spotlight-builder">{spotlight.builder}</span>
          <span className="spotlight-role"> — {spotlight.role}</span>
        </p>
      </div>
      <a
        href={spotlight.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`Watch ${spotlight.title}`}
      />
    </article>
  );
}
