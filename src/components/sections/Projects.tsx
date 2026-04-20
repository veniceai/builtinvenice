import { useState, useMemo } from 'react';
import { projects, type Project } from '../../data';
import SectionHeader from './SectionHeader';
import RepoCard from '../cards/RepoCard';
import WebsiteCard from '../cards/WebsiteCard';
import XAccountCard from '../cards/XAccountCard';
import TokenCard from '../cards/TokenCard';

function ProjectCard({ project }: { project: Project }) {
  switch (project.type) {
    case 'Website':    return <WebsiteCard project={project} />;
    case 'GitHub Repo': return <RepoCard project={project} />;
    case 'X Account':  return <XAccountCard project={project} />;
    case 'Token':      return <TokenCard project={project} />;
  }
}

const typeFilters: { label: string; value: Project['type'] | 'all' }[] = [
  { label: 'All Types', value: 'all' },
  { label: 'Websites', value: 'Website' },
  { label: 'Repos', value: 'GitHub Repo' },
  { label: 'X Accounts', value: 'X Account' },
  { label: 'Tokens', value: 'Token' },
];

const featured = projects.filter(p => p.featured);
const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<Project['type'] | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return projects.filter(item => {
      // Featured projects render in their own section; don't double-list them here.
      if (item.featured) return false;
      if (activeType !== 'all' && item.type !== activeType) return false;
      if (activeTag && !item.tags.includes(activeTag)) return false;
      if (search) {
        const q = search.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeTag, activeType, search]);

  return (
    <>
      {/* Featured */}
      <section className="featured-section">
        <SectionHeader label="Featured" />
        <div className="featured-grid">
          {featured.map(project => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </div>
      </section>

      {/* All Projects */}
      <section className="projects-section">
        <SectionHeader label="Community Projects" />

        <div className="filters">
          <div className="filter-buttons-row">
            {typeFilters.map(f => (
              <button
                key={f.value}
                className={`filter-pill ${activeType === f.value ? 'active' : ''}`}
                onClick={() => setActiveType(f.value)}
                aria-pressed={activeType === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="filter-buttons-row filter-buttons-tags">
            <button
              className={`filter-pill ${!activeTag ? 'active' : ''}`}
              onClick={() => setActiveTag(null)}
              aria-pressed={activeTag === null}
            >
              All Tags
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                className={`filter-pill ${activeTag === tag ? 'active' : ''}`}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                aria-pressed={activeTag === tag}
              >
                {tag}
              </button>
            ))}
          </div>

          <input
            type="search"
            className="search-input"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        <div className="project-grid">
          {filtered.map(project => (
            <ProjectCard key={project.url} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-state">No projects match your filters.</p>
        )}
      </section>
    </>
  );
}
