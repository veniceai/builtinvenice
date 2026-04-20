import { BookIcon, ClockIcon, ExternalArrow } from '../icons';
import { difficultyLabels, langColors, type Cookbook } from '../../data';

export default function CookbookCard({ cookbook }: { cookbook: Cookbook }) {
  const langColor = cookbook.language ? langColors[cookbook.language] ?? '#888' : null;

  return (
    <article className={`project-card cookbook-card difficulty-${cookbook.difficulty}`}>
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label"><BookIcon /> Recipe</span>
          <span className="card-row-right">
            <span className={`difficulty-badge difficulty-${cookbook.difficulty}`}>
              {difficultyLabels[cookbook.difficulty]}
            </span>
            <ExternalArrow className="external-arrow" />
          </span>
        </div>
        <h3 className="project-card-title">{cookbook.title}</h3>
        <p className="project-card-desc">{cookbook.description}</p>
        <div className="project-card-tags">
          {cookbook.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="repo-meta">
          {langColor && cookbook.language && (
            <span className="repo-meta-item">
              <span className="lang-dot" style={{ background: langColor }} />
              {cookbook.language}
            </span>
          )}
          <span className="repo-meta-item"><ClockIcon /> {cookbook.readTime}</span>
          <span className="repo-meta-item submitted-by">by {cookbook.author}</span>
        </div>
      </div>
      <a
        href={cookbook.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`Read ${cookbook.title}`}
      />
    </article>
  );
}
