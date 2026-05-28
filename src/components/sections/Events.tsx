import { useState, useMemo } from 'react';
import { events, type EventStatus } from '../../data';
import Toolbar from './Toolbar';
import EventCard from '../cards/EventCard';

const statusOptions: { label: string; value: EventStatus | 'all' }[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
];

export default function Events() {
  const [status, setStatus] = useState<EventStatus | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = status === 'all' ? events : events.filter(e => e.status === status);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q),
      );
    }
    return [...list].sort((a, b) => {
      const featuredDiff = Number(b.featured ?? false) - Number(a.featured ?? false);
      if (featuredDiff !== 0) return featuredDiff;
      return a.startDate.localeCompare(b.startDate);
    });
  }, [status, search]);

  return (
    <>
      <Toolbar
        search={{ value: search, onChange: setSearch, placeholder: 'Search events…' }}
        filter={{
          options: statusOptions,
          value: status,
          onChange: setStatus,
          clearValue: 'all',
          ariaLabel: 'Filter by status',
        }}
      />

      <div className="project-grid">
        {filtered.map(event => (
          <EventCard key={`${event.startDate}:${event.url}`} event={event} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No events match your filters.</p>
      )}
    </>
  );
}
