import { CalendarIcon, MapPinIcon, TrophyIcon, ExternalArrow } from '../icons';
import type { VeniceEvent, EventKind, EventStatus } from '../../data';

const kindLabels: Record<EventKind, string> = {
  hackathon: 'Hackathon',
  meetup: 'Meetup',
  conference: 'Conference',
  workshop: 'Workshop',
};

const statusLabels: Record<EventStatus, string> = {
  upcoming: 'Upcoming',
  live: 'Live',
  past: 'Past',
};

// Event dates are calendar dates with no time component. Parse as local so
// users don't see the day shift in UTC-negative timezones.
function parseLocalDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(iso: string, end?: string) {
  const d = parseLocalDate(iso);
  const start = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  if (!end) return start;
  const e = parseLocalDate(end);
  const sameMonth = d.getMonth() === e.getMonth() && d.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${e.getDate()}, ${e.getFullYear()}`;
  }
  const endStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return `${start} – ${endStr}`;
}

export default function EventCard({ event }: { event: VeniceEvent }) {
  return (
    <article className={`project-card event-card event-${event.kind} status-${event.status}`}>
      <div className="card-body">
        <div className="card-type-row">
          <span className="card-type-label">
            <CalendarIcon /> {kindLabels[event.kind]}
          </span>
          <span className="card-row-right">
            <span className={`event-status-badge status-${event.status}`}>
              {statusLabels[event.status]}
            </span>
            <ExternalArrow className="external-arrow" />
          </span>
        </div>
        <h3 className="project-card-title">{event.title}</h3>
        <p className="project-card-desc">{event.description}</p>
        <div className="event-meta">
          <span className="event-meta-item">
            <CalendarIcon /> {formatDate(event.startDate, event.endDate)}
          </span>
          <span className="event-meta-item">
            <MapPinIcon /> {event.location}
          </span>
          {event.prize && (
            <span className="event-meta-item event-prize">
              <TrophyIcon /> {event.prize}
            </span>
          )}
        </div>
        <div className="project-card-tags">
          {event.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <p className="submitted-by event-host">hosted by {event.host}</p>
      </div>
      <a
        href={event.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-stretched-link"
        aria-label={`${event.title} — ${kindLabels[event.kind]}`}
      />
    </article>
  );
}
