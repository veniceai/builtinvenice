import { XIcon, UsersIcon, ExternalArrow, StarIcon } from '../icons';
import { categoryLabels, type XAccountProject } from '../../data';
import SocialsRow from './SocialsRow';
import { safeUrl } from '../../utils/safeUrl';

function formatFollowers(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

export default function XAccountCard({ project }: { project: XAccountProject }) {
  return (
    <article className="project-card x-account-card">
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label"><XIcon /> @{project.handle}</span>
          <span className="card-row-right">
            {project.featured && (
              <span className="featured-badge" aria-label="Featured" title="Featured">
                <StarIcon size={12} />
              </span>
            )}
            <span className={`category-badge category-${project.category}`}>
              {categoryLabels[project.category]}
            </span>
            <ExternalArrow className="external-arrow" />
          </span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        {project.bio && <p className="x-bio">"{project.bio}"</p>}
        <div className="project-card-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <SocialsRow socials={project.socials} />
        <div className="repo-meta">
          {project.followers !== undefined && (
            <span className="repo-meta-item"><UsersIcon /> {formatFollowers(project.followers)}</span>
          )}
          {project.submittedBy && (
            <span className="repo-meta-item submitted-by">by {project.submittedBy}</span>
          )}
        </div>
      </div>
      <a
        href={safeUrl(project.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`Open @${project.handle} on X`}
      />
    </article>
  );
}
