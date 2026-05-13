import { GitHubIcon, StarIcon, ForkIcon, ExternalArrow } from '../icons';
import { langColors, categoryLabels, type RepoProject } from '../../data';
import SocialsRow from './SocialsRow';

export default function RepoCard({ project }: { project: RepoProject }) {
  const langColor = project.language ? langColors[project.language] ?? '#888' : null;

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
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label"><GitHubIcon /> {project.owner}/{project.repo}</span>
          <span className="card-row-right">
            <span className={`category-badge category-${project.category}`}>
              {categoryLabels[project.category]}
            </span>
            <ExternalArrow className="external-arrow" />
          </span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <SocialsRow socials={project.socials} />
        <div className="repo-meta">
          {langColor && (
            <span className="repo-meta-item">
              <span className="lang-dot" style={{ background: langColor }} />
              {project.language}
            </span>
          )}
          {project.stars !== undefined && (
            <span className="repo-meta-item"><StarIcon /> {project.stars}</span>
          )}
          {project.forks !== undefined && (
            <span className="repo-meta-item"><ForkIcon /> {project.forks}</span>
          )}
          {project.submittedBy && (
            <span className="repo-meta-item submitted-by">by {project.submittedBy}</span>
          )}
        </div>
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
