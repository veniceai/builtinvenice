import { GlobeIcon, ExternalArrow } from '../icons';
import { categoryLabels, type WebsiteProject } from '../../data';
import SocialsRow from './SocialsRow';

export default function WebsiteCard({ project }: { project: WebsiteProject }) {
  return (
    <article className="project-card website-card">
      {project.preview ? (
        <div className="card-preview">
          <img src={project.preview} alt={`${project.title} preview`} />
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
          <span className={`category-badge category-${project.category}`}>
            {categoryLabels[project.category]}
          </span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <SocialsRow socials={project.socials} />
        {project.submittedBy && (
          <p className="submitted-by">by {project.submittedBy}</p>
        )}
      </div>
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`Visit ${project.title}`}
      />
    </article>
  );
}
