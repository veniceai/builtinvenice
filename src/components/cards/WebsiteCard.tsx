import { GlobeIcon, ExternalArrow, StarIcon } from '../icons';
import { categoryLabels, type WebsiteProject } from '../../data';
import SocialsRow from './SocialsRow';
import { safeUrl } from '../../utils/safeUrl';

export default function WebsiteCard({ project }: { project: WebsiteProject }) {
  return (
    <article className="project-card website-card">
      {project.thumbnail ? (
        <div className="card-preview">
          <img src={project.thumbnail} alt={`${project.title} preview`} loading="lazy" />
          <div className="card-preview-overlay">
            <span className="card-preview-cta">
              Visit Site <ExternalArrow className="external-arrow" />
            </span>
          </div>
        </div>
      ) : (
        <div className="card-preview card-preview-placeholder">
          <GlobeIcon size={32} />
        </div>
      )}
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label"><GlobeIcon /> Website</span>
          <span className="card-row-right">
            {project.featured && (
              <span className="featured-badge" aria-label="Featured" title="Featured">
                <StarIcon size={12} />
              </span>
            )}
            <span className={`category-badge category-${project.category}`}>
              {categoryLabels[project.category]}
            </span>
          </span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        {(project.socials?.length || project.submittedBy) && (
          <div className="card-footer">
            <SocialsRow socials={project.socials} />
            {project.submittedBy && (
              <span className="submitted-by">by {project.submittedBy}</span>
            )}
          </div>
        )}
      </div>
      <a
        href={safeUrl(project.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`Visit ${project.title}`}
      />
    </article>
  );
}
