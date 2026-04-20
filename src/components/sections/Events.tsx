import { useState, useMemo } from 'react';
import { events, type EventStatus } from '../../data';
import SectionHeader from './SectionHeader';
import EventCard from '../cards/EventCard';

const statusFilters: { label: string; value: EventStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
];

export default function Events() {
  const [activeStatus, setActiveStatus] = useState<EventStatus | 'all'>('upcoming');

  const filtered = useMemo(() => {
    const list = activeStatus === 'all'
      ? events
      : events.filter(e => e.status === activeStatus);
    return [...list].sort((a, b) => a.startDate.localeCompare(b.startDate));
  }, [activeStatus]);

  return (
    <section className="events-section">
      <SectionHeader label="Events & Hackathons" />
      <p className="section-lede">Hackathons, meetups, workshops, and conferences for the Venice ecosystem.</p>

      <div className="filters filter-inline">
        <div className="filter-buttons-row">
          {statusFilters.map(f => (
            <button
              key={f.value}
              className={`filter-pill ${activeStatus === f.value ? 'active' : ''}`}
              onClick={() => setActiveStatus(f.value)}
              aria-pressed={activeStatus === f.value}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {filtered.map(event => (
          <EventCard key={event.url} event={event} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-state">No events in this view.</p>
      )}
    </section>
  );
}
