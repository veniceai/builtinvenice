import { useState, useMemo } from 'react';
import { projects, type Project } from '../../data';
import { ChevronDownIcon } from '../icons';
import Toolbar from './Toolbar';
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

const typeOptions: { label: string; value: Project['type'] | 'all' }[] = [
  { label: 'Websites', value: 'Website' },
  { label: 'Repos', value: 'GitHub Repo' },
  { label: 'X Accounts', value: 'X Account' },
  { label: 'Tokens', value: 'Token' },
];

const POPULAR_TAG_COUNT = 8;

const tagsByPopularity = (() => {
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag]) => tag);
})();

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<Project['type'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const filtered = useMemo(() => {
    return projects.filter(item => {
      if (activeType !== 'all' && item.type !== activeType) return false;
      if (activeTag && !item.tags.includes(activeTag)) return false;
      if (search) {
        const q = search.toLowerCase();
        return item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeTag, activeType, search]);

  const visibleTags = tagsExpanded
    ? tagsByPopularity
    : tagsByPopularity.slice(0, POPULAR_TAG_COUNT);
  const hiddenTagCount = tagsByPopularity.length - POPULAR_TAG_COUNT;
  const showActiveTagOutsideList = activeTag && !visibleTags.includes(activeTag);

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search projects…' }}
        filter={{
          options: typeOptions,
          value: activeType,
          onChange: setActiveType,
          clearValue: 'all',
          ariaLabel: 'Filter by project type',
        }}
      />

      <div className="explore-tag-row" role="group" aria-label="Filter by tag">
        <span className="explore-tag-label">Tags</span>
        {visibleTags.map(tag => (
          <button
            type="button"
            key={tag}
            className={`tag-pill ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            aria-pressed={activeTag === tag}
          >
            {tag}
          </button>
        ))}
        {showActiveTagOutsideList && (
          <button
            type="button"
            className="tag-pill active"
            onClick={() => setActiveTag(null)}
            aria-pressed
          >
            {activeTag}
          </button>
        )}
        {hiddenTagCount > 0 && (
          <button
            type="button"
            className="tag-more"
            onClick={() => setTagsExpanded(v => !v)}
            aria-expanded={tagsExpanded}
          >
            {tagsExpanded ? 'Less' : `+${hiddenTagCount} more`}
            <ChevronDownIcon />
          </button>
        )}
      </div>

      <div className="project-grid">
        {filtered.map(project => (
          <ProjectCard key={project.url} project={project} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No projects match your filters.</p>
      )}
    </>
  );
}
