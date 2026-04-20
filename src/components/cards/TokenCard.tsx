import { CoinIcon, UsersIcon, ExternalArrow } from '../icons';
import { categoryLabels, chainLabels, chainColors, type TokenProject } from '../../data';
import SocialsRow from './SocialsRow';

function formatMarketCap(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

function truncate(addr: string) {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function TokenCard({ project }: { project: TokenProject }) {
  return (
    <article className="project-card token-card">
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label"><CoinIcon /> ${project.ticker}</span>
          <span className="card-row-right">
            <span className={`category-badge category-${project.category}`}>
              {categoryLabels[project.category]}
            </span>
            <ExternalArrow className="external-arrow" />
          </span>
        </div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="token-chain-row">
          <span className="chain-chip" style={{ color: chainColors[project.chain] }}>
            <span className="chain-dot" style={{ background: chainColors[project.chain] }} />
            {chainLabels[project.chain]}
          </span>
          <code className="token-address" title={project.address}>{truncate(project.address)}</code>
        </div>
        <div className="project-card-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <SocialsRow socials={project.socials} />
        <div className="repo-meta">
          {project.marketCap !== undefined && (
            <span className="repo-meta-item"><CoinIcon /> {formatMarketCap(project.marketCap)} mcap</span>
          )}
          {project.holders !== undefined && (
            <span className="repo-meta-item"><UsersIcon /> {project.holders.toLocaleString()}</span>
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
        aria-label={`View ${project.ticker} token`}
      />
    </article>
  );
}
