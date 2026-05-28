import { officialLinks, officialRepos } from '../../data';
import { safeUrl } from '../../utils/safeUrl';
import { ExternalArrow, GitHubIcon } from '../icons';

export default function OfficialResources() {
  return (
    <section className="official-resources-section" aria-labelledby="official-resources-heading">
      <div className="official-resources-header">
        <h2 id="official-resources-heading" className="official-link-row-label">Official builder resources</h2>
        <nav className="official-link-row" aria-label="Venice documentation">
          <ul>
            {officialLinks.map(link => (
              <li key={link.url}>
                <a
                  href={safeUrl(link.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="official-link"
                >
                  {link.title}
                  <ExternalArrow />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="official-repo-grid">
        {officialRepos.map(repo => (
          <article className="project-card official-repo-card" key={repo.url}>
            <div className="card-body">
              <div className="card-type-row">
                <span className="card-type-label">
                  <GitHubIcon /> {repo.slug}
                </span>
                <ExternalArrow className="external-arrow" />
              </div>
              <div className="official-repo-title-row">
                <h3 className="project-card-title">{repo.title}</h3>
                <span className="official-badge">Official</span>
              </div>
              <p className="project-card-desc">{repo.description}</p>
            </div>
            <a
              href={safeUrl(repo.url)}
              target="_blank"
              rel="noopener noreferrer"
              className="card-stretched-link"
              aria-label={`${repo.title} on GitHub`}
            />
          </article>
        ))}
      </div>
    </section>
  );
}
