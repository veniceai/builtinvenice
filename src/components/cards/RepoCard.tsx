import { GitHubIcon, ExternalArrow } from '../icons';
import { categoryLabels, type RepoProject } from '../../data';
import SocialsRow from './SocialsRow';

// Repo cards always run slim: the thumbnail (auto GitHub OG or a custom
// screenshot) carries the visual weight, the body only adds what the
// thumbnail can't — tags, socials, and the submitter credit.
export default function RepoCard({ project }: { project: RepoProject }) {
  return (
    <article className="project-card repo-card">
      {project.thumbnail && (
        <div className="card-preview">
          <img src={project.thumbnail} alt={`${project.title} preview`} loading="lazy" />
          <div className="card-preview-overlay">
            <span className="card-preview-cta">
              View on GitHub <ExternalArrow className="external-arrow" />
            </span>
          </div>
        </div>
      )}
      <div className="card-body card-body-slim">
        <div className="card-type-row">
          <span className="card-type-label">
            <GitHubIcon /> {project.owner}/{project.repo}
          </span>
          <span className="card-row-right">
            <span className={`category-badge category-${project.category}`}>
              {categoryLabels[project.category]}
            </span>
            <ExternalArrow className="external-arrow" />
          </span>
        </div>
        <div className="project-card-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <SocialsRow socials={project.socials} />
        {project.submittedBy && (
          <div className="repo-meta">
            <span className="repo-meta-item submitted-by">by {project.submittedBy}</span>
          </div>
        )}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`${project.title} on GitHub`}
      />
    </article>
  );
}
