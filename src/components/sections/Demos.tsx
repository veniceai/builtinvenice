import { useState, useMemo } from 'react';
import { demos } from '../../data';
import Toolbar from './Toolbar';
import DemoCard from '../cards/DemoCard';

export default function Demos() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = demos;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.builder.toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [search]);

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search demos…' }}
      />

      <div className="project-grid">
        {filtered.map(demo => (
          <DemoCard key={demo.url} demo={demo} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No demos match your search.</p>
      )}
    </>
  );
}
