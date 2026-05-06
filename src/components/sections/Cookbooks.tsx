import { useState, useMemo } from 'react';
import { cookbooks, type CookbookDifficulty } from '../../data';
import Toolbar from './Toolbar';
import CookbookCard from '../cards/CookbookCard';

const difficultyOptions: { label: string; value: CookbookDifficulty | 'all' }[] = [
  { label: 'Beginner', value: 'beginner' },
  { label: 'Intermediate', value: 'intermediate' },
  { label: 'Advanced', value: 'advanced' },
];

export default function Cookbooks() {
  const [difficulty, setDifficulty] = useState<CookbookDifficulty | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = difficulty === 'all'
      ? cookbooks
      : cookbooks.filter(c => c.difficulty === difficulty);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [difficulty, search]);

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search recipes…' }}
        filter={{
          options: difficultyOptions,
          value: difficulty,
          onChange: setDifficulty,
          clearValue: 'all',
          ariaLabel: 'Filter by difficulty',
        }}
      />

      <div className="project-grid">
        {filtered.map(cookbook => (
          <CookbookCard key={cookbook.url} cookbook={cookbook} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No recipes match your filters.</p>
      )}
    </>
  );
}
