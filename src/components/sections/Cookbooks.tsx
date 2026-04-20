import { useState, useMemo } from 'react';
import { cookbooks, type CookbookDifficulty } from '../../data';
import SectionHeader from './SectionHeader';
import CookbookCard from '../cards/CookbookCard';

const difficultyFilters: { label: string; value: CookbookDifficulty | 'all' }[] = [
  { label: 'All Levels', value: 'all' },
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export default function Cookbooks() {
  const [activeDifficulty, setActiveDifficulty] = useState<CookbookDifficulty | 'all'>('all');

  const filtered = useMemo(() => {
    const list = activeDifficulty === 'all'
      ? cookbooks
      : cookbooks.filter(c => c.difficulty === activeDifficulty);
    return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [activeDifficulty]);

  return (
    <section className="cookbooks-section">
      <SectionHeader label="Cookbook & Guides" />
      <p className="section-lede">Step-by-step recipes and tutorials for building on Venice, contributed by the community.</p>

      <div className="filters filter-inline">
        <div className="filter-buttons-row">
          {difficultyFilters.map(f => (
            <button
              key={f.value}
              className={`filter-pill ${activeDifficulty === f.value ? 'active' : ''}`}
              onClick={() => setActiveDifficulty(f.value)}
              aria-pressed={activeDifficulty === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {filtered.map(cookbook => (
          <CookbookCard key={cookbook.url} cookbook={cookbook} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No recipes at this difficulty yet.</p>
      )}
    </section>
  );
}
