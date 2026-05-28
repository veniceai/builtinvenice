import { useState, useMemo } from 'react';
import { media } from '../../data';
import Toolbar from './Toolbar';
import MediaCard from '../cards/MediaCard';

export default function Media() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = media;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.builder.toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      const featuredDiff = Number(b.featured ?? false) - Number(a.featured ?? false);
      if (featuredDiff !== 0) return featuredDiff;
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }, [search]);

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search videos…' }}
      />

      <div className="project-grid">
        {filtered.map(item => (
          <MediaCard key={item.url} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">Nothing matches your search.</p>
      )}
    </>
  );
}
